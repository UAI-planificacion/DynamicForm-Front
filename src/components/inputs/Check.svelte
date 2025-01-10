<script lang="ts">
    import { Checkbox, Label } from "bits-ui";

    import { CheckIcon, MinusIcon } from "$icons";
    import Description              from "./Description.svelte";


    export let id           : string;
    export let label        : string | undefined = undefined;
    export let checked      : "indeterminate" | boolean | undefined = "indeterminate";
    export let className    : string = "peer inline-flex size-[25px] items-center justify-center rounded-md border border-muted bg-foreground transition-all duration-150 ease-in-out active:scale-98 data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40";
    export let description  : string | undefined    = undefined;
    export let disabled     : boolean | undefined   = undefined;
    export let onChange     : ( checked: boolean ) => void;
</script>

<div class="space-y-1">
    <div class="flex items-center space-x-3">
        <Checkbox.Root
            { id }
            { checked }
            { disabled }
            aria-labelledby = {label}
            class           = { className }
            onCheckedChange = {( e ) => onChange( e as boolean )}
        >
            <Checkbox.Indicator
                let:isChecked
                let:isIndeterminate
                class="inline-flex items-center justify-center text-background"
            >
                {#if isChecked}
                    <CheckIcon />
                {:else if isIndeterminate}
                    <MinusIcon />
                {/if}
            </Checkbox.Indicator>
        </Checkbox.Root>

        <Label.Root
            id      = { label }
            for     = { id }
            class   = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
            {label}
        </Label.Root>
    </div>

    <Description text={ description } />
</div>
