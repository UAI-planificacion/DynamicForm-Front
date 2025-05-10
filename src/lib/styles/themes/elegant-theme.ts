import type { ThemeShape } from "$models";
import { tailwindToRGBA } from "../tailwind-colors";

export const elegantTheme = ( color: string = 'emerald' ): ThemeShape => ({
    height          : 'h-9',
    fontSize        : 'text-sm',
    borderRadius    : 'rounded-full',
    boxShadow       : 'shadow-md',
    ringSize        : '1px',
    borderSize      : 'border-0',

    light : {
        backgroundOpacity   : '90',
        backgroundTonality  : '50',
        backgroundColor     : color,
        background          : tailwindToRGBA(`${color}-50`),

        colorOpacity    : '100',
        colorTonality   : '800',
        colorColor      : color,
        color           : tailwindToRGBA(`${color}-800`),

        ringOpacity     : '80',
        ringTonality    : '300',
        ringColor       : color,
        ring            : tailwindToRGBA(`${color}-300`),

        event : {
            focus : {
                ringOpacity     : '100',
                ringTonality    : '500',
                ringColor       : color,
                ring            : tailwindToRGBA(`${color}-500`),
                ringSize        : '2px',
            }
        }
    },

    dark : {
        backgroundOpacity   : '90',
        backgroundTonality  : '950',
        backgroundColor     : color,
        background          : tailwindToRGBA(`${color}-950`),

        colorOpacity    : '100',
        colorTonality   : '300',
        colorColor      : color,
        color           : tailwindToRGBA(`${color}-300`),

        ringOpacity     : '100',
        ringTonality    : '600',
        ringColor       : color,
        ring            : tailwindToRGBA(`${color}-600`),

        event : {
            focus : {
                ringOpacity     : '100',
                ringTonality    : '400',
                ringColor       : color,
                ring            : tailwindToRGBA(`${color}-400`),
                ringSize        : '2px',
            }
        }
    }
});

