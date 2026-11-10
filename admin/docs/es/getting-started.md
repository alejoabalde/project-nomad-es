# Primeros pasos con NOMAD

Esta guía te ayuda a sacarle el máximo provecho a tu servidor NOMAD.

---

## Requisitos del sistema

Si ya tienes NOMAD funcionando, puedes saltarte esta sección. Está aquí por si planeas un segundo servidor, cambias de equipo o ayudas a otra persona a instalarlo.

### Sistema operativo

NOMAD funciona en Linux basado en Debian.

| Nivel de soporte | Sistema operativo |
|---|---|
| **Recomendado** | Ubuntu 26.04 LTS |
| **También compatible** | Ubuntu 24.04 LTS, Debian 12 |
| **Con soporte de la comunidad** | Windows mediante WSL2, otras derivadas de Debian |

Ubuntu 26.04 LTS es la versión con la que probamos y la que recomendamos para instalaciones nuevas. Si ya usas 24.04 LTS o Debian 12, no hace falta reinstalar: las dos siguen siendo compatibles.

Ubuntu Desktop es la opción más amigable si vienes de Windows o macOS. Ubuntu Server funciona igual de bien si te manejas con la terminal, y NOMAD no necesita entorno de escritorio en ningún caso, porque todo se usa desde el navegador.

macOS y las distribuciones que no son Debian, como Fedora o Arch, no tienen soporte oficial.

### Equipo

NOMAD en sí es liviano. Lo que define los requisitos es el contenido y las herramientas que decidas instalar, y si quieres usar IA local.

**Mínimo, sin IA local:**

- Procesador de doble núcleo de 2 GHz
- 4 GB de RAM
- 5 GB de espacio libre en disco, más lo que ocupe el contenido que descargues

**Recomendado, con IA local:**

- AMD Ryzen 7, Intel Core i7 o superior
- 32 GB de RAM
- NVIDIA RTX 3060 o equivalente de AMD; con más VRAM puedes usar modelos más grandes
- 250 GB o más de espacio libre en disco, preferentemente SSD

Solo necesitas una conexión a internet estable durante la instalación. Después, NOMAD está pensado para funcionar completamente sin conexión.

### Sobre los controladores de la GPU

El instalador configura Docker y el NVIDIA Container Toolkit por ti, pero **no** instala el controlador de la GPU. Tiene que estar instalado en el equipo de antemano.

En Ubuntu, lo más fácil es marcar **«Instalar software de terceros para hardware de gráficos y Wi-Fi»** durante la instalación. Si te lo saltaste, o agregaste la GPU después, instala primero el controlador y luego usa **Forzar reinstalación** en el Asistente de IA desde el [Depósito de suministros](/supply-depot) para que la detecte.

Sin GPU, el Asistente de IA funciona igual, pero usa el procesador, lo que es bastante más lento.

---

## Asistente de Configuración rápida

Si es tu primera vez con NOMAD, el asistente de Configuración rápida te ayuda a dejar todo listo.

**[Abrir la Configuración rápida →](/easy-setup)**

![Asistente de Configuración rápida, paso 1: elige las funciones](/docs/es/easy-setup-step1.webp)

El asistente te guía en cuatro pasos sencillos:
1. **Funciones**: elige qué activar: Biblioteca de información, Asistente de IA, Plataforma educativa, Mapas, Herramientas de datos y Notas
2. **Mapas**: selecciona regiones geográficas para los mapas sin conexión
3. **Contenido**: elige colecciones de contenido seleccionadas en los niveles Esencial, Estándar o Completo

![Niveles de contenido: Esencial, Estándar y Completo](/docs/es/easy-setup-tiers.webp)
4. **Revisión**: confirma lo que elegiste y empieza la descarga

Según lo que hayas elegido, las descargas pueden tardar. Puedes seguir el progreso en Ajustes, seguir usando las funciones que ya están instaladas o dejar el servidor encendido durante la noche para las descargas grandes.

---

## Conoce tus herramientas

### Biblioteca de información: conocimiento sin conexión (Kiwix)

La Biblioteca de información guarda versiones comprimidas de sitios web y obras de referencia que funcionan sin internet.

**Qué incluye:**
- Wikipedia completa (millones de artículos)
- Referencias médicas y guías de primeros auxilios
- Guías prácticas e información de supervivencia
- Libros clásicos del Proyecto Gutenberg

**Cómo se usa:**
1. Haz clic en **Biblioteca de información** en la pantalla de inicio del Centro de mando o en el [Depósito de suministros](/supply-depot)
2. Elige una colección (por ejemplo, Wikipedia)
3. Busca o navega igual que en el sitio web de siempre

---

### Plataforma educativa: cursos sin conexión (Kolibri)

La Plataforma educativa ofrece cursos completos que funcionan sin conexión.

**Qué incluye:**
- Cursos en video de Khan Academy
- Matemática, ciencias, lectura y más
- Seguimiento del progreso de cada estudiante
- Sirve para todas las edades

**Cómo se usa:**
1. Haz clic en **Plataforma educativa** en la pantalla de inicio del Centro de mando o en el [Depósito de suministros](/supply-depot)
2. Inicia sesión o crea una cuenta de estudiante
3. Explora los cursos y empieza a aprender

**Cursos en español:** los cursos se agregan desde Kolibri importando canales. Para Khan Academy en español, importa el canal de Khan Academy en español desde **Dispositivo → Canales**; puedes elegir solo los temas que quieras.

**Consejo:** Kolibri admite varios usuarios. Crea una cuenta para cada integrante de la familia y así sigues el progreso de cada uno.

---

### Asistente de IA: chat integrado

![Interfaz del chat de IA](/docs/es/ai-chat.webp)

NOMAD incluye un chat de IA integrado que funciona con Ollama. Corre por completo en tu servidor: no necesita internet y no envía datos a ningún lado.

**Qué puede hacer:**
- Responder preguntas sobre cualquier tema
- Explicar conceptos complejos de forma simple
- Ayudarte a escribir y corregir textos
- Consultar los documentos que subiste a la base de conocimiento
- Ayudarte a buscar ideas y resolver problemas

**Cómo se usa:**
1. Haz clic en **Chat de IA** en el Centro de mando o ve al [chat](/chat)
2. Escribe tu pregunta o pedido
3. La IA responde en tono de conversación

**Consejo:** sé específico en tus preguntas. En lugar de «háblame de plantas», prueba con «¿qué verduras crecen bien a la sombra?».

**Nota:** primero tienes que instalar el Asistente de IA. Actívalo en la Configuración rápida o instálalo desde el [Depósito de suministros](/supply-depot).

**Aceleración por GPU:** si tu servidor tiene una GPU NVIDIA, el instalador de NOMAD configura el soporte de GPU por ti (instala el [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html) y configura Docker automáticamente). Solo necesitas que el controlador de NVIDIA esté instalado en el equipo; en Ubuntu lo obtienes activando la instalación de software de terceros durante la instalación. Con GPU, las respuestas de la IA son muchísimo más rápidas (entre 10 y 20 veces). Si agregas una GPU después, ve al [Depósito de suministros](/supply-depot) y usa **Forzar reinstalación** en el Asistente de IA para activarla.

---

### Base de conocimiento: IA que conoce tus documentos

![Interfaz para subir archivos a la base de conocimiento](/docs/es/knowledge-base.webp)

La base de conocimiento te permite subir documentos para que la IA los consulte al responder tus preguntas. Usa búsqueda semántica (RAG con Qdrant) para encontrar la información relevante en tus archivos.

**Tipos de archivo admitidos:**
- PDF, archivos de texto y otros formatos de documento
- La documentación de NOMAD se carga automáticamente al instalar el Asistente de IA

**Cómo se usa:**
1. Ve a la **[base de conocimiento →](/knowledge-base)**
2. Sube tus documentos (PDF, archivos de texto, etc.)
3. Los documentos se procesan e indexan automáticamente
4. Haz preguntas en el chat de IA: la IA consultará tus documentos cuando sean relevantes
5. Quita los documentos que ya no necesites: se borran del índice y del almacenamiento local

**Ejemplos de uso:**
- Sube planes de emergencia para consultarlos rápido durante una crisis
- Carga manuales técnicos y procedimientos para lugares de trabajo sin conexión
- Agrega guías curriculares para la educación en casa
- Guarda artículos de investigación para el trabajo académico

---

### Mapas: navegación sin conexión

![Visor de mapas sin conexión](/docs/maps.webp)

Mira mapas sin internet. Descarga las regiones que necesites antes de quedarte sin conexión.

**Cómo se usa:**
1. Haz clic en **Mapas** en el Centro de mando
2. Muévete arrastrando y haciendo zoom
3. Busca lugares con la barra de búsqueda

**Para agregar más regiones:**
1. Ve a **Ajustes → Administrador de mapas**
2. Selecciona las regiones que necesitas
3. Haz clic en Descargar

**Consejo:** descarga los mapas de los lugares a los que viajas seguido y, por las dudas, también los de las regiones vecinas.

**[Abrir los mapas →](/maps)**

---

## Administrar tu servidor

### Agregar más contenido

A medida que cambien tus necesidades, puedes agregar contenido cuando quieras:

- **Más apps:** Ajustes → Depósito de suministros
- **Más referencias:** Ajustes → Explorador de contenido o Administrador de contenido
- **Más regiones de mapas:** Ajustes → Administrador de mapas
- **Más contenido educativo:** desde el explorador de contenido integrado de Kolibri

### Selector de Wikipedia

![Explorador de contenido: explora y descarga paquetes de Wikipedia y colecciones seleccionadas](/docs/es/content-explorer.webp)

NOMAD incluye una herramienta dedicada para explorar y descargar paquetes de Wikipedia.

**Cómo se usa:**
1. Ve al **[Explorador de contenido →](/settings/zim/remote-explorer)**
2. Explora los paquetes de Wikipedia disponibles por idioma y tamaño
3. Selecciona y descarga los paquetes que quieras

**Nota:** al elegir otro paquete de Wikipedia se reemplaza el que habías descargado. Solo puede haber una selección de Wikipedia activa a la vez.

### Benchmark del sistema

![Benchmark del sistema con la puntuación NOMAD y la etiqueta de constructor](/docs/es/benchmark.webp)

Mide el rendimiento de tu equipo y compara tu NOMAD con los de la comunidad.

**Cómo se usa:**
1. Ve al **[Benchmark del sistema →](/settings/benchmark)**
2. Elige un tipo de benchmark: Completo, Solo sistema o Solo IA
3. Mira tu puntuación NOMAD (una combinación ponderada del rendimiento del procesador, la memoria, el disco y la IA)
4. Crea una etiqueta de constructor (tu identidad al estilo NOMAD, como «Tactical-Llama-1234»)
5. Comparte tus resultados en la [tabla de la comunidad](https://benchmark.projectnomad.us)

**Nota:** solo los benchmarks completos con datos de IA se pueden compartir en la tabla de la comunidad.

### Mantener todo actualizado

Mientras tengas internet, busca actualizaciones de vez en cuando:

1. Ve a **Ajustes → Buscar actualizaciones**
2. Si hay actualizaciones, haz clic para instalarlas
3. Espera a que termine la actualización (el servidor se reinicia)

Las actualizaciones de contenido (Wikipedia, mapas, etc.) se administran por separado de las del software.

**Actualizaciones automáticas:** NOMAD también puede mantenerse al día sin que tengas que revisarlo. El software, las apps instaladas y el contenido se pueden configurar, cada uno por separado y solo si lo activas, para actualizarse solos, con controles de seguridad y un horario que tú eliges. Consulta la **[guía de actualizaciones](/docs/updates)** para ver todos los detalles.

**Canal de acceso anticipado:** ¿quieres las funciones nuevas antes de que lleguen a la versión estable? Activa el acceso anticipado desde la página Buscar actualizaciones para recibir versiones candidatas. Puedes volver a la versión estable cuando quieras.

### Controlar el estado del sistema

Revisa tu servidor cuando quieras:

1. Ve a **Ajustes → Sistema**
2. Mira el uso del procesador, la memoria y el almacenamiento
3. Revisa cuánto tiempo lleva encendido y su estado

---

## Consejos para obtener mejores resultados

### Antes de quedarte sin conexión

- **Actualiza todo**: instala las actualizaciones de software y de contenido
- **Descarga lo que necesites**: mapas, referencias, contenido educativo
- **Pruébalo**: verifica que todo funcione mientras todavía tienes internet para resolver problemas

### Administrar el almacenamiento

Tu servidor tiene espacio limitado. Prioriza:
- El contenido que realmente vas a usar
- Las referencias críticas (médicas, de supervivencia)
- Los mapas de tu región
- El contenido educativo que se ajuste a lo que necesitas

Revisa el uso del almacenamiento en **Ajustes → Sistema**.

### Conseguir ayuda

- **Documentación integrada:** la estás leyendo ahora
- **Asistente de IA:** haz una pregunta en el [chat de IA](/chat)
- **Notas de la versión:** mira qué hay de nuevo en cada versión

---

## Próximos pasos

¡Ya puedes usar NOMAD! Algunas cosas para probar:

1. **Busca algo**: busca un tema en la Biblioteca de información
2. **Aprende algo**: empieza un curso de Khan Academy en la Plataforma educativa
3. **Haz una pregunta**: chatea con la IA en el [chat de IA](/chat)
4. **Explora los mapas**: busca tu barrio en el visor de mapas
5. **Sube un documento**: agrega un PDF a la [base de conocimiento](/knowledge-base) y pregúntale a la IA sobre él

¡Disfruta tu servidor de conocimiento sin conexión!
