import type { ShapeOption } from "$models";

export const BASIC_SIZE: ShapeOption[] = [
    { label: "Pequeño", value: "sm" },
    { label: "Mediano", value: "md" },
    { label: "Grande", value: "lg" },
    { label: "Extra Grande", value: "xl" },
];


export const SIZE: ShapeOption[] = [
    { label: "Ninguno", value: "none" },
    ...BASIC_SIZE,
    { label: "Al Máximo", value: "full" },
];


export const SHADOW: ShapeOption[] = [ ...BASIC_SIZE ];