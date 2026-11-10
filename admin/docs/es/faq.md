# Preguntas frecuentes

## Preguntas generales

### ¿Qué es NOMAD?
NOMAD es un servidor personal que te da acceso a conocimiento, educación y asistencia de IA sin necesidad de conexión a internet. Funciona en tu propio equipo, así que tus datos quedan en privado y disponibles en todo momento.

### ¿Necesito internet para usar NOMAD?
No: de eso se trata. Una vez descargado tu contenido, todo funciona sin conexión. Solo necesitas internet para:
- Descargar contenido nuevo
- Actualizar el software
- Sincronizar las últimas versiones de Wikipedia, los mapas, etc.

### ¿Qué sistema operativo necesita NOMAD?
Linux basado en Debian. **Ubuntu 26.04 LTS es el que recomendamos y con el que probamos** las instalaciones nuevas.

Ubuntu 24.04 LTS y Debian 12 también son compatibles, así que no hace falta reinstalar si ya usas alguno de ellos. Si usas Windows, puedes seguir la [guía de WSL2](https://www.projectnomad.us/install/wsl2) (en inglés), con soporte de la comunidad.

macOS y las distribuciones que no son Debian, como Fedora o Arch, no tienen soporte oficial. NOMAD no necesita entorno de escritorio, así que Ubuntu Server es una buena opción si te manejas con la terminal.

Para un recorrido completo, incluida la instalación de Ubuntu, consulta la [guía de instalación](https://www.projectnomad.us/install) (en inglés).

### ¿Qué equipo necesito?
NOMAD está pensado para equipos con buena capacidad, sobre todo si quieres usar las funciones de IA. Recomendado:
- Procesador moderno de varios núcleos (un AMD Ryzen 7 con gráficos Radeon es el punto ideal según la comunidad)
- 16 GB de RAM o más (32 GB o más para el mejor rendimiento de la IA)
- Almacenamiento SSD (el tamaño depende del contenido: 500 GB como mínimo, 1 TB o más recomendado)
- GPU NVIDIA o AMD recomendada para respuestas de IA más rápidas

**Para ver recomendaciones de armado detalladas en tres rangos de precio (de USD 150 a más de USD 1000), consulta la [guía de hardware](https://www.projectnomad.us/hardware) (en inglés).**

### ¿Cuánta RAM necesito?

**Sin el Asistente de IA, todo el conjunto ocupa menos de 1 GB.** Medido en una
instalación en funcionamiento: el Centro de mando 241 MB, MySQL 444 MB, Redis 9 MB, Kiwix 101 MB y el
índice de la base de conocimiento 155 MB. Por eso 4 GB es un mínimo real y no uno
puesto por precaución.

**La IA es lo que varía, y depende del modelo, no de NOMAD.** Ollama en reposo usa
alrededor de 1,2 GB, y un modelo necesita en memoria más o menos lo que pesa su descarga mientras responde,
así que un modelo de 8B de ~4,6 GB pide más o menos eso adicional. **8 GB alcanzan para un modelo
chico, 16 GB son cómodos y 32 GB es lo recomendado si quieres usar modelos
más grandes.**

De dónde sale esa memoria depende de tu equipo. Con una GPU dedicada, el modelo
se carga en la VRAM y no toca la RAM del sistema, así que la VRAM es lo que limita qué
modelos puedes usar. Con una GPU integrada o sin GPU, sale de la RAM
del sistema, y por eso un equipo que solo usa el procesador necesita más.

### ¿Cuánto espacio en disco necesito?

**Para instalar NOMAD en sí: unos 5 GB, así que deja 10 GB libres.** Eso cubre el
Centro de mando y su base de datos, antes de agregar contenido. Sumar el Asistente de IA
lleva el total a unos 25 GB, porque Ollama y un modelo de uso general
ocupan bastante.

Después depende por completo de lo que descargues:
- Wikipedia completa (en inglés): ~95 GB
- Cursos de Khan Academy: ~50 GB
- Referencias médicas: ~500 MB
- Mapas de estados de EE. UU.: ~2-3 GB cada uno
- Modelos de IA: entre 10 y 40 GB según el modelo

Empieza por lo esencial y agrega más cuando lo necesites.

---

## Preguntas sobre el contenido

### ¿Cómo agrego más contenido de Wikipedia?
1. Ve a **Ajustes** (menú → Ajustes)
2. Haz clic en **Explorador de contenido**
3. Explora los paquetes de Wikipedia disponibles
4. Haz clic en Descargar en los que quieras

También puedes usar el **Explorador de contenido** para ver todo el contenido ZIM disponible además de Wikipedia, incluido el que está en español.

### ¿Cómo agrego más cursos educativos?
1. Abre **Kolibri**
2. Inicia sesión como administrador
3. Ve a **Dispositivo → Canales**
4. Explora e importa los canales disponibles

### ¿Qué tan actualizado está el contenido?
El contenido está tan actualizado como la última vez que lo descargaste. Las copias de Wikipedia suelen actualizarse cada mes. Revisa los nombres de archivo o las descripciones para ver las fechas.

### ¿Puedo agregar mis propios archivos?
Sí, con la base de conocimiento. Sube PDF, archivos de texto y otros documentos a la [base de conocimiento](/knowledge-base) y la IA podrá consultarlos al responder tus preguntas. Usa búsqueda semántica para encontrar la información relevante en tus archivos.

Para el contenido de Kiwix, NOMAD usa archivos ZIM estándar. Para el contenido educativo, Kolibri usa su propio formato de canales.

### ¿Qué son los niveles de las colecciones seleccionadas?
Cuando eliges contenido en el asistente de Configuración rápida o en el Explorador de contenido, las colecciones se organizan en tres niveles:
- **Essential**: el contenido básico de la categoría (la descarga más chica)
- **Standard**: lo de Essential más contenido útil adicional
- **Comprehensive**: todo lo disponible para la categoría (la descarga más grande)

Así puedes equilibrar cuánto contenido tienes con cuánto espacio ocupa.

---

## Preguntas sobre la IA

### ¿Cómo uso el chat de IA?
1. Ve al [chat de IA](/chat) desde el Centro de mando
2. Escribe tu pregunta o pedido
3. La IA responde en tono de conversación

Primero tienes que instalar la IA: actívala en la Configuración rápida o instálala desde el [Depósito de suministros](/supply-depot).

### ¿Cómo subo documentos a la base de conocimiento?
1. Ve a la **[base de conocimiento →](/knowledge-base)**
2. Sube tus documentos (PDF, archivos de texto, etc.)
3. Los documentos se procesan e indexan automáticamente
4. Haz preguntas en el chat de IA: la IA consultará tus documentos cuando sean relevantes

También puedes quitar documentos de la base de conocimiento cuando ya no los necesites.

La documentación de NOMAD se agrega automáticamente a la base de conocimiento al instalar el Asistente de IA.

### ¿Qué es el benchmark del sistema?
El benchmark del sistema mide el rendimiento de tu equipo y genera una puntuación NOMAD: una combinación ponderada del rendimiento del procesador, la memoria, el disco y la IA. Puedes crear una etiqueta de constructor (una identidad al estilo NOMAD, como «Tactical-Llama-1234») y compartir tus resultados en la [tabla de la comunidad](https://benchmark.projectnomad.us).

Ve al **[Benchmark del sistema →](/settings/benchmark)** para ejecutar uno.

### ¿Qué es el canal de acceso anticipado?
El acceso anticipado te permite recibir, si lo activas, versiones candidatas con las últimas funciones y mejoras antes de que lleguen a la versión estable. Puedes activarlo o desactivarlo desde **Ajustes → Buscar actualizaciones**. Estas versiones pueden tener errores; si prefieres estabilidad, quédate en el canal estable.

---

## Solución de problemas

### Una función no carga o muestra una página en blanco

**Prueba estos pasos:**
1. Espera 30 segundos: algunas funciones tardan en arrancar
2. Recarga la página (Ctrl+R o Cmd+R)
3. Vuelve al Centro de mando y prueba de nuevo
4. Revisa en Ajustes → Sistema si el servicio está funcionando
5. Prueba reiniciar el servicio (Detener y luego Iniciar en el Depósito de suministros)

### Los mapas muestran una zona gris o en blanco

La función de mapas necesita datos de mapas descargados. Si ves una zona en blanco:
1. Ve a **Ajustes → Administrador de mapas**
2. Descarga las regiones de tu zona
3. Espera a que terminen las descargas
4. Vuelve a los mapas y recarga la página

### ERROR: Failed to load the XML library file '/data/kiwix-library.xml'

Esto suele significar que el servicio de la Biblioteca de información arrancó antes de que su índice de Kiwix estuviera completamente inicializado.

Prueba esta forma de recuperarlo:
1. Ve al **[Depósito de suministros](/supply-depot)**
2. Detén la **Biblioteca de información (Kiwix)**
3. Espera entre 10 y 15 segundos y vuelve a iniciarla
4. Si el error sigue, usa **Forzar reinstalación** en la Biblioteca de información desde la misma página

Cuando termine el reinicio o la reinstalación, recarga la página de la Biblioteca de información.

### Las respuestas de la IA son lentas

La IA local necesita mucha capacidad de cómputo. Para mejorar la velocidad:
- **Agrega una GPU**: una GPU NVIDIA con el NVIDIA Container Toolkit puede acelerar la IA entre 10 y 20 veces o más
- Cierra otras aplicaciones en el servidor
- Asegúrate de que tenga buena refrigeración (el sobrecalentamiento reduce el rendimiento)
- Considera usar un modelo de IA más chico y rápido, si hay alguno disponible

### ¿Cómo activo la aceleración por GPU para la IA?

NOMAD detecta automáticamente las GPU NVIDIA cuando el NVIDIA Container Toolkit está instalado en el equipo. Para configurar la aceleración por GPU:

1. **Instala una GPU NVIDIA** en tu servidor (si todavía no tiene una)
2. **Instala el NVIDIA Container Toolkit** en el equipo: sigue la [guía de instalación oficial](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html) (en inglés)
3. **Reinstala el Asistente de IA**: ve al [Depósito de suministros](/supply-depot), busca el Asistente de IA y haz clic en **Forzar reinstalación**

NOMAD detectará la GPU durante la instalación y configurará la IA para usarla automáticamente. Verás «NVIDIA container runtime detected» en el progreso de la instalación.

**Consejo:** ejecuta un [benchmark del sistema](/settings/benchmark) antes y después para ver la diferencia. Los sistemas con aceleración por GPU suelen lograr más de 100 tokens por segundo, contra 10 a 15 usando solo el procesador.

### Agregué o cambié mi GPU pero la IA sigue lenta

Cuando agregas o cambias una GPU, NOMAD tiene que reconfigurar el contenedor de la IA para usarla:

1. Asegúrate de que el **NVIDIA Container Toolkit** esté instalado en el equipo
2. Ve al **[Depósito de suministros](/supply-depot)**
3. Busca el **Asistente de IA** y haz clic en **Forzar reinstalación**

Forzar la reinstalación vuelve a crear el contenedor de la IA con soporte de GPU. Sin este paso, la IA sigue funcionando solo con el procesador.

### Veo un aviso de que la IA no puede acceder a la GPU

NOMAD verifica si tu GPU es realmente accesible dentro del contenedor de la IA. Si detecta una GPU en el equipo pero no funciona dentro del contenedor, verás un aviso en las páginas de Información del sistema y de ajustes de la IA. Haz clic en el botón **«Solucionar: reinstalar Asistente de IA»** para volver a crear el contenedor con acceso a la GPU. Tus modelos de IA descargados se conservan.

### El chat de IA no está disponible

La página del chat de IA necesita que primero instales el Asistente de IA:
1. Ve al **[Depósito de suministros](/supply-depot)**
2. Instala el **Asistente de IA**
3. Espera a que termine la instalación
4. El chat de IA quedará disponible desde la pantalla de inicio o en el [chat](/chat)

### La subida a la base de conocimiento se quedó trabada

Si la subida de un documento a la base de conocimiento parece trabada:
1. Revisa que el Asistente de IA esté funcionando en **Ajustes → Depósito de suministros**
2. Los documentos grandes tardan en procesarse: espera unos minutos
3. Prueba subir un documento más chico para verificar que el sistema funcione
4. Revisa **Ajustes → Sistema** por si hay mensajes de error

### El benchmark no se envía a la tabla de la comunidad

Para compartir resultados en la tabla de la comunidad:
- Tienes que ejecutar un **benchmark completo** (no Solo sistema ni Solo IA)
- El benchmark tiene que incluir resultados de IA (el Asistente de IA tiene que estar instalado y funcionando)
- Tu puntuación tiene que superar cualquier envío anterior desde el mismo equipo

Si el envío falla, revisa el mensaje de error para ver los detalles.

### «Servicio no disponible» o errores de conexión

Puede que el servicio todavía esté arrancando. Espera 1 o 2 minutos y prueba de nuevo.

Si el problema sigue:
1. Ve a **Ajustes → Depósito de suministros**
2. Busca el servicio con problemas
3. Haz clic en **Reiniciar**
4. Espera 30 segundos y prueba de nuevo

### Las descargas se traban o fallan

1. Revisa tu conexión a internet
2. Ve a **Ajustes** y revisa el espacio disponible
3. Si el disco está lleno, borra contenido que no uses
4. Cancela la descarga trabada y prueba de nuevo

### El servidor no arranca

Si no puedes acceder al Centro de mando:
1. Verifica que el equipo del servidor esté encendido
2. Revisa la conexión de red
3. Prueba acceder directamente con la dirección IP del servidor
4. Revisa los registros del servidor si tienes acceso a la consola

### Olvidé mi contraseña de Kolibri

Las contraseñas de Kolibri se administran por separado:
1. Si eres administrador, puedes restablecer las contraseñas de los usuarios desde la administración de usuarios de Kolibri
2. Si olvidaste la contraseña de administrador, puede que tengas que restablecerla desde la línea de comandos (consulta a quien administre el equipo)

---

## Actualizaciones y mantenimiento

### ¿Cómo actualizo NOMAD?
1. Ve a **Ajustes → Buscar actualizaciones**
2. Si hay una actualización, haz clic para instalarla
3. El sistema descarga las actualizaciones y se reinicia automáticamente
4. Esto suele tardar entre 2 y 5 minutos

### ¿Debería actualizar seguido?
Sí, mientras tengas acceso a internet. Las actualizaciones incluyen:
- Correcciones de errores
- Funciones nuevas
- Mejoras de seguridad
- Mejoras de rendimiento

### ¿NOMAD puede actualizarse solo?
Sí. NOMAD puede mantener al día su software, sus apps instaladas y su contenido por su cuenta. Las actualizaciones automáticas **se activan por elección y vienen desactivadas**: activas lo que quieras desde **Ajustes → Actualizaciones** (y, para las apps, con un interruptor por app en el Depósito de suministros). Solo se ejecutan dentro del horario que elijas, después de controles de seguridad, y nunca aplican automáticamente saltos de versión mayor. Consulta la **[guía de actualizaciones](/docs/updates)** para ver todo el recorrido.

### ¿Cómo actualizo el contenido (Wikipedia, etc.)?
Las actualizaciones de contenido van por separado de las del software:
1. Ve a **Ajustes → Administrador de contenido** o al **Explorador de contenido**
2. Busca versiones más nuevas de tu contenido instalado
3. Descarga las versiones actualizadas que necesites

También puedes activar las **actualizaciones automáticas de contenido** para que las bibliotecas de Wikipedia/ZIM y las regiones de mapas instaladas se renueven solas durante la noche; consulta la [guía de actualizaciones](/docs/updates).

Consejo: las copias nuevas de Wikipedia se publican aproximadamente cada mes.

### ¿Qué pasa si falla una actualización?
El sistema está pensado para recuperarse sin problemas. Si una actualización falla:
1. La versión anterior debería seguir funcionando
2. Vuelve a intentar la actualización más tarde
3. Revisa Ajustes → Sistema por si hay mensajes de error

### Mantenimiento desde la línea de comandos

Para resolver problemas avanzados o cuando no puedes acceder a la interfaz web, NOMAD incluye scripts de ayuda en `/opt/project-nomad`:

**Iniciar todos los servicios:**
```bash
sudo bash /opt/project-nomad/start_nomad.sh
```

**Detener todos los servicios:**
```bash
sudo bash /opt/project-nomad/stop_nomad.sh
```

**Actualizar el Centro de mando:**
```bash
sudo bash /opt/project-nomad/update_nomad.sh
```
*Nota: esto actualiza solo el Centro de mando, no cada app. Actualiza las apps desde la interfaz web.*

**Desinstalar NOMAD:**
```bash
curl -fsSL https://raw.githubusercontent.com/Crosstalk-Solutions/project-nomad/refs/heads/main/install/uninstall_nomad.sh -o uninstall_nomad.sh
sudo bash uninstall_nomad.sh
```
*Advertencia: esto no se puede deshacer. Se borran todos los datos.*

---

## Privacidad y seguridad

### ¿Mis datos son privados?
Sí. NOMAD funciona por completo en tu equipo. Tus búsquedas, tus conversaciones con la IA y tus datos de uso nunca salen de tu servidor.

### ¿Otras personas pueden acceder a mi servidor?
Por defecto, NOMAD está disponible en tu red local. Cualquiera en la misma red puede acceder. En redes públicas, considera medidas de seguridad adicionales.

### ¿La IA envía datos a algún lado?
No. La IA funciona completamente en tu equipo. Tus conversaciones no se envían a ningún servicio externo. El chat de IA está integrado en el Centro de mando: no hay un servicio aparte que configurar.

---

## Más ayuda

### La IA puede ayudarte
Prueba hacer una pregunta en el [chat de IA](/chat). La IA local puede responder sobre muchos temas, incluida la solución de problemas técnicos. Como la documentación de NOMAD se agrega a la base de conocimiento, también puede ayudarte con preguntas específicas de NOMAD.

### Revisa la documentación
Ya estás en ella. Usa el menú para encontrar temas específicos.

### Únete a la comunidad
Recibe ayuda de otros usuarios de NOMAD en **[Discord](https://discord.com/invite/crosstalksolutions)** (en inglés).

### Notas de la versión
Mira qué cambió en cada versión: **[Notas de la versión](/docs/release-notes)**
