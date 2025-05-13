<script lang="ts">
    import { fade, slide } from 'svelte/transition';

    import { theme }            from "$stores";
    import type { ThemeShape }  from "$models";
    import { style }            from '$lib/styles/themes/default/style';


    let isDarkMode = $theme === 'dark';


    $: if ( $theme === 'dark' ) {
        isDarkMode = true;
    } else {
        isDarkMode = false;
    }


    export let themeShape   : ThemeShape;
    export let styles       : string = '';
    export let padding      : string = 'p-3';


    const withoutFull = ( size: string | undefined ): string | undefined =>
        size === 'rounded-full'
            ? 'rounded-2xl'
            : size ?? undefined;
</script>

<div
    class={`
        absolute top-full right-0 mt-1 z-[9999] ${padding} shadow-xl w-[20rem] 
        ${ withoutFull( themeShape?.borderRadius )}
    `}
    transition:fade={{ duration: 150 }}
    style={`
        ${ style( isDarkMode, themeShape ) }
        ${ styles }
    `}
>
    <div transition:slide={{ duration: 200 }}>
        <slot />
    </div>
</div>
