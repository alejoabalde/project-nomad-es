# Referencia de la API

NOMAD ofrece una API REST para todas las operaciones. Todos los endpoints están bajo `/api/` y devuelven JSON.

---

## Referencia interactiva

La referencia completa y siempre actualizada de los endpoints se genera directamente a partir de las
rutas y los validadores de la aplicación, y se sirve como una interfaz interactiva de [Scalar](https://scalar.com) (en inglés):

- **[/reference](/reference)**: explora cada endpoint y los esquemas de solicitud y respuesta, y prueba llamadas en vivo
- **[/api/openapi.json](/api/openapi.json)**: el documento OpenAPI 3.1 en bruto (para importar en Postman, Insomnia, generadores de código, etc.)

Como se genera a partir de los mismos validadores de VineJS que usa la API, nunca se desfasa
de la implementación. Úsala antes que cualquier lista de endpoints escrita a mano.

---

## Convenciones

**URL base:** `http://<tu-servidor>/api`

**Respuestas:**
- Las respuestas correctas incluyen `{ "success": true }` y un estado HTTP 2xx
- Las respuestas de error devuelven el estado HTTP correspondiente (400, 404, 409, 500) con un mensaje de error
- Las operaciones largas (descargas, benchmarks, embeddings) devuelven 201 o 202 con un ID de trabajo o de benchmark para consultar su estado

**Patrón asíncrono:** envías un trabajo → recibes un ID → consultas un endpoint de estado hasta que termine.
