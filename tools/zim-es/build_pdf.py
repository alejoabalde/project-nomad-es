"""Arma un paquete .zim en español a partir de una colección de PDF.

Lee la descripción del paquete desde la variable de entorno PKG (un elemento
de tools/zim-es/packages.json con "type": "pdf"). Cada documento entra solo si
su licencia se confirma:
  - "requireLicense": expresión que tiene que aparecer en el texto del PDF, o
  - "licensePage": {"url", "pattern"}: página web que tiene que mostrar la licencia, o
  - "licenseProof" del paquete: un PDF que muestra la licencia de toda la colección.
Un documento sin ninguna de las tres se rechaza. Los rechazados quedan en el log.
"""

import datetime
import html
import json
import os
import pathlib
import re
import struct
import subprocess
import sys
import urllib.request
import zlib

from libzim.writer import Creator, FileProvider, Hint, Item, StringProvider

MAX_BYTES = 2 * 1024**3
UA = "project-nomad-es zim builder (+https://github.com/alejoabalde/project-nomad-es)"

pkg = json.loads(os.environ["PKG"])
period = datetime.date.today().strftime("%Y-%m")
work = pathlib.Path("work").resolve()
out = pathlib.Path("output").resolve()
work.mkdir(exist_ok=True)
out.mkdir(exist_ok=True)
zim_name = f"{pkg['id']}_{period}.zim"


def fetch(url: str) -> bytes | None:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            return resp.read()
    except Exception as exc:  # noqa: BLE001
        print(f"  no se pudo descargar {url}: {exc}")
        return None


def pdf_text(path: pathlib.Path) -> str:
    """Texto de las primeras y últimas páginas, donde suele estar la licencia."""
    parts = []
    try:
        res = subprocess.run(
            ["pdftotext", "-l", "6", str(path), "-"], capture_output=True, text=True, timeout=120
        )
        parts.append(res.stdout)
    except Exception:  # noqa: BLE001
        pass
    # Últimas páginas: pdftotext necesita el número total, que da pdfinfo
    try:
        info = subprocess.run(["pdfinfo", str(path)], capture_output=True, text=True).stdout
        pages = int(re.search(r"Pages:\s+(\d+)", info).group(1))
        res = subprocess.run(
            ["pdftotext", "-f", str(max(1, pages - 3)), "-l", str(pages), str(path), "-"],
            capture_output=True, text=True, timeout=120,
        )
        parts.append(res.stdout)
    except Exception:  # noqa: BLE001
        pass
    return "\n".join(parts)


def expand(docs: list[dict]) -> list[dict]:
    result = []
    for doc in docs:
        if "range" in doc:
            start, end = doc["range"]
            for n in range(start, end + 1):
                d = {k: v for k, v in doc.items() if k != "range"}
                d["url"] = doc["url"].format(n=n)
                d["title"] = doc["title"].format(n=n)
                d["optional"] = True
                result.append(d)
        else:
            result.append(doc)
    return result


accepted, rejected = [], []
page_cache: dict[str, str] = {}

# Licencia del paquete entero: un PDF (por ejemplo, las primeras páginas de un
# libro) que tiene que mostrarla. Si pasa, cubre los documentos sin control propio.
package_license_ok = False
if pkg.get("licenseProof"):
    proof = pkg["licenseProof"]
    data = fetch(proof["url"])
    if data and data.startswith(b"%PDF"):
        proof_path = work / "licencia.pdf"
        proof_path.write_bytes(data)
        package_license_ok = bool(re.search(proof["pattern"], pdf_text(proof_path), re.IGNORECASE))
    print(f"Licencia del paquete ({proof['url']}): {'confirmada' if package_license_ok else 'NO confirmada'}")
downloaded = []
for i, doc in enumerate(expand(pkg["documents"]), start=1):
    print(f"[{i}] {doc['title']}")
    data = fetch(doc["url"])
    if not data or not data.startswith(b"%PDF"):
        if not doc.get("optional"):
            rejected.append((doc, "no se pudo descargar o no es un PDF"))
        continue
    path = work / f"doc{i:03d}.pdf"
    path.write_bytes(data)
    downloaded.append((doc, path))

# Si el PDF de prueba no estaba disponible, la licencia del paquete también
# queda confirmada si alguno de los documentos descargados la muestra.
if pkg.get("licenseProof") and not package_license_ok:
    for doc, path in downloaded:
        if re.search(pkg["licenseProof"]["pattern"], pdf_text(path), re.IGNORECASE):
            package_license_ok = True
            print(f"Licencia del paquete confirmada en: {doc['title']}")
            break

for doc, path in downloaded:
    ok, why = False, "sin licencia confirmada"
    if not doc.get("requireLicense") and not doc.get("licensePage") and package_license_ok:
        ok = True
    if doc.get("requireLicense"):
        if re.search(doc["requireLicense"], pdf_text(path), re.IGNORECASE):
            ok = True
        else:
            why = f"el PDF no menciona la licencia ({doc['requireLicense']})"
            # Para revisar a mano qué dice el PDF sobre derechos de autor
            text = pdf_text(path)
            hits = [m.start() for m in re.finditer(r"©|derechos|reproduc|licen|copyright", text, re.IGNORECASE)][:3]
            for h in hits:
                print("    texto:", " ".join(text[max(0, h - 80):h + 220].split()))
            if not text.strip():
                print("    texto: (el PDF no tiene texto extraíble)")
    if not ok and doc.get("licensePage"):
        lp = doc["licensePage"]
        if lp["url"] not in page_cache:
            page_cache[lp["url"]] = (fetch(lp["url"]) or b"").decode("utf-8", "replace")
        if re.search(lp["pattern"], page_cache[lp["url"]], re.IGNORECASE):
            ok = True
        else:
            why = f"la página de licencia no muestra {lp['pattern']}"
    if ok:
        accepted.append((doc, path))
        print(f"  aceptado: {doc['title']}")
    else:
        rejected.append((doc, why))
        print(f"  rechazado: {doc['title']}: {why}")

print(f"\nAceptados: {len(accepted)}  Rechazados: {len(rejected)}")
for doc, why in rejected:
    print(f"  - {doc['title']}: {why}")
if not accepted:
    sys.exit("Ningún documento con licencia confirmada: no se arma el paquete")

# Página índice en español
rows = []
for n, (doc, _) in enumerate(accepted, start=1):
    rows.append(
        f'<li><a href="doc/{n:03d}.pdf">{html.escape(doc["title"])}</a>'
        + (f' <small>— <a href="{html.escape(doc["source"])}">fuente</a></small>' if doc.get("source") else "")
        + "</li>"
    )
index = f"""<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(pkg['title'])}</title>
<style>body{{font-family:sans-serif;max-width:48rem;margin:2rem auto;padding:0 1rem;line-height:1.5}}
li{{margin:.4rem 0}} .credito{{margin-top:2rem;padding:1rem;background:#f3f3f0;border-radius:8px;font-size:.9rem}}</style>
</head><body>
<h1>{html.escape(pkg['title'])}</h1>
<p>{html.escape(pkg['description'])}</p>
<ol>{''.join(rows)}</ol>
<div class="credito">
<p><strong>Autoría:</strong> {html.escape(pkg.get('credit', ''))}</p>
<p><strong>Licencia:</strong> {html.escape(pkg.get('license', ''))}</p>
<p>{html.escape(pkg.get('note', ''))}</p>
<p>Fuente original: <a href="{html.escape(pkg.get('source', ''))}">{html.escape(pkg.get('source', ''))}</a></p>
</div>
</body></html>"""


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
        return {Hint.FRONT_ARTICLE: self.front}


zim = out / zim_name
creator = Creator(str(zim)).config_indexing(True, "spa")
with creator as c:
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
        "Tags": "_category:other;spa",
    }.items():
        c.add_metadata(key, value)
    c.add_item(Entry("index.html", pkg["title"], "text/html", content=index, front=True))
    for n, (doc, path) in enumerate(accepted, start=1):
        c.add_item(Entry(f"doc/{n:03d}.pdf", doc["title"], "application/pdf", filepath=path, front=True))

size = zim.stat().st_size
print(f"{zim_name}: {size / 1024**2:.1f} MB")
if size > MAX_BYTES:
    sys.exit(f"{zim_name} pesa más de 2 GB: hay que partir el paquete")
with open(os.environ.get("GITHUB_OUTPUT", os.devnull), "a") as fh:
    fh.write(f"zim={zim}\nzim_name={zim_name}\nsize_mb={round(size / 1024**2)}\n")
