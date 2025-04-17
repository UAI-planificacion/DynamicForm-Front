export const TIME_SHAPE = `# Componente Tiempo

## Descripción

El componente Tiempo permite seleccionar horas y minutos en formularios dinámicos con dos interfaces diferentes: digital y analógica. Ofrece una experiencia intuitiva para la selección de horarios, con opciones para limitar las horas y minutos disponibles.

![Selector de tiempo](https://res.cloudinary.com/dbgzsikcs/image/upload/v1744676285/UAI/dynamic-form/time/time_Forms_asun8n.gif)

## Características principales

El componente Tiempo en DynamicForm proporciona las siguientes funcionalidades:

- **Dos modos de visualización**: Digital (listas desplegables) o Analógico (interfaz de reloj).
- **Selección precisa**: Permite elegir horas (0-23) y minutos (0-59) con facilidad.
- **Rangos personalizables**: Posibilidad de limitar las horas y minutos disponibles.
- **Formato consistente**: Presentación de tiempo en formato HH:MM (24 horas).
- **Validaciones integradas**: Soporte para campos requeridos y mensajes de error personalizados.
- **Personalización visual**: Clases CSS personalizables para adaptar el estilo.
- **Experiencia mejorada**: No muestra errores de validación hasta que el usuario interactua con el componente.

## Modos de visualización

### Modo Digital

El modo digital presenta dos listas desplegables: una para horas y otra para minutos. Este modo es ideal para la selección rápida y precisa de horarios.

![Modo Digital](https://res.cloudinary.com/dbgzsikcs/image/upload/v1744923665/UAI/dynamic-form/time/59be487e-9782-4aeb-a7e4-1dff91ae243c.png)

### Modo Analógico

El modo analógico muestra un reloj interactivo que permite seleccionar horas y minutos de forma visual. Primero se seleccionan las horas y luego los minutos, con la opción de alternar entre AM y PM.

![Modo Analógico](https://res.cloudinary.com/dbgzsikcs/image/upload/v1744676407/UAI/dynamic-form/time/d9a1500a-c52e-4940-ae72-d5ad61ddae2d.png)

## Propiedades principales

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| Nombre | texto | Nombre del campo para identificarlo en el formulario |
| Etiqueta | texto | Texto que se muestra como título del selector de tiempo |
| Descripción | texto | Texto descriptivo opcional que aparece debajo del selector |
| Requerido | ticket | Indica si la selección de tiempo es obligatoria |
| Mensaje de requerido | texto | Mensaje de error cuando el campo es requerido pero no se ha seleccionado un tiempo |
| Modo analógico | ticket | Habilita la interfaz de reloj analógico en lugar de la digital |
| Lista de horas | array | Array de números que define las horas disponibles (0-23) |
| Lista de minutos | array | Array de números que define los minutos disponibles (0-59) |
| Valor por defecto | objeto | Valor inicial del campo (formato: \`{hour: número, minute: número}\`) |
| Deshabilitado | ticket | Deshabilita el selector impidiendo su interacción |
| Solo lectura | ticket | Permite ver el tiempo seleccionado pero no modificarlo |

## Formato de datos

El valor seleccionado en el componente Tiempo tiene el siguiente formato:

\`\`\`typescript
{
  hour: número,    // Hora (0-23)
  minute: número   // Minutos (0-59)
}
\`\`\`

Este formato se utiliza tanto en el modo digital como en el analógico, y facilita el procesamiento posterior de los datos de tiempo.

## Generación de rangos de tiempo

Una característica poderosa del componente Tiempo es la capacidad de generar rangos personalizados de horas y minutos disponibles. Esto permite limitar las opciones a intervalos específicos, como:

- Horas laborales (9-17)
- Intervalos de 15 minutos (0, 15, 30, 45)
- Horas pares o impares
- Cualquier combinación personalizada

### Configuración de rangos

Para configurar los rangos de tiempo, se utilizan los siguientes parámetros:

| Parámetro | Descripción |
|------------|-------------|
| Valor mínimo | El valor mínimo del rango (0-23 para horas, 0-59 para minutos) |
| Valor máximo | El valor máximo del rango (0-23 para horas, 0-59 para minutos) |
| Paso | El intervalo entre valores consecutivos |

Por ejemplo, para generar horas laborales con intervalos de 30 minutos:

- Horas: Mínimo = 9, Máximo = 17, Paso = 1
- Minutos: Mínimo = 0, Máximo = 30, Paso = 30

Esto generaría las siguientes opciones:
- Horas: 9, 10, 11, 12, 13, 14, 15, 16, 17
- Minutos: 0, 30
- El botón con el ícono de 24 es para generar las horas.
- El botón con el ícno de 15 es para generar los minutos.

![Generador de rangos](https://res.cloudinary.com/dbgzsikcs/image/upload/v1744927951/UAI/dynamic-form/time/generate_times_pcwumt.gif)

- Puedes ir generando un rango de cada 2, 3 o 5 horas.
- Puedes ir generando un rango de cada 15 minutos.


## Estilos personalizables

El componente Tiempo permite personalizar su apariencia mediante clases CSS, con diferentes opciones según el modo seleccionado:

### Modo Digital

- **Contenedor**: Mediante la propiedad \`boxDigitalClass\`
- **Contenido del menú desplegable**: Mediante la propiedad \`contentDigitalClass\`
- **Elementos de la lista**: Mediante la propiedad \`itemDigitalClass\`
- **Campo de entrada**: Mediante la propiedad \`inputDigitalClass\`

### Modo Analógico

- **Contenedor**: Mediante la propiedad \`boxAnalogicClass\`
- **Contenido del reloj**: Mediante la propiedad \`contentAnalogicClass\`
- **Elementos del reloj**: Mediante la propiedad \`itemAnalogicClass\`

Si no se especifican estilos personalizados, se utilizarán los estilos predeterminados definidos en el sistema.

## Validación

El componente Tiempo incluye validación integrada:

- Si la propiedad \`required\` está establecida como \`true\`, debe seleccionarse una hora y un minuto
- El mensaje de error se muestra a través de la propiedad \`msgRequired\` cuando el campo es requerido pero no se ha seleccionado un tiempo
- La validación se activa solo después de que el usuario haya interactuado con el componente, evitando mostrar errores prematuramente

## Estilos con Tailwind

![Tailwind time picker](https://res.cloudinary.com/dbgzsikcs/image/upload/v1744926211/UAI/dynamic-form/time/d3c498db-403a-47de-828c-9584ff562f29.png)

## Ejemplo de uso

\`\`\`typescript
// Definición de un selector de tiempo digital básico
const basicDigitalTime = {
    id: 'appointment-time',
    name: 'appointmentTime',
    shape: 'timepicker',
    label: 'Hora de la cita',
    description: 'Selecciona la hora de tu cita',
    required: true,
    msgRequired: 'La hora de la cita es obligatoria',
    time: {
        isAnalogic: false,
        hourList: [9, 10, 11, 12, 13, 14, 15, 16, 17],
        minuteList: [0, 15, 30, 45]
    },
    disabled: false,
    readonly: false
};

// Definición de un selector de tiempo analógico
const analogTime = {
    id: 'meeting-time',
    name: 'meetingTime',
    shape: 'timepicker',
    label: 'Hora de la reunión',
    description: 'Selecciona la hora de la reunión',
    required: true,
    msgRequired: 'La hora de la reunión es obligatoria',
    time: {
        isAnalogic: true,
        hourList: [10, 11, 12, 13, 14, 15],
        minuteList: [0, 30]
    },
    boxAnalogicClass: 'bg-blue-50 dark:bg-blue-900 border-blue-300 dark:border-blue-700',
    contentAnalogicClass: 'bg-white dark:bg-gray-800 shadow-xl',
    disabled: false,
    readonly: false
};
\`\`\`

## Casos de uso recomendados

El componente Tiempo es ideal para:

- **Programación de citas**: Permite a los usuarios seleccionar horarios disponibles
- **Reservas**: Ideal para sistemas de reserva de recursos por horas
- **Recordatorios**: Configuración de horarios para notificaciones o alarmas
- **Horarios laborales**: Registro de entradas y salidas
- **Planificación**: Organización de eventos o actividades con horarios específicos

## Consideraciones adicionales

- El componente utiliza el formato de 24 horas internamente, aunque el modo analógico muestra AM/PM para facilitar la selección
- La lista de horas y minutos puede estar vacía, lo que permite seleccionar cualquier valor dentro del rango válido
- Para mejorar la experiencia del usuario, el componente no muestra mensajes de error hasta que el usuario haya interactuado con él
- En dispositivos móviles, el modo digital puede ser más fácil de usar que el analógico
`;
