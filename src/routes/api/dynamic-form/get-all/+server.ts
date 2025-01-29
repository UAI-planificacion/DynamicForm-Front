import { DynamicFormService } from "$services";


export const GET = async (): Promise<Response> => {
    const dynamicForm   = new DynamicFormService();
    const response      = await dynamicForm.getAll();
    console.log('🚀 ~ file: +server.ts:7 ~ response:', response)
    const body          = JSON.stringify({ response, status: 200 });

    return new Response( body, { status: 200 });
};
