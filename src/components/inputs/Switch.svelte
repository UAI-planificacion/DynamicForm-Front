<script lang="ts">
    export let checked = true;

</script>

<label class="relative inline-flex items-center cursor-pointer">
    <input 
        type="checkbox" 
        bind:checked
        class="sr-only peer"
    />

	<div class="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-300 peer-checked:bg-sky-500 duration-700 "></div>
</label>
