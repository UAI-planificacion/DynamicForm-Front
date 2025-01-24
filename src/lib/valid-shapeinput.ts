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
    value?      : string | string[] | undefined
): boolean => showErrorSelect( shapeInput, value ) === undefined;


export function showErrorSelect(
    shapeInput  : ShapeInput,
    value?      : string | string[] | undefined
): string | undefined {
    if ( !shapeInput.required ) return undefined;

    if ( shapeInput.required && (!value || (Array.isArray(value) && value.length === 0)) )
        return shapeInput?.msgRequired;
}


export const errorInput = (
    shapeInput  : ShapeInput,
    value?      : string | string[] | undefined
): boolean => showErrorInput( shapeInput, value ) === undefined;


export const errorTextArea = (
    shapeInput  : ShapeInput,
    value?      : string | string[] | undefined
): boolean => showErrorText( shapeInput, value ) === undefined;


export function showErrorInput(
    shapeInput  : ShapeInput,
    value?      : string | string[] | undefined
): string | undefined {
    if ( !shapeInput.required ) return undefined;

    const stringValue = Array.isArray(value) ? value.join(', ') : value;

    if ( shapeInput.required && !stringValue )
        return shapeInput?.msgRequired;

    if ( shapeInput.type === 'number' ) {
        const numberValue = Number( stringValue );

        if ( shapeInput.min && numberValue < shapeInput.min )
            return shapeInput?.msgMin;

        if ( shapeInput.max && numberValue > shapeInput.max )
            return shapeInput?.msgMax;
    }
    else {
        if ( shapeInput.minLength && stringValue && stringValue.length < shapeInput.minLength )
            return shapeInput?.msgMinLength;

        if ( shapeInput.maxLength && stringValue && stringValue.length > shapeInput.maxLength )
            return shapeInput?.msgMaxLength;
    }
}


export function showErrorText(
    shapeInput  : ShapeInput,
    value?      : string | string[] | undefined
): string | undefined {
    if ( !shapeInput.required ) return undefined;

    const stringValue = Array.isArray(value) ? value.join(', ') : value;

    if ( shapeInput.required && !stringValue )
        return shapeInput?.msgRequired;

    if ( shapeInput.minLength && stringValue && stringValue.length < shapeInput.minLength )
        return shapeInput?.msgMinLength;

    if ( shapeInput.maxLength && stringValue && stringValue.length > shapeInput.maxLength )
        return shapeInput?.msgMaxLength;
}
