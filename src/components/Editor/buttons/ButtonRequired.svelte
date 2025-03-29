<script lang="ts">
    import { v4 as uuid } from "uuid";

    import { Input, VirtualSelect }             from "$components";
    import type { ShapeInput, Method }          from "$models";
    import { errorInput, errorSelect, methods } from "$lib";


    export let shapeInput: ShapeInput;
</script>

<div class="grid @lg:grid-cols-[1fr,2fr] grid-cols-1 gap-2 items-start">
    {#if shapeInput}
        {@const shapeVirtual = {
            id			: uuid(),
            label		: 'Método HTTP',
            name		: 'method',
            placeholder	: 'Selecciona el método',
            required 	: true,
            msgRequired : 'El método es requerido',
            selected	: shapeInput.method,
            multiple    : false,
            options		: methods,
            valid       : true,
        } as ShapeInput }
        <VirtualSelect
            shapeInput          = {{...shapeVirtual}}
            value               = {shapeVirtual.method}
            onSelectedChange    = {( value ) => {
                if (value instanceof Array || value === undefined) return;
                shapeInput.method = value as Method;
            }}
            setError = {() => shapeVirtual.valid = errorSelect(shapeVirtual, shapeInput.method )}
        />

        {@const shapeURL = {
            id			: uuid(),
            label		: 'URL de la API',
            name		: 'urlSend',
            placeholder	: 'Ingresa la URL de la API',
            value		: shapeInput.urlSend,
            required 	: true,
            shape       : 'input',
            type		: 'text',
            msgRequired : 'La URL es requerida',
            pattern     : '^https:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?$',
            msgPattern  : 'La URL debe tener el formato https://ejemplo.com',
            maxLength   : 255,
            msgMaxLength: 'La URL debe tener como máximo 255 caracteres',
            valid       : true,
        } as ShapeInput }
        <Input
            shapeInput = {{ ...shapeURL }}
            value      = { shapeInput.urlSend }
            onInput    = {( event ) => shapeInput.urlSend = ( event.target as HTMLInputElement ).value }
            setError   = {() => shapeURL.valid = errorInput( shapeURL, shapeInput.urlSend )}
        />
    {/if}
</div>