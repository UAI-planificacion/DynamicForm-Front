<script lang="ts">
    import type { Selected } from "bits-ui";

    import type { ShapeInput }  from "$models/shape-input";
    import Description          from "./Description.svelte";

    export let shapeInput       : ShapeInput;
    export let onInput          : ( event: Event ) => void = () => {};
    export let onSelectedChange : ( value: Selected<string> | undefined ) => void = () => {};
    export let value            : string | undefined = undefined;
</script>

<div class="w-full space-y-1.5">
    {#if shapeInput.label}
        <label
            for     = { shapeInput.id || "no name" }
            class   = {`block text-sm font-medium ${ shapeInput.disabled ? 'text-zinc-500 dark:text-zinc-400 ' : 'text-zinc-700 dark:text-zinc-300' }`}
        >
            { shapeInput.label }
        </label>
    {/if}

    <slot { shapeInput } { onInput } { onSelectedChange } />

    <Description { shapeInput } { value } />
</div>
