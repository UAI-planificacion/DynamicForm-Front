<script lang="ts">
    import { Tabs } from "bits-ui";
	import { v4 as uuid }	    from 'uuid';

    import { Check, Input, ValueEditor , GroupEditor, VirtualSelect}    from "$components";
    import type { GroupOption, SelectInput, ShapeInput, ShapeOption }   from "$models";

    export let shapeInput: ShapeInput;

    let optionsSelected: ShapeOption[] = [
        {
            id: uuid(),
            label: '',
            value: ''
        }
    ];
    let groupsSelected: GroupOption[] = [{
        group: '',
        values: [{
            id: uuid(),
            label: '',
            value: ''
        }]
    }];


    const defaultOption: ShapeOption[] = [{
        id: uuid(),
        label: 'Item 1',
        value: 'Item 1'
    }]
</script>

<Tabs.Root value="options">
    <Tabs.List
        class="mt-1 rounded-lg bg-dark-10 shadow-mini-inset dark:bg-background grid w-full grid-cols-2 gap-1 p-1 text-sm font-semibold leading-[0.01em] border border-zinc-300 dark:border-zinc-700"
    >
        <Tabs.Trigger
            value   = "options"
            onclick = { () => shapeInput.options = [...optionsSelected ]}
            class   = "data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-zinc-100 text-black dark:text-zinc-400 h-8 dark:data-[state=active]:text-black rounded-lg bg-transparent py-2"
        >
            Selección
        </Tabs.Trigger>

        <Tabs.Trigger
            value   = "groups"
            onclick = { () => shapeInput.options = [...groupsSelected ]}
            class   = "data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-zinc-100 text-black dark:text-zinc-400 h-8 dark:data-[state=active]:text-black rounded-lg bg-transparent py-2"
        >
            Grupos
        </Tabs.Trigger>
    </Tabs.List>

    <Tabs.Content value="options" class="select-none pt-3">
        <ValueEditor
            options         = { optionsSelected }
            onOptionsChange = {(newOptions: ShapeOption[]) => {
                optionsSelected     = [...newOptions];
                shapeInput.options  = optionsSelected;
            }}
        />
    </Tabs.Content>

    <Tabs.Content value="groups" class="select-none pt-3">
        <GroupEditor
            groups          = { groupsSelected }
            onGroupsChange  = {( newGroups: GroupOption[] ) => {
                groupsSelected      = [...newGroups];
                shapeInput.options  = groupsSelected
            }}
        />
    </Tabs.Content>
</Tabs.Root>

<div class="grid gap-3">
    <VirtualSelect
        onSelectedChange    = { ( selected: SelectInput ) => shapeInput.selected = selected }
        shapeInput          = {{
            id			: uuid(),
            name 		: 'default-value',
            placeholder	: 'Ingrese un valor por defecto',
            required 	: true,
            label		: 'Valor por defecto',
            selected	: shapeInput.selected,
            multiple    : shapeInput.multiple,
            search      : false,
            options     : [{
                id      : uuid(),
                label   : 'Sin valor por defecto',
                value   : 'none'
            }, ...( shapeInput.options as ShapeOption[] ) ?? defaultOption ],
        }}
    />

    <div class="grid grid-cols-1 @lg:grid-cols-2 items-center gap-2">
        <Check
            shapeInput = {{
                id      : uuid(),
                name    : 'multiple',
                label   : 'Selección múltiple',
                checked : shapeInput.multiple
            }}
            onChange = {( e ) => {
                shapeInput.multiple = e;
                shapeInput.selected = undefined;
            }}
        />

        <div class="grid grid-cols-1 @xl:grid-cols-2 items-center gap-2">
            <Check
                onChange    = {( e ) => shapeInput.search = e }
                shapeInput  = {{
                    id      : uuid(),
                    name    : 'search',
                    label   : 'Con buscador',
                    checked : shapeInput.search
                }}
            />

            <Input
                shapeInput = {{
                    id		    : uuid(),
                    name	    : 'search-placeholder',
                    value       : shapeInput.searchPlaceholder,
                    placeholder : 'Ingrese el placeholder del buscador',
                    type        : 'text',
                    disabled    : !shapeInput.search
                }}
                onInput = {( event: Event ) => shapeInput.searchPlaceholder = ( event.target as HTMLInputElement ).value }
            />
        </div>
    </div>
</div>
