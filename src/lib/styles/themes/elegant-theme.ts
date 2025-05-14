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

        secondaryBackgroundOpacity   : '80',
        secondaryBackgroundTonality  : '300',
        secondaryBackgroundColor     : color,
        secondaryBackground          : tailwindToRGBA(`${color}-300`),

        colorOpacity    : '100',
        colorTonality   : '800',
        colorColor      : color,
        color           : tailwindToRGBA(`${color}-800`),

        secondaryColorOpacity    : '100',
        secondaryColorTonality   : '800',
        secondaryColorColor      : color,
        secondaryColor           : tailwindToRGBA(`${color}-800`),

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

        secondaryBackgroundOpacity   : '100',
        secondaryBackgroundTonality  : '600',
        secondaryBackgroundColor     : color,
        secondaryBackground          : tailwindToRGBA(`${color}-600`),

        colorOpacity    : '100',
        colorTonality   : '300',
        colorColor      : color,
        color           : tailwindToRGBA(`${color}-300`),

        secondaryColorOpacity    : '100',
        secondaryColorTonality   : '50',
        secondaryColorColor      : color,
        secondaryColor           : tailwindToRGBA(`${color}-50`),

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

