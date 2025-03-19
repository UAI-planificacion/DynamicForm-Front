import { type DateValue } from "@internationalized/date";
import type { DateRange } from "bits-ui";

export type InputStyle = {
    box?     	: string;
    content?	: string;
    item?   	: string;
	label?  	: string;
	input?  	: string;
}


export type InputType  = 'input' | 'check' | 'timer' | 'select' | 'textarea' | 'datepicker' | 'button' | 'markdown' | 'none';
export type Types      = 'text' | 'number' | 'password' | 'email' | 'url' | 'tel' | 'search';


export type DynamicForm = {
    _id      : string;
    name    : string;
    user_id : string;
    details : ShapeInput[];
}


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
    dateRange?      : DateRange;
    isRange?        : boolean;
    invalidDates?   : string[];
    minValue?       : DateValue;
    maxValue?       : DateValue;
    numberOfMonths? : number;
    currentDate?    : boolean
    required?       : boolean;
    valid?          : boolean;
    msgRequired?    : string;
    disabled?       : boolean;
    readonly?       : boolean;
    preview?        : boolean;
    multiple?       : boolean;
    search?         : boolean;
    searchPlaceholder? : string;
    heightPanel?    : number;
    pattern?        : string;
    class_?         : string;
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
    options?        : ShapeOption[] | GroupOption[];
    rows?           : number;
    checked?        : boolean;
    selected?       : Selected;
    httpList?			: Http[];
	externalErrorMsg?   : string;
	invalidErrorMsg?	: string;
    urlSend?     		: string;
	method?				: Method;
    time?               : Time;
	// form? 			: Form;
}


export type Time = {
    hourList?   : number[];
    minuteList? : number[];
    hour?       : number;
    minute?     : number;
    isAnalogic? : boolean;
}

export type Selected = string | string[] | SelectGroup[] | undefined;

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type Form = {
	httpList?			: Http[];
	externalErrorMsg?   : string;
	invalidErrorMsg?	: string;
    urlSend?     		: string;
	method?				: Method;
	inBody?				: boolean;
}


export type SelectInput = string | string[] | SelectGroup[] | undefined;


export type SelectGroup = {
    group   : string;
    values  : string[];
}


export type GroupOption = {
    id?     : string;
    group   : string;
    values  : ShapeOption[];
};


export type ShapeOption = {
    id?     : string;
    label   : string;
    value   : string;
}


export type Http = {
	code	: number;
	message	: string;
}