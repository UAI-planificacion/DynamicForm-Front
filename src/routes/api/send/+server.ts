import { json } from '@sveltejs/kit';

import type { RequestHandler } 	from './$types';
import type { ShapeInput } 		from '$models';


export const POST: RequestHandler = async ({ request }) => {
	const { formValues, button } = await request.json();

	try {
        const url		= ( button.urlSend ?? '' ) + ( button.method === 'get' ? `?${new URLSearchParams( formValues ).toString()}` : '');
        const response	= await fetch( url, {
            method	: button.method ?? 'POST',
            body	: button.method !== 'get' ? JSON.stringify( formValues ) : undefined,
            headers	: {
                'Content-Type': 'application/json'
            },
        });

        const message = button?.httpList
            ?.find(( code: ShapeInput ) => code.code === response.status )
			?.message ?? `Operación código: ${response.status}`;

        return json({
			success	: response.ok,
            status	: response.status,
            message
        });
    } catch ( error ) {
		return json({
            success	: false,
            message	: button?.externalErrorMsg ?? "Error de conexión",
            status	: 500
        }, { status: 500 });
    }
}
