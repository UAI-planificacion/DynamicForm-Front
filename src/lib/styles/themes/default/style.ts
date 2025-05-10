import type { ThemeShape } from "$models";


export const style = (
    isDarkMode: boolean,
    themeShape: ThemeShape
): string =>
`background-color: ${
    isDarkMode
        ? themeShape.dark.background
        : themeShape.light.background
}; color: ${
    isDarkMode
        ? themeShape?.dark.color
        : themeShape?.light.color
}; box-shadow: 0 0 0 ${ themeShape?.ringSize } ${
    isDarkMode
        ? themeShape?.dark.ring
        : themeShape?.light.ring
};`;
