#!/usr/bin/env bash
# Arma en tu PC los paquetes de video que GitHub no puede armar (los que tienen
# "build": "local" en packages.json, por ejemplo los de YouTube, que bloquea a
# los servidores de GitHub) y los sube a la versión paquetes-es del fork.
#
# Uso:  bash armar-local.sh                 # todos los paquetes "local" activos
#       bash armar-local.sh <id> [<id>...]  # solo esos
#
# Necesita: python3, ffmpeg y gh (con sesión iniciada). En Fedora:
#   sudo dnf install python3 ffmpeg-free gh
# El resto (libzim, yt-dlp y Deno) se instala solo en un entorno aparte.
set -euo pipefail
REPO=alejoabalde/project-nomad-es
REF=${REF:-main}
DIR=~/nomad/zim-es-build
mkdir -p "$DIR" && cd "$DIR"

for f in packages.json build_video.py; do
  curl -fsSL "https://raw.githubusercontent.com/$REPO/$REF/tools/zim-es/$f" -o "$f"
done

if [ ! -x venv/bin/python ]; then
  python3 -m venv venv
fi
venv/bin/pip install -q -U 'libzim==3.7.0' 'yt-dlp[default]' deno
export PATH="$DIR/venv/bin:$PATH"

if [ $# -eq 0 ]; then
  mapfile -t IDS < <(python3 -c 'import json;[print(p["id"]) for p in json.load(open("packages.json"))["packages"] if p.get("build")=="local" and p.get("enabled",True)]')
else
  IDS=("$@")
fi

for id in "${IDS[@]}"; do
  echo "== $id"
  PKG=$(python3 -c 'import json,sys;print(json.dumps(next(p for p in json.load(open("packages.json"))["packages"] if p["id"]==sys.argv[1])))' "$id")
  rm -rf work
  if PKG="$PKG" python build_video.py; then
    zim=$(ls -t output/"${id}"_*.zim | head -1)
    gh release upload paquetes-es "$zim" --clobber --repo "$REPO"
    echo "Subido: $zim"
  else
    echo "No se pudo armar $id (ver mensajes de arriba)"
  fi
done
rm -rf work
echo "Listo. Podés borrar $DIR/output cuando esté todo subido."
