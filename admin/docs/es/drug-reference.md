# Guía de medicamentos

La Guía de medicamentos es una base de datos sin conexión, con búsqueda, de los **prospectos de la FDA**: la información oficial que acompaña a los medicamentos de venta libre y con receta de Estados Unidos. Una vez instalada, puedes buscar un medicamento por nombre, partir de una situación para llegar a los medicamentos que la tratan y comparar dos prospectos lado a lado, todo sin conexión a internet.

Es un complemento opcional. Un NOMAD recién instalado no la tiene hasta que decidas instalarla, porque el conjunto de datos es grande.

> **Esto es información de salud, no consejo médico.** La Guía de medicamentos te muestra el texto del prospecto de la FDA del fabricante y relaciona situaciones con opciones de venta libre. No reemplaza a un médico, farmacéutico o enfermero. Sigue siempre las indicaciones del producto que tienes en la mano y, en una emergencia real, busca ayuda profesional si puedes.

La primera vez que abras la Guía de medicamentos en un navegador, verás este aviso en una ventana que tienes que aceptar antes de que cargue la página. Esa aceptación se recuerda por navegador, así que otro navegador u otro dispositivo la volverá a mostrar.

> **Sobre el idioma:** la interfaz de la Guía de medicamentos está en español, pero los prospectos son los originales de la FDA y están en inglés. Busca los medicamentos por su nombre en inglés (por ejemplo, *ibuprofen*, *acetaminophen* o *loratadine*).

---

## Instalarla

Hay dos formas de obtener los datos, y las dos terminan en el mismo lugar.

**Desde el Explorador de contenido**, como parte de una colección:

1. Desde la pantalla de inicio, abre el **Explorador de contenido**.
2. Elige la categoría **Medicine**.
3. Selecciona el nivel **Standard**. Su contenido aparece en la tarjeta y entre lo incluido verás **FDA Drug Reference**.
4. Confirma la descarga.

**Desde la propia página de la Guía de medicamentos.** Abre la **Guía de medicamentos** desde la pantalla de inicio. Si no hay datos instalados, verás un panel «Todavía no hay datos de medicamentos de la FDA» con un botón **Descargar datos de medicamentos de la FDA**, que inicia el mismo proceso.

En los dos casos se hace en dos etapas, en segundo plano:

- **Descarga**: NOMAD trae el conjunto de prospectos de openFDA, de unos **1,7 GB** comprimidos, en varias partes. Si se corta la conexión, retoma desde donde quedó.
- **Indexación**: NOMAD carga esos prospectos en una base de datos de búsqueda rápida y sin conexión. Es la etapa más larga, y los datos ocupan unos **8 a 10 GB** en el disco.

No tienes que quedarte mirando. Sal de la página y el proceso sigue; la búsqueda se activa sola cuando termina la indexación. Mientras tanto, la página muestra el progreso de las dos etapas.

---

## Cómo moverte por la guía

Todo está detrás de un solo mosaico **Guía de medicamentos** en la pantalla de inicio. Con los datos instalados, la página tiene tres pestañas.

### Buscar por medicamento

Escribe el nombre de un medicamento, comercial o genérico, y NOMAD muestra los prospectos de la FDA que coinciden: para qué sirve el medicamento, la dosis, las advertencias y los componentes, tomados directamente del prospecto oficial del fabricante.

Los resultados se **agrupan por principio activo** en lugar de mostrar cientos de productos casi idénticos. Una búsqueda de un analgésico común devuelve un grupo por principio activo en vez de cada marca por separado, así ves entre qué estás eligiendo realmente.

### Por situación

Empieza por el problema en lugar del producto. Elige una o más situaciones, como quemaduras, fiebre o diarrea, y NOMAD muestra los medicamentos cuyo prospecto de la FDA las incluye.

Si eliges más de una situación, primero busca medicamentos que sirvan para **todas** y, si no hay, muestra los resultados de cada situación por separado. Es útil cuando tienes más de un síntoma a la vez y quieres un solo producto, si existe.

### Datos de la FDA

Muestra de dónde vienen los datos y en qué estado están: si están descargados, si están indexados y cuántos prospectos hay cargados. También es donde vuelves a lanzar una descarga o reinicias la indexación si algo necesita atención.

---

## Comparar dos medicamentos

Desde la página de detalle de un medicamento, usa **Comparar advertencias de prospectos** para poner dos prospectos lado a lado y leer qué dice cada uno.

Esto pone una junto a otra las secciones de advertencias de los dos fabricantes. **No** calcula interacciones entre medicamentos ni te dice si una combinación es segura. Decidir si dos medicamentos se pueden tomar juntos es justamente el tipo de pregunta que hay que hacerle a un farmacéutico o a un médico.

---

## Mantenerla actualizada

Los prospectos de la FDA cambian con el tiempo. Si activaste las **actualizaciones automáticas de contenido** (Ajustes → Actualizaciones), NOMAD revisa cada tanto si openFDA publicó un conjunto de datos más nuevo y actualiza la Guía de medicamentos por su cuenta, igual que hace con el resto de tu contenido sin conexión.

Con las actualizaciones automáticas desactivadas, los datos quedan exactamente como estaban al instalarlos, lo cual está bien para usarlos sin conexión. Siempre puedes volver a lanzar la descarga desde la pestaña **Datos de la FDA** para traer lo más reciente.

---

## Sobre el espacio en disco

La Guía de medicamentos es el elemento individual más grande de la colección Medicine → Standard. Calcula unos **8 a 10 GB** de disco después de la indexación, además de los 1,7 GB de la descarga.

Si tienes poco espacio, el Explorador de contenido muestra el tamaño total de un nivel antes de que lo confirmes, así sabes qué estás por instalar.
