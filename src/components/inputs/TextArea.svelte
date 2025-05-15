<script lang="ts">
    import type { ShapeInput, ThemeShape } 	from "$models";
    import { theme }                        from "$stores";
    import { style }    		            from "$lib/styles/themes/default/style";
    import { focus }    		            from "$lib/styles/themes/default/focus";
    import { blur }     		            from "$lib/styles/themes/default/blur";
    import { className } 		            from "$lib/styles/themes/default/class";
	import Info 				            from "./Info.svelte";
    import { UAITheme }                     from "$lib";


    export let shapeInput	: ShapeInput;
	export let value 		: string | undefined = undefined;
    export let onInput		: ( value: string ) => void;
    export let setError     : VoidFunction = () => {};
    export let themeShape   : ThemeShape = UAITheme();


    let isDarkMode = $theme === 'dark';


    $: if ( $theme === 'dark' ) {
        isDarkMode = true;
    } else {
        isDarkMode = false;
    }
</script>

<Info { shapeInput } { onInput } { value } { themeShape }>
	<textarea
        bind:value={ value }
		name        = { shapeInput.name }
		id          = { shapeInput.id }
		rows        = { shapeInput.rows || 3 }
		minlength   = { shapeInput.minLength }
		maxlength   = { shapeInput.maxLength }
		required 	= { shapeInput.required }
		readonly 	= { shapeInput.readonly }
		disabled 	= { shapeInput.disabled }
		placeholder	= { shapeInput.placeholder }
		on:input    = { ( event: Event ) => { onInput(( event.target as HTMLTextAreaElement ).value ); setError() }}
        class       = { className( false, themeShape, false, false )}
        style       = { style( isDarkMode, themeShape )}
        on:focus    = {( e ) => focus( e, isDarkMode, themeShape )}
        on:blur     = {( e ) => blur( e, isDarkMode, themeShape )}
    ></textarea>
</Info>
