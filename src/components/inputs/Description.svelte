<script lang="ts">
    export let text: string | undefined;
</script>

{#if text}
    <p class="text-sm text-gray-500">
        {text}
    </p>
{/if}
