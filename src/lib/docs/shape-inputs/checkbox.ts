export const CHECKBOX_SHAPE = `# Componente Verificador

## Descripción

El componente Checkbox permite crear elementos de selección binaria (marcado/desmarcado) en formularios dinámicos. Es ideal para opciones de tipo Sí/No, aceptación de términos y condiciones, o cualquier selección booleana.

![Checkbox form](https://res.cloudinary.com/dbgzsikcs/image/upload/v1744239600/UAI/dynamic-form/checkbox_form_axjye0.gif)

## Propiedades principales

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| Nombre | texto | Nombre del campo para identificarlo en el formulario |
| Etiqueta | texto | Texto que se muestra junto al checkbox |
| Descripción | texto | Texto descriptivo opcional que aparece debajo del checkbox |
| Requerido | ticket | Indica si el checkbox debe ser marcado obligatoriamente |
| Mensaje de requerido | texto | Mensaje de error cuando el checkbox es requerido pero no está marcado |
| Deshabilitado | ticket | Deshabilita el checkbox impidiendo su interacción |
| Solo lectura | ticket | Permite ver el checkbox pero no modificarlo |
| boxCheckboxClass | string | Clases CSS personalizadas para el contenedor del checkbox |
| labelCheckboxClass | string | Clases CSS personalizadas para la etiqueta del checkbox |

## Estilos personalizables

El componente Checkbox permite personalizar dos elementos principales a través de clases CSS:

1. **Contenedor del checkbox**: Mediante la propiedad \`boxCheckboxClass\`
2. **Etiqueta del checkbox**: Mediante la propiedad \`labelCheckboxClass\`

Si no se especifican estilos personalizados, se utilizarán los estilos predeterminados definidos en el sistema.

## Validación

El componente Checkbox incluye validación integrada:

- Si la propiedad \`required\` está establecida como \`true\`, el checkbox debe estar marcado
- El mensaje de error se muestra a través de la propiedad \`msgRequired\` cuando el checkbox es requerido pero no está marcado
- La validación se activa al interactuar con el componente


## Estilos con Tailwind 

![Tailwind checkbox](https://res.cloudinary.com/dbgzsikcs/image/upload/v1744239749/UAI/dynamic-form/2ca7c69b-0297-4862-bc6b-e6a6ae6267d7.png)

## Ejemplo de uso

\`\`\`typescript
// Definición de un checkbox para aceptar términos y condiciones
const termsCheckbox = {
  id: 'terms-checkbox',
  name: 'acceptTerms',
  shape: 'check',
  label: 'Acepto los términos y condiciones',
  description: 'Debe aceptar los términos para continuar',
  required: true,
  msgRequired: 'Debe aceptar los términos y condiciones para continuar',
  boxCheckboxClass: 'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500',
  labelCheckboxClass: 'ml-2 block text-sm text-gray-900'
};
\`\`\`

## Interacción con el formulario

El componente Checkbox interactúa con el formulario de la siguiente manera:

- Al marcar o desmarcar el checkbox, se actualiza el valor en el objeto \`formValues\` con el nombre especificado en la propiedad \`name\`
- El valor almacenado es de tipo booleano (\`true\` cuando está marcado, \`false\` cuando está desmarcado)
- La función \`handleCheck\` gestiona los cambios en el estado del checkbox

## Accesibilidad

El componente está diseñado siguiendo las mejores prácticas de accesibilidad:

- Utiliza atributos ARIA apropiados
- Mantiene la asociación entre la etiqueta y el control mediante IDs
- Proporciona feedback visual y textual para errores de validación

## Implementación técnica

El componente Checkbox está implementado utilizando:

- Biblioteca Bits-UI para el componente base
- Íconos personalizados para los estados marcado/indeterminado
- Sistema de validación integrado para verificar los requisitos
- Componente Description para mostrar mensajes de error o descripciones
`;