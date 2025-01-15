<script lang="ts">
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
		SubTitle
	} 							from "$components";
	import {
		errorSelect,
		errorCheck,
		errorInput,
		errorTextArea,
		errorDatePicker
	}							from "$lib";
    import type { ShapeInput }  from "$models";


    export let template		: ShapeInput[] = [];
	export let inputActive 	: number;


	const formValues = template.reduce(( acc, item ) => {
		const keys 	= ["value", "checked", "date"];
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


	function handleSelect( selected: Selected<string> | undefined, name: string ) {
		formValues[name] = selected?.value || "";
	}


	function handleCheck( isChecked: boolean, name: string ) {
		formValues[name] = isChecked;
	}


	function onClick() {
		template.forEach(( item, index ) => {
			template[index].valid = {
				'input'			: errorInput( item, formValues[ item.name ]),
				'textarea'		: errorTextArea( item, formValues[ item.name ]),
				'check'			: errorCheck( item, formValues[ item.name ]),
				'combobox'		: errorSelect( item, formValues[ item.name ]),
				'select'		: errorSelect( item, formValues[ item.name ]),
				'datepicker'	: errorDatePicker( item, formValues[ item.name ]),
				'button'		: true,
				'none'			: false
			}[item.shape || 'none'];
		});

		if ( template.some( item => !item.valid ) ) {
			console.log("🚀 ~ Hay un error en el formulario")
			return;
		}

		console.log("🚀 ~ Formulario válido")
	}
</script>


<container class="space-y-3 h-full overflow-auto">
	<SubTitle title="Vista Previa" />

    {#each template as shapeInput, index }
		<div class="flex gap-1.5">
		<!-- <div class={`flex gap-2 ${inputActive === index + 1 ? 'border-0 border-amber-00 border pr-2 py-2 rounded-lg   bg-zinc-300/20  ' : ''}`}> -->
			<Enumeration
				number	= { index + 1 }
				active	= { inputActive === index + 1 }
			/>
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
					onSelectedChange	= {( selected: Selected<string> | undefined ) => handleSelect( selected, shapeInput.name )}
					value 				= { formValues[ shapeInput.name ]}
					setError 			= {() => shapeInput.valid = errorSelect( shapeInput, formValues[ shapeInput.name ])}
				/>
			<!-- Combobox -->
			{:else if shapeInput.shape === 'combobox'}
				<Combobox
					{ shapeInput }
					onSelectedChange	= {( selected: Selected<string> | undefined ) => handleSelect( selected, shapeInput.name )}
					value 				= { formValues[ shapeInput.name ]}
					setError 			= {() => shapeInput.valid = errorSelect( shapeInput, formValues[ shapeInput.name ])}
				/>
			<!-- Button -->
			{:else if shapeInput.shape === 'button'}
				<Button
					{ shapeInput }
					{ onClick }
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
			<!-- Default -->
			{:else}
				<p class="text-red-500">La entrada es inválida.</p>
			{/if}
		</div>
	{/each}

    <pre class="bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-100 p-5 rounded-lg break-words shadow-lg">{JSON.stringify(formValues, null, 2)}</pre>
</container>
