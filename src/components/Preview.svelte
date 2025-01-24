<script lang="ts">
	import toast 				from 'svelte-french-toast';
	import { type DateValue }	from "@internationalized/date";
    import { type Selected }	from "bits-ui";

    import {
		Input,
		Select,
		Check,
		Combobox,
		Button,
		DatePicker,
		TextArea,
		Enumeration,
		SubTitle,
		MarkdownEditor
	} 							from "$components";
	import {
		errorSelect,
		errorCheck,
		errorInput,
		errorTextArea,
		errorDatePicker,
		successToast,
		errorToast,
	}							from "$lib";
    import type { ShapeInput }  from "$models";


	export let template		: ShapeInput[] = [];
	export let inputActive 	: number;
	export let dynamicMode	: boolean = false;

	let loading = false;


	const formValues = template.reduce(( acc, item ) => {
		const keys 	= [ "value", "checked", "date", "selected" ];
		const value = keys.find(( key ) => item[key] !== undefined )
			? item[keys.find(( key ) => item[key] !== undefined ) as keyof typeof item]
			: undefined;

		if ( value ) {
			acc[item.name] = value;
		}

		return acc;
	}, {} as Record<string, any> );


	function handleDatePicker( event: DateValue, name: string ) {
		if ( !event ) {
			formValues[name] = null;
			return;
		}

		const { day, month, year } = event;
		formValues[name] = { year, month: ( month - 1 ), day };
	}


	function handleInput (event: Event, name: string ) {
		formValues[name] = (event.target as HTMLInputElement).value;
	}


	function handleCheck( isChecked: boolean, name: string ) {
		formValues[name] = isChecked;
	}


	async function onClick() {
		const button = template.find( item => item.shape === 'button' );

		if ( !button ) return;

		template.forEach(( item, index ) => {
			template[index].valid = {
				'input'			: errorInput( item, formValues[ item.name ]),
				'textarea'		: errorTextArea( item, formValues[ item.name ]),
				'markdown'		: errorTextArea( item, formValues[ item.name ]),
				'check'			: errorCheck( item, formValues[ item.name ]),
				'combobox'		: errorSelect( item, formValues[ item.name ]),
				'select'		: errorSelect( item, formValues[ item.name ]),
				'datepicker'	: errorDatePicker( item, formValues[ item.name ]),
				'button'		: true,
				'none'			: false
			}[item.shape || 'none'];
		});

		if ( template.some( item => !item.valid )) {
			toast.error( button!.invalidErrorMsg ?? "Hay un error en el formulario", errorToast() );
			return;
		}

		// toast.promise(
		// 	fetch(button!.apiUrlSend!, {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json'
		// 		},
		// 		body: JSON.stringify(formValues)
		// 	}),
		// 	{
		// 		loading	: 'Enviando formulario...',
		// 		success	: 'Formulario enviado correctamente',
		// 		error	: 'Error en la operación'
		// 	},
		// 	{
		// 		loading	: loadingToast(),
		// 		success	: successToast(),
		// 		error	: errorToast()
		// 	}
		// );

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


<container class="space-y-3 h-full overflow-auto text-cyan-500">
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
				<Select
					{ shapeInput }
					onSelectedChange	= {( selected: Selected<string> | Selected<string>[] | undefined ) => {
                        if (Array.isArray(selected)) {
                            formValues[shapeInput.name] = selected.map(s => s.value);
                        } else {
                            formValues[shapeInput.name] = selected?.value;
                        }
                        shapeInput.valid = errorSelect(shapeInput, formValues[shapeInput.name]);
                    }}
					value = { formValues[ shapeInput.name ]}
					setError = {() => shapeInput.valid = errorSelect( shapeInput, formValues[ shapeInput.name ])}
				/>
			<!-- Combobox -->
			{:else if shapeInput.shape === 'combobox'}
				<Combobox
					{ shapeInput }
					onSelectedChange	= {( selected: Selected<string> | Selected<string>[] | undefined ) => {
                        if (Array.isArray(selected)) {
                            formValues[shapeInput.name] = selected.map(s => s.value);
                        } else {
                            formValues[shapeInput.name] = selected?.value;
                        }
                        shapeInput.valid = errorSelect(shapeInput, formValues[shapeInput.name]);
                    }}
					value = { formValues[ shapeInput.name ]}
					setError = {() => shapeInput.valid = errorSelect( shapeInput, formValues[ shapeInput.name ])}
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
			<!-- Datepicker -->
			{:else if shapeInput.shape === 'datepicker'}
				<DatePicker
					{ shapeInput }
					onValueChange	= {( value: DateValue ) => handleDatePicker( value, shapeInput.name )}
					value 			= { formValues[ shapeInput.name ]}
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
			<!-- Default -->
			{:else}
				<p class="text-red-500">La entrada es inválida.</p>
			{/if}
		</div>
	{ /each }

	{ #if dynamicMode }
		<SubTitle title="Información obtenida" />

		<pre
			class="bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-100 p-5 rounded-lg break-words shadow-lg"
		>{ JSON.stringify( formValues, null, 2 )}</pre>
	{ /if }
</container>
