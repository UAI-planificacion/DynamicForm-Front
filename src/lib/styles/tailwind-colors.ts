import colors from 'tailwindcss/colors';

type TailwindColorName = keyof typeof colors;
type TailwindShade = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export function tailwindToRGBA(tailwindClass: string): string {
    if ( tailwindClass === 'white' ) return 'rgba(255, 255, 255, 1)';
    const match = tailwindClass.match(/(\w+)-(\d+)(?:\/(\d+))?/);
    if (!match) return 'rgba(0, 0, 0, 1)';

    const [_, color, shade, opacity] = match;

    if (
        !isTailwindColorName(color) ||
        !isTailwindShade(shade) ||
        !colors[color][shade]
    ) {
        return 'rgba(0, 0, 0, 1)';
    }

    const hex = colors[color][shade];
    const alpha = opacity ? parseInt(opacity) / 100 : 1;
    const [r, g, b] = hex.match(/\w\w/g)!.map(x => parseInt(x, 16));

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function isTailwindColorName(value: string): value is TailwindColorName {
    return value in colors;
}

function isTailwindShade(value: string): value is TailwindShade {
    const shades: TailwindShade[] = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
    return shades.includes(value as TailwindShade);
}