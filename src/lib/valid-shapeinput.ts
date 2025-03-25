import type { DateValue } from "@internationalized/date";

import type { Selected, ShapeInput, Time } from "$models";
import type { DateRange } from "bits-ui";


// export const errorDateRangePicker = (
//     shapeInput  : ShapeInput,
//     date?       : DateRange | undefined
// ): boolean => showErrorDateRangePicker( shapeInput, date ) === undefined;

// export function showErrorDateRangePicker(
//     shapeInput  : ShapeInput,
//     date?       : DateRange | undefined
// ): string | undefined {
//     if ( !shapeInput.required ) return undefined;

//     if ( !date )
//         return shapeInput?.msgRequired;
// }


export const errorDatePicker = (
    shapeInput  : ShapeInput,
    date?       : DateValue | DateRange | undefined
): boolean => showErrorDatePicker( shapeInput, date ) === undefined;


export function showErrorDatePicker(
    shapeInput  : ShapeInput,
    date?       : DateValue | DateRange | undefined
): string | undefined {
    if ( !shapeInput.required ) return undefined;

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
    value?      : Selected | undefined
): boolean => showErrorSelect( shapeInput, value ) === undefined;


export function showErrorSelect(
    shapeInput  : ShapeInput,
    value?      : Selected | undefined
): string | undefined {
    if ( !shapeInput.required ) return undefined;

    if ( shapeInput.required && ( !value || ( Array.isArray( value ) && value.length === 0 )))
        return shapeInput?.msgRequired;
}


export const errorTimer = (
    shapeInput  : ShapeInput,
    value?      : string | Time | undefined
): boolean => showErrorTimer( shapeInput, value ) === undefined;


export function showErrorTimer(
    shapeInput  : ShapeInput,
    value?      : string | Time | undefined
): string | undefined {
    if ( !shapeInput.required ) return undefined;

    if ( typeof value === 'string' ) {
        if ( value === undefined || value === null || value === '' )
            return shapeInput?.msgRequired;

        return;
    }

    if ( shapeInput.required && ( value === undefined || value === null || value?.hour === null || value?.minute === null ))
        return shapeInput?.msgRequired;
}


export const errorInput = (
    shapeInput  : ShapeInput,
    value?      : string | undefined
): boolean => showErrorInput( shapeInput, value ) === undefined;


export const errorTextArea = (
    shapeInput  : ShapeInput,
    value?      : Selected | undefined
): boolean => showErrorText( shapeInput, value ) === undefined;


export function showErrorInput(
    shapeInput  : ShapeInput,
    value?      : string | undefined
): string | undefined {
    const isValue = !value || value === '' || value === undefined;

    if ( shapeInput.required && isValue ) return shapeInput?.msgRequired;

    if ( shapeInput.type === 'number' ) {
        if ( !shapeInput.required && isValue ) return undefined;

        const numberValue = Number( value );
        console.log('🚀 ~ file: valid-shapeinput.ts:149 ~ numberValue:', numberValue)

        if ( shapeInput.min && numberValue < shapeInput.min )
            return shapeInput?.msgMin;

        if ( shapeInput.max && numberValue > shapeInput.max )
            return shapeInput?.msgMax;
    }
    else {
        if ( shapeInput.minLength && value && value.length < shapeInput.minLength )
            return shapeInput?.msgMinLength;

        if ( shapeInput.maxLength && value && value.length > shapeInput.maxLength )
            return shapeInput?.msgMaxLength;

        if ( value && shapeInput.pattern && !shapeInput.pattern?.match( value ))
            return shapeInput?.msgPattern;
    }

    return undefined;
}


export function showErrorText(
    shapeInput  : ShapeInput,
    value?      : Selected | undefined
): string | undefined {
    if ( !shapeInput.required ) return undefined;

    const stringValue = Array.isArray( value ) ? value.join( ', ' ) : value;

    if ( shapeInput.required && !stringValue )
        return shapeInput?.msgRequired;

    if ( shapeInput.minLength && stringValue && stringValue.length < shapeInput.minLength )
        return shapeInput?.msgMinLength;

    if ( shapeInput.maxLength && stringValue && stringValue.length > shapeInput.maxLength )
        return shapeInput?.msgMaxLength;
}
