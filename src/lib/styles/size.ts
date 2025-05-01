import type { ShapeOption } from "$models";

export const BASIC_SIZE = ( prefix: string ) : ShapeOption[] => [
    { label: "Pequeño",     value: `${prefix}-sm` },
    { label: "Mediano",     value: `${prefix}-md` },
    { label: "Grande",      value: `${prefix}-lg` },
    { label: "Extra Grande", value: `${prefix}-xl` },
];


export const SIZE = ( prefix: string ) : ShapeOption[] => [
    { label: "Ninguno", value: "none" },
    ...BASIC_SIZE(prefix),
    { label: "Al Máximo", value: `${prefix}-full` },
];


export const SHADOW: ShapeOption[] = [ ...BASIC_SIZE('shadow') ];