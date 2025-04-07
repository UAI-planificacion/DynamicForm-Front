<script lang="ts">
    import { v4 as uuid } from 'uuid';

    import { TextArea } from "$components";
    import type { ShapeInput } from "$models";
    import { styles } from "$lib";

    export let shapeInput: ShapeInput;
</script>

<TextArea
    onInput     = {( value ) => shapeInput.inputClass = value }
    value       = { shapeInput.inputClass ?? ( styles.input as string ) }
    shapeInput  = {{
        id          : uuid(),
        name        : 'class',
        label       : 'Estilos con tailwind',
        placeholder : 'Ingrese los estilos',
        rows        : 4,
    }}
/>
