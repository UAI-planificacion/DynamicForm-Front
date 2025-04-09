export const INPUT_SHAPE = `# Componente Input

El componente Input es uno de los elementos fundamentales en DynamicForm, permitiendo la captura de texto, números, correos electrónicos y otros tipos de datos básicos. Este componente ofrece una amplia gama de configuraciones para adaptarse a diferentes necesidades de validación y presentación.

## Características principales

El componente Input en DynamicForm proporciona las siguientes funcionalidades:

- **Múltiples tipos de entrada**: texto, número, contraseña, email, URL, teléfono y búsqueda.
- **Validaciones integradas**: requerido, longitud mínima/máxima, patrones regex, valores mínimos/máximos para números.
- **Mensajes de error personalizados**: para cada tipo de validación.
- **Personalización visual**: clases CSS personalizables para adaptar el estilo.
- **Estados especiales**: deshabilitado, solo lectura.
- **Valores por defecto**: configurables para inicializar el campo.

## Configuración básica

Para crear un campo de entrada básico, necesitas configurar al menos estas propiedades:

- **name**: Identificador único del campo (requerido)
- **shape**: Debe ser 'input' para este tipo de componente
- **type**: El tipo de entrada (text, number, email, etc.)
- **label**: Texto descriptivo que se mostrará junto al campo

## Ejemplo de configuración básica

\`\`\`javascript
const inputBasico = {
  id: "email-field-id",
  name: "email",
  shape: "input",
  label: "Correo electrónico",
  type: "email",
  placeholder: "Ingresa tu correo electrónico"
};
\`\`\`

## Propiedades disponibles

### Propiedades generales

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| id | string | Identificador único del campo |
| name | string | Nombre del campo (usado para identificar el valor en el formulario) |
| shape | 'input' | Tipo de componente |
| label | string | Etiqueta descriptiva del campo |
| description | string | Texto adicional para describir el propósito del campo |
| placeholder | string | Texto de ejemplo que aparece cuando el campo está vacío |
| value | string | Valor inicial del campo |
| disabled | boolean | Si está habilitado, el campo no puede ser modificado |
| readonly | boolean | Si está habilitado, el campo puede ser seleccionado pero no modificado |

### Propiedades de tipo

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| type | 'text' \| 'number' \| 'password' \| 'email' \| 'url' \| 'tel' \| 'search' | Tipo de entrada |

### Propiedades de validación

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| required | boolean | Si el campo es obligatorio |
| msgRequired | string | Mensaje de error cuando el campo es requerido pero está vacío |
| pattern | string | Expresión regular para validar el formato del valor |
| msgPattern | string | Mensaje de error cuando el valor no cumple con el patrón |
| minLength | number | Longitud mínima del texto (para tipos text, email, etc.) |
| maxLength | number | Longitud máxima del texto |
| msgMinLength | string | Mensaje de error cuando el texto es demasiado corto |
| msgMaxLength | string | Mensaje de error cuando el texto es demasiado largo |
| min | number | Valor mínimo (para tipo number) |
| max | number | Valor máximo (para tipo number) |
| msgMin | string | Mensaje de error cuando el valor es menor que el mínimo |
| msgMax | string | Mensaje de error cuando el valor es mayor que el máximo |

### Propiedades de estilo

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| inputClass | string | Clases CSS para personalizar el estilo del campo de entrada |

## Validaciones

El componente Input incluye un sistema completo de validaciones que se ejecutan tanto durante la edición como al enviar el formulario:

1. **Validación de campo requerido**: Verifica que el campo no esté vacío cuando es obligatorio.
2. **Validación de longitud**: Comprueba que el texto cumpla con los límites de longitud mínima y máxima.
3. **Validación de patrón**: Verifica que el valor coincida con la expresión regular especificada.
4. **Validación de rango numérico**: Para campos de tipo number, comprueba que el valor esté dentro del rango especificado.

Cada validación puede tener su propio mensaje de error personalizado que se mostrará cuando no se cumpla la condición.

## Comportamiento en el Editor

En el panel de edición, el componente Input ofrece una interfaz intuitiva para configurar todas sus propiedades:

1. **Configuración básica**: Nombre, etiqueta, tipo y placeholder.
2. **Validaciones**: Opciones para establecer si es requerido, patrones, longitudes mínimas/máximas.
3. **Atributos opcionales**: Descripción, estados (deshabilitado, solo lectura) y estilos personalizados.

El editor también proporciona una vista previa en tiempo real del componente con las configuraciones aplicadas.

## Comportamiento en la Vista Previa

En la vista previa del formulario, el componente Input:

1. Muestra la etiqueta y el campo de entrada con todas las propiedades configuradas.
2. Aplica validaciones en tiempo real mientras el usuario interactúa con el campo.
3. Muestra mensajes de error cuando no se cumplen las validaciones.
4. Recopila y almacena el valor ingresado para ser enviado con el formulario.

## Ejemplo de uso completo

\`\`\`javascript
const campoEmail = {
  id: "email-field-id",
  name: "email",
  shape: "input",
  label: "Correo electrónico",
  type: "email",
  placeholder: "ejemplo@dominio.com",
  description: "Ingresa un correo electrónico válido para contactarte",
  required: true,
  msgRequired: "El correo electrónico es obligatorio",
  pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
  msgPattern: "Ingresa un formato de correo electrónico válido",
  maxLength: 100,
  msgMaxLength: "El correo electrónico no puede exceder los 100 caracteres",
  inputClass: "border-blue-500 focus:ring-blue-500"
};
\`\`\`

## Consejos de uso

- **Para campos numéricos**: Utiliza el tipo 'number' y configura los límites min/max según tus necesidades.
- **Para contraseñas**: Usa el tipo 'password' que ocultará automáticamente los caracteres ingresados.
- **Para validaciones complejas**: Combina patrones regex con mensajes de error claros para guiar al usuario.
- **Para mejorar la accesibilidad**: Siempre proporciona etiquetas descriptivas y mensajes de error útiles.

El componente Input es versátil y potente, permitiéndote crear desde simples campos de texto hasta entradas con validaciones complejas para garantizar la calidad de los datos recopilados en tus formularios dinámicos.
`;