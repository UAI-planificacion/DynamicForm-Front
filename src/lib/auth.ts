import { betterAuth } from "better-auth"


export const better = betterAuth({
    socialProviders: {
        // google: { 
        //     clientId        : import.meta.env.VITE_GOOGLE_CLIENT_ID as string ,
        //     clientSecret    : import.meta.env.VITE_GOOGLE_CLIENT_SECRET as string ,
        //     redirectURI     : import.meta.env.VITE_BETTER_AUTH_URL + '/api/auth/callback/google',
        // }, 

		microsoft: { 
            clientId				: import.meta.env.VITE_AUTH_MICROSOFT_CLIENT_ID as string, 
            clientSecret			: import.meta.env.VITE_AUTH_MICROSOFT_SECRET	as string, 
			// tenantId				: import.meta.env.VITE_AUTH_MICROSOFT_TENANT_ID as string,
			// redirectURI				: import.meta.env.VITE_BETTER_AUTH_URL + '/api/auth/callback/microsoft',
			requireSelectAccount	: true
        }, 
    },
});

