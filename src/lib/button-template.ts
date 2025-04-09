import { v4 as uuid }	from 'uuid';

import type { ShapeInput }  from "$models";


export const buttonTemplate: ShapeInput = {
    id        		    : uuid(),
    shape     		    : "button",
    name      		    : "Send",
    label     		    : "Enviar formulario",
    method    		    : undefined,
    externalErrorMsg	: "Error de conexión",
    invalidErrorMsg	    : "Formulario inválido",
    httpList 			: [
        { code: 200, message: "Operación exitosa" },
        { code: 400, message: "Algunos datos son inválidos" },
        { code: 500, message: "Ocurrió un error en el servidor" },
    ],
}
