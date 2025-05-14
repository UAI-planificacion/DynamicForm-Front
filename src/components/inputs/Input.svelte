<script lang="ts">
    import { style }            from "$lib/styles/themes/default/style";
    import { focus }            from "$lib/styles/themes/default/focus";
    import { blur }             from "$lib/styles/themes/default/blur";
    import type { ShapeInput, ThemeShape }  from "$models";
    import { theme }            from "$stores";
    import Info                 from "./Info.svelte";
    import { className }        from "$lib/styles/themes/default/class";
    import { UAITheme } from "$lib";


    export let shapeInput   : ShapeInput;
    export let onInput      : ( value: string ) => void;
    export let value        : string | undefined = undefined;
    export let setError     : VoidFunction = () => {};
    export let onKeyup      : ( event: KeyboardEvent ) => void = () => {};
    export let themeShape   : ThemeShape = UAITheme();


    let isDarkMode = $theme === 'dark';


    $: if ( $theme === 'dark' ) {
        isDarkMode = true;
    } else {
        isDarkMode = false;
    }
</script>

<Info { shapeInput } { onInput } { value } { themeShape }>
    <input
        type        = { shapeInput.type || "text" }
        id          = { shapeInput.id }
        name        = { shapeInput.name || "no name" }
        placeholder = { shapeInput.placeholder }
        required    = { shapeInput.required }
        disabled    = { shapeInput.disabled }
        readonly    = { shapeInput.readonly }
        value       = { value ?? '' }
        on:input    = {( event: Event ) => { onInput(( event.target as HTMLTextAreaElement ).value ); setError(); }}
        on:keyup    = { onKeyup }
        class       = { className( false, themeShape )}
        style       = { style( isDarkMode, themeShape )}
        on:focus    = {( e ) => focus( e, isDarkMode, themeShape )}
        on:blur     = {( e ) => blur( e, isDarkMode, themeShape )}
    />
</Info>
