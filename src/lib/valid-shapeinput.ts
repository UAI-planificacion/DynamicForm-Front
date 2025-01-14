import type { ShapeInput }  from "$models";
import type { DateValue }   from "@internationalized/date";


// type ValueError = {
//     shapeInput  : ShapeInput;
//     value?      : string | undefined;
// }


// type CheckedError = {
//     shapeInput  : ShapeInput;
//     checked?     : "indeterminate" | boolean | undefined;
// }


// type DateError = {
//     shapeInput  : ShapeInput;
//     date?       : DateValue | undefined;
// }


export const errorDatePicker = (
    shapeInput  : ShapeInput,
    date?       : DateValue | undefined
): boolean => showErrorDatePicker( shapeInput, date ) === undefined;


export function showErrorDatePicker(
    shapeInput  : ShapeInput,
    date?       : DateValue | undefined
): string | undefined {
    if ( !shapeInput.required ) return undefined

    if ( shapeInput.required && !date )
        return shapeInput?.msgRequired;
}


export const errorCheck = (
    shapeInput  : ShapeInput,
    checked?    : "indeterminate" | boolean | undefined

): boolean => showErrorCheck( shapeInput, checked ) === undefined;


export function showErrorCheck(
    shapeInput  : ShapeInput,
    checked?    : "indeterminate" | boolean | undefined
): string | undefined {
    if ( !shapeInput.required ) return undefined;

    if (
        (
            checked === false       ||
            checked === undefined   ||
            checked === 'indeterminate'
        ) &&
        shapeInput.required
    )
        return shapeInput.msgRequired;
}


export const errorSelect = (
    shapeInput  : ShapeInput,
    value?      : string | undefined
): boolean => showErrorSelect( shapeInput, value ) === undefined;


export const showErrorSelect = (
    shapeInput  : ShapeInput,
    value?      : string | undefined
): string | undefined => {
    if ( !shapeInput.required ) return undefined;

    if (( value === '' || !value ) && shapeInput.required )
        return shapeInput.msgRequired;
}


export const errorInput = (
    shapeInput  : ShapeInput,
    value?      : string | undefined
): boolean => {
    return showErrorInput( shapeInput, value ) === undefined;
}


export const errorTextArea = (
    shapeInput  : ShapeInput,
    value?      : string | undefined
): boolean => {
    return showErrorText( shapeInput, value ) === undefined;
}


export function showErrorInput(
    shapeInput  : ShapeInput,
    value?      : string | undefined
): string | undefined {
    if ( shapeInput.required && value === '' || !value )
        return shapeInput.msgRequired;

    if ( shapeInput.type  === 'number' ) {
        if ( !shapeInput.required && value === '' )
            return undefined;

        if ( !shapeInput.min ) return undefined;

        if ( Number( value ) < shapeInput.min )
            return shapeInput.msgMin;

        if ( !shapeInput.max ) return undefined;

        if ( Number( value ) > shapeInput.max )
            return shapeInput.msgMax;
    }

    return showErrorText( shapeInput, value );
}


export function showErrorText(
    shapeInput  : ShapeInput,
    value?      : string | undefined
): string | undefined {
    if ( !shapeInput.required && ( value === '' ||  !value ))
        return undefined;

    if ( shapeInput.required && ( value === '' || !value ))
        return shapeInput.msgRequired

    const length = value?.length ?? 0;

    if ( shapeInput.minLength ) {
        if ( length < shapeInput.minLength )
            return shapeInput.msgMinLength;
    }

    if ( shapeInput.maxLength ) {
        if ( length > shapeInput.maxLength )
            return shapeInput.msgMaxLength;
    }
}
