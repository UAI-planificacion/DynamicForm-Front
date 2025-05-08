<script lang="ts">
    import { theme }            from "$stores";
    import { CheckIcon }        from "$icons";
    import type { ShapeInput }  from "$models";
    import Description          from "./Description.svelte";


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
            type        = "button"
            disabled    = { shapeInput.disabled || shapeInput.readonly }
            class       = {`
                inline-flex items-center transition-all duration-150 ease-in-out 
                ${shapeInput.inputStyle?.borderRadius ?? 'rounded-md'}
                ${shapeInput.inputStyle?.borderSize ?? 'border-0'}
                h-6 w-6
                ${shapeInput.disabled || shapeInput.readonly ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                relative
            `}
            style={`
                background-color: ${
                isDarkMode
                    ? shapeInput.disabled || shapeInput.readonly
                    ? shapeInput.inputStyle?.dark?.event?.disabled?.background ?? 'transparent'
                    : shapeInput.inputStyle?.dark?.background ?? 'transparent'
                    : shapeInput.disabled || shapeInput.readonly
                    ? shapeInput.inputStyle?.light?.event?.disabled?.background ?? 'transparent'
                    : shapeInput.inputStyle?.light?.background ?? 'transparent'
                };
                box-shadow: 0 0 0 ${shapeInput.inputStyle?.ringSize ?? '1px'} ${
                isDarkMode
                    ? shapeInput.inputStyle?.dark?.ring ?? '#3f3f46'
                    : shapeInput.inputStyle?.light?.ring ?? '#d4d4d8'
                };
                border-color: ${
                isDarkMode
                    ? shapeInput.inputStyle?.dark?.border ?? '#3f3f46'
                    : shapeInput.inputStyle?.light?.border ?? '#d4d4d8'
                };
            `}
            on:focus={(e) => {
                e.currentTarget.style.boxShadow = `0 0 0 ${shapeInput.inputStyle?.[isDarkMode ? 'dark' : 'light']?.event?.focus?.ringSize ?? '2px'} ${
                    isDarkMode
                        ? shapeInput.inputStyle?.dark?.event?.focus?.ring ?? '#71717a' // zinc-500
                        : shapeInput.inputStyle?.light?.event?.focus?.ring ?? '#a1a1aa' // zinc-400
                }`;
            }}
            on:blur={(e) => {
                e.currentTarget.style.boxShadow = `0 0 0 ${shapeInput.inputStyle?.ringSize ?? '1px'} ${
                    isDarkMode
                        ? shapeInput.inputStyle?.dark?.ring ?? '#3f3f46' // zinc-500
                        : shapeInput.inputStyle?.light?.ring ?? '#d4d4d8' // zinc-400
                }`;
            }}
            on:focus={(e) => {
                e.currentTarget.style.borderColor = `${
                    isDarkMode
                        ? shapeInput.inputStyle?.dark?.event?.focus?.border ?? '#71717a' // zinc-500
                        : shapeInput.inputStyle?.light?.event?.focus?.border ?? '#a1a1aa' // zinc-400
            }`;
            }}
            on:blur={(e) => {
                e.currentTarget.style.borderColor = `${
                    isDarkMode ?
                shapeInput.inputStyle?.dark?.border
                : shapeInput.inputStyle?.light?.border}`;
            }}
        >
            {#if shapeInput.checked}
                <div class="absolute inset-0 flex items-center justify-center">
                    <CheckIcon />
                </div>
            {/if}
        </button>

        <span
            class={`ml-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} ${shapeInput.disabled || shapeInput.readonly ? 'opacity-50' : ''}`}
            on:click={toggle}
            role="button"
            tabindex={shapeInput.disabled || shapeInput.readonly ? -1 : 0}
            on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle(); }}
        >
            {shapeInput.label}
        </span>
    </div>

    <Description { shapeInput } { checked } />
</div>

<style>
    button {
        -webkit-tap-highlight-color: transparent;
        outline: none;
    }
</style>
