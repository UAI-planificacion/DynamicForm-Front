<script lang="ts">
    import { v4 as uuid } from "uuid";

    import { ButtonUI, Input, VirtualSelect }               from "$components";
	import type { Http, ShapeInput, ShapeOption }           from '$models';
    import { errorInput, httpCodes }                        from "$lib";
    import { AddIcon, DeleteIcon, JsonIcon, LoaderIcon }    from "$icons";


    export let shapeInput: ShapeInput;


    function getAvailableHttpCodes( currentIndex: number ): ShapeOption[] {
        if ( !shapeInput.httpList ) return httpCodes;

        const selectedCodes = shapeInput.httpList
            .map(( http, idx ) => idx !== currentIndex ? http.code.toString() : null )
            .filter( code => code !== null );

        return httpCodes.filter( code => !selectedCodes.includes( code.value ));
    };


    const deleteHttpCode = ( index: number ): Http[] | undefined =>
        shapeInput.httpList = shapeInput.httpList?.filter((_, i) => i !== index);


	const addHttpCode = (): Http[] =>
        shapeInput.httpList = [
            ...shapeInput.httpList ?? [], 
            { code: 0, message: '' }
        ];


    let isLoading = false;
</script>

<div class="grid @lg:grid-cols-2 grid-cols-1 gap-2 items-center">
    <Input
        shapeInput = {{
            id		    : uuid(),
            label       : 'Mensaje de error externo',
            name	    : 'external-error',
            placeholder : 'Ingresa el mensaje para error externo',
            value       : shapeInput.externalErrorMsg,
        }}
        onInput = {( event: Event ) => shapeInput.externalErrorMsg = ( event.target as HTMLInputElement ).value }
    />

    <Input
        shapeInput = {{
            id		    : uuid(),
            label       : 'Formulario inválido',
            name	    : 'invalid-form',
            placeholder : 'Ingresa el mensaje para formulario inválido',
            value       : shapeInput.invalidErrorMsg,
        }}
        onInput = {( event: Event ) => shapeInput.invalidErrorMsg = ( event.target as HTMLInputElement ).value }
    />
</div>

<div class="grid">
    <div class="flex justify-between">
        <div class="grid grid-cols-[1.3fr,2fr,auto] gap-2 items-center w-full">
            <span class="text-sm font-semibold text-zinc-900 dark:text-zinc-200">Código HTTP</span>
            <span class="ml-1 text-sm font-semibold text-zinc-900 dark:text-zinc-200">Mensaje de la respuesta</span>
        </div>

        <div class="flex items-center gap-2">
            <ButtonUI
                onClick     = { addHttpCode }
                disabled    = { shapeInput.httpList?.length === httpCodes.length }
            >
                {#if isLoading}
                    <LoaderIcon />
                {:else}
                    <JsonIcon />
                {/if}
            </ButtonUI>

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
    </div>

    <div class="max-h-96 grid @lg:grid-cols-[1.3fr,2fr,auto] grid-cols-1 gap-2 items-center overflow-auto">
        {#each shapeInput.httpList ?? [] as http, index}
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
                shapeInput = {{
                    id			: uuid(),
                    name		: 'message',
                    shape		: 'input',
                    placeholder	: 'Mensaje de respuesta',
                    required	: true,
                    value		: http.message
                }}
                onInput = {(event) => {
                    if (!shapeInput.httpList) return;
                    shapeInput.httpList[index].message = (event.target as HTMLInputElement).value;
                }}
            />

            <button
                aria-label  = "Eliminar código HTTP"
                type        = "button"
                class       = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                on:click    = {() => deleteHttpCode( index )}
                disabled    = { shapeInput.httpList?.length === 1 }
            >
                <DeleteIcon />
            </button>
        {/each}
    </div>
</div>