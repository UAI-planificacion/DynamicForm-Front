<script lang="ts">
    import { Select, type Selected } from "bits-ui";

    import type { ShapeInput }          from "$models";
    import { CheckIcon, CaretDownIcon } from "$icons";
    import { Info }                   	from "$components";


    export let shapeInput       : ShapeInput;
    export let value            : string | undefined = undefined;
    export let onSelectedChange : ( value : Selected<string> | Selected<string>[] | undefined ) => void;
    export let setError         : VoidFunction = () => {};

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
</script>


<Info { shapeInput } { onSelectedChange } { value }>
    <Select.Root
        { selected }
        items               = { shapeInput.options }
        required            = { shapeInput.required }
        multiple            = { shapeInput.multiple }
        disabled            = { shapeInput.disabled }
        onSelectedChange    = {( event ) => {
            onSelectedChange( event );
            setError();
        }}
    >
        <Select.Trigger
            class       = "inline-flex h-input w-full items-center rounded-9px border border-border-input dark:border-zinc-700 bg-background px-[11px] text-sm transition-colors placeholder:text-foreground-alt/50 focus:outline-none focus:ring-1 rounded-lg h-10 justify-between disabled:bg-gray-100 dark:disabled:bg-zinc-800 dark:disabled:border-zinc-800 dark:text-zinc-300 focus:ring-zinc-600"
            aria-label  = { shapeInput.name }
        >
            <Select.Value
                class       = "text-sm"
                placeholder = { shapeInput.placeholder }
            />

            <CaretDownIcon />
        </Select.Trigger>

        <Select.Content
            class               = "w-full rounded-xl border border-muted dark:border-zinc-700 bg-background px-1 py-2 shadow-popover outline-none bg-white dark:bg-zinc-800 z-10 dark:text-zinc-300"
            sideOffset          = { 5 }
            collisionPadding    = { 0 }
        >
            {#each shapeInput.options! as option}
                <Select.Item
                    class = "flex h-10 w-full select-none items-center rounded-button py-3 pl-5 pr-1.5 text-sm outline-none transition-all duration-75 data-[highlighted]:bg-muted dark:hover:bg-zinc-700 hover:rounded-lg"
                    value = { option.value }
                    label = { option.label }
                >
                    { option.label }

                    <Select.ItemIndicator class="ml-auto" asChild={ false }>
                        <CheckIcon />
                    </Select.ItemIndicator>
                </Select.Item>
            {/each}
        </Select.Content>

        <Select.Input
            name        = { shapeInput.name }
            required	= { shapeInput.required }
        />
    </Select.Root>
</Info>
