<script lang="ts">
    import { v4 as uuid } from "uuid";

	import type { Http, ShapeInput, ShapeOption, Types }    from '$models';
    import { ButtonUI, Input, VirtualSelect }               from "$components";
    import { errorInput, errorSelect, httpCodes }           from "$lib";
    import { AddIcon, DeleteIcon }                          from "$icons";


    export let shapeInput       : ShapeInput;
    export let isButtonValid    : boolean;
    export let countSend        : number;


    $: if ( countSend > 0 && shapeInput.httpList && shapeInput.httpList.length > 0 ) {
        shapeInput.httpList.forEach((http, index) => {
            responseMssgList[index].valid   = errorInput( responseMssgList[index], http.message );
            const selected = http.code.toString() === '0' ? undefined : http.code.toString()
            codeSelectList[index].selected = selected;
            codeSelectList[index].valid = errorSelect( codeSelectList[index], selected );
        });
        

        const allMessagesValid  = responseMssgList.slice(0, shapeInput.httpList.length).every(item => item.valid);
        const allCodesValid     = codeSelectList.slice(0, shapeInput.httpList.length).every(item => item.valid);

        isButtonValid = allMessagesValid && allCodesValid;
    }


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


    const createCodeSelectItem = () => ({
        id			: uuid(),
        name		: 'code',
        shape		: 'select' as const,
        placeholder	: 'Código HTTP',
        required 	: true,
        msgRequired : 'Código requerido',
        multiple    : false,
        search      : true,
        searchPlaceholder: 'Buscar código',
        heightPanel : 7,
        valid       : true,
    });


    let responseMssgList: ShapeInput[] = Array.from(
        { length: shapeInput.httpList?.length || 0 },
        () => createValidationItem()
    );

    let codeSelectList: ShapeInput[] = Array.from(
        { length: shapeInput.httpList?.length || 0 },
        () => createCodeSelectItem()
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

        codeSelectList = [
            ...codeSelectList,
            createCodeSelectItem()
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
            msgRequired     : 'El mensaje de error externo es requerido.',
            msgMinLength    : 'El mensaje de error externo debe tener al menos 3 caracteres.',
            msgMaxLength    : 'El mensaje de error externo debe tener menos de 100 caracteres.',
        } as ShapeInput}
        <Input
            shapeInput  = {{ ...errorMssg }}
            onInput     = {( value: string ) => shapeInput.externalErrorMsg = value }
            value       = { shapeInput.externalErrorMsg }
            setError    = {() => errorMssg.valid = errorInput( errorMssg, shapeInput.externalErrorMsg )}
        />

        {@const invalidForm = {
            ...basicInput,
            id		        : uuid(),
            label           : 'Formulario inválido',
            name	        : 'invalid-form',
            placeholder     : 'Ingresa el mensaje para formulario inválido',
            msgRequired     : 'El formulario inválido es requerido.',
            msgMinLength    : 'El formulario inválido debe tener al menos 3 caracteres.',
            msgMaxLength    : 'El formulario inválido debe tener menos de 100 caracteres.',
        } as ShapeInput}
        <Input
            shapeInput  = {{ ...invalidForm }}
            onInput     = {( value: string ) => shapeInput.invalidErrorMsg = value }
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
            <AddIcon />
        </ButtonUI>
    </div>

    <div class="grid @lg:grid-cols-[1.3fr,2fr,auto] grid-cols-1 gap-2 items-start overflow-auto py-1 w-full">
        {#each shapeInput.httpList! as http, index}
            <VirtualSelect
                shapeInput = {{ ...codeSelectList[index],
                    options: getAvailableHttpCodes(index),
                    selected: http.code.toString()
                }}
                onSelectedChange = {(value) => {
                    if ( value instanceof Array || value === undefined ) return;
                    if ( !shapeInput.httpList ) return;
                    shapeInput.httpList[index].code = parseInt( value );
                    codeSelectList[index].selected = value;
                }}
                value = { http.code.toString() ?? undefined }
                setError = {() => {
                    codeSelectList[index].valid = errorSelect(
                        codeSelectList[index], 
                        http.code ? http.code.toString() : undefined
                    );
                }}
            />

            <Input
                shapeInput  = {{ ...responseMssgList[index] }}
                value       = { shapeInput.httpList?.[index].message }
                setError    = {() => {
                    responseMssgList[index].valid = errorInput(
                        responseMssgList[index],
                        shapeInput.httpList?.[index].message
                    );
                }}
                onInput     = {(value: string) => {
                    if (!shapeInput.httpList) return;
                    shapeInput.httpList[index].message = value;
                    responseMssgList[index].valid = errorInput(responseMssgList[index], value);
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
