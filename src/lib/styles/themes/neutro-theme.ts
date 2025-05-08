import type { ShapeInputStyle } from "$models";
import { tailwindToRGBA } from "../tailwind-colors";

export const neutralTheme = ( color: string = 'slate' ): ShapeInputStyle => ({

    height          : 'h-9',
    fontSize        : 'text-sm',
    borderRadius    : 'rounded-md',
    boxShadow       : 'shadow-sm',
    ringSize        : '1px',

    light : {
        backgroundTransparency : '100',
        backgroundColor        : color,
        backgroundTonality     : '50',
        background             : tailwindToRGBA(`${color}-50`),

        colorTransparency      : '100',
        colorTonality          : '700',
        colorColor             : color,
        color                  : tailwindToRGBA(`${color}-700`),

        ringTransparency       : '100',
        ringColor              : color,
        ringTonality           : '200',
        ring                   : tailwindToRGBA(`${color}-200`),

        event : {
            focus : {
                ringColor        : color,
                ringTonality     : '400',
                ringTransparency : '100',
                ring             : tailwindToRGBA(`${color}-400`),
                ringSize         : '2px',
            }
        }
    },

    dark : {
        backgroundTransparency : '100',
        backgroundColor        : color,
        backgroundTonality     : '800',
        background             : tailwindToRGBA(`${color}-800`),

        colorTransparency      : '100',
        colorTonality          : '200',
        colorColor             : color,
        color                  : tailwindToRGBA(`${color}-200`),

        ringTransparency       : '100',
        ringColor              : color,
        ringTonality           : '500',
        ring                   : tailwindToRGBA(`${color}-500`),

        event : {
            focus : {
                ringColor        : color,
                ringTonality     : '400',
                ringTransparency : '100',
                ring             : tailwindToRGBA(`${color}-400`),
                ringSize         : '2px',
            }
        }
    }

});
