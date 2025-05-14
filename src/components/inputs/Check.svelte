<script lang="ts">
    import type { ShapeInput, ThemeShape }  from "$models";
    import { theme }                        from "$stores";
    import { CheckIcon }                    from "$icons";
    import {Description, Label}             from "$components";
    import { UAITheme }                     from "$lib/styles/themes";
    import { style }                        from "$lib/styles/themes/default/style";
    import { focus }                        from "$lib/styles/themes/default/focus";
    import { blur }                         from "$lib/styles/themes/default/blur";


    let isDarkMode = $theme === 'dark';


    $: if ( $theme === 'dark' ) {
        isDarkMode = true;
    } else {
        isDarkMode = false;
    }


    export let shapeInput   : ShapeInput;
    export let onChange     : ( checked: boolean ) => void;
    export let checked      : boolean | undefined = undefined;
    export let setError     : VoidFunction = () => {};
    export let themeShape   : ThemeShape = UAITheme();


    shapeInput.checked = checked ?? false;


    function toggle() {
        if ( !shapeInput.disabled && !shapeInput.readonly ) {
            shapeInput.checked = !shapeInput.checked;
            onChange( shapeInput.checked );
            setError();
        }
    }
</script>

<div class="grid gap-1">
    <div class="items-center flex">
        <button
            on:click    = { toggle }
            id          = { shapeInput.id }
            type        = "button"
            disabled    = { shapeInput.disabled || shapeInput.readonly }
            class       = {`
                relative inline-flex items-center transition-all duration-150 ease-in-out 
                h-6 w-6
                ${themeShape.borderRadius }
                ${themeShape.borderSize }
                ${shapeInput.disabled || shapeInput.readonly
                    ? 'opacity-50 cursor-not-allowed'
                    : 'cursor-pointer'
                }
            `}
            style       = {style( isDarkMode, themeShape )}
            on:focus    = {( e ) => focus( e, isDarkMode, themeShape )}
            on:blur     = {( e ) => blur( e, isDarkMode, themeShape )}
        >
            {#if shapeInput.checked}
                <div class="absolute inset-0 flex items-center justify-center">
                    <CheckIcon />
                </div>
            {/if}
        </button>

        <Label { shapeInput } { themeShape } isMargin />
    </div>

    <Description { shapeInput } { checked } />
</div>

<style>
    button {
        -webkit-tap-highlight-color: transparent;
        outline: none;
    }
</style>
