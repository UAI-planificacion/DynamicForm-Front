<script lang="ts">
    import { styles }           from "$lib";
    import type { ShapeInput }  from "$models";
    import Info                 from "./Info.svelte";


    export let shapeInput   : ShapeInput;
    export let onInput      : ( event: Event ) => void;
    export let value        : string | undefined = undefined;
    export let setError     : VoidFunction = () => {};
    export let onKeyup      : ( event: KeyboardEvent ) => void = () => {};
</script>


<Info { shapeInput } { onInput } { value }>
    <input
        type        = { shapeInput.type || "text" }
        id          = { shapeInput.id }
        name        = { shapeInput.name || "no name" }
        placeholder = { shapeInput.placeholder }
        required    = { shapeInput.required }
        disabled    = { shapeInput.disabled }
        readonly    = { shapeInput.readonly }
        value       = { value }
        on:input    = {( event ) => { onInput( event ); setError(); }}
        on:keyup    = { onKeyup }
        class       = {( shapeInput.class_ ) ?? ( styles.input as string )}
    />
</Info>
