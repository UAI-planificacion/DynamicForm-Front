import
    connectRequest,
    { isApiError, type ApiError }  from './fetch';
import { METHOD }   from '$lib';


export class DynamicFormService {

    async getAll() {
        return connectRequest({ method: METHOD.GET });
    }


    async searchById( id: string ) {
        return connectRequest({ id, method: METHOD.GET });
    }


    async create( body: object ) {
        return connectRequest({ method: METHOD.POST, body });
    }


    async update( id: string, body: object ) {
        return connectRequest({ id, method: METHOD.PUT, body });
    }


    async delete( id: string ): Promise<boolean> {
        const response = await connectRequest<boolean | ApiError>({ id, method: METHOD.DELETE });

        return isApiError( response ) ? false : true;
    }
}