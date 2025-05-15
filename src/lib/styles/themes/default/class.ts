import type { ThemeShape } from "$models";


export const className = (
    isBox       : boolean,
    themeShape  : ThemeShape,
    height      : boolean = true,
    isRadius    : boolean = true
): string => (
    `px-3 py-2 w-full transition-all duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-50
    ${ isBox ? 'flex items-center justify-between' : '' } 
    ${ themeShape.fontSize }
    ${ height ? themeShape.height : 'h-auto' }
    ${ !isRadius && themeShape.borderRadius === 'rounded-full' ? 'rounded-2xl': themeShape.borderRadius }
    ${ themeShape.borderSize }
    ${ themeShape.boxShadow }
`);
