# Complementos de la comunidad

Project NOMAD viene con un conjunto seleccionado de herramientas y contenido integrados, pero la comunidad empezó a crear complementos que amplían la plataforma con paquetes de contenido especializado sin conexión. Son proyectos de terceros, no los mantiene el equipo de NOMAD. Instálalos bajo tu propio criterio y reporta cualquier error o pedido de funciones en el repositorio de cada complemento.

¿Creaste un complemento para NOMAD? Abre un issue en el [repositorio de Project NOMAD en GitHub](https://github.com/Crosstalk-Solutions/project-nomad/issues/new) o escríbenos desde el [formulario de contacto de projectnomad.us](https://www.projectnomad.us/contact), y lo evaluaremos para incluirlo en esta página.

> Estos complementos están en inglés.

---

## Paquetes de contenido ZIM

Los paquetes de contenido ZIM agregan material de referencia sin conexión a tu biblioteca de Kiwix. Normalmente traen un script `install.sh` que descarga el material de origen, arma un archivo ZIM con `zimwriterfs` y lo registra en tu contenedor de Kiwix en funcionamiento.

### Manuales de campaña del ejército de EE. UU.

**Repositorio:** [github.com/jrsphoto/ZIM-military-field-manuals](https://github.com/jrsphoto/ZIM-military-field-manuals)

Unos 180 manuales de campaña del ejército de EE. UU., de dominio público, que cubren medicina de campaña, supervivencia, primeros auxilios en combate, lectura de mapas y más. Se arman en un ZIM con búsqueda que se suma a tu biblioteca de Kiwix.

El ZIM final ocupa unos 2 GB. Durante el armado se descargan unos 2 GB de PDF de origen desde archive.org.

### Archivo de programación de W3Schools

**Repositorio:** [github.com/kennethbrewer3/ZIM-w3schools-offline](https://github.com/kennethbrewer3/ZIM-w3schools-offline)

Una copia completa sin conexión de los tutoriales de programación de W3Schools, que cubren HTML, CSS, JavaScript, Python, SQL y más. Sirve para aprender a programar, consultar sintaxis o enseñar programación en un entorno sin internet.

El ZIM final ocupa unos 700 MB. Durante el armado se descargan unos 6 GB de archivos de origen desde un espejo de GitHub.

---

## Instalar un complemento de la comunidad

Cada complemento tiene sus propias instrucciones de instalación, pero la mayoría de los paquetes ZIM siguen el mismo esquema:

1. Clona el repositorio del complemento en el equipo de tu NOMAD por SSH.
2. Revisa en el README las dependencias necesarias para armarlo. La mayoría necesita `git`, `python3`, `unzip` y `zim-tools`.
3. Ejecuta el `install.sh` incluido con la opción `--deploy`, indicando la ruta de tu biblioteca de Kiwix (`/opt/project-nomad/storage/zim`) y el nombre de tu contenedor de Kiwix (`nomad_kiwix_server`).
4. El script arma el ZIM, lo copia a tu biblioteca de Kiwix, lo registra en Kiwix y reinicia el contenedor de Kiwix.

Cuando el script termine, el contenido nuevo aparecerá en tu Biblioteca de información la próxima vez que la abras.

El primer armado puede tardar desde unos minutos hasta una hora o más, según el tamaño del complemento y el procesador de tu equipo.

---

## Sobre el soporte

Estos complementos los crea y los mantiene la comunidad. Si algo falla con un script de instalación o con el contenido de un ZIM, abre un issue en el repositorio del complemento y no en el de Project NOMAD. Con gusto ayudamos si el problema es de NOMAD en sí, por ejemplo si Kiwix no detecta un ZIM nuevo después de instalarlo, pero no podemos mantener ni dar soporte a contenido de terceros.
