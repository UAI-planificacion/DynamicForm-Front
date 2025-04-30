<script lang="ts">
    import { v4 as uuid }       from 'uuid';
    import { Separator, Tabs }  from 'bits-ui';

    import {
        WIDTH,
        BASIC_SIZE,
        SHADOW,
        SIZE,
        RING
    }                           from '$lib/styles/';
    import { VirtualSelect }    from '$components';
    import type { ShapeInput }  from "$models";
    import InputRbgaColors      from './InputRGBAColors.svelte';

    export let shapeInput: ShapeInput;

    let colorTheme: 'light' | 'dark' = 'light';

    shapeInput.inputStyle ??= {}
    
    if ( !shapeInput.inputStyle.light  ) {
        shapeInput.inputStyle.light ??= {}

        shapeInput.inputStyle.light.ringTransparency = '100'
        shapeInput.inputStyle.light.ringColor = 'currentColor'
        shapeInput.inputStyle.light.ringTonality = '500'
        shapeInput.inputStyle.light.ring = 'ring'

    //     shapeInput.inputStyle.light.borderTransparency = '100'
    // shapeInput.inputStyle.light.borderColor = 'currentColor'
    // shapeInput.inputStyle.light.borderTonality = '500'
    // shapeInput.inputStyle.light.border = 'border'

        shapeInput.inputStyle.light.colorTransparency = '100'
        shapeInput.inputStyle.light.colorColor = 'currentColor'
        shapeInput.inputStyle.light.colorTonality = '500'
        shapeInput.inputStyle.light.color = 'color'

        shapeInput.inputStyle.light.backgroundTransparency = '100'
        shapeInput.inputStyle.light.backgroundColor = 'currentColor'
        shapeInput.inputStyle.light.backgroundTonality = '500'
        shapeInput.inputStyle.light.background = 'background'

        shapeInput.inputStyle.light.event ??= {}
        shapeInput.inputStyle.light.event.focus ??= {}

        shapeInput.inputStyle.light.event.focus.ringColor = 'currentColor'
        shapeInput.inputStyle.light.event.focus.ringTonality = '500'
        shapeInput.inputStyle.light.event.focus.ringTransparency = '100'
        shapeInput.inputStyle.light.event.focus.ring = 'ring'
        shapeInput.inputStyle.light.event.focus.ringSize = '1px'

    // shapeInput.inputStyle.light.event.focus.borderColor = 'currentColor'
    // shapeInput.inputStyle.light.event.focus.borderTonality = '500'
    // shapeInput.inputStyle.light.event.focus.borderTransparency = '100'
    // shapeInput.inputStyle.light.event.focus.border = 'border'
    }
    if ( !shapeInput.inputStyle.dark ) {
        shapeInput.inputStyle.dark ??= {}

        shapeInput.inputStyle.dark.ringTransparency = '100'
        shapeInput.inputStyle.dark.ringColor = 'currentColor'
        shapeInput.inputStyle.dark.ringTonality = '500'
        shapeInput.inputStyle.dark.ring = 'ring'

    // shapeInput.inputStyle.dark.borderTransparency = '100'
    // shapeInput.inputStyle.dark.borderColor = 'currentColor'
    // shapeInput.inputStyle.dark.borderTonality = '500'
    // shapeInput.inputStyle.dark.border = 'border'

        shapeInput.inputStyle.dark.colorTransparency = '100'
        shapeInput.inputStyle.dark.colorColor = 'currentColor'
        shapeInput.inputStyle.dark.colorTonality = '500'
        shapeInput.inputStyle.dark.color = 'color'

        shapeInput.inputStyle.dark.backgroundTransparency = '100'
        shapeInput.inputStyle.dark.backgroundColor = 'currentColor'
        shapeInput.inputStyle.dark.backgroundTonality = '500'
        shapeInput.inputStyle.dark.background = 'background'

        shapeInput.inputStyle.dark.event ??= {}
        shapeInput.inputStyle.dark.event.focus ??= {}

        shapeInput.inputStyle.dark.event.focus.ringColor = 'currentColor'
        shapeInput.inputStyle.dark.event.focus.ringTonality = '500'
        shapeInput.inputStyle.dark.event.focus.ringTransparency = '100'
        shapeInput.inputStyle.dark.event.focus.ring = 'ring'
        shapeInput.inputStyle.dark.event.focus.ringSize = '1px'

    // shapeInput.inputStyle.dark.event.focus.borderColor = 'currentColor'
    // shapeInput.inputStyle.dark.event.focus.borderTonality = '500'
    // shapeInput.inputStyle.dark.event.focus.borderTransparency = '100'
    // shapeInput.inputStyle.dark.event.focus.border = 'border'

    }
</script>

<div class="grid grid-cols-1 @lg:grid-cols-2 @2xl:grid-cols-5 gap-2 items-start">
    <VirtualSelect
        value       = { shapeInput.inputStyle?.height?.replace( 'h-', '' )}
        shapeInput  = {{
            id          : uuid(),
            name        : 'height',
            label       : 'Alto',
            placeholder : 'Ingrese el alto',
            search      : true,
            searchPlaceholder : 'Ingrese el alto',
            options     : WIDTH
        }}
        onSelectedChange = {( value ) => {
            if ( value instanceof Array || value === undefined ) return;
            shapeInput.inputStyle ??= {};
            shapeInput.inputStyle.height = `h-${ value }`
        }}
    />

    <VirtualSelect
        value       = { shapeInput.inputStyle?.fontSize?.replace( 'text-', '' )}
        shapeInput  = {{
            id                  : uuid(),
            name                : 'fontSize',
            label               : 'Tamaño de texto',
            placeholder         : 'Ingrese el tamaño de texto',
            search              : true,
            searchPlaceholder   : 'Ingrese el tamaño de texto',
            options             : BASIC_SIZE
        }}
        onSelectedChange = {( value ) => {
            if ( value instanceof Array || value === undefined ) return;
            shapeInput.inputStyle ??= {};
            shapeInput.inputStyle.fontSize = `text-${ value }`
        }}
    />


    <VirtualSelect
        value       = { shapeInput.inputStyle?.borderRadius?.replace( 'rounded-', '' )}
        shapeInput  = {{
            id                  : uuid(),
            name                : 'rounded',
            label               : 'Redondeado',
            placeholder         : 'Ingrese el redondeado',
            search              : true,
            searchPlaceholder   : 'Ingrese el redondeado',
            options             : SIZE
        }}
        onSelectedChange = {( value ) => {
            if ( value instanceof Array || value === undefined ) return;
            shapeInput.inputStyle ??= {};
            shapeInput.inputStyle.borderRadius = `rounded-${ value }`
        }}
    />

    <VirtualSelect
        value       = { shapeInput.inputStyle?.boxShadow?.replace( 'shadow-', '' )}
        shapeInput  = {{
            id                  : uuid(),
            name                : 'box-shadow',
            label               : 'Sombras',
            placeholder         : 'Ingrese la sombra',
            search              : true,
            searchPlaceholder   : 'Ingrese la sombra',
            options             : SHADOW
        }}
        onSelectedChange = {( value ) => {
            if ( value instanceof Array || value === undefined ) return;
            shapeInput.inputStyle ??= {};
            shapeInput.inputStyle.boxShadow = `shadow-${ value }`
        }}
    />

    <!-- <VirtualSelect
        value       = { shapeInput.inputStyle?.borderSize?.replace( 'border-', '' )}
        shapeInput  = {{
            id                  : uuid(),
            name                : 'border',
            label               : 'Tamaño',
            placeholder         : 'Ingrese el tamaño',
            search              : true,
            searchPlaceholder   : 'Ingrese el tamaño',
            options             : BORDER
        }}
        onSelectedChange = {( value ) => {
            if ( value instanceof Array || value === undefined ) return;
            shapeInput.inputStyle ??= {};
            shapeInput.inputStyle.borderSize = `border-${ value }`
        }}
    /> -->

    <VirtualSelect
        value       = { shapeInput.inputStyle?.ringSize}
        shapeInput  = {{
            id                  : uuid(),
            name                : 'ring',
            label               : 'Anillo',
            placeholder         : 'Ingrese el anillo',
            search              : true,
            searchPlaceholder   : 'Ingrese el anillo',
            options             : RING
        }}
        onSelectedChange = {( value ) => {
            if ( value instanceof Array || value === undefined ) return;
            shapeInput.inputStyle ??= {};
            shapeInput.inputStyle.ringSize = value
            console.log('🚀 ~ file: InputStyles.svelte:129 ~ shapeInput.inputStyle.ringSize:', shapeInput.inputStyle.ringSize)
        }}
    />
</div>

<Tabs.Root value={ colorTheme }>
    <Tabs.List
        class="mt-1 rounded-lg bg-dark-10 shadow-mini-inset dark:bg-background grid w-full grid-cols-2 gap-1 p-1 text-sm font-semibold leading-[0.01em] border border-zinc-300 dark:border-zinc-700"
    >
        <Tabs.Trigger
            value   = "light"
            class   = "data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-black text-black dark:text-zinc-400 h-8 dark:data-[state=active]:text-zinc-200 rounded-md bg-transparent py-2"
            onclick = { () => colorTheme = 'light' }
        >
            Claro
        </Tabs.Trigger>

        <Tabs.Trigger
            value   = "dark"
            class   = "data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-black text-black dark:text-zinc-400 h-8 dark:data-[state=active]:text-zinc-200 rounded-md bg-transparent py-2"
            onclick = { () => colorTheme = 'dark' }
        >
            Oscuro
        </Tabs.Trigger>
    </Tabs.List>
</Tabs.Root>

<!-- <div class="grid"> -->
    <InputRbgaColors
        name = {"Fondo"}
        bind:color={ shapeInput.inputStyle![colorTheme]!.backgroundColor as string }
        bind:tonality={ shapeInput.inputStyle![colorTheme]!.backgroundTonality as string }
        bind:transparency={ shapeInput.inputStyle![colorTheme]!.backgroundTransparency as string }
        bind:type={ shapeInput.inputStyle![colorTheme]!.background as string}
    />

    <Separator.Root
        orientation = "horizontal"
        class       = "w-full h-[1px] rounded-lg bg-primary dark:bg-zinc-700 my-4 @xl:my-1"
    />

    <InputRbgaColors
        name = {"Texto"}
        bind:color={ shapeInput.inputStyle![colorTheme]!.colorColor as string }
        bind:tonality={ shapeInput.inputStyle![colorTheme]!.colorTonality as string }
        bind:transparency={ shapeInput.inputStyle![colorTheme]!.colorTransparency as string }
        bind:type={ shapeInput.inputStyle![colorTheme]!.color as string}
    />

    <Separator.Root
        orientation = "horizontal"
        class       = "w-full h-[1px] rounded-lg bg-primary dark:bg-zinc-700 my-4 @xl:my-1"
    />

    <!-- <InputRbgaColors
        name = {"Borde"}
        bind:color={ shapeInput.inputStyle![colorTheme]!.borderColor as string }
        bind:tonality={ shapeInput.inputStyle![colorTheme]!.borderTonality as string }
        bind:transparency={ shapeInput.inputStyle![colorTheme]!.borderTransparency as string }
        bind:type={ shapeInput.inputStyle![colorTheme]!.border as string}
    /> -->

    <Separator.Root
        orientation = "horizontal"
        class       = "w-full h-[1px] rounded-lg bg-primary dark:bg-zinc-700 my-4 @xl:my-1"
    />

    <InputRbgaColors
        name = "Anillo"
        bind:color={ shapeInput.inputStyle![colorTheme]!.ringColor as string }
        bind:tonality={ shapeInput.inputStyle![colorTheme]!.ringTonality as string }
        bind:transparency={ shapeInput.inputStyle![colorTheme]!.ringTransparency as string }
        bind:type={ shapeInput.inputStyle![colorTheme]!.ring as string}
    />
<!-- </div> -->

<Separator.Root
        orientation = "horizontal"
        class       = "w-full h-[1px] rounded-lg bg-primary dark:bg-zinc-700 my-4 @xl:my-1"
    />


    <InputRbgaColors
        name = "Foco Borde"
        bind:color={ shapeInput.inputStyle![colorTheme]!.event!.focus!.ringColor as string }
        bind:tonality={ shapeInput.inputStyle![colorTheme]!.event!.focus!.ringTonality as string }
        bind:transparency={ shapeInput.inputStyle![colorTheme]!.event!.focus!.ringTransparency as string }
        bind:type={ shapeInput.inputStyle![colorTheme]!.event!.focus!.ring as string}
        bind:size={ shapeInput.inputStyle![colorTheme]!.event!.focus!.ringSize as string}

    />
    <!-- <InputRbgaColors
        name = "Focus Border"
        bind:color={ shapeInput.inputStyle![colorTheme]!.event!.focus!.borderColor as string }
        bind:tonality={ shapeInput.inputStyle![colorTheme]!.event!.focus!.borderTonality as string }
        bind:transparency={ shapeInput.inputStyle![colorTheme]!.event!.focus!.borderTransparency as string }
        bind:type={ shapeInput.inputStyle![colorTheme]!.event!.focus!.border as string}
    /> -->

<!-- TODO: hay que crear los eventos para :hover, :focus, :disabled -->
