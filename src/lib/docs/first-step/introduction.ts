export const INTRODUCCION =  `# Introducción

DynamicForm es una potente herramienta para la creación y gestión de formularios dinámicos en aplicaciones web. Diseñada para simplificar el proceso de recolección de datos, esta biblioteca permite a los desarrolladores y usuarios finales crear formularios personalizados sin necesidad de escribir código.

## Características principales

- **Interfaz intuitiva**: Crea formularios complejos mediante una interfaz de arrastrar y soltar.
- **Componentes diversos**: Incluye una amplia variedad de elementos como campos de texto, casillas de verificación, selectores, fechas, horas, markdown y más.
- **Validación integrada**: Configura reglas de validación para cada campo (requerido, patrones, longitud mínima/máxima, etc.).
- **Vista previa en tiempo real**: Visualiza el formulario mientras lo construyes.
- **Personalización completa**: Adapta cada componente con estilos y comportamientos específicos.
- **Almacenamiento y reutilización**: Guarda tus formularios para usarlos posteriormente o compartirlos.

## Casos de uso

- Encuestas y cuestionarios
- Formularios de registro y contacto
- Recolección de datos estructurados
- Configuración de parámetros en aplicaciones
- Generación de documentos basados en plantillas


### Formulario dinámico
![Formulario dinámico](https://res.cloudinary.com/dbgzsikcs/image/upload/v1744144443/UAI/dynamic-form/introduction_bhp4ib.gif)
Esta es la vista general de un formulario básico, con casi todos los componentes disponibles.

### Eliminar un formulario
![Eliminar un formulario](https://res.cloudinary.com/dbgzsikcs/image/upload/v1744145473/UAI/dynamic-form/eliminar_formulario_yxvs3h.gif)

### Uso general
- Cada componente tiene un número para que te guies en cual componentes estás editando.
- Los componentes los puedes mover solo con arrastrar y soltar para acomodarlos donde más te acomoden.
- Todos los componentes tienen su propia configuración y ya están documentados.
- Todos son editables, puedes cambiar el nombre, el tipo, la validación, etc.
- Puedes eliminar el componente con el botón de eliminar.

## Tecnologías utilizadas

DynamicForm está construido con tecnologías modernas que permiten una experiencia fluida y reactiva:

- **Svelte**: Framework para construir interfaces de usuario con un enfoque en la reactividad y el rendimiento.
- **Tailwind CSS**: Framework de utilidades CSS que permite personalizar rápidamente el diseño sin salir del HTML.

### Personalización con Tailwind CSS

Tailwind CSS es un framework de CSS basado en utilidades que permite construir diseños personalizados sin salir del HTML. En DynamicForm, se utiliza Tailwind para estilizar los componentes y ofrecer opciones de personalización.

#### Cómo funciona en DynamicForm

Cada componente de formulario ('ShapeInput') incluye propiedades específicas para personalizar su apariencia mediante clases de Tailwind. Por ejemplo:

- **Input**: Utiliza 'inputClass' para personalizar el campo de entrada
- **Select**: Incluye 'boxSelectClass', 'contentSelectClass', 'itemSelectClass' para diferentes partes del componente
- **DatePicker**: Ofrece 'boxDateClass', 'contentDateClass', 'labelDateClass' para personalizar el selector de fechas

#### Ejemplos de personalización

\`\`\`javascript
// Personalizar un campo de entrada con bordes azules y enfoque púrpura
const inputPersonalizado = {
    id: "nombre",
    name: "nombre",
    shape: "input",
    label: "Nombre completo",
    inputClass: "border-blue-500 focus:ring-purple-500 rounded-lg"
};

// Personalizar un selector con fondo oscuro
const selectPersonalizado = {
    id: "opciones",
    name: "opciones",
    shape: "select",
    label: "Selecciona una opción",
    boxSelectClass: "bg-gray-800 text-white rounded-xl",
    itemSelectClass: "hover:bg-gray-700"
};
\`\`\`
Cada componente en la documentación incluye detalles sobre las propiedades de estilo disponibles y cómo utilizarlas con Tailwind CSS para personalizar completamente la apariencia de tus formularios.


`;