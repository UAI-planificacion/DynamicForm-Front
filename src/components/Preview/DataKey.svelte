<script lang="ts">
    import CaretUpDownIcon from "$icons/CaretUpDownIcon.svelte";
    import { Collapsible } from "bits-ui";
    import { slide } from "svelte/transition";
    import DataValue from "./DataValue.svelte";

    export let key: string;
    export let value: any;
    let isOpen = true;

    function isObject(value: any): boolean {
        return value !== null && typeof value === 'object' && !Array.isArray(value);
    }

    function handleOpenChange(open: boolean) {
        isOpen = open;
    }
</script>

{#if isObject(value)}
    <div class="w-full">
        <Collapsible.Root class="w-full space-y-1" open={true} onOpenChange={handleOpenChange}>
            <div class="flex items-center space-x-2">
                <Collapsible.Trigger
                    class="flex items-center transition-all hover:brightness-110 active:scale-95 -ml-2"
                >
                    <div class="transform transition-transform duration-200" class:rotate-[-90deg]={!isOpen}>
                        <CaretUpDownIcon />
                    </div>
                    <span class="sr-only">Abrir</span>
                </Collapsible.Trigger>

                <span class="font-semibold truncate flex-shrink-0 text-teal-500 dark:text-teal-500 transition-colors">"{key}"</span>
                <span class="text-zinc-500 dark:text-zinc-200 transition-colors font-semibold">:</span>
                <span class="text-zinc-500 dark:text-zinc-300 font-semibold transition-colors">
                    {" {"}
                </span>
            </div>

            <Collapsible.Content
                class="ml-5 space-y-0"
                transition={slide}
            >
                {#each Object.entries(value) as [subKey, subValue]}
                    <svelte:self key={subKey} value={subValue} />
                {/each}
                <span class="text-zinc-500 dark:text-zinc-300 font-semibold transition-colors">
                    {" }"}
                </span>
            </Collapsible.Content>
        </Collapsible.Root>
    </div>
{:else}
    <div class="flex items-start gap-1">
        <span class="ml-5 font-semibold truncate flex-shrink-0 text-teal-500 dark:text-teal-500 transition-colors">"{key}"</span>

        <span class="text-zinc-500 dark:text-zinc-200 transition-colors font-semibold">
            :
        </span>

        <div class="mt-[2px]">
            <DataValue {value} />
        </div>
    </div>
{/if}
