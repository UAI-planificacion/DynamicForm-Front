<script lang="ts">
	import { MicrosoftIcon }    from "$icons";
    import { signIn }           from "$lib";
</script>


<button
	class       = "flex items-center gap-2 hover:brightness-105 shadow-lg active:scale-95 bg-zinc-200 dark:bg-zinc-900 p-3 rounded-lg transition-colors"
    on:click    = { async () => await signIn() }
>
	<MicrosoftIcon />

    <span class="dark:text-zinc-100 font-semibold">
		Iniciar sesión
	</span>
</button>
