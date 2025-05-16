export const THEME = `# Personalización de Temas

## Descripción

Los temas en Formulario Dinámico te permiten personalizar la apariencia visual de todos los componentes de tu formulario. Puedes modificar colores, tonalidades y opacidades para crear una experiencia visual coherente que se adapte a tu marca o preferencias.
Los estilos se aplican a todos los componentes del formulario solo debes cambiar en un solo lugar.

![Personalización de temas](https://res.cloudinary.com/dbgzsikcs/image/upload/v1747429928/UAI/dynamic-form/themes/Theme_light_kxebm8.gif)

> **Nota**: Formulario Dinámico incluye un tema predeterminado (UAI Theme) que se carga automáticamente, pero puedes personalizarlo completamente.

## Temas disponibles

Formulario Dinámico incluye una variedad de temas prediseñados que puedes utilizar inmediatamente. Cada tema viene con dos modos:

1. **Modo claro**: Diseñado para interfaces con fondo blanco o colores claros, ideal para uso diurno o entornos bien iluminados.
2. **Modo oscuro**: Optimizado para interfaces con fondo negro o colores oscuros, perfecto para uso nocturno o para reducir la fatiga visual.

Cada tema controla automáticamente la apariencia de todos los componentes del formulario, incluyendo botones, campos de entrada, selectores y más. El sistema cambia entre los modos claro y oscuro según las preferencias del usuario o la configuración del sistema.

![Modos de temas](https://res.cloudinary.com/dbgzsikcs/image/upload/v1747429689/UAI/dynamic-form/themes/Theme_darks_imbnhv.gif)

### Catálogo de temas

Estos son los temas prediseñados disponibles en Formulario Dinámico:

| Nombre del tema | Descripción | Características principales |
|----------------|-------------|-----------------------------|
| **UAI Theme** | Tema predeterminado del sistema | Diseño moderno con bordes redondeados y colores neutros. Este tema se carga automáticamente si no seleccionas otro. |
| **Minimal Theme** | Tema minimalista con líneas limpias | Bordes más redondeados, sombras sutiles y colores suaves que priorizan la legibilidad. |
| **Elegant Theme** | Tema elegante con detalles refinados | Bordes más definidos, tipografía estilizada y paleta de colores sofisticada. |
| **Casual Theme** | Tema informal y amigable | Colores vibrantes, bordes más redondeados y un aspecto general más relajado. |
| **Neutro Theme** | Tema neutro y versátil | Paleta de colores balanceada que se adapta bien a cualquier tipo de contenido. |
| **Marked Theme** | Tema con elementos destacados | Utiliza contrastes fuertes para resaltar elementos importantes del formulario. |

## Elementos personalizables

Puedes personalizar los siguientes elementos para cada tema (claro y oscuro):

### Colores de fondo

| Elemento | Descripción |
|----------|-------------|
| Color de fondo principal | Color base para el fondo de los componentes |
| Tonalidad | Intensidad del color (50-950) |
| Opacidad | Transparencia del color (0-100%) |

### Colores de texto

| Elemento | Descripción |
|----------|-------------|
| Color de texto principal | Color base para el texto en los componentes |
| Tonalidad | Intensidad del color (50-950) |
| Opacidad | Transparencia del texto (0-100%) |

### Colores secundarios

También puedes personalizar colores secundarios para fondos y textos, siguiendo el mismo patrón de color, tonalidad y opacidad.

### Bordes y efectos de enfoque

| Elemento | Descripción |
|----------|-------------|
| Color de borde | Color base para los bordes de los componentes |
| Tonalidad | Intensidad del color (50-950) |
| Opacidad | Transparencia del borde (0-100%) |
| Tamaño del borde | Grosor del borde cuando un elemento recibe el foco |

## Cómo personalizar un tema

### Paso 1: Accede al editor de temas

En el panel de edición de tu formulario, busca la sección "Temas" en el menú lateral.

![Acceso al editor de temas](https://res.cloudinary.com/dbgzsikcs/image/upload/v1747429366/UAI/dynamic-form/themes/Theme_custom_rb5mmu.gif)

### Paso 2: Selecciona el modo de tema

Elige si quieres personalizar el tema claro o el tema oscuro.

### Paso 3: Personaliza los colores

1. **Selecciona un color base**:
   - Haz clic en el selector de color para abrir la paleta
   - Elige un color de la lista o utiliza el selector de color personalizado

2. **Ajusta la tonalidad**:
   - Selecciona la intensidad del color (50 es muy claro, 950 es muy oscuro)

3. **Configura la opacidad**:
   - Elige el nivel de transparencia (100% es completamente opaco)

![Selector de color](https://res.cloudinary.com/dbgzsikcs/image/upload/v1747428274/UAI/dynamic-form/themes/Theme_custom_color_zzmt2d.gif)

### Paso 4: Previsualiza los cambios

Los cambios se aplican en tiempo real a todos los componentes del formulario, permitiéndote ver inmediatamente cómo afectan a la apariencia.

## Ejemplos de personalización

### Tema corporativo azul

**Tema claro:**
- Color de fondo principal: Azul, tonalidad 50, opacidad 100%
- Color de texto principal: Azul, tonalidad 900, opacidad 100%
- Color de borde: Azul, tonalidad 200, opacidad 100%

**Tema oscuro:**
- Color de fondo principal: Azul, tonalidad 900, opacidad 100%
- Color de texto principal: Azul, tonalidad 50, opacidad 100%
- Color de borde: Azul, tonalidad 700, opacidad 100%

### Tema minimalista gris

**Tema claro:**
- Color de fondo principal: Gris, tonalidad 50, opacidad 100%
- Color de texto principal: Gris, tonalidad 800, opacidad 100%
- Color de borde: Gris, tonalidad 200, opacidad 100%

**Tema oscuro:**
- Color de fondo principal: Gris, tonalidad 900, opacidad 100%
- Color de texto principal: Gris, tonalidad 100, opacidad 100%
- Color de borde: Gris, tonalidad 700, opacidad 100%

## Buenas prácticas

1. **Mantén un buen contraste**: Asegúrate de que exista suficiente contraste entre los colores de fondo y texto para garantizar la legibilidad.

2. **Sé consistente**: Utiliza colores complementarios que se relacionen con tu marca o propósito del formulario.

3. **Prueba ambos modos**: Verifica que tu personalización se vea bien tanto en el tema claro como en el oscuro.

4. **Considera la accesibilidad**: Elige combinaciones de colores que sean accesibles para personas con discapacidades visuales.

5. **Guarda tus temas**: Una vez que hayas creado un tema que te guste, guárdalo para poder reutilizarlo en otros formularios.
`;