<script lang="ts">
	import type { ShapeInput }  from '$models';
	import Description 			from "./Description.svelte";
	import { LoadIcon } 		from "$icons";
    import { theme }            from "$stores";
    import { stylesS } from '$lib/styles/themes/styl';


    export let shapeInput	: ShapeInput;
	export let onClick 		: VoidFunction;
	export let loading 		: boolean = false;


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
        class       = {`
            w-full
            h-12
            ${ shapeInput.inputStyle?.borderRadius }
            ${ shapeInput.inputStyle?.boxShadow }
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

        active:bg-zinc-700
        disabled:bg-zinc-600
        hover:bg-dark/95
        dark:hover:bg-zinc-800
        dark:disabled:bg-zinc-700
        dark:disabled:text-zinc-400
        `}
        style = { stylesS( isDarkMode, shapeInput ) }
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
