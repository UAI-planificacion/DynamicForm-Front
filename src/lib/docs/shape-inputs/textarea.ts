export const TEXTAREA_SHAPE = `# Componente Área de Texto

## Descripción

El componente Área de Texto permite crear campos para introducir textos largos o con múltiples líneas en formularios dinámicos. Es ideal para comentarios, descripciones, biografías o cualquier información que requiera más espacio que un campo de texto simple.

![Área de Texto](https://res.cloudinary.com/dbgzsikcs/image/upload/v1744242602/UAI/dynamic-form/textarea_form_gyfo1c.gif)

> **Nota**: El componente Área de Texto es perfecto para cuando necesitas que los usuarios ingresen textos extensos o con formato de múltiples líneas.

## Propiedades principales

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| Nombre | texto | Nombre del campo para identificarlo en el formulario |
| Etiqueta | texto | Texto que se muestra como título del área de texto |
| Descripción | texto | Texto descriptivo opcional que aparece debajo del área de texto |
| Placeholder | texto | Texto de ejemplo que aparece cuando el campo está vacío |
| Valor por defecto | texto | Texto inicial que aparece en el área de texto |
| Altura de la caja | numérico | Número de filas visibles en el área de texto (por defecto: 4) |
| Requerido | ticket | Indica si es obligatorio completar el campo |
| Mensaje de requerido | texto | Mensaje de error cuando el campo es requerido pero está vacío |
| Longitud mínima | numérico | Cantidad mínima de caracteres permitidos |
| Mensaje de longitud mínima | texto | Mensaje de error cuando no se alcanza la longitud mínima |
| Longitud máxima | numérico | Cantidad máxima de caracteres permitidos |
| Mensaje de longitud máxima | texto | Mensaje de error cuando se excede la longitud máxima |
| Deshabilitado | ticket | Deshabilita el área de texto impidiendo su interacción |
| Solo lectura | ticket | Permite ver el área de texto pero no modificarlo |

## Diferencias con el campo de texto simple

El Área de Texto se diferencia del campo de texto simple (Input) en los siguientes aspectos:

1. **Múltiples líneas**: Permite escribir y visualizar texto en varias líneas
2. **Altura ajustable**: Se puede configurar la altura visible mediante la propiedad "Altura de la caja"
3. **Mejor para textos largos**: Diseñado específicamente para contenido extenso
4. **Sin tipos especiales**: A diferencia del Input, no tiene tipos como email, número o teléfono

## Validación

El componente Área de Texto incluye validación integrada:

- Si la propiedad **Requerido** está marcada, el campo no puede estar vacío
- Si se especifica una **Longitud mínima**, el texto debe tener al menos esa cantidad de caracteres
- Si se especifica una **Longitud máxima**, el texto no puede exceder esa cantidad de caracteres
- Los mensajes de error personalizados se muestran cuando no se cumplen las validaciones

![Validación del Área de Texto](https://res.cloudinary.com/dbgzsikcs/image/upload/v1744242746/UAI/dynamic-form/bedfd645-ea27-425e-9fd7-bb99735c4c36.png)

## Ejemplo de uso

\`\`\`typescript
// Definición de un área de texto para comentarios
const comentarioTextarea = {
  id: 'comentario-textarea',
  name: 'comentario',
  shape: 'textarea',
  label: 'Comentarios adicionales',
  placeholder: 'Ingrese sus comentarios o sugerencias aquí...',
  description: 'Por favor, comparta cualquier información adicional que considere relevante',
  rows: 5,
  required: false,
  minLength: 10,
  maxLength: 500,
  msgMinLength: 'El comentario debe tener al menos 10 caracteres',
  msgMaxLength: 'El comentario no puede exceder los 500 caracteres',
  value: '',
  textareaClass: 'w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
};
\`\`\`

## Interacción con el formulario

El componente Área de Texto interactúa con el formulario de la siguiente manera:

- Al escribir en el área de texto, se actualiza el valor en el objeto formValues con el nombre especificado en la propiedad Nombre
- El valor almacenado es una cadena de texto que puede contener saltos de línea
- La función handleInput gestiona los cambios en el contenido del área de texto

## Accesibilidad

El componente está diseñado siguiendo las mejores prácticas de accesibilidad:

- Etiquetas asociadas correctamente con el control mediante IDs
- Atributos ARIA apropiados para lectores de pantalla
- Mensajes de error claros y descriptivos
- Soporte para navegación con teclado

## Casos de uso comunes

El Área de Texto es ideal para los siguientes escenarios:

- **Comentarios y opiniones**: Recopilar feedback detallado de los usuarios
- **Descripciones**: Permitir descripciones extensas de productos, servicios o situaciones
- **Biografías**: Capturar información biográfica o personal
- **Direcciones**: Ingresar direcciones completas con múltiples líneas
- **Notas**: Tomar notas o apuntes con formato de múltiples líneas
`;
