<script lang="ts">
    import type {
        Selected,
        ShapeInput,
        ThemeShape,
        Time
    }                               from "$models";
    import { Label, Description }   from "$components";


    export let shapeInput       : ShapeInput;
    export let onInput          : ( value: string ) => void = () => {};
    export let onTimerInput     : ( value: string ) => void = () => {};
    export let onSelectedChange : ( value: Selected ) => void = () => {};
    export let value            : Time | Selected | string = undefined;
    export let themeShape       : ThemeShape;
</script>

<div class="w-full space-y-1.5">
    {#if shapeInput.label}
        <Label { shapeInput } { themeShape } />
    {/if}

    <slot { shapeInput } { onInput } { onTimerInput } { onSelectedChange } />

    <Description { shapeInput } { value } />
</div>
