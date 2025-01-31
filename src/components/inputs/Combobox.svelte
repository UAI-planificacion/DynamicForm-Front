<script lang="ts">
    import { Combobox, type Selected } from "bits-ui";

    import {
        CaretDownIcon,
        CheckIcon
    }                   from "$icons";
    import type {
        InputStyle,
        ShapeInput
    }                   from "$models";
    import Info         from "./Info.svelte";
    import { styles }   from "$lib";


    export let shapeInput       : ShapeInput;
    export let value            : string | string[] | undefined = undefined;
    export let onSelectedChange : ( value: Selected<string> | Selected<string>[] | undefined ) => void;
    export let setError         : VoidFunction = () => {};


    let inputValue      : string    = "";
    let touchedInput    : boolean   = false;
    let open            : boolean   = false;

    // Convertir las opciones a formato Selected
    function toSelected(value: string): Selected<string> | undefined {
        const option = shapeInput.options?.find(opt => opt.value === value);
        return option ? { label: option.label, value: option.value } : undefined;
    }

    // Manejar la selección inicial y los cambios
    function getSelectedValue(): Selected<string> | Selected<string>[] | undefined {
        if (!shapeInput.selected) return undefined;

        if (shapeInput.multiple) {
            const values = Array.isArray(shapeInput.selected) ? shapeInput.selected : [shapeInput.selected];
            const selected = values
                .map(toSelected)
                .filter((v): v is Selected<string> => v !== undefined);
            return selected.length ? selected : undefined;
        } else {
            const value = Array.isArray(shapeInput.selected) 
                ? shapeInput.selected[0] 
                : shapeInput.selected;
            return toSelected(value);
        }
    }

    // Actualizar el inputValue basado en la selección
    function updateInputValue(selected: Selected<string> | Selected<string>[] | undefined) {
        if (!selected) {
            inputValue = "";
            return;
        }

        if (Array.isArray(selected)) {
            inputValue = selected.map(s => s.label).join(", ");
        } else {
            inputValue = selected.label ?? '';
        }
    }

    let selected = getSelectedValue();
    let selectedValue = selected;

    // Combined reactive logic to handle all updates
    $: {
        if (shapeInput.selected !== undefined) {
            const newSelected = getSelectedValue();
            selected = newSelected;
            selectedValue = newSelected;
            
            // Only update input value if we're not in the middle of user input
            if (!open) {
                updateInputValue(newSelected);
            }
        }
    }

    // Handle input value updates separately
    function handleSelectionChange(newValue: Selected<string> | Selected<string>[] | undefined) {
        selectedValue = newValue;
        updateInputValue(newValue);
        if (onSelectedChange) {
            onSelectedChange(newValue);
        }
    }

    // Filtrado de opciones
    $: filtered = touchedInput && inputValue
        ? shapeInput.options?.filter(option => 
            option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
            option.value.toLowerCase().includes(inputValue.toLowerCase())
        )
        : shapeInput.options;

    // Actualizar texto cuando se cierra el combobox
    $: if ( !open && selectedValue ) {
        updateInputValue( selectedValue );
    }

    // Manejar cambios en el input
    $: {
        if ( touchedInput ) {
            inputValue = inputValue;
        }
    }
</script>


<Info {shapeInput} {onSelectedChange} {value}>
	<Combobox.Root
		items               = { filtered }
		disabled            = { shapeInput.disabled }
		multiple            = { shapeInput.multiple }
		onSelectedChange    = { ( value ) => { handleSelectionChange( value ); setError(); }}
		selected            = { selectedValue }
		bind:inputValue
		bind:touchedInput
		bind:open
	>
        <div class={( styles.combobox as InputStyle ).box }>
            <Combobox.Input
                class       = {( styles.combobox as InputStyle).input }
                placeholder = { shapeInput.placeholder }
                aria-label  = { shapeInput.label }
            />
            <CaretDownIcon />
        </div>

        <Combobox.Content
            class       = {( styles.combobox as InputStyle ).content }
            sideOffset  = { 5 }
        >
            {#each filtered! as option ( option.value )}
                <Combobox.Item
                    class   = {( styles.combobox as InputStyle ).item }
                    value   = { option.value }
                    label   = { option.label }
                >
                    {option.label}
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
