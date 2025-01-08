<script lang="ts">
    import { Separator }    from "bits-ui";
	import { v4 as uuid }	from 'uuid';

    import {
        DeleteIcon,
        EditIcon,
        FlagIcon,
        InputIcon,
        NameIcon
    }                           from "$icons";
    import type { ShapeInput }  from "$models";
    import { Input }            from "$components";


    export let shapeInput   : ShapeInput;
    export let onDelete     : VoidFunction;
    // export let onEdit       : () => void;

    let editing = false;
</script>

{#if  editing === false}
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
    <button
        class       = "justify-center hover:brightness-105 shadow-md active:scale-95"
        on:click    = {() => editing = !editing }
    >
        <EditIcon />
    </button>

    <Input
        shapeInput = {{
            id		: uuid(),
            name	: 'name',
            shape	: 'none',
            value   : shapeInput.name
        }}
        onInput = {( event: Event ) => shapeInput.name = ( event.target as HTMLInputElement ).value }
    />
{/if}
