import type { ShapeInput } from "$models";

export const stylesS = ( isDarkMode: boolean, shapeInput: ShapeInput ) =>
`background-color: ${
    isDarkMode
        ?  shapeInput.inputStyle?.dark?.background!
        : shapeInput.inputStyle?.light?.background!
}; color: ${
    isDarkMode
        ? shapeInput.inputStyle?.dark?.color!
        : shapeInput.inputStyle?.light?.color!
}; box-shadow: 0 0 0 ${shapeInput.inputStyle?.ringSize!} ${
    isDarkMode
        ? shapeInput.inputStyle?.dark?.ring!
        : shapeInput.inputStyle?.light?.ring!
};`;