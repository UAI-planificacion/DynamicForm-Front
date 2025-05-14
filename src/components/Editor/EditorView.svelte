<script lang="ts">
    import { Accordion, type DateRange }    from "bits-ui";
	import { v4 as uuid }	                from 'uuid';
    import { type DateValue }               from "@internationalized/date";

    import {
        CaretDownIcon
    }                       from "$icons";
    import type {
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
        ValidInput,
        DateRangePicker,
        ButtonRequired,
        ButtonValidations,
        ButtonStyles,
    }						from "$components";
    import {
		options,
		types,
        errorInput,
        errorSelect,
        stringToTime
	}                       from "$lib";

    export let shapeInput       : ShapeInput;
    export let onDelete         : VoidFunction;
    export let inputActive      : VoidFunction;
    export let inputDesactive   : VoidFunction;

    shapeInput.valid        = true;
    shapeInput.msgRequired  = 'El campo es requerido.'


    let editing: boolean = false;


    function onSelectedChange( selected: SelectInput ) {
		if ( selected === undefined || selected instanceof Array ) return;

		shapeInput.shape = selected as InputType || 'none';

        isInput = !(shapeInput.shape === 'input' || shapeInput.shape === 'textarea' || shapeInput.shape === 'markdown');
        isSelectionValid = !(shapeInput.shape === 'select');

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
        shape   : 'input',
        type    : 'text',
        valid   : true
    }


    const virtualShape = {
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


    const nameShape = {
        ...baseInputShape,
        id		    : uuid(),
        label       : 'Nombre',
        name	    : 'name',
        placeholder : 'Ingrese el nombre',
        value       : shapeInput.name,
        required    : true,
        msgRequired : 'El nombre es requerido.',
        maxLength   : 50,
        msgMaxLength: 'Máximo 50 caracteres permitidos.',
    } as ShapeInput;


    const labelShape = {
        ...baseInputShape,
        id		    : uuid(),
        label       : 'Etiqueta',
        name	    : 'label',
        placeholder : 'Ingrese la etiqueta',
        value       : shapeInput.label,
        required    : shapeInput.shape === 'check' || shapeInput.shape === 'button',
        msgRequired : 'La etiqueta es requerida.',
        maxLength   : 50,
        msgMaxLength: 'Máximo 50 caracteres permitidos.',
        valid       : true
    } as ShapeInput;


    const placeholderShape = {
        ...baseInputShape,
        id			: uuid(),
        label       : 'Placeholder',
        name	    : 'placeholder',
        placeholder : 'Ingrese el placeholder',
        value       : shapeInput.placeholder,
        maxLength   : 50,
        msgMaxLength: 'Máximo 50 caracteres permitidos.',
    } as ShapeInput;


    const rowsShape = {
        ...baseInputShape,
        id		    : uuid(),
        label       : 'Altura de la caja',
        name	    : 'rows',
        placeholder : 'Ingrese el alto que tendrá la caja de texto',
        value       : shapeInput.rows?.toString() ?? "4",
        type        : 'number' as Types,
        min         : 1,
        max         : 50,
        msgMin      : 'La altura debe ser al menos 1',
        msgMax      : 'La altura debe ser al menos 50',
    } as ShapeInput;


    const requiredMssg = {
        id			: uuid(),
        name		: 'msg-required',
        label		: 'Mensaje de requerido',
        placeholder	: 'Ingrese el mensaje de requerido',
        required	: true,
        shape		: 'input',
        type		: 'text',
        msgRequired	: 'El mensaje es requerido',
        msgMaxLength	: 'El mensaje debe tener entre 1 y 50 caracteres',
        maxLength	: 50,
        valid		: true,
        value       : shapeInput.msgRequired
    } as ShapeInput;


    const typeShape = {
        id			: uuid(),
        name 		: 'type',
        placeholder	: 'Ingrese el tipo',
        required 	: true,
        msgRequired	: 'El tipo es requerido',
        label		: 'Tipo de entrada',
        selected	: shapeInput.type,
        options     : types,
        valid : true,
        shape : 'select'
    } as ShapeInput


    let countSend = 0;
    export let isValid = false;
    let isInput = true;
    let isSelectionValid = true;
    let isButtonValid = true;

    $: if ( countSend ) {
        nameShape.valid         = errorInput( nameShape, shapeInput.name );
        labelShape.valid        = errorInput( { ...labelShape, required: shapeInput.shape === 'check' || shapeInput.shape === 'button' }, shapeInput.label );
        placeholderShape.valid  = errorInput( placeholderShape, shapeInput.placeholder );
        rowsShape.valid         = errorInput( rowsShape, shapeInput.rows?.toString() );
        requiredMssg.valid      = errorInput( {...requiredMssg, required: shapeInput.required }, shapeInput.msgRequired );
        virtualShape.valid      = errorSelect( virtualShape, shapeInput.shape );
        typeShape.valid         = errorSelect( {...typeShape,  required: shapeInput.shape ==='input'}, shapeInput.type );

        isValid = nameShape.valid
            && labelShape.valid
            && placeholderShape.valid
            && rowsShape.valid
            && requiredMssg.valid
            && virtualShape.valid
            && typeShape.valid
            && isInput
            && isSelectionValid
            && isButtonValid;
        // if ( isInput || isSelectionValid && countSend > 0 ) {
        //     countSend = 0;
        //     editing = false;
        //     inputDesactive();
        // }
    }
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
            <Accordion.Root class="w-full" type="single" value="basic">
                <Accordion.Item value="basic" class="group border-b border-dark-10 px-1.5 dark:border-zinc-700">
                    <Accordion.Header>
                        <Accordion.Trigger
                            class="flex w-full flex-1 items-center justify-between py-2 text-[15px] font-medium transition-all [&[data-state=open]>span>svg]:rotate-180 dark:text-zinc-300"
                        >
                            Campos básicos
                            <span
                                class="inline-flex size-8 items-center justify-center rounded-[7px] bg-transparent transition-all hover:bg-dark-10"
                            >
                                <CaretDownIcon />
                            </span>
                        </Accordion.Trigger>
                    </Accordion.Header>

                    <Accordion.Content class="pb-3 tracking-[-0.01em] space-y-2">
                        <div class={`grid grid-cols-1 ${ shapeInput.shape !== 'button' ? '@lg:grid-cols-2' : '' } items-start gap-2`}>
                            {#if shapeInput.shape !== 'button'}
                                <VirtualSelect
                                    shapeInput = {{ ...virtualShape, selected: shapeInput.shape }}
                                    { onSelectedChange }
                                    value = { shapeInput.shape }
                                    setError = { () => {
                                        virtualShape.valid = errorSelect( virtualShape, shapeInput.shape );
                                    }}
                                />

                                <Input
                                    shapeInput  = {{ ...nameShape, value: shapeInput.name }}
                                    onInput     = {( value: string ) => shapeInput.name = value }
                                    value       = { shapeInput.name }
                                    setError    = { () => nameShape.valid = errorInput(nameShape, shapeInput.name) }
                                />
                            {/if}

                            <Input
                                shapeInput  = {{ ...labelShape, value: shapeInput.label, required: shapeInput.shape === 'check' || shapeInput.shape === 'button' }}
                                onInput     = {( value: string ) => shapeInput.label = value }
                                value       = { shapeInput.label }
                                setError    = { () => labelShape.valid = errorInput( { ...labelShape, required: shapeInput.shape === 'check' || shapeInput.shape === 'button' }, shapeInput.label )}
                            />

                            {#if shapeInput.shape === 'input' || shapeInput.shape === 'select' || shapeInput.shape === 'textarea' || shapeInput.shape === 'markdown' || shapeInput.shape === 'none'}
                                <Input
                                    shapeInput  = {{ ...placeholderShape, value: shapeInput.placeholder }}
                                    onInput     = {( value: string ) => shapeInput.placeholder = value }
                                    value       = { shapeInput.placeholder }
                                    setError    = { () => placeholderShape.valid = errorInput(placeholderShape, shapeInput.placeholder) }
                                />
                            {/if}

                            {#if shapeInput.shape === 'check'}
                                <div class="flex mt-5">
                                    <Check
                                        shapeInput = {{
                                            id      : uuid(),
                                            name    : 'default-value',
                                            label   : 'Valor por defecto',
                                        }}
                                        onChange = {( e ) => shapeInput.checked = e }
                                        checked  = { shapeInput.checked }
                                    />
                                </div>
                            {:else if shapeInput.shape === 'datepicker'}
                                {#if !shapeInput.isRange }
                                    <div class="flex gap-2 items-center">
                                        <div class="w-48">
                                            <Check
                                                shapeInput = {{
                                                    id      : uuid(),
                                                    name    : 'current-date',
                                                    label   : 'Día actual',
                                                }}
                                                onChange = {( e ) => shapeInput.currentDate = e}
                                                checked  = { shapeInput.currentDate }
                                            />
                                        </div>

                                        <DatePicker
                                            shapeInput = {{
                                                id          : uuid(),
                                                name        : 'default-value',
                                                date        : shapeInput.date,
                                                label       : 'Valor por defecto',
                                            }}
                                            onValueChange = {( value: DateValue ) => shapeInput.date = value }
                                            value = { shapeInput.date }
                                        />
                                    </div>
                                {:else}
                                    <DateRangePicker
                                        onValueChange   = {( value: DateRange | undefined ) => shapeInput.dateRange = value }
                                        value           = { shapeInput.dateRange }
                                        shapeInput      = {{
                                            id              : uuid(),
                                            name            : 'default-value',
                                            label           : 'Valor por defecto',
                                            disabled        : shapeInput.currentDate
                                        }}
                                    />
                                {/if}
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
                                        value        = { stringToTime( shapeInput.timeValue )}
                                    />
                                {:else}
                                    <DigitalTime
                                        shapeInput = {{
                                            id		    : uuid(),
                                            name	    : 'time-default',
                                            label       : 'Tiempo por defecto',
                                            timeValue   : shapeInput.timeValue
                                        }}
                                        onTimerInput    = {( value: string ) => shapeInput.timeValue = value }
                                        value           = { stringToTime( shapeInput.timeValue )}
                                    />
                                {/if}
                            {/if}
                        </div>

                        <Input
                            shapeInput = {{
                                id		    : uuid(),
                                label       : 'Descripción',
                                name	    : 'description',
                                placeholder : 'Ingrese la descripción',
                            }}
                            onInput = {( value: string ) => shapeInput.description = value }
                            value = { shapeInput.description}
                        />

                        <div class="flex gap-2 justify-between items-center">
                            {#if shapeInput.shape === 'datepicker'}
                                <Check
                                    shapeInput = {{
                                        id      : uuid(),
                                        name    : 'is-range',
                                        label   : 'Con rango',
                                    }}
                                    onChange = {( check ) => shapeInput.isRange = check }
                                    checked  = { shapeInput.isRange }
                                />
                            {:else if shapeInput.shape === 'timer'}
                                <Check 
                                    shapeInput = {{
                                        id      : uuid(),
                                        name    : 'analogic',
                                        label   : 'Reloj Análogo',
                                    }}
                                    onChange = {( check ) =>  shapeInput.time = { isAnalogic: check }}
                                    checked  = { shapeInput.time?.isAnalogic }
                                />
                            {:else if shapeInput.shape === 'markdown'}
                                <Check
                                    shapeInput = {{
                                        id		: uuid(),
                                        label   : 'Previsualización',
                                        name	: 'preview',
                                    }}
                                    onChange = {( e ) => shapeInput.preview = e as boolean }
                                    checked  = { shapeInput.preview }
                                />
                            {/if}

                            <Check
                                shapeInput = {{
                                    id		: uuid(),
                                    label   : 'Desactivado',
                                    name	: 'disabled',
                                }}
                                onChange = {( e ) => shapeInput.disabled = e as boolean }
                                checked  = { shapeInput.disabled }
                            />

                            <Check
                                shapeInput = {{
                                    id		: uuid(),
                                    label   : 'Solo lectura',
                                    name	: 'readonly',
                                }}
                                onChange = {( e ) => shapeInput.readonly = e as boolean }
                                checked  = { shapeInput.readonly }
                            />
                        </div>

                        {#if shapeInput.shape === 'input' }
                            <div class="grid grid-cols-1 @lg:grid-cols-2 gap-2 items-center">
                                <VirtualSelect
                                    shapeInput          = {{ ...typeShape, selected: shapeInput.type, required: shapeInput.shape ==='input' }}
                                    onSelectedChange    = { onSelectedType }
                                    setError            = { () => typeShape.valid = errorInput( typeShape, shapeInput.type ) }
                                    value               = { shapeInput.type }
                                />

                                {#if true}
                                    {@const defaultValueShape = {
                                        ...baseInputShape,
                                        id		    : uuid(),
                                        label       : 'Valor por defecto',
                                        name	    : 'value',
                                        placeholder : 'Valor con el que se inicia',
                                        type        : (shapeInput.type === 'number' ? 'number' : 'text') as Types
                                    } as ShapeInput}
                                    <Input
                                        shapeInput = {{ ...defaultValueShape }}
                                        onInput = {( value: string ) => shapeInput.value = value }
                                        value = { shapeInput.value }
                                    />
                                {/if}
                            </div>
                        {:else if shapeInput.shape === 'textarea' }
                            <div class="grid grid-cols-1 sm:grid-cols-2 space-x-2 items-center">
                                <Input
                                    shapeInput  = {{ ...rowsShape, value: shapeInput.rows?.toString() }}
                                    onInput     = {( value: string ) => shapeInput.rows = Number(value) }
                                    setError    = { () => rowsShape.valid = errorInput( rowsShape, shapeInput.rows?.toString() )}
                                    value       = { shapeInput.rows?.toString() }
                                />

                                {#if true}
                                    {@const textareaDefaultShape = {
                                        ...baseInputShape,
                                        id          : uuid(),
                                        name        : 'default-value',
                                        label       : 'Valor por defecto',
                                        placeholder : 'Ingrese el valor por defecto',
                                        rows        : 1,
                                    } as ShapeInput}
                                    <TextArea
                                        shapeInput  = {{ ...textareaDefaultShape }}
                                        onInput     = {( value: string ) => shapeInput.value = value }
                                        value       = { shapeInput.value }
                                    />
                                {/if}
                            </div>
                        {:else if shapeInput.shape === 'markdown' }
                            {#if true}
                                {@const markdownDefaultShape = {
                                    ...baseInputShape,
                                    id		    : uuid(),
                                    label       : 'Valor por defecto',
                                    name	    : 'value',
                                    placeholder : 'Ingrese el valor por defecto',
                                    preview		: false
                                } as ShapeInput}
                                <MarkdownEditor
                                    shapeInput  = {{ ...markdownDefaultShape }}
                                    dynamicMode	= { true }
                                    onInput		= {( value: string ) => shapeInput.value = value }
                                    value       = { shapeInput.value }
                                />
                            {/if}
                        {:else if shapeInput.shape === 'select' }
                            <SelectEditor
                                bind:shapeInput         = { shapeInput }
                                bind:isSelectionValid   = { isSelectionValid }
                                { countSend }
                            />
                        {:else if shapeInput.shape === 'button'}
                            <ButtonRequired
                                bind:shapeInput     = { shapeInput }
                                bind:isButtonValid  = { isButtonValid }
                                { countSend }
                            />
                        {/if}
                    </Accordion.Content>
                </Accordion.Item>

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
                                <Check
                                    shapeInput = {{
                                        id		    : uuid(),
                                        label       : 'Requerido',
                                        name	    : 'required',
                                    }}
                                    onChange = {( chech ) => shapeInput.required = chech }
                                    checked  = { shapeInput.required }
                                />

                                <Input
                                    shapeInput = {{
                                        ... requiredMssg,
                                        disabled: !shapeInput.required,
                                        required: shapeInput.required,
                                    }}
                                    onInput     = {( value ) => shapeInput.msgRequired = value }
                                    setError    = { () => requiredMssg.valid = errorInput( requiredMssg, shapeInput.msgRequired )}
                                    value       = { shapeInput.msgRequired }
                                />
                            </div>
                        {:else if shapeInput.shape === 'button' }
                            <ButtonValidations
                                bind:shapeInput     = { shapeInput }
                                bind:isButtonValid  = { isButtonValid }
                                { countSend }
                            />
                        {/if}

                        {#if shapeInput.shape === 'input' || shapeInput.shape === 'textarea' || shapeInput.shape === 'markdown' }
                            <div class="grid grid-cols-1 @lg:grid-cols-2 gap-2 items-center">
                                <ValidInput
                                    bind:shapeInput = { shapeInput }
                                    bind:isValid    = { isInput }
                                    { countSend }
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

                {#if shapeInput.shape === 'button' }
                    <Accordion.Item value="accordion" class="group border-b border-dark-10 px-1.5 dark:border-zinc-700">
                        <Accordion.Header>
                            <Accordion.Trigger
                                class="flex w-full flex-1 items-center justify-between py-2 text-[15px] font-medium transition-all [&[data-state=open]>span>svg]:rotate-180 dark:text-zinc-300"
                            >
                                Tema

                                <span
                                    class="inline-flex size-8 items-center justify-center rounded-[7px] bg-transparent transition-all hover:bg-dark-10"
                                >
                                    <CaretDownIcon />
                                </span>
                            </Accordion.Trigger>
                        </Accordion.Header>

                        <Accordion.Content class="pb-3 tracking-[-0.01em] space-y-2">
                            <ButtonStyles />
                        </Accordion.Content>
                    </Accordion.Item>
                {/if}
            </Accordion.Root>

            <div class="grid grid-cols-1 @lg:grid-cols-2 gap-2 items-center">
                <button
                    class="w-full hover:shadow-xl active:scale-[0.99] active:brightness-90 bg-zinc-800 rounded-lg py-2 text-white"
                    on:click={() => {
                        editing = false;
                        inputDesactive();
                    }}
                >
                    Cancelar
                </button>

                <button
                    class="w-full hover:shadow-xl active:scale-[0.99] active:brightness-90 bg-black rounded-lg py-2 text-white"
                    on:click={() => {
                        countSend++;

                        if ( !isValid ) return;

                        editing = false;
                        inputDesactive();
                    }}
                >
                    Guardar
                </button>
            </div>
        </section>
    {/if}
</card>
