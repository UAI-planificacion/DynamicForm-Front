
import type { ThemeShape } from "$models";

export const RING = (
    isDarkMode: boolean,
    themeShape: ThemeShape
): string =>
`box-shadow: 0 0 0 ${themeShape.ringSize} ${
    isDarkMode
        ? themeShape?.dark.ring
        : themeShape?.light.ring
};`;
