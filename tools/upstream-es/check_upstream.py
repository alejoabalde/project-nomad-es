#!/usr/bin/env python3
"""
Fork (project-nomad-es): avisa cuando NOMAD original publica una versión nueva.

Compara la última versión publicada de NOMAD original (etiquetas vX.Y.Z del
repositorio original, sin las -rc) con la más nueva que ya está unida a este
fork. Si hay una más nueva, escribe el texto de un aviso (issue) con:

  - qué pantallas cambiaron (textos que pueden necesitar traducción),
  - qué páginas de documentación cambiaron (y su par en admin/docs/es/),
  - qué cambió en el catálogo de contenido (collections/*.json),
  - las instrucciones para que un agente haga la unión y la traducción
    y deje un PR para aprobar.

Necesita un clon con la historia completa y las etiquetas del remoto
«upstream» guardadas aparte, en refs/upstream-tags/ (el fork tiene sus propias
etiquetas vX.Y.Z, las de cada versión en español, y no deben pisarse):

  git fetch --no-tags upstream '+refs/tags/*:refs/upstream-tags/*'

Uso:
  python3 -I tools/upstream-es/check_upstream.py --salida aviso.md
  python3 -I tools/upstream-es/check_upstream.py --desde v1.34.1 --hasta v1.35.1 --salida prueba.md

Escribe en la salida estándar (y en $GITHUB_OUTPUT si existe):
  nueva=<etiqueta nueva o vacío>  base=<etiqueta unida>
Solo usa la biblioteca estándar.
"""
import argparse
import os
import re
import subprocess
import sys

UPSTREAM_URL = "https://github.com/Crosstalk-Solutions/project-nomad"
TAG_RE = re.compile(r"^v(\d+)\.(\d+)\.(\d+)$")
MAX_FILES = 60  # por sección, para que el aviso no sea enorme


def git(*args, check=True):
    r = subprocess.run(["git", *args], capture_output=True, text=True)
    if check and r.returncode != 0:
        sys.exit(f"git {' '.join(args)}: {r.stderr.strip()}")
    return r.stdout


def ref(tag):
    """Etiqueta de NOMAD original, guardada aparte de las del fork."""
    return f"refs/upstream-tags/{tag}"


def stable_tags():
    names = git("for-each-ref", "--format=%(refname:strip=2)", "refs/upstream-tags/").split()
    tags = [t for t in names if TAG_RE.match(t)]
    return sorted(tags, key=lambda t: tuple(int(x) for x in TAG_RE.match(t).groups()))


def is_ancestor(tag, head="HEAD"):
    return subprocess.run(["git", "merge-base", "--is-ancestor", ref(tag), head]).returncode == 0


def changed(base, new):
    """[(estado, archivo, lineas_cambiadas)] entre dos etiquetas."""
    stats = {}
    for line in git("diff", "--numstat", ref(base), ref(new)).splitlines():
        add, rem, path = line.split("\t", 2)
        stats[path] = (0 if add == "-" else int(add)) + (0 if rem == "-" else int(rem))
    out = []
    for line in git("diff", "--name-status", ref(base), ref(new)).splitlines():
        parts = line.split("\t")
        status, path = parts[0][0], parts[-1]
        out.append((status, path, stats.get(path, stats.get(parts[1], 0))))
    return out


STATUS = {"A": "nuevo", "M": "cambió", "D": "borrado", "R": "renombrado"}


def file_list(items, extra=None):
    lines = []
    for status, path, n in items[:MAX_FILES]:
        target = extra(path) if extra else None
        note = f" → `{target}`" if target else ""
        lines.append(f"- [ ] `{path}` ({STATUS.get(status, status)}, {n} líneas){note}")
    if len(items) > MAX_FILES:
        lines.append(f"- … y {len(items) - MAX_FILES} archivos más")
    return lines


def build_body(base, new):
    files = changed(base, new)
    screens = [f for f in files if f[1].startswith("admin/inertia/") and re.search(r"\.(tsx?|jsx?)$", f[1])
               and "/locales/" not in f[1]]
    docs = [f for f in files if re.match(r"admin/docs/[^/]+\.md$", f[1])]
    catalog = [f for f in files if re.match(r"collections/[^/]+\.json$", f[1])]
    shown = {f[1] for f in screens + docs + catalog}
    other = [f for f in files if f[1] not in shown]

    b = [
        f"NOMAD original publicó **{new}**. La versión en español está en **{base}**.",
        "",
        f"- Notas de la versión: {UPSTREAM_URL}/releases/tag/{new}",
        f"- Todos los cambios: {UPSTREAM_URL}/compare/{base}...{new}",
        "",
        "Este aviso lo abre una tarea automática. Lo que falta es unir la versión nueva "
        "y traducir lo nuevo. Para eso, copia el pedido del final y dáselo a un agente.",
        "",
        f"## Pantallas que cambiaron ({len(screens)})",
        "",
        "NOMAD original escribe los textos directamente en las pantallas, en inglés. "
        "En el fork van a `admin/inertia/locales/en/` y `admin/inertia/locales/es/`. "
        "Hay que revisar estos archivos y pasar a esos dos lugares cualquier texto nuevo o cambiado.",
        "",
    ]
    b += file_list(screens) or ["Ninguna."]
    b += ["", f"## Documentación que cambió ({len(docs)})", "",
          "Cada página tiene su traducción en `admin/docs/es/`.", ""]
    b += file_list(docs, extra=lambda p: p.replace("admin/docs/", "admin/docs/es/")) or ["Ninguna."]
    b += ["", f"## Catálogo de contenido ({len(catalog)})", "",
          "El catálogo en español (`collections/es/`) es una copia aparte. Si NOMAD original sumó "
          "contenido nuevo, decide si también va en la versión en español.", ""]
    b += file_list(catalog, extra=lambda p: p.replace("collections/", "collections/es/")
                   if os.path.exists(p.replace("collections/", "collections/es/")) else None) or ["Ninguno."]
    b += ["", "<details><summary>Otros archivos que cambiaron (" + str(len(other)) + ")</summary>", ""]
    b += [f"- `{p}` ({STATUS.get(s, s)})" for s, p, _ in other[:200]]
    if len(other) > 200:
        b.append(f"- … y {len(other) - 200} más")
    b += ["", "</details>", ""]
    b += [
        "## Pedido para el agente",
        "",
        "```text",
        f"En el repositorio alejoabalde/project-nomad-es, une la versión {new} de NOMAD original "
        f"({UPSTREAM_URL}) y traduce lo nuevo al español. Este aviso tiene la lista de archivos.",
        "",
        f"1. Crea una rama desde main y une la etiqueta {new} del remoto upstream "
        f"(git fetch --no-tags upstream refs/tags/{new}:refs/upstream-tags/{new} && "
        f"git merge refs/upstream-tags/{new}). No traigas las etiquetas de upstream con --tags: "
        "el fork tiene sus propias etiquetas vX.Y.Z.",
        "2. Si hay conflictos, conserva lo del fork (textos con t(), locales, archivos de collections/es, "
        "admin/docs/es) y suma lo nuevo de NOMAD original. No borres nada que NOMAD original tenga: "
        "el fork suma, no reemplaza.",
        "3. Pantallas: cada texto nuevo o cambiado pasa a admin/inertia/locales/en (en inglés, igual que "
        "el original) y a admin/inertia/locales/es (en español), y la pantalla usa t().",
        "4. Documentación: actualiza la página equivalente en admin/docs/es/, incluida release-notes.md.",
        "5. Catálogo: anota en el PR qué contenido nuevo sumó NOMAD original a collections/*.json, "
        "sin agregarlo a collections/es/ hasta que yo lo decida.",
        "6. Instaladores: si cambió install/install_nomad.sh, aplica el mismo cambio en "
        "install/install_nomad_debian.sh, install_nomad_fedora.sh e install_nomad_arch.sh, "
        "manteniendo lo propio de cada uno (la imagen en español y los comandos de cada sistema).",
        "7. Español neutro, tratando de tú. Sin jerga técnica en los textos que ve la persona.",
        "8. Corre las pruebas de admin (npm test) y la compilación, y abre un PR contra main que cierre "
        "este aviso. Explica en el PR qué se tradujo y qué quedó pendiente.",
        "```",
    ]
    return "\n".join(b) + "\n"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--salida", required=True, help="archivo donde escribir el texto del aviso")
    ap.add_argument("--desde", help="etiqueta base (por defecto, la más nueva ya unida)")
    ap.add_argument("--hasta", help="etiqueta nueva (por defecto, la más nueva publicada)")
    args = ap.parse_args()

    tags = stable_tags()
    if not tags:
        sys.exit("No hay etiquetas vX.Y.Z de upstream: falta git fetch --no-tags upstream '+refs/tags/*:refs/upstream-tags/*'")
    base = args.desde or next((t for t in reversed(tags) if is_ancestor(t)), None)
    new = args.hasta or tags[-1]
    if base is None:
        sys.exit("Ninguna versión de NOMAD original está unida a esta rama.")

    forced = args.desde or args.hasta
    nueva = "" if new == base or (is_ancestor(new) and not forced) else new
    print(f"base={base}")
    print(f"nueva={nueva}")
    if os.environ.get("GITHUB_OUTPUT"):
        with open(os.environ["GITHUB_OUTPUT"], "a") as f:
            f.write(f"base={base}\nnueva={nueva}\n")
    if nueva:
        with open(args.salida, "w", encoding="utf-8") as f:
            f.write(build_body(base, nueva))
    return 0


if __name__ == "__main__":
    sys.exit(main())
