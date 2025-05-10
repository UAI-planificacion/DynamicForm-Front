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

        colorOpacity      : '100',
        colorTonality          : '900',
        colorColor             : color,
        color                  : tailwindToRGBA(`${color}-900`),

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

        colorOpacity      : '100',
        colorTonality          : '200',
        colorColor             : color,
        color                  : tailwindToRGBA(`${color}-200`),

        ringOpacity       : '100',
        ringColor              : color,
        ringTonality           : '600',
        ring                   : tailwindToRGBA(`${color}-600`),

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
