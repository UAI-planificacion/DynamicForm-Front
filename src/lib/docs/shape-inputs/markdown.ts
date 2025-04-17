export const MARKDOWN_SHAPE = `# Componente Markdown

## Descripción

El componente Markdown permite crear áreas de texto enriquecido con formato Markdown en formularios dinámicos. Ofrece una barra de herramientas intuitiva que facilita la aplicación de diferentes estilos y formatos de texto sin necesidad de conocer la sintaxis de Markdown.

![Editor Markdown](https://res.cloudinary.com/dbgzsikcs/image/upload/v1744675624/UAI/dynamic-form/markdown/Markdown_Forms_izwhsy.gif)

## Características principales

El componente Markdown en DynamicForm proporciona las siguientes funcionalidades:

- **Barra de herramientas completa**: Incluye botones para aplicar todos los formatos comunes de Markdown.
- **Vista previa en tiempo real**: Permite visualizar cómo se verá el texto con formato mientras se escribe.
- **Soporte para imágenes y enlaces**: Facilita la inserción de imágenes y enlaces con diálogos intuitivos.
- **Creación de tablas dinámicas**: Interfaz visual para crear tablas de diferentes tamaños.
- **Fórmulas matemáticas**: Soporte para notación matemática mediante sintaxis LaTeX.
- **Diseño responsive**: Se adapta a diferentes tamaños de pantalla con una interfaz optimizada para móviles.
- **Autocompletado de listas**: Continua automáticamente listas numeradas, con viñetas o checkboxes.

## Propiedades principales

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| Nombre | texto | Nombre del campo para identificarlo en el formulario |
| Etiqueta | texto | Texto que se muestra como título del editor |
| Descripción | texto | Texto descriptivo opcional que aparece debajo del editor |
| Requerido | ticket | Indica si es obligatorio completar el campo |
| Mensaje de requerido | texto | Mensaje de error cuando el campo es requerido pero está vacío |
| Vista previa | ticket | Habilita la vista previa del contenido con formato junto al editor |
| Altura mínima | texto | Altura mínima del editor (ej: '150px') |
| Deshabilitado | ticket | Deshabilita el editor impidiendo su interacción |
| Solo lectura | ticket | Permite ver el contenido pero no modificarlo |
| Modo dinámico | ticket | Adapta el diseño para funcionar mejor en interfaces dinámicas |

## Herramientas de formato disponibles

### Estilos de texto

| Herramienta | Icono | Descripción | Sintaxis |
|-------------|------|-------------|----------|
| Negrita | **B** | Aplica formato de texto en negrita | \`**texto**\` |
| Cursiva | *I* | Aplica formato de texto en cursiva | \`*texto*\` |
| Subrayado | ~~S~~ | Aplica formato de texto tachado | \`~~texto~~\` |

### Encabezados

El editor proporciona un menú desplegable para insertar encabezados de diferentes niveles:

| Nivel | Descripción | Sintaxis |
|-------|-------------|----------|
| Título 1 | Encabezado de primer nivel | \`# Título 1\` |
| Título 2 | Encabezado de segundo nivel | \`## Título 2\` |
| Título 3 | Encabezado de tercer nivel | \`### Título 3\` |
| Título 4 | Encabezado de cuarto nivel | \`#### Título 4\` |

### Listas

| Herramienta | Descripción | Sintaxis |
|-------------|-------------|----------|
| Lista numerada | Crea una lista con números | \`1. Elemento\` |
| Lista con viñetas | Crea una lista con viñetas | \`- Elemento\` |
| Lista con checkbox | Crea una lista con casillas de verificación | \`- [x] Completado\` o \`- [ ] Pendiente\` |

### Enlaces y medios

| Herramienta | Descripción | Sintaxis |
|-------------|-------------|----------|
| Enlace | Inserta un enlace a una URL | \`[texto del enlace](url)\` |
| Imagen | Inserta una imagen | \`![texto alternativo](url de la imagen)\` |
| Nota | Crea un bloque de cita o nota | \`> Texto de la nota\` |

### Elementos avanzados

| Herramienta | Descripción | Sintaxis |
|-------------|-------------|----------|
| Código | Inserta un bloque de código | \`\`\` console.log('hola'); \`\`\` |
| Fórmula | Inserta una fórmula matemática | \`$fórmula$\` |
| Tabla | Abre un generador de tablas interactivo | Ver ejemplo abajo |

\`| Encabezado | Encabezado |\`<br>\`| --- | --- |\`<br>\`| Celda | Celda |\`

## Generador de tablas

El componente incluye un generador de tablas visual que permite:

1. Seleccionar el número de filas y columnas arrastrando el cursor
2. Previsualizar la estructura de la tabla antes de insertarla
3. Generar automáticamente el código Markdown para la tabla
4. Solo con desplazar el mouse, se puede previsualizar la tabla hasta un máximo de 10x10 filas y columnas

![Generador de tablas](https://res.cloudinary.com/dbgzsikcs/image/upload/v1744927321/UAI/dynamic-form/markdown/table_iyl05f.gif)

## Funcionalidades especiales

### Autocompletado de listas

El editor detecta automáticamente cuando estás escribiendo en una lista y continúa el formato al presionar Enter:

- Para listas numeradas, incrementa automáticamente el número
- Para listas con viñetas o checkboxes, mantiene el mismo formato
- Si presionas Enter en un elemento vacío, finaliza la lista

### Soporte para fórmulas matemáticas

Puedes insertar fórmulas matemáticas utilizando la sintaxis LaTeX entre símbolos de dólar (\`$\`):

\`\`\`
$E = mc^2$
\`\`\`

Esto se renderizará como una fórmula matemática en la vista previa.

## Estilos personalizables

El componente Markdown permite personalizar su apariencia mediante clases CSS:

- **Contenedor del editor**: Mediante la propiedad \`boxMarkdownClass\`
- **Área de texto**: Mediante la propiedad \`textareaMarkdownClass\`
- **Vista previa**: Mediante la propiedad \`previewMarkdownClass\`

Si no se especifican estilos personalizados, se utilizarán los estilos predeterminados definidos en el sistema.

## Validación

El componente Markdown incluye validación integrada:

- Si la propiedad \`required\` está establecida como \`true\`, el campo no puede estar vacío
- El mensaje de error se muestra a través de la propiedad \`msgRequired\` cuando el campo es requerido pero está vacío

## Estilos con Tailwind

![Tailwind markdown](https://res.cloudinary.com/dbgzsikcs/image/upload/v1744926911/UAI/dynamic-form/markdown/d39eaa9b-2904-4720-820a-8379a94ddbf1.png)

## Ejemplo de uso

\`\`\`typescript
// Definición de un editor Markdown básico
const basicMarkdownEditor = {
    id: 'description-editor',
    name: 'description',
    shape: 'markdown',
    label: 'Descripción del producto',
    description: 'Utiliza el editor para dar formato a la descripción',
    required: true,
    msgRequired: 'La descripción es obligatoria',
    preview: true,
    minHeight: '200px',
    disabled: false,
    readonly: false
};

// Definición de un editor Markdown avanzado
const advancedMarkdownEditor = {
    id: 'article-editor',
    name: 'articleContent',
    shape: 'markdown',
    label: 'Contenido del artículo',
    description: 'Utiliza Markdown para dar formato a tu artículo',
    required: true,
    msgRequired: 'El contenido del artículo es obligatorio',
    preview: true,
    minHeight: '400px',
    dynamicMode: true,
    boxMarkdownClass: 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600',
    textareaMarkdownClass: 'prose dark:prose-invert max-w-none',
    previewMarkdownClass: 'prose dark:prose-invert max-w-none p-4'
};
\`\`\`

## Casos de uso recomendados

El componente Markdown es ideal para:

- **Descripciones de productos**: Permite dar formato a descripciones detalladas
- **Artículos y publicaciones**: Facilita la creación de contenido estructurado
- **Documentación técnica**: Perfecto para incluir código, tablas y fórmulas
- **Comentarios enriquecidos**: Permite a los usuarios dar formato a sus comentarios
- **Notas y apuntes**: Organiza información con diferentes niveles de encabezados y listas
`;
