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
    required?       : boolean;
    disabled?       : boolean;
    readonly?       : boolean;
    pattern?        : string;
    class?          : string;
    min?            : number;
    max?            : number;
    minLength?      : number;
    maxLength?      : number;
    options?        : ShapeOptions[];
    rows?           : number;
    checked?        : boolean;
    selected?       : boolean;
    apiUrlSend?     : string;
}


export type ShapeOptions = {
    label   : string;
    value   : string;
}
