<script lang="ts">
    import { theme }            from "$stores";
    import type { ShapeInput }  from '$models';


    let isDarkMode = $theme === 'dark';


    $: if ( $theme === 'dark' ) {
        isDarkMode = true;
    } else {
        isDarkMode = false;
    }


    export let shapeInput: ShapeInput;
    export let handleOpen: VoidFunction;
</script>

<button
    type        = "button"
    on:click    = { handleOpen }
    id          = { shapeInput.id }
    disabled    = { shapeInput.disabled }
    class       = {`px-3 py-2 transition-all duration-150 ease-in-out w-full flex items-center justify-between 
        ${ shapeInput.inputStyle?.fontSize      ?? 'text-sm' }
        ${ shapeInput.inputStyle?.height        ?? '' }
        ${ shapeInput.inputStyle?.borderRadius  ?? 'rounded-md' }
        ${ shapeInput.inputStyle?.boxShadow     ?? 'shadow-sm' }`
    }
    style={ `background-color: ${
        isDarkMode
            ? shapeInput.disabled || shapeInput.readonly
                ? shapeInput.inputStyle?.dark?.event?.disabled?.background ?? 'transparent'
                : shapeInput.inputStyle?.dark?.background   ?? 'transparent'
            : shapeInput.disabled || shapeInput.readonly
                ? shapeInput.inputStyle?.light?.event?.disabled?.background ?? 'transparent'
                : shapeInput.inputStyle?.light?.background  ?? 'transparent'
        }; color: ${
            isDarkMode
                ? shapeInput.disabled || shapeInput.readonly
                    ? shapeInput.inputStyle?.dark?.event?.disabled?.color ?? '#71717a'
                    :shapeInput.inputStyle?.dark?.color    ?? '#d1d5db'
                : shapeInput.disabled || shapeInput.readonly
                    ? shapeInput.inputStyle?.light?.event?.disabled?.color ?? '#71717a'
                    :shapeInput.inputStyle?.light?.color   ?? 'black'
        }; box-shadow: 0 0 0 ${shapeInput.inputStyle?.ringSize ?? '1px'} ${
            isDarkMode
                ? shapeInput.inputStyle?.dark?.ring ?? '#3f3f46'  // zinc-700
                : shapeInput.inputStyle?.light?.ring ?? '#d4d4d8' // zinc-300
        };`
    }
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
>
    <slot />
</button>
