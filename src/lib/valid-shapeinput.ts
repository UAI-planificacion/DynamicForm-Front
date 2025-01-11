import type { ShapeInput }  from "$models";
import type { DateValue }   from "@internationalized/date";


type ErrorShape = {
    shapeInput  : ShapeInput;
    value?       : string            | undefined;
    checked?     : "indeterminate"   | boolean | undefined  ;
    date?        : DateValue         | undefined;
}


export const getIsError = ( errorShape: ErrorShape ): boolean => {
    //! TODO: Quitar esto cuando todos estén validados
    const error = showErrorMessages( errorShape );
    const vli   = showErrorMessages( errorShape ) === '';
    console.log("🚀 ~ vli:", error, vli, errorShape )
    return vli;
} 


export function showErrorMessages( errorShape: ErrorShape ): string | undefined {
    if (
        errorShape.shapeInput.shape    === 'check'  &&
        errorShape.checked             === false    &&
        errorShape.shapeInput.required
    ) return errorShape.shapeInput.msgRequired;

    if (
        errorShape.shapeInput.shape === 'datepicker'    &&
        errorShape.shapeInput.required                  &&
        !errorShape.date
    ) return errorShape.shapeInput?.msgRequired;

    if (
        errorShape.shapeInput.shape === 'select'    ||
        errorShape.shapeInput.shape === 'combobox'  &&
        ( errorShape.shapeInput.required            &&
        errorShape.value === ''                     ||
        !errorShape.value )
    ) return errorShape.shapeInput.msgRequired;

    if (
        errorShape.shapeInput.shape === 'input'     ||
        errorShape.shapeInput.shape === 'textarea'
    ) {

        if ( errorShape.shapeInput.required && errorShape.value === '' ) {
            return errorShape.shapeInput.msgRequired;
        }

        if (
            errorShape.shapeInput.type  === 'number' &&
            errorShape.shapeInput.shape === 'input'
        ) {
            if ( !errorShape.shapeInput.required && errorShape.value === '' )
                return '';

            if ( !errorShape.shapeInput.min ) return '';

            if ( Number( errorShape.value ) < errorShape.shapeInput.min )
                return errorShape.shapeInput.msgMin;

            if ( !errorShape.shapeInput.max ) return '';

            if ( Number( errorShape.value ) > errorShape.shapeInput.max )
                return errorShape.shapeInput.msgMax;
        }
        else {
            const length = errorShape.value?.length ?? 0;

            if ( !errorShape.shapeInput.required && errorShape.value === '' )
                return '';

            if ( !errorShape.shapeInput.minLength ) return '';

            if ( length < errorShape.shapeInput.minLength )
                return errorShape.shapeInput.msgMinLength;

            if ( !errorShape.shapeInput.maxLength ) return '';

            if ( length > errorShape.shapeInput.maxLength )
                return errorShape.shapeInput.msgMaxLength;
        }
    }

    return '';
}
