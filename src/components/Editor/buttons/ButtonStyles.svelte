<script lang="ts">
    import { v4 as uuid } from 'uuid';

    import { InputStyles, TextArea } from "$components";
    import type { ShapeInput } from "$models";
    import { styles } from "$lib";

    export let shapeInput: ShapeInput;
</script>

<TextArea
    onInput     = {( value ) => shapeInput.buttonClass = value }
    value       = { shapeInput.buttonClass ?? ( styles.button as string )}
    shapeInput  = {{
        id          : uuid(),
        name        : 'class',
        label       : 'Estilos con tailwind',
        placeholder : 'Ingrese los estilos',
        rows        : 4,
    }}
/>


<InputStyles bind:shapeInput={shapeInput} />
