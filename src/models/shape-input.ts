import { type DateValue } from "@internationalized/date";

export type InputStyle = {
    box?     	: string;
    content?	: string;
    item?   	: string;
	label?  	: string;
	input?  	: string;
}


export type InputType  = 'input' | 'combobox' | 'check' | 'select' | 'textarea' | 'datepicker' | 'button' | 'markdown' | 'none';
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
    preview?        : boolean;
    multiple?       : boolean;
    pattern?        : string;
    class?          : string;
	labelStyle? 	: string;
	contentStyle? 	: string;
	itemStyle? 		: string;
	inputStyle? 	: string;
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
    selected?       : string | string[] | undefined;
    httpList?			: Http[];
	externalErrorMsg?   : string;
	invalidErrorMsg?	: string;
    urlSend?     		: string;
	method?				: Method;
	// form? 			: Form;
}


export type Method = 'get' | 'post' | 'put' | 'delete';

export type Form = {
	httpList?			: Http[];
	externalErrorMsg?   : string;
	invalidErrorMsg?	: string;
    urlSend?     		: string;
	method?				: Method;
	inBody?				: boolean;
}


export type ShapeOptions = {
    id?     : string;
    label   : string;
    value   : string;
}


export type Http = {
	code	: number;
	message	: string;
}