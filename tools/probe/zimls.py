"""Temporal: lista los videos y páginas dentro de un .zim. Se borra después de usarla."""
import sys
from libzim.reader import Archive
z = Archive(sys.argv[1])
print("entradas:", z.all_entry_count)
for i in range(z.all_entry_count):
    e = z.get_entry_by_id(i)
    if e.is_redirect: continue
    p = e.path
    if True:
        print(e.get_item().size, p)
