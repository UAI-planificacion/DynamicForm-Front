import { error, type RequestEvent } from "@sveltejs/kit";

import { DynamicFormService, isApiError }   from "$services";
import type { DynamicForm }                 from "$models";

export const POST = async ({ request }: RequestEvent): Promise<Response> => {
    try {
        const dynamicForm   = new DynamicFormService();
        const body          = await request.json() as DynamicForm;
        const { _id, ...rest } = body;

        if ( !rest.name || !rest.details ) {
            throw error( 400, 'Name and details are required' );
        }

        const response = await dynamicForm.create( rest );
        
        if ( isApiError( response )) {
            let statusCode = 500;
            if (response.code === 'HTTP_422') {
                statusCode = 422;
            } else if (response.code.startsWith('HTTP_')) {
                const numericCode = parseInt(response.code.substring(5));
                statusCode = !isNaN(numericCode) ? numericCode : 500;
            }

            return new Response(JSON.stringify({ 
                response: {
                    message: response.message,
                    code: response.code
                },
                status: statusCode
            }), { 
                status: statusCode,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        return new Response( JSON.stringify({ response, status: 200 }), { 
            status  : 200,
            headers : {
                'Content-Type': 'application/json'
            }
        });
    } catch ( err: unknown ) {
        console.error('Error creating dynamic form:', err);
        let status  = 500;
        let message = 'Internal server error';

        if ( err && typeof err === 'object' && 'status' in err ) {
            status = err.status as number;
        }

        if ( err && typeof err === 'object' && 'message' in err ) {
            message = err.message as string;
        }

        return new Response(JSON.stringify({ 
            error: message, 
            status 
        }), { 
            status,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};
