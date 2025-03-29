<script lang="ts">
    export let onClick: () => void;
    export let disabled: boolean = false;
    export let styles = '';
</script>

<button
    type        = "button"
    class       = {`delay-50 transition-all rounded-lg ${ disabled ? 'opacity-50' : 'active:scale-95 hover:scale-105 hover:brightness-110' } ${styles}`}
    disabled    = { disabled }
    on:click    = {(e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
    }}
>
    <slot />
</button>
