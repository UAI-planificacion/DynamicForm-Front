import type { ShapeInputStyle } from "$models";
import { tailwindToRGBA } from "../tailwind-colors";

export const markedTheme = ( color: string = 'rose' ): ShapeInputStyle => ({

    height          : 'h-10',
    fontSize        : 'text-base',
    borderRadius    : 'rounded-xl',
    boxShadow       : 'shadow-lg',
    ringSize        : '2px',

    light : {
        backgroundTransparency : '100',
        backgroundColor        : color,
        backgroundTonality     : '100',
        background             : tailwindToRGBA(`${color}-100`),

        colorTransparency      : '100',
        colorTonality          : '900',
        colorColor             : color,
        color                  : tailwindToRGBA(`${color}-900`),

        ringTransparency       : '100',
        ringColor              : color,
        ringTonality           : '400',
        ring                   : tailwindToRGBA(`${color}-400`),

        event : {
            focus : {
                ringColor        : color,
                ringTonality     : '500',
                ringTransparency : '100',
                ring             : tailwindToRGBA(`${color}-500`),
                ringSize         : '3px',
            }
        }
    },

    dark : {
        backgroundTransparency : '100',
        backgroundColor        : color,
        backgroundTonality     : '900',
        background             : tailwindToRGBA(`${color}-900`),

        colorTransparency      : '100',
        colorTonality          : '200',
        colorColor             : color,
        color                  : tailwindToRGBA(`${color}-200`),

        ringTransparency       : '100',
        ringColor              : color,
        ringTonality           : '600',
        ring                   : tailwindToRGBA(`${color}-600`),

        event : {
            focus : {
                ringColor        : color,
                ringTonality     : '500',
                ringTransparency : '100',
                ring             : tailwindToRGBA(`${color}-500`),
                ringSize         : '3px',
            }
        }
    }

});
