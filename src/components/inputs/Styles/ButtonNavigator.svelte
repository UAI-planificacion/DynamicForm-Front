
<script lang="ts">
    import { tailwindToRGBA }   from "$lib/styles";
    import type { ThemeShape }  from "$models";
    import { theme }            from "$stores";


    type Colors = {
        tonalityDark : number,
        tonalityLight : number,
        opacity  : number
    }


    export let themeShape           : ThemeShape;
    export let onClick              : ( event: MouseEvent ) => void;
    export let className            : string = '';
    export let selected             : boolean = false;
    export let canHover             : boolean = true;
    export let disabled             : boolean = false;
    export let style                : string = '';
    export let defaultSelected      : boolean = false;
    export let rounded              : string | null = null;
    export let colorHover           : Colors = { tonalityDark: 100, tonalityLight: 200, opacity: 60 };
    export let colorSelected        : Colors = { tonalityDark: 100, tonalityLight: 200, opacity: 100 };
    export let colorDefaultSelected : Colors = { tonalityDark: 100, tonalityLight: 200, opacity: 100 };


    let isHovered = false;
    let isDarkMode = $theme === 'dark';


    $: if ( $theme === 'dark' ) {
        isDarkMode = true;
    } else {
        isDarkMode = false;
    }


    function setTonalityDark(
        theme: ThemeShape,
        tonalityRange: number,
        opacity: number
    ): string {
        let tonalityNumber = Number( theme.dark.backgroundTonality );

        if ( tonalityNumber === 950 ) tonalityNumber = 900;

        let tonality = tonalityNumber - tonalityRange;

        return `bg-${theme.dark.backgroundColor}-${tonality}/${opacity}`;
    }   


    function setTonalityLight(
        theme: ThemeShape,
        tonalityRange: number,
        opacity: number
    ): string {
        let tonalityNumber = Number( theme.light.backgroundTonality );

        if ( tonalityNumber === 50 ) tonalityNumber = 100;

        let tonality = tonalityNumber + tonalityRange;

        return `bg-${theme.light.backgroundColor}-${tonality}/${opacity}`;
    }


    function setTonality(
        theme: ThemeShape,
        colors: Colors
    ): string {
        const color = isDarkMode
            ? setTonalityDark( theme, colors.tonalityDark, colors.opacity )
            : setTonalityLight( theme, colors.tonalityLight, colors.opacity );

        return tailwindToRGBA( color );
    }
</script>

<button 
    type            = "button"
    disabled        = { disabled }
    on:click|stopPropagation        = {( event ) => onClick(event) }
    on:mouseenter   = {() => isHovered = canHover }
    on:mouseleave   = {() => isHovered = false }
    class           = {`
        ${ rounded ?? themeShape.borderRadius }
        ${ themeShape.fontSize }
        ${ className }
        flex
        items-center
        transition-transform
        duration-100
        disabled:cursor-not-allowed
        disabled:opacity-50
        disabled:scale-100
        disabled:shadow-none
    `}
    style = {`
        background-color:
        ${ isHovered
            ? setTonality( themeShape, colorHover )
            : selected
                ? setTonality( themeShape, colorSelected )
                : defaultSelected
                    ? setTonality( themeShape, colorDefaultSelected )
                    : ''
        };
        ${style}
    `}
>
    <slot />
</button>
