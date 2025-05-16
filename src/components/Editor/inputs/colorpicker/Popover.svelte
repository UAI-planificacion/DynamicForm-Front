<script lang="ts">
    import { createEventDispatcher, onMount, onDestroy } from 'svelte';
    import { fade, slide } from 'svelte/transition';

    const dispatch = createEventDispatcher();
    let popoverEl: HTMLElement;
    
    function handleClickOutside(event: MouseEvent) {
        if (popoverEl && !popoverEl.contains(event.target as Node)) {
            dispatch('close');
        }
    }


    onMount(() => {
        document.addEventListener('mousedown', handleClickOutside);
    });

    onDestroy(() => {
        document.removeEventListener('mousedown', handleClickOutside);
    });
</script>

<div
transition:fade={{ duration: 150 }}
    bind:this={popoverEl}
    class="absolute w-full p-3 z-50 mt-1 rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-zinc-700 bg-white dark:bg-zinc-900 dark:border-zinc-700 animate-fade-in"
>
    <div transition:slide={{ duration: 200 }}>
        <slot />
    </div>
</div>