<script lang="ts">
    import { Checkbox, Label } from "bits-ui";

    import { CheckIcon, MinusIcon } from "$icons";
    import Description              from "./Description.svelte";
    import type { ShapeInput }      from "$models";


    export let className    : string = "peer inline-flex size-[25px] items-center justify-center rounded-md border border-muted bg-foreground transition-all duration-150 ease-in-out active:scale-98 data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40";
    export let shapeInput   : ShapeInput;
    export let onChange     : ( checked: boolean ) => void;
    export let checked      : "indeterminate" | boolean | undefined = "indeterminate";
    export let setError     : VoidFunction = () => {};
</script>

<div class="space-y-1">
    <div class="flex items-center space-x-3">
        <Checkbox.Root
            id              = { shapeInput.id }
            checked         = { shapeInput.checked }
            disabled        = { shapeInput.disabled }
            aria-labelledby = { shapeInput.label}
            class           = { shapeInput.class ?? className }
            onCheckedChange = {( e ) => {onChange( e as boolean ); setError()}}
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
            id      = { shapeInput.label }
            for     = { shapeInput.id }
            class   = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
            { shapeInput.label }
        </Label.Root>
    </div>

    <Description { shapeInput } { checked } />
</div>
