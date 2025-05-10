import type {
    FocusEvent,
    FocusEventInput,
    FocusEventTextarea
}                           from "./type-focus.model";
import type { ThemeShape }  from "$models";


export const focus = (
    e : FocusEvent | FocusEventInput | FocusEventTextarea,
    isDarkMode: boolean,
    themeShape: ThemeShape
): void => {
    e.currentTarget.style.boxShadow = `0 0 0
    ${ isDarkMode
        ? themeShape.dark.event.focus.ringSize
        : themeShape.light.event.focus.ringSize
    } ${isDarkMode
        ? themeShape.dark.event.focus.ring
        : themeShape.light.event.focus.ring
    }`;
}
