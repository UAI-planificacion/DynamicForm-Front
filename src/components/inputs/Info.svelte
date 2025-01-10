<script lang="ts">
    import type { Selected } from "bits-ui";

    import type { ShapeInput }  from "$models/shape-input";
    import Description          from "./Description.svelte";

    export let shapeInput       : ShapeInput;
    export let onInput          : ( event: Event ) => void = () => {};
    export let onSelectedChange : (value: Selected<string> | undefined) => void = () => {};
</script>

<div class="w-full space-y-1.5">
    {#if shapeInput.label}
        <label
            for     = {shapeInput.id || "no name"}
            class   = {`block text-sm font-medium   ${ shapeInput.disabled ? 'text-gray-500' : 'text-gray-700' }`}
        >
            {shapeInput.label}
        </label>
    {/if}

    <slot {shapeInput} {onInput} {onSelectedChange}/>

    <Description text={shapeInput.description} />
</div>
