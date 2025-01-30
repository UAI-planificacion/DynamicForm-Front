import { error, type RequestEvent } from "@sveltejs/kit";
import { DynamicFormService } from "$services";

export const PUT = async ({ params, request }: RequestEvent): Promise<Response> => {
    try {
        const { id } = params;

        if (!id) throw error(400, 'ID is required');
    
        const body = await request.json();

        if ( !body ) throw error( 400, 'Request body is required' );

        const dynamicForm = new DynamicFormService();

        const response = await dynamicForm.update( id, body );
        const newBody = JSON.stringify({ response, status: 200 });

        return new Response( newBody, { status: 200 });
    } catch (err: unknown) {
        console.error('Error updating dynamic form:', err);
        const status = err instanceof Error && 'status' in err ? (err as { status: number }).status : 500;
        const message = err instanceof Error ? err.message : 'Internal server error';

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