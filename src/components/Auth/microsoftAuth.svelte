<script lang="ts">
	import {MicrosoftIcon } from "$icons";
    import { signIn }     	from "$lib";
</script>


<button
	class="flex items-center gap-2 hover:brightness-105 shadow-md active:scale-95 bg-blue-500 dark:bg-blue-800 p-3 rounded-lg"
    on:click    = { async () => await signIn()}
>
	<MicrosoftIcon />
	<span class="dark:text-zinc-100 font-semibold">
			Iniciar sesión
		</span>
</button>
