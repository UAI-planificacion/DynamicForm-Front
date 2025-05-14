import type { ThemeShape } from "$models";
import { tailwindToRGBA } from "../tailwind-colors";

export const markedTheme = ( color: string = 'rose' ): ThemeShape => ({

    height          : 'h-10',
    fontSize        : 'text-base',
    borderRadius    : 'rounded-xl',
    boxShadow       : 'shadow-lg',
    ringSize        : '2px',
    borderSize      : 'border-0',

    light : {
        backgroundOpacity : '100',
        backgroundColor        : color,
        backgroundTonality     : '100',
        background             : tailwindToRGBA(`${color}-100`),

        secondaryBackgroundOpacity   : '100',
        secondaryBackgroundTonality  : '400',
        secondaryBackgroundColor     : color,
        secondaryBackground          : tailwindToRGBA(`${color}-400`),

        colorOpacity    : '100',
        colorTonality   : '900',
        colorColor      : color,
        color           : tailwindToRGBA(`${color}-900`),

        secondaryColorOpacity    : '100',
        secondaryColorTonality   : '50',
        secondaryColorColor      : color,
        secondaryColor           : tailwindToRGBA(`${color}-50`),

        ringOpacity       : '100',
        ringColor              : color,
        ringTonality           : '400',
        ring                   : tailwindToRGBA(`${color}-400`),

        event : {
            focus : {
                ringColor        : color,
                ringTonality     : '500',
                ringOpacity : '100',
                ring             : tailwindToRGBA(`${color}-500`),
                ringSize         : '3px',
            }
        }
    },

    dark : {
        backgroundOpacity : '100',
        backgroundColor        : color,
        backgroundTonality     : '900',
        background             : tailwindToRGBA(`${color}-900`),

        secondaryBackgroundOpacity   : '100',
        secondaryBackgroundTonality  : '600',
        secondaryBackgroundColor     : color,
        secondaryBackground          : tailwindToRGBA(`${color}-600`),

        colorOpacity    : '100',
        colorTonality   : '200',
        colorColor      : color,
        color           : tailwindToRGBA(`${color}-200`),

        secondaryColorOpacity    : '100',
        secondaryColorTonality   : '200',
        secondaryColorColor      : color,
        secondaryColor           : tailwindToRGBA(`${color}-200`),

        ringOpacity     : '100',
        ringColor       : color,
        ringTonality    : '600',
        ring            : tailwindToRGBA(`${color}-600`),

        event : {
            focus : {
                ringColor        : color,
                ringTonality     : '500',
                ringOpacity : '100',
                ring             : tailwindToRGBA(`${color}-500`),
                ringSize         : '3px',
            }
        }
    }

});
