export const SELECT_SHAPE = `# Componente Selector

## Descripción

El componente Selector permite crear listas desplegables para seleccionar una o múltiples opciones. Es ideal para formularios donde se necesita elegir entre un conjunto predefinido de valores, optimizando el espacio y mejorando la experiencia del usuario.

![Selector form](https://res.cloudinary.com/dbgzsikcs/image/upload/v1744240691/UAI/dynamic-form/first_select_form_fzwrpt.gif)

> **Nota**: El componente Selector requiere al menos una opción para funcionar correctamente.

> **Nota**: La selección solo funcionará cuando tengas un nombre asignado al componente.


## Propiedades principales

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| Nombre | texto | Nombre del campo para identificarlo en el formulario |
| Etiqueta | texto | Texto que se muestra como título del selector |
| Descripción | texto | Texto descriptivo opcional que aparece debajo del selector |
| Placeholder | texto | Texto que se muestra cuando no hay selección |
| Requerido | ticket | Indica si es obligatorio seleccionar al menos una opción |
| Mensaje de requerido | texto | Mensaje de error cuando el campo es requerido pero no tiene selección |
| Deshabilitado | ticket | Deshabilita el selector impidiendo su interacción |
| Solo lectura | ticket | Permite ver el selector pero no modificarlo |
| Selección múltiple | ticket | Permite seleccionar más de una opción |
| Con buscador | ticket | Habilita un campo de búsqueda para filtrar las opciones |
| Placeholder del buscador | texto | Texto que aparece en el campo de búsqueda |
| Altura del panel | numérico | Número de elementos visibles en el panel desplegable |

## Configuración de opciones

El componente Selector ofrece dos formas de configurar las opciones disponibles:

### 1. Opciones simples

Permite definir una lista plana de opciones, cada una con:

- **Valor**: Identificador único que se almacena cuando se selecciona la opción (requerido)
- **Etiqueta**: Texto que se muestra al usuario en la interfaz (requerido)

> **Nota**: el valor no se puede repetir.


![Opciones simples](https://res.cloudinary.com/dbgzsikcs/image/upload/v1744240816/UAI/dynamic-form/7d6c5bcc-f66d-4e90-a23c-1f5b1791ca1b.png)

### 2. Opciones del Grupo

Permite organizar las opciones en grupos para una mejor organización:

- **Nombre del grupo**: Título que agrupa un conjunto de opciones relacionadas
- **Opciones del grupo**: Lista de opciones (valor y etiqueta) dentro del grupo

![Opciones agrupadas](https://res.cloudinary.com/dbgzsikcs/image/upload/v1744241074/UAI/dynamic-form/group_select_form_nlrj9c.gif)

- Los grupos también son requeridos.
- Cada grupo debe tener al menos una opción.
- Cada opción debe tener un valor y una etiqueta.
- Los grupos también pueden ser de selección múltiple y se puede habilitar la búsqueda.

> **Nota**: el valor de cada opción no se puede repetir ni por grupos.

## Importación de opciones

El componente permite importar opciones desde archivos externos:

- **Archivos JSON**: Para importar estructuras de datos complejas
- **Archivos Excel (.xlsx, .xls)**: Para importar datos desde hojas de cálculo

El formato requerido para la importación debe incluir las columnas:
- Etiqueta: Texto visible para el usuario
- Valor: Valor que se almacena al seleccionar

## Estilos personalizables

El componente Selector permite personalizar cinco elementos principales a través de clases CSS:

1. **Caja del selector**: El contenedor principal
2. **Contenido desplegable**: El panel que muestra las opciones
3. **Elementos individuales**: Cada opción seleccionable
4. **Encabezados de grupo**: Los títulos de los grupos
5. **Campo de búsqueda**: El input para filtrar opciones

![Estilos personalizables](https://res.cloudinary.com/dbgzsikcs/image/upload/v1744241309/UAI/dynamic-form/bb300df5-23fb-4522-ae66-48e88ecd69a2.png)

## Validación

El componente Selector incluye validación integrada:

- Si la propiedad **requerido** está establecida como **true**, debe seleccionarse al menos una opción
- El mensaje de error se muestra a través de la propiedad **msgRequired** cuando el selector es requerido pero no tiene selección
- La validación se activa al interactuar con el componente

## Ejemplo de uso

\`\`\`typescript
// Definición de un selector de país con grupos por continente
const paisSelector = {
  id: 'pais-selector',
  name: 'pais',
  shape: 'select',
  label: 'País de residencia',
  placeholder: 'Seleccione su país',
  description: 'Seleccione el país donde reside actualmente',
  required: true,
  msgRequired: 'Debe seleccionar un país',
  multiple: false,
  search: true,
  searchPlaceholder: 'Buscar país...',
  heightPanel: 6,
  options: [
    {
      name: 'América',
      options: [
        { value: 'cl', label: 'Chile' },
        { value: 'ar', label: 'Argentina' },
        { value: 'br', label: 'Brasil' }
      ]
    },
    {
      name: 'Europa',
      options: [
        { value: 'es', label: 'España' },
        { value: 'fr', label: 'Francia' },
        { value: 'it', label: 'Italia' }
      ]
    }
  ]
};
\`\`\`

## Interacción con el formulario

El componente Selector interactúa con el formulario de la siguiente manera:

- Al seleccionar una opción, se actualiza el valor en el objeto formValues con el nombre especificado en la propiedad Nombre
- Si **multiple** no está checkado, el valor almacenado es una cadena de texto
- Si **multiple** está checkado, el valor almacenado es un arreglo de cadenas de texto o un arreglo de grupos con sus opciones seleccionadas

## Accesibilidad

El componente está diseñado siguiendo las mejores prácticas de accesibilidad:

- Soporte para navegación con teclado (flechas, Enter, Escape)
- Atributos ARIA apropiados para lectores de pantalla
- Alto contraste visual entre elementos seleccionados y no seleccionados
- Feedback visual claro para los estados de foco y selección

## Rendimiento

El componente utiliza técnicas de virtualización para manejar eficientemente grandes cantidades de opciones:

- Solo renderiza los elementos visibles en el viewport
- Optimiza el desempeño incluso con miles de opciones
- Implementa desplazamiento suave y eficiente
`;
