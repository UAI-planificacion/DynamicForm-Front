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
        DigitalTime,
        AnalogicTime
	} 					from "$components";
	import {
		errorSelect,
		errorCheck,
		errorInput,
		errorTextArea,
		errorDatePicker,
		successToast,
		errorToast,
        errorTimer,
        stringToTime
	}					from "$lib";
    import type {
        DateDetail,
        DatesRange,
        SelectInput,
        ShapeInput,
        ThemeShape
    }                   from "$models";


    export let template		: ShapeInput[] = [];
	export let inputActive 	: number;
	export let dynamicMode	: boolean = false;
    export let themeShape   : ThemeShape;


    const keys = [
        "value",
        "checked",
        "date",
        'dateRange',
        "selected",
        'timeValue'
    ];


	let loading = false;
    let formValues: Record<string, any> = {};
    let previousTemplate = template;


    function getTodayDate(): { year: number; month: number; day: number } {
        const date = new Date();

        return {
            year    : date.getFullYear(),
            month   : date.getMonth(),
            day     : date.getDate()
        }
    }


    const getDateDetails = ( dateDetail: DateDetail ): DateDetail  => ({
        year    : dateDetail.year,
        month   : dateDetail.month,
        day     : dateDetail.day,
    });


    function getTodayDateRange( dateRange?: DatesRange ): DatesRange | undefined {
        if ( !dateRange || !dateRange.start || !dateRange.end ) return undefined;

        const start = getDateDetails( dateRange.start );
        const end   = getDateDetails( dateRange.end );

        return { start, end };
    }

    // Cargar valores por defecto cuando cambie el template completamente
    $: {
        if ( template !== previousTemplate ) {
            formValues = {};

            formValues = template.reduce((acc, item) => {
                const value = keys.find((key) => item[key] !== undefined)
                    ? item[keys.find((key) => item[key] !== undefined) as keyof typeof item]
                    : undefined;

                if ( item.shape !== 'button' && value !== undefined ) {
                    if (item.shape === 'datepicker' ) {
                        if ( item.currentDate === true && !item.isRange )
                            acc[item.name] = getTodayDate();
                        else if ( item.isRange ) 
                            acc[item.name] = getTodayDateRange( item.dateRange );
                    } else if (item.shape === 'timer') {
                        acc[item.name] = stringToTime( item.timeValue );
                    } else {
                        acc[item.name] = value;
                    }
                }

                return acc;
            }, {} as Record<string, any>);

            previousTemplate = template;
        }
    }


    function validDateRange(
        currentValues: Record<string, any>
    ): Record<string, any> {
        const value = currentValues;

        Object.keys( currentValues ).forEach(key => {
            const matchingItem = template.find(item => 
                item.name === key && item.isRange === false
            );

            const isDateRangeType = currentValues[key] && 
                typeof currentValues[key] === 'object' &&
                'start' in currentValues[key] &&
                'end' in currentValues[key] &&
                currentValues[key].start !== null &&
                currentValues[key].end !== null;

            if ( matchingItem && isDateRangeType ) {
                value[key] = undefined;
            }
        });

        return value;
    }


    let previousShapes: Record<string, string> = {};


    $: {
        if (template) {
            const validNames = template
                .filter(item => item.shape !== 'button' && item.name?.trim())
                .map(item => item.name);

            const initialValues = template.reduce((acc, item) => {
                const validKey = keys.find((key) => item[key] !== undefined && item[key] !== '');
                const value = validKey ? item[validKey] : undefined;

                if (item.shape !== 'button' && item.name?.trim()) {
                    acc[item.name] = value;
                }

                return acc;
            }, {} as Record<string, any>);

            let currentValues = Object.entries(formValues)
                .filter(([key]) => validNames.includes(key))
                .reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {} as Record<string, any>);

            template.forEach(item => {
                if ( item.shape !== 'button' && item.name?.trim() ) {
                    const previousShape = previousShapes[item.name];

                    if ( previousShape !== undefined && previousShape !== item.shape ) {
                        currentValues[item.name] = undefined;
                    }

                    previousShapes[item.name] = item.shape as string;
                }
            });

            currentValues = validDateRange( currentValues );

            formValues = {
                ...initialValues,
                ...currentValues
            };
        }
    }


    function getValuesDate(
        date: DateValue | undefined
    ): { year: number, month: number, day: number } | undefined {
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


    const handleTime = ( time: string, name: string, isAnalog = false ) => {
        const [ hour, minute ] = time.split( ':' );

        const compareHour   = isAnalog ? 'hh' : '';
        const compareMinute = isAnalog ? 'mm' : '';

        formValues[name] = {
            hour    :  hour     === compareHour ? null : Number( hour ),
            minute  :  minute   === compareMinute ? null : Number( minute )
        };
    }


    const handleInput = ( value: string, name: string ): string =>
		formValues[name] = value;

    const handleCheck = ( isChecked: boolean, name: string ): boolean =>
		formValues[name] = isChecked;


    async function onClick() {
        if ( Object.keys( formValues ).length === 0 ) {
            toast.error( 'Por favor, cree un formulario válido.', errorToast() );
            return;
        };

        const button = template.find( item => item.shape === 'button' );

		template.forEach(( item, index ) => {
			template[index].valid = {
				'input'         : errorInput( item, formValues[ item.name ]),
				'textarea'		: errorTextArea( item, formValues[ item.name ]),
				'markdown'		: errorTextArea( item, formValues[ item.name ]),
				'check'			: errorCheck( item, formValues[ item.name ]),
				'select'		: errorSelect( item, formValues[ item.name ]),
				'datepicker'    : errorDatePicker( item, formValues[ item.name ]),
                'timer'			: errorTimer( item, formValues[ item.name ]),
				'button'		: true,
				'none'			: false
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

    <div class=" grid grid-cols-1 xl:grid-cols-1 gap-3">

    {#each template as shapeInput, index }
		<div class={`flex ${dynamicMode ? "gap-1.5" : "" } ${inputActive === index + 1 ? ' pr-2 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-800' : ''}`}>
			{#if dynamicMode && shapeInput.shape !== 'button'}
				<Enumeration
					number	= { index + 1 }
					active	= { inputActive === index + 1 }
				/>
			{/if}
			<!-- Input -->
			{#if shapeInput.shape === 'input'}
				<Input
					{ shapeInput }
                    { themeShape }
					onInput		= {( value: string ) => handleInput( value, shapeInput.name )}
					value 		= { formValues[ shapeInput.name ]}
					setError 	= {() => shapeInput.valid = errorInput( shapeInput, formValues[ shapeInput.name ])}
				/>
			<!-- Select -->
			{:else if shapeInput.shape === 'select'}
                <VirtualSelect
                    { themeShape }
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
			
			<!-- Check -->
			{:else if shapeInput.shape === 'check'}
				<Check
                    { themeShape }
					{ shapeInput }
					onChange	= {( checked: boolean ) => handleCheck( checked, shapeInput.name )}
					checked		= { formValues[ shapeInput.name ]}
					setError	= {() => shapeInput.valid = errorCheck( shapeInput, formValues[ shapeInput.name ])}
				/>
			<!-- DatePicker -->
			{:else if shapeInput.shape === 'datepicker' && !shapeInput.isRange}
				<DatePicker
                    { themeShape }
					{ shapeInput }
					onValueChange	= {( value: DateValue ) => handleDatePicker( value, shapeInput.name )}
					value 			= { formValues[ shapeInput.name ]}
					setError		= {() => shapeInput.valid = errorDatePicker( shapeInput, formValues[ shapeInput.name ])}
				/>
			{:else if shapeInput.shape === 'datepicker' && shapeInput.isRange}
				<DateRangePicker
                    { themeShape }
					{ shapeInput }
					onValueChange	= {( value: DateRange | undefined ) => handleDatePicker( value, shapeInput.name )}
					value 			= { formValues[ shapeInput.name ] }
					setError		= {() => shapeInput.valid = errorDatePicker( shapeInput, formValues[ shapeInput.name ])}
				/>
			<!-- TextArea -->
			{:else if shapeInput.shape === 'textarea'}
				<TextArea
                    { themeShape }
					{ shapeInput }
					onInput		= {( value: string ) => handleInput( value, shapeInput.name )}
					value		= { formValues[ shapeInput.name ]}
					setError	= {() => shapeInput.valid = errorTextArea( shapeInput, formValues[ shapeInput.name ])}
				/>
			{:else if shapeInput.shape === 'markdown'}
				<MarkdownEditor
					{ themeShape }
					{ shapeInput }
					onInput		= {( value: string ) => handleInput( value, shapeInput.name )}
					value		= { formValues[ shapeInput.name ]}
					setError	= {() => shapeInput.valid = errorTextArea( shapeInput, formValues[ shapeInput.name ])}
					dynamicMode = { dynamicMode }
				/>
            <!-- Digital Time -->
            {:else if shapeInput.shape === 'timer' && !shapeInput.time?.isAnalogic }
                <DigitalTime
                    { themeShape }
                    { shapeInput }
                    onTimerInput	= {( value: string ) => handleTime( value, shapeInput.name )}
                    value			= { stringToTime( formValues[ shapeInput.name ])}
                    setError	    = {() => shapeInput.valid = errorTimer( shapeInput, formValues[ shapeInput.name ])}
                />
            <!-- Analogic Time -->
            {:else if shapeInput.shape === 'timer' && shapeInput.time?.isAnalogic}
                <AnalogicTime
                    { themeShape }
                    { shapeInput }
                    onTimerInput    = {( value: string ) => handleTime( value, shapeInput.name, true )}
                    value			= { stringToTime( formValues[ shapeInput.name ] )}
                    setError		= {() => shapeInput.valid = errorTimer( shapeInput, formValues[ shapeInput.name ])}
                />
			<!-- Default -->
			{:else if shapeInput.shape !== 'button'}
				<p class="text-red-500">La entrada es inválida.</p>
			{/if}
		</div>
	{ /each }
</div>

    <!-- Button -->
    <Button
        { themeShape }
        shapeInput={ template.find( item => item.shape === 'button' ) as ShapeInput}
        onClick={ onClick }
        loading={ loading }
    />


	{ #if dynamicMode }
        <SubTitle title="Información obtenida" />

        <div class="p-4 rounded-lg bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200 dark:border-zinc-700">
            <JsonViewer data={ formValues } />
        </div>
	{ /if }
</container>
