
import type { ThemeShape } from "$models";

export const SECONDARY_COLOR_RING = (
    isDarkMode: boolean,
    themeShape: ThemeShape
): string =>
`box-shadow: 0 0 0 1px ${
    isDarkMode
        ? themeShape?.dark.secondaryColor
        : themeShape?.light.secondaryColor
};`;
