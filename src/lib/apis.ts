export const ROUTER = {

    DYNAMIC_FORM: {
        GET_ALL         : '/api/dynamic-form/get-all',
        SEARCH_BY_ID    : ( id: string ) => `/api/dynamic-form/get-by-id/${ id }`,
        CREATE          : '/api/dynamic-form/create',
        UPDATE          : ( id: string ) => `/api/dynamic-form/update/${ id }`,
        DELETE          : ( id: string ) => `/api/dynamic-form/delete/${ id }`,
    }

}