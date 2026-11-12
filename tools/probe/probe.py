"""Temporal: lista los enlaces a PDF de cada página. Se borra después de usarla."""
import re, sys, urllib.request, urllib.parse
UA = "Mozilla/5.0 (X11; Linux x86_64) project-nomad-es license check"
for url in open(sys.argv[1]).read().split():
    print("\n=====", url)
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=60) as r:
            body = r.read(3_000_000).decode("utf-8", "replace"); print("final:", r.geturl())
    except Exception as e:
        print("error:", e); continue
    for l in sorted(set(re.findall(r'href="([^"]+\.pdf)"', body)))[:80]:
        print("  pdf:", urllib.parse.urljoin(url, l))
    for l in sorted(set(re.findall(r'href="(/hhg/[^"#?]+)"', body)))[:200]:
        print("  wiki:", l)
