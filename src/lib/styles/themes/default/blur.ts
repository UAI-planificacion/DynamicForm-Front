import type {
    FocusEvent,
    FocusEventInput,
    FocusEventTextarea
}                           from "./type-focus.model";
import type { ThemeShape }  from "$models";


export const blur = (
    e : FocusEvent | FocusEventInput | FocusEventTextarea,
    isDarkMode: boolean,
    themeShape: ThemeShape
) => {
    e.currentTarget.style.boxShadow = `0 0 0
        ${ themeShape.ringSize} 
        ${ isDarkMode
            ? themeShape.dark.ring    
            : themeShape.light.ring   
    }`;
}