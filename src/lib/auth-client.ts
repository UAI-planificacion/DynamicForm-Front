// import { createAuthClient } from "better-auth/svelte";


// export const auth = createAuthClient({
//     baseURL: import.meta.env.VITE_BETTER_AUTH_URL as string
// });


import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient();

export const signIn = async () =>
	await authClient.signIn.social({
		provider	: "microsoft",
		callbackURL	: "/",
	});
