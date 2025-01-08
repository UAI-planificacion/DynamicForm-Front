<script lang="ts">
    import { writable } from "svelte/store";

    import { type Selected } from "bits-ui";

    import {
		Input,
		Select,
		Check,
		Combobox,
		Button,
		DatePicker,
		TextArea
	} 							from "$components";
    import type { ShapeInput }  from "$models";


    export let template: ShapeInput[] = [];

	type FormValues = {
		[key: string]: any;
	};


	type TDatePicker = {
		calendar	: any;
		month		: number;
		year		: number;
		day			: number;
		era			: string;
	}


    const formValues = writable<FormValues>({});
	console.log("🚀 ~ template:", template)

	function handleDatePicker( event: TDatePicker, name: string ) {
		if ( !event ) return formValues.update(( values ) => {
            return { ...values, [name]: null };
        });

		const { day, month, year } = event;
		const date = new Date( year, month - 1, day );
        formValues.update(( values ) => {
            return { ...values, [name]: date };
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
    <h2>Preview</h2>

    {#each template as item }
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
				onValueChange={(value: { calendar: any; month: number; year: number; day: number; era: string; }) => handleDatePicker(value, item.name)}
			/>
		<!-- TextArea -->
		{:else if item.shape === 'textarea'}
			<TextArea
				shapeInput	= { item as ShapeInput }
				onInput		= {(event: Event) => handleInput(event, item.name)}
			/>
		<!-- Default -->
		{:else}
			<p class="text-red-500">Input not found</p>
		{/if}
	{/each}

    <pre class="mt-4 bg-amber-200 p-5 rounded-lg">{JSON.stringify($formValues, null, 2)}</pre>
</container>
