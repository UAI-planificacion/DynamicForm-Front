<script lang="ts">
	import { Button } from "bits-ui";

	import type { ShapeInput }  from '$models/shape-input';

    export let shapeInput: ShapeInput;
</script>

<Button.Root
	on:click={() => console.log(`Button clicked: ${shapeInput.apiUrlSend}`)}
	class="inline-flex h-12 items-center justify-center rounded-input bg-blue-600 
		px-[21px] text-[15px] font-semibold text-background shadow-mini
		transition-all duration-200 hover:bg-dark/95 active:scale-95 active:bg-blue-700 rounded-xl"
	>
		{shapeInput.label}
</Button.Root>
