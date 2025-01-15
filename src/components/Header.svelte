<script lang="ts">
    import ToggleTheme from "./ToggleTheme.svelte";
</script>

<header class="h-auto flex bg-slate-50 dark:bg-zinc-800 w-full py-5 px-8 justify-between items-center shadow-lg">
    <h1 class="text-3xl bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent font-bold">
        Creador de formularios dinámicos
    </h1>

    <ToggleTheme />
</header>
