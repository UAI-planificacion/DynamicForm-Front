import { type DateValue } from "@internationalized/date";
import type { DateRange } from "bits-ui";

export type InputStyle = {
    box?     	: string;
    content?	: string;
    item?   	: string;
    rangeItem?  : string;
	label?  	: string;
	input?  	: string;
    group?  	: string;
}


export type InputType  = 'input' | 'check' | 'timer' | 'select' | 'textarea' | 'datepicker' | 'button' | 'markdown' | 'none';
export type Types      = 'text' | 'number' | 'password' | 'email' | 'url' | 'tel' | 'search';


export type DynamicForm = {
    _id         : string;
    name        : string;
    user_email  : string;
    details     : ShapeInput[];
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
    required?       : boolean;
    msgRequired?    : string;
    valid?          : boolean;
    disabled?       : boolean;
    readonly?       : boolean;

    // Inputs || Textarea || Markdown
    value?          : string;
    pattern?        : string;
    msgPattern?     : string;
    minLength?      : number;
    maxLength?      : number;
    msgMinLength?   : string;
    msgMaxLength?   : string;

    // Input type number
    min?            : number;
    max?            : number;
    msgMin?         : string;
    msgMax?         : string;
    inputClass?     : string;

    // Textarea
    rows?           : number;
    textareaClass?  : string;

    // Markdown
    preview?        : boolean;
    boxMarkdownClass?  : string;
    inputMarkdownClass?: string;

    // Checkbox
    checked?            : boolean;
    boxCheckboxClass?      : string;
    labelCheckboxClass? : string;

    // Select
    selected?           : Selected;
    multiple?           : boolean;
    search?             : boolean;
    searchPlaceholder?  : string;
    options?            : ShapeOption[] | GroupOption[];
    heightPanel?        : number;
    boxSelectClass?     : string;
    contentSelectClass? : string;
    itemSelectClass?    : string;
    groupSelectClass?   : string;
    inputSelectClass?   : string;

    // Date
    maxValue?           : DateValue;
    minValue?           : DateValue;
    date?               : DateValue;
    dateRange?          : DateRange;
    isRange?            : boolean;
    invalidDates?       : string[];
    invalidDatesRange?  : InvalidDate;
    numberOfMonths?     : number;
    currentDate?        : boolean
    boxDateClass?       : string;
    contentDateClass?   : string;
    labelDateClass?     : string;
    itemDateClass?      : string;
    rangeDateClass?     : string;

    // Time
    time?                   : Time;
    timeValue?              : string;
    boxDigitalClass?        : string;
    contentDigitalClass?    : string;
    itemDigitalClass?       : string;
    inputDigitalClass?      : string;
    boxAnalogicClass?       : string;
    contentAnalogicClass?   : string;
    itemAnalogicClass?      : string;


    // Button
    httpList?			: Http[];
	externalErrorMsg?   : string;
	invalidErrorMsg?	: string;
    urlSend?     		: string;
	method?				: Method;
    buttonClass?        : string;
	// form? 			: Form;
}


export type WeekDay = {
    id      : string;
    checked : boolean;
}


export type InvalidDate = {
    invalidDate: DateRange;
    weekDays: WeekDay[];
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

export enum HTTPMethod {
    GET     = 'GET',
    POST    = 'POST',
    DELETE  = 'DELETE',
    PUT     = 'PUT',
    PATCH   = 'PATCH',
}

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
    name    : string;
    options : string[];
}


export type GroupOption = {
    id?     : string;
    name    : string;
    options : ShapeOption[];
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