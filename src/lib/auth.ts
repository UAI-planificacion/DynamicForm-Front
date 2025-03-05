import { betterAuth } from "better-auth"


export const auth = betterAuth({
    socialProviders: {
		microsoft: { 
            clientId				: import.meta.env.VITE_AUTH_MICROSOFT_CLIENT_ID as string, 
            clientSecret			: import.meta.env.VITE_AUTH_MICROSOFT_SECRET	as string, 
			tenantId				: import.meta.env.VITE_AUTH_MICROSOFT_TENANT_ID as string,
			redirectURI				: import.meta.env.VITE_ORIGIN                   as string + '/api/auth/callback/microsoft',
			requireSelectAccount    : true,
            scope                   : [ "openid", "profile", "email", "offline_access", "https://graph.microsoft.com/User.Read" ],
        }, 
    },
});
