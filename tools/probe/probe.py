"""Temporal: muestra el texto sobre licencias y permisos de cada página o PDF. Se borra después de usarla."""
import io, re, sys, html, urllib.request, urllib.parse
UA = "Mozilla/5.0 (X11; Linux x86_64) project-nomad-es license check"
KW = re.compile(r"licen|derechos|reproduc|copyright|permiso|creative|autoriz|comercial|lucro|permission|reuse|freely|copiar|copied", re.I)
for url in open(sys.argv[1]).read().split():
    print("\n=====", url)
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=90) as r:
            data = r.read(40_000_000); print("final:", r.geturl(), r.headers.get("content-type"))
    except Exception as e:
        print("error:", e); continue
    if data[:4] == b"%PDF":
        from pypdf import PdfReader
        rd = PdfReader(io.BytesIO(data))
        text = "\n".join((rd.pages[i].extract_text() or "") for i in list(range(min(6, len(rd.pages)))) + list(range(max(6, len(rd.pages) - 2), len(rd.pages))))
    else:
        body = data.decode("utf-8", "replace")
        for l in sorted(set(re.findall(r'href="([^"]+\.pdf)"', body)))[:30]:
            print("  pdf:", urllib.parse.urljoin(url, l))
        body = re.sub(r"(?is)<(script|style).*?</\1>", " ", body)
        text = html.unescape(re.sub(r"<[^>]+>", " ", body))
    text = re.sub(r"\s+", " ", text)
    seen = 0
    for m in KW.finditer(text):
        if m.start() < seen: continue
        print("  …", text[max(0, m.start() - 250): m.start() + 450])
        seen = m.start() + 450
