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
    import { inputUAITheme }    from '$lib/styles/themes/uai-theme';

    export let shapeInput: ShapeInput;

    let colorTheme: 'light' | 'dark' = 'light';

    shapeInput.inputStyle ??= inputUAITheme;
</script>

<div class="grid grid-cols-1 @lg:grid-cols-2 @2xl:grid-cols-5 gap-2 items-start h-8">
    <VirtualSelect
        value       = { shapeInput.inputStyle?.height }
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
            shapeInput.inputStyle!.height = value;
        }}
    />

    <VirtualSelect
        value       = { shapeInput.inputStyle?.fontSize }
        shapeInput  = {{
            id                  : uuid(),
            name                : 'fontSize',
            label               : 'Tamaño de texto',
            placeholder         : 'Ingrese el tamaño de texto',
            search              : true,
            searchPlaceholder   : 'Ingrese el tamaño de texto',
            options             : BASIC_SIZE('text')
        }}
        onSelectedChange = {( value ) => {
            if ( value instanceof Array || value === undefined ) return;
            shapeInput.inputStyle!.fontSize = value;
        }}
    />

    <VirtualSelect
        value       = { shapeInput.inputStyle?.borderRadius }
        shapeInput  = {{
            id                  : uuid(),
            name                : 'rounded',
            label               : 'Redondeado',
            placeholder         : 'Ingrese el redondeado',
            search              : true,
            searchPlaceholder   : 'Ingrese el redondeado',
            options             : SIZE('rounded')
        }}
        onSelectedChange = {( value ) => {
            if ( value instanceof Array || value === undefined ) return;
            shapeInput.inputStyle!.borderRadius = value;
        }}
    />

    <VirtualSelect
        value       = { shapeInput.inputStyle?.boxShadow}
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
            shapeInput.inputStyle!.boxShadow = value;
        }}
    />

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
            shapeInput.inputStyle!.ringSize = value;
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

<InputRbgaColors
    name = "Anillo"
    bind:color={ shapeInput.inputStyle![colorTheme]!.ringColor as string }
    bind:tonality={ shapeInput.inputStyle![colorTheme]!.ringTonality as string }
    bind:transparency={ shapeInput.inputStyle![colorTheme]!.ringTransparency as string }
    bind:type={ shapeInput.inputStyle![colorTheme]!.ring as string}
/>

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
