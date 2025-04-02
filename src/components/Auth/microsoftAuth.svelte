<script lang="ts">
    import { goto } from "$app/navigation";

    import { MicrosoftIcon }                from "$icons";
    import {authClient, signIn, signOut }   from "$lib";

    export let scale = true;


    const session = authClient.useSession();


    async function sign(): Promise<void> {
        if ( $session.data ) {
            await signOut();
            goto("/");
            return;
        }

        await signIn();
    }
</script>

<button
	class   = {`w-full flex justify-center px-4 h-10 items-center gap-2 shadow-lg active:scale-95 bg-black p-3 rounded-lg transition-all duration-300 ${scale ? 'hover:scale-105' : ''}`}
    onclick = { sign }
>
	<MicrosoftIcon />

    <span class="text-zinc-100 font-semibold">
        {#if $session.data}
            Cerrar sesión
        {:else}
            Iniciar sesión
        {/if}
	</span>
</button>