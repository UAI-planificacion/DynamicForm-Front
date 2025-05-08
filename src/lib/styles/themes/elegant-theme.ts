import type { ShapeInputStyle } from "$models";
import { tailwindToRGBA } from "../tailwind-colors";

export const elegantTheme = ( color: string = 'emerald' ): ShapeInputStyle => ({

    height          : 'h-9',
    fontSize        : 'text-sm',
    borderRadius    : 'rounded-full',
    boxShadow       : 'shadow-md',
    ringSize        : '1px',

    light : {
        backgroundTransparency : '90',
        backgroundColor        : color,
        backgroundTonality     : '50',
        background             : tailwindToRGBA(`${color}-50`),

        colorTransparency      : '100',
        colorTonality          : '800',
        colorColor             : color,
        color                  : tailwindToRGBA(`${color}-800`),

        ringTransparency       : '80',
        ringColor              : color,
        ringTonality           : '300',
        ring                   : tailwindToRGBA(`${color}-300`),

        event : {
            focus : {
                ringColor        : color,
                ringTonality     : '500',
                ringTransparency : '100',
                ring             : tailwindToRGBA(`${color}-500`),
                ringSize         : '2px',
            }
        }
    },

    dark : {
        backgroundTransparency : '90',
        backgroundColor        : color,
        backgroundTonality     : '950',
        background             : tailwindToRGBA(`${color}-950`),

        colorTransparency      : '100',
        colorTonality          : '300',
        colorColor             : color,
        color                  : tailwindToRGBA(`${color}-300`),

        ringTransparency       : '100',
        ringColor              : color,
        ringTonality           : '600',
        ring                   : tailwindToRGBA(`${color}-600`),

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
