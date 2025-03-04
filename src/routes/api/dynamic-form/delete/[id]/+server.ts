import { error, type RequestEvent } from "@sveltejs/kit";

import { DynamicFormService } from "$services";


export const DELETE = async ({ params }: RequestEvent): Promise<Response> => {
    try {
        const { id } = params;

        if ( !id ) throw error( 400, 'ID is required' );

        const dynamicForm   = new DynamicFormService();
        const response      = await dynamicForm.delete( id );

        if ( !response ) {
            return new Response( JSON.stringify({ 
                error: "Dynamic form not found",
                status: 404
            }), { 
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        return new Response( null, { 
            status  : 204,
            headers : {
                'Content-Type': 'application/json'
            }
        });
    } catch ( err: unknown ) {
        console.error('Error deleting dynamic form:', err);

        const status    = err instanceof Error && 'status' in err ? (err as { status: number }).status : 500;
        const message   = err instanceof Error ? err.message : 'Internal server error';

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