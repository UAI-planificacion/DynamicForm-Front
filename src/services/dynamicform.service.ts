import connectRequest   from './fetch';
import { METHOD }       from '$lib';


export class DynamicFormService {

    async getAll() {
        return connectRequest({ method: METHOD.GET });
    }


    async searchById( id: string ) {
        return connectRequest({ id, method: METHOD.GET });
    }


    async create( body: any ) {
        return connectRequest({ method: METHOD.POST, body });
    }


    async update( id: string, body: any ) {
        return connectRequest({ id, method: METHOD.PATCH, body });
    }


    async delete( id: string ) {
        return connectRequest({ id, method: METHOD.DELETE });
    }
}