// Type definitions
export interface RGBA {
    r: number;
    g: number;
    b: number;
    a: number;
  }
  
  export interface HSV {
    h: number;
    s: number;
    v: number;
  }
  
  /**
   * Converts an RGBA object to a CSS rgba() string
   */
  export function rgbaToString(rgba: RGBA): string {
    return `rgba(${Math.round(rgba.r)}, ${Math.round(rgba.g)}, ${Math.round(rgba.b)}, ${rgba.a.toFixed(2)})`;
  }
  
  /**
   * Parses a CSS rgba() string to an RGBA object
   */
  export function stringToRgba(colorString: string): RGBA {
    // Default to red if the string is invalid
    const defaultRgba: RGBA = { r: 255, g: 0, b: 0, a: 1 };
    
    if (!colorString) return defaultRgba;
    
    // Regular expression to match rgba format
    const rgbaRegex = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*(?:\.\d+)?))?\)/;
    const match = colorString.match(rgbaRegex);
    
    if (!match) return defaultRgba;
    
    return {
      r: parseInt(match[1], 10),
      g: parseInt(match[2], 10),
      b: parseInt(match[3], 10),
      a: match[4] ? parseFloat(match[4]) : 1
    };
  }
  
  /**
   * Converts HSV color values to RGB
   */
  export function hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
    h = ((h % 360) + 360) % 360; // Normalize hue to [0, 360)
    s = Math.max(0, Math.min(1, s)); // Clamp s and v to [0, 1]
    v = Math.max(0, Math.min(1, v));
    
    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;
    
    let r = 0, g = 0, b = 0;
    
    if (h >= 0 && h < 60) {
      r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c;
    } else {
      r = c; g = 0; b = x;
    }
    
    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  }
  
  /**
   * Converts RGB color values to HSV
   */
  export function rgbToHsv(r: number, g: number, b: number): HSV {
    // Normalize RGB values to [0, 1]
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    
    let h = 0;
    const s = max === 0 ? 0 : delta / max;
    const v = max;
    
    if (delta === 0) {
      h = 0; // Achromatic (gray)
    } else {
      if (max === r) {
        h = ((g - b) / delta) % 6;
      } else if (max === g) {
        h = (b - r) / delta + 2;
      } else {
        h = (r - g) / delta + 4;
      }
      
      h = Math.round(h * 60);
      if (h < 0) h += 360;
    }
    
    return { h, s, v };
  }