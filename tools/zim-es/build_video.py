"""Arma un paquete .zim en español a partir de una lista de videos .mp4.

Sirve para cursos en video (como los de oficios de educ.ar) cuando el sitio
original no responde a GitHub o cuando zimit corta los videos largos. Cada
video se baja completo y se arma una página por clase con su título,
descripción, fuente y licencia.

Lee la descripción del paquete desde la variable de entorno PKG (un elemento
de tools/zim-es/packages.json con "type": "video") y deja el archivo en
./output/<id>_<AAAA-MM>.zim.
"""

import datetime
import html
import json
import struct
import os
import pathlib
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import zlib

from libzim.writer import Creator, FileProvider, Hint, Item, StringProvider

MAX_BYTES = 2 * 1024**3
UA = "Mozilla/5.0 (X11; Linux x86_64) project-nomad-es zim builder"

pkg = json.loads(os.environ["PKG"])
period = datetime.date.today().strftime("%Y-%m")
work = pathlib.Path("work").resolve()
out = pathlib.Path("output").resolve()
work.mkdir(exist_ok=True)
out.mkdir(exist_ok=True)
zim_name = f"{pkg['id']}_{period}.zim"


def download(url: str, dest: pathlib.Path, expected: int | None) -> bool:
    """Baja un archivo a disco; 3 intentos. Comprueba el tamaño si se conoce."""
    for attempt in range(3):
        safe = urllib.parse.quote(url, safe=":/%?=&")
        req = urllib.request.Request(safe, headers={"User-Agent": UA})
        try:
            with urllib.request.urlopen(req, timeout=120) as resp, open(dest, "wb") as fh:
                start = time.monotonic()
                while chunk := resp.read(1 << 20):
                    fh.write(chunk)
                    if time.monotonic() - start > 1800:
                        raise TimeoutError("más de 30 minutos descargando")
            size = dest.stat().st_size
            if expected and size != expected:
                raise ValueError(f"bajó {size} bytes y se esperaban {expected}")
            return True
        except urllib.error.HTTPError as exc:
            print(f"  no se pudo descargar {url}: {exc}")
            return False
        except Exception as exc:
            print(f"  no se pudo descargar {url} (intento {attempt + 1}): {exc}")
    return False


STYLE = (
    "body{font-family:sans-serif;max-width:52rem;margin:2rem auto;padding:0 1rem;line-height:1.5}"
    "video{width:100%;background:#000;border-radius:8px}li{margin:.4rem 0}"
    ".credito{margin-top:2rem;padding:1rem;background:#f3f3f0;border-radius:8px;font-size:.9rem}"
)


def page(title: str, body: str) -> str:
    return (
        '<!doctype html><html lang="es"><head><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width, initial-scale=1">'
        f"<title>{html.escape(title)}</title><style>{STYLE}</style></head><body>{body}</body></html>"
    )


credit_block = (
    '<div class="credito">'
    f"<p><strong>Autoría:</strong> {html.escape(pkg.get('credit', ''))}</p>"
    f"<p><strong>Licencia:</strong> {html.escape(pkg.get('license', ''))}</p>"
    + (f"<p>{html.escape(pkg['note'])}</p>" if pkg.get("note") else "")
    + "</div>"
)

accepted = []
for n, v in enumerate(pkg["videos"], start=1):
    dest = work / f"{n:03d}.mp4"
    print(f"Bajando {v['title']} ...", flush=True)
    if download(v["mp4"], dest, v.get("bytes")):
        accepted.append((n, v, dest))
        print(f"  aceptado: {v['title']} ({dest.stat().st_size / 1024**2:.0f} MB)")
    else:
        print(f"  rechazado: {v['title']}")

print(f"\nAceptados: {len(accepted)}  Rechazados: {len(pkg['videos']) - len(accepted)}")
if len(accepted) < len(pkg["videos"]):
    sys.exit("Faltan videos: no se arma el paquete incompleto")

rows = "".join(
    f'<li><a href="clase/{n:03d}.html">{html.escape(v["title"])}</a></li>' for n, v, _ in accepted
)
index = page(
    pkg["title"],
    f"<h1>{html.escape(pkg['title'])}</h1><p>{html.escape(pkg.get('intro') or pkg['description'])}</p>"
    f"<ol>{rows}</ol>{credit_block}",
)


class Entry(Item):
    def __init__(self, path, title, mimetype, content=None, filepath=None, front=False):
        super().__init__()
        self.path, self.title, self.mimetype = path, title, mimetype
        self.content, self.filepath, self.front = content, filepath, front

    def get_path(self):
        return self.path

    def get_title(self):
        return self.title

    def get_mimetype(self):
        return self.mimetype

    def get_contentprovider(self):
        if self.filepath:
            return FileProvider(str(self.filepath))
        return StringProvider(self.content)

    def get_hints(self):
        return {Hint.FRONT_ARTICLE: self.front, Hint.COMPRESS: self.mimetype.startswith("text/")}


def png_48() -> bytes:
    """Ícono simple de 48x48 (verde), obligatorio en los paquetes .zim."""
    raw = b"".join(b"\x00" + b"\x2e\x7d\x32" * 48 for _ in range(48))

    def chunk(t: bytes, d: bytes) -> bytes:
        return struct.pack(">I", len(d)) + t + d + struct.pack(">I", zlib.crc32(t + d) & 0xFFFFFFFF)

    return (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", struct.pack(">IIBBBBB", 48, 48, 8, 2, 0, 0, 0))
        + chunk(b"IDAT", zlib.compress(raw))
        + chunk(b"IEND", b"")
    )

zim = out / zim_name
with Creator(str(zim)).config_indexing(True, "spa") as c:
    c.set_mainpath("index.html")
    c.add_illustration(48, png_48())
    for key, value in {
        "Name": pkg["id"],
        "Title": pkg["title"][:30],
        "Description": pkg["description"][:80],
        "Language": "spa",
        "Creator": pkg.get("credit", "")[:200] or "Varios",
        "Publisher": "project-nomad-es",
        "Date": datetime.date.today().isoformat(),
        "Tags": "_category:other;spa;_videos:yes",
    }.items():
        c.add_metadata(key, value)
    c.add_item(Entry("index.html", pkg["title"], "text/html", content=index, front=True))
    for i, (n, v, dest) in enumerate(accepted):
        nav = '<p><a href="../index.html">Índice del curso</a>'
        if i > 0:
            nav += f' · <a href="{accepted[i - 1][0]:03d}.html">Clase anterior</a>'
        if i + 1 < len(accepted):
            nav += f' · <a href="{accepted[i + 1][0]:03d}.html">Clase siguiente</a>'
        nav += "</p>"
        body = (
            f"{nav}<h1>{html.escape(v['title'])}</h1>"
            f'<video controls preload="metadata" src="../video/{n:03d}.mp4"></video>'
            f"<p>{html.escape(v.get('description', ''))}</p>"
            + (f'<p>Fuente: <a href="{html.escape(v["page"])}">{html.escape(v["page"])}</a></p>' if v.get("page") else "")
            + credit_block
        )
        c.add_item(Entry(f"clase/{n:03d}.html", v["title"], "text/html", content=page(v["title"], body), front=True))
        c.add_item(Entry(f"video/{n:03d}.mp4", v["title"], "video/mp4", filepath=dest))

size = zim.stat().st_size
print(f"{zim_name}: {size / 1024**2:.1f} MB")
if size > MAX_BYTES:
    sys.exit(f"{zim_name} pesa más de 2 GB: hay que partir el paquete en packages.json")
with open(os.environ.get("GITHUB_OUTPUT", os.devnull), "a") as fh:
    fh.write(f"zim={zim}\nzim_name={zim_name}\nsize_mb={round(size / 1024**2)}\n")
