<script lang="ts">
    import { Separator } from "bits-ui";

    import {
        DeleteIcon,
        EditIcon,
        FlagIcon,
        AsterikIcon,
        ButtonIcon,
        CheckInputIcon,
        TextareaIcon,
        InputIcon,
        ComboboxIcon,
        SelectIcon,
        DateIcon,
        NameIcon,
        PlaceholderIcon,
        NumberIcon,
        TextIcon,
        SearchIcon,
        TelIcon,
        UrlIcon,
        EmailIcon,
        PasswordIcon,
        DisabledIcon,
        InterrogationIcon,
        MarkdownIcon
    }                           from "$icons";
    import type { ShapeInput }  from "$models";
    import { Tooltip }          from "$components";


    export let shapeInput       : ShapeInput;
    export let onDelete         : VoidFunction;
    export let onEdit           : VoidFunction;
    export let inputActive      : VoidFunction;


    const inputES = ( name: string | undefined ) => ({
        'input'         : 'Entrada',
        'combobox'      : 'Buscador',
        'select'        : 'Seleccionable',
        'check'         : 'Verificable',
        'textarea'      : 'Caja de texto',
        'datepicker'    : 'Fecha',
        'button'        : 'Botón',
        'markdown'      : 'Markdown',
    }[name || ''] || 'Entrada no reconocida' );
</script>


<header class="flex flex-wrap sm:flex-nowrap justify-between items-center gap-2">
    <div class="w-full sm:w-auto grid grid-cols-1 sm:flex sm:flex-nowrap items-start sm:items-center gap-2">
        <div class="flex items-center gap-2">
            <Tooltip
                value       = { shapeInput.shape }
                message     = "Tipo de entrada" 
                background  = "bg-amber-300"
                color       = "bg-zinc-200 text-zinc-800 dark:bg-zinc-500 dark:text-zinc-200"
            >
                {#if shapeInput.shape === 'button'}
                    <ButtonIcon />
                {:else if shapeInput.shape === 'check'}
                    <CheckInputIcon />
                {:else if shapeInput.shape === 'textarea'}
                    <TextareaIcon />
                {:else if shapeInput.shape === 'combobox'}
                    <ComboboxIcon />
                {:else if shapeInput.shape === 'select'}
                    <SelectIcon />
                {:else if shapeInput.shape === 'datepicker'}
                    <DateIcon />
                {:else if shapeInput.shape === 'input'}
                    <InputIcon />
                {:else if shapeInput.shape === 'markdown'}
                    <MarkdownIcon />
                {:else}
                    <InterrogationIcon />
                {/if}

                <span class="text-zinc-800 font-semibold">
                    { inputES( shapeInput.shape )}
                </span>
            </Tooltip>
        </div>

        <div class="flex items-center gap-2">
            <Tooltip
                value       = { shapeInput.name }
                message     = "Nombre" 
                background  = "bg-green-300"
                color       = "bg-zinc-200 text-zinc-800 dark:bg-zinc-500 dark:text-zinc-200"
            >
                <NameIcon />
                { shapeInput.name }
            </Tooltip>
        </div>
    </div>

    <div class="flex gap-3 items-center">
        <button
            class       = "justify-center hover:brightness-105 shadow-md active:scale-95"
            on:click    = {() => { onEdit(); inputActive(); }}
        >
            <EditIcon />
        </button>

		{#if shapeInput.shape !== 'button'}
			<button
				class       = "justify-center hover:brightness-105 shadow-md active:scale-95"
				on:click    = { onDelete }
			>
				<DeleteIcon />
			</button>
		{/if}
    </div>
</header>

<Separator.Root
    class="my-2 shrink-0 bg-zinc-300 dark:bg-zinc-700 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]"
/>

<div class="flex flex-wrap items-center gap-2 text-sm">
    <Tooltip
        value       = { shapeInput.label }
        message     = "Etiqueta" 
        background  = "bg-sky-300"
        color       = "bg-zinc-200 text-zinc-800 dark:bg-zinc-500 dark:text-zinc-200"
    >
        <FlagIcon />
        { shapeInput.label }
    </Tooltip>

    <Tooltip
        value       = { shapeInput.placeholder }
        message     = "Placeholder" 
        background  = "bg-cyan-300"
        color       = "bg-zinc-200 text-zinc-800 dark:bg-zinc-500 dark:text-zinc-200"

    >
        <PlaceholderIcon />
        { shapeInput.placeholder }
    </Tooltip>

    <Tooltip
        value       = { shapeInput.shape === 'input' }
        message     = "Tipo de entrada de texto" 
        background  = "bg-indigo-300"
        color       = "bg-zinc-200 text-zinc-800 dark:bg-zinc-500 dark:text-zinc-200"
    >
        {#if shapeInput.type === 'number'}
            <NumberIcon />
            Númerico
        {:else if shapeInput.type === 'password'}
            <PasswordIcon />
            Contraseña
        {:else if shapeInput.type === 'email'}
            <EmailIcon />
            Correo
        {:else if shapeInput.type === 'url'}
            <UrlIcon />
            Url
        {:else if shapeInput.type === 'tel'}
            <TelIcon />
            Teléfono
        {:else if shapeInput.type === 'search'}
            <SearchIcon />
            Buscador
        {:else}
            <TextIcon />
            Texto
        {/if}
    </Tooltip>

    <Tooltip
        value       = { shapeInput.disabled === true }
        message     = "Deshabilitado" 
        background  = "bg-gray-300"
        color       = "bg-zinc-200 text-zinc-800 dark:bg-zinc-500 dark:text-zinc-200"
    >
        <DisabledIcon />
    </Tooltip>

    <Tooltip
        value       = { shapeInput.required === true }
        message     = "Requerido" 
        background  = "bg-rose-100"
        color       = "bg-zinc-200 text-zinc-800 dark:bg-zinc-500 dark:text-zinc-200"
    >
        <AsterikIcon />
    </Tooltip>
</div>

{#if shapeInput.description}
    <Separator.Root
        class="my-2 shrink-0 bg-zinc-300 dark:bg-zinc-700 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]"
    />

    <footer class="text-gray-500 ">
        {shapeInput.description}
    </footer>
{/if}
