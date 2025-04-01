<script lang="ts">
    import { v4 as uuid } from "uuid";

	import type { Http, ShapeInput, ShapeOption, Types }    from '$models';
    import { ButtonUI, Input, VirtualSelect }               from "$components";
    import { errorInput, httpCodes }                        from "$lib";
    import { AddIcon, DeleteIcon, LoaderIcon }              from "$icons";


    export let shapeInput: ShapeInput;


    let isLoading = false;


    function getAvailableHttpCodes( currentIndex: number ): ShapeOption[] {
        if ( !shapeInput.httpList ) return httpCodes;

        const selectedCodes = shapeInput.httpList
            .map(( http, idx ) => idx !== currentIndex ? http.code.toString() : null )
            .filter( code => code !== null );

        return httpCodes.filter( code => !selectedCodes.includes( code.value ));
    };


    const deleteHttpCode = ( index: number ): Http[] | undefined =>
        shapeInput.httpList = shapeInput.httpList?.filter((_, i) => i !== index);


    const basicInput = {
        valid       : true,
        shape       : 'input' as const,
        type        : 'text' as Types,
        required    : true,
        minLength   : 3,
        maxLength   : 100
    }


    const createValidationItem = () => ({
        ...basicInput,
        id          : uuid(),
        name        : 'message',
        placeholder : 'Mensaje de respuesta',
        value       : '',
        msgRequired : 'El mensaje es requerido.',
        msgMinLength: 'El mensaje debe tener al menos 3 caracteres.',
        msgMaxLength: 'El mensaje debe tener menos de 100 caracteres.',
    });


    let responseMssgList: ShapeInput[] = Array.from(
        { length: shapeInput.httpList?.length || 0 },
        () => createValidationItem()
    );


	function addHttpCode(): void {
        shapeInput.httpList = [
            ...shapeInput.httpList ?? [], 
            { code: 0, message: '' }
        ];

        responseMssgList = [
            ...responseMssgList,
            createValidationItem()
        ];
    };
</script>

<div class="grid @lg:grid-cols-2 grid-cols-1 gap-2 items-start">
    {#if true}
        {@const errorMssg = {
            ...basicInput,
            id		        : uuid(),
            label           : 'Mensaje de error externo',
            name	        : 'external-error',
            placeholder     : 'Ingresa el mensaje para error externo',
            value           : shapeInput.externalErrorMsg,
            msgRequired     : 'El mensaje de error externo es requerido.',
            msgMinLength    : 'El mensaje de error externo debe tener al menos 3 caracteres.',
            msgMaxLength    : 'El mensaje de error externo debe tener menos de 100 caracteres.',
        } as ShapeInput}
        <Input
            shapeInput  = {{ ...errorMssg }}
            onInput     = {( event: Event ) => shapeInput.externalErrorMsg = ( event.target as HTMLInputElement ).value }
            value       = { shapeInput.externalErrorMsg }
            setError    = {() => errorMssg.valid = errorInput( errorMssg, shapeInput.externalErrorMsg )}
        />

        {@const invalidForm = {
            ...basicInput,
            id		        : uuid(),
            label           : 'Formulario inválido',
            name	        : 'invalid-form',
            placeholder     : 'Ingresa el mensaje para formulario inválido',
            value           : shapeInput.invalidErrorMsg,
            msgRequired     : 'El formulario inválido es requerido.',
            msgMinLength    : 'El formulario inválido debe tener al menos 3 caracteres.',
            msgMaxLength    : 'El formulario inválido debe tener menos de 100 caracteres.',
        } as ShapeInput}
        <Input
            shapeInput  = {{ ...invalidForm }}
            onInput     = {( event: Event ) => shapeInput.invalidErrorMsg = ( event.target as HTMLInputElement ).value }
            value       = { shapeInput.invalidErrorMsg }
            setError    = {() => invalidForm.valid = errorInput( invalidForm, shapeInput.invalidErrorMsg )}
        />
    {/if}
</div>

<div class="grid md:space-y-1">
    <div class="flex justify-between mr-2">
        <div class="grid grid-cols-[1.3fr,2fr,auto] items-center w-full">
            <span class="text-sm font-semibold text-zinc-900 dark:text-zinc-200">Código HTTP</span>
            <span class="text-sm font-semibold text-zinc-900 dark:text-zinc-200">Mensaje de la respuesta</span>
        </div>

        <ButtonUI
            onClick     = { addHttpCode }
            disabled    = { shapeInput.httpList?.length === httpCodes.length }
        >
            {#if isLoading}
                <LoaderIcon />
            {:else}
                <AddIcon />
            {/if}
        </ButtonUI>
    </div>

    <div class="grid @lg:grid-cols-[1.3fr,2fr,auto] grid-cols-1 gap-2 items-start overflow-auto py-1 w-full">
        {#each shapeInput.httpList! as http, index}
            <VirtualSelect
                shapeInput = {{
                    id			: uuid(),
                    shape		: 'select',
                    name		: 'code',
                    placeholder	: 'Código HTTP',
                    required 	: true,
                    selected	: http.code.toString(),
                    multiple    : shapeInput.multiple,
                    search      : false,
                    options		: getAvailableHttpCodes(index),
                }}
                onSelectedChange = {(value) => {
                    if (value instanceof Array || value === undefined) return;
                    if (!shapeInput.httpList) return;
                    shapeInput.httpList[index].code = parseInt(value);
                }}
            />

            <Input
                shapeInput  = {{ ...responseMssgList[index], value: shapeInput.httpList?.[index].message }}
                value       = { shapeInput.httpList?.[index].message }
                setError    = {() => {
                    responseMssgList[index].valid = errorInput(
                        responseMssgList[index],
                        shapeInput.httpList?.[index].message
                    );
                }}
                onInput     = {(event) => {
                    if (!shapeInput.httpList) return;
                    shapeInput.httpList[index].message = (event.target as HTMLInputElement).value;
                    responseMssgList[index].valid = errorInput(responseMssgList[index], (event.target as HTMLInputElement).value);
                }}
            />

            <ButtonUI
                onClick     = {() => deleteHttpCode( index )}
                disabled    = { shapeInput.httpList?.length === 1 }
                styles      = '@lg:mt-2 @lg:mr-1 mx-auto flex justify-center'
            >
                <DeleteIcon />
            </ButtonUI>
        {/each}
    </div>
</div>
