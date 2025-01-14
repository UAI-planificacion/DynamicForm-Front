<script lang="ts">
	import { Button } from "bits-ui";

	import { styles } 			from "$lib";
	import type { ShapeInput }  from '$models';
	import Description 			from "./Description.svelte";


    export let shapeInput	: ShapeInput;
	export let onClick 		: VoidFunction;
</script>


<div class="space-y-1.5 w-full">
	<Button.Root
		on:click	= { onClick }
		disabled	= { shapeInput.disabled }
		name 		= { shapeInput.name }
		class		= { shapeInput.class ?? styles.button }
		>
			{shapeInput.label}
	</Button.Root>

	<Description { shapeInput } />
</div>
