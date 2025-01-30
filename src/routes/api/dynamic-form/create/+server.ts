import { error, type RequestEvent } from "@sveltejs/kit";

import { DynamicFormService }   from "$services";
import type { DynamicForm }     from "$models";

export const POST = async ({ request }: RequestEvent): Promise<Response> => {
    try {
        const dynamicForm   = new DynamicFormService();
        const body          = await request.json() as DynamicForm;

        const { _id, ...rest } = body;

        console.log('🚀 ~ file: +server.ts:11 ~ body:', rest)

        if ( !rest.name || !rest.details ) {
            throw error( 400, 'Name and details are required' );
        }

        const response = await dynamicForm.create( rest );

        return new Response( JSON.stringify({ response, status: 200 }), { 
            status  : 200,
            headers : {
                'Content-Type': 'application/json'
            }
        });
    } catch (err: unknown) {
        console.error('Error creating dynamic form:', err);
        let status = 500;
        let message = 'Internal server error';

        if (err && typeof err === 'object' && 'status' in err) {
            status = err.status as number;
        }
        if (err && typeof err === 'object' && 'message' in err) {
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
