<script lang="ts">
    import { v4 as uuid } from 'uuid';

    import { TextArea }                     from "$components";
    import type { InputStyle, ShapeInput }  from "$models";
    import { styles }                       from "$lib";

    export let shapeInput: ShapeInput;

    const shape = styles[shapeInput.shape || 'none'] as InputStyle;

    shapeInput.boxSelectClass       ??= shape.box;
    shapeInput.contentSelectClass   ??= shape.content;
    shapeInput.itemSelectClass      ??= shape.item;
    shapeInput.groupSelectClass     ??= shape.group;
    shapeInput.inputSelectClass     ??= shape.input;
</script>

<TextArea
    shapeInput = {{
        id          : uuid(),
        name        : 'class',
        label       : 'Estilos de la caja',
        placeholder : 'Ingrese los estilos de la caja',
        rows        : 4,
    }}
    onInput = {( value: string ) => shapeInput.boxSelectClass = value }
    value = { shapeInput.boxSelectClass }
/>

<TextArea
    shapeInput = {{
        id          : uuid(),
        name        : 'class',
        label       : 'Estilos del contenido',
        placeholder : 'Ingrese los estilos del contenido',
        rows        : 2,
    }}
    onInput = {( value: string ) => shapeInput.contentSelectClass = value }
    value = { shapeInput.contentSelectClass }
/>

<TextArea
    shapeInput = {{
        id          : uuid(),
        name        : 'class',
        label       : 'Estilos de cada item',
        placeholder : 'Ingrese los estilos de cada item',
        rows        : 4,
    }}
    onInput = {( value: string ) => shapeInput.itemSelectClass = value }
    value = { shapeInput.itemSelectClass }
/>

<TextArea
    shapeInput = {{
        id          : uuid(),
        name        : 'class',
        label       : 'Estilos del grupo',
        placeholder : 'Ingrese los estilos del grupo',
        rows        : 3,
    }}
    onInput = {( value: string ) => shapeInput.groupSelectClass = value }
    value = { shapeInput.groupSelectClass }
/>

<TextArea
    shapeInput = {{
        id          : uuid(),
        name        : 'class',
        label       : 'Estilos del input',
        placeholder : 'Ingrese los estilos del input',
        rows        : 4,
    }}
    onInput = {( value: string ) => shapeInput.inputSelectClass = value }
    value = { shapeInput.inputSelectClass }
/>