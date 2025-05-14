import type { ThemeShape } from "$models";

export const COLOR = (
    isDarkMode: boolean,
    themeShape: ThemeShape
): string =>
`color: ${
    isDarkMode
        ? themeShape.dark.color
        : themeShape.light.color
};`;