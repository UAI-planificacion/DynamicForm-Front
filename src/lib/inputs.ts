import type { ShapeOption } from "$models";


export const options: ShapeOption[] = [
    { label: 'Entrada', 		value: 'input' },
    { label: 'Verificador',     value: 'check' },
    { label: 'Seleccionable',	value: 'select' },
    { label: 'Aréa de texto', 	value: 'textarea' },
    { label: 'Fecha', 			value: 'datepicker' },
    // { label: 'Botón', 			value: 'button' },
    { label: 'Markdown', 		value: 'markdown' },
    { label: 'Tiempo', 			value: 'time' },
];


export const types: ShapeOption[] = [
    { label: 'Texto', 		value: 'text' },
    { label: 'Numérico',    value: 'number' },
    { label: 'Contraseña', 	value: 'password' },
    { label: 'Correo',	    value: 'email' },
    { label: 'URL', 	    value: 'url' },
    { label: 'Teléfono', 	value: 'tel' },
    { label: 'Buscador', 	value: 'search' },
];
