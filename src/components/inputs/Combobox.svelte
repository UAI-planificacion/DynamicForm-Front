<script lang="ts">
    import { Combobox, type Selected } from "bits-ui";

    import { CaretDownIcon, CheckIcon } from "$icons";
    import type { ShapeInput }          from "$models";
    import Info                         from "./Info.svelte";

    export let shapeInput       : ShapeInput;
    export let value            : string | string[] | undefined = undefined;
    export let onSelectedChange : ( value: Selected<string> | Selected<string>[] | undefined ) => void;
    export let setError         : VoidFunction = () => {};


    let inputValue      = "";
    let touchedInput    = false;
    let open            = false;
    let selected : Selected<string> | Selected<string>[] | undefined;

    $: {
        if (shapeInput.multiple) {
            // Handle multiple selection
            if (Array.isArray(shapeInput.selected)) {
                selected = shapeInput.options?.filter(opt => 
                    shapeInput.selected?.includes(opt.value)
                ).map(opt => ({ label: opt.label, value: opt.value }));
            }
        } else {
            // Handle single selection
            selected = shapeInput.options?.find(option => 
                option.value === (Array.isArray(shapeInput.selected) ? shapeInput.selected[0] : shapeInput.selected)
            );
        }
    }

    $: filtered = inputValue && touchedInput
        ? shapeInput.options?.filter(( option ) => 
            option.label.toLowerCase().includes( inputValue.toLowerCase() ) ||
            option.value.toLowerCase().includes( inputValue.toLowerCase() )
        )
        : shapeInput.options;
</script>


<Info { shapeInput } { onSelectedChange } { value }>
    <Combobox.Root
        items               = { filtered }
        disabled            = { shapeInput.disabled }
        multiple           = { shapeInput.multiple }
        onSelectedChange    = { ( event ) => { onSelectedChange( event ); setError() }}
        { selected }
        bind:inputValue
        bind:touchedInput
        bind:open
    >
        <div class="relative flex items-center w-full rounded-lg border border-border-input dark:border-zinc-700 bg-background dark:bg-zinc-900 px-2 text-sm transition-colors placeholder:text-foreground-alt/50 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background disabled:bg-gray-100 dark:disabled:bg-zinc-600 focus:ring-zinc-600">
            <Combobox.Input
                class       = "w-full border-none text-sm outline-none transition-all duration-75 data-[highlighted]:bg-muted focus:ring-0 focus:outline-none active:outline-none disabled:bg-gray-100 dark:bg-zinc-900 dark:text-zinc-300"
                placeholder = { shapeInput.placeholder }
                aria-label  = { shapeInput.label }
            />

            <CaretDownIcon />
        </div>

        <Combobox.Content
            class       = "w-full rounded-xl border border-muted dark:border-zinc-700 bg-background px-1 py-2 shadow-popover outline-none bg-white dark:bg-zinc-800 dark:text-zinc-300"
            sideOffset  = { 5 }
        >
            {#each filtered! as option ( option.value )}
            <Combobox.Item
                    class = "flex h-10 w-full select-none items-center rounded-button py-3 pl-5 pr-1.5 text-sm capitalize outline-none transition-all duration-75 data-[highlighted]:bg-muted hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:rounded-lg focus:ring-0 focus:outline-none"
                    value = { option.value }
                    label = { option.label }
                >
                    { option.label }

                    <Combobox.ItemIndicator class="ml-auto" asChild={ false }>
                        <CheckIcon />
                    </Combobox.ItemIndicator>
                </Combobox.Item>
            {:else}
                <span class="block px-5 py-2 text-sm text-muted-foreground">
                    No existen resultados
                </span>
            {/each}
        </Combobox.Content>

        <Combobox.HiddenInput name={ shapeInput.name } />
    </Combobox.Root>
</Info>
