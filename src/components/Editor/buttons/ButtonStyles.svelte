<script lang="ts">
    import { v4 as uuid } from 'uuid';

    import { InputStyles, TextArea, VirtualSelect } from "$components";
    import type { ShapeInput } from "$models";
    import { THEME } from '$lib/styles/themes/theme';
    import { COLORS } from '$lib/styles/colors';

    import {
        UAITheme,
        elegantTheme,
        casualTheme,
        markedTheme,
        neutralTheme,
        minimalTheme
    } from '$lib/styles/themes/';

    export let shapeInput: ShapeInput;


    shapeInput.inputStyle = UAITheme();

</script>

<!-- <TextArea
    onInput     = {( value ) => shapeInput.buttonClass = value }
    value       = { shapeInput.buttonClass ?? ( styles.button as string )}
    shapeInput  = {{
        id          : uuid(),
        name        : 'class',
        label       : 'Estilos con tailwind',
        placeholder : 'Ingrese los estilos',
        rows        : 4,
    }}
/> -->

<div class="grid grid-cols-2 gap-2 items-center">
    <VirtualSelect
        value       = { shapeInput.themeName }
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
            shapeInput.themeName= value;
            shapeInput.inputStyle = {
                uai     : UAITheme(),
                elegant : elegantTheme(),
                casual  : casualTheme(),
                marked  : markedTheme(),
                neutral : neutralTheme(),
                minimal : minimalTheme()
            }[value];
        }}
    />

    <VirtualSelect
        value       = { shapeInput.themeColor }
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
            shapeInput.themeColor = value;
        }}
    />
</div>

<InputStyles bind:shapeInput={shapeInput} />
