# Apps del Depósito de suministros

El Depósito de suministros es donde instalas apps adicionales en tu NOMAD, además de las herramientas integradas. Cada app corre en su propio contenedor en tu NOMAD, totalmente sin conexión, y muestra un botón **Abrir** cuando termina de instalarse.

Esta página cubre lo que necesitas saber para poner en marcha cada app *específicamente en NOMAD*: si tienes que iniciar sesión, cuáles son las credenciales predeterminadas, dónde quedan tus archivos y qué necesitas tener a mano antes. No explica cómo usar las apps en sí. Cada app es un proyecto de código abierto con su propia documentación, y en cada caso te dejamos el enlace.

Una aclaración sobre los inicios de sesión: algunas de estas apps tienen sus propias cuentas, separadas de tu acceso a NOMAD. Cuando una app te pide iniciar sesión, te indicamos las credenciales iniciales y si conviene cambiarlas.

> Las apps de terceros se muestran en el idioma que ofrezca cada proyecto. NOMAD no las traduce.

---

## Administrar tus apps

Cada app que instalas tiene un menú **Administrar** en su tarjeta. Desde ahí puedes:

- **Documentación**: ir directo a las notas de inicio de NOMAD para esa app (las mismas secciones por app que encontrarás más abajo).
- **Editar**: cambiar los ajustes de una app: puertos, volúmenes, variables de entorno y límites de memoria y procesador. Funciona también para las apps del catálogo, no solo para las personalizadas. Tus cambios se combinan con la configuración existente de la app, así que se conservan los ajustes avanzados (como el acceso a la GPU del Asistente de IA), y una app editada deja de sobrescribirse con las actualizaciones del catálogo.
- **Registros** y **Métricas**: abrir una vista en vivo de los registros de una app o de su uso actual de memoria y procesador, útil cuando algo no funciona bien.
- **Actualizar** y **Eliminar**: descargar la última versión de una app o quitarla (y, si quieres, también su imagen). Si el contenedor nuevo de una actualización no arranca, NOMAD vuelve automáticamente a la versión que funcionaba.

**Ver qué versión tienes:** cada tarjeta muestra la versión instalada junto al nombre de la app (por ejemplo, `Kiwix · 3.7.0`). Cuando hay una versión más nueva, aparece en la tarjeta una etiqueta naranja de **Actualización disponible** para que la veas de un vistazo.

**Enlaces «Abrir» personalizados:** por defecto, el botón **Abrir** apunta a la app en la dirección de tu propio NOMAD. Si usas un proxy inverso o un DNS local y prefieres abrir una app en una dirección más amigable (por ejemplo `https://jellyfin.myhomelab.net`), usa **Administrar › Editar** para definir una URL de acceso personalizada. NOMAD guarda tu enlace original para que siempre puedas volver a él, y el cambio se mantiene al actualizar.

**Actualizar las apps automáticamente:** las apps instaladas pueden actualizarse solas. Se activa en dos niveles, con un interruptor general en **Ajustes → Actualizaciones** y otro por app en el Depósito de suministros, y solo se aplican automáticamente las actualizaciones menores y de parches (las versiones mayores siempre son manuales). Consulta la [guía de actualizaciones](/docs/updates) para ver todos los detalles.

---

## Agregar tu propia app

Además del catálogo seleccionado, el Depósito de suministros puede ejecutar **tu propio contenedor de Docker** como una app administrada junto a todo lo demás. Haz clic en **Agregar una app personalizada** e indícale a NOMAD:

- la **imagen** que debe descargar (por ejemplo `ghcr.io/owner/app:1.2.3`),
- los **puertos**, **volúmenes**, **variables de entorno** y **límites de memoria y procesador** que necesite.

Mientras completas los datos, NOMAD hace una verificación previa en vivo y te avisa de cosas como conflictos de puertos o ajustes riesgosos. Algunas advertencias (un registro no confiable o una etiqueta `:latest` a la que no se le puede seguir la versión) son solo informativas y puedes elegir **Instalar de todos modos**; las configuraciones realmente inseguras se bloquean directamente.

Una vez instalada, una app personalizada se comporta como cualquier otra: tiene el mismo menú **Administrar** (Editar, Registros, Métricas, Actualizar, Eliminar), muestra su versión en la tarjeta y puede activar las actualizaciones automáticas. NOMAD protege los volúmenes que apuntan a carpetas del equipo y limita los registros y las métricas a sus propios contenedores administrados, así que una app personalizada no puede llegar más allá de lo que le das.

> Una app personalizada es exactamente eso: tuya. NOMAD la ejecuta y no se mete; no ofrece documentación de configuración ni soporte para software fuera del catálogo seleccionado. Consulta la documentación del propio proyecto para saber cómo usarla.

---

## Stirling PDF {% #stirling-pdf %}

Una caja de herramientas completa para trabajar con PDF, todo en tu propio equipo. Une y divide archivos, convierte a PDF y desde PDF, comprime, rota, agrega o quita contraseñas, aplica OCR a documentos escaneados para poder buscar en ellos, firma, sella y tacha información. Tiene más de 50 herramientas y, como funciona localmente, ninguno de tus documentos sale de tu NOMAD.

**Sitio oficial:** [stirlingpdf.com](https://stirlingpdf.com) · **Código fuente:** [github.com/Stirling-Tools/Stirling-PDF](https://github.com/Stirling-Tools/Stirling-PDF)

**La primera vez que la abres:** se abre directamente en las herramientas, sin iniciar sesión. Configuramos Stirling para saltear la pantalla de inicio de sesión, porque en un NOMAD es una herramienta personal en tu propia red y una contraseña solo estorba. Verás «Guest» en la esquina inferior izquierda; es normal.

**Atención, tarda en arrancar:** Stirling PDF es una aplicación Java grande. Después de instalarla, dale entre 30 y 60 segundos para que termine de iniciar antes de que cargue bien. También necesita bastante memoria (alrededor de un gigabyte), así que se lleva mejor con un NOMAD que tenga recursos de sobra.

**¿Quieres ponerle contraseña?** Si prefieres que Stirling pida iniciar sesión (por ejemplo, si varias personas comparten tu NOMAD y quieres proteger esta app), puedes volver a activarlo desde NOMAD:

1. En el Depósito de suministros, busca Stirling PDF y haz clic en **Administrar > Editar**.
2. En **Variables de entorno**, cambia `SECURITY_ENABLELOGIN=false` por `SECURITY_ENABLELOGIN=true`.
3. Guarda. NOMAD vuelve a crear la app y reaparece la pantalla de inicio de sesión.

La primera vez que inicies sesión después de eso, usa el usuario `admin` y la contraseña `stirling`. Stirling te pedirá que definas tu propia contraseña en ese momento. Ten en cuenta que esta es la única forma de volver a activar el inicio de sesión: el menú de ajustes de Stirling solo está disponible con la sesión iniciada, así que, una vez desactivado, se activa desde la pantalla Editar de NOMAD y no desde Stirling.

**Tus datos:** tus ajustes se guardan en la carpeta `storage/stirling-pdf` de tu NOMAD. Los PDF con los que trabajas se suben para cada operación y se descargan de vuelta a tu propio dispositivo. Stirling no es una biblioteca para guardar a largo plazo, así que no conserva tus documentos.

**De dónde salen tus PDF (y por qué no ves los archivos de tu NOMAD):** Stirling trabaja con archivos del dispositivo que estés usando: tu laptop, tu celular o tu tablet. Haces clic en «Open from computer», eliges un PDF, trabajas con él y descargas el resultado a ese mismo dispositivo. Stirling no puede acceder a archivos guardados en otras partes de tu NOMAD, así que no te mostrará tu carpeta de libros, los documentos de la base de conocimiento ni nada de lo que haya en el Explorador de archivos. Si el PDF que quieres ya está en tu NOMAD, primero descárgalo desde donde esté (por ejemplo, desde el Explorador de archivos) y luego abre esa copia en Stirling. Es un paso más, pero también es la razón por la que tus archivos quedan exactamente donde los pusiste en lugar de terminar dentro de otra app.

**Funciona sin conexión:** todas las herramientas de PDF corren localmente en tu NOMAD, así que la caja de herramientas funciona completamente sin conexión. Algunas funciones secundarias necesitan internet y no harán nada sin conexión: la opción de importar desde «Google Drive» y los enlaces del pie de página (Survey, Discord, GitHub). Nada de eso afecta el trabajo con PDF. La única función principal con una parte en línea es el OCR, que lee el texto de páginas escaneadas: viene con inglés instalado, y agregar otros idiomas es lo único que necesitaría conexión.

## Explorador de archivos (File Browser) {% #file-browser %}

Un administrador de archivos web para tu NOMAD. Explora carpetas, sube y descarga archivos, crea carpetas, renombra, mueve y borra, todo desde el navegador y sin instalar nada en tu computadora. Es una forma práctica de pasar archivos al equipo y sacarlos, o de ordenar las cosas sin usar la línea de comandos.

**Sitio oficial:** [filebrowser.org](https://filebrowser.org) · **Código fuente:** [github.com/filebrowser/filebrowser](https://github.com/filebrowser/filebrowser)

**La primera vez que lo abres:** verás una pantalla de inicio de sesión. Entra con el usuario `admin` y la contraseña `nomad`. **Cambia esa contraseña enseguida.** Es la misma en todos los NOMAD, así que hasta que la cambies, cualquiera en tu red que la conozca podría entrar. Haz clic en el engranaje de ajustes, abre los ajustes de tu perfil y define una contraseña nueva.

En este fork, el Explorador de archivos se instala en español.

A diferencia de la mayoría de estas apps, el Explorador de archivos mantiene el inicio de sesión a propósito. Puede renombrar y borrar archivos reales de tu NOMAD, así que tener contraseña es lo correcto incluso en tu propia red.

**Qué puedes ver:** el Explorador de archivos te muestra en un solo lugar las carpetas de contenido de tu NOMAD:

- **books**: libros electrónicos, incluido todo lo que quieras que lea Calibre-Web
- **maps**: datos de mapas descargados
- **media**: videos, música y fotos, incluido todo lo que quieras que sirva Jellyfin
- **zim**: contenido sin conexión descargado, como Wikipedia y otras bibliotecas de referencia
- **kb_uploads**: documentos que agregaste a la base de conocimiento

Puedes subir, descargar, renombrar, mover y borrar dentro de estas carpetas, y todo lo que dejes en el nivel principal también se guarda. Las carpetas internas con las que funcionan las apps (como los modelos de IA, el índice de búsqueda y la bóveda de contraseñas) quedan fuera del Explorador de archivos a propósito, para que no puedas verlas ni borrarlas por accidente.

> **Sobre borrar:** lo que borras aquí desaparece de verdad; no hay papelera. El contenido en general se puede reponer (puedes volver a descargar un mapa o una biblioteca de Wikipedia), pero si borras un libro o un video que agregaste tú, esa copia se pierde. Borra con el mismo cuidado que en tu propia computadora.

**Funciona sin conexión:** totalmente. El Explorador de archivos corre por completo en tu NOMAD y no usa internet para nada, así que funciona igual con o sin conexión.

## Calibre-Web {% #calibre-web %}

Un lector y administrador web para tu colección de libros electrónicos. Lee libros directamente en el navegador, organízalos por autor, serie y etiquetas, y envíalos a un Kindle u otro lector. Se conecta con la carpeta de libros de tu NOMAD, así que toda tu biblioteca vive en el equipo y va adonde vaya él.

**Sitio oficial:** [github.com/janeczku/calibre-web](https://github.com/janeczku/calibre-web)

**La primera vez que lo abres:** Calibre-Web necesita una biblioteca a la cual apuntar, y NOMAD te prepara una vacía durante la instalación, así que no te vas a trabar con un error de configuración. Estos son los pasos, por única vez:

1. Abre Calibre-Web. Llegarás a una pantalla de **Database Configuration**.
2. En el campo **Location of Calibre Database**, escribe `/books` y haz clic en **Save**. Verás «Database Settings updated» y se abrirá tu biblioteca (vacía).
3. Listo. Tu biblioteca está preparada para llenarla.

Si en algún momento te pide iniciar sesión, el acceso predeterminado es `admin` / `admin123`. **Cambia esa contraseña** una vez que entres (haz clic en `admin` arriba a la derecha y luego en Edit). Es la misma en todos los NOMAD.

**Agregar libros:** la subida desde la página web está desactivada por defecto. Para activarla, ve a **Admin** (arriba a la derecha) y edita la configuración básica para permitir subidas; entonces aparecerá un botón Upload. También puedes dejar los archivos de libros directamente en la carpeta books con el Explorador de archivos y luego usar la función de «scan» de Calibre-Web para que los detecte.

**Tus datos:** tu biblioteca vive en la carpeta `books` de tu NOMAD (la misma `books` que ves en el Explorador de archivos). Cada libro que agregas se guarda ahí, así que con respaldar esa carpeta respaldas toda tu colección.

**Funciona sin conexión:** leer y administrar tu biblioteca funciona totalmente sin conexión. La única función que usa internet es «fetch metadata», que trae portadas y descripciones de fuentes en línea. Esa parte no hará nada sin conexión, pero no afecta la lectura ni la organización de los libros que ya tienes.

## IT Tools {% #it-tools %}

Una colección de más de 100 pequeñas utilidades que de otro modo tendrías que buscar en internet: generadores de hash, codificadores base64 y de URL, formateadores de JSON y SQL, generadores de UUID, un creador de códigos QR, conversores de colores y mucho más. Todo corre localmente en tu NOMAD, así que puedes usarlo sin conexión a internet.

**Sitio oficial:** [it-tools.tech](https://it-tools.tech) · **Código fuente:** [github.com/CorentinTh/it-tools](https://github.com/CorentinTh/it-tools)

**La primera vez que lo abres:** se abre directamente en las herramientas. Sin inicio de sesión, sin cuenta, sin configuración. Elige una herramienta en la barra lateral y úsala.

**Tus datos:** no hay nada que administrar. IT Tools no guarda nada en tu NOMAD entre sesiones, así que no hay archivos, ni biblioteca que preparar, ni credenciales que recordar. Es la app más sencilla del Depósito de suministros.

**Funciona sin conexión:** cada herramienta corre directamente en tu navegador con la copia que está en tu NOMAD. Nada aquí usa internet, así que todo sigue funcionando sin conexión.

## Excalidraw {% #excalidraw %}

Una pizarra virtual para diagramas y bocetos rápidos con estilo dibujado a mano. Dibuja cajas, flechas y formas a mano alzada, agrega texto e imágenes, y arma en segundos un diagrama de flujo, un esquema de red o una idea aproximada. Todo tiene un aspecto simpático, como dibujado en una servilleta, y funciona directamente en el navegador.

**Sitio oficial:** [excalidraw.com](https://excalidraw.com) · **Código fuente:** [github.com/excalidraw/excalidraw](https://github.com/excalidraw/excalidraw)

**La primera vez que lo abres:** se abre directamente en un lienzo en blanco. Sin inicio de sesión, sin cuenta, sin configuración. Elige una forma de la barra de herramientas y empieza a dibujar. Verás una breve nota de bienvenida que te recuerda que tu trabajo se guarda en el navegador, lo que nos lleva a lo único que vale la pena entender de Excalidraw en NOMAD.

**Dónde quedan tus dibujos (lee esta parte):** esta versión de Excalidraw no tiene almacenamiento en tu NOMAD. Tu dibujo se guarda dentro del navegador que estás usando, en ese dispositivo. De ahí se desprenden algunas cosas:

- Tu dibujo **no se comparte entre dispositivos**. Lo que dibujes en tu laptop no aparecerá cuando abras Excalidraw en tu celular, porque cada navegador guarda su propia copia.
- Si **borras los datos del navegador**, o usas una ventana privada o de incógnito, el dibujo se pierde. No hay una copia en el NOMAD a la cual recurrir.
- Por eso, **guarda tu trabajo en un archivo.** Usa el menú (arriba a la izquierda) para **Guardar en...** un archivo `.excalidraw` y déjalo en un lugar seguro, por ejemplo tu carpeta media o de documentos con el Explorador de archivos. Para retomarlo después, usa **Abrir** y carga ese archivo. Es la única forma de conservar un dibujo a largo plazo o pasarlo a otro dispositivo.

**Tus datos:** como todo queda en tu navegador, no hay carpetas de NOMAD ni credenciales que administrar para Excalidraw. Los archivos que guardes están donde tú decidas ponerlos.

**Funciona sin conexión:** la pizarra en sí funciona sin conexión: puedes dibujar, editar y guardar archivos sin internet. Tres cosas para tener en cuenta:

- **La tipografía característica de estilo dibujado viene de internet.** Cuando tu NOMAD está sin conexión, Excalidraw no puede descargarla y usa una tipografía común, así que tus diagramas se ven un poco menos «a mano». Tus dibujos no se ven afectados en absoluto; solo cambia la tipografía en pantalla.
- **Excalidraw envía estadísticas de uso anónimas cuando tu NOMAD tiene conexión.** Sus creadores incluyen un registro básico de visitas (mediante un servicio llamado Simple Analytics) que anota que se abrió la app. No ve tus dibujos y no puede comunicarse con nada cuando tu NOMAD está sin conexión, pero queremos que sepas que existe, porque NOMAD en general está hecho para no compartir nada.
- **Algunos botones son funciones en la nube que no funcionan en NOMAD.** «Live collaboration», «Sign up» y «Excalidraw+» apuntan al servicio en línea pago de sus creadores y necesitan internet. No forman parte de tu pizarra sin conexión, así que puedes ignorarlos. Lo mismo vale para el explorador de la **Library** de formas, que trae contenido de una galería en línea.

## Homebox {% #homebox %}

Un sistema de inventario del hogar para llevar el registro de todo lo que tienes. Cataloga tus cosas por ubicación y etiqueta, adjunta fotos, anota números de serie, precios de compra, fechas de garantía y comprobantes, y encuentra lo que sea con una búsqueda. Es una herramienta muy útil para los registros del seguro, el seguimiento de garantías y saber qué tienes y dónde está.

**Sitio oficial:** [homebox.software](https://homebox.software) · **Código fuente:** [github.com/sysadminsmedia/homebox](https://github.com/sysadminsmedia/homebox)

**La primera vez que lo abres:** Homebox muestra una pantalla de inicio de sesión, pero todavía no tienes cuenta, así que creas una. Haz clic en **Register** y completa:

- **tu correo electrónico** (es tu usuario para iniciar sesión),
- **tu nombre**,
- **una contraseña** (Homebox muestra un medidor de seguridad y no te deja registrarte hasta que la contraseña sea lo bastante segura, así que usa una de verdad).

Haz clic en **Register** e inicia sesión con ese correo y esa contraseña. La primera cuenta que creas es la **propietaria** de este Homebox. No hay credenciales predeterminadas que cambiar: la cuenta es tuya desde el principio.

**¿Compartes tu NOMAD con otras personas?** Por defecto, Homebox deja que cualquiera que pueda acceder cree su propia cuenta. No hay problema si eres solo tú o si confías en todos los que están en tu red. Si prefieres cerrarlo para que nadie más pueda registrarse después de crear tu cuenta:

1. Primero crea tu cuenta de propietario (ver arriba).
2. En el Depósito de suministros, busca Homebox y haz clic en **Administrar > Editar**.
3. En **Variables de entorno**, agrega `HBOX_OPTIONS_ALLOW_REGISTRATION=false`.
4. Guarda. NOMAD vuelve a crear la app y el botón Register deja de crear cuentas nuevas. Puedes seguir iniciando sesión con normalidad.

**Tus datos:** todo lo que guarda Homebox está en una carpeta de tu NOMAD, `storage/homebox`, como un único archivo de base de datos (más las fotos y comprobantes que adjuntes). Con respaldar esa carpeta respaldas todo tu inventario.

**Funciona sin conexión:** totalmente. Homebox corre por completo en tu NOMAD, guarda todos tus datos localmente y no registra el uso, así que funciona igual con o sin conexión. Los enlaces del encabezado (GitHub, Discord, el sitio del proyecto) necesitan internet, pero son solo accesos a las páginas del proyecto y no tienen nada que ver con tu inventario.

## Vaultwarden {% #vaultwarden %}

Un administrador de contraseñas privado que corre en tu propio NOMAD. Es compatible con Bitwarden, así que puedes guardar inicios de sesión, notas seguras y datos de tarjetas en una bóveda cifrada, y usar las extensiones de navegador y apps oficiales de Bitwarden para acceder a ella, todo apuntando a tu NOMAD en lugar de a la nube de otra persona.

**Sitio oficial:** [bitwarden.com](https://bitwarden.com) (para las apps y extensiones) · **Código fuente:** [github.com/dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)

**La primera vez que lo abras verás una advertencia de seguridad. Es lo esperado, y te explicamos por qué:** un administrador de contraseñas solo funciona con una conexión segura (HTTPS), así que NOMAD configura Vaultwarden con HTTPS automáticamente. Como tu NOMAD es un dispositivo privado y no un sitio web público, usa un certificado de seguridad autofirmado, y los navegadores muestran una advertencia la primera vez que lo ven. Parece alarmante, pero es normal en un dispositivo de tu propia red. Para pasarla, por única vez:

1. Haz clic en **Abrir** en la tarjeta de Vaultwarden. Tu navegador mostrará algo como *«La conexión no es privada»* o *«No seguro»*.
2. Haz clic en **Configuración avanzada** y luego en **Acceder a (la dirección de tu NOMAD)**. (En algunos navegadores el botón dice «Continuar» o «Aceptar el riesgo».)
3. Llegarás a la bóveda de Vaultwarden. Tu navegador recuerda la decisión, así que no volverás a ver la advertencia en ese dispositivo.

**Crear tu bóveda:** en la página de inicio de sesión, haz clic en **Create account** y define tu **correo electrónico** y una **contraseña maestra**.

> **Tu contraseña maestra no se puede recuperar.** Vaultwarden no tiene correo de «olvidé mi contraseña» ni forma de restablecerla, a propósito, porque nunca ve tu contraseña. Si la olvidas, la bóveda y todo lo que contiene quedan bloqueados para siempre. Elige una contraseña segura que no vayas a perder y considera anotarla en algún lugar físicamente seguro.

**¿Compartes tu NOMAD con otras personas?** Por defecto, cualquiera que pueda acceder a Vaultwarden puede crear su propia cuenta (cada cuenta es independiente y está cifrada). Si prefieres que nadie más pueda registrarse después de crear la tuya:

1. Primero crea tu propia cuenta.
2. En el Depósito de suministros, busca Vaultwarden y haz clic en **Administrar > Editar**.
3. En **Variables de entorno**, agrega `SIGNUPS_ALLOWED=false`.
4. Guarda. NOMAD vuelve a crear la app y se desactivan los registros nuevos; las cuentas existentes siguen funcionando.

**Usarlo desde el celular y el navegador:** instala la app o la extensión de navegador oficial de Bitwarden y, en su pantalla de inicio de sesión, elige **autoalojado** (o «URL del servidor») e ingresa `https://(la dirección de tu NOMAD):8480`. Algunas apps para celular son más estrictas con los certificados autofirmados y pueden negarse a conectarse; la bóveda web que abres desde NOMAD siempre funciona.

**Tus datos:** tu bóveda cifrada está en la carpeta `storage/vaultwarden` de tu NOMAD. Con respaldar esa carpeta respaldas todo. (El panel de administración integrado está desactivado salvo que definas un token de administrador, algo que la mayoría no necesita.)

**Funciona sin conexión:** totalmente sin conexión y en privado. Vaultwarden corre por completo en tu NOMAD, guarda tu bóveda localmente y no se comunica con nadie. Las apps y extensiones de Bitwarden también guardan una copia local de tu bóveda, así que pueden leer tus contraseñas aunque tu NOMAD o tu celular estén sin conexión.

## Jellyfin {% #jellyfin %}

Tu propio servidor multimedia. Apunta Jellyfin a una carpeta de películas, series, música y fotos de tu NOMAD, y organiza todo con imágenes y detalles, y lo transmite a un navegador, celular, tablet, smart TV o a las apps de Jellyfin. Es una alternativa privada y sin conexión a los grandes servicios de streaming para el contenido que ya tienes.

**Sitio oficial:** [jellyfin.org](https://jellyfin.org) · **Código fuente:** [github.com/jellyfin/jellyfin](https://github.com/jellyfin/jellyfin)

**La primera vez que lo abras pasarás por un asistente de configuración.** Son unas pocas pantallas rápidas:

1. **Idioma**: elige el idioma de la interfaz (puedes elegir español) y haz clic en Siguiente.
2. **Crea tu cuenta de administrador**: ingresa un usuario y una contraseña. Es la cuenta principal que controla el servidor, así que ponle una contraseña de verdad y no la pierdas. (Más adelante puedes agregar más usuarios desde el Panel, incluidos usuarios limitados para niños.)
3. **Agrega tu contenido**: haz clic en **Agregar biblioteca de medios** y elige un tipo de contenido. Para hacerlo fácil, NOMAD ya creó una carpeta para cada tipo dentro de tu carpeta media, así que solo tienes que apuntar cada biblioteca a la que corresponde:
   - Biblioteca de **películas** → la carpeta `Movies`
   - Biblioteca de **series** → la carpeta `TV Shows`
   - Biblioteca de **música** → la carpeta `Music`
   - Biblioteca de **fotos** → la carpeta `Photos`

   **Apunta cada biblioteca a su propia carpeta, no a toda la carpeta `media`.** Esto importa: si apuntas una biblioteca a `media` (que contiene todas las demás) y otra a, por ejemplo, `Music` dentro de ella, Jellyfin ve los mismos archivos asignados dos veces, lo considera una «ruta duplicada» y tu música no aparece, sin ningún aviso. Una carpeta por biblioteca mantiene todo ordenado y funcionando. También puedes saltarte este paso y agregar bibliotecas después desde el Panel.
4. **Metadatos, acceso remoto, finalizar**: acepta los valores predeterminados en las pantallas que quedan y termina. Luego inicia sesión con la cuenta que acabas de crear.

**Cargar tu contenido:** pon tus archivos en la subcarpeta correspondiente de la carpeta **media** de tu NOMAD (la misma carpeta `media` que ves en el Explorador de archivos): películas en **Movies**, series en **TV Shows**, música en **Music** (una carpeta por álbum funciona muy bien) e imágenes en **Photos**. Lo más fácil es subir los archivos con el Explorador de archivos (o copiarlos como prefieras) y luego, en Jellyfin, hacer clic en **Escanear biblioteca** para que los detecte. Jellyfin lee subcarpetas, así que una carpeta de álbum completa dentro de **Music** aparece como un solo álbum. También funciona mejor si los archivos tienen nombres claros (por ejemplo `Nombre de la película (2020).mp4`), lo que le ayuda a encontrar las imágenes y los detalles correctos.

**Tus datos:** tu contenido está en `storage/media`. Los ajustes de Jellyfin, las cuentas de usuario y las imágenes que descarga están en `storage/jellyfin`. Tus archivos nunca se modifican: Jellyfin solo los lee.

**Funciona sin conexión:** reproducir tu propio contenido funciona totalmente sin conexión; de eso se trata. Lo único que usa internet es **obtener los metadatos**: cuando Jellyfin agrega una película o una serie, intenta descargar una portada, una descripción y el reparto desde bases de datos en línea. Sin conexión no puede hacerlo, así que los elementos aparecen con su nombre y sin imágenes, pero se reproducen perfectamente. Cuando vuelvas a tener conexión, un escaneo de la biblioteca completa las imágenes que faltan.

> **Sobre el rendimiento de la reproducción:** Jellyfin reproduce la mayoría de los archivos sin esfuerzo, pero si el formato de un video no es compatible con tu dispositivo, Jellyfin tiene que convertirlo en el momento («transcodificar»), lo que exige mucho al procesador. NOMAD no configura por defecto la aceleración por tarjeta gráfica para esto, así que los videos muy grandes o de alta resolución pueden trabarse en un NOMAD modesto. Reproducir archivos en un formato muy compatible (como MP4/H.264) evita la transcodificación y se ve más fluido.

## Meshtastic Web {% #meshtastic-web %}

Un panel de control en el navegador para dispositivos [Meshtastic](https://meshtastic.org). Meshtastic es mensajería por radio de largo alcance y fuera de la red: radios LoRa pequeñas y económicas que forman su propia red mallada y envían mensajes de texto y ubicaciones GPS a kilómetros de distancia, sin señal de celular, sin internet y sin costo. Con esta app configuras esas radios y lees y envías mensajes desde una pantalla grande.

**Sitio oficial:** [meshtastic.org](https://meshtastic.org) · **Código fuente:** [github.com/meshtastic/web](https://github.com/meshtastic/web)

**Necesitas una radio Meshtastic para usarla.** Esta app es solo el panel de control. Sola, se abre en una pantalla de «No devices connected», porque el trabajo real lo hace un dispositivo Meshtastic físico (y la red de otras radios con las que se comunica). Si todavía no tienes una, la app no hará mucho.

**La primera vez que la abres:** entra directamente, sin iniciar sesión. Haz clic en **New Connection** y verás tres formas de conectarte a tu radio:

- **HTTP**: conectarte a una radio que ya está en tu Wi-Fi, escribiendo su dirección IP. **Esta es la opción que tienes que usar en NOMAD** (ver más abajo).
- **Bluetooth**: emparejarte con una radio cercana por Bluetooth.
- **Serial**: conectarte a una radio enchufada a un puerto USB.

**El detalle propio de NOMAD (Bluetooth y Serial necesitan HTTPS):** los navegadores solo permiten que un sitio use Bluetooth o USB cuando la página se carga con una conexión segura (HTTPS). NOMAD sirve Meshtastic Web con HTTP común, así que en NOMAD **las opciones Bluetooth y Serial no se conectan**: tu navegador las bloquea. La que funciona es **HTTP**: conecta tu radio Meshtastic a la misma red Wi-Fi (las radios Meshtastic pueden conectarse a Wi-Fi) y luego conéctate a ella desde aquí con su dirección IP. Si necesitas emparejarla sí o sí por USB o Bluetooth, hazlo desde la app oficial de Meshtastic para celular o desde el sitio web de Meshtastic.

**Tus datos:** no hay nada que configurar ni guardar en tu NOMAD para esta app. Los ajustes de tu radio están en la radio, y las preferencias de la app, en tu navegador. No hay carpeta de NOMAD que administrar.

**Funciona sin conexión:** totalmente, que es justamente la idea de Meshtastic. La app se sirve desde tu NOMAD, y la comunicación con tus radios pasa por tu red local o por radio, nunca por internet. Lo único en línea son los enlaces del pie de página (Vercel, avisos legales), que no importan para usar tu red mallada.

## Plataforma educativa (Kolibri) {% #kolibri %}

Una plataforma de aprendizaje completa y sin conexión de Learning Equality. Kolibri reúne lecciones en video, ejercicios y lecturas en canales estructurados, los organiza en clases y lecciones, sigue el progreso de cada estudiante y funciona por completo en tu NOMAD, sin internet. Está pensada para escuelas y estudiantes en lugares con poca o ninguna conectividad.

**Sitio oficial:** [learningequality.org/kolibri](https://learningequality.org/kolibri) · **Código fuente:** [github.com/learningequality/kolibri](https://github.com/learningequality/kolibri)

**La primera vez que la abras pasarás por un asistente de configuración rápido.** Elige el tipo de institución y crea la **cuenta de administrador** (es el superusuario que administra todo el dispositivo, así que ponle una contraseña de verdad y no la pierdas). Kolibri tiene interfaz en español: puedes elegir el idioma en el asistente o después desde el menú. Una vez dentro, importas el contenido educativo como **canales**.

**Importar contenido:** el contenido de Kolibri se entrega en canales que importas. Abre **Dispositivo → Canales → Importar** y trae canales desde Kolibri Studio (en línea) o impórtalos desde un disco local u otro dispositivo Kolibri si ya tienes los archivos. Hay muchísimo disponible, incluidos canales en español, así que importa solo los que necesites; pueden ser grandes.

**Migrar el contenido de la Plataforma educativa (1.ª gen.):** las versiones anteriores de NOMAD traían un Kolibri mucho más viejo (la imagen `treehouses/kolibri:0.12.8`). La Plataforma educativa «2.ª gen.» es un Kolibri más nuevo y oficial del proyecto, y se instala **desde cero**: tus canales y datos de estudiantes anteriores **no** se pasan automáticamente, porque las dos versiones guardan los datos de forma demasiado distinta como para migrarlos con seguridad. Si usabas la versión anterior y quieres importar tus canales a la nueva, este es el proceso:

1. Instala «Plataforma educativa (2.ª gen.)» desde el catálogo (corre junto a la anterior en otro puerto, así que nada se interrumpe mientras la configuras).
2. Abre la nueva, completa el asistente de configuración y luego, desde el menú lateral, ve a **Dispositivo > Canales > Importar**. Elige la opción «Red local o internet» y después «Agregar nuevo dispositivo». En la ventana que aparece, ingresa la dirección IP de tu NOMAD con el puerto de la Plataforma educativa anterior (8300 por defecto, por ejemplo `http://192.168.1.36:8300`), ponle un nombre (el que quieras) y haz clic en «Agregar» y luego en «Continuar».
3. Ahora puedes seleccionar canales individuales de la Plataforma educativa anterior, o elegir «Seleccionar canales completos» para importar todo de una vez. Haz clic en «Importar» cuando estés listo y empezará la transferencia.
4. Cuando estés conforme con la instalación nueva y hayas copiado el contenido que quieras, desinstala la Plataforma educativa anterior desde su tarjeta (tiene la etiqueta **legacy**). Se recomienda también eliminar la imagen y el volumen de datos viejos al desinstalarla para evitar confusiones y liberar espacio, pero si prefieres conservarla un tiempo por las dudas, no hay problema.

**Tus datos:** tus canales importados, clases y el progreso de los estudiantes están en la carpeta `storage/kolibri-gen2` de tu NOMAD. Con respaldar esa carpeta respaldas todo tu Kolibri.

**Funciona sin conexión:** totalmente, una vez importado el contenido; para eso existe Kolibri. Lo único que usa internet es importar canales desde Kolibri Studio; todo lo demás (ver lecciones, hacer ejercicios, seguir el progreso) corre por completo en tu NOMAD.

## MeshCore Web {% #meshcore-web %}

Un cliente en el navegador para radios [MeshCore](https://meshcore.io). MeshCore es otra propuesta de mensajería LoRa mallada de largo alcance y fuera de la red, hermana de Meshtastic: radios pequeñas que forman su propia red y transmiten texto y ubicación a kilómetros de distancia, sin señal de celular, sin internet y sin costo. Con esta app configuras una radio MeshCore y lees y envías mensajes desde una pantalla grande. Si todavía no usas equipos MeshCore, el cliente de Meshtastic de más arriba es el punto de partida más común. Este está para quienes usan MeshCore.

**Sitio oficial:** [meshcore.io](https://meshcore.io) · **Código fuente:** [github.com/aXistem-dev/meshcore-web](https://github.com/aXistem-dev/meshcore-web) (una versión empaquetada del cliente MeshCore de Liam Cottle)

**Necesitas una radio MeshCore para usarla.** Igual que el cliente de Meshtastic, esto es solo el panel de control. Sin una radio conectada, no tiene con qué comunicarse.

**La primera vez que la abras verás una advertencia de seguridad. Es lo esperado, y te explicamos por qué:** MeshCore se conecta a tu radio por USB o Bluetooth, y los navegadores solo permiten que una página use USB o Bluetooth cuando se carga con una conexión segura (HTTPS). Por eso NOMAD sirve esta app con HTTPS y, como tu NOMAD es un dispositivo privado sin dirección web pública, usa un certificado autofirmado que los navegadores advierten la primera vez que lo ven. Para pasarla, por única vez:

1. Haz clic en **Abrir** en la tarjeta de MeshCore Web. Tu navegador mostrará algo como *«La conexión no es privada»* o *«No seguro»*.
2. Haz clic en **Configuración avanzada** y luego en **Acceder a (la dirección de tu NOMAD)**. (En algunos navegadores el botón dice «Continuar» o «Aceptar el riesgo».)
3. Llegarás a MeshCore Web. Tu navegador recuerda la decisión, así que no volverás a ver la advertencia en ese dispositivo.

**Conectar tu radio:** usa **Chrome o Edge**, que son los que mejor soportan USB y Bluetooth desde el navegador. Enchufa la radio a la computadora desde la que navegas (USB) o tenla cerca (Bluetooth) y conéctate a ella desde la app. La radio se conecta a **la computadora que estás usando**, no al NOMAD, así que conéctate desde un dispositivo que tenga la radio enchufada o al alcance del Bluetooth. Algunos celulares son más estrictos con los certificados autofirmados y pueden negarse a conectarse; Chrome o Edge en una computadora de escritorio es lo más confiable.

**Tus datos:** no hay nada que configurar ni guardar en tu NOMAD para esta app. Los ajustes de tu radio están en la radio, y las preferencias de la app, en tu navegador. No hay carpeta de NOMAD que administrar.

**Funciona sin conexión:** totalmente, que es justamente la idea de MeshCore. La app se sirve desde tu NOMAD y se comunica con tu radio directamente por USB o Bluetooth, nunca por internet.

## Biblioteca traducida {% #offline-translation %}

Lee la Biblioteca de información en otro idioma. Abre un artículo y aparecerá arriba una barra **Translate this page** con un botón por cada idioma instalado, más **Original** para volver al texto original. Tu elección se mantiene mientras pasas a otros artículos.

**Por qué esto y no el Asistente de IA:** el Asistente de IA puede traducir, pero esto es unas 1600 veces más rápido en el mismo equipo y no necesita tarjeta gráfica, así que funciona en cualquier NOMAD. También cuida más los nombres propios: si le pides al Asistente de IA que traduzca una página, traducirá tranquilamente «Project NOMAD» a otro idioma, y esto no.

**Elegir idiomas:** francés, español y alemán vienen configurados por defecto. Para agregar o quitar idiomas:

1. En el **Depósito de suministros**, abre el menú **Administrar** de la Biblioteca traducida y elige **Editar**.
2. En **Variables de entorno**, busca `TRANSLATE_LANGS=fr,es,de`.
3. Cambia la lista de códigos de idioma, separados por comas. Por ejemplo, `TRANSLATE_LANGS=fr,es,de,sv` agrega sueco.
4. Haz clic en **Guardar**. La app se reinicia, descarga los idiomas nuevos y agrega un botón para cada uno en la barra **Translate this page**.

Agregar un idioma necesita conexión a internet, y cada uno ocupa entre unos 45 MB y 140 MB de disco. Los idiomas que ya tienes siguen funcionando sin conexión. Quitar un código de la lista no elimina un idioma ya descargado: queda en `storage/translate/models` y conserva su botón.

Estos son los 50 idiomas disponibles. El chino todavía no está disponible.

| Idioma | Código |
|---|---|
| Afrikáans | `af` |
| Árabe | `ar` |
| Euskera | `eu` |
| Bengalí | `bn` |
| Bosnio | `bs` |
| Búlgaro | `bg` |
| Catalán | `ca` |
| Croata | `hr` |
| Checo | `cs` |
| Danés | `da` |
| Neerlandés | `nl` |
| Estonio | `et` |
| Finés | `fi` |
| Francés | `fr` |
| Gallego | `gl` |
| Alemán | `de` |
| Griego | `el` |
| Guyaratí | `gu` |
| Hebreo | `he` |
| Hindi | `hi` |
| Húngaro | `hu` |
| Islandés | `is` |
| Indonesio | `id` |
| Italiano | `it` |
| Japonés | `ja` |
| Canarés | `kn` |
| Coreano | `ko` |
| Letón | `lv` |
| Lituano | `lt` |
| Malayo | `ms` |
| Malayalam | `ml` |
| Maratí | `mr` |
| Noruego | `nb` |
| Persa | `fa` |
| Polaco | `pl` |
| Portugués | `pt` |
| Rumano | `ro` |
| Ruso | `ru` |
| Serbio | `sr` |
| Eslovaco | `sk` |
| Esloveno | `sl` |
| Español | `es` |
| Sueco | `sv` |
| Tamil | `ta` |
| Telugu | `te` |
| Tailandés | `th` |
| Turco | `tr` |
| Ucraniano | `uk` |
| Urdu | `ur` |
| Vietnamita | `vi` |

**El primer arranque necesita internet.** Los modelos de idioma se descargan la primera vez que corre la app, igual que al instalar cualquier otra app. Después funciona totalmente sin conexión. Si la instalas sin conexión, la app arranca igual y la biblioteca sigue funcionando, solo que sin traducción hasta que pueda descargar los modelos.

**Qué no traduce:** tablas y fichas informativas, el título de la página en la pestaña del navegador y los resultados de búsqueda de Kiwix. La búsqueda también sigue funcionando en el idioma original, así que busca en inglés y traduce el artículo al que llegues.

**Sobre los dos botones de idioma:** la barra de herramientas de la biblioteca tiene un globo que cambia los *menús* alrededor de la página. La barra que agrega esta app cambia el *artículo*. Son cosas distintas y están muy cerca una de la otra, lo cual es una lástima, pero no es algo que podamos mover.

**Precisión:** es traducción automática, y es literal. Sirve muy bien para entender de qué trata un artículo. Ten cuidado si dependes de ella para la redacción exacta de temas médicos o de seguridad, donde el término correcto en otro idioma muchas veces no es el literal.

**Tus datos:** los modelos de idioma están en `storage/translate/models`. Nada de lo que lees se guarda ni se envía a ningún lado.

**Funciona sin conexión:** sí, una vez descargados los modelos.
