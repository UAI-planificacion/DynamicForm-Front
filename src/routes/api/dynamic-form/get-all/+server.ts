import { DynamicFormService } from "$services";


export const GET = async (): Promise<Response> => {
    const dynamicForm   = new DynamicFormService();
    const response      = await dynamicForm.getAll();
    const body          = JSON.stringify({ response, status: 200 });

    return new Response( body, { status: 200 });
};
