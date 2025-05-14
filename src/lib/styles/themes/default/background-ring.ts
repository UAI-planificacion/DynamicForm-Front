
import type { ThemeShape } from "$models";

export const BACKGROUND_RING = (
    isDarkMode: boolean,
    themeShape: ThemeShape
): string =>
` background-color: ${
isDarkMode
? themeShape.dark.ring
: themeShape.light.ring
};`;



