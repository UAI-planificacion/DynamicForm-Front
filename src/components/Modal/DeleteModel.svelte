<script lang="ts">
    import { fade, fly } from 'svelte/transition';

    import {
        Dialog,
        Label,
        Separator
    }               from "bits-ui";
    import {
        LoadIcon,
        SaveIcon,
        CloseIcon
    }               from '$icons';

    export let onConfirm : VoidFunction;
    export let formName  : string;
    export let isLoading : boolean;

    let textDelete = '';

    function handleKeydown( e : KeyboardEvent ) {
        if ( e.key === 'Enter' && textDelete === formName )
            onConfirm();
    }
</script>

<Dialog.Root>
    <Dialog.Trigger
        class="h-10 sm:h-9 w-20 md:w-36 bg-red-500 dark:bg-red-700 transition-colors text-white py-2 px-4 rounded flex items-center gap-2 justify-center active:scale-[0.99] active:brightness-90 hover:brightness-105 dark:hover:brightness-110 shadow-md active:bg-amber-600 dark:active:bg-amber-800"
    >
        <SaveIcon />

        {#if isLoading }
            <LoadIcon />
        {:else }
            <span class="hidden md:block">
                Eliminar
            </span>
        {/if}
    </Dialog.Trigger>

    <Dialog.Portal>
        <Dialog.Overlay
            transition={fade}
            transitionConfig={{ duration: 150 }}
            class="fixed inset-0 z-50 bg-black/60"
        />
        <Dialog.Content
            transition={fly}
            class="fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] text-zinc-900 dark:text-white translate-x-[-50%] translate-y-[-50%] rounded-lg border dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 shadow-lg outline-none sm:max-w-[490px] md:w-full"
        >
            <Dialog.Title
                class="flex w-full items-center justify-center text-lg font-semibold tracking-tight"
            >
                Eliminar plantilla de formulario
            </Dialog.Title>

            <Separator.Root class="-mx-5 mb-6 mt-5 block h-px bg-muted" />

            <Dialog.Description class="text-sm text-zinc-500 dark:text-zinc-300 font-semibold">
                Esta plantilla de formulario será eliminada de forma permanente, ¿Estas seguro que deseas continuar?
            </Dialog.Description>

            <div class="flex flex-col items-start gap-1 pb-5 pt-5">
                <Label.Root for="apiKey" class="text-sm font-medium flex items-center gap-1">
                    Escribe
                    <span class="bg-red-500/40 dark:bg-red-700/40 rounded-lg py-0.5 px-2 text-red-500 dark:text-red-300">
                        { formName }
                    </span>
                    para confirmar
                </Label.Root>

                <div class="relative w-full mt-1">
                    <input
                        bind:value={ textDelete }
                        id              = "delete"
                        class           = "inline-flex h-input w-full items-center rounded-lg bg-transparent px-4 text-sm placeholder:text-foreground-alt/50 hover:border-dark-40 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:ring-offset-1 focus:ring-offset-background"
                        placeholder     = "Ingrese la palabra de confirmación"
                        type            = "text"
                        autocomplete    = "off"
                        on:keydown      = { handleKeydown }
                    />
                </div>
            </div>

            <div class="flex w-full justify-end gap-2">
                <Dialog.Close
                    class="inline-flex border border-zinc-400 dark:border-zinc-700 py-2 px-4 rounded-lg h-10 items-center justify-center rounded-input text-[15px] font-semibold text-background shadow-mini hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95 "
                >
                    Cancelar
                </Dialog.Close>

                <Dialog.Close
                    disabled    = { formName !== textDelete }
                    class       = "dark:disabled:bg-red-950 disabled:brightness-100 disabled:scale-100 disabled:cursor-not-allowed inline-flex bg-red-500/80 py-2 px-4 rounded-lg dark:bg-red-800 h-10 items-center justify-center rounded-input text-[15px] font-semibold text-background shadow-mini hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95 "
                    on:click    = { onConfirm }
                >
                    Confirmar
                </Dialog.Close>
            </div>

            <Dialog.Close
                class="absolute right-5 top-5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
            >
                <div>
                    <CloseIcon />

                    <span class="sr-only text-white">Cerrar</span>
                </div>
            </Dialog.Close>
        </Dialog.Content>
    </Dialog.Portal>
</Dialog.Root>