<script lang="ts">
    import type { DateRange } from "bits-ui";
	import type { DateValue } from "@internationalized/date";

    import {
        showErrorCheck,
        showErrorDatePicker,
        showErrorInput,
        showErrorSelect,
        showErrorTimer
    }               from "$lib";
    import type {
        ShapeInput,
        Selected,
        Time
    }               from "$models";


    export let shapeInput   : ShapeInput;
    export let value        : Time | Selected = undefined;
    export let checked      : "indeterminate" | boolean | undefined = "indeterminate";
    export let date         : DateValue | DateRange | undefined = undefined;
</script>


{#if !shapeInput.valid && shapeInput.shape !== 'button'}
    <span class="text-sm text-red-500 font-semibold">
        {#if shapeInput.shape === 'input' || shapeInput.shape === 'textarea' || shapeInput.shape === 'markdown'}
            { showErrorInput( shapeInput, value as string )}
        {:else if shapeInput.shape === 'select'}
            { showErrorSelect( shapeInput, value as Selected )}
        {:else if shapeInput.shape === 'check'}
            { showErrorCheck( shapeInput, checked )}
        {:else if shapeInput.shape === 'datepicker'}
            { showErrorDatePicker( shapeInput, date )}
        {:else if shapeInput.shape === 'timer'}
            { showErrorTimer( shapeInput, value as Time )}
        {/if}
    </span>
{:else if shapeInput.description}
    <span class="text-sm text-zinc-500 dark:text-zinc-400 font-semibold">
        { shapeInput?.description }
    </span>
{/if}

<!-- <span class="text-sm text-gray-500">
        { value?.length }/{ shapeInput?.maxLength }
    </span>
-->