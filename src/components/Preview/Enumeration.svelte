<script lang="ts">
    export let number: number;
    export let active = false;
</script>


<span class={`bg-zinc-200 dark:bg-zinc-800 text-center flex items-center rounded px-1.5 text-sm ${active ? 'text-amber-500' : 'text-zinc-500 dark:text-zinc-300'} font-semibold`}>
    {number}
</span>
