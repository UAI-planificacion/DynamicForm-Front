import type { ThemeShape } from "$models";


export const secondaryColor = (
    isDarkMode: boolean,
    themeShape: ThemeShape
): string =>
`background-color: ${
    isDarkMode
        ? themeShape.dark.secondaryBackground
        : themeShape.light.secondaryBackground
}; color: ${
    isDarkMode
        ? themeShape?.dark.secondaryColor
        : themeShape?.light.secondaryColor
};`;
