export const DATE_SHAPE = `# Componente Fecha

## Descripción

El componente Date permite seleccionar fechas en formularios dinámicos con una interfaz intuitiva de calendario. Ofrece la posibilidad de seleccionar una fecha individual o un rango de fechas, dependiendo de la configuración.

![Date picker](https://res.cloudinary.com/dbgzsikcs/image/upload/v1744674645/UAI/dynamic-form/date/date_Forms_edbiii.gif)

## Características principales

El componente Date en DynamicForm proporciona las siguientes funcionalidades:

- **Selección de fecha individual**: Permite seleccionar un día específico del calendario.
- **Selección de rango de fechas**: Permite seleccionar un período entre dos fechas cuando se habilita la opción de rango.
- **Navegación por meses**: Botones para avanzar y retroceder entre meses.
- **Visualización clara**: Resaltado de la fecha actual y las fechas seleccionadas.
- **Formato consistente**: Presentación de fechas en formato DD / MM / AAAA.
- **Validaciones integradas**: Soporte para campos requeridos y mensajes de error personalizados.
- **Personalización visual**: Clases CSS personalizables para adaptar el estilo.

## Propiedades principales

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| Nombre | texto | Nombre del campo para identificarlo en el formulario |
| Etiqueta | texto | Texto que se muestra como título del selector de fecha |
| Descripción | texto | Texto descriptivo opcional que aparece debajo del selector |
| Requerido | ticket | Indica si la selección de fecha es obligatoria |
| Mensaje de requerido | texto | Mensaje de error cuando el campo es requerido pero no se ha seleccionado una fecha |
| Es rango | ticket | Habilita la selección de un rango de fechas en lugar de una fecha individual |
| Deshabilitado | ticket | Deshabilita el selector impidiendo su interacción |
| Solo lectura | ticket | Permite ver la fecha seleccionada pero no modificarla |
| Valor por defecto | objeto | Valor inicial del campo (formato: {day: número, month: número, year: número}) |

## Formato de datos

### Fecha individual

Cuando se utiliza como selector de fecha individual, el valor seleccionado tiene el siguiente formato:

\`\`\`typescript
{
  day: número,    // Día del mes (1-31)
  month: número,  // Mes (1-12)
  year: número    // Año (formato completo, ej: 2025)
}
\`\`\`

### Rango de fechas

Cuando se habilita la opción de rango, el valor seleccionado tiene el siguiente formato:

\`\`\`typescript
{
    start: {
        day: número,    // Día inicial
        month: número,  // Mes inicial
        year: número    // Año inicial
    },
    end: {
        day: número,    // Día final
        month: número,  // Mes final
        year: número    // Año final
    }
}
\`\`\`

## Estilos personalizables

El componente Date permite personalizar tres elementos principales a través de clases CSS:

1. **Etiqueta**: Mediante la propiedad \`labelDateClass\`
2. **Contenedor del selector**: Mediante la propiedad \`boxDateClass\`
3. **Contenido del calendario**: Mediante la propiedad \`contentDateClass\`

Si no se especifican estilos personalizados, se utilizarán los estilos predeterminados definidos en el sistema.

## Validación

El componente Date incluye validación integrada:

- Si la propiedad \`required\` está establecida como \`true\`, debe seleccionarse una fecha o rango de fechas
- El mensaje de error se muestra a través de la propiedad \`msgRequired\` cuando el campo es requerido pero no se ha seleccionado una fecha
- La validación se activa al interactuar con el componente

## Interacción con el calendario

### Selección de fecha individual

1. Al hacer clic en el selector, se abre un calendario desplegable
2. Navega entre meses usando las flechas izquierda y derecha
3. Selecciona un día haciendo clic sobre él
4. Para deseleccionar una fecha, haz clic nuevamente sobre la fecha seleccionada
5. El calendario se cierra automáticamente al seleccionar una fecha

### Selección de rango de fechas

1. Al hacer clic en el selector, se abre un calendario desplegable
2. Selecciona la fecha de inicio haciendo clic sobre un día
3. Selecciona la fecha de fin haciendo clic sobre otro día
4. El rango entre ambas fechas se resaltará automáticamente
5. Para deseleccionar un rango, haz clic nuevamente sobre cualquiera de las fechas seleccionadas

## Estilos con Tailwind

![Tailwind date picker](https://res.cloudinary.com/dbgzsikcs/image/upload/v1744674740/UAI/dynamic-form/date/302ccb2d-c7d8-4f72-a168-faf32b70a153.png)

## Ejemplo de uso

\`\`\`typescript
// Definición de un selector de fecha individual
const birthdayPicker = {
    id: 'birthday-picker',
    name: 'birthday',
    shape: 'datepicker',
    label: 'Fecha de nacimiento',
    description: 'Selecciona tu fecha de nacimiento',
    required: true,
    msgRequired: 'La fecha de nacimiento es obligatoria',
    isRange: false,
    disabled: false,
    readonly: false
};

// Definición de un selector de rango de fechas
const vacationPicker = {
    id: 'vacation-picker',
    name: 'vacationPeriod',
    shape: 'datepicker',
    label: 'Período de vacaciones',
    description: 'Selecciona las fechas de inicio y fin de tus vacaciones',
    required: true,
    msgRequired: 'El período de vacaciones es obligatorio',
    isRange: true,
    disabled: false,
    readonly: false
};
\`\`\`

## Sistema de deshabilitación de fechas

El componente Date ofrece un sistema flexible para deshabilitar fechas específicas, lo que permite controlar qué días están disponibles para selección. Esta funcionalidad es útil para casos como:

- Bloquear fines de semana o días festivos
- Deshabilitar fechas ya reservadas
- Limitar selecciones a días laborables
- Establecer períodos de disponibilidad específicos

### Formas de deshabilitar fechas

Existen tres métodos principales para deshabilitar fechas:

1. **Fechas individuales**: Permite seleccionar días específicos para deshabilitar
2. **Rangos de fechas**: Permite deshabilitar todos los días dentro de un rango seleccionado
3. **Días de la semana**: Permite deshabilitar días específicos de la semana (ej: todos los lunes)

### Funcionamiento interno

El sistema de deshabilitación funciona mediante la propiedad \`invalidDates\`, que acepta un array de strings con fechas en formato ISO (YYYY-MM-DD). Estas fechas se marcan como no seleccionables en el calendario.

\`\`\`typescript
// Ejemplo de configuración con fechas deshabilitadas
const appointmentPicker = {
    id: 'appointment-picker',
    name: 'appointmentDate',
    shape: 'datepicker',
    label: 'Fecha de cita',
    required: true,
    // Deshabilitar fechas específicas
    invalidDates: [
        '2025-04-20',  // Domingo de Pascua
        '2025-05-01',  // Día del Trabajo
        '2025-12-25'   // Navidad
    ]
};
\`\`\`

### Interfaz de generación de fechas inválidas

El componente \`GenerateValidDates.svelte\` proporciona una interfaz visual para configurar fechas deshabilitadas:

![Generador de fechas inválidas](https://res.cloudinary.com/dbgzsikcs/image/upload/v1744920862/UAI/dynamic-form/date/c453afa0-04b9-4673-8e6f-a1117bf445bd.png)

Esta interfaz ofrece las siguientes opciones:

1. **Selector de rango**: Permite seleccionar un rango completo de fechas para deshabilitar
2. **Selector individual**: Permite añadir fechas específicas a la lista de fechas deshabilitadas
3. **Filtro por día de semana**: Permite especificar qué días de la semana se incluirán al generar fechas inválidas
4. **Lista de fechas deshabilitadas**: Muestra todas las fechas actualmente deshabilitadas con opción de eliminarlas individualmente
5. **Botón de limpieza**: Permite eliminar todas las fechas deshabilitadas de una vez

### Proceso de generación de fechas inválidas

1. Al seleccionar un rango de fechas, el sistema genera automáticamente una lista de todas las fechas dentro de ese rango
2. El sistema filtra estas fechas según los días de la semana seleccionados (por defecto, todos los días están seleccionados)
3. Las fechas resultantes se añaden al array \`invalidDates\`
4. También es posible añadir fechas individuales específicas mediante el selector de fecha individual
5. Todas las fechas deshabilitadas se muestran en una lista donde pueden ser eliminadas individualmente

#### ¿Cómo funcionan los checkboxes de los días de la semana?

Cuando se utiliza el selector de rango, se muestran checkboxes para cada día de la semana (lunes, martes, etc.). Estos checkboxes permiten elegir exactamente qué días serán considerados inválidos dentro del rango seleccionado. Por ejemplo, si solo seleccionas "sábado" y "domingo", únicamente los sábados y domingos dentro del rango serán agregados a la lista de fechas inválidas. Los demás días de la semana permanecerán válidos.

> **Importante:** Esta funcionalidad solo aplica al seleccionar un rango de fechas. Los días seleccionados en los checkboxes determinan qué fechas del rango serán invalidadas. Si no se selecciona ningún día, no se invalidará ninguna fecha del rango.

### Limitaciones adicionales

Además de las fechas deshabilitadas, el componente también admite:

- **Fecha mínima** (\`minValue\`): Establece la fecha más temprana que puede seleccionarse
- **Fecha máxima** (\`maxValue\`): Establece la fecha más tardía que puede seleccionarse

Estas propiedades complementan el sistema de fechas deshabilitadas para ofrecer un control preciso sobre el rango de selección disponible.

## Consideraciones adicionales

- El componente muestra los días de la semana en formato abreviado: Lu, Ma, Mi, Ju, Vi, Sa, Do
- La fecha actual se resalta con un punto en la parte superior
- Las fechas fuera del mes actual aparecen deshabilitadas
- Al pasar el cursor sobre las fechas en modo rango, se muestra una vista previa del rango que se seleccionaría
- El formato de visualización siempre es DD / MM / AAAA para mayor claridad
`;
