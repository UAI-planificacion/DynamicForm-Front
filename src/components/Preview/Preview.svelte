<script lang="ts">
    import type { DateRange }   from 'bits-ui';
    import { type DateValue }   from "@internationalized/date";
    import toast                from 'svelte-french-toast';

    import {
		Input,
		Check,
		Button,
		DatePicker,
		TextArea,
		Enumeration,
		SubTitle,
		MarkdownEditor,
        VirtualSelect,
        JsonViewer,
        DateRangePicker,
        Timer,

        AnalogicTimer

	} 							            from "$components";
	import {
		errorSelect,
		errorCheck,
		errorInput,
		errorTextArea,
		errorDatePicker,
		successToast,
		errorToast,
    errorTimer,
	}							            from "$lib";
    import type { SelectInput, ShapeInput } from "$models";


    export let template		: ShapeInput[] = [];
	export let inputActive 	: number;
	export let dynamicMode	: boolean = false;


    const keys = ["value", "checked", "date", "selected", 'dateRange'];


	let loading = false;
    let formValues: Record<string, any> = {};
    let previousTemplate = template;

    // Cargar valores por defecto cuando cambie el template completamente
    $: {
        if ( template !== previousTemplate ) {
            formValues = {};

            formValues = template.reduce((acc, item) => {
                const value = keys.find((key) => item[key] !== undefined)
                    ? item[keys.find((key) => item[key] !== undefined) as keyof typeof item]
                    : undefined;

                if ( item.shape !== 'button' && value !== undefined ) {
                    acc[item.name] = value;
                }

                return acc;
            }, {} as Record<string, any>);

            previousTemplate = template;
        }
    }

    // Limpiar y actualizar formValues cuando template cambie
    $: {
        if (template) {
            // Obtener los nombres válidos del template
            const validNames = template
                .filter(item => item.shape !== 'button' && item.name?.trim())
                .map(item => item.name);

            // Crear un nuevo objeto con los valores iniciales
            const initialValues = template.reduce((acc, item) => {
                const value = keys.find((key) => item[key] !== undefined)
                    ? item[keys.find((key) => item[key] !== undefined) as keyof typeof item]
                    : undefined;

                // Solo agregar si es un nombre válido y tiene un valor
                if (item.shape !== 'button' && item.name?.trim() && value !== undefined) {
                    acc[item.name] = value;
                }

                return acc;
            }, {} as Record<string, any>);

            // Mantener solo los valores con nombres válidos del template actual
            const currentValues = Object.entries(formValues)
                .filter(([key]) => validNames.includes(key))
                .reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {} as Record<string, any>);

            // Combinar valores actuales con los iniciales
            formValues = {
                ...initialValues,  // Valores por defecto del template
                ...currentValues   // Valores actuales que coinciden con nombres válidos
            };
        }
    }


    function getValuesDate( date: DateValue | undefined ) : { year: number, month: number, day: number } | undefined {
        if ( !date ) return undefined;

        const { day, month, year } = date;
        return { year, month: (month - 1), day };
    }


    const isDateRange = (
        value: DateValue | DateRange | undefined
    ): value is DateRange => 
        value !== undefined && 'start' in value && 'end' in value;


    function handleDatePicker(
        event: DateValue | DateRange | undefined,
        name: string
    ): void {
        if ( !event ) {
            formValues[name] = null;
            return;
        }

        if ( isDateRange( event )) {
            formValues[name] = { 
                start   : getValuesDate( event.start ),
                end     : getValuesDate( event.end )
            };

            return;
        }

        formValues[name] = getValuesDate( event );
    }


    const handleTime = ( time: string, name: string ) => {
        const [ hour, minute ] = time.split( ':' );

        formValues[name] = {
            hour    :  hour     === '' ? null : Number( hour ),
            minute  :  minute   === '' ? null : Number( minute )
        };
    }


    const handleInput = ( event: Event, name: string ): string =>
		formValues[name] = (event.target as HTMLInputElement).value;


    const handleCheck = ( isChecked: boolean, name: string ): boolean =>
		formValues[name] = isChecked;


    async function onClick() {
        if ( Object.keys( formValues ).length === 0 ) {
            toast.error( 'Por favor, cree un formulario válido.', errorToast() );
            return;
        };

        const button = template.find( item => item.shape === 'button' );

		if ( !button ) return;

		template.forEach(( item, index ) => {
			template[index].valid = {
				'input'			    : errorInput( item, formValues[ item.name ]),
				'textarea'		    : errorTextArea( item, formValues[ item.name ]),
				'markdown'		    : errorTextArea( item, formValues[ item.name ]),
				'check'			    : errorCheck( item, formValues[ item.name ]),
				'select'		    : errorSelect( item, formValues[ item.name ]),
				'datepicker'	    : errorDatePicker( item, formValues[ item.name ]),
                'timer'             : errorTimer( item, formValues[ item.name ]),
				'button'		    : true,
				'none'			    : false
			}[item.shape || 'none'];
		});

		if ( template.some( item => !item.valid )) {
			toast.error( button!.invalidErrorMsg ?? "Hay un error en el formulario", errorToast() );
			return;
		}

		loading = true;

        try {
			const response 	= await fetch( '/api/send', {
				method	: 'POST',
				headers	: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					formValues,
					button
				})
			});

			const result = await response.json();

			if ( !result.success ) {
				toast.error( result.message, errorToast() );
				return;
			}

			toast.success( result.message, successToast() );
		} catch ( error ) {
			console.error( 'Error al enviar formulario:', error );
			toast.error( button!.externalErrorMsg ?? "Error de conexión", errorToast() );
		} finally {
			loading = false;
		}
	}
</script>

<container class="space-y-3 h-full overflow-auto">
	{#if dynamicMode}
		<SubTitle title="Vista Previa" />
	{/if}

    {#each template as shapeInput, index }
		<div class={`flex ${dynamicMode ? "gap-1.5" : "" } ${inputActive === index + 1 ? ' pr-2 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-800' : ''}`}>
			{#if dynamicMode}
				<Enumeration
					number	= { index + 1 }
					active	= { inputActive === index + 1 }
				/>
			{/if}
			<!-- Input -->
			{#if shapeInput.shape === 'input'}
				<Input
					{ shapeInput }
					onInput		= {( event: Event ) => handleInput( event, shapeInput.name )}
					value 		= { formValues[ shapeInput.name ]}
					setError 	= {() => shapeInput.valid = errorInput( shapeInput, formValues[ shapeInput.name ])}
				/>
			<!-- Select -->
			{:else if shapeInput.shape === 'select'}
                <VirtualSelect
                    { shapeInput }
                    value               = { formValues[ shapeInput.name ]}
                    setError            = {() => shapeInput.valid = errorSelect( shapeInput, formValues[ shapeInput.name ])}
                    onSelectedChange	= {( value: SelectInput ) => {
                        formValues[shapeInput.name] = Array.isArray( value ) 
                            ? value.map( s => s )
                            : value;

                        shapeInput.valid = errorSelect( shapeInput, formValues[ shapeInput.name ]);
                    }}
                />
			<!-- Button -->
			{:else if shapeInput.shape === 'button'}
				<Button
					{ shapeInput }
					{ onClick }
					{ loading }
				/>
			<!-- Check -->
			{:else if shapeInput.shape === 'check'}
				<Check
					{ shapeInput }
					onChange	= {( checked: boolean ) => handleCheck( checked, shapeInput.name )}
					checked		= { formValues[ shapeInput.name ]}
					setError	= {() => shapeInput.valid = errorCheck( shapeInput, formValues[ shapeInput.name ])}
				/>
			<!-- DatePicker -->
			{:else if shapeInput.shape === 'datepicker' && !shapeInput.isRange}
				<DatePicker
					{ shapeInput }
					onValueChange	= {( value: DateValue ) => handleDatePicker( value, shapeInput.name )}
					value 			= { formValues[ shapeInput.name ]}
					setError		= {() => shapeInput.valid = errorDatePicker( shapeInput, formValues[ shapeInput.name ])}
				/>
			{:else if shapeInput.shape === 'datepicker' && shapeInput.isRange}
				<DateRangePicker
					{ shapeInput }
					onValueChange	= {( value: DateRange | undefined ) => handleDatePicker( value, shapeInput.name )}
					value 			= { formValues[ shapeInput.name ] }
					setError		= {() => shapeInput.valid = errorDatePicker( shapeInput, formValues[ shapeInput.name ])}
				/>
			<!-- TextArea -->
			{:else if shapeInput.shape === 'textarea'}
				<TextArea
					{ shapeInput }
					onInput		= {( event: Event ) => handleInput( event, shapeInput.name )}
					value		= { formValues[ shapeInput.name ]}
					setError	= {() => shapeInput.valid = errorTextArea( shapeInput, formValues[ shapeInput.name ])}
				/>
			{:else if shapeInput.shape === 'markdown'}
				<MarkdownEditor
					{ shapeInput }
					onInput		= {( event: Event ) => handleInput( event, shapeInput.name )}
					value		= { formValues[ shapeInput.name ]}
					setError	= {() => shapeInput.valid = errorTextArea( shapeInput, formValues[ shapeInput.name ])}
					dynamicMode={ dynamicMode }
				/>
            <!-- Time -->
            {:else if shapeInput.shape === 'timer' }
                <Timer
                    { shapeInput }
                    onTimerInput	= {( value: string ) => handleTime( value, shapeInput.name )}
                    value			= { formValues[ shapeInput.name ]}
                    setError	    = {() => shapeInput.valid = errorTimer( shapeInput, formValues[ shapeInput.name ])}
                />
            <!-- Analogic Time -->
            <!-- {:else if shapeInput.shape === 'timer' && shapeInput.time?.isAnalogic} -->
                <!-- <AnalogicTimer
                    { shapeInput }
                    onInput		= {( event: Event ) => handleInput( event, shapeInput.name )}
                    value		= { formValues[ shapeInput.name ]}
                    setError	= {() => shapeInput.valid = errorTextArea( shapeInput, formValues[ shapeInput.name ])}
                /> -->
			<!-- Default -->
			{:else}
				<p class="text-red-500">La entrada es inválida.</p>
			{/if}
		</div>
	{ /each }

	{ #if dynamicMode }
        <SubTitle title="Información obtenida" />

        <div class="p-4 rounded-lg bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200 dark:border-zinc-700">
            <JsonViewer data={ formValues } />
        </div>
	{ /if }
</container>
