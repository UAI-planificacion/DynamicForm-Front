
<script lang="ts">
    import { tailwindToRGBA } from "$lib/styles";
    import type { ThemeShape } from "$models";
    import { theme }            from "$stores";


    export let themeShape   : ThemeShape;
    export let onClick      : ( event: MouseEvent ) => void;
    export let className    : string = '';
    export let selected     : boolean = false;
    export let canHover     : boolean = true;
    export let disabled     : boolean = false;
    export let style        : string = '';
    export let defaultSelected : boolean= false;
    export let rounded : string | null = null;

    export let tonalityLight : number = 100;
    export let tonalityDark : number = 100;

    let isHovered = false;

    let isDarkMode = $theme === 'dark';


    $: if ( $theme === 'dark' ) {
        isDarkMode = true;
    } else {
        isDarkMode = false;
    }


    function setTonalityDark( theme: ThemeShape, tonalityRange: number, opacity: number ) {
        const tonalityNumber = Number( theme.dark.backgroundTonality );
        let tonality = tonalityNumber - tonalityRange;

        if ( tonalityNumber === 950 ) tonality = 900;

        return `bg-${theme.dark.backgroundColor}-${tonality}/${opacity}`;

    }   

    function setTonalityLight( theme: ThemeShape, tonalityRange: number, opacity: number ) {
        const tonalityNumber = Number( theme.light.backgroundTonality );
        let tonality = tonalityNumber + tonalityRange;

        if ( tonalityNumber === 50 ) tonality = 200;

        return `bg-${theme.light.backgroundColor}-${tonality}/${opacity}`;
    }

    function setTonality( theme: ThemeShape, opacity: number) {
        const color = isDarkMode
            ? setTonalityDark( theme, tonalityDark, opacity )
            : setTonalityLight( theme, tonalityLight, opacity );

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
        ${ rounded ? rounded : themeShape.borderRadius }
        ${ themeShape.fontSize }
        ${ className }
        flex
        items-center
        transition-all
        duration-200
        ${ disabled ? 'cursor-not-allowed opacity-50' : '' }
    `}
    style= {`
        background-color:
        ${ isHovered
            ? setTonality( themeShape, 60 )
            : selected
                ? setTonality( themeShape, 90)
                : defaultSelected
                    ? setTonality( themeShape, 100 )
                    : ''
        };
        ${style}
    `}
>
    <slot />
</button>
