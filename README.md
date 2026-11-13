<div align="center">
<img src="admin/public/nomad-primary.svg" width="200" alt="Project NOMAD"/>

# Project NOMAD en español
### Conocimiento que nunca se desconecta

</div>

> **Coming from the original Project NOMAD?** This is an unofficial, community-maintained Spanish fork of [Crosstalk-Solutions/project-nomad](https://github.com/Crosstalk-Solutions/project-nomad). It keeps everything the original has and adds on top of it: a Spanish interface (English is still one click away in the footer) and Spanish documentation, a Spanish content catalog (Spanish Wikipedia plus Spanish-language health, farming, water and trade-school packages built by this fork), Spanish drug leaflets from Spain's AEMPS with Argentine brand names from ANMAT in the drug reference, and installers for Ubuntu/Debian, Fedora and Arch Linux. Installing with this fork's scripts gives you the same NOMAD base as the original, only translated and with the Spanish content selection. It follows the original releases: each new upstream version is merged and translated, then published as `ghcr.io/alejoabalde/project-nomad-es`. It is not affiliated with or endorsed by Crosstalk Solutions. For the original project, its documentation and its community, go to the [original repository](https://github.com/Crosstalk-Solutions/project-nomad) and [projectnomad.us](https://www.projectnomad.us).

---

Project NOMAD es un servidor de conocimiento y educación que funciona sin conexión. Trae herramientas, información y asistencia con IA para que estés informado en cualquier momento y lugar, aunque no haya internet.

Esta es una versión en español, mantenida por la comunidad, del [Project NOMAD original](https://github.com/Crosstalk-Solutions/project-nomad) de Crosstalk Solutions. No está afiliada a Crosstalk ni cuenta con su aval.

## Qué cambia respecto del original

Esta versión **suma** cosas al NOMAD original; no quita ninguna. Todo lo que tiene el original sigue disponible.

- **Interfaz en español.** El Centro de mando abre en español neutro. Puedes pasar al inglés con el selector de idioma del pie de página.
- **Documentación en español.** La ayuda de la app, las preguntas frecuentes y las notas de cada versión están traducidas.
- **Contenido en español.** Con la interfaz en español, el asistente de configuración y el catálogo ofrecen primero contenido en español: Wikipedia, Wikilibros, Wikiviajes, Vikidia, TED en español y más. El contenido en inglés del original sigue disponible.
- **Paquetes armados para esta versión.** Libros y cursos en español que no publica Kiwix y que esta versión arma por su cuenta:
  - salud y primeros auxilios (Hesperian, OMS/OPS, EPES 061);
  - huerta, granja y conservación de alimentos (INTA, FAO);
  - agua segura (CAWST);
  - ciencias (LibreTexts en español);
  - cursos de oficios en video de educ.ar: plomería, electricidad, mecánica del automotor, carpintería y terminaciones.
- **Guía de medicamentos en español.** Prospectos de los medicamentos que se venden en España, del CIMA de la AEMPS. También puedes buscar por marca comercial argentina (Vademécum Nacional de Medicamentos de la ANMAT), y buscar «por situación».
- **Instaladores en español** para Ubuntu y Debian (los mismos sistemas que el original) y, además, para Fedora y Arch Linux.
- **Se mantiene sola al día:**
  - cada semana se actualizan los prospectos de la AEMPS y cada mes las marcas de la ANMAT;
  - cada mes se revisan las versiones nuevas del contenido de Kiwix;
  - cuando NOMAD original publica una versión nueva, se traduce, se publica la imagen en español, y las instalaciones en español se actualizan desde la app.

## Instalación

NOMAD en sí necesita unos **5 GB de disco y menos de 1 GB de RAM**. Lo que llena el disco es el contenido que agregues después, y lo que sube la memoria necesaria es el asistente de IA (mira [Requisitos del equipo](#requisitos-del-equipo)).

Hace falta ser administrador (`sudo`) para correr el instalador.

**Qué instalan estos scripts.** Los instaladores de esta página instalan el mismo NOMAD que el original, con la misma base y las mismas funciones. La única diferencia es que queda traducido al español y con el contenido en español elegido para esta versión (siempre puedes sumar el contenido en inglés del original). Si usas el instalador del repositorio original, se instala el NOMAD original en inglés.

### Ubuntu o Debian

Es el sistema con el que se prueba NOMAD original (Ubuntu 26.04 LTS recomendado; también Ubuntu 24.04 LTS y Debian 12).

```bash
sudo apt-get update && sudo apt-get install -y curl && \
curl -fsSL https://raw.githubusercontent.com/alejoabalde/project-nomad-es/refs/heads/main/install/install_nomad_debian.sh \
  -o install_nomad_debian.sh && \
sudo bash install_nomad_debian.sh
```

### Fedora

```bash
sudo dnf install -y curl && \
curl -fsSL https://raw.githubusercontent.com/alejoabalde/project-nomad-es/refs/heads/main/install/install_nomad_fedora.sh \
  -o install_nomad_fedora.sh && \
sudo bash install_nomad_fedora.sh
```

### Arch Linux

```bash
sudo pacman -S --needed curl && \
curl -fsSL https://raw.githubusercontent.com/alejoabalde/project-nomad-es/refs/heads/main/install/install_nomad_arch.sh \
  -o install_nomad_arch.sh && \
sudo bash install_nomad_arch.sh
```

Al terminar, abre un navegador en `http://localhost:8080` (o `http://IP_DEL_EQUIPO:8080` desde otro equipo de tu red).

Algunas cosas que conviene saber:

- **En Arch**, el instalador actualiza todo el sistema antes de instalar lo que falta, porque instalar algo sin actualizar el resto puede romper otros programas.
- **En Fedora**, el cortafuegos viene encendido. Si no puedes abrir NOMAD desde otro equipo, el instalador te muestra el comando para permitirlo.
- **El controlador de la tarjeta gráfica** tiene que estar instalado antes, si vas a usar IA local.

La guía completa está en la ayuda de la app, en «Primeros pasos» ([admin/docs/es/getting-started.md](admin/docs/es/getting-started.md)).

## Actualizaciones

- **Desde la app:** cuando hay una versión nueva de NOMAD en español, el Centro de mando lo avisa en Ajustes. Desde ahí la puedes instalar, o activar la actualización automática: espera unos días después de que sale cada versión y la instala en el horario que elijas.
- **Con el script:** `sudo bash /opt/project-nomad/update_nomad.sh` baja la última imagen en español y reinicia el Centro de mando.
- **Datos de medicamentos:** si hay prospectos o marcas más nuevos, la pestaña **Datos** de la Guía de medicamentos lo avisa. Para bajarlos, toca «Actualizar prospectos en español».
- **Contenido:** el catálogo en español se actualiza solo. Las aplicaciones y el contenido instalados se actualizan desde el Centro de mando, igual que en el original.

## Cómo funciona

NOMAD es una interfaz de administración (el «Centro de mando») y una API que maneja un conjunto de herramientas en contenedores de [Docker](https://www.docker.com/). Se encarga de instalar, configurar y actualizar todo por ti.

| Función | Con qué funciona | Qué obtienes |
|---|---|---|
| Biblioteca de información | Kiwix | Wikipedia sin conexión, referencias médicas, guías de supervivencia, libros |
| Asistente de IA | Ollama + Qdrant | Chat con IA local, con carga de documentos y búsqueda por significado |
| Plataforma educativa | Kolibri | Cursos de Khan Academy, con seguimiento del progreso y varios usuarios |
| Mapas sin conexión | ProtoMaps | Mapas por región para ver y buscar sin conexión |
| Herramientas de datos | CyberChef | Cifrado, codificación, hashes y análisis de datos |
| Notas | FlatNotes | Notas locales con formato Markdown |
| Prueba de rendimiento | Incluida | Puntaje del equipo y tabla comunitaria |
| Depósito de aplicaciones | Incluido | Catálogo de aplicaciones de un clic, y tus propios contenedores de Docker |

## Requisitos del equipo

NOMAD en sí es liviano. Lo que define los requisitos es el contenido y las herramientas que decidas instalar, y sobre todo si quieres usar IA local.

**Mínimo, sin IA local:**

- Procesador de doble núcleo de 2 GHz
- 4 GB de RAM (todo NOMAD sin IA usa menos de 1 GB)
- 5 GB de espacio libre en disco (mejor 10 GB), más lo que ocupe el contenido
- Conexión a internet estable, solo durante la instalación

**Recomendado, con IA local:**

- AMD Ryzen 7, Intel Core i7 o superior
- 32 GB de RAM
- NVIDIA RTX 3060 o equivalente de AMD; con más VRAM puedes usar modelos más grandes
- 250 GB o más de espacio libre en disco, preferentemente SSD

Con el asistente de IA, la instalación pasa a ocupar unos **25 GB**. Ollama y un modelo de uso general son grandes, y el modelo necesita en memoria más o menos lo mismo que ocupa al descargarlo: en la VRAM si tienes una tarjeta gráfica dedicada, o en la RAM si no la tienes.

**IA en otro equipo:** en los ajustes del asistente de IA puedes poner la dirección de un servidor Ollama o de uno compatible con la API de OpenAI (como LM Studio) que corra en otro equipo. Si usas Ollama en otro equipo, inícialo con `OLLAMA_HOST=0.0.0.0`.

## Privacidad y uso de internet

NOMAD está pensado para funcionar sin conexión. Solo usa internet durante la instalación y cuando tú decides bajar herramientas, contenido o actualizaciones. No tiene telemetría de ningún tipo.

Para saber si hay conexión, NOMAD consulta `https://1.1.1.1/cdn-cgi/trace` de Cloudflare. Si no responde, prueba con otros servicios que ya usa (la API de GitHub y la de Project NOMAD). Puedes cambiar esa dirección en **Ajustes → Avanzado** o con la variable de entorno `INTERNET_STATUS_TEST_URL`.

## Seguridad

NOMAD no tiene usuarios ni contraseñas: está pensado para usarse sin trabas. Si lo conectas a una red local para que otros equipos lo usen, controla el acceso desde la red (cortafuegos, puertos). No lo expongas directamente a internet.

## Scripts de ayuda

Para resolver problemas o hacer mantenimiento que no se puede hacer desde el Centro de mando. Están en la carpeta de instalación, `/opt/project-nomad`.

**Iniciar** todos los contenedores de NOMAD:

```bash
sudo bash /opt/project-nomad/start_nomad.sh
```

**Detener** todos los contenedores de NOMAD:

```bash
sudo bash /opt/project-nomad/stop_nomad.sh
```

**Actualizar** el Centro de mando y lo que necesita para funcionar (por ejemplo, MySQL). Las aplicaciones instaladas se actualizan desde el Centro de mando.

```bash
sudo bash /opt/project-nomad/update_nomad.sh
```

**Desinstalar** NOMAD por completo, para empezar de cero. No se puede deshacer.

```bash
curl -fsSL https://raw.githubusercontent.com/alejoabalde/project-nomad-es/refs/heads/main/install/uninstall_nomad.sh \
  -o uninstall_nomad.sh && sudo bash uninstall_nomad.sh
```

## Cómo se mantiene esta versión

Casi todo se hace solo, con tareas de GitHub Actions de este repositorio:

| Qué | Cuándo | Tarea |
|---|---|---|
| Prospectos de la AEMPS | Cada martes | `datos-aemps.yml` |
| Marcas de la ANMAT | El día 2 de cada mes | `datos-anmat.yml` |
| Versiones nuevas del contenido de Kiwix | El día 5 de cada mes (abre un PR para aprobar) | `update-kiwix-es.yml` |
| Versión nueva de NOMAD original | Cada lunes (abre un aviso con lo que hay que traducir) | `upstream-es.yml` |
| Imagen en español y versión en GitHub | Al unir una versión nueva de NOMAD original | `build-primary-image-es.yml` |
| Paquetes de contenido en español | Al cambiar `tools/zim-es/packages.json` | `build-zim-es.yml` |

Los datos de medicamentos están en la rama [`datos`](https://github.com/alejoabalde/project-nomad-es/tree/datos), y los paquetes de contenido en la versión [`paquetes-es`](https://github.com/alejoabalde/project-nomad-es/releases/tag/paquetes-es).

## Fuentes y avisos

Los paquetes de contenido conservan la licencia de su fuente. Los prospectos vienen del CIMA de la Agencia Española de Medicamentos y Productos Sanitarios (AEMPS), y las marcas argentinas, del Vademécum Nacional de Medicamentos de la ANMAT. Esta versión no está afiliada a la AEMPS, a la ANMAT ni a Crosstalk Solutions, ni cuenta con su aval. La información médica es de referencia y no reemplaza la consulta con un profesional de la salud.

## Comunidad y enlaces

- **Esta versión:** [issues](https://github.com/alejoabalde/project-nomad-es/issues) para errores o sugerencias de la versión en español.
- **NOMAD original:** [repositorio](https://github.com/Crosstalk-Solutions/project-nomad), [sitio web](https://www.projectnomad.us), [Discord](https://discord.com/invite/crosstalksolutions) (en inglés) y [tabla de rendimiento](https://benchmark.projectnomad.us).
- **Preguntas frecuentes:** en la ayuda de la app ([admin/docs/es/faq.md](admin/docs/es/faq.md)).

## Licencia

Project NOMAD y esta versión tienen licencia [Apache 2.0](LICENSE).
