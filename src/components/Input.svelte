<script lang="ts">
    import type { ShapeInput } from "$models/shape-input";

    export let shapeInput: ShapeInput;
    export let onInput: ( event: Event ) => void;
</script>

<div class="w-full space-y-1.5">
    {#if shapeInput.label}
        <label
            for     = {shapeInput.name || "no name"}
            class   = "block text-sm font-medium text-gray-700"
        >
            {shapeInput.label}
        </label>
    {/if}

    <input
        type        = {shapeInput.type || "text"}
        id          = {shapeInput.id}
        name        = {shapeInput.name || "no name"}
        placeholder = {shapeInput.placeholder}
        required    = {shapeInput.required}
        on:input    = {onInput}
        class       = "block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm 
            focus:border-gray-400 focus:ring-0.5 focus:ring-gray-400 
            placeholder:text-gray-400 sm:text-sm"
    />

    {#if shapeInput.description}
        <p class="text-sm text-gray-500">
            {shapeInput.description}
        </p>
    {/if}
</div>
