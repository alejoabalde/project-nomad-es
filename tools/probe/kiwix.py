"""Temporal: lista los ZIM de Kiwix en español o multilingües. Se borra después de usarla."""
import re, urllib.request, xml.etree.ElementTree as ET
UA = "Mozilla/5.0 project-nomad-es catalog check"
A = "{http://www.w3.org/2005/Atom}"
for lang in ("spa", "mul"):
    url = f"https://library.kiwix.org/catalog/v2/entries?lang={lang}&count=-1"
    data = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=120).read()
    root = ET.fromstring(data)
    for e in root.findall(A + "entry"):
        name = (e.findtext(A + "name") or "")
        title = e.findtext(A + "title") or ""
        summ = (e.findtext(A + "summary") or "")[:90]
        size = ""
        href = ""
        for l in e.findall(A + "link"):
            if l.get("type") == "application/x-zim":
                size = int(l.get("length") or 0) // 1_000_000
                href = l.get("href")
        print(f"{lang}\t{name}\t{size} MB\t{title}\t{summ}\t{href}")
