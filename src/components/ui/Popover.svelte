<!-- Popover.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    export let open = false;

    let triggerElement: HTMLElement;
    let popoverElement: HTMLElement;
    let position = { top: 0, left: 0 };

    function updatePosition() {
        if (!triggerElement || !popoverElement) return;

        const triggerRect = triggerElement.getBoundingClientRect();
        const popoverRect = popoverElement.getBoundingClientRect();

        position = {
            top: triggerRect.bottom + window.scrollY,
            left: triggerRect.left + window.scrollX + (triggerRect.width / 2) - (popoverRect.width / 2)
        };

        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        if (position.left < 0) {
            position.left = 0;
        } else if (position.left + popoverRect.width > viewport.width) {
            position.left = viewport.width - popoverRect.width;
        }
    }

    function handleClickOutside(event: MouseEvent) {
        if (!open) return;
        
        const clickedElement = event.target as Node;
        const isOutsideTrigger = !triggerElement?.contains(clickedElement);
        const isOutsidePopover = !popoverElement?.contains(clickedElement);

        if (isOutsideTrigger && isOutsidePopover) {
            open = false;
            dispatchEvent(new CustomEvent('close'));
        }
    }

    function handleTriggerClick() {
        open = !open;
    }

    onMount(() => {
        document.addEventListener('click', handleClickOutside);
        window.addEventListener('scroll', updatePosition);
        window.addEventListener('resize', updatePosition);

        return () => {
            document.removeEventListener('click', handleClickOutside);
            window.removeEventListener('scroll', updatePosition);
            window.removeEventListener('resize', updatePosition);
        };
    });

    $: if (open) {
        setTimeout(updatePosition, 0);
    }
</script>

<div
    bind:this   = { triggerElement }
    on:click    = { handleTriggerClick }
    on:keydown  = { handleTriggerClick }
    role        = "button"
    tabindex    = "0"
>
    <slot name="trigger" />
</div>


{#if open}
    <div
        bind:this       = {popoverElement}
        transition:fade = {{ duration: 100 }}
        class           = "fixed z-30"
        style           = "top: {position.top}px; left: {position.left}px;"
        on:close
    >
        <slot />
    </div>
{/if}
