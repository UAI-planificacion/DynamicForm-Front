export const BUTTON_SHAPE = `# Componente Botón

## Descripción

El componente Botón permite agregar botones a tus formularios para realizar acciones como enviar datos, reiniciar formularios o ejecutar funciones personalizadas. Es ideal para finalizar formularios o activar procesos específicos.

![Botón en formulario](https://res.cloudinary.com/dbgzsikcs/image/upload/v1745528364/UAI/dynamic-form/button/button_preview_fiawsj.gif)

## Propiedades principales

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| Nombre | texto | Nombre del botón para identificarlo en el formulario |
| Etiqueta | texto | Texto que se muestra dentro del botón |
| Descripción | texto | Texto descriptivo opcional que aparece debajo del botón |
| Deshabilitado | ticket | Deshabilita el botón impidiendo su interacción |
| Método HTTP | selección | Tipo de petición a realizar (GET, POST, PUT, DELETE) |
| URL de envío | texto | Dirección web a la que se enviarán los datos del formulario |
| Mensaje de error externo | texto | Mensaje que se muestra cuando hay problemas de conexión |
| Mensaje de formulario inválido | texto | Mensaje que se muestra cuando hay campos incorrectos |

## Configuración básica

Para crear un botón simple en tu formulario, solo necesitas configurar estas propiedades esenciales:

1. **Nombre**: Identificador único del botón (obligatorio)
2. **Etiqueta**: Texto que verán los usuarios en el botón
3. **Descripción**: Texto explicativo opcional que aparece debajo

## Personalización visual

Puedes personalizar la apariencia del botón utilizando estilos de Tailwind CSS. Esto te permite cambiar colores, tamaños, bordes y otros aspectos visuales.

![Personalización de estilos](https://res.cloudinary.com/dbgzsikcs/image/upload/v1745530928/UAI/dynamic-form/button/54ff4e0a-0dec-4ab5-9f4d-3461c38ea2cc.png)

Ejemplos de estilos comunes:

- **Botón azul**: \`w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded\`
- **Botón verde**: \`w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg\`
- **Botón rojo**: \`w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md\`

Si no especificas estilos personalizados, se usará el diseño predeterminado del sistema.

## Envío de datos a una API

El componente Botón puede configurarse para enviar los datos del formulario a un servicio externo (API). Para ello, necesitas configurar:

1. **Método HTTP**: Tipo de petición a realizar (GET, POST, PUT, DELETE)
2. **URL de envío**: Dirección web completa donde se enviarán los datos

![Configuración de API](https://res.cloudinary.com/dbgzsikcs/image/upload/v1745530859/UAI/dynamic-form/button/button_validaciones_zaaotm.gif)

> **Importante**: La URL debe comenzar con "https://" y tener un formato válido.

## Mensajes de respuesta

Puedes configurar mensajes personalizados para diferentes respuestas del servidor. Esto permite informar al usuario sobre el resultado de su acción de manera clara.

Para cada respuesta, debes configurar:

1. **Código HTTP**: Número que identifica el tipo de respuesta (200 = Éxito, 400 = Error, etc.)
2. **Mensaje**: Texto que se mostrará al usuario cuando se reciba ese código

Puedes añadir tantas respuestas como necesites, pero cada código HTTP debe ser único.

## Mensajes de error

El componente permite configurar dos tipos de mensajes de error:

1. **Error externo**: Se muestra cuando hay problemas de conexión o el servidor no responde
2. **Formulario inválido**: Se muestra cuando hay campos incorrectos o incompletos en el formulario

![Mensajes de error](https://res.cloudinary.com/dbgzsikcs/image/upload/v1745531077/UAI/dynamic-form/button/46437557-8654-4304-b892-f09b5a2b0adc.png)

Estos mensajes ayudan al usuario a entender qué ha ocurrido y cómo solucionarlo.

## Indicador de carga

Cuando el botón está procesando una petición, muestra automáticamente un indicador de carga y se deshabilita temporalmente. Esto evita envíos duplicados y proporciona retroalimentación visual al usuario.

## Ejemplo de uso

Aquí tienes un ejemplo de cómo configurar un botón para enviar datos a una API:

1. Crea un nuevo componente de tipo "Botón"
2. Configura sus propiedades básicas:
   - **Nombre**: "enviar-formulario"
   - **Etiqueta**: "Enviar datos"
   - **Descripción**: "Haz clic para enviar el formulario"
3. Configura la conexión a la API:
   - **Método HTTP**: "POST"
   - **URL de envío**: "https://api.ejemplo.com/datos"
4. Añade mensajes de respuesta:
   - Código 200: "Datos enviados correctamente"
   - Código 400: "Error en la solicitud. Revisa los datos ingresados."
   - Código 500: "Error en el servidor. Intenta más tarde."
5. Configura mensajes de error:
   - **Error externo**: "No se pudo conectar con el servidor. Intenta nuevamente."
   - **Formulario inválido**: "Por favor, completa todos los campos requeridos."

## Buenas prácticas

1. **Etiquetas claras**: Usa textos descriptivos que indiquen exactamente qué hará el botón
2. **Mensajes amigables**: Escribe mensajes de error y éxito que sean fáciles de entender
3. **Colores apropiados**: Usa colores que indiquen la acción (verde para confirmar, rojo para cancelar, etc.)
4. **Validación previa**: Asegúrate de que todos los campos requeridos estén completos antes de permitir el envío
5. **Confirmación visual**: Proporciona retroalimentación clara cuando la acción se complete correctamente
`;
