import type { ShapeOption } from "$models";


export const TONALITY: ShapeOption[] = Array.from({ length: 9 }, (_, i) => {
    const value = ((i + 1) * 100).toString();
    return {
        label: value,
        value: value
    };
});