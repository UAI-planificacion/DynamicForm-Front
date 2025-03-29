<script lang="ts">
    import { onMount } from "svelte";

    import { Accordion }        from "bits-ui";
	import { v4 as uuid }	    from 'uuid';
    import { type DateValue }   from "@internationalized/date";

    import {
        CaretDownIcon,
    }						from "$icons";
    import type {
        InputStyle,
        InputType,
        SelectInput,
        ShapeInput,
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
        GenerateValidDates,
        AnalogicTime,
        TimeGenerator,
        DigitalTime,
        SelectEditor,
        ValidInput
    }						from "$components";
    import {
		options,
		styles,
		types,
        errorInput,
        errorSelect,
	}						from "$lib";
    import ButtonRequired       from "./buttons/ButtonRequired.svelte";
    import ButtonValidations    from "./buttons/ButtonValidations.svelte";

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


    let editing: boolean = false;


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


    const baseInputShape = {
        shape       : 'input',
        type        : 'text',
        valid       : true
    }


    const labelShape = {
        ...baseInputShape,
        maxLength   : 50,
        msgMaxLength: 'Máximo 50 caracteres permitidos.',
        id		    : uuid(),
        label       : 'Etiqueta',
        name	    : 'label',
        placeholder : 'Ingrese la etiqueta',
        value       : shapeInput.label,
        required    : shapeInput.shape === 'check',
        msgRequired : 'La etiqueta es requerida.',
        valid       : true
    } as ShapeInput;


    const placeholderShape = {
        ...baseInputShape,
        id			: uuid(),
        label       : 'Placeholder',
        name	    : 'placeholder',
        placeholder : 'Ingrese el placeholder',
        value       : shapeInput.placeholder,
        maxLength   : 100,
        msgMaxLength: 'Máximo 100 caracteres permitidos.',
    } as ShapeInput;


    const virutalShape = {
        id			: uuid(),
        name		: 'shape',
        shape       : 'select',
        options,
        multiple    : false,
        search      : false,
        heightPanel : 7,
        label		: 'Input',
        placeholder	: 'Ingrese el tipo de entrada',
        selected    : shapeInput.shape,
        valid       : true,
        required    : true,
        msgRequired : 'El tipo de entrada es requerido.',
    } as ShapeInput;


    const requiredMssg = {
        ...baseInputShape,
        id		    : uuid(),
        label       : 'Mensaje para requerido',
        name	    : 'msg-required',
        placeholder : 'Ingresa el mensaje para mostrar como requerido',
        value       : shapeInput.msgRequired,
        disabled    : !shapeInput.required,
        required    : true,
        msgRequired : 'El mensaje para requerido es requerido.',
        valid       : true,
        maxLength   : 100,
        msgMaxLength: 'Máximo 100 caracteres permitidos.',
    } as ShapeInput;
</script>


<card class="hover:shadow-xl hover:transition-all delay-50 hover:bg-zinc-100/50 shadow-md rounded-md p-5 border-1 border-zinc-300 dark:border-zinc-800 border bg-white dark:bg-zinc-900 w-full dark:hover:bg-zinc-800/10">
    {#if editing === false}
        <Viewer
            { shapeInput }
            { onDelete }
            { inputActive }
            onEdit = { () => editing = !editing }
        />
    {:else}
        <section class="space-y-2">
            <div class="grid grid-cols-1 @lg:grid-cols-2 items-start gap-2">
				{#if shapeInput.shape !== 'button'}
                    <VirtualSelect
                        shapeInput = {{ ...virutalShape }}
                        { onSelectedChange }
                        value = { shapeInput.shape }
                        setError = { () => virutalShape.valid = errorSelect( virutalShape, shapeInput.shape )}
                    />
				{/if}

                {#if true} {@const nameShape = {
                    ...baseInputShape,
                    id		    : uuid(),
                    label       : 'Nombre',
                    name	    : 'name',
                    placeholder: 'Ingrese el nombre',
                    value       : shapeInput.name,
                    required    : true,
                    msgRequired : 'El nombre es requerido.',
                    maxLength   : 50,
                    msgMaxLength: 'Máximo 50 caracteres permitidos.',
                } as ShapeInput}

                <Input
                    shapeInput  = {{ ...nameShape }}
                    onInput     = {( event: Event ) => shapeInput.name = ( event.target as HTMLInputElement ).value }
                    value       = { shapeInput.name }
                    setError    = { () => nameShape.valid = errorInput(nameShape, shapeInput.name) }
                />
                {/if}

                <Input
                    shapeInput  = {{ ...labelShape, required: shapeInput.shape === 'check', value : shapeInput.label }}
                    onInput     = {( event: Event ) => shapeInput.label = ( event.target as HTMLInputElement ).value }
                    value       = { shapeInput.label }
                    setError    = { () => labelShape.valid = errorInput( { ...labelShape, required: shapeInput.shape === 'check' }, shapeInput.label )}
                />

                {#if shapeInput.shape === 'check' }
                    <div class="flex mt-5">
                        <Check
                            shapeInput = {{
                                id      : uuid(),
                                name    : 'default-value',
                                label   : 'Valor por defecto',
                                checked : shapeInput.defaultChecked
                            }}
                            onChange = {( e ) => shapeInput.defaultChecked = e }
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
                {:else if shapeInput.shape === 'timer'}
                    {#if shapeInput.time?.isAnalogic}
                        <AnalogicTime
                            shapeInput = {{
                                id          : uuid(),
                                name        : 'time-default',
                                label       : 'Tiempo por defecto',
                                timeValue   : shapeInput.timeValue,
                            }}
                            onTimerInput = {( value: string ) => shapeInput.timeValue = value }
                        />
                    {:else}
                        <DigitalTime
                            shapeInput = {{
                                id		    : uuid(),
                                name	    : 'time-default',
                                label       : 'Tiempo por defecto',
                                timeValue   : shapeInput.timeValue
                            }}
                            onTimerInput = {( value: string ) => shapeInput.timeValue = value }
                        />
                    {/if}
                {:else if shapeInput.shape !== 'button'}
                    <Input
                        shapeInput = {{ ...placeholderShape }}
                        onInput = {( event: Event ) => shapeInput.placeholder = ( event.target as HTMLInputElement ).value }
                        value = { shapeInput.placeholder }
                        setError    = { () => placeholderShape.valid = errorInput(placeholderShape, shapeInput.placeholder) }
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
                            label       : 'Altura de la caja',
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
                <SelectEditor bind:shapeInput={ shapeInput } />
            {:else if shapeInput.shape === 'button'}
                <ButtonRequired bind:shapeInput={ shapeInput } />
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

                    <Accordion.Content class="pb-3 tracking-[-0.01em] space-y-2">
                        {#if shapeInput.shape !== 'button' }
                            <div class="grid grid-cols-1 @xl:grid-cols-2 gap-4 items-center">
                                <div class=" flex items-center justify-between gap-2">
                                    <Check
                                        shapeInput = {{
                                            id		    : uuid(),
                                            label       : 'Requerido',
                                            name	    : 'required',
                                            checked     : shapeInput.required
                                        }}
                                        onChange	= {( e ) => shapeInput.required = e as boolean }
                                    />

                                    {#if shapeInput.shape === 'datepicker'}
                                        <Check
                                            shapeInput = {{
                                                id      : uuid(),
                                                name    : 'is-range',
                                                label   : 'Con rango',
                                                checked : shapeInput.isRange
                                            }}
                                            onChange = {( e ) => shapeInput.isRange = e}
                                        />
                                    {:else if shapeInput.shape === 'timer'}
                                        <Check 
                                            shapeInput = {{
                                                id      : uuid(),
                                                name    : 'analogic',
                                                label   : 'Reloj Análogo',
                                                checked : shapeInput.time?.isAnalogic
                                            }}
                                            onChange = {( e ) => { shapeInput.time = { isAnalogic: e }}}
                                        />
                                    {/if}
                                </div>

                                <Input
                                    shapeInput = {{
                                        ... requiredMssg,
                                        disabled: !shapeInput.required,
                                        required: shapeInput.required
                                    }}
                                    onInput     = {( event: Event ) => shapeInput.msgRequired = ( event.target as HTMLInputElement ).value }
                                    setError    = { () => requiredMssg.valid = errorInput( requiredMssg, shapeInput.msgRequired )}
                                    value       = { shapeInput.msgRequired }
                                />
                            </div>
						{:else if shapeInput.shape === 'button' }
                            <ButtonValidations bind:shapeInput={ shapeInput } />
                        {/if}

                        {#if shapeInput.shape === 'input' || shapeInput.shape === 'textarea' || shapeInput.shape === 'markdown' }
                            <div class="grid grid-cols-1 @lg:grid-cols-2 gap-2 items-center">
                                <ValidInput
                                    bind:shapeInput = { shapeInput }
                                />
                            </div>
                        {:else if shapeInput.shape === 'datepicker'}
                            <div class="grid grid-cols-1 @xl:grid-cols-2 gap-2 items-center">
                                <DatePicker
                                    shapeInput = {{
                                        id      : uuid(),
                                        name    : 'min-value',
                                        date    : shapeInput.minValue,
                                        label   : 'Fecha mínima',
                                        minValue: shapeInput.minValue,
                                        maxValue: shapeInput.maxValue,
                                        invalidDates: shapeInput.invalidDates
                                    }}
                                    onValueChange = {( value: DateValue ) => shapeInput.minValue = value }
                                />

                                <DatePicker
                                    shapeInput = {{
                                        id      : uuid(),
                                        name    : 'max-value',
                                        date    : shapeInput.maxValue,
                                        label   : 'Fecha máxima',
                                        minValue: shapeInput.minValue,
                                        maxValue: shapeInput.maxValue,
                                        invalidDates: shapeInput.invalidDates
                                    }}
                                    onValueChange = {( value: DateValue ) => shapeInput.maxValue = value }
                                />
                            </div>

                            <GenerateValidDates
                                invalidDates            = { shapeInput.invalidDates }
                                onInvalidDatesChange    = {( dates: string[] ) => shapeInput.invalidDates = dates }
                                minValue              = { shapeInput.minValue }
                                maxValue              = { shapeInput.maxValue }
                            />  

                        {:else if shapeInput.shape === 'timer' }
                            <span class="text-sm font-semibold text-zinc-500 dark:text-zinc-300">Horas y minutos disponibles</span>

                            <TimeGenerator 
                                onHourListChange={(hours: number[]) => shapeInput.time = {
                                    ...shapeInput.time,
                                    hourList: hours
                                }}
                                onMinuteListChange={(minutes: number[]) => shapeInput.time = {
                                    ...shapeInput.time,
                                    minuteList: minutes
                                }}
                            />
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

                    <Accordion.Content class="pb-3 tracking-[-0.01em] space-y-2">
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
									value       : shapeInput.boxStyle ?? ( styles[shapeInput.shape || 'none'] as InputStyle ).box
								}}
								onInput = {( event: Event ) => shapeInput.boxStyle = ( event.target as HTMLInputElement ).value }
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
						{:else if shapeInput.shape === 'datepicker' || shapeInput.shape === 'timer'}
							<TextArea
								shapeInput = {{
									id          : uuid(),
									name        : 'class',
									label       : 'Componente principal box',
									placeholder : 'Ingrese los estilos de la caja',
									rows        : 3,
									value       : shapeInput.class_ ?? ( styles[
                                        shapeInput.shape === 'timer' 
                                        ? shapeInput.time?.isAnalogic ? 'analogic' : 'digital'
                                        : shapeInput.shape
                                    ] as InputStyle ).box
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
									value       : shapeInput.inputStyle ?? ( styles[
                                        shapeInput.shape === 'timer' 
                                            ? shapeInput.time?.isAnalogic ? 'analogic' : 'digital'
                                            : shapeInput.shape
                                    ] as InputStyle ).input
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
									value       : shapeInput.contentStyle ?? ( styles[
                                        shapeInput.shape === 'timer' 
                                        ? shapeInput.time?.isAnalogic ? 'analogic' : 'digital'
                                        : shapeInput.shape
                                    ] as InputStyle ).content
								}}
								onInput = {( event: Event ) => shapeInput.contentStyle = ( event.target as HTMLInputElement ).value }
							/>

							<TextArea
								shapeInput = {{
									id          : uuid(),
									name        : 'class',
									label       : 'Estilos del Item',
									placeholder : 'Ingrese los estilos del item',
									rows        : 2,
									value       : shapeInput.labelStyle ?? ( styles[
                                        shapeInput.shape === 'timer' 
                                            ? shapeInput.time?.isAnalogic ? 'analogic' : 'digital'
                                            : shapeInput.shape
                                    ] as InputStyle ).item
								}}
								onInput = {( event: Event ) => shapeInput.itemStyle = ( event.target as HTMLInputElement ).value }
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
