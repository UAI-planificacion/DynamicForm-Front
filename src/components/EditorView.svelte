<script lang="ts">
    import { slide } from "svelte/transition";

    import {
        Accordion,
        Separator,
        type Selected
    }                       from "bits-ui";
	import { v4 as uuid }	from 'uuid';

    import {
        DeleteIcon,
        EditIcon,
        FlagIcon,
        InputIcon,
        NameIcon,
        CaretDownIcon,
        AddIcon
    }                           from "$icons";
    import type {
        InputType,
        ShapeInput,
        Types
    }                           from "$models";
    import {
        Check,
        Input,
        Select,
        TextArea
    }                           from "$components";
    import { options, types }   from "$lib";


    export let shapeInput   : Partial<ShapeInput>;
    export let onDelete     : VoidFunction;

    // let localShapeInput = { ...shapeInput };
    // $: shapeInput = { ...shapeInput, ...localShapeInput };
    // export let shape    : InputType;
    // export let name           : string;
    // export let label          : string | undefined;
    // export let description    : string | undefined;
    // export let type           : string | undefined;
    // export let placeholder    : string | undefined;
    // export let value          : string | undefined;
    // export let required       : boolean | undefined;
    // export let disabled       : boolean | undefined;
    // export let readonly       : boolean | undefined;
    // export let pattern        : string;
    // export let min            : string;
    // export let max            : string;
    // export let minLength      : string;
    // export let maxLength      : string;
    // export let styles         : string | undefined;
    // export let options        : ShapeOptions[] | undefined;
    // export let rows           : number | undefined;
    // export let apiUrlSend     : string | undefined;
    // export let checked        : boolean;
    // export let selected       : string;

    let editing = false;
</script>

{#if editing === false}
    <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
            <div class="bg-amber-300 rounded-xl py-1 px-3 w-auto flex items-center gap-2">
                <InputIcon />
                { shapeInput.shape }
            </div>

            <div class="bg-green-300 rounded-xl py-1 px-3 w-auto flex items-center gap-2">
                <NameIcon />
                { shapeInput.name }
            </div>
        </div>

        <div class="flex gap-3 items-center">
            <button
                class       = "justify-center hover:brightness-105 shadow-md active:scale-95"
                on:click    = {() => editing = !editing }
            >
                <EditIcon />
            </button>

            <button
                class       = "justify-center hover:brightness-105 shadow-md active:scale-95"
                on:click    = { onDelete }
            >
                <DeleteIcon />
            </button>
        </div>
    </div>

    <Separator.Root
        class="my-2 shrink-0 bg-zinc-300 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]"
    />

    <div class=" flex items-center gap-2">
        <div class="bg-sky-300 rounded-xl py-1 px-3 w-auto flex items-center gap-1">
            <FlagIcon />

            { shapeInput.label }
        </div>
    </div>
{:else}
    <section class="space-y-2">
        <div class="grid grid-cols-1 sm:grid-cols-2 items-center gap-2">
            <Select
                shapeInput={{
                    id			: uuid(),
                    name 		: 'shape',
                    placeholder	: 'Ingrese el tipo de entrada',
                    required 	: true,
                    label		: 'Input',
                    value       : shapeInput.shape,
                    options,
                }}
                onSelectedChange={( selected: Selected<string> | undefined) => shapeInput.shape = selected?.value as InputType || 'none' }
            />

            <Input
                shapeInput = {{
                    id		    : uuid(),
                    label       : 'Nombre',
                    name	    : 'name',
                    placeholder : 'Ingrese el nombre',
                    value       : shapeInput.name
                }}
                onInput = {( event: Event ) => shapeInput.name = ( event.target as HTMLInputElement ).value }
            />

            <Input
                shapeInput = {{
                    id		    : uuid(),
                    label       : 'Etiqueta',
                    name	    : 'label',
                    placeholder : 'Ingrese la etiqueta',
                    value       : shapeInput.label
                }}
                onInput = {( event: Event ) => shapeInput.label = ( event.target as HTMLInputElement ).value  }
            />

            <Input
                shapeInput = {{
                    id		    : uuid(),
                    label       : 'Placeholder',
                    name	    : 'placeholder',
                    placeholder : 'Ingrse el placeholder',
                    value       : shapeInput.placeholder
                }}
                onInput = {( event: Event ) => shapeInput.placeholder = ( event.target as HTMLInputElement ).value  }
            />
        </div>

        <Check
            id 			= { uuid() }
            label		= { "Requerido" }
            checked     = { shapeInput.required }
            onChange	= {( e ) =>  shapeInput.required = e as boolean }
        />

        {#if shapeInput.shape === 'input'}
            <Select
                shapeInput={{
                    id			: uuid(),
                    name 		: 'type',
                    placeholder	: 'Ingrese el tipo',
                    required 	: true,
                    label		: 'Tipo de entrada',
                    value       : shapeInput.type,
                    options     : types,
                }}
                onSelectedChange={( selected: Selected<string> | undefined ) => shapeInput.type = selected?.value as Types || 'none' }
            />
        {/if}

        {#if shapeInput.shape === 'button'}
            <Input
                shapeInput = {{
                    id		    : uuid(),
                    label       : 'Url para la petición HTTPS',
                    name	    : 'utl',
                    placeholder : 'Ingrese la url donde se realizará la petición',
                }}
                onInput = {( event: Event ) => shapeInput.apiUrlSend = ( event.target as HTMLInputElement ).value }
            />
        {/if}

        {#if shapeInput.shape === 'textarea'}
            <Input
                shapeInput = {{
                    id		    : uuid(),
                    label       : 'Alto de la caja',
                    name	    : 'rows',
                    placeholder : 'Ingrese el alto que tendrá la caja de texto',
                    value       : "4",
                    type        : 'number'
                }}
                onInput = {( event: Event ) => shapeInput.rows = Number(( event.target as HTMLInputElement ).value )}
            />
        {/if}

        {#if shapeInput.shape === 'combobox' || shapeInput.shape === 'select' }
            <div class="grid grid-cols-2 items-center ">
                <span>Valor</span>
                <div class="flex justify-between items-center">
                    <span>Label</span>
                        <button
                        on:click={() => shapeInput.options = [...shapeInput.options ?? [], { label: '', value: '' }]}
                        >
                        <AddIcon />
                    </button>
                </div>
            </div>

            <div class={` ${shapeInput.options?.length === 0 ? 'h-0' : 'h-36'} w-full overflow-auto gap-2 grid grid-cols-2 pr-2`}>
                {#each shapeInput.options?? [] as item }
                    <Input
                        shapeInput = {{
                            id		    : uuid(),
                            name	    : uuid(),
                            value       : item.value,
                            placeholder : 'Ingrese el valor',
                        }}
                        onInput = {( event: Event ) => item.value = ( event.target as HTMLInputElement ).value }
                    />

                    <div class="flex items-center gap-2 start-0">
                        <Input
                            shapeInput = {{
                                id		    : uuid(),
                                name	    : uuid(),
                                value       : item.label,
                                placeholder : 'Ingrese la etiqueta para mostrar',
                            }}
                            onInput = {( event: Event ) => item.label = ( event.target as HTMLInputElement ).value }
                        />

                        <button
                            class="hover:brightness-105 active:scale-95"
                            on:click={() => shapeInput.options = [...shapeInput.options?.filter( option => option.value !== item.value ) ?? []]}
                        >
                            <DeleteIcon />
                        </button>
                    </div>
                {/each}
            </div>
        {/if}

        <Accordion.Root class="w-full">
            <Accordion.Item value="accordion" class="group border-b border-dark-10 px-1.5">
                <Accordion.Header>
                    <Accordion.Trigger
                        class="flex w-full flex-1 items-center justify-between py-5 text-[15px] font-medium transition-all [&[data-state=open]>span>svg]:rotate-180 "
                    >
                        Atributos opcionales

                        <span
                            class="inline-flex size-8 items-center justify-center rounded-[7px] bg-transparent transition-all hover:bg-dark-10"
                        >
                            <CaretDownIcon />
                        </span>
                    </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content
                    transition          = { slide }
                    transitionConfig    = {{ duration: 200 }}
                    class               = "pb-[25px] text-sm tracking-[-0.01em]"
                >
                    <Input
                        shapeInput = {{
                            id		    : uuid(),
                            label       : 'Descripción',
                            name	    : 'description',
                            placeholder : 'Ingrese la descripción',
                            value       : shapeInput.description
                        }}
                        onInput = {( event: Event ) => shapeInput.description = ( event.target as HTMLInputElement ).value  }
                    />

                    <Input
                        shapeInput = {{
                            id		    : uuid(),
                            label       : 'Valor por defecto',
                            name	    : 'value',
                            placeholder : 'Valor con el que se inicia',
                            value       : shapeInput.value
                        }}
                        onInput = {( event: Event ) => shapeInput.value = ( event.target as HTMLInputElement ).value  }
                    />

                    <div class="grid grid-cols-1 sm:grid-cols-2 items-center justify-between">
                        <Check
                            id 			= { uuid() }
                            label		= { "Solo lectura" }
                            onChange	= {( e ) => shapeInput.readonly = e as boolean }
                            checked     = { shapeInput.readonly }
                        />

                        <Check
                            id 			= { uuid() }
                            label		= { "Desactivado" }
                            onChange	= {( e ) => shapeInput.disabled = e as boolean }
                            checked     = { shapeInput.disabled }
                        />
                    </div>

                    <TextArea 
                        shapeInput={{
                            id          : uuid(),
                            name        : 'class',
                            label       : 'Estilos con tailwind',
                            placeholder : 'Ingrese los estilos',
                            rows        : 4,
                            value       : shapeInput.class ?? `w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-400 focus:ring-0.5 focus:ring-gray-400 placeholder:text-gray-400 sm:text-sm`
                        }}
                        onInput = {( event: Event ) => shapeInput.class = ( event.target as HTMLInputElement ).value  }
                    />
                </Accordion.Content>
            </Accordion.Item>
        </Accordion.Root>

        <div class="grid grid-cols-2 items-center gap-2">
            <button
                class="hover:brightness-105 active:scale-95 active:brightness-90 bg-black rounded-lg py-2 text-white"
                on:click={() => editing = false }
            >
                Guardar
            </button>
        </div>
    </section>
{/if}
