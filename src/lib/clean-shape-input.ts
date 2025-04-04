import { CalendarDate } from "@internationalized/date";

import type { DynamicForm, ShapeInput } from "$models";


export const startClean = ( dynamicForm: DynamicForm ): DynamicForm => ({
    ...dynamicForm,
    details: dynamicForm.details.map( shapeInput => {
        switch ( shapeInput.shape ) {
            case 'input'        : return cleanInput( shapeInput );
            case 'textarea'     : return cleanInput( shapeInput );
            case 'markdown'     : return cleanInput( shapeInput );
            case 'check'        : return cleanCheckbox( shapeInput );
            case 'select'       : return cleanSelect( shapeInput );
            case 'datepicker'   : return cleanDate( shapeInput );
            case 'timer'        : return cleanTime( shapeInput );
            case 'button'       : return shapeInput;
            default             : throw new Error( `Shape ${shapeInput.shape} not found` );
        }
    })
});


const basicClean = ( shapeInput: ShapeInput ) => ({
    id      : shapeInput.id,
    name    : shapeInput.name,
    shape   : shapeInput.shape,
    ...(shapeInput.label        && { label          : shapeInput.label }),
    ...(shapeInput.description  && { description    : shapeInput.description }),
    ...(shapeInput.placeholder  && { placeholder    : shapeInput.placeholder }),
    ...(shapeInput.disabled     && { disabled       : shapeInput.disabled }),
    ...(shapeInput.readonly     && { readonly       : shapeInput.readonly }),
    ...(shapeInput.required     && { required       : shapeInput.required }),
    ...(shapeInput.msgRequired  && shapeInput.required && { msgRequired: shapeInput.msgRequired }),
});


export function cleanInput( shapeInput: ShapeInput ) {
    let min             : number | undefined;
    let max             : number | undefined;
    let minLength       : number | undefined;
    let maxLength       : number | undefined;
    let msgRequired     : string | undefined;
    let msgMin          : string | undefined;
    let msgMax          : string | undefined;
    let msgMinLength    : string | undefined;
    let msgMaxLength    : string | undefined;
    let pattern         : string | undefined;
    let msgPattern      : string | undefined;
    let type            : string | undefined;

    if ( shapeInput.type === 'number' ) {
        min     = shapeInput.min;
        max     = shapeInput.max;
        msgMin  = shapeInput.msgMin;
        msgMax  = shapeInput.msgMax;
    }

    if ( shapeInput.shape === 'input' || shapeInput.shape === 'textarea' || shapeInput.shape === 'markdown' ) {
        minLength       = shapeInput.minLength;
        maxLength       = shapeInput.maxLength;
        msgMinLength    = shapeInput.msgMinLength;
        msgMaxLength    = shapeInput.msgMaxLength;
        pattern         = shapeInput.pattern;
        msgPattern      = shapeInput.msgPattern;
        msgRequired     = shapeInput.msgRequired;
    }

    if ( shapeInput.shape === 'input' ) type = shapeInput.type || 'text';

    return {
        ...basicClean( shapeInput ),
        ...( shapeInput.value && { value: shapeInput.value }),
        type,
        min,
        max,
        minLength,
        maxLength,
        pattern,
        msgRequired,
        msgMin,
        msgMax,
        msgMinLength,
        msgMaxLength,
        msgPattern,
    } as ShapeInput;
}


const cleanCheckbox = (
    shapeInput: ShapeInput
) : ShapeInput => ({
    ...basicClean( shapeInput ),
    ...( shapeInput.checked && { checked: shapeInput.checked }),
});


const cleanSelect = ( shapeInput: ShapeInput ): ShapeInput => ({
    ...basicClean( shapeInput ),
    options: shapeInput.options,
    ...( shapeInput.multiple             && { multiple           : shapeInput.multiple }),
    ...( shapeInput.search               && { search             : shapeInput.search }),
    ...( shapeInput.searchPlaceholder    && { searchPlaceholder  : shapeInput.searchPlaceholder }),
    ...( shapeInput.selected             && { selected           : shapeInput.selected }),
});


const cleanDate = ( shapeInput: ShapeInput ): ShapeInput => {
    const isRange = shapeInput.isRange ?? false;

    const dateOrRange = isRange
        ? shapeInput.dateRange  && { dateRange  : shapeInput.dateRange }
        : shapeInput.date       && { date       : shapeInput.date };

    if ( isRange && dateOrRange?.dateRange ) {
        let year    = dateOrRange.dateRange.start!.year;
        let month   = dateOrRange.dateRange.start!.month;
        let day     = dateOrRange.dateRange.start!.day;

        dateOrRange.dateRange.start = new CalendarDate( year, month, day );

        year    = dateOrRange.dateRange.end!.year;
        month   = dateOrRange.dateRange.end!.month;
        day     = dateOrRange.dateRange.end!.day;

        dateOrRange.dateRange.end = new CalendarDate( year, month, day );
    }

    const invalidDatesOrRange = isRange
        ? shapeInput.invalidDatesRange  && { invalidDatesRange  : shapeInput.invalidDatesRange }
        : shapeInput.invalidDates       && { invalidDates       : shapeInput.invalidDates };

    return {
        ...basicClean( shapeInput ),
        isRange,
        ...dateOrRange,
        ...invalidDatesOrRange,
        ...( shapeInput.minValue         && { minValue       : shapeInput.minValue }),
        ...( shapeInput.maxValue         && { maxValue       : shapeInput.maxValue }),
        ...( shapeInput.numberOfMonths   && { numberOfMonths : shapeInput.numberOfMonths }),
        ...( shapeInput.currentDate      && { currentDate    : shapeInput.currentDate }),
    }
}


const cleanTime =( shapeInput: ShapeInput ): ShapeInput => ({
    ...basicClean( shapeInput ),
    ...( shapeInput.time        && { time       : shapeInput.time }),
    ...( shapeInput.timeValue   && { timeValue  : shapeInput.timeValue }),
    ...( shapeInput.time        && { time       : shapeInput.time }),
});

