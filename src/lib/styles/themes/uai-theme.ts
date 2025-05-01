import type { ShapeInputStyle } from "$models"


export const inputUAITheme: ShapeInputStyle = ({

    height          : 'h-9',
    fontSize        : 'text-sm',
    borderRadius    : 'rounded-md',
    boxShadow       : 'shadow-md',
    ringSize        : '1px',

    light : {
        backgroundTransparency : '100',
        backgroundColor        : 'white',
        backgroundTonality     : '900',
        // background             : 'background',

        // color                : 'zinc',
        colorTransparency    : '100',
        colorTonality        : '800',
        colorColor           : 'zinc',

        ringTransparency : '100',
        ringColor        : 'zinc',
        ringTonality     : '300',
        // ring             : 'ring',

        event : {
            focus : {
                ringColor        : 'zinc',
                ringTonality     : '400',
                ringTransparency : '100',
                // ring             : 'ring',
                ringSize         : '2px',
            }
        }
    },

    dark : {
        backgroundTransparency : '100',
        backgroundColor        : 'zinc',
        backgroundTonality     : '900',
        // background             : 'background',

        // color                : 'zinc',
        colorTransparency    : '100',
        colorTonality        : '300',
        colorColor           : 'zinc',

        ringTransparency : '100',
        ringColor        : 'zinc',
        ringTonality     : '700',
        // ring             : 'ring',

        event : {
            focus : {
                ringColor        : 'zinc',
                ringTonality     : '500',
                ringTransparency : '100',
                // ring             : 'ring',
                ringSize         : '2px',
            }
        }
    }

});