# Notas de la versión

## Versión 1.35.1 - 5 de octubre de 2026

### Funciones

### Correcciones de errores
- **IA**: verifica un modelo que la lista reporta sin visión antes de desactivar los adjuntos de imágenes, para que `gemma3` vuelva a aceptar imágenes (#1409). ¡Gracias, @chriscrosstalk, por la contribución!
- **Biblioteca traducida**: reenvía las redirecciones del servidor de origen en lugar de seguirlas, para que los libros se abran con estilo y sus enlaces a artículos funcionen (#1379). ¡Gracias, @chriscrosstalk, por la contribución!
- **Biblioteca traducida**: descarga todos los idiomas publicados en lugar de fallar con modelos preliminares, y lista todos los idiomas compatibles en la documentación (#1405). ¡Gracias, @chriscrosstalk, por la contribución!

### Mejoras

## Versión 1.35.0 - 29 de septiembre de 2026

### Funciones
- **IA**: admite adjuntar imágenes en el chat con modelos de visión locales (#1288). ¡Gracias, @gabegraves y @chriscrosstalk, por la contribución!
- **IA**: muestra el documento de origen y la fecha como citas debajo de las respuestas con RAG (#1287). ¡Gracias, @chriscrosstalk, por la contribución!
- **IA**: ajusta el tamaño del prompt y configura de verdad la ventana de contexto en una ruta de chat nativa de Ollama (#1253). ¡Gracias, @jakeaturner, por la contribución!
- **IA**: da al chat un muestreador con cuatro perfiles de estilo de respuesta en lugar de los valores predeterminados del backend (#1282). ¡Gracias, @jakeaturner, por la contribución!
- **IA**: restringe las llamadas de tareas estructuradas (títulos, sugerencias, reescritura de consultas) en lugar de pedirlo amablemente (#1259). ¡Gracias, @jakeaturner, por la contribución!
- **IA**: permite que la búsqueda no devuelva nada mediante un umbral de relevancia después del reordenamiento (#1281). ¡Gracias, @jakeaturner, por la contribución!
- **IA**: agrega un control opcional de relevancia para búsquedas fuera de tema (#1365). ¡Gracias, @jakeaturner, por la contribución!
- **IA**: permite elegir un modelo liviano para tareas secundarias (#1244). ¡Gracias, @jakeaturner, por la contribución!
- **IA**: hace que la búsqueda RAG sea opcional en cada chat (#1247). ¡Gracias, @jakeaturner, por la contribución!
- **Panel**: mosaicos de enlaces agregados por el usuario para servicios que NOMAD no administra (#1293). ¡Gracias, @chriscrosstalk, por la contribución!
- **Base de conocimiento**: interruptor de activación por archivo, agrupación en colecciones y activación masiva (#1286). ¡Gracias, @just-jbc y @chriscrosstalk, por la contribución!
- **Biblioteca de Kiwix**: explora el catálogo remoto de Kiwix en cualquier idioma, no solo en inglés (#1299). ¡Gracias, @chriscrosstalk, por la contribución!
- **Mapas**: administración completa de marcadores (visibilidad, búsqueda y orden, ícono y color por marcador, navegación por coordenadas, confirmación al borrar) (#1291). ¡Gracias, @kennethbrewer3 y @chriscrosstalk, por la contribución!
- **Biblioteca traducida**: traducción automática sin conexión para la Biblioteca de información, como app del Depósito de suministros (#1292). ¡Gracias, @chriscrosstalk, por la contribución!

### Correcciones de errores
- **IA**: evita que la salida `<think>` se filtre en títulos, sugerencias y la reescritura RAG (#1254). ¡Gracias, @jakeaturner, por la contribución!
- **IA**: reporta como fallida una descarga de modelo de Ollama que falló, en lugar de darla por exitosa (#1274). ¡Gracias, @chriscrosstalk, por la contribución!
- **IA**: no consulta el endpoint nativo de embeddings en un backend que no es Ollama (#1284). ¡Gracias, @chriscrosstalk, por la contribución!
- **IA**: no clasifica el backend como no Ollama cuando simplemente no responde (#1357). ¡Gracias, @chriscrosstalk, por la contribución!
- **IA**: sube la versión fijada de Ollama a 0.33.3 para corregir el bloqueo al desconectarse (#1356). ¡Gracias, @chriscrosstalk, por la contribución!
- **IA**: quita la advertencia, sin uso desde hace tiempo, sobre el modelo de reescritura predeterminado (#1249). ¡Gracias, @jakeaturner, por la contribución!
- **Benchmark**: muestra la puntuación v2 en el historial de benchmarks (#1210). ¡Gracias, @chriscrosstalk, por la contribución!
- **Benchmark**: evita que WSL2 envíe «Microsoft Basic Render Driver» como modelo de GPU (#1277). ¡Gracias, @chriscrosstalk, por la contribución!
- **Chat**: cancela las transmisiones de respuestas abandonadas (#1220). ¡Gracias, @NgoQuocViet2001, por la contribución!
- **Chat**: deja de limitar las respuestas a 1024 tokens y avisa cuando se cortan (#1360). ¡Gracias, @jakeaturner, por la contribución!
- **Chat**: muestra el mensaje del usuario antes de crear la sesión (#1301). ¡Gracias, @chriscrosstalk, por la contribución!
- **Contenido**: vuelve a descargar las actualizaciones de contenido después de un intento fallido (#1213). ¡Gracias, @Osamaali313, por la contribución!
- **Base de datos**: permite `dataset` en `installed_resources.resource_type` (#1243). ¡Gracias, @rcorvus, por la contribución!
- **Descargas**: protege los trabajos de modelos huérfanos (#1245). ¡Gracias, @NgoQuocViet2001, por la contribución!
- **GPU**: detecta en los registros cuando Ollama pasa a usar la CPU, para que se active la corrección automática (#1109). ¡Gracias, @fpolica91, por la contribución!
- **GPU**: detecta cuando Ollama pasa a usar la CPU en AMD y ofrece la corrección adecuada (#1370). ¡Gracias, @jakeaturner, por la contribución!
- **GPU**: evita que la falta de `/dev/kfd` bloquee por completo la instalación del Asistente de IA (#1276). ¡Gracias, @chriscrosstalk, por la contribución!
- **GPU**: conserva un ajuste HSA de AMD existente al reinstalar y actualizar (#1390). ¡Gracias, @jakeaturner, por la contribución!
- **Instalación**: agrega tiempo de espera a las comprobaciones de disponibilidad de Redis (#1347). ¡Gracias, @dajiaohuang, por la contribución!
- **Instalación**: reconoce la cadena de lspci de HawkPoint1 para detectar GPU AMD gfx1103 (#1385). ¡Gracias, @Yi-111-a, por la contribución!
- **Base de conocimiento**: deja de dejar vectores de Qdrant sueltos cuando se borra o reemplaza un ZIM (#1227). ¡Gracias, @just-jbc, por la contribución!
- **Base de conocimiento**: evita que la limpieza de huérfanos borre una carpeta de escaneo vacía pero existente (#1393). ¡Gracias, @jakeaturner, por la contribución!
- **Base de conocimiento**: guarda el interruptor de activación de una fuente aunque no exista una fila de estado de indexación (#1395). ¡Gracias, @jakeaturner, por la contribución!
- **Mapas**: evita que la preparación del mapa base mundial ejecute dos veces la extracción de pmtiles (#1394). ¡Gracias, @jakeaturner, por la contribución!
- **Cola**: limpia los trabajos terminados antes de volver a enviarlos, para que las descargas no se pierdan sin aviso (#1225). ¡Gracias, @chriscrosstalk, por la contribución!
- **Cola**: evita que la recuperación de trabajos trabados duplique la cadena de embeddings (#1270). ¡Gracias, @chriscrosstalk, por la contribución!
- **RAG**: no abandona un ZIM después de un lote con pocos datos (#1242). ¡Gracias, @rcorvus, por la contribución!
- **Seguridad**: rechaza URL personalizadas demasiado largas (#1354). ¡Gracias, @dajiaohuang, por la contribución!
- **Cargador inicial**: conserva el puerto del equipo de una app instalada al sincronizar el catálogo (#1300). ¡Gracias, @johno10661 y @chriscrosstalk, por la contribución!
- **Sistema**: resuelve también en la página Sistema un nombre de GPU genérico (#1285). ¡Gracias, @chriscrosstalk, por la contribución!
- **Interfaz**: recupera el contraste del texto en el modo noche (#1358). ¡Gracias, @Tiancheng-Xu, por la contribución!
- **ZIM**: reconoce los ZIM con variantes y en idiomas distintos del inglés al buscar actualizaciones (#1298). ¡Gracias, @chriscrosstalk, por la contribución!

### Mejoras
- **Marca**: reemplaza la insignia retirada de N.O.M.A.D. por el logo nuevo (#1375). ¡Gracias, @chriscrosstalk, por la contribución!
- **CI**: agrega una ejecución semanal programada a la validación de las URL de las colecciones (#1217). ¡Gracias, @cclavin, por la contribución!
- **Panel**: ajusta la descripción del mosaico de la Guía de medicamentos (#1297). ¡Gracias, @chriscrosstalk, por la contribución!
- **Documentación**: agrega SECURITY.md y refuerza el .gitignore para archivos de credenciales (#1223). ¡Gracias, @chriscrosstalk, por la contribución!
- **Documentación**: indica cuánto disco necesita NOMAD antes de agregar contenido (#1278). ¡Gracias, @chriscrosstalk, por la contribución!
- **Evaluación**: sistema estandarizado de evaluación de calidad de RAG con un corpus fijo y un conjunto de preguntas de referencia (#1233). ¡Gracias, @jakeaturner, por la contribución!
- **Instalación**: agrega el banner ASCII de Project NOMAD al instalador (#1310). ¡Gracias, @chriscrosstalk, por la contribución!

## Versión 1.34.0 - 4 de agosto de 2026

### Funciones
- **IA**: nomad.md para instrucciones personalizadas (#1127). ¡Gracias, @jakeaturner, por la contribución!
- **IA**: interruptor de razonamiento por modelo con valor global predeterminado (desactivado) (#1079). ¡Gracias, @chriscrosstalk, por la contribución!
- **Documentación de la API**: documentación OpenAPI generada automáticamente con la interfaz de Scalar (#1128). ¡Gracias, @jakeaturner, por la contribución!
- **Benchmark**: sysbench oficial multiarquitectura, digest resuelto y metadatos de plataforma (#1158). ¡Gracias, @chriscrosstalk, por la contribución!
- **Benchmark**: fija la referencia de IA de la puntuación v2 en 13,2 (medida; antes era provisoria) (#1097). ¡Gracias, @chriscrosstalk, por la contribución!
- **Benchmark**: banner en el panel que invita a volver a ejecutar el benchmark con la puntuación v2 (#1096). ¡Gracias, @chriscrosstalk, por la contribución!
- **Benchmark**: cliente de la app para la puntuación v2: datos crudos, puntuación sin tope, datos v2 e interfaz. ¡Gracias, @chriscrosstalk, por la contribución!
- **Benchmark**: refuerzo del sistema de pruebas: falla de forma visible, fija la versión de sysbench y registra el origen (#1089). ¡Gracias, @chriscrosstalk, por la contribución!
- **Benchmark**: revelación de la puntuación al final de la ejecución y superposición del uso de GPU NVIDIA (#1087). ¡Gracias, @chriscrosstalk, por la contribución!
- **Benchmark**: cifras de sysbench oficiales durante la prueba y franja de resultados (#1085). ¡Gracias, @chriscrosstalk, por la contribución!
- **Benchmark**: telemetría en vivo durante los benchmarks (#1082) (#1084). ¡Gracias, @chriscrosstalk, por la contribución!
- **Colecciones**: admite descargas con acceso restringido para contenido seleccionado autoalojado (#1172). ¡Gracias, @chriscrosstalk, por la contribución!
- **Packs de creadores**: packs de videos por creador con acceso restringido, sin conexión mediante Kiwix (#1106). ¡Gracias, @chriscrosstalk, por la contribución!
- **Panel**: agrega un banner descartable de «Novedades» para la v1.34 (#1112). ¡Gracias, @chriscrosstalk, por la contribución!
- **Panel**: completa los destacados de «Novedades» de la v1.34 (#1197). ¡Gracias, @chriscrosstalk, por la contribución!
- **Información de depuración**: agrega diagnósticos de almacenamiento, Docker, salud de la GPU y actualizaciones automáticas (#1102). ¡Gracias, @chriscrosstalk, por la contribución!
- **Guía de medicamentos**: Agrega la guía de medicamentos de la FDA sin conexión (prospectos, vista de interacciones, situaciones, remedios) (#1040). ¡Gracias, @caweis, por la contribución!
- **Biblioteca de Kiwix**: Filas expandibles en el explorador de la biblioteca de Kiwix (#1060). ¡Gracias, @jarvisxyz, por la contribución!
- **Mapas**: agrega un campo de notas a la ventana para colocar marcadores en el mapa (#926). ¡Gracias, @chriscrosstalk, por la contribución!
- **RAG**: agrega organización por materia o colección a la base de conocimiento (#1063). ¡Gracias, @just-jbc, por la contribución!

### Correcciones de errores
- **IA**: transmite el razonamiento desde el campo de razonamiento de /v1 y aborta si el cliente se desconecta (#1078). ¡Gracias, @chriscrosstalk, por la contribución!
- **IA**: deja de forzar HSA_OVERRIDE=11.0.0 en iGPU de AMD con soporte nativo (#1076). ¡Gracias, @chriscrosstalk, por la contribución!
- **IA**: define OLLAMA_IGPU_ENABLE al aprovisionar AMD para que se usen las iGPU (#1074). ¡Gracias, @chriscrosstalk, por la contribución!
- **IA**: fuerza HSA_OVERRIDE 11.0.0 en la gfx1103 (780M) para que siga usando la GPU (#1134). ¡Gracias, @jakeaturner, por la contribución!
- **Benchmark**: corrige varios errores de TypeScript. ¡Gracias, @jakeaturner, por la contribución!
- **Benchmark**: las ejecuciones parciales no son la puntuación NOMAD (se cambia la etiqueta y se renormaliza) (#1088). ¡Gracias, @chriscrosstalk, por la contribución!
- **Benchmark**: elimina un setter de progreso obsoleto (#1136). ¡Gracias, @NgoQuocViet2001, por la contribución!
- **Benchmark**: muestra un motivo claro cuando falla el envío a la tabla de la comunidad (#1138). ¡Gracias, @chriscrosstalk, por la contribución!
- **Benchmark**: precalienta el modelo de IA antes de las ejecuciones cronometradas para obtener puntuaciones reproducibles (#1140). ¡Gracias, @chriscrosstalk, por la contribución!
- **Benchmark**: bloquea el envío a la tabla de la comunidad cuando la IA corre en un equipo remoto (#1157). ¡Gracias, @chriscrosstalk, por la contribución!
- **Benchmark**: no bloquea el envío cuando la IA corre en este mismo equipo (#1166). ¡Gracias, @chriscrosstalk, por la contribución!
- **Chat**: hace adaptable el diseño de la conversación (#1090). ¡Gracias, @Bortlesboat, por la contribución!
- **Chat**: abre el chat completo en la misma ventana en lugar de una nueva (#1181). ¡Gracias, @chriscrosstalk, por la contribución!
- **Contenido**: resuelve la URL actual del ZIM antes de descargarlo (#1091). ¡Gracias, @NgoQuocViet2001, por la contribución!
- **Contenido**: actualiza los ZIM instalados al terminar una descarga para quitar entradas fantasma (#1099). ¡Gracias, @chriscrosstalk, por la contribución!
- **Packs de creadores**: agrega el banner faltante de Modern Rogue (#1147). ¡Gracias, @chriscrosstalk, por la contribución!
- **Descargas**: envía un User-Agent descriptivo para que los espejos de Wikimedia no devuelvan 403 (#1114). ¡Gracias, @chriscrosstalk, por la contribución!
- **Descargas**: agrega un botón para reintentar y un enlace de descarga del recurso cuando una descarga falla (#1059). ¡Gracias, @jarvisxyz, por la contribución!
- **Descargas**: el endpoint de trabajos ya no devuelve 500 ante un trabajo huérfano de BullMQ (#1191). ¡Gracias, @chriscrosstalk, por la contribución!
- **Descargas**: no vuelve a intentar durante cuatro horas un acceso rechazado (#1205). ¡Gracias, @chriscrosstalk, por la contribución!
- **Descargas**: permite retomar las descargas de contenido interrumpidas (#1202). ¡Gracias, @chriscrosstalk, por la contribución!
- **Configuración rápida**: simplifica el asistente y hace más sólidas las recomendaciones de modelos (#1110). ¡Gracias, @chriscrosstalk, por la contribución!
- **Instalación**: define header_red y los colores que faltaban en los scripts de desinstalación y actualización (#1098). ¡Gracias, @chriscrosstalk, por la contribución!
- **Base de conocimiento**: evita que se corte el desplegable de colecciones y ensancha la ventana (#1198). ¡Gracias, @chriscrosstalk, por la contribución!
- **Base de conocimiento**: conserva la colección cuando un archivo se indexa después de asignarlo (#1200). ¡Gracias, @chriscrosstalk, por la contribución!
- **KVStore**: corrige la clave apps.homebox que faltaba. ¡Gracias, @jakeaturner, por la contribución!
- **Mapas**: avisa cuando falta el mapa base mundial en lugar de mostrar un mapa gris sin explicación (#1104). ¡Gracias, @not-knope, por la contribución!
- **RAG**: agrega extracción de texto de .docx como corresponde mediante mammoth (#1100). ¡Gracias, @just-jbc, por la contribución!
- **RAG**: deja de volver a crear los índices de payload con cada documento incrustado (#1135). ¡Gracias, @bragaus, por la contribución!
- **Contenido**: respeta la política de indexación cuando se sube un ZIM de forma local (#1184). ¡Gracias, @chriscrosstalk, por la contribución!
- **Depósito de suministros**: genera el pepper de la clave de API de Homebox para que deje de reiniciarse en bucle (#1077). ¡Gracias, @chriscrosstalk, por la contribución!
- **Interfaz**: agrega un enlace a la referencia de la API en la barra lateral de Ajustes. ¡Gracias, @jakeaturner, por la contribución!
- **Actualizador**: elimina las imágenes reemplazadas después de actualizar para recuperar espacio en disco (#1101). ¡Gracias, @chriscrosstalk, por la contribución!

### Mejoras
- **Marca**: agrega ™ al logotipo de Project NOMAD en los lugares destacados. ¡Gracias, @chriscrosstalk, por la contribución!
- **Marca**: unifica el nombre de la marca como Project NOMAD y retira el acrónimo. ¡Gracias, @chriscrosstalk, por la contribución!
- **Compilación**: ejecuta el paso de generación de código de la guía de medicamentos (#1132). ¡Gracias, @jakeaturner, por la contribución!
- **Depósito de suministros**: retira la tarjeta huérfana de Meshtastic Daemon (#1049). ¡Gracias, @chriscrosstalk, por la contribución!
- **Catálogo**: agrega el pack de creador The Modern Rogue (dev) (#1146). ¡Gracias, @chriscrosstalk, por la contribución!
- **CI**: corrige la validación de URL de las colecciones. ¡Gracias, @jakeaturner, por la contribución!
- **Colecciones**: actualiza URL obsoletas (#1148). ¡Gracias, @jakeaturner, por la contribución!
- **Colecciones**: corrige cuatro URL de descarga de Wikipedia que ya no funcionaban (#1189). ¡Gracias, @chriscrosstalk, por la contribución!
- **Administrador de contenido**: filtra las secciones que no son contenido y muestra las tablas en la extracción de ZIM (#1044). ¡Gracias, @chriscrosstalk, por la contribución!
- **Dependencias**: actualiza tar, vite y dockerode en admin. ¡Gracias, @jakeaturner, por la contribución!
- **Dependencias**: actualiza axios y systeminformation en admin. ¡Gracias, @jakeaturner, por la contribución!
- **Documentación**: hace precisas y coherentes las indicaciones para reubicar el almacenamiento (#1103). ¡Gracias, @chriscrosstalk, por la contribución!
- **Documentación**: agrega la sección de coherencia de la interfaz (#1080). ¡Gracias, @chriscrosstalk, por la contribución!
- **Documentación**: recomienda Ubuntu 26.04 LTS como base predeterminada (#1141). ¡Gracias, @chriscrosstalk, por la contribución!
- **Documentación**: apunta MeshCore Web al sitio oficial meshcore.io (#1142). ¡Gracias, @chriscrosstalk, por la contribución!
- **Guía de medicamentos**: hace del JSON de colecciones la única fuente de los datos seleccionados (#1130). ¡Gracias, @caweis, por la contribución!
- **Guía de medicamentos**: rediseño con pestañas, búsqueda agrupada, selección de varias situaciones y un aviso que hay que aceptar (#1137). ¡Gracias, @chriscrosstalk, por la contribución!

## Versión 1.33.0 - 23 de junio de 2026

### Funciones
- **Depósito de suministros: apps personalizadas**: El Depósito de suministros es el nuevo lugar de NOMAD para las apps instalables, y ahora te deja ejecutar tus *propios* contenedores de Docker personalizados, no solo el catálogo seleccionado. Indica una imagen, el mapeo de puertos, los volúmenes, las variables de entorno y los límites de memoria y CPU, y NOMAD lo levanta como un contenedor hermano administrado. Una verificación previa en vivo avisa de conflictos de puertos y límites de recursos mientras escribes, y bloquea las configuraciones inseguras, con la opción «instalar de todos modos» cuando solo hay advertencias (por ejemplo, un registro no confiable o una etiqueta `:latest`). Las apps personalizadas instaladas se pueden editar, actualizar (vuelve a traer la última versión y recrea el contenedor, con una reversión segura si el nuevo falla) y quitar (con la opción de borrar la imagen), y cada app instalada, seleccionada o personalizada, tiene ventanas de **Registros** y **Estadísticas** por contenedor. Los volúmenes de rutas del equipo están protegidos contra escapes, y los registros y estadísticas se limitan a los contenedores que administra NOMAD. ¡Gracias, @jakeaturner, por la contribución!
- **Depósito de suministros: primeros pasos y correcciones de las apps seleccionadas**: Cada app seleccionada ahora trae documentación de primeros pasos específica de NOMAD (primer arranque, usuarios predeterminados, dónde se guardan los datos, qué funciona sin conexión y qué no), enlazada desde la opción **Administrar › Documentación** de la tarjeta. Junto con eso llega una tanda de correcciones de instalación para que las nueve apps documentadas (Stirling PDF, File Browser, Calibre-Web, IT Tools, Excalidraw, Homebox, Vaultwarden, Jellyfin, Meshtastic Web) funcionen desde el primer momento: usuarios precargados en lugar de contraseñas aleatorias escondidas en los registros, una biblioteca de Calibre incluida, HTTPS por defecto donde la app necesita un contexto seguro (Vaultwarden), puertos internos corregidos (Meshtastic Web), carpetas de medios creadas de antemano (Jellyfin) y el cambio a una imagen mantenida (Homebox). Ahora también puedes **editar las apps seleccionadas**, no solo las personalizadas: los cambios se combinan con la configuración existente de la app (conservando ajustes avanzados como las solicitudes de dispositivos GPU) y marcan la app para que el cargador inicial deje de sobrescribirla, mientras que las apps sin cambios siguen recibiendo las actualizaciones del catálogo. ¡Gracias, @chriscrosstalk, por la contribución!
- **Actualizaciones automáticas del núcleo**: La imagen principal de admin de NOMAD ahora puede actualizarse sola, protegida por varias capas de verificaciones de seguridad. Es opcional y viene desactivada, solo se ejecuta dentro de una franja horaria que configuras tú y solo aplica versiones estables estrictamente más nuevas de la misma versión mayor (los saltos de versión mayor siguen siendo manuales) después de un período de espera configurable, con verificaciones previas del sidecar de actualización, sin actualizaciones, descargas ni instalaciones en curso y con espacio suficiente en el disco. Se desactiva sola después de varias fallas reales, mientras que las consultas de versiones que fallan por estar sin conexión se toman como omisiones inofensivas. En Ajustes → Actualizaciones están el interruptor, la franja horaria, el período de espera y el estado en vivo. Es la primera parte de la trilogía de actualizaciones automáticas. ¡Gracias, @jakeaturner, por la contribución!
- **Actualizaciones automáticas de apps**: Las apps instaladas (los contenedores hermanos del «Depósito de suministros») ahora pueden mantenerse al día con actualizaciones menores y de parche, opcionales y sin intervención, igual que la actualización automática del núcleo. Las actualizaciones requieren activarse en dos niveles (un interruptor general en Ajustes → Actualizaciones **y** un interruptor por app en el Depósito de suministros) y respetan la franja horaria compartida, el período de espera, las verificaciones previas de disco y de tareas en curso, y la espera tras fallas de cada app. Las versiones mayores nunca se aplican solas. ¡Gracias, @jakeaturner, por la contribución!
- **Actualizaciones automáticas de contenido**: Para completar la trilogía de actualizaciones automáticas, los archivos ZIM de Kiwix y los mapas PMTiles instalados ahora pueden actualizarse solos si lo activas. Las actualizaciones de contenido tienen su propia franja nocturna y su propio límite de ancho de banda (separados del calendario de apps y del núcleo, porque las descargas de contenido pesan varios GB), consultan directamente los catálogos de Kiwix y PMTiles (ya no dependen de la API externa de Project NOMAD) y mantienen sincronizada la base de conocimiento de la IA cuando se reemplaza un ZIM. ¡Gracias, @jakeaturner, por la contribución!
- **Depósito de suministros: enlaces de apertura personalizados**: Ahora puedes reemplazar el enlace «Abrir» de una app por una dirección de proxy inverso o de DNS local (por ejemplo, `https://jellyfin.myhomelab.net`). El reemplazo se guarda aparte para que siempre se pueda recuperar el enlace predeterminado, se mantiene tras recargas y actualizaciones, y se valida tanto en el cliente como en el servidor. ¡Gracias, @jakeaturner, por la contribución!
- **Depósito de suministros: versión y actualizaciones visibles**: Las tarjetas de las apps ahora muestran la versión instalada junto al nombre (por ejemplo, `Kiwix · 3.7.0`), y la etiqueta «Actualización disponible» ahora resalta con un relleno naranja desierto sólido para que las actualizaciones disponibles llamen la atención. ¡Gracias, @chriscrosstalk, por la contribución!
- **Mapas: vista persistente**: La página de Mapas ahora recuerda tu posición y tu zoom al recargar, en lugar de volver a la vista predeterminada de todo Estados Unidos. La vista guardada se verifica contra los límites, así que un valor dañado vuelve sin problemas a la vista predeterminada. ¡Gracias, @chriscrosstalk, por la contribución!
- **Administrador de contenido: volver a escanear la biblioteca**: Un nuevo botón «Volver a escanear la biblioteca» reconstruye el índice de Kiwix a partir de los archivos ZIM que hay en el disco, para que los archivos **cargados por fuera** del flujo de descargas de NOMAD (memoria USB, SSH, carpeta compartida en red) se puedan servir sin abrir una terminal. Informa cuántos libros nuevos encontró y, en modo biblioteca, se recarga en caliente sin reiniciar el contenedor. ¡Gracias, @chriscrosstalk, por la contribución!
- **Configuración: elección de la base de datos de Redis**: Se agregó la variable de entorno `REDIS_DB` para que los operadores elijan una base de datos lógica de Redis (0 a 15) para la cola de trabajos y el transporte de actualizaciones en vivo. Esto evita choques de claves cuando una misma instancia de Redis se comparte entre varios stacks (algo común en los homelabs). Por defecto usa la db 0, así que el comportamiento actual no cambia. ¡Gracias, @johno10661, por la contribución!
- **Ajustes avanzados: URL de prueba de internet**: Se agregó una nueva página de Ajustes avanzados con una opción para reemplazar la URL «baliza» predeterminada de la prueba de conexión a internet (vendrán más ajustes avanzados). Antes, para reemplazar esta URL había que cambiar una variable de entorno y reiniciar el contenedor. La variable de entorno anterior se sigue respetando si la definiste. ¡Gracias, @jakeaturner, por la contribución!
- **RAG**: Ahora se pueden cancelar los trabajos de incrustación, así puedes quitar los trabajos trabados que no llegaron a fallar. ¡Gracias, @jakeaturner, por la contribución!

### Correcciones de errores
- **Almacenamiento**: Cuando el volumen de almacenamiento de admin se reubica en otro disco, las apps hijas (Kiwix, Ollama, Qdrant, Flatnotes, Kolibri) ahora lo siguen automáticamente a la nueva ubicación en lugar de montar la ruta vieja y vacía. La raíz de almacenamiento del equipo ahora se toma del montaje real de admin, con la opción explícita `NOMAD_STORAGE_PATH` para reemplazarla y comentarios más claros en el compose. ¡Gracias, @chriscrosstalk, por la corrección!
- **Sistema**: Si falla la actualización de un servicio, ahora se vuelve al contenedor anterior cuando el nuevo no arranca, así el servicio sigue funcionando con la versión vieja en lugar de quedar caído. También borra cualquier contenedor sobrante para que un reintento no se trabe indefinidamente. ¡Gracias, @chriscrosstalk, por la corrección!
- **Sistema**: Las fallas al instalar un servicio por un conflicto de puertos en el equipo (normalmente una instalación nativa de Ollama que ya usa el puerto 11434) ahora muestran un mensaje claro y útil con los comandos exactos para resolverlo, en lugar de un error de Docker sin procesar. ¡Gracias, @chriscrosstalk, por la corrección!
- **Sistema**: El botón Actualizar de cada servicio ahora se desactiva y muestra «Actualizando...» mientras hay una actualización en curso, lo que evita los doble clics que antes terminaban en errores de Docker. El estado en curso se guarda, así que se mantiene si recargas la página durante una descarga de varios GB. ¡Gracias, @chriscrosstalk, por la corrección!
- **Actualizaciones del sistema**: La búsqueda de actualizaciones ya no falla con imágenes que tienen más de 1000 etiquetas (por ejemplo, Ollama). Las URL de paginación del registro ahora se resuelven bien, así que «Buscar actualizaciones» devuelve versiones en lugar de fallar sin avisar, lo que corrige que Ollama pareciera fijado en una versión vieja. ¡Gracias, @chriscrosstalk, por la corrección!
- **Sistema**: La verificación de conexión a internet ya no informa «Sin conexión a internet» en redes que bloquean o interceptan el 1.1.1.1 de Cloudflare. Ahora consulta en paralelo otros servidores que la app ya usa (GitHub y la API de Project NOMAD) y toma cualquier respuesta HTTP como «en línea». ¡Gracias, @akashsalan, por la corrección!
- **Asistente de IA**: Los fragmentos de incrustación demasiado grandes ahora se recortan y se reintentan en lugar de descartarse sin aviso, lo que termina con la tormenta de reintentos que podía saturar la GPU y llenar los registros (el problema de «api/embed durante semanas»). La ruta alternativa compatible con OpenAI ahora también pasa los ajustes de contexto y recorte. ¡Gracias, @chriscrosstalk, por la corrección!
- **Asistente de IA**: Las sugerencias del chat ahora usan el modelo que elegiste (o, si no hay, el modelo instalado *más chico*) en lugar del más grande. Así se evita que un modelo insignia que no entra en la VRAM disponible cuelgue la página del chat y devuelva un error 500. ¡Gracias, @johno10661, por la corrección!
- **Asistente de IA**: El asistente ya no se excusa con «Lo siento, no encontré contexto específico sobre X...» cuando en realidad sí recuperó material relevante. La instrucción de RAG ahora toma el contexto recuperado como fuente principal y recurre al conocimiento general sin avisar; las puntuaciones de relevancia visibles para el modelo, que llevaban a los modelos más chicos a desconfiar del contexto correcto, se reemplazaron por etiquetas neutras con el título de la fuente, y un pequeño refuerzo por coincidencia de títulos mejora el orden de los fragmentos ya recuperados. ¡Gracias, @jakeaturner, por la corrección!
- **Base de conocimiento**: El conteo de fragmentos incrustados al indexar un ZIM por lotes ahora se guarda correctamente entre lotes, en lugar de informar solo el del último lote. ¡Gracias, @Metbcy, por la corrección!
- **Base de conocimiento**: La advertencia de «puede que la indexación se haya trabado» (trabado parcial) ya no aparece por error en ZIM con muchos enlaces externos o PDF que, con razón, tienen poco texto para incrustar. ¡Gracias, @chriscrosstalk, por la corrección!
- **Base de conocimiento**: El progreso de indexación de un ZIM ya no se congela en 99 % en archivos de varias páginas (por ejemplo, iFixit). Ahora avanza siempre hacia adelante y solo marca 100 % en el lote que de verdad es el último. ¡Gracias, @chriscrosstalk, por la corrección!
- **Contenido**: Instalar una versión más nueva de un mapa o ZIM seleccionado ahora borra del disco el archivo reemplazado, lo que evita que se acumule contenido huérfano sin que te enteres (posiblemente cientos de GB). El borrado tiene protecciones estrictas: solo se eliminan archivos registrados, realmente reemplazados y estrictamente más viejos dentro del almacén de contenido; los archivos cargados por fuera nunca se tocan. ¡Gracias, @chriscrosstalk, por la corrección!
- **Contenido**: Los ZIM seleccionados con temática de Wikipedia (por ejemplo, `wikipedia_en_medicine_maxi` de Medicine → Comprehensive) ya no se borran al reiniciar. La conciliación ahora omite solo el archivo que de verdad administra el selector de Wikipedia, comparando el nombre exacto. ¡Gracias, @chriscrosstalk, por la corrección!
- **Mapas**: Tener en el disco una copia vieja y una nueva de la misma región de mapa ya no deja todo el mapa en blanco. Las fuentes de mapas ahora se reducen al archivo más nuevo de cada región, y las instalaciones que ya estaban rotas se recuperan solas la próxima vez que cargas la página. ¡Gracias, @chriscrosstalk, por la corrección!
- **Biblioteca de información (Kiwix)**: Kiwix ahora repara solo un archivo de biblioteca faltante o dañado al arrancar, reconstruyéndolo a partir de los archivos ZIM del disco, en lugar de arrancar con la biblioteca vacía y sin forma de recuperarla. ¡Gracias, @chriscrosstalk, por la corrección!
- **Docker**: Las descargas de imágenes que fallan (conexión cortada o medida, manifiesto inválido, disco lleno a mitad de la descarga) ahora se tratan como fallas en todas las rutas de descarga, en lugar de seguir adelante y crear un contenedor a partir de una imagen faltante o incompleta, lo que terminaba en un error confuso más adelante. ¡Gracias, @chriscrosstalk, por la corrección!
- **Seguridad**: Se reforzó la protección contra URL privadas/SSRF: la lista de bloqueo por expresiones regulares se reemplazó por una clasificación de rangos IP como corresponde (`ipaddr.js`) y el nombre del equipo se normaliza primero. Esto bloquea codificaciones alternativas de IP y trucos con punto final (por ejemplo, `localhost.`) sin bloquear de más direcciones públicas legítimas. Los rangos RFC1918 y los nombres de equipo de la red local siguen permitidos para los equipos locales. ¡Gracias, @chriscrosstalk, por la corrección!
- **Instalación**: Se reforzó el script de instalación: el paso de la clave GPG del kit de NVIDIA ahora se ejecuta sin interacción para que no se omita sin aviso en instalaciones sin TTY, y las descargas de los scripts auxiliares ahora se reintentan para reducir las instalaciones parciales por fallas pasajeras. ¡Gracias, @Gujiassh, por la corrección!

### Mejoras
- **Licencia y documentación**: Se corrigieron los metadatos de licencia del paquete a `Apache-2.0` (el proyecto usa Apache-2.0 desde hace un tiempo), se agregó una descripción real del proyecto y se arreglaron un enlace roto a Solución de problemas y varias erratas del README. ¡Gracias, @aqilaziz, por la contribución!
- **Documentación**: Se corrigieron algunas erratas y signos de puntuación del README. ¡Gracias, @teccdev, por la contribución!
- **Dependencias**: Se actualizaron React y React DOM. ¡Gracias, @jakeaturner, por la contribución!
- **Dependencias**: Se actualizó autoprefixer. ¡Gracias, @jakeaturner, por la contribución!
- **Dependencias**: Se actualizó BullMQ a 5.77.6 y se adaptaron las llamadas de trabajos afectadas a la nueva forma de los argumentos. ¡Gracias, @jakeaturner, por la contribución!
- **Depósito de suministros**: Se fijaron las versiones de todas las imágenes seleccionadas para que las instalaciones partan de una base coherente. ¡Gracias, @jakeaturner, por la contribución!
- **Depósito de suministros**: Se actualizaron las versiones predeterminadas de CyberChef a 10.24.0 y de Ollama a 0.24.0. ¡Gracias, @jakeaturner, por la contribución!

## Versión 1.32.1 - 27 de mayo de 2026

### Funciones

### Correcciones de errores
- fix(logging): también escribe los registros de producción en stdout para verlos desde Docker (#870). ¡Gracias, @chriscrosstalk, por la contribución!
- fix(KB): cursor en los botones de política de indexación Siempre/Manual (#927). ¡Gracias, @chriscrosstalk, por la contribución!

### Mejoras
- perf(KB): reemplaza el recorrido completo de Qdrant por facetas al listar las fuentes (#928). ¡Gracias, @chriscrosstalk, por la contribución!
- chore(deps): actualiza varias dependencias. ¡Gracias, @jakeaturner, por la contribución!

## Versión 1.32.0 - 20 de mayo de 2026

### Funciones
- **IA:** mejor aceleración por GPU de AMD para Ollama mediante ROCm y HSA override (#804)
- **chat:** confirmación al cambiar de modelo y un solo modelo de chat a la vez (#ffa70a5)
- **content-manager:** agrega una columna de tamaño de archivo ordenable (#698), cierra #685
- **content-updates:** muestra el tamaño y lleva las descargas a Descargas activas (#299b767)
- **Contenido:** fuentes personalizadas de bibliotecas ZIM con espejos precargados (#593) (#62e75fd), cierra #576
- **easy-setup:** separa la IA en un paso propio y condicional (issue #905) (#0617d54), cierra #907
- **GPU:** corrige automáticamente la pérdida del passthrough de nomad_ollama al arrancar admin (#755) (#2997637), cierra #208 #804
- **Base de conocimiento:** interruptor de política de indexación Siempre/Manual (RFC #883 §1/§4) (#894) (#8eb8809), cierra #880 #886 #886 #886 #888 #888 #888 #888 #888
- **Base de conocimiento:** advertencias condicionales A y B en Archivos guardados (RFC #883 §6) (#563f86a), cierra #891 #891 #890 #881
- **Base de conocimiento:** pregunta en el momento, en el primer chat, sobre la política de indexación (RFC #883 Fase 3, tarea 12) (#fd153b4), cierra #894 #894 #894
- **Base de conocimiento:** agrupa la documentación de admin en una sola fila en Archivos guardados (RFC #883 §9) (#c64ec97)
- **Base de conocimiento:** ventana de protección en los umbrales de 50 GB / 10 % libre (RFC #883 §7) (#cf3a924), cierra #897 #897 #894 #899
- **Base de conocimiento:** acción de indexación por archivo e indicador de estado en Archivos guardados (RFC #883 §5) (#d850cb9), cierra #907 #907 #907 #908
- **Base de conocimiento:** máquina de estados de indexación por archivo (Fase 1 del RFC #883) (#888) (#743549c), cierra #880 #886 #886 #886
- **Base de conocimiento:** registro de proporciones para estimar disco y tiempo (Fase 1B del RFC #883) (#159d57b)
- **Base de conocimiento:** etiqueta de estado y hora de la última actividad en la Cola de procesamiento (RFC #883 §5/§10) (#43ca584)
- **Base de conocimiento:** muestra la estimación de disco para incrustaciones en la ventana de cambio de nivel (RFC #883 §1) (#e68c753), cierra #891 #891
- **Base de conocimiento:** paso de política de IA en el asistente (RFC #883 Fase 3, tarea 13) (#7a681d0), cierra #899 #894 #894 #899
- **Mapas:** descargas de mapas por región mediante go-pmtiles extract (#780) (#94059b0)
- **maps:** muestra las coordenadas del mapa al mover el mouse (#786) (#08838b1)

### Correcciones de errores
- **IA:** agrega un registro DEBUG de recorte (#e3b758f)
- **IA:** mejora la validación de la URL de Ollama remoto para evitar una vulnerabilidad SSRF (#989a401)
- **IA:** limita de antemano la entrada de incrustación y registra el motivo de la alternativa (#881) (#2dec5bf), cierra #369 #670
- **IA:** conserva la etiqueta semver en la base de datos al actualizar Ollama para AMD (#019a5a4)
- **IA:** reescribe la consulta de RAG en la primera repregunta (error por uno en el umbral para omitir la reescritura) (#43645e4)
- **IA:** HSA override de AMD según el fabricante y detección de GPU dedicada en el benchmark (#a2e2f7f), cierra #804 #804 #810
- **API:** acepta notes, marker_type y position en los endpoints de marcadores (#770) (#132ec9c), cierra #768
- **API:** omite la compresión para Server-Sent Events (#798) (#4b21ea6)
- **content:** muestra el nivel elegido en las tarjetas mientras hay descargas en curso (#059cf2a), cierra #36b6d8e
- **DockerService:** mejora la lógica de volúmenes y la documentación de forceReinstall (#501860a)
- **Descargas:** trata un Content-Type faltante como octet-stream (#848) (#3abf338)
- **install:** avisa claramente en arquitecturas que no son x86_64 antes de descargar imágenes (#797) (#cb129d2), cierra #419
- **Base de conocimiento:** agrega las opciones de volver a incrustar y de reiniciar y reconstruir para arreglar incrustaciones rotas (#886) (#4c21196)
- **Base de conocimiento:** alinea el tipo de la columna chunks_per_mb con el contrato de TS (#4d6b140)
- **Base de conocimiento:** pantalla en blanco al abrir el panel y descripciones emergentes en los botones de acciones en lote (#633a3c3), cierra #892 #895 #post-#892
- **Base de conocimiento:** salto de la protección mientras carga la estimación y hermano de Transition (revisión del PR #901) (#7e768f3)
- **Base de conocimiento:** quita el botón Actualizar redundante de la Cola de procesamiento (#4e8cadd), cierra #893
- **Base de conocimiento:** respeta la política de indexación Manual al despachar después de una descarga (#a5fe52f), cierra #909
- **Base de conocimiento:** error silencioso en «quizás más tarde» y recargas redundantes del estado de la pregunta (revisión del PR #899) (#9a684a5)
- **Base de conocimiento:** muestra las fallas al calcular las advertencias de archivos en lugar de disfrazarlas de sanas (revisión del PR #895) (#a0047c1)
- **Base de conocimiento:** orden de hooks de TierSelectionModal y registro de IconLibrary (#6e5284e), cierra #915
- **Base de conocimiento:** une la lista de Archivos guardados con las rutas de archivos de la máquina de estados (#898) (#8ed0bdf), cierra #886 #888 #888
- **Mapas:** muestra las notas en la ventana del marcador cuando las tiene (#f41027c), cierra #770
- **Mapas:** envía el nombre del archivo en lugar de la ruta completa al endpoint de borrado (#6a68bac)
- **models:** corrige las claves belongsTo invertidas en ChatMessage.session (#921) (#82f67de)
- **queue:** QueueService único para frenar la fuga de conexiones de ioredis (#ba53702), cierra #872
- **RAG:** agrega un botón de inicio en la ventana de la base de conocimiento y asegura que exista la política de reinicio (#700) (#2d8a02f)
- **RAG:** ancla el progreso inicial de los lotes de continuación al marco del archivo completo (#889) (#f304d80)
- **RAG:** espacia los lotes de continuación cuando la incrustación usa solo CPU (#a22c640)
- **RAG:** pasa num_ctx y truncate a la llamada de incrustación de Ollama (#763) (#7bebedc), cierra #756 #369 #670
- **RAG:** informa el progreso de indexación de ZIM respecto del archivo completo (#d28eb9b)
- **RAG:** arregla la indexación de ZIM en varios lotes (deduplicación de jobId) (#74cef75)
- **security:** normaliza los nombres de equipo para bloquear el salto al IMDS con IPv6 mapeado a IPv4 (#736c9bd)
- **security:** compara los patrones SSRF de IPv6 con nombres de equipo sin corchetes (#b3dac9b)
- **Sistema:** corrige la VRAM de AMD en la tarjeta de la placa de video y refuerza la lectura de registros (#d2f2172), cierra #835 #850 #208
- **Sistema:** corrige la VRAM de NVIDIA en la tarjeta de la placa de video (#835) (#6c799dd), cierra #804
- **Sistema:** corrige solo la marca updateAvailable obsoleta después de una actualización hecha por el sidecar (#825) (#318276c)
- **Sistema:** valida StartedAt con alternativa a tail:500 (revisión del PR) (#662a6c4)
- **Interfaz:** mejoras de uso en el selector de países y actualización automática de los archivos guardados (#817) (#8c06b5b), cierra #780
- **Interfaz:** cuatro correcciones en la página de Actualización del sistema (#827) (#3a2e92a)
- **Interfaz:** mejora la lógica para mostrar el banner del mapa mundial (#702) (#5517e82)
- **Interfaz:** conecta la confirmación de borrado de archivos de mapas con la API (#732) (#e561ce8)
- **ZIM:** conserva los corpus de Wikipedia que conviven al hacer limpieza (#884) (#5e2c599)

### Mejoras

## Versión 1.31.1 - 21 de abril de 2026

### Funciones
- feat(content): fuentes personalizadas de bibliotecas ZIM con espejos precargados (#593). ¡Gracias, @chriscrosstalk!
- feat(content-manager): agrega una columna de tamaño de archivo ordenable (#698). ¡Gracias, @chriscrosstalk!
- feat(ai-chat): permite cancelar las descargas de modelos en curso (#701). ¡Gracias, @chriscrosstalk!
- feat(content-updates): muestra el tamaño y lleva las descargas a Descargas activas (#773). ¡Gracias, @chriscrosstalk!
- feat(maps): descargas de mapas por región mediante go-pmtiles extract (#780). ¡Gracias, @bgauger!
- feat(maps): muestra las coordenadas del mapa al mover el mouse (#786). ¡Gracias, @kennethbrewer3!
- feat(AI): vuelve a activar la aceleración por GPU de AMD para Ollama mediante ROCm y HSA override (#804). ¡Gracias, @chriscrosstalk!
- feat(GPU): corrige automáticamente la pérdida del passthrough de nomad_ollama al arrancar admin (#878). ¡Gracias, @chriscrosstalk!
- feat(KB): máquina de estados de indexación por archivo (Fase 1 del RFC #883) (#888). ¡Gracias, @chriscrosstalk!
- feat(KB): registro de proporciones para estimar disco y tiempo (Fase 1B del RFC #883) (#891). ¡Gracias, @chriscrosstalk!
- feat(KB): agrupa la documentación de admin en una sola fila en Archivos guardados (§9) (#892). ¡Gracias, @chriscrosstalk!
- feat(KB): etiqueta de estado y última actividad en la Cola de procesamiento (§5/§10) (#893). ¡Gracias, @chriscrosstalk!
- feat(KB): interruptor de política de indexación Siempre/Manual (§1/§4) (#894). ¡Gracias, @chriscrosstalk!
- feat(KB): advertencias condicionales A y B en Archivos guardados (§6) (#895). ¡Gracias, @chriscrosstalk!
- feat(KB): muestra la estimación de disco para incrustaciones en la ventana de cambio de nivel (§1) (#897). ¡Gracias, @chriscrosstalk!
- feat(KB): pregunta en el momento, en el primer chat, sobre la política de indexación (Fase 3, tarea 12) (#899). ¡Gracias, @chriscrosstalk!
- feat(KB): paso de política de IA en el asistente (Fase 3, tarea 13) (#900). ¡Gracias, @chriscrosstalk!
- feat(KB): ventana de protección en los umbrales de 50 GB / 10 % libre (§7) (#901). ¡Gracias, @chriscrosstalk!
- feat(easy-setup): separa la IA en un paso propio y condicional (#908). ¡Gracias, @chriscrosstalk!
- feat(KB): acción de indexación por archivo e indicador de estado en Archivos guardados (§5) (#909). ¡Gracias, @chriscrosstalk!
- feat(chat): confirmación al cambiar de modelo y un solo modelo de chat a la vez (#916). ¡Gracias, @chriscrosstalk!

### Correcciones de errores
- fix(downloads): descarga primero a .tmp para que Kiwix no cargue archivos incompletos (#448). ¡Gracias, @artbird309!
- fix(security): cierra los puntos 3 y 4 pendientes de la auditoría de seguridad (CWE-918, CWE-209) (#552). ¡Gracias, @LuisMIguelFurlanettoSousa!
- fix(ai-chat): agrega una verificación de nulo al nombre del modelo (#645). ¡Gracias, @hestela!
- fix(ai-chat): qwen2.5 se cargaba con cada mensaje del chat (#649). ¡Gracias, @hestela!
- fix(disk-collector): corrige el informe de almacenamiento en montajes NFS (#686). ¡Gracias, @bgauger!
- fix(rag): agrega un botón de inicio en la ventana de la base de conocimiento y asegura que exista la política de reinicio (#700). ¡Gracias, @hestela!
- fix(admin): solo oculta el banner del mapa mundial después de descargarlo (#702). ¡Gracias, @Gujiassh!
- fix(maps): conecta la confirmación de borrado con la API (#732). ¡Gracias, @cuyua9!
- fix: evita que un archivo ZIM dañado haga caer la app y elimina duplicados en los registros de descarga de Ollama (#741). ¡Gracias, @jakeaturner!
- fix(ai): detiene el nomad_ollama local cuando hay un Ollama remoto configurado (#744). ¡Gracias, @chriscrosstalk!
- fix(rag): repara el flujo de incrustación de ZIM (filtro de sincronización, control de lotes, recorrido del DOM) (#745). ¡Gracias, @chriscrosstalk!
- fix(zim): acumula entre páginas de Kiwix para que el Explorador de contenido no quede vacío (#746). ¡Gracias, @chriscrosstalk!
- fix(qdrant): desactiva por defecto la telemetría anónima (#747). ¡Gracias, @chriscrosstalk!
- fix(disk-display): muestra la etiqueta de almacenamiento NAS solo con sistemas de archivos de red (#749). ¡Gracias, @bgauger!
- fix(docker): escribe /app/version.json a partir del build-arg VERSION (#754). ¡Gracias, @chriscrosstalk!
- fix(rag): pasa num_ctx y truncate a la llamada de incrustación de Ollama (#763). ¡Gracias, @chriscrosstalk!
- fix(api): acepta notes, marker_type y position en los endpoints de marcadores (#770). ¡Gracias, @jrsphoto!
- fix(install): avisa claramente en arquitecturas que no son x86_64 antes de descargar imágenes (#797). ¡Gracias, @chriscrosstalk!
- fix(stream): omite la compresión para Server-Sent Events (#798). ¡Gracias, @chriscrosstalk!
- fix(maps): mejoras de uso en el selector de países y actualización automática de los archivos guardados (#817). ¡Gracias, @chriscrosstalk!
- fix(System): corrige solo la marca updateAvailable obsoleta después de una actualización hecha por el sidecar (#825). ¡Gracias, @jakeaturner!
- fix(settings/update): cuatro correcciones de interfaz y uso en la página de Actualización del sistema (#827). ¡Gracias, @chriscrosstalk!
- fix(Maps): envía el nombre del archivo en lugar de la ruta completa al endpoint de borrado (#829). ¡Gracias, @bgauger!
- fix(Maps): muestra las notas en la ventana del marcador cuando las tiene (#830). ¡Gracias, @chriscrosstalk!
- fix(AI): HSA override de AMD según el fabricante y detección de GPU dedicada en el benchmark (#832). ¡Gracias, @chriscrosstalk!
- fix(System): corrige la VRAM de NVIDIA en la tarjeta de la placa de video (#850). ¡Gracias, @bgauger!
- fix(Downloads): trata un Content-Type faltante como octet-stream (#859). ¡Gracias, @bgauger!
- fix(AI): conserva la etiqueta semver en la base de datos al actualizar Ollama para AMD (#868). ¡Gracias, @chriscrosstalk!
- fix(AI): reescribe la consulta de RAG en la primera repregunta del chat (#869). ¡Gracias, @chriscrosstalk!
- fix(RAG): arregla la indexación de ZIM en varios lotes (deduplicación de jobId) (#872). ¡Gracias, @chriscrosstalk!
- fix(RAG): espacia los lotes de continuación cuando la incrustación usa solo CPU (#873). ¡Gracias, @chriscrosstalk!
- fix(queue): QueueService único para frenar la fuga de conexiones de ioredis (#877). ¡Gracias, @chriscrosstalk!
- fix(System): corrige la VRAM de AMD en la tarjeta de la placa de video y refuerza la lectura de registros (#879). ¡Gracias, @chriscrosstalk!
- fix(RAG): informa el progreso de indexación de ZIM respecto del archivo completo (#880). ¡Gracias, @chriscrosstalk!
- fix(KB): agrega las opciones de volver a incrustar y de reiniciar y reconstruir para arreglar incrustaciones rotas (#886). ¡Gracias, @jakeaturner!
- fix(ZIM): conserva los corpus de Wikipedia que conviven al hacer limpieza (#887). ¡Gracias, @chriscrosstalk!
- fix(RAG): ancla el progreso inicial de los lotes de continuación al marco del archivo completo (#889). ¡Gracias, @chriscrosstalk!
- fix(AI): limita de antemano la entrada de incrustación y registra el motivo de la alternativa (#890). ¡Gracias, @chriscrosstalk!
- fix(KB): quita el botón Actualizar redundante de la Cola de procesamiento (#896). ¡Gracias, @chriscrosstalk!
- fix(KB): une la lista de Archivos guardados con las rutas de archivos de la máquina de estados (#898). ¡Gracias, @chriscrosstalk!
- fix(KB): pantalla en blanco al abrir el panel y descripciones emergentes en los botones de acciones en lote (#907). ¡Gracias, @chriscrosstalk!
- fix(KB): orden de hooks de TierSelectionModal y registro de IconLibrary (#917). ¡Gracias, @chriscrosstalk!
- fix(content): muestra el nivel elegido en las tarjetas mientras hay descargas en curso (#918). ¡Gracias, @chriscrosstalk!
- fix(KB): respeta la política de indexación Manual al despachar después de una descarga (#919). ¡Gracias, @chriscrosstalk!
- fix(AI): mejora la validación de la URL de Ollama remoto para evitar una vulnerabilidad SSRF (#920). ¡Gracias, @jakeaturner!
- fix(models): corrige las claves belongsTo invertidas en ChatMessage.session (#921). ¡Gracias, @jakeaturner!

### Mejoras
- docs: agrega la página de Complementos de la comunidad con manuales de campo y packs de W3Schools (#753). ¡Gracias, @chriscrosstalk!
- docs: agrega la referencia de la API de marcadores del mapa (#783). ¡Gracias, @kennethbrewer3!
- docs: exige un issue vinculado para los PR no triviales (#799). ¡Gracias, @chriscrosstalk!
- docs(map): notas actualizadas sobre la API de marcadores del mapa (#803). ¡Gracias, @kennethbrewer3!
- docs: enlaza la nueva guía de instalación en WSL2 desde el README y las preguntas frecuentes (#811). ¡Gracias, @chriscrosstalk!
- build(deps): actualiza picomatch en /admin (#544). ¡Gracias, @dependabot[bot]!
- build(deps): actualiza lodash de 4.17.23 a 4.18.1 en /admin (#643). ¡Gracias, @dependabot[bot]!
- build(deps-dev): actualiza vite de 6.4.1 a 6.4.2 en /admin (#677). ¡Gracias, @dependabot[bot]!
- build(deps): actualiza axios de 1.13.5 a 1.15.0 en /admin (#708). ¡Gracias, @dependabot[bot]!
- build(deps): actualiza @adonisjs/http-server de 7.8.0 a 7.8.1 en /admin (#724). ¡Gracias, @dependabot[bot]!
- build(deps): actualiza follow-redirects de 1.15.11 a 1.16.0 en /admin (#729). ¡Gracias, @dependabot[bot]!
- build(deps): actualiza protocol-buffers-schema de 3.6.0 a 3.6.1 en /admin (#736). ¡Gracias, @dependabot[bot]!
- build(deps): actualiza protobufjs de 7.5.4 a 7.5.5 en /admin (#737). ¡Gracias, @dependabot[bot]!

## Versión 1.31.1 - 21 de abril de 2026

### Funciones
- **Asistente de IA**: Se mejoró la compatibilidad con la aceleración por GPU de AMD para Ollama mediante ROCm y HSA override. ¡Gracias, @chriscrosstalk, por la contribución!
- **Explorador de contenido**: Se agregó la posibilidad de usar fuentes personalizadas de bibliotecas ZIM y espejos precargados, además de la biblioteca predeterminada de Kiwix. ¡Gracias, @chriscrosstalk, por la contribución!
- **Administrador de contenido**: Los tamaños y las descargas de las actualizaciones de contenido ahora se muestran como corresponde en Descargas activas, con barras de progreso y nombres legibles. ¡Gracias, @chriscrosstalk, por la contribución!
- **Mapas**: Ahora se pueden extraer y descargar regiones de mapas desde PMTiles, para que quien solo quiere algunas regiones no tenga que descargar el mapa mundial completo. ¡Gracias, @bgauger, por la contribución!

### Correcciones de errores
- **API**: Ahora se omite la compresión en las respuestas Server-Sent Events (SSE) para evitar problemas con los endpoints de streaming. ¡Gracias, @chriscrosstalk, por la corrección!
- **Mapas**: Se corrigieron errores de lógica al mostrar el banner del mapa mundial. ¡Gracias, @Gujiassh, por la corrección!
- **Mapas**: El archivo de mapa elegido ahora se borra como corresponde después de confirmar la acción en la interfaz. ¡Gracias, @cuyua9, por la corrección!
- **Sistema**: Se corrigió un problema por el que la interfaz podía seguir indicando una actualización pendiente aunque el sistema ya se hubiera actualizado bien. ¡Gracias, @jakeaturner, por la corrección!

### Mejoras
- **Compilación**: La imagen del Centro de mando ahora usa el build arg VERSION para escribir `app/version.json` con la versión actual, lo que facilita el seguimiento de versiones y la depuración, incluso en entornos RC. ¡Gracias, @chriscrosstalk, por la contribución!
- **Administrador de contenido**: Se agregó una columna de tamaño de archivo ordenable a la tabla de archivos ZIM del Administrador de contenido para administrar más fácil el espacio de almacenamiento. ¡Gracias, @chriscrosstalk, por la contribución!
- **Dependencias**: Todas las dependencias de package.json se fijaron en versiones específicas para asegurar la estabilidad y reducir el riesgo de cambios incompatibles inesperados o de ataques a la cadena de suministro desde los paquetes de origen. ¡Gracias, @jakeaturner, por la contribución!
- **Dependencias**: Se actualizaron varias dependencias para cerrar vulnerabilidades de seguridad y mejorar la estabilidad
- **Documentación**: Se actualizó CONTIRBUTING.md para exigir que se abra un issue antes de enviar un PR con cambios no triviales, así los cambios propuestos se discuten y revisan como corresponde. ¡Gracias, @chriscrosstalk, por la contribución!
- **Documentación**: Se agregaron los endpoints de marcadores del mapa a la documentación de referencia de la API. ¡Gracias, @kennethbrewer3, por la contribución!
- **Documentación**: Se agregó un enlace a la nueva guía de instalación en WSL2 en el README y en las preguntas frecuentes. ¡Gracias, @chriscrosstalk, por la contribución!
- **Instalación**: El script de instalación ahora avisa claramente si intentas instalar en una plataforma que no es x86_64/amd64, para evitar instalaciones no compatibles y posibles problemas. ¡Gracias, @chriscrosstalk, por la contribución!
- **Mapas**: Los endpoints de la API de mapas ahora aceptan y validan como corresponde las notas, el tipo de marcador y la posición de los marcadores, y los guardan en la base de datos para mostrarlos en la interfaz. ¡Gracias, @jrsphoto, por la contribución!
- **Mapas**: El visor de mapas ahora puede mostrar las coordenadas actuales del puntero del mouse para facilitar la navegación y la exploración. ¡Gracias, @kennethbrewer3, por la contribución!
- **RAG**: NOMAD ahora pasa como corresponde `num_ctx` y el recorte al endpoint de incrustaciones de Ollama, para aprovechar mejor la ventana de contexto del modelo al generar incrustaciones. ¡Gracias, @chriscrosstalk, por la contribución!
- **RAG**: Se agregó un botón para iniciar Qdrant a mano y un mecanismo que repara solo su política de reinicio, para que la base de datos vectorial funcione bien en las tareas de incrustación y búsqueda. ¡Gracias, @hestela, por la contribución!

## Versión 1.31.1 - 21 de abril de 2026

### Funciones

### Correcciones de errores
- **Asistente de IA**: Las descargas de modelos en curso ahora se pueden cancelar como corresponde, y la interfaz de progreso ahora es igual a la de las descargas de archivos. ¡Gracias, @chriscrosstalk, por la contribución!
- **Asistente de IA**: Se corrigió un problema por el que la página de ajustes del Asistente de IA podía fallar si un objeto de modelo no tenía la propiedad details. ¡Gracias, @hestela, por la corrección!
- **Asistente de IA**: Se corrigió un problema por el que archivos que no se pueden incrustar entraban a la cola de incrustación y llenaban los registros de errores. ¡Gracias, @sbruschke por el reporte del error y @chriscrosstalk por la corrección!
- **Asistente de IA**: Se corrigió un problema en la incrustación de ZIM por lotes que usaba un conteo de lotes equivocado y hacía que se saltearan los lotes restantes. ¡Gracias, @sbruschke por el reporte del error y @chriscrosstalk por la corrección!
- **Asistente de IA**: Se corrigió un problema en la extracción de contenido de ZIM que solo tomaba los hijos de primer nivel del cuerpo del artículo y por eso se perdía mucho contenido. ¡Gracias, @sbruschke por el reporte del error y @chriscrosstalk por la corrección!
- **Recolector de disco**: Se mejoraron el informe de estadísticas de los montajes NFS y cómo se muestran en la interfaz. ¡Gracias, @bgauger y @bravosierra99, por la contribución!
- **Descargas**: Las descargas ahora se guardan primero en archivos .tmp y se renombran de forma atómica al terminar, para evitar problemas con archivos incompletos o dañados. ¡Gracias, @artbird309, por la contribución!
- **Descargas**: Se quitó un listener de errores duplicado y se mejoró la estabilidad al manejar solicitudes Range en las descargas de archivos. ¡Gracias, @jakeaturner, por la contribución!
- **Descargas**: Se mejoró el manejo de descargas de archivos ZIM dañados y se quitaron registros duplicados de descarga de Ollama. ¡Gracias, @aegisman, por la contribución!
- **Seguridad**: Se cerró una posible vulnerabilidad SSRF en la descarga de archivos de mapas con una validación de URL más estricta y bloqueando los rangos de IP privadas. ¡Gracias, @LuisMIguelFurlanettoSousa, por la corrección!
- **Seguridad**: Se depuraron los mensajes de error del backend para evitar una posible filtración de información. ¡Gracias, @LuisMIguelFurlanettoSousa, por la corrección!
- **Interfaz**: Se corrigió un problema con la paginación del Explorador de contenido que podía hacer que algunas personas vieran «No se encontraron registros» indefinidamente. ¡Gracias, @johno10661 por el reporte del error y @chriscrosstalk por la corrección!
- **Interfaz**: Se corrigió un problema por el que todos los dispositivos de almacenamiento podían aparecer como «Almacenamiento NAS» sin importar su tipo real. ¡Gracias, @bgauger, por la corrección!

### Mejoras
- **Asistente de IA**: Ahora usa el modelo que está cargado para reescribir consultas y generar los títulos de los chats, lo que mejora el rendimiento y la coherencia. ¡Gracias, @hestela, por la contribución!
- **Asistente de IA**: Cuando hay una URL de Ollama remoto configurada, el Centro de mando ahora intenta detener el contenedor local de Ollama de NOMAD para liberar recursos y evitar confusiones. ¡Gracias, @chriscrosstalk, por la contribución!
- **Dependencias**: Se actualizaron varias dependencias para cerrar vulnerabilidades de seguridad y mejorar la estabilidad
- **Documentación**: Se agregó una página de «Complementos de la comunidad» a la documentación para destacar algunas de las increíbles contribuciones de la comunidad desde el lanzamiento. ¡Gracias, @chriscrosstalk, por la contribución!
- **Privacidad**: Se agregó la variable de entorno correspondiente para desactivar la telemetría del contenedor de Qdrant. Ten en cuenta que solo tiene efecto en instalaciones nuevas o si se fuerza la reinstalación del contenedor de Qdrant en instalaciones existentes. ¡Gracias, @berkdamerc por el hallazgo y @chriscrosstalk por la contribución!

## Versión 1.31.0 - 3 de abril de 2026

### Funciones
- **Asistente de IA**: Se agregó compatibilidad con equipos remotos compatibles con OpenAI (por ejemplo, Ollama, LM Studio, etc.) para poder ejecutar modelos en un hardware distinto del equipo del Centro de mando. ¡Gracias, @hestela, por la contribución!
- **Asistente de IA**: Se desactivó la compatibilidad con Ollama Cloud (no es compatible con la arquitectura de NOMAD) y se agregó compatibilidad con flash_attn para mejorar el rendimiento de los modelos que lo admiten. ¡Gracias, @hestela, por la contribución!
- **Biblioteca de información (Kiwix)**: El contenedor de Kiwix ahora usa un archivo de biblioteca XML, en lugar de un patrón de archivos, para saber qué archivos ZIM hay disponibles. Esto hace mucho más sólido el manejo de los archivos ZIM y evita que el contenedor no arranque porque hay archivos ZIM incompletos o dañados en la carpeta de almacenamiento. ¡Gracias, @jakeaturner, por la contribución!
- **RAG**: Se agregó la posibilidad de incrustar archivos EPUB en la base de conocimiento. ¡Gracias, @arn6694, por la contribución!
- **RAG**: Se agregó la posibilidad de subir varios archivos a la vez (hasta 5, de 100 MB cada uno) a la base de conocimiento. ¡Gracias, @jakeaturner, por la contribución!
- **Mapas**: Se agregaron marcadores de ubicación personalizables en el mapa, guardados en la base de datos. ¡Gracias, @chriscrosstalk, por la contribución!
- **Mapas**: El archivo del mapa mundial ahora se puede descargar directamente desde PMTiles, para quien quiere el mapa completo o regiones fuera de EE. UU. que todavía no están en las colecciones seleccionadas. ¡Gracias, @bgauger, por la contribución!
- **Mapas**: Se agregó una barra de escala al visor de mapas, con unidades imperiales o métricas. ¡Gracias, @chriscrosstalk, por la contribución!
- **Descargas**: Se agregaron y mejoraron el progreso detallado, los nombres legibles, la cancelación y las actualizaciones de estado en vivo de las descargas activas en la interfaz. ¡Gracias, @chriscrosstalk, por la contribución!
- **Interfaz**: Se convirtieron todas las imágenes PNG a WEBP para reducir su tamaño y mejorar el rendimiento. ¡Gracias, @hestela, por la contribución!
- **Interfaz**: Se agregó una sección de Modelos instalados a los ajustes del Asistente de IA. ¡Gracias, @chriscrosstalk, por la contribución!

### Correcciones de errores
- **Mapas**: Los endpoints de la API de mapas ahora revisan como corresponde «X-Forwarded-Proto», para los casos en que el Centro de mando está detrás de un proxy inverso que termina TLS. ¡Gracias, @davidgross, por la corrección!
- **Mapas**: Se corrigió un problema por el que los endpoints de la API de mapas podían fallar con un error interno si se entraba al Centro de mando con un nombre de equipo en lugar de una dirección IP o localhost. ¡Gracias, @jakeaturner, por la corrección!
- **Cola**: Se aumentó el lockDuration de BullMQ para evitar que los trabajos se corten antes de tiempo en equipos más lentos. ¡Gracias, @bgauger, por la contribución!
- **Cola**: Se mejoró el manejo de las descargas muy grandes y de las cancelaciones hechas por el usuario. ¡Gracias, @bgauger, por la contribución!
- **Instalación**: El script de instalación ahora revisa si está gpg (necesario para instalar el kit de NVIDIA) e intenta instalarlo solo si falta. ¡Gracias, @chriscrosstalk, por la corrección!
- **Seguridad**: Se agregó la validación de claves al endpoint de la API que lee los ajustes. ¡Gracias, @LuisMIguelFurlanettoSousa, por la corrección!
- **Seguridad**: Se mejoró la validación de URL de las descargas de ZIM para evitar vulnerabilidades SSRF. ¡Gracias, @sebastiondev, por la corrección!
- **Interfaz**: Se corrigió la altura del registro de actividad en la Configuración rápida y se agregó desplazamiento automático al último mensaje durante la instalación. ¡Gracias, @chriscrosstalk, por la contribución!

### Mejoras

- **Dependencias**: Se actualizaron varias dependencias para cerrar vulnerabilidades de seguridad y mejorar la estabilidad
- **Docker**: NOMAD ahora agrega las etiquetas 'com.docker.compose.project': 'project-nomad-managed' e 'io.project-nomad.managed': 'true' a todos los contenedores instalados desde el Centro de mando, para mejorar la compatibilidad con otras herramientas de administración de Docker y facilitar identificar y administrar los contenedores de NOMAD. ¡Gracias, @techyogi, por la contribución!
- **Documentación**: Se agregó una referencia sencilla de la API para usuarios avanzados y desarrolladores. ¡Gracias, @hestela, por la contribución!
- **Documentación**: El comando de instalación rápida del README ahora ocupa varias líneas para que se lea mejor. ¡Gracias, @samsara-02, por la contribución!
- **Documentación**: Se actualizaron las guías CONTRIBUTING y de preguntas frecuentes con la información más reciente y se aclararon algunas dudas comunes. ¡Gracias, @jakeaturner, por la contribución!
- **Operaciones**: Se actualizaron las GitHub Actions a sus últimas versiones. ¡Gracias, @salmanmkc, por la contribución!
- **Rendimiento**: Se redujo bastante el tamaño del paquete de la interfaz del Centro de mando optimizando dependencias y con tree-shaking, lo que da tiempos de carga más rápidos y una experiencia más ágil. ¡Gracias, @jakeaturner, por la contribución!
- **Rendimiento**: Se activó por defecto la compresión gzip en todas las rutas HTTP registradas del backend del Centro de mando para mejorar aún más el rendimiento, sobre todo en conexiones lentas. Si hace falta, se puede apagar con la variable de entorno DISABLE_COMPRESSION. ¡Gracias, @jakeaturner, por la contribución!
- **Rendimiento**: Se agregó un caché liviano para algunas interacciones con el socket de Docker y para el nombre personalizado del Asistente de IA, para mejorar el rendimiento y evitar llamadas redundantes a la API de Docker. ¡Gracias, @jakeaturner, por la contribución!
- **Rendimiento**: Se pasó a la navegación con el router de Inertia donde corresponde, para aprovechar su caché y sus optimizaciones y lograr una experiencia más fluida. ¡Gracias, @jakeaturner, por la contribución!

## Versión 1.30.3 - 25 de marzo de 2026

### Funciones

### Correcciones de errores
- **Benchmark**: Se corrigió un problema por el que las puntuaciones de CPU y escritura en disco podían mostrarse en 0 si el valor medido era menos de la mitad de la marca de referencia. ¡Gracias, @bortlesboat, por la corrección!
- **Administrador de contenido**: Se corrigió un método faltante del cliente de la API que hacía fallar el borrado de archivos ZIM. ¡Gracias, @LuisMIguelFurlanettoSousa, por la corrección!
- **Instalación**: Se corrigió un problema por el que el script de instalación podía informar por error que faltaba el runtime de NVIDIA para Docker. ¡Gracias, @brenex, por la corrección!
- **Apoya el proyecto**: Se corrigió un enlace roto a Rogue Support. ¡Gracias, @chriscrosstalk, por la corrección!

### Mejoras
- **Asistente de IA**: Se mejoraron el informe y el manejo de errores en las descargas de modelos. ¡Gracias, @chriscrosstalk, por la contribución!
- **Asistente de IA**: Se actualizó la versión predeterminada de Ollama a v0.18.1 para aprovechar las últimas mejoras de rendimiento y correcciones de errores.
- **Apps**: Se mejoraron el informe y el manejo de errores cuando falla la instalación de un servicio. ¡Gracias, @trek-e, por la contribución!
- **Colecciones**: Se actualizaron varios enlaces de las colecciones seleccionadas a sus últimas versiones. ¡Gracias, @builder555, por la contribución!
- **CyberChef**: Se actualizó la versión predeterminada de CyberChef a v10.22.1 para aprovechar las últimas funciones y correcciones de errores.
- **Documentación**: Se agregó un enlace a la guía de instalación paso a paso y al video tutorial. ¡Gracias, @chriscrosstalk, por la contribución!
- **Instalación**: Se aumentó el límite de reintentos del servicio MySQL en Docker Compose para mejorar la estabilidad al instalar en equipos más lentos. ¡Gracias, @dx4956, por la contribución!
- **Instalación**: Se corrigió un problema por el que datos viejos podían provocar credenciales que no coincidían en MySQL al reinstalar. ¡Gracias, @chriscrosstalk, por la corrección!

## Versión 1.30.0 - 20 de marzo de 2026

### Funciones
- **Operaciones nocturnas**: Llegó la función más pedida: ¡un tema de modo oscuro para la interfaz del Centro de mando! Actívalo desde el pie de página y disfruta del nuevo aspecto en tus misiones nocturnas. ¡Gracias, @chriscrosstalk, por la contribución!
- **Información de depuración**: Se agregó una nueva ventana de «Información de depuración», disponible desde el pie de página, con información detallada del sistema y de la aplicación para resolver problemas y pedir ayuda. ¡Gracias, @chriscrosstalk, por la contribución!
- **Apoya el proyecto**: Se agregó una nueva página «Apoya el proyecto» en los ajustes, con enlaces a recursos de la comunidad, opciones para donar y formas de contribuir.
- **Instalación**: La imagen principal de NOMAD ahora es totalmente autónoma y se puede usar directamente con Docker Compose, lo que permite instalaciones más flexibles y personalizables sin depender de scripts externos. La imagen sigue siendo compatible con las instalaciones existentes, y el script de instalación se actualizó para reflejar el proceso de despliegue más simple.

### Correcciones de errores
- **Ajustes**: La vista de uso de almacenamiento ahora prefiere los dispositivos de bloque reales sobre tempfs. ¡Gracias, @Bortlesboat, por la corrección!
- **Ajustes**: Se corrigió un problema por el que la lógica para emparejar dispositivos y eliminar entradas de montaje duplicadas podía mostrar un uso de almacenamiento incorrecto o dejar dispositivos sin mostrar.
- **Mapas**: La página de Mapas ahora respeta el protocolo de la solicitud (http o https) para que los mosaicos del mapa carguen bien. ¡Gracias, @davidgross, por el reporte del error!
- **Base de conocimiento**: Se corrigió un problema por el que los trabajos de incrustación de archivos podían provocar una tormenta de reintentos si el servicio de Ollama no estaba disponible. ¡Gracias, @skyam25, por el reporte del error!
- **Colecciones seleccionadas**: Se corrigieron algunos enlaces rotos en las definiciones de colecciones seleccionadas (mapas y archivos ZIM) que hacían fallar la descarga de algunos recursos.
- **Configuración rápida**: Se corrigió un problema por el que la insignia «Empieza aquí» seguía apareciendo después de visitar por primera vez el asistente de Configuración rápida. ¡Gracias, @chriscrosstalk, por la corrección!
- **Interfaz**: Se corrigió un problema por el que el indicador de carga podía verse raro en algunos casos.
- **Actualizaciones del sistema**: Se corrigió un problema por el que el banner de actualización seguía apareciendo después de que el sistema se actualizó bien. ¡Gracias, @chriscrosstalk, por la corrección!
- **Rendimiento**: Varias correcciones de pequeñas fugas de memoria y mejoras de rendimiento en toda la interfaz para una experiencia más fluida.

### Mejoras
- **Ollama**: Se mejoró la detección de la GPU para que siempre se pase la configuración de GPU más reciente al contenedor de Ollama al actualizar
- **Ollama**: El tipo de GPU detectado ahora se guarda en la base de datos para una configuración y una resolución de problemas más confiables entre actualizaciones y reinicios. ¡Gracias, @chriscrosstalk, por la contribución!
- **Descargas**: Ahora puedes descartar las notificaciones de descargas fallidas para despejar la interfaz. ¡Gracias, @chriscrosstalk, por la contribución!
- **Registros**: Se cambió el nivel de registro predeterminado a «info» para reducir el ruido y concentrarse en los mensajes importantes. ¡Gracias, @traxeon, por la sugerencia!
- **Registros**: El registrador interno de NOMAD ahora crea su propia carpeta de registros al arrancar si no existe, para evitar errores en instalaciones nuevas donde todavía no se creó.
- **Dozzle**: El acceso a la terminal y las acciones sobre contenedores de Dozzle ahora vienen desactivados por defecto. ¡Gracias, @traxeon, por la recomendación!
- **MySQL y Redis**: Por defecto ya no se exponen puertos al equipo, para mejorar la seguridad. Si hace falta, se pueden exponer a mano. ¡Gracias, @traxeon, por la recomendación!
- **Dependencias**: Varias actualizaciones de dependencias para cerrar vulnerabilidades de seguridad y mejorar la estabilidad
- **Scripts auxiliares**: Se agregó en todos los scripts auxiliares una verificación de la versión esperada de Docker Compose (v2), para dar mensajes de error e indicaciones más claras si el entorno no está bien configurado.
- **Scripts auxiliares**: Se agregó otra advertencia al script de instalación sobre la posibilidad de sobrescribir configuraciones personalizadas existentes y la importancia de hacer una copia de seguridad antes de volver a ejecutarlo.
- **Documentación**: Se actualizaron las instrucciones de instalación con la nueva opción de despliegue manual con Docker Compose, sin el script de instalación.


## Versión 1.29.0 - 11 de marzo de 2026

### Funciones
- **Asistente de IA**: Se mejoraron las indicaciones para resolver problemas de passthrough de la GPU
- **Asistente de IA**: Ahora se elige automáticamente el último modelo usado al empezar un chat nuevo
- **Ajustes**: NOMAD ahora busca todas las noches actualizaciones de las apps, y puedes elegir y aplicar las actualizaciones desde la página de Apps en los Ajustes

### Correcciones de errores
- **Ajustes**: Se corrigió un problema por el que la página de ajustes del Asistente de IA aparecía en la navegación aunque el Asistente de IA no estuviera instalado, lo que daba errores 404 al hacer clic
- **Seguridad**: Mitigaciones de path traversal y SSRF
- **Asistente de IA**: Se corrigió un problema que hacía fallar de vez en cuando el guardado de los títulos de los chats

### Mejoras
- **Asistente de IA**: Grandes mejoras de rendimiento y mejor inteligencia y uso del contexto en RAG

## Versión 1.28.0 - 5 de marzo de 2026

### Funciones
- **RAG**: Se agregó la posibilidad de ver los trabajos de incrustación activos en la cola de procesamiento y se mejoró el seguimiento del progreso con estados más detallados
- **RAG**: Se agregó la posibilidad de quitar documentos de la base de conocimiento (se borran de Qdrant y del almacenamiento local)

### Correcciones de errores
- **Instalación**: Se corrigieron URL rotas en el script de instalación y ahora pide aceptar la licencia Apache 2.0
- **Documentación**: Se actualizaron los avisos legales para reflejar la licencia Apache 2.0 y se agregó la atribución de Qdrant
- **Dependencias**: Varias actualizaciones menores de dependencias para cerrar vulnerabilidades de seguridad

### Mejoras
- **Licencia**: Se agregó el archivo de la licencia Apache 2.0 al repositorio, por claridad y cumplimiento legal

## Versión 1.27.0 - 4 de marzo de 2026

### Funciones
- **Ajustes**: Se agregó paginación a la lista de modelos de Ollama
- **Canal de acceso anticipado**: Permite elegir recibir versiones de acceso anticipado con las últimas funciones y mejoras antes de que lleguen a las versiones estables

### Correcciones de errores

### Mejoras
- **Asistente de IA**: Se mejoró el rendimiento del chat optimizando la reescritura de consultas y la transmisión de respuestas
- **CI/CD**: Se actualizaron los flujos de publicación para admitir versiones candidatas (RC)
- **Almacén KV**: Se mejoró la seguridad de tipos en la implementación del almacén KV

## Versión 1.26.0 - 19 de febrero de 2026

### Funciones
- **Asistente de IA**: Se agregó la posibilidad de mostrar en vivo el razonamiento de los modelos que piensan antes de responder
- **Asistente de IA**: Se agregó la transmisión de respuestas en vivo para una mejor experiencia

### Correcciones de errores

### Mejoras


## Versión 1.25.2 - 18 de febrero de 2026

### Funciones

### Correcciones de errores
- **Asistente de IA**: Se corrigió un error de las sugerencias del chat cuando no hay modelos de Ollama instalados
- **Asistente de IA**: Se mejoró la detección de GPU dedicadas
- **Interfaz**: Los enlaces viejos a /docs y /knowledge-base ahora redirigen a las páginas correctas en lugar de mostrar errores 404

### Mejoras
- **Asistente de IA**: Las sugerencias del chat ahora vienen desactivadas por defecto para no sobrecargar los equipos más chicos

## Versión 1.25.1 - 12 de febrero de 2026

### Funciones

### Correcciones de errores
- **Ajustes**: Corrige un posible problema de caché desactualizado al buscar actualizaciones del sistema
- **Ajustes**: Mejora las indicaciones durante las actualizaciones del sistema

### Mejoras


## Versión 1.25.0 - 12 de febrero de 2026

### Funciones
- **Colecciones**: Rediseño completo de la administración de colecciones con manifiestos dinámicos, registro en la base de datos de los recursos instalados y una interfaz mejorada para administrar archivos ZIM y mapas
- **Colecciones**: Se agregó la posibilidad de saber si hay versiones más nuevas de los recursos instalados a partir de los manifiestos
### Correcciones de errores
- **Benchmark**: Se mejoraron el manejo de errores y la propagación de códigos de estado para avisar mejor cuando falla un envío
- **Benchmark**: Corrige una condición de carrera en la administración del contenedor de sysbench que podía hacer fallar las pruebas del benchmark

### Mejoras

---

## Versión 1.24.0 - 10 de febrero de 2026

### 🚀 Funciones

- **Asistente de IA**: Reescritura de consultas para recuperar mejor el contexto
- **Asistente de IA**: Permite escanear y volver a sincronizar a mano la base de conocimiento
- **Asistente de IA**: La interfaz de la base de conocimiento ahora está integrada en la página del Asistente de IA
- **Asistente de IA**: Incrustación del contenido de los ZIM en la base de conocimiento
- **Descargas**: Muestra el progreso de descarga de los modelos
- **Sistema**: Tarea programada para buscar actualizaciones automáticamente
- **Documentación**: Presentación más pulida de la documentación con componentes de temática desértica

### 🐛 Correcciones de errores

- **Asistente de IA**: Mejoras de rendimiento en las sugerencias del chat
- **Asistente de IA**: Muestra el código en línea con formato
- **GPU**: Detecta las GPU NVIDIA mediante la API de Docker en lugar de lspci
- **Instalación**: Mejora la configuración de GPU en Docker
- **Sistema**: Corrige el cálculo del porcentaje de uso de memoria
- **Sistema**: Muestra el sistema operativo, el nombre y la GPU del equipo en lugar de la información del contenedor
- **Colecciones**: Corrige los nombres de archivo de los ZIM de devdocs en Computación y tecnología
- **Descargas**: Ordena las descargas activas por progreso, de mayor a menor
- **Documentación**: Corrige varios enlaces internos rotos y referencias a rutas

### ✨ Mejoras

- **Documentación**: Rediseño de la documentación integrada, con orden en la barra lateral
- **Documentación**: Se actualizó el README con un resumen de las funciones
- **GPU**: Utilidad reutilizable para ejecutar nvidia-smi

---

## Versión 1.23.0 - 5 de febrero de 2026

### 🚀 Funciones

- **Mapas**: Los mapas ahora ocupan toda la página por defecto
- **Navegación**: Se agregó un enlace «Volver al inicio» en las páginas con encabezado estándar
- **IA**: Búsqueda aproximada en la lista de modelos de IA
- **Interfaz**: Mejor informe global de errores, con notificaciones para el usuario

### 🐛 Correcciones de errores

- **Kiwix**: Evita reiniciar el contenedor de Kiwix mientras hay trabajos de descarga en curso
- **Docker**: Asegura que los contenedores se borren por completo cuando falla la instalación de un servicio
- **IA**: Filtra los modelos en la nube de la respuesta de la API y de la lista de modelos alternativa
- **Colecciones seleccionadas**: Evita recursos duplicados al traer las colecciones más recientes
- **Niveles de contenido**: Rediseño del sistema de niveles para que el servidor determine de forma dinámica qué está instalado

### ✨ Mejoras

- **Documentación**: Se agregó una presentación más linda para las tablas de markdown en las páginas de documentación

---

## Versión 1.22.0 - 4 de febrero de 2026

### 🚀 Funciones

- **Administrador de contenido**: Muestra nombres legibles (título y resumen) en lugar de los nombres de archivo de los ZIM
- **Base de conocimiento de la IA**: Agrega automáticamente la documentación de NOMAD a la base de conocimiento de la IA al instalar

### 🐛 Correcciones de errores

- **Mapas**: Asegura que las URL de los recursos de mapas se resuelvan bien cuando se entra con un nombre de equipo
- **Wikipedia**: Evita la capa del indicador de carga durante las descargas
- **Configuración rápida**: Vuelve al principio de la página al pasar de un paso a otro del asistente
- **Chat de IA**: Oculta el botón y la página del chat salvo que el Asistente de IA esté instalado de verdad
- **Ajustes**: Cambia el nombre de la confusa columna «Puerto» a «Ubicación» en los ajustes de Apps

### ✨ Mejoras

- **Ollama**: Limpieza de la lógica de descarga de modelos y mejor seguimiento del progreso

---

## Versión 1.21.0 - 2 de febrero de 2026

### 🚀 Funciones

- **Asistente de IA**: Interfaz de chat con IA integrada: ya no hace falta la app aparte Open WebUI
- **Base de conocimiento**: Subida de documentos con OCR, búsqueda semántica (RAG) y respuestas de la IA con contexto mediante Qdrant
- **Selector de Wikipedia**: Administración dedicada del contenido de Wikipedia con selección inteligente de paquetes
- **Compatibilidad con GPU**: Passthrough de GPU NVIDIA y AMD para Ollama (inferencia de IA más rápida)

### 🐛 Correcciones de errores

- **Benchmark**: Detecta Intel Arc Graphics en los procesadores Core Ultra
- **Configuración rápida**: Se quitó el benchmark del sistema integrado del asistente (ahora está en Ajustes)
- **Íconos**: Se pasó a Tabler Icons por coherencia y se quitaron las bibliotecas de íconos que no se usaban
- **Docker**: Evita volver a descargar imágenes que ya existen durante la instalación

### ✨ Mejoras

- **Ollama**: Lista alternativa de modelos recomendados si api.projectnomad.us no responde
- **Ollama/Qdrant**: Imágenes de Docker fijadas en versiones específicas para mayor estabilidad
- **README**: Se agregaron enlaces al sitio web y a la comunidad
- Se quitó Open WebUI como app instalable aparte (la reemplaza el chat de IA integrado)

---

## Versión 1.20.0 - 28 de enero de 2026

### 🚀 Funciones

- **Colecciones**: Categorías seleccionadas ampliadas con más contenido y mejor uso de la ventana para elegir el nivel
- **Legal**: Avisos legales ampliados y movidos al final de la barra lateral de Ajustes

### 🐛 Correcciones de errores

- **Instalación**: Maneja la falta de curl en instalaciones nuevas de Ubuntu
- **Migraciones**: Corrige el orden de las marcas de tiempo en la migración de builder_tag

---

## Versión 1.19.0 - 28 de enero de 2026

### 🚀 Funciones

- **Benchmark**: Sistema de etiquetas de constructor: reserva tu lugar en la tabla de la comunidad con etiquetas temáticas de NOMAD (por ejemplo, «Tactical-Llama-1234»)
- **Benchmark**: Ahora hace falta el benchmark completo con IA para compartir con la comunidad; los envíos van firmados con HMAC
- **Notas de la versión**: Suscríbete a las notas de la versión por correo electrónico
- **Mapas**: Descarga automáticamente los recursos del mapa base si faltan

### 🐛 Correcciones de errores

- **Información del sistema**: Recurre a fsSize cuando la lista de discos está vacía (corrige «No se detectaron dispositivos de almacenamiento»)

---

## Versión 1.18.0 - 24 de enero de 2026

### 🚀 Funciones

- **Colecciones**: Mejor uso de las colecciones seleccionadas, con el nivel elegido que se recuerda y un flujo de enviar y confirmar

### 🐛 Correcciones de errores

- **Benchmark**: Corrige la conectividad del benchmark de IA (el contenedor de Docker no llegaba a Ollama en el equipo)
- **Open WebUI**: Corrige el indicador de estado de instalación

### ✨ Mejoras

- **Docker**: Utilidad para resolver las URL de los contenedores y mejoras de red

---

## Versión 1.17.0 - 23 de enero de 2026

### 🚀 Funciones

- **Benchmark del sistema**: Puntuación del hardware con la puntuación NOMAD, indicadores circulares y envío a la tabla de la comunidad
- **Panel**: Nombres de apps fáciles de entender, con la atribución de código abierto «Funciona con»
- **Ajustes**: Nomenclatura actualizada y colecciones de contenido por niveles en las páginas de Ajustes
- **Colas**: Permite procesar todas las colas con un solo comando

### 🐛 Correcciones de errores

- **Configuración rápida**: Elige un disco principal válido para la barra de proyección de almacenamiento
- **Documentación**: Quita enlaces rotos a servicios que apuntaban a rutas inválidas
- **Notificaciones**: Estilos mejorados
- **Interfaz**: Se quitó la pantalla de bienvenida
- **Mapas**: Corrección en la resolución de rutas estáticas

---

## Versión 1.16.0 - 20 de enero de 2026

### 🚀 Funciones

- **Apps**: Opción para forzar la reinstalación de las aplicaciones instaladas
- **Open WebUI**: Administra los modelos de Ollama directamente desde el Centro de mando
- **Configuración rápida**: Muestra el tamaño del modelo de IA elegido en la barra de proyección de almacenamiento

### ✨ Mejoras

- **Categorías seleccionadas**: Mejoras al traer datos desde GitHub
- **Compilación**: Se agregó el archivo dockerignore

---

## Versión 1.15.0 - 19 de enero de 2026

### 🚀 Funciones

- **Asistente de Configuración rápida**: Paso 1 rediseñado con tarjetas de capacidades fáciles de entender en lugar de nombres de apps
- **Colecciones por niveles**: Colecciones de contenido por categoría con los niveles Essential, Standard y Comprehensive
- **Barra de proyección de almacenamiento**: Indicador visual de uso de disco que muestra lo que se va a agregar durante la Configuración rápida
- **Compatibilidad con Windows**: Compatibilidad con Docker Desktop para desarrollo local, con detección de plataforma y la variable de entorno NOMAD_STORAGE_PATH
- **Documentación**: Documentación integrada completa (Inicio, Primeros pasos, Preguntas frecuentes, Casos de uso)

### ✨ Mejoras

- **Configuración rápida**: La etiqueta del paso 3 pasó de «Archivos ZIM» a «Contenido»
- **Notificaciones**: Corrige el cierre automático que no funcionaba por una clausura desactualizada
- Se agregaron las categorías de contenido Supervivencia y preparación, y Educación y referencia

---

## Versión 1.14.0 - 16 de enero de 2026

### 🚀 Funciones

- **Colecciones**: Trae automáticamente desde GitHub las colecciones seleccionadas más recientes

### 🐛 Correcciones de errores

- **Docker**: Mejor manejo del estado de los contenedores

---

## Versión 1.13.0 - 15 de enero de 2026

### 🚀 Funciones

- **Asistente de Configuración rápida**: Primera versión de la configuración guiada para el primer uso
- **Mapas**: Avisos mejorados cuando faltan recursos
- **Apps**: Tarjetas de apps mejoradas con íconos propios

### 🐛 Correcciones de errores

- **Colecciones seleccionadas**: Ajustes de interfaz
- **Instalación**: Se cambió el pull_policy del contenedor de admin a always

---

## Versiones 1.12.0 - 1.12.3 - 24 de diciembre de 2025 - 13 de enero de 2026

### 🚀 Funciones

- **Sistema**: Verifica la conexión a internet desde el backend, con la posibilidad de usar una URL de prueba personalizada

### 🐛 Correcciones de errores

- **Admin**: Mejor manejo del estado de instalación de los servicios
- **Admin**: Mejor manejo de las solicitudes de instalación duplicadas
- **Admin**: Se corrigió la URL de descarga de los recursos del mapa base
- **Admin**: Se corrigió la asignación de puertos de Open WebUI
- **Admin**: Indicadores de uso de memoria mejorados
- **Admin**: Se agregaron favicons
- **Admin**: Se corrigió el healthcheck del contenedor
- **Admin**: Se corrigió el método faltante del cliente de la API para descargar ZIM
- **Instalación**: Se corrigieron el montaje del archivo de información de disco y su estabilidad
- **Instalación**: Asegura que el script de actualización siempre traiga las imágenes más recientes
- **Instalación**: Usa el comando moderno docker compose en el script de actualización
- **Instalación**: Asegura que el script de actualización sea ejecutable
- **Scripts**: Borra el archivo de información de disco al desinstalar

---

## Versiones 1.11.0 - 1.11.1 - 24 de diciembre de 2025

### 🚀 Funciones

- **Mapas**: Colecciones seleccionadas de regiones de mapas
- **Colecciones**: Definiciones de las colecciones de regiones de mapas

### 🐛 Correcciones de errores

- **Mapas**: Se corrigieron las descargas de archivos pmtiles personalizados
- **Documentación**: Correcciones en el visor de documentación

---

## Versión 1.10.1 - 5 de diciembre de 2025

### ✨ Mejoras
- **Kiwix**: Mejoras en la ruta de almacenamiento de los ZIM

---

## Versión 1.10.0 - 5 de diciembre de 2025

### 🚀 Funciones

- Monitoreo de la información de disco

### ✨ Mejoras

- **Instalación**: Agrega las variables de entorno de Redis al archivo compose
- **Kiwix**: Descarga y configuración inicial

---

## Versión 1.9.0 - 5 de diciembre de 2025

### 🚀 Funciones

- Administración de trabajos en segundo plano con BullMQ

### ✨ Mejoras

- **Instalación**: Escape de caracteres en las variables de entorno
- **Instalación**: Variable de entorno del equipo

---

## Versión 1.8.0 - 5 de diciembre de 2025

### 🚀 Funciones

- Rediseño de los estilos de alertas y botones
- Rediseño de la página de información del sistema
- **Colecciones**: Colecciones seleccionadas de ZIM con slug, ícono e idioma
- Descargas de mapas y archivos ZIM personalizados (en desarrollo)
- Nuevo sistema de mapas (en desarrollo)

### ✨ Mejoras

- **DockerService**: Limpieza de lo viejo de OSM
- **Instalación**: Nombres de archivos compose unificados

---

## Versión 1.7.0 - 5 de diciembre de 2025

### 🚀 Funciones

- Rediseño de los estilos de alertas y botones
- Rediseño de la página de información del sistema
- **Colecciones**: Colecciones seleccionadas de ZIM
- Descargas de mapas y archivos ZIM personalizados (en desarrollo)
- Nuevo sistema de mapas (en desarrollo)

### ✨ Mejoras

- **DockerService**: Limpieza de lo viejo de OSM
- **Instalación**: Nombres de archivos compose unificados

---

## Versión 1.6.0 - 18 de noviembre de 2025

### 🚀 Funciones

- Se agregó Kolibri a la biblioteca estándar de apps

### ✨ Mejoras

- Nombres de contenedores unificados en management-compose

---

## Versión 1.5.0 - 18 de noviembre de 2025

### 🚀 Funciones

- Pie de página con la versión y corrección del manejo de versiones en CI

---

## Versión 1.4.0 - 18 de noviembre de 2025

### 🚀 Funciones

- **Servicios**: Nombres y descripciones fáciles de entender

### ✨ Mejoras

- **Scripts**: Mejoras al crear la carpeta de registros
- **Scripts**: Corrige una errata en la ruta del archivo management-compose

---

## Versión 1.3.0 - 9 de octubre de 2025

### 🚀 Funciones nuevas

- El script de desinstalación ahora quita los contenedores de apps de NOMAD que no son de administración

### ✨ Mejoras

- **OpenStreetMap**: Aplica de forma más sólida las correcciones de permisos de carpetas

---

## Versión 1.2.0 - 7 de octubre de 2025

### 🚀 Funciones nuevas

- Se agregó CyberChef a la biblioteca estándar de apps
- Se agregó Dozzle a los contenedores principales para tener mejores registros y métricas
- Se agregó FlatNotes a la biblioteca estándar de apps
- Script auxiliar de desinstalación disponible

### ✨ Mejoras

- **OpenStreetMap**:
    - Se corrigieron rutas de carpetas y problemas de acceso
    - Mejor manejo de errores
    - Se corrigieron los permisos de los archivos del visor
    - Se corrigió un problema con rutas absolutas del equipo
- **Administrador de ZIM**:
    - La descarga inicial del ZIM ahora está alojada en el repositorio de GitHub de Project NOMAD para que esté más disponible

---

## Versión 1.1.0 - 20 de agosto de 2025

### 🚀 Funciones nuevas

**Instalación de OpenStreetMap**
- Se agregó OpenStreetMap a las aplicaciones instalables
- Descarga e importa automáticamente la región del Pacífico de EE. UU. durante la instalación.
- Admite caché de mosaicos renderizados para un mejor rendimiento.

### ✨ Mejoras

- **Apps**: Se agregaron controles para iniciar, detener y reiniciar el contenedor de cada aplicación en los ajustes
- **Administrador de ZIM**: Manejo de errores y descargas que se pueden retomar, más una interfaz mejorada
- **Sistema**: Ahora puedes ver información del sistema, como CPU, RAM y estadísticas de disco, en los ajustes
- **Legal**: Se agregaron los avisos legales en los ajustes
- **Interfaz**: Se agregaron mejoras generales de interfaz, como alertas y diálogos de error
- Nombres de contenedores unificados para reducir posibles conflictos con contenedores que ya existen en el equipo

### ⚠️ Cambios incompatibles

- **Nombres de contenedores**: Como resultado del cambio en los nombres de los contenedores, se recomienda hacer una instalación nueva de Project NOMAD y de las apps para evitar posibles conflictos o contenedores duplicados

### 📚 Documentación

- Se agregó la página de notas de la versión

---

## Versión 1.0.1 - 11 de julio de 2025

### 🐛 Correcciones de errores

- **Documentación**: Se corrigió la visualización de la documentación
- **Instalación**: Se corrigieron las URL del script de instalación
- **OpenWebUI**: Se corrigió la conexión con Ollama

---

## Versión 1.0.0 - 11 de julio de 2025

### 🚀 Funciones nuevas

- Primera versión alfa para la instalación de apps y la documentación
- Instalación de OpenWebUI, Ollama y Kiwix
- Descarga y administración de ZIM

---

## Soporte

- **Discord:** [Únete a la comunidad](https://discord.com/invite/crosstalksolutions): pide ayuda, comparte tus equipos y conecta con otras personas que usan NOMAD
- **Reportes de errores:** [Issues de GitHub](https://github.com/Crosstalk-Solutions/project-nomad/issues)
- **Sitio web:** [www.projectnomad.us](https://www.projectnomad.us)

---

*Para ver el historial completo de cambios, consulta nuestras [versiones en GitHub](https://github.com/Crosstalk-Solutions/project-nomad/releases).*
