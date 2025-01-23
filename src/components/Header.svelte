<script lang="ts">
	import { Switch, ToggleTheme } 	from "$components";
	import { dynamicMode } 			from "$stores";
</script>


<header class="h-auto flex bg-slate-50 dark:bg-zinc-800 w-full py-5 px-8 justify-between items-center shadow-lg">
    <h1 class="text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent font-bold">
        Creador de formularios dinámicos
    </h1>

	<div class="flex gap-2 items-center">
		<Switch bind:checked={ $dynamicMode } />

		<ToggleTheme />
	</div>
</header>
