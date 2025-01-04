<script lang="ts">
	import { writable } from 'svelte/store';

    import { type Selected } from "bits-ui";

	import {
		Input,
		Select,
		Check,
		Combobox,
		Button
	} 							from "$components";
	import { templateJson } 	from "$lib/template";
	import type { ShapeInput } 	from '$models/index';
  import DatePicker from '$components/DatePicker.svelte';


	type FormValues = {
		[key: string]: any;
	};

	type TDatePicker = {
		calendar : any;
		month	 : number;
		year	 : number;
		day		 : number;
		era		: string;
	}


    const formValues = writable<FormValues>({});
	const template = templateJson;
	console.log("🚀 ~ template:", template)

	function handleDatePicker(event: TDatePicker, name: string) {
		const { day, month, year } = event;
		const date = new Date( year, month - 1, day );
        formValues.update((values) => {
            return { ...values, [name]: date};
        });
    }


	function handleInput(event: Event, name: string) {
        formValues.update((values) => {
            return { ...values, [name]: (event.target as HTMLInputElement).value };
        });
    }

    function handleSelect(selected: Selected<string> | undefined, name: string) {
        formValues.update((values) => {
            return { ...values, [name]: selected?.value || "" };
        });
    }

	function handleCheck(isChecked: boolean, name: string) {
    formValues.update((values) => {
        return { ...values, [name]: isChecked };
    });
}

</script>

<container class="space-y-4">
	{#each template as item }
		<!-- Select -->
		{#if item.shape === 'input'}
			<Input
				shapeInput	= { item as ShapeInput }
				onInput		= {(event) => handleInput(event, item.name)}
			/>
		<!-- Select -->
		{:else if item.shape === 'select'}
			<Select
				shapeInput			= {item as ShapeInput}
				onSelectedChange	= {(selected) => handleSelect(selected, item.name)}
			/>
		<!-- Combobox -->
		{:else if item.shape === 'combobox'}
			<Combobox
				shapeInput			= {item as ShapeInput }
				onSelectedChange	= {( selected ) => handleSelect( selected, item.name )}
			/>
		<!-- Button -->
		{:else if item.shape === 'button'}
			<Button shapeInput={item as ShapeInput}/>
		<!-- Check -->
		{:else if item.shape === 'check'}
			<Check
				shapeInput={item as ShapeInput}
				onChange={(checked) => handleCheck(checked, item.name)}
			/>

		{:else if item.shape === 'datepicker'}
			<DatePicker
				shapeInput={item as ShapeInput}
				onValueChange={(value) => handleDatePicker(value, item.name)}
			/>
		<!-- Default -->
		{:else}
			<p class="text-red-500">Shape not found</p>
		{/if}
	{/each}
</container>

<pre class="mt-4 bg-amber-200 p-5 rounded-lg">{JSON.stringify($formValues, null, 2)}</pre>