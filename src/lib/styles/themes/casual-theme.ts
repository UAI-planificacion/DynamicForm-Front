import type { ShapeInputStyle } from "$models";
import { tailwindToRGBA } from "../tailwind-colors";

export const casualTheme = ( color: string = 'orange' ): ShapeInputStyle => ({

    height          : 'h-8',
    fontSize        : 'text-sm',
    borderRadius    : 'rounded',
    boxShadow       : 'shadow',
    ringSize        : '1px',

    light : {
        backgroundTransparency : '100',
        backgroundColor        : color,
        backgroundTonality     : '100',
        background             : tailwindToRGBA(`${color}-100`),

        colorTransparency      : '100',
        colorTonality          : '700',
        colorColor             : color,
        color                  : tailwindToRGBA(`${color}-700`),

        ringTransparency       : '100',
        ringColor              : color,
        ringTonality           : '300',
        ring                   : tailwindToRGBA(`${color}-300`),

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
                ringSize         : '2px',
            }
        }
    }

});
