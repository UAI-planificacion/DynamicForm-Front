
import type { ThemeShape } from "$models";

export const BACKGROUND = (
    isDarkMode: boolean,
    themeShape: ThemeShape
): string =>
` background-color: ${
isDarkMode
? themeShape.dark.background
: themeShape.light.background
};`;



