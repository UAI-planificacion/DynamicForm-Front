<script lang="ts">
    export let value: string | string[] | number | boolean | undefined;
</script>

<div class="ml-1 flex items-start space-x-2 rounded-md bg-muted overflow-hidden whitespace-pre-wrap break-all overflow-x-auto font-semibold">
    {#if typeof value === 'string'}
        <span class="text-sm font-semibold text-emerald-900 dark:text-emerald-300 transition-colors tracking-wide ">
            "{value}"
        </span>
    {:else if Array.isArray( value )}
        <span class="text-sm text-sky-400 dark:text-sky-300 transition-colors">
            [
        </span>

        {#each value as subValue}
            <svelte:self value={subValue} />
        {/each}

        <span class="text-sm text-sky-400 dark:text-sky-300 transition-colors">
            ]
        </span>
    {:else if typeof value === 'number'}
        <span class="text-sm text-amber-500 dark:text-amber-300 transition-colors">
            {value}
        </span>
    {:else if typeof value === 'boolean'}
        <span class="text-sm text-indigo-500 dark:text-indigo-300 transition-colors">
            {value}
        </span>
    {:else}
        <span class="text-sm text-zinc-400 dark:text-zinc-300 transition-colors">
            {value === null ? 'null' : value}
        </span>
    {/if}
</div>
