<script lang="ts">
	import { onMount } from "svelte";

	let container	: HTMLDivElement;
	let leftPanel	: HTMLDivElement;
	let rightPanel	: HTMLDivElement;
	let isDragging 			= false;
	let initialX 			= 0;
	let initialLeftWidth 	= 0;
	let isMobileView		= false;

	function updateMobileView() {
		isMobileView = window.innerWidth < 768; // md breakpoint
	}

	function startDragging(e: MouseEvent) {
		isDragging = true;
		initialX = e.clientX;
		initialLeftWidth = leftPanel.offsetWidth;

		document.addEventListener("mousemove", onDrag);
		document.addEventListener("mouseup", stopDragging);
	}

	function onDrag(e: MouseEvent) {
		if (!isDragging) return;

		const deltaX = e.clientX - initialX;

		if (isMobileView) {
			// En móvil, snap directo a los extremos basado en la dirección del movimiento
			if (deltaX < 0) {
				leftPanel.style.width = "0%";
				rightPanel.style.width = "100%";
			} else {
				leftPanel.style.width = "100%";
				rightPanel.style.width = "0%";
			}
		} else {
			// En desktop, movimiento suave sin restricciones
			const containerWidth = container.offsetWidth;
			const newLeftWidth = Math.min(
				Math.max(0, initialLeftWidth + deltaX),
				containerWidth
			);
			const leftPercentage = (newLeftWidth / containerWidth) * 100;
			
			leftPanel.style.width = `${leftPercentage}%`;
			rightPanel.style.width = `${100 - leftPercentage}%`;
		}
	}

	function stopDragging() {
		isDragging = false;
		document.removeEventListener("mousemove", onDrag);
		document.removeEventListener("mouseup", stopDragging);
	}

	onMount(() => {
		updateMobileView();
		window.addEventListener('resize', updateMobileView);
		
		// Establecer ancho inicial
		leftPanel.style.width = "50%";
		rightPanel.style.width = "50%";

		return () => {
			window.removeEventListener('resize', updateMobileView);
		};
	});
</script>

<div bind:this={container} class="flex w-full h-full overflow-hidden gap-2">
	<div bind:this={leftPanel} class="overflow-auto relative @container {isMobileView ? 'transition-[width] duration-150' : ''}">
		<slot name="left" />
	</div>

	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<!-- svelte-ignore element_invalid_self_closing_tag -->
	<div
		on:mousedown={startDragging}
		class="w-2 rounded-lg bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-500 cursor-col-resize flex-shrink-0 transition-colors"
		role="separator"
		aria-orientation="vertical"
	/>

	<div bind:this={rightPanel} class="overflow-auto relative @container {isMobileView ? 'transition-[width] duration-150' : ''}">
		<slot name="right" />
	</div>
</div>
