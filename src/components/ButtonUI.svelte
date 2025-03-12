<script lang="ts">
    export let onClick: () => void;
    export let disabled: boolean = false;
</script>


<button
    type        = "button"
    class       = "hover:brightness-110 hover:scale-105 shadow-md active:scale-95 rounded-lg"
    on:click    = { onClick }
    disabled    = { disabled }
>
    <slot />
</button>