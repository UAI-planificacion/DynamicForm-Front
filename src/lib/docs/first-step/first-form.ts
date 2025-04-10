export const FIRST_FORM = `# Tu Primer Formulario

Crear un formulario básico con DynamicForm es sencillo y rápido. En esta guía, aprenderás a crear un formulario simple con un campo de texto y el botón de envío que viene por defecto.

![Nuevo formulario](https://res.cloudinary.com/dbgzsikcs/image/upload/v1744233999/UAI/dynamic-form/nuevo_formulario_jjwnku.gif)
Esta es la forma de crear un nuevo formulario.

## Paso 1: Accede al creador de formularios

Una vez que hayas iniciado sesión en la aplicación, navega a la sección de formularios dinámicos. Verás una interfaz con dos opciones principales:

- **Crear un nuevo formulario**
- **Editar un formulario existente**

Selecciona "Nuevo formulario" para comenzar desde cero.

## Paso 2: Configura el formulario

1. **Asigna un nombre al formulario**:

- En el campo superior, escribe un nombre descriptivo para tu formulario (por ejemplo, "Formulario de contacto").

2. **Agrega un campo de entrada**:

- Haz clic en el botón "+" para agregar un nuevo elemento al formulario.
- En el panel de edición, selecciona "input" como tipo de componente.
- Configura las propiedades básicas:
- **Nombre**: Asigna un nombre único al campo (por ejemplo, "email").
- **Etiqueta**: Escribe el texto que verá el usuario (por ejemplo, "Correo electrónico").
- **Tipo**: Selecciona el tipo de entrada (por ejemplo, "email").
- **Requerido**: Marca esta opción si el campo es obligatorio.
- **Mensaje requerido**: Escribe el mensaje de error que se mostrará si el campo está vacío.

## Paso 3: El botón predeterminado

El formulario incluye por defecto un botón de envío al final. No necesitas crear uno nuevo, ya que DynamicForm lo agrega automáticamente. Sin embargo, debes personalizarlo:

1. Selecciona el componente "button" en la lista de elementos.
2. Modifica sus propiedades:

- **Etiqueta**: Cambia el texto del botón (por ejemplo, "Enviar formulario").
- **URL de envío**: Configura la URL donde se enviarán los datos (Requerido).
- **Método HTTP**: Selecciona el método para enviar los datos (GET, POST, PUT, DELETE) (Requerido).

## Paso 4: Previsualiza tu formulario

En cualquier momento durante la creación, puedes alternar entre el modo de edición y el modo de vista previa:

1. Prueba la interacción con los campos y verifica que las validaciones funcionen correctamente.
2. Regresa al modo de edición si necesitas hacer ajustes deslizando la barra.
3. Puedes desactivar el modo editor y ver el formulario como un usuario.

![Nuevo formulario](https://res.cloudinary.com/dbgzsikcs/image/upload/v1744235442/UAI/dynamic-form/dynamic_mode_formulario_zmxzri.gif)
Esta es la forma de ver el formulario como un usuario.


## Paso 5: Guarda tu formulario

Una vez que estés satisfecho con tu formulario:

1. Haz clic en el botón "Guardar".
2. Tu formulario se guardará y estará disponible para su uso o edición posterior.

## Ejemplo de código

Aquí tienes un ejemplo de la estructura de datos que representa un formulario básico con un campo de correo electrónico y el botón predeterminado:

\`\`\`javascript
const formularioBasico = {
    _id: "",  // Se generará automáticamente al guardar
    name: "Formulario de contacto",
    user_email: "tu@email.com",
    details: [
        {
        id: "email-field-id",
        name: "email",
        shape: "input",
        label: "Correo electrónico",
        type: "email",
        placeholder: "Ingresa tu correo electrónico",
        required: true,
        msgRequired: "El correo electrónico es requerido"
        },
        // El botón predeterminado ya está incluido
        // No necesitas agregarlo manualmente
    ]
}
\`\`\`
¡Felicidades! Has creado tu primer formulario dinámico. A medida que te familiarices con la herramienta, podrás crear formularios más complejos con múltiples tipos de campos y validaciones avanzadas.
`;