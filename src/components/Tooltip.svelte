<script lang="ts">
    import { onMount, onDestroy }   from 'svelte';
    import { fade, scale }          from 'svelte/transition';


    export let message      : string;
    export let value        : boolean | string | undefined = true;
    export let background   : string = 'bg-amber-300';
    export let color        : string = 'bg-zinc-200 text-zinc-800 dark:bg-zinc-500 dark:text-zinc-200';


    let trigger: HTMLElement;
    let tooltip: HTMLElement;
    let visible = false;


    function showTooltip() {
        visible = true;
        setTimeout(positionTooltip, 0);
    }


    function hideTooltip() {
        visible = false;
    }


    function positionTooltip() {
        if ( !trigger || !tooltip ) return;

        const triggerRect = trigger.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        // Posicionar el tooltip directamente encima del trigger
        const left  = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
        const top   = triggerRect.top - tooltipRect.height - 8;

        tooltip.style.position  = 'fixed';
        tooltip.style.zIndex    = '1000';
        tooltip.style.left      = `${left}px`;
        tooltip.style.top       = `${top}px`;
    }


    function handleResize() {
        if ( visible ) positionTooltip();
    }


    onMount(() => {
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleResize, true);
    });


    onDestroy(() => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleResize, true);
    });
</script>

{#if value}
    <div 
        bind:this={trigger}
        class="{background} rounded-xl py-1 px-3 w-auto flex items-center gap-1 "
        on:mouseenter={showTooltip}
        on:mouseleave={hideTooltip}
        on:focus={showTooltip}
        on:blur={hideTooltip}
        role="button"
        tabindex="0"
    >
        <slot />
    </div>
{/if}

{#if value && visible}
    <div 
        bind:this={tooltip}
        class="tooltip-container"
        style="position: fixed; z-index: 1000; pointer-events: none;"
        in:scale={{duration: 550, start: 0.95, opacity: 0}}
        out:fade={{duration: 100}}
    >
        <div class="{color} border border-zinc-300 dark:border-zinc-400 flex items-center justify-center rounded-lg p-2 text-sm font-medium max-w-[200px] sm:max-w-[250px] md:max-w-[300px] break-words">
            {message}
        </div>

        <div class={color}>
            <div class="tooltip-arrow rounded-[2px] border-l border-t border-zinc-300 dark:border-zinc-400"></div>
        </div>
    </div>
{/if}

<style>
    .tooltip-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .tooltip-arrow {
        width: 10px;
        height: 10px;
        transform: rotate(225deg);
        margin-bottom: -5px;
        margin-top: 0;
    }
</style>
