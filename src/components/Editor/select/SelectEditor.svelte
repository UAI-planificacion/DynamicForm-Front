<script lang="ts">
    import { Tabs }         from "bits-ui";
	import { v4 as uuid }	from 'uuid';

    import { Check, Input, ValueEditor , GroupEditor, VirtualSelect}    from "$components";
    import type { GroupOption, SelectInput, ShapeInput, ShapeOption }   from "$models";
    import { errorInput }                                               from "$lib";


    export let shapeInput       : ShapeInput;
    export let isSelectionValid : boolean = false;
    export let countSend        : number;


    $: if ( countSend ) {
        if ( value === 'options' && isSelectionValid )
            isSelectionValid = true;
        else if ( value === 'groups' && isGroupValid )
            isSelectionValid = true;
        else 
            isSelectionValid = false;

        isSelectionValid = heightPanelShape.valid ?? false;
    }


    shapeInput.heightPanel = 5;


    const isShapeOptionArray = (arr: any[]): boolean => 
        arr &&
        Array.isArray(arr) && 
        arr.length > 0 && 
        arr[0] && 
        !('name' in arr[0]) && 
        !('options' in arr[0]);


    const isGroupOptionArray = (arr: any[]): boolean => 
        arr && 
        Array.isArray(arr) && 
        arr.length > 0 && 
        arr[0] && 
        'name' in arr[0] && 
        'options' in arr[0];


    const createDefaultOption = (): ShapeOption => ({
        id      : uuid(),
        label   : '',
        value   : ''
    });


    const createDefaultGroup = (): GroupOption => ({
        name    : '',
        options : [createDefaultOption()]
    });


    let value: "options" | "groups" = isGroupOptionArray( shapeInput.options as any[] ) ? "groups" : "options";


    let optionsSelected: ShapeOption[] = isShapeOptionArray( shapeInput.options as any[] )
        ? shapeInput.options as ShapeOption[]
        : [createDefaultOption()];


    let groupsSelected: GroupOption[] = isGroupOptionArray( shapeInput.options as any[] )
        ? shapeInput.options as GroupOption[] 
        : [createDefaultGroup()];


    let isGroupValid = value === 'groups' ? false : true;


    const heightPanelShape = {
        id          : uuid(),
        name        : 'height-panel',
        placeholder : 'Ingrese la altura del panel',
        value       : shapeInput.heightPanel?.toString() ?? '5',
        shape       : 'input',
        type        : 'number',
        valid       : true,
        required    : true,
        msgRequired : 'La altura del panel es requerida',
        min         : 1,
        max         : 15,
        msgMin      : 'Mínimo 1 unidad permitida',
        msgMax      : 'Máximo 15 unidades permitidas'
    } as ShapeInput;


    const placeholderSearchShape = {
        id          : uuid(),
        name        : 'search-placeholder',
        placeholder : 'Ingrese el placeholder del buscador',
        disabled    : !shapeInput.search,
        value       : shapeInput.searchPlaceholder,
        shape       : 'input',
        type        : 'text',
        valid       : true,
        required    : false,
        msgRequired : 'no es requerido',
        maxLength   : 50,
        msgMaxLength: 'Máximo 50 caracteres permitidos.'
    } as ShapeInput;


    function tabOptionsClick() {
        shapeInput.options = [...optionsSelected ];
        value = 'options';
        if ( optionsSelected.length === 1 && optionsSelected[0].label === '' && optionsSelected[0].value === '' )
            isSelectionValid = false;
    }


    function tabGroupsClick() {
        shapeInput.options = [...groupsSelected ];
        value = 'groups';
        if ( groupsSelected.length === 1 && groupsSelected[0].options.length === 1 && groupsSelected[0].options[0].label === '' && groupsSelected[0].options[0].value === '' ){
            isGroupValid = false;
            isSelectionValid = false;
        }
    }
</script>

<Tabs.Root {value}>
    <Tabs.List
        class="mt-1 rounded-lg bg-dark-10 shadow-mini-inset dark:bg-background grid w-full grid-cols-2 gap-1 p-1 text-sm font-semibold leading-[0.01em] border border-zinc-300 dark:border-zinc-700"
    >
        <Tabs.Trigger
            value   = "options"
            onclick = { tabOptionsClick }
            class   = "data-[state=active]:bg-black data-[state=active]:text-white text-black dark:text-zinc-200 h-8 rounded-md bg-transparent py-2 transition-all"
        >
            Selección
        </Tabs.Trigger>

        <Tabs.Trigger
            value   = "groups"
            onclick = { tabGroupsClick }
            class   = "data-[state=active]:bg-black data-[state=active]:text-white text-black dark:text-zinc-200 h-8 rounded-md bg-transparent py-2 transition-all"
        >
            Grupos
        </Tabs.Trigger>
    </Tabs.List>

    <Tabs.Content value="options" class="select-none pt-3">
        <ValueEditor
            options         = { optionsSelected }
            onOptionsChange = {(newOptions: ShapeOption[]) => {
                optionsSelected = [...newOptions];
                shapeInput.options = optionsSelected;
            }}
            bind:isSelectionValid = { isSelectionValid }
            { countSend }
        />
    </Tabs.Content>

    <Tabs.Content value="groups" class="select-none pt-3">
        <GroupEditor
            groups          = { groupsSelected }
            onGroupsChange  = {( newGroups: GroupOption[] ) => {
                groupsSelected = [...newGroups];
                shapeInput.options = groupsSelected;
            }}
            { countSend }
            bind:isGroupValid = { isGroupValid }
        />
    </Tabs.Content>
</Tabs.Root>

<div class="grid gap-3">
    <VirtualSelect
        onSelectedChange    = { ( selected: SelectInput ) => shapeInput.selected = selected }
        shapeInput          = {{
            id			        : uuid(),
            name 		        : 'default-value',
            placeholder	        : 'Ingrese un valor por defecto',
            required 	        : true,
            msgRequired	        : 'Valor por defecto requerido.',
            label		        : 'Valor por defecto',
            multiple            : shapeInput.multiple,
            search              : shapeInput.search,
            searchPlaceholder   : shapeInput.searchPlaceholder,
            options             : shapeInput.options
        }}
        value = { shapeInput.selected }
    />

    <div class="grid grid-cols-1 @lg:grid-cols-2 items-center gap-2">
        <div class="space-y-2">
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

            <Input
                shapeInput  = {{ ...heightPanelShape }}
                value       = { shapeInput.heightPanel?.toString() }
                onInput     = {( value ) => shapeInput.heightPanel = Number(value) }
                setError    = {() => { heightPanelShape.valid = errorInput(
                    heightPanelShape,
                    shapeInput.heightPanel?.toString()
                )}}
            />
        </div>

        <div class="grid grid-cols-1 @xl:grid-cols-1 items-center gap-2">
            <div class="space-y-2">
                <Check
                    onChange    = {( e ) => shapeInput.search = e }
                    shapeInput  = {{
                        id      : uuid(),
                        name    : 'search',
                        label   : 'Con buscador',
                    }}
                    checked   = { shapeInput.search }
                />

                <Input
                    shapeInput  = {{ ...placeholderSearchShape, disabled: !shapeInput.search, maxLength: !shapeInput.search ? undefined : 50 }}
                    value       = { shapeInput.searchPlaceholder }
                    onInput     = {( value ) => shapeInput.searchPlaceholder = value }
                    setError    = {() => { placeholderSearchShape.valid = errorInput(
                        {...placeholderSearchShape, maxLength: !shapeInput.search ? undefined : 50},
                        shapeInput.searchPlaceholder
                    )}}
                />
            </div>
        </div>
    </div>
</div>
