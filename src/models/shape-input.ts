import { type DateValue } from "@internationalized/date";


export type InputType  = 'input' | 'combobox' | 'check' | 'select' | 'textarea' | 'datepicker' | 'button' | 'none';
export type Types      = 'text' | 'number' | 'password' | 'email' | 'url' | 'tel' | 'search';
export type ShapeInput = {
    [key: string]   : unknown;
    id              : string;
    name            : string;
    shape?          : InputType;
    label?          : string;
    description?    : string;
    type?           : Types;
    placeholder?    : string;
    value?          : string;
    date?           : DateValue;
    minValue?       : DateValue;
    maxValue?       : DateValue;
    currentDate?    : boolean
    required?       : boolean;
    valid?          : boolean;
    msgRequired?    : string;
    disabled?       : boolean;
    readonly?       : boolean;
    multiple?       : false;
    pattern?        : string;
    class?          : string;
    min?            : number;
    max?            : number;
    minLength?      : number;
    maxLength?      : number;
    msgMin?         : string;
    msgMax?         : string;
    msgMinLength?   : string;
    msgMaxLength?   : string;
    options?        : ShapeOptions[];
    rows?           : number;
    checked?        : boolean;
    selected?       : boolean;
    apiUrlSend?     : string;
}


export type ShapeOptions = {
    id?     : string;
    label   : string;
    value   : string;
}
