"""Temporal: lista los videos y páginas dentro de un .zim. Se borra después de usarla."""
import sys
from libzim.reader import Archive
z = Archive(sys.argv[1])
print("entradas:", z.all_entry_count)
for i in range(z.all_entry_count):
    e = z._get_entry_by_id(i)
    if e.is_redirect: continue
    p = e.path
    if p.endswith(".mp4") or "/recursos/" in p and "." not in p.rsplit("/",1)[-1]:
        print(e.get_item().size, p)
