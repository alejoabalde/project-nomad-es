#!/usr/bin/env python3
"""
Fork (project-nomad-es): pone un paquete nuevo en la carpeta de la rama «datos»
y rehace su README.md con los números de los dos paquetes, y paquetes.json con
la fecha de la publicación (NOMAD lo usa para avisar que hay datos nuevos).

No hace el commit: eso lo hace la tarea de GitHub, que reemplaza la rama entera
con un solo commit (sin historial), para que el repositorio no crezca.

Por seguridad, si el paquete nuevo tiene menos del 90 % de los registros del
anterior, no lo pone (suele ser una falla de la fuente) y sale con código 1.

Uso:
  python3 -I tools/datos/publicar.py --carpeta datos/ --paquete nuevo.jsonl.gz \\
      --nombre aemps-prospectos.jsonl.gz

Solo usa la biblioteca estándar.
"""
import argparse
import datetime
import gzip
import json
import os
import shutil
import sys

AEMPS = 'aemps-prospectos.jsonl.gz'
ANMAT = 'anmat-vnm.jsonl.gz'
MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto',
         'septiembre', 'octubre', 'noviembre', 'diciembre']


def leer(path):
    """(cabecera, [registros]) de un paquete .jsonl.gz."""
    cabecera, registros = {}, []
    with gzip.open(path, 'rt', encoding='utf-8') as f:
        for line in f:
            rec = json.loads(line)
            if '_paquete' in rec:
                cabecera = rec
            else:
                registros.append(rec)
    return cabecera, registros


def fecha_larga(iso):
    if not iso:
        return 'fecha desconocida'
    y, m, d = iso[:10].split('-')
    return f'{int(d)} de {MESES[int(m) - 1]} de {y}'


def miles(n):
    return f'{n:,}'.replace(',', '.')


def readme(carpeta):
    filas = []
    if os.path.exists(os.path.join(carpeta, AEMPS)):
        cab, regs = leer(os.path.join(carpeta, AEMPS))
        sin = sum(1 for r in regs if not r.get('receta'))
        filas.append(
            f'| `{AEMPS}` | Prospectos de los {miles(len(regs))} medicamentos comercializados en España con '
            f'prospecto en CIMA ({miles(sin)} sin receta, {miles(len(regs) - sin)} con receta), generado el '
            f'{fecha_larga(cab.get("generado"))} con `tools/aemps/build_package.py --todos`. | Centro de '
            'Información online de Medicamentos (CIMA) de la Agencia Española de Medicamentos y Productos '
            'Sanitarios (AEMPS), https://cima.aemps.es |')
    if os.path.exists(os.path.join(carpeta, ANMAT)):
        cab, regs = leer(os.path.join(carpeta, ANMAT))
        marcas = len({r.get('nombre_comercial') for r in regs})
        filas.append(
            f'| `{ANMAT}` | {miles(len(regs))} presentaciones de {miles(marcas)} marcas comerciales argentinas '
            f'con sus principios activos, extraídas despacio del buscador público el '
            f'{fecha_larga(cab.get("generado"))} con `tools/anmat/vnm_extract.py --en-cadena 3` (incluye drogas '
            'que no se venden en España). | Vademécum Nacional de Medicamentos, ANMAT (Argentina) |')
    return '\n'.join([
        '# Paquetes de datos de NOMAD en español',
        '',
        'Esta rama no tiene código: guarda los paquetes que la Guía de medicamentos',
        'descarga desde la pestaña **Datos** para funcionar sin conexión. Se reemplaza',
        'entera (sin historial) cada vez que se actualizan los paquetes, para que el',
        'repositorio no crezca. La actualizan solas las tareas de GitHub',
        '`datos-aemps.yml` (cada semana) y `datos-anmat.yml` (cada mes).',
        '',
        '| Archivo | Contenido | Fuente |',
        '|---|---|---|',
        *filas,
        '',
        'NOMAD no está afiliado a la AEMPS ni a la ANMAT ni cuenta con su aval. La',
        'información es de referencia y no reemplaza la consulta con un profesional de',
        'la salud.',
        '',
    ])


def version(carpeta):
    """paquetes.json: NOMAD lo lee para avisar que hay datos más nuevos que los instalados."""
    out = {'actualizado': datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')}
    for nombre in (AEMPS, ANMAT):
        path = os.path.join(carpeta, nombre)
        if os.path.exists(path):
            cab, regs = leer(path)
            out[nombre.removesuffix('.jsonl.gz')] = {'generado': cab.get('generado'), 'registros': len(regs)}
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--carpeta', required=True, help='carpeta con los archivos actuales de la rama datos')
    ap.add_argument('--paquete', required=True, help='paquete nuevo (.jsonl.gz)')
    ap.add_argument('--nombre', required=True, choices=[AEMPS, ANMAT], help='nombre del archivo en la rama')
    args = ap.parse_args()

    destino = os.path.join(args.carpeta, args.nombre)
    _, nuevos = leer(args.paquete)
    if os.path.exists(destino):
        _, viejos = leer(destino)
        print(f'{args.nombre}: antes {len(viejos)}, ahora {len(nuevos)} registros')
        if len(nuevos) < 0.9 * len(viejos):
            print('El paquete nuevo tiene menos del 90 % de los registros: no se publica.', file=sys.stderr)
            return 1
    shutil.copyfile(args.paquete, destino)
    with open(os.path.join(args.carpeta, 'README.md'), 'w', encoding='utf-8') as f:
        f.write(readme(args.carpeta))
    with open(os.path.join(args.carpeta, 'paquetes.json'), 'w', encoding='utf-8') as f:
        json.dump(version(args.carpeta), f, ensure_ascii=False, indent=2)
        f.write('\n')
    return 0


if __name__ == '__main__':
    sys.exit(main())
