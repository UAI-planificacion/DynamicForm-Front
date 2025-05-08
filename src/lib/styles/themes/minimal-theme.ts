import type { ShapeInputStyle } from "$models"
import { tailwindToRGBA } from "../tailwind-colors";


export const minimalTheme = (color: string = 'sky'): ShapeInputStyle =>({
        height: 'h-8',
        fontSize: 'text-sm',
        borderRadius: 'rounded-md',
        boxShadow: 'shadow-sm',
        ringSize: '1px',

        light: {
        backgroundTransparency: '0',
        backgroundColor: color,
        backgroundTonality: '50',
        background: tailwindToRGBA(`${color}-50`),
        colorTransparency: '1',
        colorColor: color,
        colorTonality: '800',
        color: tailwindToRGBA(`${color}-800`),
        ringTransparency: '0',
        ringColor: color,
        ringTonality: '500',
        ring: tailwindToRGBA(`${color}-500`),
        event: {
          focus: {
            ringColor: color,
            ringTonality: '600',
            ringTransparency: '0.3',
            ring: tailwindToRGBA(`${color}-600`),
            ringSize: '2px'
          }
        }
      },

      dark: {
        backgroundTransparency: '0',
        backgroundColor: color,
        backgroundTonality: '900',
        background: tailwindToRGBA(`${color}-900`),
        colorTransparency: '1',
        colorColor: color,
        colorTonality: '100',
        color: tailwindToRGBA(`${color}-100`),
        ringTransparency: '0',
        ringColor: color,
        ringTonality: '300',
        ring: tailwindToRGBA(`${color}-300`),
        event: {
          focus: {
            ringColor: color,
            ringTonality: '200',
            ringTransparency: '0.5',
            ring: tailwindToRGBA(`${color}-200`),
            ringSize: '2px'
          }
        }
      }
    })