<script lang="ts">
	import { Button } from "bits-ui";

	import type { ShapeInput }  from '$models/shape-input';
	import Description 			from "./Description.svelte";


    export let shapeInput: ShapeInput;
</script>

<div class="space-y-1.5 w-full">
	<Button.Root
		on:click	= {() => console.log(`Button clicked: ${shapeInput.apiUrlSend}` )}
		disabled	= { shapeInput.disabled }
		name 		= { shapeInput.name }
		class		= "w-full inline-flex h-12 items-center justify-center rounded-input bg-blue-600 
			px-[21px] text-[15px] font-semibold text-background shadow-mini
			transition-all duration-200 hover:bg-dark/95 active:scale-95 active:bg-blue-700 rounded-xl"
		>
			{shapeInput.label}
	</Button.Root>

	<Description { shapeInput } />
</div>
