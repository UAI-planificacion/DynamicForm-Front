<script lang="ts">
    import { v4 as uuid } from 'uuid';

    import type { InputStyle, ShapeInput }  from "$models";
    import { TextArea }                     from "$components";
    import { styles }                       from "$lib";

    export let shapeInput: ShapeInput;

    const shape = styles[shapeInput.shape || 'none'] as InputStyle;

    shapeInput.boxDateClass     ??= shape.box;
    shapeInput.contentDateClass ??= shape.content;
    shapeInput.labelDateClass   ??= shape.label;
    shapeInput.itemDateClass    ??= shape.item;
    shapeInput.rangeDateClass   ??= shape.rangeItem;
</script>

<TextArea
    shapeInput = {{
        id          : uuid(),
        name        : 'class',
        label       : 'Estilos de la caja',
        placeholder : 'Ingrese los estilos de la caja',
        rows        : 4,
    }}
    onInput = {( event: Event ) => shapeInput.boxDateClass = ( event.target as HTMLInputElement ).value }
    value = { shapeInput.boxDateClass }
/>

<TextArea
    shapeInput = {{
        id          : uuid(),
        name        : 'class',
        label       : 'Estilos del panel',
        placeholder : 'Ingrese los estilos del panel',
        rows        : 2,
    }}
    onInput = {( event: Event ) => shapeInput.contentDateClass = ( event.target as HTMLInputElement ).value }
    value = { shapeInput.contentDateClass }
/>

<TextArea
    shapeInput = {{
        id          : uuid(),
        name        : 'class',
        label       : 'Estilos de la etiqueta',
        placeholder : 'Ingrese los estilos de la etiqueta',
        rows        : 2,
    }}
    onInput = {( event: Event ) => shapeInput.labelDateClass = ( event.target as HTMLInputElement ).value }
    value = { shapeInput.labelDateClass }
/>

{#if shapeInput.isRange === true}
    <TextArea
        shapeInput = {{
            id          : uuid(),
            name        : 'class',
            label       : 'Estilos del rango',
            placeholder : 'Ingrese los estilos del rango',
            rows        : 10,
        }}
        onInput = {( event: Event ) => shapeInput.rangeDateClass = ( event.target as HTMLInputElement ).value }
        value = { shapeInput.rangeDateClass }
    />
{:else}
    <TextArea
        shapeInput = {{
            id          : uuid(),
            name        : 'class',
            label       : 'Estilos del item',
            placeholder : 'Ingrese los estilos del item',
            rows        : 7,
        }}
        onInput = {( event: Event ) => shapeInput.itemDateClass = ( event.target as HTMLInputElement ).value }
        value = { shapeInput.itemDateClass }
    />
{/if}
