"""Arma un paquete .zim en español a partir de un sitio web, con zimit.

Lee la descripción del paquete desde la variable de entorno PKG (un elemento
de tools/zim-es/packages.json) y deja el archivo en ./output/<id>_<AAAA-MM>.zim,
con el mismo formato de nombre que usan los paquetes de Kiwix.
"""

import datetime
import json
import os
import pathlib
import subprocess
import sys

IMAGE = os.environ.get("ZIMIT_IMAGE", "ghcr.io/openzim/zimit:latest")
MAX_BYTES = 2 * 1024**3  # límite de GitHub por archivo de una versión

pkg = json.loads(os.environ["PKG"])
period = datetime.date.today().strftime("%Y-%m")
out = pathlib.Path("output").resolve()
out.mkdir(exist_ok=True)
zim_name = f"{pkg['id']}_{period}.zim"

args = [
    "docker", "run", "--rm", "--shm-size=1gb",
    "-v", f"{out}:/output",
    IMAGE, "zimit",
    "--seeds", ",".join(pkg["seeds"]),
    "--name", pkg["id"],
    "--title", pkg["title"][:30],
    "--description", pkg["description"][:80],
    "--zim-lang", "spa",
    "--scopeType", pkg.get("scopeType", "prefix"),
    "--workers", str(pkg.get("workers", 4)),
    "--timeSoftLimit", str(pkg.get("timeLimitSeconds", 4 * 3600)),
    "--output", "/output",
    "--zim-file", zim_name,
]
for key in ("scopeIncludeRx", "scopeExcludeRx", "pageLimit"):
    if key in pkg:
        args += [f"--{key}", str(pkg[key])]

print("Ejecutando:", " ".join(args), flush=True)
subprocess.run(args, check=True)

zim = out / zim_name
if not zim.exists():
    sys.exit(f"No se generó {zim_name}")
size = zim.stat().st_size
print(f"{zim_name}: {size / 1024**2:.1f} MB")
if size > MAX_BYTES:
    sys.exit(f"{zim_name} pesa más de 2 GB: hay que partir el paquete en packages.json")

with open(os.environ.get("GITHUB_OUTPUT", os.devnull), "a") as fh:
    fh.write(f"zim={zim}\nzim_name={zim_name}\nsize_mb={round(size / 1024**2)}\n")
