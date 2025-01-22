<script lang="ts">
	import { onMount } from "svelte";

	let container	: HTMLDivElement;
	let divider		: HTMLDivElement;
	let leftPanel	: HTMLDivElement;
	let rightPanel	: HTMLDivElement;
	let isDragging 			= false;
	let initialX 			= 0;
	let initialLeftWidth 	= 0;


	function startDragging(e: MouseEvent) {
		isDragging 			= true;
		initialX 			= e.clientX;
		initialLeftWidth	= leftPanel.offsetWidth;

		document.addEventListener( "mousemove", onDrag );
		document.addEventListener( "mouseup", stopDragging );
	}


	function onDrag( e: MouseEvent ) {
		if ( !isDragging ) return;

		const deltaX 		= e.clientX - initialX;
		const newLeftWidth 	= Math.min(
			Math.max( 0, initialLeftWidth + deltaX ),
			container.offsetWidth
		);

		const leftPercentage = ( newLeftWidth / container.offsetWidth ) * 100;

		leftPanel.style.width 	= `${leftPercentage}%`;
		rightPanel.style.width 	= `${100 - leftPercentage}%`;
	}


	function stopDragging() {
		isDragging = false;
		document.removeEventListener( "mousemove", onDrag );
		document.removeEventListener( "mouseup", stopDragging );
	}


	onMount(() => {
		leftPanel.style.width 	= "50%";
		rightPanel.style.width 	= "50%";
	});
</script>

<div bind:this={container} class="flex w-full h-full overflow-hidden gap-2">
	<div bind:this={leftPanel} class="overflow-auto relative @container">
		<slot name="left" />
	</div>

	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<!-- svelte-ignore element_invalid_self_closing_tag -->
	<div
		bind:this			= {divider}
		on:mousedown		= {startDragging}
		class				= "w-2 rounded-lg bg-zinc-600 hover:bg-zinc-500 cursor-col-resize flex-shrink-0 transition-colors"
		role				= "separator"
		aria-orientation	= "vertical"
	/>

	<div bind:this={rightPanel} class="overflow-auto relative @container">
		<slot name="right" />
	</div>
</div>
