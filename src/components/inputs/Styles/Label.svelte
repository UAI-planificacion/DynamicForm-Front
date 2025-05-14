
<script lang="ts">
    import type {
        ShapeInput,
        ThemeShape
    }                   from "$models";
    import { COLOR }    from "$lib/styles/themes/default/color";
    import { theme }    from "$stores";


    export let shapeInput   : ShapeInput;
    export let themeShape   : ThemeShape;
    export let isMargin     : boolean = false;


    let isDarkMode = $theme === 'dark';


    $: if ( $theme === 'dark' ) {
        isDarkMode = true;
    } else {
        isDarkMode = false;
    }
</script>

<label
    for         = { shapeInput.id || "no name" }
    style       = { COLOR( isDarkMode, themeShape )}
    class       = {`${isMargin ? 'ml-2': ''} font-medium disabled:opacity-50 ${ themeShape.fontSize }`}
>
    {shapeInput.label}
</label>
