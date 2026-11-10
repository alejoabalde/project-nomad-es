#!/usr/bin/env python3
"""
Arma el paquete de prospectos en español de CIMA (AEMPS) para la Guía de
medicamentos de NOMAD.

El paquete es un .jsonl.gz con un medicamento por línea. NOMAD lo importa una
vez y después funciona sin conexión; nunca consulta la API de CIMA en uso.

Fuente: Centro de Información online de Medicamentos de la AEMPS (CIMA),
https://cima.aemps.es . Según el aviso legal de la AEMPS, la información se
puede reutilizar citando la fuente y la fecha de la última actualización; cada
registro guarda esa fecha (`fecha_prospecto`).

Uso:
    python3 build_package.py --out aemps-prospectos.jsonl.gz            # muestra
    python3 build_package.py --out ... --principios paracetamol,ibuprofeno
    python3 build_package.py --out ... --max-por-principio 3
    python3 build_package.py --out aemps-prospectos.jsonl.gz --todos    # completo

Con --todos recorre todos los medicamentos comercializados (unos 16.000) y
pide un solo documento por medicamento. Es reanudable: va escribiendo en
<out>.parcial.jsonl y, si se corta, al volver a correrlo saltea los que ya
tiene. Al terminar comprime el resultado en <out>.

Solo usa la biblioteca estándar de Python.
"""

import argparse
import gzip
import json
import sys
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from html.parser import HTMLParser

BASE = 'https://cima.aemps.es/cima/rest'
USER_AGENT = 'project-nomad-es-aemps-builder/0.1'

# Muestra del prototipo: principios activos frecuentes, la mayoría con
# presentaciones de venta sin receta.
MUESTRA = [
    'paracetamol', 'ibuprofeno', 'loratadina', 'cetirizina', 'omeprazol',
    'loperamida', 'diclofenaco', 'acido acetilsalicilico', 'salbutamol',
    'dexclorfeniramina', 'metoclopramida', 'clotrimazol', 'hidrocortisona',
    'amoxicilina', 'almagato',
]


def get(path, params=None, accept='application/json', retries=3):
    url = f'{BASE}/{path}'
    if params:
        url += '?' + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={'Accept': accept, 'User-Agent': USER_AGENT})
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                body = resp.read().decode('utf-8')
                if resp.status == 204 or not body.strip():
                    return None
                return json.loads(body) if accept == 'application/json' else body
        except Exception as err:  # noqa: BLE001 — se reintenta y se informa
            if attempt == retries - 1:
                raise
            time.sleep(2 ** attempt)
    return None


class _TextExtractor(HTMLParser):
    """HTML del prospecto -> texto con un párrafo por línea y viñetas '• '."""

    BLOCK = {'p', 'div', 'br', 'tr', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'table'}

    def __init__(self):
        super().__init__()
        self.lines = []
        self.cur = []
        self.in_li = False

    def _flush(self):
        text = ' '.join(''.join(self.cur).split())
        if text:
            self.lines.append(('• ' if self.in_li else '') + text)
        self.cur = []

    def handle_starttag(self, tag, attrs):
        if tag == 'li':
            self._flush()
            self.in_li = True
        elif tag in self.BLOCK:
            self._flush()

    def handle_endtag(self, tag):
        if tag == 'li':
            self._flush()
            self.in_li = False
        elif tag in self.BLOCK:
            self._flush()

    def handle_data(self, data):
        self.cur.append(data)

    def text(self):
        self._flush()
        return '\n'.join(self.lines)


def html_to_text(html):
    p = _TextExtractor()
    p.feed(html or '')
    return p.text()


def buscar(principio, max_n):
    """Medicamentos comercializados de un principio activo, sin receta primero."""
    vistos, candidatos = set(), []
    for params in ({'practiv1': principio, 'comerc': 1}, {'nombre': principio, 'comerc': 1}):
        pagina = 1
        while True:
            data = get('medicamentos', {**params, 'pagina': pagina})
            res = (data or {}).get('resultados') or []
            for m in res:
                if m['nregistro'] not in vistos:
                    vistos.add(m['nregistro'])
                    candidatos.append(m)
            total = (data or {}).get('totalFilas') or 0
            if pagina * (data or {}).get('tamanioPagina', 25) >= total or not res or pagina >= 4:
                break
            pagina += 1
            time.sleep(0.3)
        if candidatos:
            break

    def tiene_prospecto(m):
        return any(d.get('tipo') == 2 and d.get('secc') for d in m.get('docs') or [])

    candidatos = [m for m in candidatos if tiene_prospecto(m)]
    # Sin receta primero; entre iguales, el nombre más corto (suele ser el genérico).
    candidatos.sort(key=lambda m: (bool(m.get('receta')), len(m.get('nombre') or '')))
    return candidatos[:max_n]


def armar_registro(nregistro):
    med = get('medicamento', {'nregistro': nregistro})
    if not med:
        return None
    secciones = get(f'docSegmentado/secciones/2', {'nregistro': nregistro}) or []
    contenido = []
    for s in sorted(secciones, key=lambda x: x.get('orden', 0)):
        html = get(f'docSegmentado/contenido/2', {'nregistro': nregistro, 'seccion': s['seccion']},
                   accept='text/html')
        texto = html_to_text(html)
        if texto:
            contenido.append({'seccion': s['seccion'], 'titulo': s.get('titulo') or '', 'texto': texto})
        time.sleep(0.2)
    doc = next((d for d in med.get('docs') or [] if d.get('tipo') == 2), {})
    fecha = doc.get('fecha')
    return {
        'nregistro': med['nregistro'],
        'nombre': med.get('nombre'),
        'principios_activos': [p.get('nombre') for p in med.get('principiosActivos') or []],
        'vtm': (med.get('vtm') or {}).get('nombre'),
        'laboratorio': med.get('labtitular'),
        'receta': bool(med.get('receta')),
        'condicion_prescripcion': med.get('cpresc'),
        'vias': [v.get('nombre') for v in med.get('viasAdministracion') or []],
        'forma': (med.get('formaFarmaceutica') or {}).get('nombre'),
        'atc': [a.get('codigo') for a in med.get('atcs') or []],
        'fecha_prospecto': (
            datetime.fromtimestamp(fecha / 1000, tz=timezone.utc).strftime('%Y-%m-%d') if fecha else None
        ),
        'url_prospecto': doc.get('urlHtml'),
        'secciones': contenido,
    }


def html_secciones(nregistro):
    """Todas las secciones del prospecto en un solo pedido."""
    data = get('docSegmentado/contenido/2', {'nregistro': nregistro}) or []
    out = []
    for s in data:
        texto = html_to_text(s.get('contenido') or '')
        if texto:
            out.append({'seccion': s.get('seccion', ''), 'titulo': s.get('titulo') or '', 'texto': texto})
    return out


def registro_desde_listado(m, secciones):
    doc = next((d for d in m.get('docs') or [] if d.get('tipo') == 2), {})
    fecha = doc.get('fecha')
    vtm = ((m.get('vtm') or {}).get('nombre') or '').strip() or None
    return {
        'nregistro': m['nregistro'],
        'nombre': m.get('nombre'),
        'principios_activos': [p.strip().upper() for p in vtm.split('+')] if vtm else [],
        'vtm': vtm,
        'laboratorio': m.get('labtitular'),
        'receta': bool(m.get('receta')),
        'condicion_prescripcion': m.get('cpresc'),
        'vias': [v.get('nombre') for v in m.get('viasAdministracion') or []],
        'forma': (m.get('formaFarmaceutica') or {}).get('nombre'),
        'atc': [],
        'fecha_prospecto': (
            datetime.fromtimestamp(fecha / 1000, tz=timezone.utc).strftime('%Y-%m-%d') if fecha else None
        ),
        'url_prospecto': doc.get('urlHtml'),
        'secciones': secciones,
    }


def armar_todos(out_path, pausa):
    import os
    parcial = out_path + '.parcial.jsonl'
    hechos = set()
    if os.path.exists(parcial):
        with open(parcial, encoding='utf-8') as f:
            for line in f:
                try:
                    hechos.add(json.loads(line)['nregistro'])
                except Exception:  # noqa: BLE001 — línea cortada por una interrupción
                    pass
    print(f'Reanudando: {len(hechos)} ya bajados', file=sys.stderr)

    # 1) Listado completo de comercializados (200 por página).
    meds, pagina = [], 1
    while True:
        data = get('medicamentos', {'comerc': 1, 'pagina': pagina}) or {}
        res = data.get('resultados') or []
        meds.extend(res)
        if not res or pagina * (data.get('tamanioPagina') or 200) >= (data.get('totalFilas') or 0):
            break
        pagina += 1
        time.sleep(pausa)
    con_prospecto = [m for m in meds if any(d.get('tipo') == 2 and d.get('secc') for d in m.get('docs') or [])]
    pendientes = [m for m in con_prospecto if m['nregistro'] not in hechos]
    print(f'{len(meds)} comercializados, {len(con_prospecto)} con prospecto segmentado, '
          f'{len(pendientes)} pendientes', file=sys.stderr)

    # 2) Un pedido por medicamento.
    errores = 0
    with open(parcial, 'a', encoding='utf-8') as out:
        for i, m in enumerate(pendientes, 1):
            try:
                secciones = html_secciones(m['nregistro'])
            except Exception as err:  # noqa: BLE001
                errores += 1
                print(f"ERROR {m['nregistro']}: {err}", file=sys.stderr)
                time.sleep(pausa * 10)
                continue
            if secciones:
                out.write(json.dumps(registro_desde_listado(m, secciones), ensure_ascii=False) + '\n')
                out.flush()
            if i % 200 == 0:
                print(f'  {i}/{len(pendientes)} ({errores} errores)', file=sys.stderr)
            time.sleep(pausa)

    # 3) Comprimir con la cabecera.
    n = 0
    with gzip.open(out_path, 'wt', encoding='utf-8') as gz, open(parcial, encoding='utf-8') as f:
        gz.write(json.dumps({
            '_paquete': 'aemps-prospectos',
            'fuente': 'CIMA, Agencia Española de Medicamentos y Productos Sanitarios (AEMPS)',
            'url': 'https://cima.aemps.es',
            'generado': datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'),
        }, ensure_ascii=False) + '\n')
        vistos = set()
        for line in f:
            try:
                rec = json.loads(line)
            except Exception:  # noqa: BLE001
                continue
            if rec['nregistro'] in vistos:
                continue
            vistos.add(rec['nregistro'])
            gz.write(line if line.endswith('\n') else line + '\n')
            n += 1
    print(f'{n} medicamentos en {out_path} ({errores} errores en esta pasada)', file=sys.stderr)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--out', required=True)
    ap.add_argument('--principios', help='lista separada por comas (por defecto, la muestra)')
    ap.add_argument('--max-por-principio', type=int, default=3)
    ap.add_argument('--todos', action='store_true', help='todos los comercializados (reanudable)')
    ap.add_argument('--pausa', type=float, default=0.3, help='segundos entre pedidos')
    args = ap.parse_args()

    if args.todos:
        armar_todos(args.out, args.pausa)
        return

    principios = [p.strip() for p in args.principios.split(',')] if args.principios else MUESTRA
    n, errores = 0, []
    with gzip.open(args.out, 'wt', encoding='utf-8') as out:
        meta = {
            '_paquete': 'aemps-prospectos',
            'fuente': 'CIMA, Agencia Española de Medicamentos y Productos Sanitarios (AEMPS)',
            'url': 'https://cima.aemps.es',
            'generado': datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'),
        }
        out.write(json.dumps(meta, ensure_ascii=False) + '\n')
        for principio in principios:
            try:
                meds = buscar(principio, args.max_por_principio)
            except Exception as err:  # noqa: BLE001
                errores.append(f'{principio}: {err}')
                continue
            for m in meds:
                try:
                    reg = armar_registro(m['nregistro'])
                except Exception as err:  # noqa: BLE001
                    errores.append(f"{m['nregistro']}: {err}")
                    continue
                if reg and reg['secciones']:
                    out.write(json.dumps(reg, ensure_ascii=False) + '\n')
                    n += 1
                    print(f"  {principio}: {reg['nombre']} ({'con' if reg['receta'] else 'sin'} receta)",
                          file=sys.stderr)
    print(f'{n} medicamentos escritos en {args.out}', file=sys.stderr)
    for e in errores:
        print(f'ERROR {e}', file=sys.stderr)


if __name__ == '__main__':
    main()
