export type FocusEvent = {
    currentTarget: EventTarget & HTMLButtonElement;
};


export type FocusEventInput = globalThis.FocusEvent & {
    currentTarget: EventTarget & HTMLInputElement;
};

export type FocusEventTextarea = {
    currentTarget: EventTarget & HTMLTextAreaElement;
}
