<script lang="ts">
    import { Select, type Selected } from "bits-ui";

    import type { ShapeInput }              from "$models/shape-input";
    import { CheckIcon, CaretUpDownIcon }   from "$icons";
    import Info                             from "./Info.svelte";


    export let shapeInput: ShapeInput;
    export let onSelectedChange: ( value: Selected<string> | undefined ) => void;
</script>

<Info {shapeInput} {onSelectedChange}>
    <Select.Root
        items               = { shapeInput.options }
        onSelectedChange    = { onSelectedChange }
        required            = { shapeInput.required }
        selected            = { shapeInput.options?.find( option => option.value === shapeInput.value )}
        disabled            = { shapeInput.disabled }
    >
        <Select.Trigger
            class       = "inline-flex h-input w-full items-center rounded-9px border border-border-input bg-background px-[11px] text-sm transition-colors placeholder:text-foreground-alt/50  focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background rounded-lg h-10 justify-between"
            aria-label  = {shapeInput.name}
        >
            <Select.Value
                class       = "text-sm"
                placeholder = { shapeInput.placeholder }
            />

            <CaretUpDownIcon />
        </Select.Trigger>

        <Select.Content
            class               = "w-full rounded-xl border border-muted bg-background px-1 py-2 shadow-popover outline-none bg-white dark:bg-zinc-800 z-10"
            sideOffset          = {5}
            collisionPadding    = {0}
        >
            {#each shapeInput.options! as option}
                <Select.Item
                    class = "flex h-10 w-full select-none items-center rounded-button py-3 pl-5 pr-1.5 text-sm outline-none transition-all duration-75 data-[highlighted]:bg-muted hover:bg-zinc-700 hover:rounded-lg"
                    value = {option.value}
                    label = {option.label}
                >
                    {option.label}

                    <Select.ItemIndicator class="ml-auto" asChild={false}>
                        <CheckIcon />
                    </Select.ItemIndicator>
                </Select.Item>
            {/each}
        </Select.Content>

        <Select.Input
            name        = {shapeInput.name}
            required    = {shapeInput.required}
        />
    </Select.Root>
</Info>
