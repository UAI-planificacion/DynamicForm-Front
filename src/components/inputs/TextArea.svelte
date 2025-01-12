<script lang="ts">
    import type { ShapeInput } 	from "$models";
	import Info 				from "./Info.svelte";


    export let shapeInput	: ShapeInput;
	export let value 		: string | undefined = undefined;
    export let onInput		: ( event: Event ) => void;
    export let setError     : VoidFunction = () => {};
</script>


<Info { shapeInput } { onInput } { value }>
	<textarea
		name        = { shapeInput.name }
		id          = { shapeInput.id }
		rows        = { shapeInput.rows }
		minlength   = { shapeInput.minLength }
		maxlength   = { shapeInput.maxLength }
		required 	= { shapeInput.required }
		readonly 	= { shapeInput.readonly }
		disabled 	= { shapeInput.disabled }
		placeholder	= { shapeInput.placeholder }
		on:input    = { ( value ) => {onInput( value ); setError() }}
		class       = { shapeInput.class ?? `w-full rounded-md border border-gray-300 shadow-sm 
			focus:border-gray-400 focus:ring-0.5 focus:ring-gray-400 
			placeholder:text-gray-400 sm:text-sm disabled:border-gray-200`}
	>{ shapeInput.value }</textarea>
</Info>
