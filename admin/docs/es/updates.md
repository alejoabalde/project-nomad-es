# Mantener NOMAD actualizado

NOMAD funciona mejor si lo mantienes al día mientras tienes internet, así está listo con el software y el contenido más recientes la próxima vez que te quedes sin conexión. Esta página explica qué se puede actualizar, cómo hacerlo cuando quieras y cómo dejar que NOMAD se encargue automáticamente.

---

## Los tres tipos de actualizaciones

Hay tres cosas distintas que se pueden actualizar, y controlas cada una por separado:

1. **Software (el núcleo)**: NOMAD en sí: el Centro de mando, funciones nuevas, correcciones de errores y mejoras de seguridad.
2. **Apps**: las apps instalables del [Depósito de suministros](/supply-depot) (Kiwix, el Asistente de IA y cualquier otra que hayas agregado).
3. **Contenido**: tu material sin conexión: Wikipedia y otras bibliotecas de Kiwix, y las regiones de mapas descargadas.

Puedes actualizar cualquiera de ellas cuando quieras o configurarlas para que se actualicen automáticamente.

---

## Actualizar cuando quieras

Para buscar e instalar actualizaciones por tu cuenta:

1. Ve a **[Ajustes → Buscar actualizaciones](/settings/update)**.
2. Si hay una actualización de software, haz clic para instalarla. NOMAD descarga la actualización y se reinicia (por lo general entre 2 y 5 minutos).
3. Las apps se actualizan desde su tarjeta en el [Depósito de suministros](/supply-depot) con **Administrar › Actualizar**.
4. El contenido se administra desde **Ajustes → Administrador de contenido** y el **Explorador de contenido**, donde puedes descargar versiones más nuevas de las bibliotecas y mapas instalados.

Si alguna vez falla una actualización de software o de una app, NOMAD está pensado para recuperarse sin problemas: la versión anterior que funcionaba sigue corriendo, así que tu servidor no se cae.

---

## Actualizaciones automáticas

NOMAD puede mantenerse al día sin que tengas que acordarte de revisar. **Las actualizaciones automáticas se activan por elección y vienen desactivadas**: nada se actualiza solo hasta que lo actives. Todo se administra desde **Ajustes → Actualizaciones**.

Algunas cosas valen para las tres:

- **Tú eliges un horario.** Las actualizaciones automáticas solo se ejecutan en las horas que definas, así nunca te interrumpen mientras usas el equipo.
- **Las versiones mayores nunca son automáticas.** Solo se aplican solas las actualizaciones menores y de parches; un salto de versión grande siempre espera a que lo hagas tú, a propósito.
- **Primero, los controles de seguridad.** Antes de aplicar algo, NOMAD confirma que haya suficiente espacio en disco y que no haya otra actualización, descarga o instalación en curso.
- **Estar sin conexión no causa problemas.** Si NOMAD no puede conectarse a internet para revisar, simplemente saltea esa vuelta y lo vuelve a intentar más tarde.

### Actualizaciones automáticas del software (núcleo)

Actívalas desde **Ajustes → Actualizaciones**. Cuando están activadas, NOMAD actualiza su propio núcleo a versiones más nuevas dentro de la misma versión mayor, en el horario que elegiste y después de un **período de espera** configurable (así una versión recién publicada tiene tiempo de demostrar que funciona bien antes de que tu servidor la instale). En la misma página están el interruptor, el horario, el ajuste del período de espera y el estado en vivo. Si las actualizaciones fallan una y otra vez por un motivo real, NOMAD desactiva la función y te avisa en lugar de reintentar para siempre.

### Actualizaciones automáticas de apps

Las actualizaciones automáticas de apps se activan en **dos niveles**: un interruptor general en **Ajustes → Actualizaciones** *y* un interruptor por app en la tarjeta de cada app del [Depósito de suministros](/supply-depot). Los dos tienen que estar activados para que una app se actualice sola. Las actualizaciones de apps usan el mismo horario y el mismo período de espera que el núcleo, solo aplican versiones menores y de parches, y se pausan automáticamente para cualquier app que siga fallando.

### Actualizaciones automáticas de contenido

Las bibliotecas de Wikipedia/ZIM y las regiones de mapas instaladas también pueden renovarse solas. Como las descargas de contenido son grandes (muchas veces de varios gigabytes), las actualizaciones de contenido usan **su propio horario nocturno** con un **límite de ancho de banda**, separado del de software y apps. NOMAD revisa directamente los catálogos de Kiwix y de mapas y, cuando una biblioteca de Wikipedia se reemplaza por una versión más nueva, mantiene sincronizada automáticamente la base de conocimiento de la IA.

---

## Canal de acceso anticipado

¿Quieres las funciones nuevas antes de que lleguen a la versión estable? Activa el **acceso anticipado** desde la página [Buscar actualizaciones](/settings/update) para recibir versiones candidatas. Estas versiones pueden tener detalles sin pulir; puedes volver a la versión estable cuando quieras.

---

## Antes de quedarte sin conexión

Elijas lo que elijas, el hábito más importante es simple: **actualiza mientras todavía tienes internet.** Ya sea a mano o con las actualizaciones automáticas, asegúrate de que tu software y tu contenido estén al día antes de ir a un lugar sin conexión. Cuando estés desconectado, tendrás listas las últimas versiones sincronizadas de todo.

**[Buscar actualizaciones →](/settings/update)** · **[Ver las novedades de cada versión →](/docs/release-notes)**
