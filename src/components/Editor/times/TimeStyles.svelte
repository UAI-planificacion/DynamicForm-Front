<script lang="ts">
    import { v4 as uuid } from 'uuid';
    
    import type {
        InputStyle,
        ShapeInput
    }                   from "$models";
    import { styles }   from "$lib";
    import { TextArea } from "$components";


    export let shapeInput: ShapeInput;


    const shapeDigital  = styles.digital as InputStyle;
    const shapeAnalogic = styles.analogic as InputStyle;

    // Digital
    shapeInput.boxDigitalClass      ??= shapeDigital.box;
    shapeInput.contentDigitalClass  ??= shapeDigital.content;
    shapeInput.itemDigitalClass     ??= shapeDigital.item;
    shapeInput.inputDigitalClass    ??= shapeDigital.input;

    // Analogic
    shapeInput.boxAnalogicClass     ??= shapeAnalogic.box;
    shapeInput.contentAnalogicClass ??= shapeAnalogic.content;
    shapeInput.itemAnalogicClass    ??= shapeAnalogic.item;
</script>

{#if !shapeInput.time?.isAnalogic}
    <TextArea
        shapeInput = {{
            id          : uuid(),
            name        : 'class',
            label       : 'Estilos de la caja',
            placeholder : 'Ingrese los estilos de la caja',
            rows        : 5,
        }}
        onInput = {( value: string ) => shapeInput.boxDigitalClass = value }
        value = { shapeInput.boxDigitalClass }
    />

    <TextArea
        shapeInput = {{
            id          : uuid(),
            name        : 'class',
            label       : 'Estilos del contenido',
            placeholder : 'Ingrese los estilos del contenido',
            rows        : 2,
        }}
        onInput = {( value ) => shapeInput.contentDigitalClass = value }
        value = { shapeInput.contentDigitalClass }
    />

    <TextArea
        shapeInput = {{
            id          : uuid(),
            name        : 'class',
            label       : 'Estilos del Item',
            placeholder : 'Ingrese los estilos del item',
            rows        : 3,
        }}
        onInput = {( value ) => shapeInput.itemDigitalClass = value }
        value = { shapeInput.itemDigitalClass }
    />

    <TextArea
        shapeInput = {{
            id          : uuid(),
            name        : 'class',
            label       : 'Estilos del input',
            placeholder : 'Ingrese los estilos del input',
            rows        : 4,
        }}
        onInput = {( value ) => shapeInput.inputDigitalClass = value }
        value = { shapeInput.inputDigitalClass }
    />
{:else}
    <TextArea
        shapeInput = {{
            id          : uuid(),
            name        : 'class',
            label       : 'Estilos de la caja',
            placeholder : 'Ingrese los estilos de la caja',
            rows        : 5,
        }}
        onInput = {( value ) => shapeInput.boxAnalogicClass = value }
        value = { shapeInput.boxAnalogicClass }
    />

    <TextArea
        shapeInput = {{
            id          : uuid(),
            name        : 'class',
            label       : 'Estilos del contenido',
            placeholder : 'Ingrese los estilos del contenido',
            rows        : 2,
        }}
        onInput = {( value ) => shapeInput.contentAnalogicClass = value }
        value = { shapeInput.contentAnalogicClass }
    />

    <TextArea
        shapeInput = {{
            id          : uuid(),
            name        : 'class',
            label       : 'Estilos del item',
            placeholder : 'Ingrese los estilos del item',
            rows        : 5,
        }}
        onInput = {( value ) => shapeInput.itemAnalogicClass = value }
        value = { shapeInput.itemAnalogicClass }
    />
{/if}