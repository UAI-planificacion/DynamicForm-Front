<script lang="ts">
    import { Select, type Selected } from "bits-ui";

    import type { InputStyle, ShapeInput }  from "$models";
    import { CheckIcon, CaretDownIcon } 	from "$icons";
    import { Info }                   		from "$components";
	import { styles } 						from "$lib";


    export let shapeInput       : ShapeInput;
    export let value            : string | string[] | undefined = undefined;
    export let onSelectedChange : ( value : Selected<string> | Selected<string>[] | undefined ) => void;
    export let setError         : VoidFunction = () => {};


	let selected 		: Selected<string> | Selected<string>[] | undefined;
    let selectedValue 	: Selected<string> | Selected<string>[] | undefined = undefined;


	function toSelected( value: string ): Selected<string> | undefined {
        const option = shapeInput.options?.find( opt => opt.value === value );

		return option ? { label: option.label, value: option.value } : undefined;
    }


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


	selectedValue = getSelectedValue();


    $: {
        if (shapeInput.multiple) {
            if (Array.isArray(shapeInput.selected)) {
                selected = shapeInput.options
                    ?.filter(opt => shapeInput.selected?.includes(opt.value))
                    .map(opt => ({ label: opt.label, value: opt.value }));
            }
        } else {
            selected = shapeInput.options
                ?.find(option => option.value === (Array.isArray(shapeInput.selected)
                    ? shapeInput.selected[0]
                    : shapeInput.selected
                ));
        }
    }
</script>


<Info { shapeInput } { onSelectedChange } { value }>
    <Select.Root
        selected			= { selectedValue }
        items               = { shapeInput.options }
        required            = { shapeInput.required }
        multiple            = { shapeInput.multiple }
        disabled            = { shapeInput.disabled }
        onSelectedChange    = {( event ) => {
            onSelectedChange( event );
            setError();
            selectedValue 	= event;
            selected 		= event;
        }}
    >
        <Select.Trigger
            class       = { ( styles.select as InputStyle ).box }
            aria-label  = { shapeInput.name }
        >
            <Select.Value
                class       = "text-sm"
                placeholder = { shapeInput.placeholder }
            />

            <CaretDownIcon />
        </Select.Trigger>

        <Select.Content
            class               = { ( styles.select as InputStyle ).content }
            sideOffset          = { 5 }
            collisionPadding    = { 0 }
        >
            {#each shapeInput.options! as option}
                <Select.Item
                    class = { ( styles.select as InputStyle ).item }
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
