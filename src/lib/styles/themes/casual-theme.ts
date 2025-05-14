import type { ThemeShape } from "$models";
import { tailwindToRGBA } from "../tailwind-colors";

export const casualTheme = ( color: string = 'orange' ): ThemeShape => ({

    height          : 'h-9',
    fontSize        : 'text-sm',
    borderRadius    : 'rounded',
    boxShadow       : 'shadow-md',
    ringSize        : '1px',
    borderSize      : 'border-0',

    light : {
        backgroundOpacity   : '100',
        backgroundTonality  : '100',
        backgroundColor     : color,
        background          : tailwindToRGBA(`${color}-100`),

        secondaryBackgroundOpacity   : '100',
        secondaryBackgroundTonality  : '300',
        secondaryBackgroundColor     : color,
        secondaryBackground          : tailwindToRGBA(`${color}-300`),

        colorOpacity    : '100',
        colorTonality   : '700',
        colorColor      : color,
        color           : tailwindToRGBA(`${color}-700`),

        secondaryColorOpacity    : '100',
        secondaryColorTonality   : '800',
        secondaryColorColor      : color,
        secondaryColor           : tailwindToRGBA(`${color}-800`),

        ringOpacity     : '100',
        ringTonality    : '300',
        ringColor       : color,
        ring            : tailwindToRGBA(`${color}-300`),

        event : {
            focus : {
                ringTonality    : '400',
                ringOpacity     : '100',
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
        ringTonality    : '600',
        ringColor       : color,
        ring            : tailwindToRGBA(`${color}-600`),

        event : {
            focus : {
                ringTonality    : '500',
                ringOpacity     : '100',
                ringColor       : color,
                ring            : tailwindToRGBA(`${color}-500`),
                ringSize        : '2px',
            }
        }
    }

});
