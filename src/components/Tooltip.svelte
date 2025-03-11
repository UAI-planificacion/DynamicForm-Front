<script lang="ts">
    import { Tooltip } from "bits-ui";

    export let value        : string | boolean | undefined;
    export let message      : string;
    export let background   : string;
    export let color        : string;
</script>   


{#if value}
<Tooltip.Provider>
    <Tooltip.Root delayDuration={400}>
        <Tooltip.Trigger
            class={`${background} rounded-xl py-1 px-3 w-auto flex items-center gap-1`}
        >
            <slot />
        </Tooltip.Trigger>

        <!-- transitionConfig = {{ y: 8, duration: 150 }} -->
        <Tooltip.Content
            sideOffset      = { 8 }
            class          = "z-50"
        >
            <div class={ color }>
                <Tooltip.Arrow class="rounded-[2px] border-l border-t border-zinc-300 dark:border-zinc-400" />
            </div>

            <div
                class={`${color} border border-zinc-300 dark:border-zinc-400 flex items-center justify-center rounded-lg p-2 text-sm font-medium max-w-[200px] sm:max-w-[250px] md:max-w-[300px] break-words`}
            >
                { message }
            </div>
        </Tooltip.Content>
    </Tooltip.Root>
</Tooltip.Provider>
{/if}
