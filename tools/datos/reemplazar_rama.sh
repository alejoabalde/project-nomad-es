#!/usr/bin/env bash
# Fork (project-nomad-es): pone un paquete en la rama «datos» y la reemplaza
# entera con un solo commit, sin historial, para que el repositorio no crezca.
# Lo usan las tareas datos-aemps.yml y datos-anmat.yml.
#
# Uso: reemplazar_rama.sh <paquete nuevo> <nombre en la rama> <mensaje>
# Necesita GH_TOKEN y GITHUB_REPOSITORY.
set -euo pipefail

PAQUETE="$1"
NOMBRE="$2"
MENSAJE="$3"
REPO_DIR="$(git rev-parse --show-toplevel)"
RAMA="$(mktemp -d)"

git -C "$REPO_DIR" fetch --quiet --depth 1 origin datos
git -C "$REPO_DIR" archive origin/datos | tar -x -C "$RAMA"
python3 -I "$REPO_DIR/tools/datos/publicar.py" --carpeta "$RAMA" --paquete "$PAQUETE" --nombre "$NOMBRE"

cd "$RAMA"
git init --quiet -b datos
git config user.name "github-actions[bot]"
git config user.email "41898299+github-actions[bot]@users.noreply.github.com"
git add -A
git commit --quiet -m "$MENSAJE"
DESTINO="${DATOS_DESTINO:-https://x-access-token:${GH_TOKEN}@github.com/${GITHUB_REPOSITORY}.git}"  # DATOS_DESTINO: solo para probar
git push --quiet --force "$DESTINO" datos:datos
echo "Rama datos reemplazada: $MENSAJE"
