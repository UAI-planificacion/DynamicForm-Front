<script lang="ts">
    import { Checkbox, Label } from "bits-ui";

    import { Check, Minus }     from "$icons/index";
	import type { ShapeInput }  from '$models/shape-input';

    export let shapeInput: ShapeInput;
    export let onChange: (checked: boolean) => void;
</script>

<div class="flex items-center space-x-3">
    <Checkbox.Root
        id              = {shapeInput.id}
        aria-labelledby = {shapeInput.label}
        class           = "peer inline-flex size-[25px] items-center justify-center rounded-md border border-muted bg-foreground transition-all duration-150 ease-in-out active:scale-98 data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40"
        checked         = {shapeInput.checked}
        onCheckedChange = {(e) => onChange( e as boolean)} 
    >
        <Checkbox.Indicator
            let:isChecked
            let:isIndeterminate
            class="inline-flex items-center justify-center text-background"
        >
            {#if isChecked}
                <Check />
            {:else if isIndeterminate}
                <Minus />
            {/if}
        </Checkbox.Indicator>
    </Checkbox.Root>

    <Label.Root
        id      = {shapeInput.label}
        for     = {shapeInput.id}
        class   = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
        {shapeInput.label}
    </Label.Root>
</div>