import type { METHOD } from '$lib';

const URL = import.meta.env.VITE_API_DYNAMICFORM as string;


type Connect = {
    method  : METHOD;
    body?   : object;
    id?     : string;
}


export type ApiError = {
    message : string;
    code    : string;
}


export const isApiError = ( error: any ): error is ApiError => 
    typeof error === 'object' && error !== null && 'message' in error && 'code' in error;


export default async function connectRequest<T>(
    { method, body, id }: Connect
): Promise<T | ApiError> {
    try {
        const url       = `${URL}/${id ?? ''}`;
        const response  = await fetch(
            url
        , {
            method,
            body    : JSON.stringify( body ),
            cache   : "no-cache",
            headers : {
                'Content-Type' : 'application/json',
                Accept         : 'application/json',
            }
        });

        if ( !response.ok ) {
            const errorData = await response.json();

            throw {
                message : errorData.message || 'Request failed',
                code    : `HTTP_${response.status}`,
            } as ApiError;
        }

        if ( response.status === 204 ) return Promise.resolve( true as T );

        return await response.json() as T;
    } catch ( error: any ) {
        console.log('🚀 ~ file: fetch.ts:53 ~ error:', error)

        return {
            message : error.message || 'An unknown error occurred',
            code    : error.code    || 'NETWORK_ERROR',
        } as ApiError;
    }

}
