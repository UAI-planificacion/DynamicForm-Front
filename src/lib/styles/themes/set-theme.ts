import type { ShapeInputStyle } from "$models";
import { casualTheme } from "./casual-theme";
import { elegantTheme } from "./elegant-theme";
import { markedTheme } from "./marked-theme";
import { minimalTheme } from "./minimal-theme";
import { neutralTheme } from "./neutro-theme";
import { UAITheme } from "./uai-theme";

export const setTheme = ( theme: string ): ShapeInputStyle => ({
    uai     : UAITheme(),
    elegant : elegantTheme(),
    casual  : casualTheme(),
    marked  : markedTheme(),
    neutral : neutralTheme(),
    minimal : minimalTheme()
}[theme]) || UAITheme();
