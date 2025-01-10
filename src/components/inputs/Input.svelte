<script lang="ts">
    import type { ShapeInput }  from "$models/shape-input";
    import Info                 from "./Info.svelte";

    export let shapeInput: ShapeInput;
    export let onInput: ( event: Event ) => void;
</script>

<Info {shapeInput} {onInput}>
    <input
        type        = { shapeInput.type || "text" }
        id          = { shapeInput.id }
        name        = { shapeInput.name || "no name" }
        placeholder = { shapeInput.placeholder }
        required    = { shapeInput.required }
        disabled    = { shapeInput.disabled }
        readonly    = { shapeInput.readonly }
        value       = { shapeInput.value }
        on:input    = {onInput}
        class       = { shapeInput.class ?? `block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm 
            focus:border-gray-400 focus:ring-0.5 focus:ring-gray-400 
            placeholder:text-gray-400 sm:text-sm disabled:bg-slate-100 disabled:text-slate-500` }
    />
</Info>
