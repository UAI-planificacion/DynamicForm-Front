import type { ShapeInputStyle } from "$models"
import { tailwindToRGBA } from "../tailwind-colors";


export const inputUAITheme: ShapeInputStyle = ({

    height          : 'h-9',
    fontSize        : 'text-sm',
    borderRadius    : 'rounded-md',
    boxShadow       : 'shadow-md',
    ringSize        : '1px',

    light : {
        backgroundTransparency : '100',
        backgroundColor        : 'zinc',
        backgroundTonality     : '50',
        background             : tailwindToRGBA( 'zinc-50' ),

        colorTransparency    : '100',
        colorTonality        : '800',
        colorColor           : 'zinc',
        color                : tailwindToRGBA( 'zinc-800' ),

        ringTransparency : '100',
        ringColor        : 'zinc',
        ringTonality     : '300',
        ring             : tailwindToRGBA('zinc-300'),

        event : {
            focus : {
                ringColor        : 'zinc',
                ringTonality     : '400',
                ringTransparency : '100',
                ring             : tailwindToRGBA('zinc-400'),
                ringSize         : '2px',
            }
        }
    },

    dark : {
        backgroundTransparency : '100',
        backgroundColor        : 'zinc',
        backgroundTonality     : '900',
        background             : tailwindToRGBA('zinc-900'),

        colorTransparency    : '100',
        colorTonality        : '300',
        colorColor           : 'zinc',
        color                : tailwindToRGBA('zinc-300'),

        ringTransparency : '100',
        ringColor        : 'zinc',
        ringTonality     : '700',
        ring             : tailwindToRGBA('zinc-700'),

        event : {
            focus : {
                ringColor        : 'zinc',
                ringTonality     : '500',
                ringTransparency : '100',
                ring             : tailwindToRGBA('zinc-500'),
                ringSize         : '2px',
            }
        }
    }

});