<script lang="ts">
	import { onMount } from "svelte";

	let container	: HTMLDivElement;
	let leftPanel	: HTMLDivElement;
	let rightPanel	: HTMLDivElement;
	let isDragging 			= $state(false);
	let initialX 			= 0;
	let initialLeftWidth 	= 0;
	let isMobileView		= false;
	let isLeftClosing       = $state(false);
	let isRightClosing      = $state(false);

	const MIN_WIDTH_PERCENTAGE = 15;

	function updateMobileView() {
		isMobileView = window.innerWidth < 768;
	}

	function startDragging(e: MouseEvent | TouchEvent) {
		isDragging = true;
		isLeftClosing = false;
		isRightClosing = false;

		const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		initialX = clientX;
		initialLeftWidth = leftPanel.offsetWidth;

		document.addEventListener("mousemove", onDrag);
		document.addEventListener("mouseup", stopDragging);
		document.addEventListener("touchmove", onDrag, { passive: false });
		document.addEventListener("touchend", stopDragging);
		document.addEventListener("touchcancel", stopDragging);
	}

	function onDrag(e: MouseEvent | TouchEvent) {
		if (!isDragging) return;

		if ('touches' in e) {
			e.preventDefault();
		}

		const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		const deltaX = clientX - initialX;

		if (isMobileView) {
			if (deltaX > 0) {
				isLeftClosing = false;
				isRightClosing = true;
				leftPanel.style.width = "100%";
				rightPanel.style.width = "0%";
			} else {
				isLeftClosing = true;
				isRightClosing = false;
				leftPanel.style.width = "0%";
				rightPanel.style.width = "100%";
			}
		} else {
			const newLeftWidth = initialLeftWidth + deltaX;
			const containerWidth = container.offsetWidth;
			const leftPercentage = (newLeftWidth / containerWidth) * 100;
			const rightPercentage = 100 - leftPercentage;

			if (leftPercentage < MIN_WIDTH_PERCENTAGE) {
				isLeftClosing = true;
				isRightClosing = false;
				leftPanel.style.width = "0%";
				rightPanel.style.width = "100%";
			} else if (rightPercentage < MIN_WIDTH_PERCENTAGE) {
				isLeftClosing = false;
				isRightClosing = true;
				leftPanel.style.width = "100%";
				rightPanel.style.width = "0%";
			} else {
				isLeftClosing = false;
				isRightClosing = false;
				leftPanel.style.width = `${leftPercentage}%`;
				rightPanel.style.width = `${rightPercentage}%`;
			}
		}
	}

	function stopDragging() {
		isDragging = false;

        document.removeEventListener("mousemove", onDrag);
		document.removeEventListener("mouseup", stopDragging);
		document.removeEventListener("touchmove", onDrag);
		document.removeEventListener("touchend", stopDragging);
		document.removeEventListener("touchcancel", stopDragging);
	}

	onMount(() => {
		leftPanel.style.width = "50%";
		rightPanel.style.width = "50%";

		updateMobileView();
		window.addEventListener("resize", updateMobileView);

		return () => {
			window.removeEventListener("resize", updateMobileView);
		};
	});
</script>

<div bind:this={container} class="flex w-full h-full gap-2">
	<div 
		bind:this={leftPanel} 
		class="relative {isLeftClosing ? 'transition-all duration-300 ease-in-out' : ''}"
	>
		<div class="w-full h-full overflow-hidden">
			<slot name="left" />
		</div>
	</div>

	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore event_directive_deprecated -->
	<div
		on:mousedown={startDragging}
		on:touchstart|preventDefault={startDragging}
		class="group relative w-2 rounded-lg bg-zinc-300 dark:bg-zinc-800 hover:bg-zinc-200 active:bg-zinc-300/50 cursor-col-resize flex-shrink-0 transition-colors dark:hover:bg-zinc-700 dark:active:bg-zinc-600 {isDragging ? 'bg-zinc-500 dark:bg-zinc-600' : ''}"
		role="separator"
		aria-orientation="vertical"
	>
		<svg
			class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-zinc-200 dark:fill-zinc-400 group-hover:fill-zinc-300 group-active:fill-zinc-100 dark:group-hover:fill-zinc-300 dark:group-active:fill-zinc-200 transition-colors {isDragging ? 'fill-zinc-100 dark:fill-zinc-200' : ''}" 
			width="25" 
			height="25" 
			viewBox="0 0 24 24" 
			fill="none" 
			xmlns="http://www.w3.org/2000/svg"
		>
			<path 
				d="M14 15L17 12L14 9M10 9L7 12L10 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
				stroke="currentColor" 
				stroke-width="1.5" 
				stroke-linecap="round" 
				stroke-linejoin="round"
			/>
		</svg>
	</div>

	<div 
		bind:this={rightPanel} 
		class="relative {isRightClosing ? 'transition-all duration-300 ease-in-out' : ''}"
	>
		<div class="w-full h-full overflow-hidden">
			<slot name="right" />
		</div>
	</div>
</div>
