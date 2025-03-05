import { createAuthClient } from "better-auth/svelte";


export const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_ORIGIN as string
});


export const signIn     = async () => await authClient.signIn.social({ provider: "microsoft", callbackURL: "/" });
export const signOut    = async () => await authClient.signOut();
