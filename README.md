# Paquetes de datos de NOMAD en español

Esta rama no tiene código: guarda los paquetes que la Guía de medicamentos
descarga desde la pestaña **Datos** para funcionar sin conexión. Se reemplaza
entera (sin historial) cada vez que se actualizan los paquetes, para que el
repositorio no crezca. La actualizan solas las tareas de GitHub
`datos-aemps.yml` (cada semana) y `datos-anmat.yml` (cada mes).

| Archivo | Contenido | Fuente |
|---|---|---|
| `aemps-prospectos.jsonl.gz` | Prospectos de los 14.685 medicamentos comercializados en España con prospecto en CIMA (973 sin receta, 13.712 con receta), generado el 24 de noviembre de 2026 con `tools/aemps/build_package.py --todos`. | Centro de Información online de Medicamentos (CIMA) de la Agencia Española de Medicamentos y Productos Sanitarios (AEMPS), https://cima.aemps.es |
| `anmat-vnm.jsonl.gz` | 15.636 presentaciones de 7.931 marcas comerciales argentinas con sus principios activos, extraídas despacio del buscador público el 17 de noviembre de 2026 con `tools/anmat/vnm_extract.py --en-cadena 3` (incluye drogas que no se venden en España). | Vademécum Nacional de Medicamentos, ANMAT (Argentina) |

NOMAD no está afiliado a la AEMPS ni a la ANMAT ni cuenta con su aval. La
información es de referencia y no reemplaza la consulta con un profesional de
la salud.
