<script lang="ts">
    import { theme }            from "$stores";
    import type { ShapeInput, ThemeShape }  from '$models';
    import { style }            from "$lib/styles/themes/default/style";
    import { focus }            from "$lib/styles/themes/default/focus";
    import { blur }             from "$lib/styles/themes/default/blur";
    import { className } from "$lib/styles/themes/default/class";


    let isDarkMode = $theme === 'dark';


    $: if ( $theme === 'dark' ) {
        isDarkMode = true;
    } else {
        isDarkMode = false;
    }


    export let shapeInput   : ShapeInput;
    export let handleOpen   : VoidFunction;
    export let themeShape   : ThemeShape;
    export let isBox        : boolean = true;
</script>

<button
    type        = "button"
    on:click    = { handleOpen }
    id          = { shapeInput.id }
    disabled    = { shapeInput.disabled }
    class       = { className( isBox, themeShape ) }
    style       = { style( isDarkMode, themeShape )}
    on:focus    = {( e ) => focus( e, isDarkMode, themeShape )}
    on:blur     = {( e ) => blur( e, isDarkMode, themeShape )}
>
    <slot />
</button>
