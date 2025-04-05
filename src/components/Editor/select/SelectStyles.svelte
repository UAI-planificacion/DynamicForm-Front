<script lang="ts">
    import { v4 as uuid } from 'uuid';

    import { TextArea }                     from "$components";
    import type { InputStyle, ShapeInput }  from "$models";
    import { styles }                       from "$lib";

    export let shapeInput: ShapeInput;

    const shape = styles[shapeInput.shape || 'none'] as InputStyle;

    shapeInput.boxSelectClass       = shapeInput.boxSelectClass     ?? shape.box;
    shapeInput.contentSelectClass   = shapeInput.contentSelectClass ?? shape.content;
    shapeInput.itemSelectClass      = shapeInput.itemSelectClass    ?? shape.item;
    shapeInput.groupSelectClass     = shapeInput.groupSelectClass   ?? shape.group;
    shapeInput.inputSelectClass     = shapeInput.inputSelectClass   ?? shape.input;
</script>

<TextArea
    shapeInput = {{
        id          : uuid(),
        name        : 'class',
        label       : 'Estilos de la caja',
        placeholder : 'Ingrese los estilos de la caja',
        rows        : 4,
    }}
    onInput = {( event: Event ) => shapeInput.boxSelectClass = ( event.target as HTMLInputElement ).value }
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
    onInput = {( event: Event ) => shapeInput.contentSelectClass = ( event.target as HTMLInputElement ).value }
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
    onInput = {( event: Event ) => shapeInput.itemSelectClass = ( event.target as HTMLInputElement ).value }
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
    onInput = {( event: Event ) => shapeInput.groupSelectClass = ( event.target as HTMLInputElement ).value }
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
    onInput = {( event: Event ) => shapeInput.inputSelectClass = ( event.target as HTMLInputElement ).value }
    value = { shapeInput.inputSelectClass }
/>