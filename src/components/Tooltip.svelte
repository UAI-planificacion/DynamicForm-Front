<script lang="ts">
    import { Tooltip } from "bits-ui";

    export let value        : string | boolean | undefined;
    export let message      : string;
    export let background   : string;
    export let color        : string;
</script>   


{#if value}
    <Tooltip.Root openDelay={400}>
        <Tooltip.Trigger
            class={`${background} rounded-xl py-1 px-3 w-auto flex items-center gap-1`}
        >
            <slot />
        </Tooltip.Trigger>

        <Tooltip.Content
            transitionConfig = {{ y: 8, duration: 150 }}
            sideOffset      = { 8 }
        >
            <div class={ color }>
                <Tooltip.Arrow class="rounded-[2px] border-l border-t border-zinc-300 dark:border-zinc-400" />
            </div>

            <div
                class={`${color} border border-zinc-300 dark:border-zinc-400 flex items-center justify-center rounded-lg p-2 text-sm font-medium `}
            >
                { message }
            </div>
        </Tooltip.Content>
    </Tooltip.Root>
{/if}
