<script lang="ts">
    import { v4 as uuid } from "uuid";

    import type { ShapeInput, InputStyle }  from "$models";
    import { styles }                       from "$lib";
    import { TextArea }                     from "$components";

    export let shapeInput: ShapeInput;

    const shapeMarkdown = styles.markdown as InputStyle;

    shapeInput.boxMarkdownClass     ??= shapeMarkdown.box;
    shapeInput.inputMarkdownClass   ??= shapeMarkdown.input;
</script>

<TextArea
    shapeInput = {{
        id          : uuid(),
        name        : 'class',
        label       : 'Estilos del contenedor',
        placeholder : 'Ingrese los estilos',
        rows        : 2,
    }}
    onInput = {( value: string ) => shapeInput.boxMarkdownClass = value }
    value = { shapeInput.boxMarkdownClass }
/>

<TextArea
    shapeInput = {{
        id          : uuid(),
        name        : 'class',
        label       : 'Estilos del input',
        placeholder : 'Ingrese los estilos',
        rows        : 2,
    }}
    onInput = {( value: string ) => shapeInput.inputMarkdownClass = value }
    value = { shapeInput.inputMarkdownClass }
/>
