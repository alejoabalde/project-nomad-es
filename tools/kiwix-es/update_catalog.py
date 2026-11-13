#!/usr/bin/env python3
"""
Fork (project-nomad-es): busca versiones nuevas en Kiwix para el catálogo en
español (collections/es/*.json) y actualiza url, version y size_mb.

Cada archivo de Kiwix lleva la fecha en el nombre (p. ej.
wikipedia_es_top_nopic_2026-10.zim) y Kiwix borra las versiones viejas con el
tiempo, así que los enlaces del catálogo se rompen si nadie los actualiza.
NOMAD original actualiza su propio catálogo, pero la copia en español es aparte.

Para cada enlace de download.kiwix.org, el script lee la lista de la carpeta
(p. ej. https://download.kiwix.org/zim/wikipedia/), busca el archivo con el
mismo nombre y la fecha más nueva, y si es más nuevo que el del catálogo lo
reemplaza. El tamaño se toma de la descarga nueva (Content-Length).

Los archivos se editan como texto (no se reescribe el JSON entero) para que
el cambio quede chico y fácil de revisar. Si cambia algo, también se pone la
fecha de hoy en spec_version para que NOMAD note que el catálogo es nuevo.

Uso:
  python3 -I tools/kiwix-es/update_catalog.py [--resumen resumen.md] [--probar]

  --probar  muestra lo que cambiaría sin tocar los archivos.

Solo usa la biblioteca estándar.
"""
import argparse
import datetime
import glob
import os
import re
import sys
import urllib.error
import urllib.request

KIWIX = "https://download.kiwix.org/zim/"
URL_RE = re.compile(r'https://download\.kiwix\.org/zim/([^"/]+)/([^"/]+)_(\d{4}-\d{2})\.zim')
USER_AGENT = "project-nomad-es catalog updater (+https://github.com/alejoabalde/project-nomad-es)"
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def fetch(url, method="GET"):
    req = urllib.request.Request(url, method=method, headers={"User-Agent": USER_AGENT})
    return urllib.request.urlopen(req, timeout=60)


_listings = {}


def latest_versions(folder):
    """Devuelve {nombre_base: fecha_mas_nueva} para una carpeta de Kiwix."""
    if folder not in _listings:
        with fetch(KIWIX + folder + "/") as r:
            html = r.read().decode("utf-8", "replace")
        found = {}
        for base, date in re.findall(r'href="(?:[^"]*/)?([^"/]+)_(\d{4}-\d{2})\.zim"', html):
            if date > found.get(base, ""):
                found[base] = date
        _listings[folder] = found
    return _listings[folder]


def size_mb(url):
    try:
        with fetch(url, method="HEAD") as r:
            length = r.headers.get("Content-Length")
        return round(int(length) / 1024 / 1024) if length else None
    except (urllib.error.URLError, ValueError, TimeoutError):
        return None


def update_object(text, old_url, new_url, new_version, new_size):
    """Cambia url, version y size_mb en cada objeto que tenga old_url."""
    obj_re = re.compile(r'\{[^{}]*"url": "' + re.escape(old_url) + r'"[^{}]*\}')

    def fix(m):
        block = m.group(0).replace(old_url, new_url)
        block = re.sub(r'("version": ")[^"]*(")', r"\g<1>" + new_version + r"\g<2>", block)
        if new_size is not None:
            block = re.sub(r'("size_mb": )\d+', r"\g<1>" + str(new_size), block)
        return block

    return obj_re.sub(fix, text)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--resumen", help="archivo Markdown con el resumen de cambios")
    ap.add_argument("--probar", action="store_true", help="no escribir los archivos")
    args = ap.parse_args()

    files = sorted(glob.glob(os.path.join(REPO, "collections", "es", "*.json")))
    today = datetime.date.today().isoformat()
    updated, missing, errors = [], [], []

    for path in files:
        text = open(path, encoding="utf-8").read()
        original = text
        for folder, base, date in sorted(set(URL_RE.findall(text))):
            old_url = f"{KIWIX}{folder}/{base}_{date}.zim"
            try:
                latest = latest_versions(folder).get(base)
            except (urllib.error.URLError, TimeoutError) as e:
                errors.append(f"{folder}/: {e}")
                continue
            if latest is None:
                missing.append(old_url)
            elif latest > date:
                new_url = f"{KIWIX}{folder}/{base}_{latest}.zim"
                new_size = size_mb(new_url)
                text = update_object(text, old_url, new_url, latest, new_size)
                updated.append((os.path.relpath(path, REPO), base, date, latest, new_size))
                print(f"{base}: {date} -> {latest} ({new_size} MB)")
        if text != original:
            text = re.sub(r'("spec_version": ")[^"]*(")', r"\g<1>" + today + r"\g<2>", text, count=1)
            if not args.probar:
                open(path, "w", encoding="utf-8").write(text)

    lines = []
    if updated:
        lines += ["### Versiones nuevas", "", "| Archivo | Paquete | Antes | Ahora | Tamaño |", "|---|---|---|---|---|"]
        for f, base, old, new, size in updated:
            lines.append(f"| `{f}` | `{base}` | {old} | {new} | {size if size is not None else '?'} MB |")
        lines.append("")
    if missing:
        lines += ["### Ya no están en Kiwix (hay que revisarlos a mano)", "",
                  "Kiwix no tiene ninguna versión con este nombre. Puede que lo hayan renombrado o retirado.", ""]
        lines += [f"- {u}" for u in missing] + [""]
    if errors:
        lines += ["### No se pudo leer", ""] + [f"- {e}" for e in errors] + [""]
    if not lines:
        lines = ["El catálogo en español ya tiene las versiones más nuevas de Kiwix."]

    summary = "\n".join(lines)
    print()
    print(summary)
    if args.resumen:
        open(args.resumen, "w", encoding="utf-8").write(summary + "\n")
    # Falla solo si no se pudo leer ninguna carpeta de Kiwix.
    return 1 if errors and not _listings else 0


if __name__ == "__main__":
    sys.exit(main())
