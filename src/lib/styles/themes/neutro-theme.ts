import type { ThemeShape } from "$models";
import { tailwindToRGBA } from "../tailwind-colors";

export const neutralTheme = ( color: string = 'slate' ): ThemeShape => ({
    height          : 'h-9',
    fontSize        : 'text-sm',
    borderRadius    : 'rounded-full',
    boxShadow       : 'shadow-xl',
    ringSize        : '0px',
    borderSize      : 'border-0',

    light : {
        backgroundOpacity   : '100',
        backgroundTonality  : '50',
        backgroundColor     : color,
        background          : tailwindToRGBA(`${color}-50`),

        secondaryBackgroundOpacity   : '100',
        secondaryBackgroundTonality  : '200',
        secondaryBackgroundColor     : color,
        secondaryBackground          : tailwindToRGBA(`${color}-200`),

        colorOpacity    : '100',
        colorTonality   : '700',
        colorColor      : color,
        color           : tailwindToRGBA(`${color}-700`),

        secondaryColorOpacity    : '100',
        secondaryColorTonality   : '500',
        secondaryColorColor      : color,
        secondaryColor           : tailwindToRGBA(`${color}-500`),

        ringOpacity     : '100',
        ringTonality    : '200',
        ringColor       : color,
        ring            : tailwindToRGBA(`${color}-200`),

        event : {
            focus : {
                ringTonality    : '400',
                ringOpacity     : '100',
                ringColor       : color,
                ring            : tailwindToRGBA(`${color}-400`),
                ringSize        : '1px',
            }
        }
    },

    dark : {
        backgroundOpacity   : '100',
        backgroundTonality  : '800',
        backgroundColor     : color,
        background          : tailwindToRGBA(`${color}-800`),

        secondaryBackgroundOpacity   : '100',
        secondaryBackgroundTonality  : '800',
        secondaryBackgroundColor     : color,
        secondaryBackground          : tailwindToRGBA(`${color}-800`),

        colorOpacity    : '100',
        colorTonality   : '200',
        colorColor      : color,
        color           : tailwindToRGBA(`${color}-200`),

        secondaryColorOpacity    : '100',
        secondaryColorTonality   : '200',
        secondaryColorColor      : color,
        secondaryColor           : tailwindToRGBA(`${color}-200`),

        ringOpacity     : '100',
        ringTonality    : '500',
        ringColor       : color,
        ring            : tailwindToRGBA(`${color}-500`),

        event : {
            focus : {
                ringTonality    : '400',
                ringOpacity     : '100',
                ringColor       : color,
                ring            : tailwindToRGBA(`${color}-400`),
                ringSize        : '1px',
            }
        }
    }

});
