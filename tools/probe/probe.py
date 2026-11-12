"""Revisión de licencias: baja cada página y muestra lo que dice sobre derechos.
Es temporal; se borra después de usarla."""
import html, re, sys, urllib.request
UA = "Mozilla/5.0 (X11; Linux x86_64) project-nomad-es license check"
KW = re.compile(r"copyright|derechos|licen|creative\s*commons|reproduc|cop(i|y)(a|ar|ing)|permiso|permission|sin fines|not.for.profit|no comercial", re.I)
for url in open(sys.argv[1]).read().split():
    print("\n=====", url)
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=40) as r:
            body = r.read(3_000_000).decode("utf-8", "replace"); print("final:", r.geturl(), r.status)
    except Exception as e:
        print("error:", e); continue
    links = set(re.findall(r'href="([^"]*(?:copyright|derechos|licen|terms|termino|aviso|legal|politica|policy)[^"]*)"', body, re.I))
    for l in sorted(links)[:20]: print("  enlace:", l)
    text = html.unescape(re.sub(r"<script.*?</script>|<style.*?</style>", " ", body, flags=re.S | re.I))
    text = " ".join(re.sub(r"<[^>]+>", " ", text).split())
    seen = 0
    for m in KW.finditer(text):
        print("  texto:", text[max(0, m.start() - 150):m.start() + 250]); seen += 1
        if seen >= 6: break
