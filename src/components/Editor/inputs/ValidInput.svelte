<script lang="ts">
    import { v4 as uuid } from 'uuid';

    import type { ShapeInput }  from "$models";
    import { Input }            from "$components";
    import { errorInput }       from "$lib";


    export let shapeInput: ShapeInput;
    

    shapeInput.msgPattern = 'Patrón de búsqueda no coincide'

    const minLengthShape = {
        id		    : uuid(),
        label       : 'Largo mínimo',
        name	    : 'min-length',
        placeholder : 'Ingresa el largo mínimo de caracteres',
        value       : String( shapeInput.minLength ),
        type        : 'number',
        shape       : 'input',
        valid       : true,
        min         : 1,
        max         : 255,
        msgMin      : 'El campo es inferior a 1 caracter permitido.',
        msgMax      : 'El campo es superior a los 255 caracteres permitidos.'
    } as ShapeInput;


    const minLenthMssgShape = {
        id		        : uuid(),
        label           : 'Mensaje largo mínimo',
        name	        : 'msg-min-length',
        placeholder     : 'Ingresa el mensaje para largo mínimo',
        disabled        : ( shapeInput.minLength ?? 0 ) <= 0,
        value           : shapeInput.msgMinLength,
        shape           : 'input',
        valid           : true,
        minLength       : 1,
        maxLength       : 255,
        msgMinLength    : 'El campo inferior a los 0 caracteres permitidos.',
        msgMaxLength    : 'El campo superior a los 255 caracteres permitidos.'
    } as ShapeInput;
</script>

{#if shapeInput.type !== 'number' ||  shapeInput.shape === 'textarea' || shapeInput.shape === 'markdown' }
    <Input
        shapeInput  = { minLengthShape }
        value       = { String( shapeInput.minLength || '' ) }
        setError    = { () =>  minLengthShape.valid = errorInput( minLengthShape, shapeInput.minLength?.toString()) }
        onInput     = {( event: Event ) => shapeInput.minLength = Number(( event.target as HTMLInputElement ).value )}
    />

    <Input
        shapeInput  = {{ ...minLenthMssgShape,
            disabled: ( shapeInput.minLength ?? 0 ) <= 0,
        }}
        value       = { shapeInput.msgMinLength }
        setError    = { () => minLenthMssgShape.valid = (shapeInput.msgMinLength ?? '').length > 0 }
        onInput     = {( event: Event ) => shapeInput.msgMinLength = ( event.target as HTMLInputElement ).value }
    />

    <Input
        shapeInput = {{
            id		    : uuid(),
            label       : 'Largo máximo',
            name	    : 'max-length',
            placeholder : 'Ingresa el largo máximo de caracteres',
            value       : String( shapeInput.maxLength ),
            type        : 'number'
        }}
        onInput = {( event: Event ) => shapeInput.maxLength = Number(( event.target as HTMLInputElement ).value )}
    />

    <Input
        shapeInput = {{
            id		    : uuid(),
            label       : 'Mensaje largo máximo',
            name	    : 'msg-max-length',
            placeholder : 'Ingresa el mensaje para largo máximo',
            disabled    : (shapeInput.maxLength ?? 0) <= 0,
            value       : shapeInput.msgMaxLength,
        }}
        onInput = {( event: Event ) => shapeInput.msgMaxLength = ( event.target as HTMLInputElement ).value }
    />

    {#if shapeInput.type !== 'number' && shapeInput.shape === 'input' }
        <Input
            shapeInput = {{
                id		    : uuid(),
                label       : 'Patrón de búsqueda',
                name	    : 'pattern',
                placeholder : 'Ingresa el patrón permitido',
                value       : shapeInput.pattern,
                type        : 'text'
            }}
            onInput = {( event: Event ) => shapeInput.pattern = ( event.target as HTMLInputElement ).value }
        />

        <Input
            shapeInput = {{
                id		    : uuid(),
                label       : 'Mensaje patrón de búsqueda',
                name	    : 'msg-pattern',
                placeholder : 'Ingresa el mensaje para patrón de búsqueda requerido',
                disabled    : !shapeInput.pattern,
                value       : shapeInput.msgPattern,
                valid       : true,
                minLength   : 1,
                maxLength   : 100,
                msgMinLength: 'El campo inferior a los 1 caracteres permitidos.',
                msgMaxLength: 'El campo superior a los 100 caracteres permitidos.'
            }}
            onInput = {( event: Event ) => shapeInput.msgPattern = ( event.target as HTMLInputElement ).value }
        />
    {/if}

{:else}
    <Input
        shapeInput = {{
            id		    : uuid(),
            label       : 'Cantidad mínima',
            name	    : 'min',
            placeholder : 'Ingresa el mínimo permitido',
            value       : String( shapeInput.min ),
            type        : 'number'
        }}
        onInput = {( event: Event ) => shapeInput.min = Number(( event.target as HTMLInputElement ).value )}
    />

    <Input
        shapeInput = {{
            id		    : uuid(),
            label       : 'Mensaje mínimo',
            name	    : 'msg-min',
            placeholder : 'Ingresa el mensaje para el mínimo requerido',
            disabled    : (shapeInput.min ?? 0) <= 0,
            value       : shapeInput.msgMin,
        }}
        onInput = {( event: Event ) => shapeInput.msgMin = ( event.target as HTMLInputElement ).value }
    />

    <Input
        shapeInput = {{
            id		    : uuid(),
            label       : 'Cantidad máxima',
            name	    : 'max',
            placeholder : 'Ingresa el máximo permitido',
            value       : String( shapeInput.max ),
            type        : 'number'
        }}
        onInput = {( event: Event ) => shapeInput.max = Number(( event.target as HTMLInputElement ).value )}
    />

    <Input
        shapeInput = {{
            id		    : uuid(),
            label       : 'Mensaje máximo',
            name	    : 'msg-max',
            placeholder : 'Ingresa el mensaje para máximo requerido',
            disabled    : (shapeInput.max ?? 0) <= 0,
            value       : shapeInput.msgMax,
        }}
        onInput = {( event: Event ) => shapeInput.msgMax = ( event.target as HTMLInputElement ).value }
    />

{/if}