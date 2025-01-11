<script lang="ts">
	import type { DateValue } from "@internationalized/date";

    import type { ShapeInput }      from "$models";
    import { showErrorMessages }    from "$lib";


    export let shapeInput   : ShapeInput;
    export let value        : string            | undefined = undefined;
    export let checked      : "indeterminate"   | boolean | undefined = "indeterminate";
    export let date         : DateValue         | undefined = undefined;
</script>


{#if !shapeInput.valid}
    <span class="text-sm text-red-500">
        { showErrorMessages({ shapeInput, value, checked, date })}
    </span>
{:else if shapeInput.description}
    <span class="text-sm text-gray-500">
        { shapeInput?.description }
    </span>
{/if}

<!-- <span class="text-sm text-gray-500">
        { value?.length }/{ shapeInput?.maxLength }
    </span>
-->
