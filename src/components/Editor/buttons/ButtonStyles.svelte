<script lang="ts">
    import { v4 as uuid } from 'uuid';
    import { onMount } from 'svelte';

    import { VirtualSelect } from "$components";
    import { WIDTH, BASIC_SIZE, SHADOW, SIZE, RING } from '$lib/styles/';
    import { THEME } from '$lib/styles/themes/theme';
    import { COLORS } from '$lib/styles/colors';
    import { 
        UAITheme, 
        elegantTheme, 
        casualTheme, 
        markedTheme, 
        neutralTheme, 
        minimalTheme 
    }                                   from '$lib/styles/themes/';
    import Grid4Styles                  from '../inputs/Grid4Styles.svelte';
    import Grid5Styles                  from '../inputs/Grid5Styles.svelte';
    import InputRGBAColors              from '../inputs/InputRGBAColors.svelte';
    import { Accordion, Separator, Tabs } from 'bits-ui';
    
    import {
        themeShapeStore,
        updateThemeShape,
        updateHeight,
        updateFontSize,
        updateBorderRadius,
        updateBoxShadow,
        updateRingSize,
        themeColorStore,
        themeNameStore,
        updateThemeName,
        updateThemeColor,
    } from '$stores/theme-shape';
    import { CaretDownIcon } from '$icons';

    let colorTheme: 'light' | 'dark' = 'light';


    onMount(() => {
        if (!$themeShapeStore) {
            updateThemeShape(UAITheme($themeColorStore));
        }
    });
</script>

<div class="grid grid-cols-2 gap-2 items-center">
    <VirtualSelect
        value       = { $themeNameStore }
        shapeInput  = {{
            id          : uuid(),
            name        : 'theme',
            label       : 'Tema',
            placeholder : 'Ingrese el tema',
            search      : true,
            searchPlaceholder : 'Ingrese el tema',
            options     : THEME
        }}
        onSelectedChange = {( value ) => {
            if ( value instanceof Array || value === undefined ) return;
            updateThemeName( value );

            const color = {
                uai     : 'zinc',
                elegant : 'emerald',
                casual  : 'orange',
                marked  : 'rose',
                neutral : 'slate',
                minimal : 'sky',
                custom  : $themeColorStore
            }[value] || 'zinc';

            updateThemeColor( color );

            const theme = {
                uai     : UAITheme( color ),
                elegant : elegantTheme( color ),
                casual  : casualTheme( color ),
                marked  : markedTheme( color ),
                neutral : neutralTheme( color ),
                minimal : minimalTheme( color ),
                custom  : $themeShapeStore
            }[value] || UAITheme( color );

            updateThemeShape( theme );
        }}
    />

    <VirtualSelect
        value       = { $themeColorStore }
        shapeInput  = {{
            id          : uuid(),
            name        : 'themeColor',
            label       : 'Color',
            placeholder : 'Ingrese el color',
            search      : true,
            searchPlaceholder : 'Ingrese el color',
            options     : COLORS
        }}
        onSelectedChange = {( value ) => {
            if ( value instanceof Array || value === undefined ) return;

            updateThemeColor( value );

            const theme = {
                uai     : UAITheme( value ),
                elegant : elegantTheme( value ),
                casual  : casualTheme( value ),
                marked  : markedTheme( value ),
                neutral : neutralTheme( value ),
                minimal : minimalTheme( value ),
                custom  : $themeShapeStore
            }[$themeNameStore] || UAITheme( value );

            updateThemeShape( theme );
        }}
    />
</div>

<Accordion.Root class="w-full" type="single">
    <Accordion.Item value="styles" class="group border-b border-dark-10 px-1.5 dark:border-zinc-700">
        <Accordion.Header>
            <Accordion.Trigger
                class="flex w-full flex-1 items-center justify-between py-2 text-[15px] font-medium transition-all [&[data-state=open]>span>svg]:rotate-180 dark:text-zinc-300"
            >
                <h3 class="text-md font-semibold  text-zinc-700 dark:text-zinc-300">Controles de Estilo</h3>

                <span
                    class="inline-flex size-8 items-center justify-center rounded-[7px] bg-transparent transition-all hover:bg-dark-10"
                >
                    <CaretDownIcon />
                </span>
            </Accordion.Trigger>
        </Accordion.Header>

        <Accordion.Content class="pb-3 tracking-[-0.01em] space-y-2">
            <div class="grid grid-cols-1 @lg:grid-cols-2 @2xl:grid-cols-5 gap-4">
                <VirtualSelect
                    value       = { $themeShapeStore.height }
                    shapeInput  = {{
                        id          : uuid(),
                        name        : 'height',
                        label       : 'Altura',
                        placeholder : 'Seleccione una altura',
                        search      : true,
                        searchPlaceholder : 'Buscar altura',
                        options     : WIDTH
                    }}
                    onSelectedChange = {( value ) => {
                        if ( value instanceof Array || value === undefined ) return;
                        updateHeight(value);
                    }}
                />

                <VirtualSelect
                    value       = { $themeShapeStore.fontSize }
                    shapeInput  = {{
                        id          : uuid(),
                        name        : 'fontSize',
                        label       : 'Tamaño de Fuente',
                        placeholder : 'Seleccione un tamaño',
                        search      : true,
                        searchPlaceholder : 'Buscar tamaño',
                        options     : BASIC_SIZE('text')
                    }}
                    onSelectedChange = {( value ) => {
                        if ( value instanceof Array || value === undefined ) return;
                        updateFontSize(value);
                    }}
                />

                <VirtualSelect
                    value       = { $themeShapeStore.borderRadius }
                    shapeInput  = {{
                        id          : uuid(),
                        name        : 'borderRadius',
                        label       : 'Radio de Borde',
                        placeholder : 'Seleccione un radio',
                        search      : true,
                        searchPlaceholder : 'Buscar radio',
                        options     : SIZE('rounded')
                    }}
                    onSelectedChange = {( value ) => {
                        if ( value instanceof Array || value === undefined ) return;
                        updateBorderRadius(value);
                    }}
                />

                <VirtualSelect
                    value       = { $themeShapeStore.ringSize }
                    shapeInput  = {{
                        id                  : uuid(),
                        name                : 'ring',
                        label               : 'Ancho Borde',
                        placeholder         : 'Ancho del borde',
                        search              : true,
                        searchPlaceholder   : 'Ancho del borde',
                        options             : RING
                    }}
                    onSelectedChange = {( value ) => {
                        if ( value instanceof Array || value === undefined ) return;
                        updateRingSize(value);
                    }}
                />

                <VirtualSelect
                    value       = { $themeShapeStore.boxShadow }
                    shapeInput  = {{
                        id          : uuid(),
                        name        : 'boxShadow',
                        label       : 'Sombra',
                        placeholder : 'Seleccione una sombra',
                        search      : true,
                        searchPlaceholder : 'Buscar sombra',
                        options     : SHADOW
                    }}
                    onSelectedChange = {( value ) => {
                        if ( value instanceof Array || value === undefined ) return;
                        updateBoxShadow(value);
                    }}
                />
            </div>

            <Tabs.Root value={ colorTheme }>
                <Tabs.List
                    class="mt-1 rounded-lg bg-dark-10 shadow-mini-inset dark:bg-background grid w-full grid-cols-2 gap-1 p-1 text-sm font-semibold leading-[0.01em] border border-zinc-300 dark:border-zinc-700"
                >
                    <Tabs.Trigger
                        value="light"
                        class="data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-black text-black dark:text-zinc-400 h-8 dark:data-[state=active]:text-zinc-200 rounded-md bg-transparent py-2"
                        onclick={ () => colorTheme = 'light' }
                    >
                        Claro
                    </Tabs.Trigger>

                    <Tabs.Trigger
                        value="dark"
                        class="data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-black text-black dark:text-zinc-400 h-8 dark:data-[state=active]:text-zinc-200 rounded-md bg-transparent py-2"
                        onclick={ () => colorTheme = 'dark' }
                    >
                        Oscuro
                    </Tabs.Trigger>
                </Tabs.List>
            </Tabs.Root>

            <Grid4Styles>
                <InputRGBAColors
                    name = {"Fondo"}
                    {colorTheme}
                />
            </Grid4Styles>

            <Separator.Root
                orientation = "horizontal"
                class       = "w-full h-[1px] rounded-lg bg-primary dark:bg-zinc-700 my-4 @xl:my-1"
            />

            <Grid4Styles>
                <InputRGBAColors
                    name = {"Texto"}
                    {colorTheme}
                />
            </Grid4Styles>

            <Separator.Root
                orientation = "horizontal"
                class       = "w-full h-[1px] rounded-lg bg-primary dark:bg-zinc-700 my-4 @xl:my-1"
            />

            <Grid4Styles>
                <InputRGBAColors
                    name = "Borde"
                    {colorTheme}
                />
            </Grid4Styles>

            <Separator.Root
                orientation = "horizontal"
                class       = "w-full h-[1px] rounded-lg bg-primary dark:bg-zinc-700 my-4 @xl:my-1"
            />

            <Grid5Styles>
                <InputRGBAColors
                    name = "Foco Borde"
                    {colorTheme}
                />
            </Grid5Styles>

            <div class="flex items-center">
                <span class="w-52 text-md font-semibold text-zinc-700 dark:text-zinc-300">Colores secundarios</span>

                <Separator.Root
                    orientation = "horizontal"
                    class       = "w-full h-[1px] rounded-lg bg-primary dark:bg-zinc-700 my-4 @xl:my-1"
                />
            </div>

            <Grid4Styles>
                <InputRGBAColors
                    name = "Fondo Secundario"
                    {colorTheme}
                />
            </Grid4Styles>

            <Separator.Root
                orientation = "horizontal"
                class       = "w-full h-[1px] rounded-lg bg-primary dark:bg-zinc-700 my-4 @xl:my-1"
            />

            <Grid4Styles>
                <InputRGBAColors
                    name = "Texto Secundario"
                    {colorTheme}
                />
            </Grid4Styles>
        </Accordion.Content>
    </Accordion.Item>
</Accordion.Root>
