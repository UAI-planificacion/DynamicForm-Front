<script lang="ts">
    import { goto } from "$app/navigation";

    import { MicrosoftIcon }                from "$icons";
    import {authClient, signIn, signOut }   from "$lib";


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
	class   = "w-full flex justify-center px-4 h-10 items-center gap-2 hover:brightness-105 shadow-lg active:scale-95 bg-zinc-200 dark:bg-zinc-900 p-3 rounded-lg transition-colors"
    onclick = { sign }
>
	<MicrosoftIcon />

    <span class="dark:text-zinc-100 font-semibold">
        {#if $session.data}
            Cerrar sesión
        {:else}
            Iniciar sesión
        {/if}
	</span>
</button>