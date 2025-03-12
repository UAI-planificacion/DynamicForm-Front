<script lang="ts">
    import { onMount }  from "svelte";

    import { Accordion, Tabs }  from "bits-ui";
	import { v4 as uuid }	    from 'uuid';
    import { type DateValue }   from "@internationalized/date";

    import {
        DeleteIcon,
        CaretDownIcon,
        AddIcon,
    }						from "$icons";
    import type {
        GroupOption,
        InputStyle,
        InputType,
        Method,
        SelectInput,
        ShapeInput,
        ShapeOption,
        Types
    }						from "$models";
    import {
        Check,
        DatePicker,
        Input,
        MarkdownEditor,
        TextArea,
        Viewer,
        VirtualSelect,
        ValueEditor,
        GroupEditor,
    }						from "$components";
    import {
		options,
		styles,
		types,
		httpCodes,
		methods
	}						from "$lib";

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

		if ( shapeInput.shape === 'button' ) {
			shapeInput.externalErrorMsg ??= 'Ocurrió un error en la conexión.'
			shapeInput.invalidErrorMsg	??= 'Hay un error en el formulario.'
		}
    });


    const heightOptions = ( length?: number ) => ({
        [0]: 'h-0',
        [1]: 'h-auto',
        [2]: 'h-auto',
        [3]: 'h-auto',
    }[length ?? 0] || 'h-36' );


    const defaultOption: ShapeOption[] = [{
        id: uuid(),
        label: 'Item 1',
        value: 'Item 1'
    }]

    let isGrouping: boolean = false;
    let optionsSelected: ShapeOption[] = [];
    let groupsSelected: GroupOption[] = [
        {
            group: '',
            values: []
        }
    ]
    let editing 		: boolean = false;


    function onSelectedChange( selected: SelectInput ) {
		if ( selected === undefined || selected instanceof Array ) return;

		shapeInput.shape = selected as InputType || 'none';

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


	function onSelectedType( selected: SelectInput ) {
		if ( selected === undefined || selected instanceof Array ) return;

		shapeInput.type = selected as Types || 'none';

        onChangeType();
    }


	const deleteHttpCode = ( index: number ) =>
        shapeInput.httpList = shapeInput.httpList
			?.filter((_, i) => i !== index);


	const addHttpCode = () =>
        shapeInput.httpList = [
            ...shapeInput.httpList ?? [], 
            { code: 200, message: '' }
        ];
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
            <div class="grid grid-cols-1 @lg:grid-cols-2 items-center gap-2">
				{#if shapeInput.shape !== 'button'}
                    <VirtualSelect
                        shapeInput = {{
                            id			: uuid(),
                            name		: 'shape',
                            shape       : 'select',
                            options,
                            multiple    : false,
                            search      : false,
                            heightPanel : 6,
                            label		: 'Input',
                            placeholder	: 'Ingrese el tipo de entrada',
                            selected    : shapeInput.shape,
                        }}
                        { onSelectedChange }
                    />
				{/if}

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
                            onChange = {( e ) => shapeInput.checked = e }
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
                                onChange = {( e ) => shapeInput.currentDate = e}
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
                    <VirtualSelect
                        shapeInput = {{
                            id			: uuid(),
                            name 		: 'type',
                            placeholder	: 'Ingrese el tipo',
                            required 	: true,
                            label		: 'Tipo de entrada',
                            selected	: shapeInput.type,
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

            {:else if shapeInput.shape === 'select' }
                <Tabs.Root value="outbound">
                    <Tabs.List
                        class="mt-1 rounded-lg bg-dark-10 shadow-mini-inset dark:bg-background grid w-full grid-cols-2 gap-1 p-1 text-sm font-semibold leading-[0.01em] border border-zinc-300 dark:border-zinc-700"
                    >
                        <Tabs.Trigger
                            value="outbound"

                            onclick={ ()=> isGrouping = false }
                            class="data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-zinc-100 text-black dark:text-zinc-400 h-8 dark:data-[state=active]:text-black rounded-lg bg-transparent py-2"
                        >
                            Selección
                        </Tabs.Trigger>

                        <Tabs.Trigger
                            value="inbound"
                            onclick={ ()=> isGrouping = true }

                            class="data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-zinc-100 text-black dark:text-zinc-400 h-8 dark:data-[state=active]:text-black rounded-lg bg-transparent py-2"
                        >
                            Grupos
                        </Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="outbound" class="select-none pt-3">
                        <ValueEditor
                            options={ optionsSelected }
                            onOptionsChange={(newOptions: ShapeOption[]) => {
                                optionsSelected = newOptions;
                                shapeInput.options = optionsSelected;
                            }}
                        />
                    </Tabs.Content>

                    <Tabs.Content value="inbound" class="select-none pt-3">
                        <GroupEditor
                            groups = {groupsSelected}
                            onGroupsChange={(newGroups: GroupOption[]) => {
                                groupsSelected = newGroups;
                                shapeInput.options = groupsSelected
                            }}
                        />
                    </Tabs.Content>
                </Tabs.Root>

                <div class="grid gap-3">
                    <VirtualSelect
                        onSelectedChange    = { onSelectedType }
                        shapeInput          = {{
                            id			: uuid(),
                            name 		: 'default-value',
                            placeholder	: 'Ingrese un valor por defecto',
                            required 	: true,
                            label		: 'Valor por defecto',
                            selected	: shapeInput.selected,
                            multiple    : shapeInput.multiple,
                            search      : false,
                            options     : [{
                                id      : uuid(),
                                label   : 'Sin valor por defecto',
                                value   : 'none'
                            }, ...( shapeInput.options as ShapeOption[] ) ?? defaultOption ],
                        }}
                    />

                    <div class="grid grid-cols-1 @lg:grid-cols-2 items-center gap-2">
                        <Check
                            shapeInput = {{
                                id      : uuid(),
                                name    : 'multiple',
                                label   : 'Selección múltiple',
                                checked : shapeInput.multiple
                            }}
                            onChange = {( e ) => {
                                shapeInput.multiple = e;
                                shapeInput.selected = undefined;
                            }}
                        />

                        <div class="grid grid-cols-1 @xl:grid-cols-2 items-center gap-2">
                            <Check
                                onChange    = {( e ) => shapeInput.search = e }
                                shapeInput  = {{
                                    id      : uuid(),
                                    name    : 'search',
                                    label   : 'Con buscador',
                                    checked : shapeInput.search
                                }}
                            />

                            <Input
                                shapeInput = {{
                                    id		    : uuid(),
                                    name	    : 'search-placeholder',
                                    value       : shapeInput.searchPlaceholder,
                                    placeholder : 'Ingrese el placeholder del buscador',
                                    type        : 'text',
                                    disabled    : !shapeInput.search
                                }}
                                onInput = {( event: Event ) => shapeInput.searchPlaceholder = ( event.target as HTMLInputElement ).value }
                            />
                        </div>
                    </div>

                </div>
			{:else if shapeInput.shape === 'button'}
					<div class="grid @lg:grid-cols-[1fr,2fr] grid-cols-1 gap-2 items-center">
                        <VirtualSelect
                            shapeInput = {{
                                id			: uuid(),
                                label		: 'Método HTTP',
								name		: 'method',
								placeholder	: 'Selecciona el método',
                                required 	: true,
                                selected	: shapeInput.selected,
                                multiple    : shapeInput.multiple,
                                search      : false,
								options		: methods
                            }}
                            onSelectedChange = {(value) => {
								if (value instanceof Array || value === undefined) return;
								shapeInput.method = value as Method;
							}}
                        />

						<Input
							shapeInput = {{
								id			: uuid(),
								label		: 'URL de la API',
								name		: 'urlSend',
								placeholder	: 'Ingresa la URL de la API',
								value		: shapeInput.urlSend
							}}
							onInput = {(event) => shapeInput.urlSend = (event.target as HTMLInputElement).value}
						/>
					</div>
            {/if}

            <Accordion.Root class="w-full" type="single">
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
						{:else if shapeInput.shape === 'button' }
							<div class="grid">
								<div class="grid grid-cols-[1fr,2fr,auto] gap-2 items-center">
									<div class="flex flex-col gap-2">
										<span class="text-sm font-semibold text-zinc-900 dark:text-zinc-200">Código HTTP</span>
									</div>
									<div class="flex flex-col gap-2 ml-1">
										<span class="text-sm font-semibold text-zinc-900 dark:text-zinc-200">Mensaje</span>
									</div>
									<div class="flex flex-col gap-2">
										<button
											type="button"
											class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 bg-primary text-primary-foreground shadow hover:bg-primary/90"
											on:click={addHttpCode}
										>
											<AddIcon width={"21px"} height={"21px"} />
										</button>
									</div>
								</div>

								<div class={`${heightOptions( shapeInput.httpList?.length )} grid @lg:grid-cols-[1fr,2fr,auto] grid-cols-1 gap-2 items-center overflow-auto`}>
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
                                                    options		: httpCodes,
                                                }}
                                                onSelectedChange = {(value) => {
													if ( value instanceof Array || value === undefined) return;
													if (!shapeInput.httpList) return;
													shapeInput.httpList[index].code = parseInt( value );
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
												aria-label="Eliminar código HTTP"
												type="button"
												class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
												on:click={() => deleteHttpCode(index)}
												disabled={shapeInput.httpList?.length === 1}
											>
												<DeleteIcon />
											</button>
									{/each}
								</div>
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

				{#if shapeInput.shape === 'button'}
					<Accordion.Item value="form" class="group border-b border-dark-10 px-1.5 dark:border-zinc-700">
						<Accordion.Header>
							<Accordion.Trigger
								class="flex w-full flex-1 items-center justify-between py-2 text-[15px] font-medium transition-all [&[data-state=open]>span>svg]:rotate-180 dark:text-zinc-300"
							>
								Formulario

								<span
									class="inline-flex size-8 items-center justify-center rounded-[7px] bg-transparent transition-all hover:bg-dark-10"
								>
									<CaretDownIcon />
								</span>
							</Accordion.Trigger>
						</Accordion.Header>

						<Accordion.Content
							class               = "pb-3 tracking-[-0.01em] space-y-2"
						>
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
						</Accordion.Content>
					</Accordion.Item>
				{/if}

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
                            <div class="grid grid-cols-1 {shapeInput.shape === 'markdown' ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} items-center justify-between py-1">
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

						{#if shapeInput.shape === 'input' || shapeInput.shape === 'textarea' || shapeInput.shape === 'button' }
							<TextArea
								shapeInput = {{
									id          : uuid(),
									name        : 'class',
									label       : 'Estilos con tailwind',
									placeholder : 'Ingrese los estilos',
									rows        : 4,
									value       : ( shapeInput.class_ ) ?? ( styles[shapeInput.shape || 'none'] as string )
								}}
								onInput = {( event: Event ) => shapeInput.class_ = ( event.target as HTMLInputElement ).value }
							/>
						{:else if shapeInput.shape === 'check'}
							<TextArea
								shapeInput = {{
									id          : uuid(),
									name        : 'class',
									label       : 'Estilos con tailwind',
									placeholder : 'Ingrese los estilos',
									rows        : 4,
									value       : shapeInput.class_ ?? ( styles[shapeInput.shape || 'none'] as InputStyle ).box
								}}
								onInput = {( event: Event ) => shapeInput.class_ = ( event.target as HTMLInputElement ).value }
							/>

							<TextArea
								shapeInput = {{
									id          : uuid(),
									name        : 'class',
									label       : 'Estilos con tailwind',
									placeholder : 'Ingrese los estilos',
									rows        : 4,
									value       : shapeInput.labelStyle ?? ( styles[shapeInput.shape || 'none'] as InputStyle ).label
								}}
								onInput = {( event: Event ) => shapeInput.labelStyle = ( event.target as HTMLInputElement ).value }
							/>
						{:else if shapeInput.shape === 'select' }
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
						{:else if shapeInput.shape === 'datepicker' }
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
									label       : 'Estilos del input',
									placeholder : 'Ingrese los estilos del input',
									rows        : 5,
									value       : shapeInput.inputStyle ?? ( styles[shapeInput.shape || 'none'] as InputStyle ).input
								}}
								onInput = {( event: Event ) => shapeInput.inputStyle = ( event.target as HTMLInputElement ).value }
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
									label       : 'Estilos del label',
									placeholder : 'Ingrese los estilos del label',
									rows        : 2,
									value       : shapeInput.labelStyle ?? ( styles[shapeInput.shape || 'none'] as InputStyle ).label
								}}
								onInput = {( event: Event ) => shapeInput.labelStyle = ( event.target as HTMLInputElement ).value }
							/>
							
						{/if}
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
