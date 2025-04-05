<script lang="ts">
    import { TextArea } from "$components";
    import { v4 as uuid } from 'uuid';

    import type { InputStyle, ShapeInput } from "$models";
    import { styles } from "$lib";

    export let shapeInput: ShapeInput;
</script>


<TextArea
    shapeInput = {{
        id          : uuid(),
        name        : 'class',
        label       : 'Componente principal box',
        placeholder : 'Ingrese los estilos de la caja',
        rows        : 3,
        value       : shapeInput.class_ ?? ( styles.datepicker as InputStyle ).box
    }}
    onInput = {( event: Event ) => shapeInput.class_ = ( event.target as HTMLInputElement ).value }
/>

<TextArea
    shapeInput = {{
        id          : uuid(),
        name        : 'class',
        label       : 'Estilos del input',
        placeholder : 'Ingrese los estilos del input',
        rows        : 5,
        value       : shapeInput.inputStyle ?? ( styles.datepicker as InputStyle ).input
    }}
    onInput = {( event: Event ) => shapeInput.inputStyle = ( event.target as HTMLInputElement ).value }
/>

<TextArea
    shapeInput = {{
        id          : uuid(),
        name        : 'class',
        label       : 'Estilos del contenido',
        placeholder : 'Ingrese los estilos del contenido',
        rows        : 2,
        value       : shapeInput.contentStyle ?? ( styles.datepicker as InputStyle ).content
    }}
    onInput = {( event: Event ) => shapeInput.contentStyle = ( event.target as HTMLInputElement ).value }
/>

<TextArea
    shapeInput = {{
        id          : uuid(),
        name        : 'class',
        label       : 'Estilos del Item',
        placeholder : 'Ingrese los estilos del item',
        rows        : 2,
        value       : shapeInput.labelStyle ?? ( styles.datepicker as InputStyle ).item
    }}
    onInput = {( event: Event ) => shapeInput.labelStyle = ( event.target as HTMLInputElement ).value }
/>