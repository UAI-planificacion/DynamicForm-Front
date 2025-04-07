<script lang="ts">
    import { v4 as uuid } from 'uuid';

    import type { ShapeInput }  from "$models";
    import { Input }            from "$components";
    import { errorInput }       from "$lib";


    export let shapeInput   : ShapeInput;
    export let countSend    : number;
    export let isValid      : boolean;

    $: if ( countSend ) {
        if ( shapeInput.type === 'number' ) {
            minShape.valid        = errorInput( minShape, String( shapeInput.min ) );
            minMssgShape.valid    = errorInput( minMssgShape, shapeInput.msgMin );
            maxShape.valid        = errorInput( maxShape, String( shapeInput.max ) );
            maxMssgShape.valid    = errorInput( maxMssgShape, shapeInput.msgMax );

            isValid = minShape.valid
            && minMssgShape.valid
            && maxShape.valid
            && maxMssgShape.valid;
        }
        else {
            minLengthShape.valid        = errorInput( minLengthShape, String( shapeInput.minLength ) );
            minLengthMssgShape.valid    = errorInput( minLengthMssgShape, shapeInput.msgMinLength );
            maxLengthShape.valid        = errorInput( maxLengthShape, String( shapeInput.maxLength ) );
            maxLengthMssgShape.valid    = errorInput( maxLengthMssgShape, shapeInput.msgMaxLength );
            patternShape.valid          = errorInput( patternShape, shapeInput.pattern );
            patternMssgShape.valid      = errorInput( patternMssgShape, shapeInput.msgPattern );

            isValid = minLengthShape.valid
            && minLengthMssgShape.valid
            && maxLengthShape.valid
            && maxLengthMssgShape.valid
            && patternShape.valid
            && patternMssgShape.valid;
        }
    }


    shapeInput.msgPattern   = 'Patrón de búsqueda no coincide';
    shapeInput.msgMin       = 'El campo es inferior a 1 caracter permitido.';
    shapeInput.msgMax       = 'El campo es superior a los 255 caracteres permitidos.';


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


    const minLengthMssgShape = {
        id		        : uuid(),
        label           : 'Mensaje largo mínimo',
        name	        : 'msg-min-length',
        placeholder     : 'Ingresa el mensaje para largo mínimo',
        disabled        : ( shapeInput.minLength ?? 0 ) <= 0,
        value           : shapeInput.msgMinLength,
        shape           : 'input',
        type            : 'text',
        required        : true,
        msgRequired     : 'El campo es requerido.',
        valid           : true,
        minLength       : 2,
        maxLength       : 100,
        msgMinLength    : 'El campo inferior a los 2 caracteres permitidos.',
        msgMaxLength    : 'El campo superior a los 100 caracteres permitidos.'
    } as ShapeInput;


    const maxLengthShape = {
        id		    : uuid(),
        label       : 'Largo máximo',
        name	    : 'max-length',
        placeholder : 'Ingresa el largo máximo de caracteres',
        value       : String( shapeInput.maxLength ),
        type        : 'number',
        shape       : 'input',
        valid       : true,
        min         : 1,
        max         : 255,
        msgMin      : 'El campo es inferior a 1 caracter permitido.',
        msgMax      : 'El campo es superior a los 255 caracteres permitidos.'
    } as ShapeInput;


    const maxLengthMssgShape = {
        id				: uuid(),
        label           : 'Mensaje largo máximo',
        name			: 'msg-max-length',
        placeholder     : 'Ingresa el mensaje para largo máximo',
        disabled        : ( shapeInput.maxLength ?? 0 ) <= 0,
        value           : shapeInput.msgMaxLength,
        shape           : 'input',
        type            : 'text',
        required        : true,
        msgRequired     : 'El campo es requerido.',
        valid           : true,
        minLength       : 2,
        maxLength       : 100,
        msgMinLength    : 'El campo inferior a los 2 caracteres permitidos.',
        msgMaxLength    : 'El campo superior a los 100 caracteres permitidos.'
    } as ShapeInput;


    const patternShape = {
        id				: uuid(),
        label           : 'Patrón',
        name			: 'pattern',
        placeholder     : 'Ingresa el patrón',
        value           : shapeInput.pattern,
        shape           : 'input',
        type            : 'text',
        valid           : true,
        minLength       : 2,
        maxLength       : 200,
        pattern         : '^(?:\\\.|[^\s\\])(?:\\\.|[^\\])*$',
        msgPattern      : 'El patrón es inválido.',
        msgMinLength    : 'El campo inferior a los 2 caracteres permitidos.',
        msgMaxLength    : 'El campo superior a los 200 caracteres permitidos.'
    } as ShapeInput;


    const patternMssgShape = {
        id				: uuid(),
        label           : 'Mensaje patrón',
        name			: 'msg-pattern',
        placeholder     : 'Ingresa el mensaje para patrón',
        disabled        : ( shapeInput.pattern ?? '' ).length <= 0,
        value           : shapeInput.msgPattern,
        shape           : 'input',
        type            : 'text',
        required        : (shapeInput.pattern?.length ?? 0) > 0,
        msgRequired     : 'El campo es requerido.',
        valid           : true,
        minLength       : 2,
        maxLength       : 100,
        msgMinLength    : 'El campo inferior a los 2 caracteres permitidos.',
        msgMaxLength    : 'El campo superior a los 100 caracteres permitidos.'
    } as ShapeInput;


    const minShape = {
        id		    : uuid(),
        label       : 'Cantidad mínima',
        name	    : 'min',
        placeholder : 'Ingresa el mínimo permitido',
        value       : String( shapeInput.min ),
        type        : 'number',
        shape       : 'input',
        valid       : true,
        min         : 1,
        max         : 999,
        msgMin      : 'El campo es inferior a 1 caracter permitido.',
        msgMax      : 'El campo es superior a los 999 permitidos.'
    } as ShapeInput;


    const maxShape = {
        id		    : uuid(),
        label       : 'Cantidad máxima',
        name	    : 'max',
        placeholder : 'Ingresa el máximo permitido',
        value       : String( shapeInput.max ),
        type        : 'number',
        shape       : 'input',
        valid       : true,
        min         : 1,
        max         : 999,
        msgMin      : 'El campo es inferior a 1 caracter permitido.',
        msgMax      : 'El campo es superior a los 999 permitidos.'
    } as ShapeInput;


    const minMssgShape = {
        id		        : uuid(),
        label           : 'Mensaje mínimo',
        name	        : 'msg-min',
        placeholder     : 'Ingresa el mensaje para el mínimo requerido',
        value           : shapeInput.msgMin,
        disabled        : (shapeInput.min ?? 0) <= 0,
        type            : 'text',
        shape           : 'input',
        required        : (shapeInput.min ?? 0) > 0,
        msgRequired     : 'El campo es requerido.',
        valid           : true,
        minLength       : 2,
        maxLength       : 100,
        msgMinLength    : 'El campo inferior a los 2 caracteres permitidos.',
        msgMaxLength    : 'El campo superior a los 100 caracteres permitidos.'
    } as ShapeInput;


    const maxMssgShape = {
        id		        : uuid(),
        label           : 'Mensaje máximo',
        name	        : 'msg-max',
        placeholder     : 'Ingresa el mensaje para máximo requerido',
        disabled        : (shapeInput.max ?? 0) <= 0,
        value           : shapeInput.msgMax,
        type            : 'text',
        shape           : 'input',
        required        : (shapeInput.max ?? 0) > 0,
        msgRequired     : 'El campo es requerido.',
        valid           : true,
        minLength       : 2,
        maxLength       : 100,
        msgMinLength    : 'El campo inferior a los 2 caracteres permitidos.',
        msgMaxLength    : 'El campo superior a los 100 caracteres permitidos.'
    } as ShapeInput;
</script>

{#if shapeInput.type !== 'number' ||  shapeInput.shape === 'textarea' || shapeInput.shape === 'markdown' }
    <Input
        shapeInput  = { minLengthShape }
        onInput     = {( value ) => shapeInput.minLength = Number( value )}
        value       = { String( shapeInput.minLength || '' ) }
        setError    = { () =>  minLengthShape.valid = errorInput( minLengthShape, shapeInput.minLength?.toString()) }
    />

    <Input
        shapeInput  = {{
            ...minLengthMssgShape,
            disabled: ( shapeInput.minLength ?? 0 ) <= 0,
            required: ( shapeInput.minLength ?? 0 ) > 0,
        }}
        onInput     = {( value ) => shapeInput.msgMinLength = value }
        value       = { shapeInput.msgMinLength }
        setError    = { () => minLengthMssgShape.valid = errorInput( minLengthMssgShape, shapeInput.msgMinLength || undefined )}
    />

    <Input
        shapeInput  = {{ ...maxLengthShape }}
        onInput     = {( value ) => shapeInput.maxLength = Number( value )}
        value       = { String( shapeInput.maxLength || '' )}
        setError    = { () => maxLengthShape.valid = errorInput( maxLengthShape, shapeInput.maxLength?.toString() )}
    />

    <Input
        shapeInput  = {{
            ...maxLengthMssgShape,
            disabled: ( shapeInput.maxLength ?? 0 ) <= 0,
            required: ( shapeInput.maxLength ?? 0 ) > 0,
        }}
        onInput     = {( value ) => shapeInput.msgMaxLength = value }
        value       = { shapeInput.msgMaxLength }
        setError    = { () => maxLengthMssgShape.valid = errorInput( maxLengthMssgShape, shapeInput.msgMaxLength || undefined )}
    />

    {#if shapeInput.type !== 'number' && shapeInput.shape === 'input' }
        <Input
            shapeInput  = {{ ...patternShape }}
            onInput     = {( value ) => shapeInput.pattern = value }
            value       = { shapeInput.pattern }
            setError    = { () => patternShape.valid = errorInput( patternShape, shapeInput.pattern || undefined )}
        />

        <Input
            shapeInput  = {{...patternMssgShape, disabled: !shapeInput.pattern, required: ( shapeInput.pattern?.length ?? 0) > 0 }}
            onInput     = {( value ) => shapeInput.msgPattern = value }
            value       = { shapeInput.msgPattern }
            setError    = { () => patternMssgShape.valid = errorInput(
                { ...patternMssgShape, required: ( shapeInput.pattern?.length ?? 0)  > 0 },
                shapeInput.msgPattern
            )}
        />
    {/if}

{:else}
    <Input
        shapeInput  = {{ ...minShape }}
        onInput     = {( value ) => shapeInput.min = Number(value) }
        setError    = { () => minShape.valid = errorInput( minShape, shapeInput.min?.toString() )}
        value       = { String( shapeInput.min || '' )}
    />

    <Input
        shapeInput  = {{ ...minMssgShape,
            disabled: ( shapeInput.min ?? 0 ) <= 0,
            required: ( shapeInput.min ?? 0 ) > 0
        }}
        onInput     = {( value ) => shapeInput.msgMin = value }
        value       = { shapeInput.msgMin }
        setError    = { () => minMssgShape.valid = errorInput({
            ...minMssgShape, required: ( shapeInput.min ?? 0 ) > 0 },
            shapeInput.msgMin
        )}
    />

    <Input
        shapeInput  = {{...maxShape}}
        onInput     = {( value ) => shapeInput.max = Number(value) }
        setError    = { () => maxShape.valid = errorInput( maxShape, shapeInput.max?.toString() )}
        value       = { String( shapeInput.max || '' )}
    />

    <Input
        shapeInput  = {{ ...maxMssgShape,
            disabled: ( shapeInput.max ?? 0 ) <= 0,
            required: ( shapeInput.max ?? 0 ) > 0
        }}
        onInput     = {( value ) => shapeInput.msgMax = value }
        value       = { shapeInput.msgMax }
        setError    = { () => maxMssgShape.valid = errorInput(
            { ...maxMssgShape, required: ( shapeInput.max ?? 0 ) > 0 },
            shapeInput.msgMax
        )}
    />
{/if}
