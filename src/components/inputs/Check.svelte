<script lang="ts">
    import { Checkbox, Label } from "bits-ui";

    import  {
		CheckIcon,
		MinusIcon
	}					from "$icons";
    import type {
		InputStyle,
		ShapeInput
	}					from "$models";
    import { styles }	from "$lib";
    import Description	from "./Description.svelte";


    export let shapeInput   : ShapeInput;
    export let onChange     : ( checked: boolean ) => void;
    export let checked      : boolean | undefined = undefined;
    export let setError     : VoidFunction = () => {};


    let check = checked ?? shapeInput.defaultChecked ?? false;


    $: if ( shapeInput.defaultChecked !== undefined ) {
        check = shapeInput.defaultChecked;
    }
</script>

<div class="space-y-1">
    <div class="flex items-center space-x-3">
        <Checkbox.Root
            id              = { shapeInput.id }
            checked         = { check }
            disabled        = { shapeInput.disabled }
            aria-labelledby = { shapeInput.label}
            class           = { shapeInput.boxStyle ?? ( styles.check as InputStyle ).box }
            onCheckedChange = {( event ) => { shapeInput.readonly ? undefined : onChange( event as boolean ); setError() }}
        >
            {#snippet children({ checked, indeterminate })}
                <div class="text-background inline-flex items-center justify-center">
                    {#if indeterminate}
                        <MinusIcon />
                    {:else if checked}
                        <CheckIcon />
                    {/if}
                </div>
            {/snippet}
        </Checkbox.Root>

        <Label.Root
            id      = { shapeInput.label }
            for     = { shapeInput.id }
            class   = { shapeInput.labelStyle ?? ( styles.check as InputStyle ).label }
        >
            { shapeInput.label }
        </Label.Root>
    </div>

    <Description { shapeInput } { checked } />
</div>
