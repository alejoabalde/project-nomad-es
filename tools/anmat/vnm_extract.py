#!/usr/bin/env python3
"""
Fork (project-nomad-es): slow, polite extractor of the ANMAT "Vademécum
Nacional de Medicamentos" (Argentina) public search, to map Argentine brand
names to their active ingredients. The app then links each Argentine brand to
the Spanish leaflet (CIMA/AEMPS) of the same active ingredient.

Source: https://servicios.pami.org.ar/vademecum/views/consultaPublica/listado.zul
(public search, no login). There is no download or API, so this script drives
the page's ZK protocol the way the browser does: one search per generic name,
10 results per page. It is deliberately slow (one request every few seconds by
default), identifies itself in the User-Agent, and is resumable: progress is
appended to `<out>.parcial.jsonl` and finished terms to `<out>.terminos.txt`.

The server is load balanced without sticky sessions, so a ZK "desktop" only
exists on the backend that served the page: everything for a session goes
over ONE kept-alive connection, and a new session is opened when it drops.

Usage:
  python3 -I tools/anmat/vnm_extract.py --desde-aemps aemps-prospectos.jsonl.gz \\
      --out anmat-vnm.jsonl.gz [--pausa 3]
  python3 -I tools/anmat/vnm_extract.py --terminos IBUPROFENO,PARACETAMOL --out prueba.jsonl.gz

Only the standard library is used.
"""
import argparse
import gzip
import http.client
import json
import os
import re
import ssl
import sys
import time
import unicodedata
import urllib.parse
from datetime import datetime, timezone

HOST = 'servicios.pami.org.ar'
PAGE = '/vademecum/views/consultaPublica/listado.zul'
AU = '/vademecum/zkau'
UA = ('NOMAD-es/1.0 (+https://github.com/alejoabalde/project-nomad-es; '
      'extraccion lenta del Vademecum Nacional para uso offline)')

# Widget ids of the public search page (stable: the page is server-rendered
# from the same .zul every time; checked again on each new session).
W_GENERIC = 'zk_comp_28'
W_SEARCH = 'zk_comp_80'
W_PAGING = 'zk_comp_98'

FIELDS = ['certificado', 'laboratorio', 'nombre_comercial', 'forma', 'presentacion', 'gtin', 'generico']


class SessionLost(Exception):
    pass


def sin_tildes(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn')


class Vademecum:
    def __init__(self, pausa):
        self.pausa = pausa
        self.conn = None
        self.cookie = None
        self.dt = None

    # ── connection ──────────────────────────────────────────────────────────
    def _connect(self):
        if self.conn:
            try:
                self.conn.close()
            except Exception:  # noqa: BLE001
                pass
        proxy = os.environ.get('HTTPS_PROXY') or os.environ.get('https_proxy')
        cafile = os.environ.get('SSL_CERT_FILE')
        ctx = ssl.create_default_context(cafile=cafile) if cafile else ssl.create_default_context()
        if proxy:
            p = urllib.parse.urlparse(proxy)
            self.conn = http.client.HTTPSConnection(p.hostname, p.port, context=ctx, timeout=90)
            self.conn.set_tunnel(HOST, 443)
        else:
            self.conn = http.client.HTTPSConnection(HOST, 443, context=ctx, timeout=90)

    def _req(self, method, path, body=None, headers=None):
        h = {'User-Agent': UA, 'Accept-Language': 'es'}
        if self.cookie:
            h['Cookie'] = self.cookie
        if headers:
            h.update(headers)
        try:
            self.conn.request(method, path, body=body, headers=h)
            r = self.conn.getresponse()
            data = r.read().decode('utf-8', 'replace')
        except (http.client.HTTPException, OSError) as err:
            raise SessionLost(f'conexión: {err}') from err
        if r.status >= 500:
            raise SessionLost(f'HTTP {r.status}')
        return r, data

    def abrir(self):
        self._connect()
        self.cookie = None
        r, html = self._req('GET', PAGE)
        m = re.search(r'JSESSIONID=([A-F0-9]+)', r.getheader('Set-Cookie') or '')
        dt = re.search(r"dt:'([^']+)'", html)
        if not m or not dt:
            raise SessionLost('la página no trajo sesión')
        for w in (W_GENERIC, W_SEARCH, W_PAGING):
            if f"'{w}'" not in html:
                raise SystemExit(f'La página cambió: no encuentro el control {w}. Hay que revisar el extractor.')
        self.cookie = f'JSESSIONID={m.group(1)}'
        self.dt = dt.group(1)
        self.sid = 0
        time.sleep(self.pausa)

    def _au(self, cmds):
        fields = {'dtid': self.dt}
        for i, (cmd, uuid, data) in enumerate(cmds):
            fields[f'cmd_{i}'] = cmd
            fields[f'uuid_{i}'] = uuid
            fields[f'data_{i}'] = json.dumps(data)
        # ZK answers a repeated ZK-SID with the cached previous response, so
        # every request of a desktop needs the next sequence number.
        self.sid += 1
        _, data = self._req('POST', AU, urllib.parse.urlencode(fields), {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'ZK-SID': str(self.sid),
        })
        time.sleep(self.pausa)
        if os.environ.get('VNM_DEBUG'):
            self._n = getattr(self, '_n', 0) + 1
            with open(os.path.join(os.environ['VNM_DEBUG'], f'au_{self._n:04d}.json'), 'w', encoding='utf-8') as f:
                f.write(data)
        if 'timeout.zul' in data or '"rs"' not in data:
            raise SessionLost('el servidor perdió la sesión')
        return data

    # ── search ──────────────────────────────────────────────────────────────
    def buscar(self, termino):
        data = self._au([
            ('onChange', W_GENERIC, {'value': termino, 'start': len(termino)}),
            ('onClick', W_SEARCH, {'pageX': 100, 'pageY': 100, 'which': 1, 'x': 10, 'y': 10}),
        ])
        return parse_filas(data), parse_paginas(data)

    def pagina(self, n):
        return parse_filas(self._au([('onPaging', W_PAGING, {'': n})]))


def parse_paginas(data):
    m = re.search(r'"pageCount",(\d+)', data)
    return int(m.group(1)) if m else 1


def _unescape(v):
    try:
        return json.loads('"' + v.replace('"', '\\"') + '"')
    except Exception:  # noqa: BLE001
        return v


def parse_filas(data):
    """Rows of the results grid: the first 7 cells of each row, in column order."""
    filas = []
    for bloque in re.split(r"\['zul\.grid\.Row',", data)[1:]:
        celdas = re.split(r"\['zul\.wgt\.Cell',", bloque)[1:]
        if len(celdas) < len(FIELDS):
            continue
        valores = []
        for celda in celdas[:len(FIELDS)]:
            m = re.search(r"value:'((?:[^'\\]|\\.)*)'", celda)
            valores.append(' '.join(_unescape(m.group(1)).split()) if m else '')
        fila = dict(zip(FIELDS, valores))
        if fila['certificado'].isdigit():
            filas.append(fila)
    return filas


def terminos_desde_aemps(path):
    out = set()
    opener = gzip.open if path.endswith('.gz') else open
    with opener(path, 'rt', encoding='utf-8') as f:
        for line in f:
            try:
                rec = json.loads(line)
            except Exception:  # noqa: BLE001
                continue
            for pa in rec.get('principios_activos') or []:
                t = sin_tildes(pa).upper().strip()
                if len(t) >= 3:
                    out.add(t)
    return sorted(out | variantes_argentinas(out))


# Argentina names some ingredients differently, and the VNM search matches by
# substring, so the Spanish name alone misses them ("DICLOFENACO" does not
# find "DICLOFENAC SODICO"). These are searched too.
NOMBRES_ARGENTINOS = ['DIPIRONA', 'HIOSCINA', 'CLORFENIRAMINA', 'ACETAMINOFENO', 'IODOPOVIDONA', 'YODOPOVIDONA']
SUFIJOS = [  # (Spain, Argentina)
    ('DIPINO', 'DIPINA'),
    ('FLOXACINO', 'FLOXACINA'),
    ('GLIPTINA', 'GLIPTIN'),
    ('STATINA', 'STATIN'),
    ('CAPONA', 'CAPONE'),
    ('ACO', 'AC'),
]


def variantes_argentinas(terminos):
    out = set(NOMBRES_ARGENTINOS)
    for t in terminos:
        primera = t.split(' ')[0]
        for es, ar in SUFIJOS:
            if primera.endswith(es) and len(primera) > len(es) + 3:
                out.add(primera[: -len(es)] + ar)
    return out - set(terminos)


# Words too generic to search alone ("ACIDO" matches thousands of products):
# for these the whole ingredient name is searched instead.
PALABRAS_GENERICAS = {
    'ACIDO', 'CLORURO', 'SULFATO', 'EXTRACTO', 'ACEITE', 'VITAMINA', 'SODIO', 'POTASIO', 'CALCIO',
    'MAGNESIO', 'HIERRO', 'ZINC', 'AGUA', 'ALCOHOL', 'SOLUCION', 'POLVO', 'COMPLEJO', 'FOSFATO',
    'CITRATO', 'CARBONATO', 'OXIDO', 'HIDROXIDO', 'TINTURA', 'ESENCIA', 'FRACCION', 'ACETATO',
    'BICARBONATO', 'GLUCONATO', 'LACTATO', 'DEXTROSA', 'GLUCOSA', 'SAL', 'SALES', 'POLVOS', 'CREMA',
}


def candidatos_en_cadena(parcial, hechos):
    """Ingredient names seen in the results that no finished search covers.

    The VNM search matches by substring, so a candidate is already covered
    when a finished term is contained in it ("IBUPROFENO" covers
    "IBUPROFENO LISINA")."""
    vistos = set()
    with open(parcial, encoding='utf-8') as f:
        for line in f:
            try:
                generico = json.loads(line).get('generico') or ''
            except Exception:  # noqa: BLE001
                continue
            for trozo in generico.split('+'):
                nombre = re.sub(r'\s\d.*$', '', sin_tildes(trozo).upper()).strip(' .,;()')
                nombre = re.sub(r'\s+', ' ', nombre)
                if len(nombre) < 4:
                    continue
                palabra = nombre.split(' ')[0]
                termino = palabra if len(palabra) >= 5 and palabra not in PALABRAS_GENERICAS else nombre
                if len(termino) >= 5 and termino not in PALABRAS_GENERICAS and termino.rstrip('S') not in PALABRAS_GENERICAS:
                    vistos.add(termino)
    hechos_lista = [h for h in hechos if len(h) >= 4]
    return sorted(t for t in vistos if t not in hechos and not any(h in t for h in hechos_lista))


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--desde-aemps', help='paquete AEMPS del que sacar los principios activos a buscar')
    ap.add_argument('--terminos', help='lista separada por comas de nombres genéricos')
    ap.add_argument('--out', required=True, help='archivo final .jsonl.gz')
    ap.add_argument('--pausa', type=float, default=3.0, help='segundos entre pedidos (por defecto 3)')
    ap.add_argument('--max-terminos', type=int, default=0, help='parar después de N términos (para probar)')
    ap.add_argument('--en-cadena', type=int, default=0, metavar='RONDAS',
                    help='buscar también los principios activos que aparecen en los resultados, hasta N rondas')
    args = ap.parse_args()

    if args.terminos:
        terminos = [t.strip().upper() for t in args.terminos.split(',') if len(t.strip()) >= 3]
    elif args.desde_aemps:
        terminos = terminos_desde_aemps(args.desde_aemps)
    else:
        ap.error('hace falta --desde-aemps o --terminos')

    parcial = args.out + '.parcial.jsonl'
    hechos_path = args.out + '.terminos.txt'
    hechos = set()
    if os.path.exists(hechos_path):
        with open(hechos_path, encoding='utf-8') as f:
            hechos = {l.strip() for l in f if l.strip()}
    pendientes = [t for t in terminos if t not in hechos]
    print(f'{len(terminos)} términos, {len(hechos)} ya hechos, {len(pendientes)} pendientes', file=sys.stderr)
    if args.max_terminos:
        pendientes = pendientes[:args.max_terminos]

    vnm = Vademecum(args.pausa)
    estado = {'abierta': False}

    def correr(pendientes):
        fallos_seguidos = 0
        with open(parcial, 'a', encoding='utf-8') as out, open(hechos_path, 'a', encoding='utf-8') as hechos_f:
            i = 0
            while i < len(pendientes):
                termino = pendientes[i]
                try:
                    if not estado['abierta']:
                        vnm.abrir()
                        estado['abierta'] = True
                    filas, paginas = vnm.buscar(termino)
                    todas = list(filas)
                    for n in range(1, paginas):
                        todas.extend(vnm.pagina(n))
                except SessionLost as err:
                    estado['abierta'] = False
                    fallos_seguidos += 1
                    espera = min(600, args.pausa * 10 * fallos_seguidos)
                    print(f'  {termino}: {err}; reintento en {espera:.0f} s', file=sys.stderr)
                    if fallos_seguidos >= 8:
                        raise SystemExit('Demasiados fallos seguidos; se corta. Volver a correr para retomar.')
                    time.sleep(espera)
                    continue
                fallos_seguidos = 0
                for fila in todas:
                    fila['termino'] = termino
                    out.write(json.dumps(fila, ensure_ascii=False) + '\n')
                out.flush()
                hechos_f.write(termino + '\n')
                hechos_f.flush()
                hechos.add(termino)
                i += 1
                print(f'  [{i}/{len(pendientes)}] {termino}: {len(todas)} presentaciones ({paginas} pág.)',
                      file=sys.stderr)

    correr(pendientes)

    # In chain: ingredients that only show up inside results (often drugs not
    # sold in Spain, like PRIDINOL in a combination) are searched too, until
    # no new ones appear.
    if args.en_cadena:
        for ronda in range(1, args.en_cadena + 1):
            nuevos = candidatos_en_cadena(parcial, hechos)
            print(f'Ronda {ronda} en cadena: {len(nuevos)} términos nuevos', file=sys.stderr)
            if not nuevos:
                break
            correr(nuevos)

    # Package: header + one line per presentation (deduplicated).
    vistos, n = set(), 0
    with gzip.open(args.out, 'wt', encoding='utf-8') as gz, open(parcial, encoding='utf-8') as f:
        gz.write(json.dumps({
            '_paquete': 'anmat-vnm',
            'fuente': 'Vademécum Nacional de Medicamentos, ANMAT (Argentina)',
            'url': 'https://servicios.pami.org.ar/vademecum/views/consultaPublica/listado.zul',
            'generado': datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'),
        }, ensure_ascii=False) + '\n')
        for line in f:
            try:
                fila = json.loads(line)
            except Exception:  # noqa: BLE001
                continue
            clave = (fila['certificado'], fila['gtin'] or fila['presentacion'])
            if clave in vistos:
                continue
            vistos.add(clave)
            gz.write(json.dumps(fila, ensure_ascii=False) + '\n')
            n += 1
    print(f'Listo: {n} presentaciones en {args.out}', file=sys.stderr)


if __name__ == '__main__':
    main()
