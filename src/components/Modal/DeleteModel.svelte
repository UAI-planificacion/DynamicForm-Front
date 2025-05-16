<script lang="ts">
    import {
        Dialog,
        Label,
        Separator
    }                   from "bits-ui";
    import { Trash2 }   from 'lucide-svelte';

    import {
        LoadIcon,
        CloseIcon
    }                   from '$icons';
    import { Input }    from "$components";

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
        class="h-9 w-full md:w-36 bg-red-500 dark:bg-red-700 transition-colors text-white py-2 px-4 rounded flex items-center gap-2 justify-center active:scale-[0.99] active:brightness-90 hover:brightness-105 dark:hover:brightness-110 shadow-md active:bg-amber-600 dark:active:bg-amber-800"
    >
        <Trash2 class="w-5 h-5" />

        {#if isLoading }
            <LoadIcon />
        {:else }
            <span class="hidden md:block">
                Eliminar
            </span>
        {/if}
    </Dialog.Trigger>

    <Dialog.Portal>
        <Dialog.Overlay class="fixed inset-0 z-50 bg-black/60"/>

        <Dialog.Content
            class="animate-slide-up transition-all fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] text-zinc-900 dark:text-white translate-x-[-50%] translate-y-[-50%] rounded-lg border dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 shadow-lg outline-none sm:max-w-[490px] md:w-full"
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
                <Label.Root for="apiKey" class="text-sm font-medium flex flex-wrap items-center gap-1">
                    Escribe
                    <div class="relative group">
                        <span class="mt-1.5 bg-red-500/40 dark:bg-red-700/40 rounded-lg py-0.5 px-2 text-red-500 dark:text-red-300 max-w-[280px] inline-block truncate">
                            { formName }
                        </span>
                        {#if formName.length > 25}
                            <div class="absolute left-1/2 -translate-x-1/2 bottom-full mt-1.5 hidden group-hover:block bg-zinc-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                                { formName }
                            </div>
                        {/if}
                    </div>
                    para confirmar
                </Label.Root>

                <div class="relative w-full mt-1">
                    <Input 
                        shapeInput = {{
                            name:"delete",
                            id:"delete",
                            placeholder:"Ingrese la palabra de confirmación",
                            type:"text"
                        }}
                        onKeyup={ handleKeydown }
                        value={ textDelete }
                        onInput={ ( value: string ) => { textDelete = value; }}
                    />
                </div>
            </div>

            <div class="flex w-full justify-end gap-2">
                <Dialog.Close
                    class="inline-flex border border-zinc-400 dark:border-zinc-700 py-2 px-4 rounded-lg h-10 items-center justify-center rounded-input text-[15px] font-semibold text-zinc-800 dark:text-white shadow-mini hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95 "
                >
                    Cancelar
                </Dialog.Close>

                <Dialog.Close
                    disabled    = { formName !== textDelete }
                    class       = "disabled:opacity-50 disabled:brightness-100 disabled:scale-100 disabled:cursor-not-allowed inline-flex bg-red-500 py-2 px-4 rounded-lg h-10 items-center justify-center rounded-input text-[15px] font-semibold text-white shadow-mini hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95 "
                    onclick    = { onConfirm }
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