export type ShapeInput = {
    [key: string]   : unknown;
    id              : string;
    name?           : string;
    description?    : string;
    type?           : string;
    placeholder?    : string;
    value?          : string;
    required?       : boolean;
    disabled?       : boolean;
    readonly?       : boolean;
    hidden?         : boolean;
    min?            : number;
    max?            : number;
    step?           : number;
    pattern?        : string;
    minLength?      : number;
    maxLength?      : number;
    options?        : ShapeOptions[];
    multiple?       : boolean;
    accept?         : string;
    rows?           : number;
    cols?           : number;
    checked?        : boolean;
    selected?       : boolean;
    src?            : string;
    alt?            : string;
    width?          : number;
    height?         : number;
    color?          : string;
    size?           : number;
    label?          : string;
    icon?           : string;
    iconColor?      : string;
    iconSize?       : number;
    apiUrlSend?     : string;
}


export type ShapeOptions = {
    label   : string;
    value   : string;
}
