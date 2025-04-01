<script lang="ts">
    import { v4 as uuid } from 'uuid';

    import { TextArea }                     from "$components";
    import type { InputStyle, ShapeInput }  from "$models";
    import { styles }                       from "$lib";

    export let shapeInput: ShapeInput;
</script>

<TextArea
    shapeInput = {{
        id          : uuid(),
        name        : 'class',
        label       : 'Componente principal box',
        placeholder : 'Ingrese los estilos de la caja',
        rows        : 3,
        value       : shapeInput.class_ ?? ( styles[shapeInput.shape || 'none'] as InputStyle ).box
    }}
    onInput = {( event: Event ) => shapeInput.class_ = ( event.target as HTMLInputElement ).value }
/>

<TextArea
    shapeInput = {{
        id          : uuid(),
        name        : 'class',
        label       : 'Estilos del contenido',
        placeholder : 'Ingrese los estilos del contenido',
        rows        : 2,
        value       : shapeInput.contentStyle ?? ( styles[shapeInput.shape || 'none'] as InputStyle ).content
    }}
    onInput = {( event: Event ) => shapeInput.contentStyle = ( event.target as HTMLInputElement ).value }
/>

<TextArea
    shapeInput = {{
        id          : uuid(),
        name        : 'class',
        label       : 'Estilos de cada item',
        placeholder : 'Ingrese los estilos de cada item',
        rows        : 2,
        value       : shapeInput.itemStyle ?? ( styles[shapeInput.shape || 'none'] as InputStyle ).item
    }}
    onInput = {( event: Event ) => shapeInput.itemStyle = ( event.target as HTMLInputElement ).value }
/>