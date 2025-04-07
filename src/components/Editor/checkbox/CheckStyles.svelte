<script lang="ts">
    import { v4 as uuid } from "uuid";

    import type { ShapeInput, InputStyle }  from "$models";
    import { styles }                       from "$lib";
    import { TextArea }                     from "$components";

    export let shapeInput: ShapeInput;

    const shapeCheckBox = styles.check as InputStyle;

    shapeInput.boxCheckboxClass     ??= shapeCheckBox.box;
    shapeInput.labelCheckboxClass   ??= shapeCheckBox.label;
</script>

<!-- onInput = {( event: Event ) => shapeInput.boxCheckboxClass = ( event.target as HTMLInputElement ).value } -->
<TextArea
    shapeInput = {{
        id          : uuid(),
        name        : 'class',
        label       : 'Estilos del contenedor',
        placeholder : 'Ingrese los estilos',
        rows        : 4,
    }}
    onInput = {( value: string ) => shapeInput.boxCheckboxClass = value }
    value = { shapeInput.boxCheckboxClass }
/>

<TextArea
    shapeInput = {{
        id          : uuid(),
        name        : 'class',
        label       : 'Estilos del label',
        placeholder : 'Ingrese los estilos',
        rows        : 4,
    }}
    onInput = {( value: string ) => shapeInput.labelCheckboxClass = value }
    value = { shapeInput.labelCheckboxClass }
/>
