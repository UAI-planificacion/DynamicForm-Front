<script lang="ts">
    import { onMount }  from "svelte";
    import { slide }    from "svelte/transition";

    import { Accordion, type Selected } from "bits-ui";
	import { v4 as uuid }	            from 'uuid';
    import { type DateValue }           from "@internationalized/date";

    import {
        DeleteIcon,
        CaretDownIcon,
        AddIcon,
        JsonIcon,
        LoaderIcon
    }                                   from "$icons";
    import type {
        InputType,
        ShapeInput,
        ShapeOptions,
        Types
    }                                   from "$models";
    import {
        Check,
        DatePicker,
        Input,
        MarkdownEditor,
        Select,
        TextArea,
        Viewer
    }                                   from "$components";
    import { options, styles, types }   from "$lib";
    import { read, utils }               from 'xlsx';

    export let shapeInput       : ShapeInput;
    export let onDelete         : VoidFunction;
    export let inputActive      : VoidFunction;
    export let inputDesactive   : VoidFunction;

    shapeInput.valid        = true;
    shapeInput.msgRequired  = 'El campo es requerido.'


    onMount(() => {
        if ( shapeInput.shape === 'textarea' || shapeInput.shape === 'input' ) {
            shapeInput.msgMinLength ??= `El campo inferior a los ${shapeInput.minLength ?? 0} caracteres permitidos.`
            shapeInput.msgMaxLength ??= `El campo superior a los ${shapeInput.maxLength ?? 0} caracteres permitidos.`
        }
    });


    let editing = false;

    const heightOptions = ( length?: number ) => ({
        [0]: 'h-0',
        [1]: 'h-auto',
        [2]: 'h-auto',
        [3]: 'h-auto',
    }[length ?? 0] || 'h-36' );


    let selectedFile: File | null = null;
    let isLoading = false;
    let isAddingOption = false;

    const addNewOption = async () => {
        isAddingOption = true;
        try {
            shapeInput.options = [
                ...shapeInput.options ?? [], {
                    id      : uuid(),
                    label   : '',
                    value   : ''
                }
            ];
        } finally {
            isAddingOption = false;
        }
    };

    const processJsonData = (data: any[]): ShapeOptions[] => {
        return data.map(item => ({
            id: uuid(),
            label: item.label || item.name || '',
            value: item.value || item.id || ''
        }));
    };

    const processExcelData = (data: any[]): ShapeOptions[] =>
        data.map(row => {
            const value = row['value'] || '';
            const label = row['label'] || '';

            return {
                id: uuid(),
                value,
                label
            };
        });

    const handleFileChange = async (event: Event): Promise<void> => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0] || null;

        if ( !file ) return;

        const fileExt = file.name.split('.').pop()?.toLowerCase();

		if ( !['json', 'xlsx', 'xls' ].includes( fileExt || '' )) {
            alert('Solo se permiten archivos JSON o Excel (.xlsx, .xls)');
            return;
        }

        isLoading = true;

		try {
            if ( fileExt === 'json' ) {
                const text 		= await file.text();
                const data 		= JSON.parse( text );
                const options 	= processJsonData( Array.isArray( data ) ? data : [ data ]);

				shapeInput.options = options;
            } else {
                const buffer 		= await file.arrayBuffer();
                const workbook 		= read( buffer );
                const firstSheet 	= workbook.Sheets[ workbook.SheetNames[ 0 ]];
                const data 			= utils.sheet_to_json( firstSheet );
                const options 		= processExcelData( data );

				shapeInput.options = options;
            }
        } catch ( error ) {
            console.error('Error al procesar el archivo:', error);
            alert('Error al procesar el archivo. Asegúrate de que el formato sea correcto.');
        } finally {
            isLoading = false;
            if ( target ) target.value = '';
        }
    };

    const triggerFileInput = (): void => {
        const fileInput = document.getElementById( 'fileInput' ) as HTMLInputElement;

		if ( fileInput ) fileInput.click();
    };

    const deleteOption = ( item: ShapeOptions ) =>
        shapeInput.options = [
            ...shapeInput.options?.filter( option => option.id !== item.id ) ?? []
        ];


    function onSelectedChange( selected: Selected<string> | Selected<string>[] | undefined ) {
		if ( selected === undefined || selected instanceof Array ) return;

		shapeInput.shape = selected?.value as InputType || 'none';

        if ( shapeInput.shape === 'textarea' ) {
            shapeInput.msgMinLength ??= `El campo inferior a los ${shapeInput.minLength ?? 0} caracteres permitidos.`
            shapeInput.msgMaxLength ??= `El campo superior a los ${shapeInput.maxLength ?? 0} caracteres permitidos.`
        }
        else {
            shapeInput.msgMinLength = undefined;
            shapeInput.msgMaxLength = undefined;
            shapeInput.msgMin       = undefined
            shapeInput.msgMax       = undefined
        }

		shapeInput.value = '';

        if ( shapeInput.shape === 'select' || shapeInput.shape === 'combobox' && shapeInput.options?.length === 0 ) {
            shapeInput.options = [{
                id      : uuid(),
                label   : '',
                value   : ''
            }]
        }

        if ( shapeInput.shape !== 'input' ) return;

        onChangeType();
    }


    function onChangeType() {
        if ( shapeInput.type === 'number' ) {
            shapeInput.msgMinLength = undefined;
            shapeInput.msgMaxLength = undefined;
            shapeInput.msgMin       = `El valor mínimo es ${shapeInput.min ?? 0}.`
            shapeInput.msgMax       = `La valor máximo es ${shapeInput.max ?? 0}.`
        }
        else {
            shapeInput.msgMinLength ??= `El campo inferior a los ${shapeInput.minLength ?? 0} caracteres permitidos.`
            shapeInput.msgMaxLength ??= `El campo superior a los ${shapeInput.maxLength ?? 0} caracteres permitidos.`
            shapeInput.msgMin       = undefined
            shapeInput.msgMax       = undefined
        }
    }

    function onSelectedType( selected: Selected<string> | Selected<string>[] | undefined ) {
		if ( selected === undefined || selected instanceof Array ) return;

		shapeInput.type 	= selected?.value as Types || 'none';
	
        onChangeType();
    }
</script>


<card class="hover:brightness-105 shadow-md rounded-md p-5 border-1 border-zinc-300 dark:border-zinc-800 border bg-white dark:bg-zinc-900 w-full dark:hover:brightness-110">
    {#if editing === false}
        <Viewer
            { shapeInput }
            { onDelete }
            { inputActive }
            onEdit = { () => editing = !editing }
        />
    {:else}
        <section class="space-y-2">
            <div class="grid grid-cols-1 sm:grid-cols-2 items-center gap-2">
                <Select
                    shapeInput = {{
                        id			: uuid(),
                        name 		: 'shape',
                        placeholder	: 'Ingrese el tipo de entrada',
                        required 	: true,
                        label		: 'Input',
                        value       : shapeInput.shape,
                        options,
                    }}
                    { onSelectedChange }
                />

                <Input
                    shapeInput = {{
                        id		    : uuid(),
                        label       : 'Nombre',
                        name	    : 'name',
                        placeholder : 'Ingrese el nombre',
                        value       : shapeInput.name
                    }}
                    onInput = {( event: Event ) => shapeInput.name = ( event.target as HTMLInputElement ).value }
                />

                <Input
                    shapeInput = {{
                        id		    : uuid(),
                        label       : 'Etiqueta',
                        name	    : 'label',
                        placeholder : 'Ingrese la etiqueta',
                        value       : shapeInput.label
                    }}
                    onInput = {( event: Event ) => shapeInput.label = ( event.target as HTMLInputElement ).value }
                />

                {#if shapeInput.shape === 'check' }
                    <div class="flex mt-5">
                        <Check
                            shapeInput = {{
                                id      : uuid(),
                                name    : 'default-value',
                                label   : 'Valor por defecto',
                                checked : shapeInput.checked
                            }} 
                            onChange = {( e ) => shapeInput.checked = e as boolean }
                        />
                    </div>
                {:else if shapeInput.shape === 'datepicker'}
                    <div class="flex gap-2 items-center">
                        <div class="w-48">
                            <Check
                                shapeInput = {{
                                    id      : uuid(),
                                    name    : 'current-date',
                                    label   : 'Día actual',
                                    checked : shapeInput.currentDate
                                }}
                                onChange = {( e ) => shapeInput.currentDate = e as boolean }
                            />
                        </div>

                        <DatePicker
                            shapeInput = {{
                                id          : uuid(),
                                name        : 'default-value',
                                date        : shapeInput.date,
                                label       : 'Valor por defecto',
                                disabled    : shapeInput.currentDate
                            }}
                            onValueChange = {( value: DateValue ) => shapeInput.date = value }
                        />
                    </div>
                {:else if shapeInput.shape !== 'button'}
                    <Input
                        shapeInput = {{
                            id		    : uuid(),
                            label       : 'Placeholder',
                            name	    : 'placeholder',
                            placeholder : 'Ingrese el placeholder',
                            value       : shapeInput.placeholder
                        }}
                        onInput = {( event: Event ) => shapeInput.placeholder = ( event.target as HTMLInputElement ).value }
                    />
                {/if}
            </div>

            {#if shapeInput.shape === 'input' }
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
                    <Select
                        shapeInput = {{
                            id			: uuid(),
                            name 		: 'type',
                            placeholder	: 'Ingrese el tipo',
                            required 	: true,
                            label		: 'Tipo de entrada',
                            value       : shapeInput.type,
                            options     : types,
                        }}
                        onSelectedChange = { onSelectedType }
                    />

                    <Input
                        shapeInput = {{
                            id		    : uuid(),
                            label       : 'Valor por defecto',
                            name	    : 'value',
                            placeholder : 'Valor con el que se inicia',
                            value       : shapeInput.value,
                            type        : shapeInput.type === 'number' ? 'number': 'text'
                        }}
                        onInput = {( event: Event ) => shapeInput.value = ( event.target as HTMLInputElement ).value }
                    />
                </div>

            {:else if shapeInput.shape === 'button' }
                <Input
                    shapeInput = {{
                        id		    : uuid(),
                        label       : 'Url para la petición HTTPS',
                        name	    : 'utl',
                        placeholder : 'Ingrese la url donde se realizará la petición',
                    }}
                    onInput = {( event: Event ) => shapeInput.apiUrlSend = ( event.target as HTMLInputElement ).value }
                />

            {:else if shapeInput.shape === 'textarea' }
                <div class="grid grid-cols-1 sm:grid-cols-2 space-x-2 items-center">
                    <Input
                        shapeInput = {{
                            id		    : uuid(),
                            label       : 'Alto de la caja',
                            name	    : 'rows',
                            placeholder : 'Ingrese el alto que tendrá la caja de texto',
                            value       : "4",
                            type        : 'number'
                        }}
                        onInput = {( event: Event ) => shapeInput.rows = Number(( event.target as HTMLInputElement ).value )}
                    />

                    <TextArea
                        shapeInput = {{
                            id          : uuid(),
                            name        : 'default-value',
                            label       : 'Valor por defecto',
                            placeholder : 'Ingrese el valor por defecto',
                            rows        : 1,
                            value       : shapeInput.value
                        }}
                        onInput = {( event: Event ) => shapeInput.value = ( event.target as HTMLInputElement ).value }
                    />
                </div>

			{:else if shapeInput.shape === 'markdown' }
				<MarkdownEditor
					shapeInput ={{
						id		    : uuid(),
						label       : 'Valor por defecto',
						name	    : 'value',
						placeholder : 'Ingrese el valor por defecto',
						value       : shapeInput.value,
						preview		: false
					}}
					dynamicMode	= { true }
					onInput		= {( event: Event ) => shapeInput.value = ( event.target as HTMLInputElement ).value }
				/>

            {:else if shapeInput.shape === 'combobox' || shapeInput.shape === 'select' }
                <div class="grid grid-cols-2 items-center ">
                    <span class="text-sm text-zinc-900 dark:text-zinc-200">Valor</span>

                    <div class="flex justify-between items-center">
                        <span class="text-sm text-zinc-900 dark:text-zinc-200">Label</span>

                        <div class="flex items-center gap-2">
                            <button
                                class="hover:brightness-105 active:scale-95 active:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed"
                                on:click={triggerFileInput}
                                disabled={isLoading}
                            >
                                {#if isLoading}
                                    <LoaderIcon />
                                {:else}
                                    <JsonIcon />
                                {/if}
                            </button>

                            <input
                                id="fileInput"
                                type="file"
                                class="hidden"
                                accept=".json,.xlsx,.xls"
                                on:change={handleFileChange}
                            />

                            <button
                                class="hover:brightness-105 active:scale-95 active:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed"
                                on:click={addNewOption}
                                disabled={isLoading || isAddingOption}
                            >
                                {#if isAddingOption}
                                    <LoaderIcon />
                                {:else}
                                    <AddIcon width="21px" height="21px" />
                                {/if}
                            </button>
                        </div>
                    </div>
                </div>

                <div class={`${heightOptions( shapeInput.options?.length )} w-full overflow-auto gap-2 grid grid-cols-2 pr-2`}>
                    {#each shapeInput.options ?? [] as item }
                        <Input
                            shapeInput = {{
                                id		    : uuid(),
                                name	    : uuid(),
                                value       : item.value,
                                placeholder : 'Ingrese el valor',
                            }}
                            onInput = {( event: Event ) => item.value = ( event.target as HTMLInputElement ).value }
                        />

                        <div class="flex gap-2 items-start">
                            <Input
                                shapeInput = {{
                                    id		    : uuid(),
                                    name	    : uuid(),
                                    value       : item.label,
                                    placeholder : 'Ingrese la etiqueta para mostrar',
                                }}
                                onInput = {( event: Event ) => item.label = ( event.target as HTMLInputElement ).value }
                            />

                            <button
                                class       = "hover:brightness-105 active:scale-95 mt-2 disabled:active:scale-100 disabled:opacity-50"
                                on:click    = {() => deleteOption( item )}
                                disabled    = { shapeInput.options?.length === 1 }
                            >
                                <DeleteIcon />
                            </button>
                        </div>
                    {/each}
                </div>

                <Select
                    shapeInput={{
                        id			: uuid(),
                        name 		: 'default-value',
                        placeholder	: 'Ingrese un valor por defecto',
                        required 	: true,
                        label		: 'Valor por defecto',
                        value       : shapeInput.value,
                        options     : [{ id: uuid(), label: 'Sin valor por defecto', value: '' }, ...shapeInput.options ?? [] ],
                    }}
                    onSelectedChange={( selected: Selected<string> | Selected<string>[] | undefined ) => {
						if ( selected instanceof Array ) return;
						shapeInput.value = selected?.value
					}}
                />
            {/if}

            <Accordion.Root class="w-full">
                <Accordion.Item value="validations" class="group border-b border-dark-10 px-1.5 dark:border-zinc-700">
                    <Accordion.Header>
                        <Accordion.Trigger
                            class="flex w-full flex-1 items-center justify-between py-2 text-[15px] font-medium transition-all [&[data-state=open]>span>svg]:rotate-180 dark:text-zinc-300"
                        >
                            Validaciones

                            <span
                                class="inline-flex size-8 items-center justify-center rounded-[7px] bg-transparent transition-all hover:bg-dark-10"
                            >
                                <CaretDownIcon />
                            </span>
                        </Accordion.Trigger>
                    </Accordion.Header>

                    <Accordion.Content
                        transition          = { slide }
                        transitionConfig    = {{ duration: 200 }}
                        class               = "pb-3 tracking-[-0.01em] space-y-2"
                    >
                        {#if shapeInput.shape !== 'button' }
                            <div class=" grid grid-cols-2 gap-2 items-center">
                                <Check
                                    shapeInput = {{
                                        id		    : uuid(),
                                        label       : 'Requerido',
                                        name	    : 'required',
                                        checked     : shapeInput.required
                                    }}
                                    onChange	= {( e ) => shapeInput.required = e as boolean }
                                />

                                <Input
                                    shapeInput = {{
                                        id		    : uuid(),
                                        label       : 'Mensaje para requerido',
                                        name	    : 'msg-required',
                                        placeholder : 'Ingresa el mensaje para mostrar como requerido',
                                        value       : shapeInput.msgRequired,
                                        disabled    : !shapeInput.required
                                    }}
                                    onInput = {( event: Event ) => shapeInput.msgRequired = ( event.target as HTMLInputElement ).value }
                                />
                            </div>
                        {/if}

                        {#if shapeInput.shape === 'input' || shapeInput.shape === 'textarea' || shapeInput.shape === 'markdown' }
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
                                {#if shapeInput.type !== 'number' ||  shapeInput.shape === 'textarea' || shapeInput.shape === 'markdown' }
                                    <Input
                                        shapeInput = {{
                                            id		    : uuid(),
                                            label       : 'Largo mínimo',
                                            name	    : 'min-length',
                                            placeholder : 'Ingresa el largo mínimo de caracteres',
                                            value       : String( shapeInput.minLength ),
                                            type        : 'number'
                                        }}
                                        onInput = {( event: Event ) => shapeInput.minLength = Number(( event.target as HTMLInputElement ).value )}
                                    />

                                    <Input
                                        shapeInput = {{
                                            id		    : uuid(),
                                            label       : 'Mensaje largo mínimo',
                                            name	    : 'msg-min-length',
                                            placeholder : 'Ingresa el mensaje para largo mínimo',
                                            disabled    : ( shapeInput.minLength ?? 0 ) <= 0,
                                            value       : shapeInput.msgMinLength,
                                        }}
                                        onInput = {( event: Event ) => shapeInput.msgMinLength = ( event.target as HTMLInputElement ).value }
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
                            </div>
                        {:else if shapeInput.shape === 'datepicker'}
                            <div class="grid grid-cols-2 gap-2 items-center">
                                <DatePicker
                                    shapeInput = {{
                                        id      : uuid(),
                                        name    : 'min-value',
                                        date    : shapeInput.minValue,
                                        label   : 'Fecha mínima',
                                    }}
                                    onValueChange = {( value: DateValue ) => shapeInput.minValue = value }
                                />

                                <DatePicker
                                    shapeInput = {{
                                        id      : uuid(),
                                        name    : 'max-value',
                                        date    : shapeInput.maxValue,
                                        label   : 'Fecha máxima',
                                    }}
                                    onValueChange = {( value: DateValue ) => shapeInput.maxValue = value }
                                />
                            </div>
                        {/if}
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="accordion" class="group border-b border-dark-10 px-1.5 dark:border-zinc-700">
                    <Accordion.Header>
                        <Accordion.Trigger
                            class="flex w-full flex-1 items-center justify-between py-2 text-[15px] font-medium transition-all [&[data-state=open]>span>svg]:rotate-180 dark:text-zinc-300"
                        >
                            Atributos opcionales

                            <span
                                class="inline-flex size-8 items-center justify-center rounded-[7px] bg-transparent transition-all hover:bg-dark-10"
                            >
                                <CaretDownIcon />
                            </span>
                        </Accordion.Trigger>
                    </Accordion.Header>

                    <Accordion.Content
                        transition          = { slide }
                        transitionConfig    = {{ duration: 200 }}
                        class               = "pb-3 tracking-[-0.01em] space-y-2"
                    >
                        <Input
                            shapeInput = {{
                                id		    : uuid(),
                                label       : 'Descripción',
                                name	    : 'description',
                                placeholder : 'Ingrese la descripción',
                                value       : shapeInput.description
                            }}
                            onInput = {( event: Event ) => shapeInput.description = ( event.target as HTMLInputElement ).value }
                        />

                        {#if shapeInput.shape === 'button'}
                            <div class="grid grid-cols-1 sm:grid-cols-2 items-center justify-between">
                                <!-- <Check
                                    shapeInput = {{
                                        id		    : uuid(),
                                        label       : 'Mantener desactivado mientras el formulario sea inválido.',
                                        name	    : 'keep-disabled',
                                        checked     : shapeInput.checked
                                    }}
                                    onChange	= {( e ) => shapeInput.readonly = e as boolean }
                                /> -->
                            </div>
                        {:else}
                            <div class="grid grid-cols-1 {shapeInput.shape === 'markdown' ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} items-center justify-between">
								{#if shapeInput.shape === 'markdown'}
									<Check
										shapeInput = {{
											id		: uuid(),
											label   : 'Previsualización',
											name	: 'preview',
											checked : shapeInput.preview
										}}
										onChange = {( e ) => shapeInput.preview = e as boolean }
									/>
								{/if}

                                <Check
                                    shapeInput = {{
                                        id		: uuid(),
                                        label   : 'Desactivado',
                                        name	: 'disabled',
                                        checked : shapeInput.disabled
                                    }}
                                    onChange = {( e ) => shapeInput.disabled = e as boolean }
                                />

                                <Check
                                    shapeInput = {{
                                        id		: uuid(),
                                        label   : 'Solo lectura',
                                        name	: 'readonly',
                                        checked : shapeInput.readonly
                                    }}
                                    onChange = {( e ) => shapeInput.readonly = e as boolean }
                                />
                            </div>
                        {/if}

                        <TextArea 
                            shapeInput = {{
                                id          : uuid(),
                                name        : 'class',
                                label       : 'Estilos con tailwind',
                                placeholder : 'Ingrese los estilos',
                                rows        : 4,
                                value       : shapeInput.class ?? styles[shapeInput.shape || 'none'] as string
                            }}
                            onInput = {( event: Event ) => shapeInput.class = ( event.target as HTMLInputElement ).value }
                        />
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>

            <button
                class="w-full hover:brightness-105 active:scale-[0.99] active:brightness-90 bg-black rounded-lg py-2 text-white"
                on:click={() => {
                    editing = false;
                    inputDesactive();
                }}
            >
                Guardar
            </button>
        </section>
    {/if}
</card>
