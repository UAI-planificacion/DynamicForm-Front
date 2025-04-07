<script lang="ts">
	import { styles }			from "$lib";
    import type { ShapeInput } 	from "$models";
	import Info 				from "./Info.svelte";


    export let shapeInput	: ShapeInput;
	export let value 		: string | undefined = undefined;
    export let onInput		: ( value: string ) => void;
    export let setError     : VoidFunction = () => {};
</script>


<Info { shapeInput } { onInput } { value }>
	<textarea
		name        = { shapeInput.name }
		id          = { shapeInput.id }
		rows        = { shapeInput.rows || 3 }
		minlength   = { shapeInput.minLength }
		maxlength   = { shapeInput.maxLength }
		required 	= { shapeInput.required }
		readonly 	= { shapeInput.readonly }
		disabled 	= { shapeInput.disabled }
		placeholder	= { shapeInput.placeholder }
		on:input    = { ( event: Event ) => { onInput(( event.target as HTMLTextAreaElement ).value ); setError() }}
		class       = { shapeInput.textareaClass ?? styles.textarea }
        { value }
    ></textarea>
</Info>
