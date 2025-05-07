<script lang="ts">
    import { fade, slide } from 'svelte/transition';

    import { theme }            from "$stores";
    import type { ShapeInput }  from "$models";


    let isDarkMode = $theme === 'dark';


    $: if ( $theme === 'dark' ) {
        isDarkMode = true;
    } else {
        isDarkMode = false;
    }


    export let shapeInput   : ShapeInput;
    export let styles       : string = '';
    export let padding      : string = 'p-3';
</script>

<div
    class={`absolute top-full right-0 mt-1 z-[9999] ${padding} shadow-xl w-[20rem] 
        ${ shapeInput.inputStyle?.borderRadius ?? 'rounded-md' }
    `}
    transition:fade={{ duration: 150 }}

    style = {`
        background-color: ${
            isDarkMode
                ?  shapeInput.inputStyle?.dark?.background  ?? 'transparent'
                : shapeInput.inputStyle?.light?.background  ?? 'transparent'
        }; color: ${
            isDarkMode
                ? shapeInput.inputStyle?.dark?.color    ?? '#d1d5db'
                : shapeInput.inputStyle?.light?.color   ?? 'black'
        }; box-shadow: 0 0 0 ${shapeInput.inputStyle?.ringSize ?? '1px'} ${
            isDarkMode
                ? shapeInput.inputStyle?.dark?.ring ?? '#3f3f46'  // zinc-700
                : shapeInput.inputStyle?.light?.ring ?? '#d4d4d8' // zinc-300
    };${styles}`}
>
    <div transition:slide={{ duration: 200 }}>
        <slot />
    </div>
</div>
