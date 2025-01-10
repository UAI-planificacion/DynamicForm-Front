<script lang="ts">
    import { writable } from "svelte/store";

	import type { DateValue }	from "@internationalized/date";
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
    import type { ShapeInput }  from "$models";


    export let template		: ShapeInput[] = [];
	export let inputActive 	: number;


	type FormValues = {
		[key: string]: any;
	};


    const formValues = writable<FormValues>({});


	function handleDatePicker( event: DateValue, name: string ) {
		if ( !event ) return formValues.update(( values ) => {
            return { ...values, [name]: null };
        });

		const { day, month, year } = event;
        formValues.update(( values ) => {
            return { ...values, [name]: { year, month: ( month - 1 ), day }};
        });
    }


    function handleInput (event: Event, name: string ) {
        formValues.update(( values ) => {
            return { ...values, [name]: ( event.target as HTMLInputElement ).value };
        });
    }


	function handleSelect( selected: Selected<string> | undefined, name: string ) {
        formValues.update(( values ) => {
            return { ...values, [name]: selected?.value || "" };
        });
    }


	function handleCheck( isChecked: boolean, name: string ) {
		formValues.update(( values ) => {
			return { ...values, [name]: isChecked };
		});
	}
</script>


<container class="space-y-3 h-full overflow-auto">
	<SubTitle title="Vista Previa" />

    {#each template as item, index }
		<div class="flex gap-1.5">
		<!-- <div class={`flex gap-2 ${inputActive === index + 1 ? 'border-0 border-amber-00 border pr-2 py-2 rounded-lg   bg-zinc-300/20  ' : ''}`}> -->
			<Enumeration
				number	= { index + 1 }
				active	= { inputActive === index + 1 }
			/>

			<!-- Select -->
			{#if item.shape === 'input'}
				<Input
					shapeInput	= { item as ShapeInput }
					onInput		= {(event: Event) => handleInput(event, item.name)}
				/>
			<!-- Select -->
			{:else if item.shape === 'select'}
				<Select
					shapeInput			= {item as ShapeInput}
					onSelectedChange	= {(selected: Selected<string> | undefined) => handleSelect(selected, item.name)}
				/>
			<!-- Combobox -->
			{:else if item.shape === 'combobox'}
				<Combobox
					shapeInput			= {item as ShapeInput }
					onSelectedChange	= {( selected: Selected<string> | undefined ) => handleSelect( selected, item.name )}
				/>
			<!-- Button -->
			{:else if item.shape === 'button'}
				<Button shapeInput={item as ShapeInput}/>
			<!-- Check -->
			{:else if item.shape === 'check'}
				<Check
					{ ...item }
					onChange={( checked: boolean ) => handleCheck( checked, item.name )}
				/>
			<!-- Datepicker -->
			{:else if item.shape === 'datepicker'}
				<DatePicker
					shapeInput={item as ShapeInput}
					onValueChange={(value: DateValue) => handleDatePicker(value, item.name)}
				/>
			<!-- TextArea -->
			{:else if item.shape === 'textarea'}
				<TextArea
					shapeInput	= { item as ShapeInput }
					onInput		= {(event: Event) => handleInput(event, item.name)}
				/>
			<!-- Default -->
			{:else}
				<p class="text-red-500">La entrada es inválida.</p>
			{/if}
		</div>
	{/each}

    <pre class="mt-4 bg-amber-200 p-5 rounded-lg">{JSON.stringify($formValues, null, 2)}</pre>
</container>
