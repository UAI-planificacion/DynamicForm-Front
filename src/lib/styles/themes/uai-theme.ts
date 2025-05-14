import type { ThemeShape } from "$models"
import { tailwindToRGBA } from "../tailwind-colors";


export const UAITheme = ( color: string = 'zinc' ): ThemeShape => ({
    height          : 'h-9',
    fontSize        : 'text-sm',
    borderRadius    : 'rounded-md',
    boxShadow       : 'shadow-md',
    ringSize        : '1px',
    borderSize      : 'border-0',

    light : {
        backgroundOpacity   : '100',
        backgroundTonality  : '50',
        backgroundColor     : color,
        background          : tailwindToRGBA( `${color}-50` ),

        secondaryBackgroundOpacity   : '100',
        secondaryBackgroundTonality  : '100',
        secondaryBackgroundColor     : 'black',
        secondaryBackground          : tailwindToRGBA( 'black' ),

        colorSelectedOpacity    : '100',
        colorSelectedTonality   : '50',
        colorSelectedColor      : 'black',
        colorSelected           : tailwindToRGBA( 'black' ),

        colorOpacity    : '100',
        colorTonality   : '800',
        colorColor      : color,
        color           : tailwindToRGBA( `${color}-800` ),

        secondaryColorOpacity    : '100',
        secondaryColorTonality   : '200',
        secondaryColorColor      : 'white',
        secondaryColor           : tailwindToRGBA( 'white' ),

        ringOpacity     : '100',
        ringTonality    : '300',
        ringColor       : color,
        ring            : tailwindToRGBA(`${color}-300`),

        event : {
            focus : {
                ringOpacity     : '100',
                ringTonality    : '400',
                ringColor       : color,
                ring            : tailwindToRGBA(`${color}-400`),
                ringSize        : '2px',
            }
        }
    },

    dark : {
        backgroundOpacity   : '100',
        backgroundTonality  : '900',
        backgroundColor     : color,
        background          : tailwindToRGBA(`${color}-900`),

        secondaryBackgroundOpacity   : '100',
        secondaryBackgroundTonality  : '100',
        secondaryBackgroundColor     : 'black',
        secondaryBackground          : tailwindToRGBA( 'black' ),

        colorSelectedOpacity    : '100',
        colorSelectedTonality   : '50',
        colorSelectedColor      : 'white',
        colorSelected           : tailwindToRGBA( 'white' ),

        colorOpacity    : '100',
        colorTonality   : '300',
        colorColor      : color,
        color           : tailwindToRGBA(`${color}-300`),

        secondaryColorOpacity    : '100',
        secondaryColorTonality   : '200',
        secondaryColorColor      : 'white',
        secondaryColor           : tailwindToRGBA( 'white' ),

        ringOpacity     : '100',
        ringTonality    : '700',
        ringColor       : color,
        ring            : tailwindToRGBA(`${color}-700`),

        event : {
            focus : {
                ringOpacity     : '100',
                ringTonality    : '500',
                ringColor       : color,
                ring            : tailwindToRGBA(`${color}-500`),
                ringSize        : '2px',
            }
        }
    }
});
