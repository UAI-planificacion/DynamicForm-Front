<script lang="ts">
    import { Collapsible } from "bits-ui";
    import { slide } from "svelte/transition";
    import DataKey from "./DataKey.svelte";
    import { CaretUpDownIcon } from "$icons";

    export let formValues: Record<string, any>;
    let isOpen = true;

    function handleOpenChange(open: boolean) {
        isOpen = open;
    }
</script>

<div class="space-y-1 p-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded-lg transition-colors shadow-xl">
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

            <span class="text-zinc-500 dark:text-zinc-300 font-semibold">
                {"{"}
            </span>
        </div>

        <!-- transition={slide} -->
        <Collapsible.Content
            class="ml-5 space-y-0"
        >
            {#each Object.entries(formValues) as [key, value]}
                <DataKey key={key} value={value} />
            {/each}
        </Collapsible.Content>
    </Collapsible.Root>

    <span class=" text-zinc-500 dark:text-zinc-300 font-semibold">
        {"}"}
    </span>
</div>