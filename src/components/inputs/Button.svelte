<script lang="ts">
	import type { ShapeInput, ThemeShape }  from '$models';
	import Description 			from "./Description.svelte";
	import { LoadIcon } 		from "$icons";
    import { theme }            from "$stores";
    import { UAITheme }         from '$lib/styles/themes';
    import { secondaryColor }   from '$lib/styles/themes/default/secondary-color';


    export let shapeInput	: ShapeInput;
	export let onClick 		: VoidFunction;
	export let loading 		: boolean = false;
    export let themeShape   : ThemeShape = UAITheme();


    let isDarkMode = $theme === 'dark';


    $: if ( $theme === 'dark' ) {
        isDarkMode = true;
    } else {
        isDarkMode = false;
    }
</script>

<div class="space-y-1.5 w-full">
    <button
        type        = "submit"
        onclick		= { onClick }
        disabled    = { shapeInput.disabled || loading }
        name 		= { shapeInput.name }
        style       = { secondaryColor( isDarkMode, themeShape )}
        class       = {`
            transition-all duration-200 ease-in-out 
            w-full
            h-12
            ${ themeShape.borderRadius }
            ${ themeShape.boxShadow }
            items-center
            justify-center
            px-6
            text-base
            font-semibold 
            duration-200
            active:scale-[0.98]
            disabled:scale-100
            disabled:cursor-not-allowed
            disabled:opacity-50
        `}
    >
        {#if loading}
            <span class="mr-2">
                <LoadIcon />
            </span>
        {/if}

        { shapeInput.label }
    </button>

	<Description { shapeInput } />
</div>
