
import type { ThemeShape } from "$models";

export const RING = (
    isDarkMode: boolean,
    themeShape: ThemeShape
): string =>
`box-shadow: 0 0 0 4px ${
    isDarkMode
        ? themeShape?.dark.ring
        : themeShape?.light.ring
};`;



