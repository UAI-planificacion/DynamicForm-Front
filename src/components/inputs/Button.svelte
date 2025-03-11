<script lang="ts">
	import { Button } from "bits-ui";

	import { styles } 			from "$lib";
	import type { ShapeInput }  from '$models';
	import Description 			from "./Description.svelte";
	import { LoadIcon } 		from "$icons";


    export let shapeInput	: ShapeInput;
	export let onClick 		: VoidFunction;
	export let loading 		: boolean = false;
</script>


<div class="space-y-1.5 w-full">
	<Button.Root
        onclick		= { onClick }
		disabled	= { shapeInput.disabled || loading }
		name 		= { shapeInput.name }
		class		= { shapeInput.class_ ?? styles.button }
		>
			{#if loading}
				<span class="mr-2">
					<LoadIcon />
				</span>
			{/if}

			{shapeInput.label}
	</Button.Root>

	<Description { shapeInput } />
</div>
