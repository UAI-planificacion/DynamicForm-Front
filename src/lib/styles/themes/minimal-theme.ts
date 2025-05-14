import type { ThemeShape } from "$models"
import { tailwindToRGBA } from "../tailwind-colors";


export const minimalTheme = (color: string = 'sky'): ThemeShape =>({
        height          : 'h-9',
        fontSize        : 'text-sm',
        borderRadius    : 'rounded-xl',
        boxShadow       : 'shadow-sm',
        ringSize        : '1px',
        borderSize      : 'border-0',

        light: {
            backgroundOpacity   : '100',
            backgroundTonality  : '50',
            backgroundColor     : color,
            background          : tailwindToRGBA(`${color}-50`),

            secondaryBackgroundOpacity   : '100',
            secondaryBackgroundTonality  : '500',
            secondaryBackgroundColor     : color,
            secondaryBackground          : tailwindToRGBA(`${color}-500`),

            colorOpacity    : '100',
            colorTonality   : '800',
            colorColor      : color,
            color           : tailwindToRGBA(`${color}-800`),

            secondaryColorOpacity    : '100',
            secondaryColorTonality   : '100',
            secondaryColorColor      : color,
            secondaryColor           : tailwindToRGBA(`${color}-100`),

            ringOpacity     : '100',
            ringTonality    : '500',
            ringColor       : color,
            ring            : tailwindToRGBA(`${color}-500`),

            event: {
                focus: {
                    ringTonality    : '600',
                    ringOpacity     : '300',
                    ringColor       : color,
                    ring            : tailwindToRGBA(`${color}-300`),
                    ringSize        : '2px'
                }
            }
        },

        dark: {
            backgroundOpacity   : '100',
            backgroundTonality  : '800',
            backgroundColor     : color,
            background          : tailwindToRGBA( `${color}-800` ),

            secondaryBackgroundOpacity   : '100',
            secondaryBackgroundTonality  : '900',
            secondaryBackgroundColor     : color,
            secondaryBackground          : tailwindToRGBA(`${color}-900`),

            colorOpacity      : '100',
            colorTonality     : '100',
            colorColor        : color,
            color             : tailwindToRGBA(`${color}-100`),

            secondaryColorOpacity    : '100',
            secondaryColorTonality   : '200',
            secondaryColorColor      : color,
            secondaryColor           : tailwindToRGBA(`${color}-200`),

            ringOpacity       : '100',
            ringTonality      : '700',
            ringColor         : color,
            ring              : tailwindToRGBA(`${color}-300`),

            event: {
                focus: {
                    ringTonality    : '200',
                    ringOpacity     : '100',
                    ringColor       : color,
                    ring            : tailwindToRGBA(`${color}-200`),
                    ringSize        : '2px'
                }
            }
        }
    })
