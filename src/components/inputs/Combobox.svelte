<script lang="ts">
    import { Combobox, type Selected } from "bits-ui";

    import { CaretUpDownIcon, CheckIcon }   from "$icons";
    import type { ShapeInput }      from "$models/shape-input";
    import Info                     from "./Info.svelte";

    export let shapeInput: ShapeInput;
    export let onSelectedChange: (value: Selected<string> | undefined) => void;


    let inputValue      = "";
    let touchedInput    = false;
    let open            = false;

    $: filtered = inputValue && touchedInput
        ? shapeInput.options!.filter(( option ) => option.value.includes( inputValue.toLowerCase() ))
        : shapeInput.options;
</script>

<Info {shapeInput} {onSelectedChange}>
    <Combobox.Root
        items={filtered}
        onSelectedChange={onSelectedChange}
        bind:inputValue
        bind:touchedInput
        bind:open
    >
        <div class="relative flex items-center w-full rounded-lg border border-border-input bg-background px-2 text-sm transition-colors placeholder:text-foreground-alt/50 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background">
            <Combobox.Input
                class       = "w-full border-none text-sm outline-none transition-all duration-75 data-[highlighted]:bg-muted  focus:ring-0 focus:outline-none active:outline-none"
                placeholder = {shapeInput.placeholder}
                aria-label  = {shapeInput.label}
            />

            <CaretUpDownIcon />
        </div>

        <Combobox.Content
            class       = "w-full rounded-xl border border-muted bg-background px-1 py-2 shadow-popover outline-none bg-white dark:bg-zinc-800"
            sideOffset  = {5}
        >
            {#each filtered! as option ( option.value )}
                <Combobox.Item
                    class="flex h-10 w-full select-none items-center rounded-button py-3 pl-5 pr-1.5 text-sm capitalize outline-none transition-all duration-75 data-[highlighted]:bg-muted hover:bg-zinc-700 hover:rounded-lg focus:ring-0 focus:outline-none"
                    value={option.value}
                    label={option.label}
                >
                    {option.label}

                    <Combobox.ItemIndicator class="ml-auto" asChild={false}>
                        <CheckIcon />
                    </Combobox.ItemIndicator>
                </Combobox.Item>
            {:else}
                <span class="block px-5 py-2 text-sm text-muted-foreground">
                    No existen resultados
                </span>
            {/each}
        </Combobox.Content>

        <Combobox.HiddenInput name="favoriteFruit" />
    </Combobox.Root>
</Info>
