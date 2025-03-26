<script lang="ts">
    export let onClick: () => void;
    export let disabled: boolean = false;
    export let styles = '';
</script>


<button
    type        = "button"
    class       = {`hover:brightness-110 hover:scale-105 active:scale-95 rounded-lg disabled:opacity-50 ${styles}`}
    disabled    = { disabled }
    on:click    = {(e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
    }}
>
    <slot />
</button>
