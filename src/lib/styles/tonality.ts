import type { ShapeOption } from "$models";


export const TONALITY: ShapeOption[] = [
    {label: '50', value: '50'},
    ...Array.from({ length: 9 }, (_, i) => {
        const value = ((i + 1) * 100).toString();
        return {
            label: value,
            value: value
        };
    })
];
