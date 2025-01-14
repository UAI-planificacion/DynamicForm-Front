<script lang="ts">
    export let number: number;
    export let active = false;
</script>


<span class={`bg-zinc-200 text-center flex items-center rounded px-1.5 text-sm ${active ? 'text-amber-500' : 'text-zinc-500'} font-semibold`}>
    {number}
</span>
