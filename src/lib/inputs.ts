import type { ShapeOptions } from "$models";


export const options: ShapeOptions[] = [
    { label: 'Entrada', 		value: 'input' },
    { label: 'Buscador', 		value: 'combobox' },
    { label: 'Verificar', 		value: 'check' },
    { label: 'Seleccionable',	value: 'select' },
    { label: 'Aréa de texto', 	value: 'textarea' },
    { label: 'Fecha', 			value: 'datepicker' },
    { label: 'Botón', 			value: 'button' },
];


export const types: ShapeOptions[] = [
    { label: 'Texto', 		value: 'text' },
    { label: 'Número', 		value: 'number' },
    { label: 'Contraseña', 	value: 'password' },
    { label: 'Correo',	    value: 'email' },
    { label: 'URL', 	    value: 'url' },
    { label: 'Teléfono', 	value: 'tel' },
    { label: 'Buscador', 	value: 'search' },
];
