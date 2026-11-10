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


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--out', required=True)
    ap.add_argument('--principios', help='lista separada por comas (por defecto, la muestra)')
    ap.add_argument('--max-por-principio', type=int, default=3)
    args = ap.parse_args()

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
