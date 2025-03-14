<script lang="ts">
    import { slide }    from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    import { CaretLeftJsonIcon }    from '$icons';
    import { ButtonUI }             from '$components';

    export let data: any;
    export let expanded = true;
    export let level = 0;

    type ValueType = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'null' | 'undefined';

    function getValueType(value: any): ValueType {
        if (value === null) return 'null';
        if (value === undefined) return 'undefined';
        if (Array.isArray(value)) return 'array';
        if (typeof value === 'object') return 'object';
        if (typeof value === 'boolean') return 'boolean';

        const number = Number(value);
        return Number.isNaN(number) ? 'string' : 'number';
    }

    const toggleExpand = () => expanded = !expanded;

    $: valueType    = getValueType( data );
    $: isExpandable = valueType === 'object' || valueType === 'array';
    $: isEmpty      = isExpandable && (valueType === 'array' ? data.length === 0 : Object.keys( data || {}).length === 0);
    $: hasComma     = level < (data && typeof data === 'object' ? Object.keys(data).length : 0);
</script>

<span class="font-mono text-base">
    {#if isExpandable}
        <ButtonUI
            onClick = { toggleExpand }
            styles  = "-ml-2 -mr-1 p-2 hover:bg-zinc-400/50 dark:hover:bg-zinc-900/50 transform transition-transform duration-200 {expanded ? 'rotate-90' : ''} text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-400"
        >
            <CaretLeftJsonIcon />
        </ButtonUI>

        <span class="text-zinc-600 dark:text-zinc-300">
            {valueType === 'array' ? '[' : '{'}

            {#if !expanded}
                <span class="text-slate-400 dark:text-zinc-400 ml-1">
                    {valueType === 'array' ? `${data?.length || 0} items` : `${Object.keys(data || {}).length} propiedades`}
                </span>

                {valueType === 'array' ? ']' : '}'}
            {/if}
        </span>

        {#if expanded}
            <div 
                class="block ml-8"
                transition:slide|local={{ duration: 150, easing: cubicOut }}
            >
                {#if !isEmpty}
                    {#if valueType === 'array'}
                        {#each data as item, i}
                            <div class="py-0.5 ml-0.5">
                                <span class="text-violet-600 dark:text-violet-400 font-semibold">{i}:</span>

                                <svelte:self data={item} level={level + 1} />
                            </div>
                        {/each}
                    {:else}
                        {#each Object.entries(data || {}) as [key, value]}
                            <div class="py-0.5 ml-0.5">
                                <span class="text-emerald-600 dark:text-emerald-400 font-semibold">"{key}":</span>
                                <svelte:self data={value} level={level + 1} />
                            </div>
                        {/each}
                    {/if}
                {/if}
            </div>

            <span class="ml-1 text-zinc-600 dark:text-zinc-300">
                {valueType === 'array' ? ']' : '}'}
            </span>
        {/if}
    {:else}
        <span class="json-value">
            {#if valueType === 'string'}
                <span class="text-rose-600 dark:text-rose-400 truncate">"{data}"</span>
            {:else if valueType === 'number'}
                <span class="text-violet-600 dark:text-violet-400 truncate">{data}</span>
            {:else if valueType === 'boolean'}
                <span class="text-amber-600 dark:text-amber-400 truncate">{data}</span>
            {:else}
                <span class="text-slate-400 dark:text-slate-500 truncate">
                    {data === null ? 'null' : 'undefined'}
                </span>
            {/if}

            {#if hasComma}
                <span class="-ml-2 text-zinc-800 dark:text-zinc-300">,</span>
            {/if}
        </span>
    {/if}
</span>
