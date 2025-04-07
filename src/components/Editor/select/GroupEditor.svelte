<script lang="ts">
    import { v4 as uuid } from 'uuid';

    import { AddIcon, DeleteIcon }                          from "$icons";
    import type { GroupOption, ShapeInput, ShapeOption }    from "$models";
    import { ButtonUI, Input, ValueEditor }                 from "$components";
    import { errorInput }                                   from '$lib';


    export let groups           : GroupOption[] = [];
    export let onGroupsChange   : ( newGroups: GroupOption[] ) => void;
    export let isGroupValid     : boolean = false;
    export let countSend        : number;


    const groupShape = {
        id          : uuid(),
        name        : uuid(),
        placeholder : 'Nombre del grupo',
        shape       : 'input',
        type        : 'search',
        valid       : true,
        required    : true,
        msgRequired : 'El campo es requerido.',
        minLength   : 1,
        maxLength   : 100,
        msgMinLength: 'Mínimo 1 caracter permitido.',
        msgMaxLength: 'Máximo 100 caracteres permitidos.'
    } as ShapeInput;

    const groupShapeList: ShapeInput[] = [ groupShape ];


    $: if ( countSend > 0 ) validGroupList();


    function validGroupList() {
        for ( let i = 0; i < groupShapeList.length; i++ ) {
            groupShapeList[i].valid = errorInput( groupShapeList[i], groupShapeList[i].value );
        }

        isGroupValid = groupShapeList.every( shape => shape.valid );
    }


    function addNewGroup() {
        validGroupList();

        groupShapeList.push( { ...groupShape, value: '' } );

        const newGroups = [
            ...groups,
            {
                id      : uuid(),
                name    : '',
                options : [
                    {
                        id    : uuid(),
                        label : '',
                        value : ''
                    }
                ]
            }
        ];

        onGroupsChange( newGroups );
    };


    function deleteGroup( groupId: string, index: number ): void {
        if ( groups.length === 1 ) return;

        const newGroups = groups.filter( group => group.id !== groupId );
        groupShapeList.splice( index, 1 );
        onGroupsChange( newGroups );
    };


    function updateGroupOptions(
        groupId   : string,
        newOptions: ShapeOption[]
    ): void {
        const newGroups = groups.map(group => 
            group.id === groupId 
                ? { ...group, options: newOptions }
                : group
        );

        onGroupsChange( newGroups );
    };


    function keyAddGroup( event: KeyboardEvent ): void {
        if ( event.key === 'Enter' ) addNewGroup();
    }
</script>

<div class="space-y-2 max-h-96 overflow-auto">
    {#each groups as group, index}
        <div class="rounded-lg border border-zinc-300 dark:border-zinc-800 p-2 space-y-2">
            <div class="flex items-start gap-2">
                <Input
                    shapeInput  = {{...groupShapeList[index], value: group.name }}
                    value       = { group.name }
                    onKeyup     = { keyAddGroup }
                    setError    = {() => groupShapeList[index].valid = errorInput( groupShapeList[index], group.name )}
                    onInput     = {( value ) => {
                        group.name = value;
                        groupShapeList[index].value = group.name;
                    }}
                />

                <ButtonUI
                    onClick={() => addNewGroup()}
                    disabled={ groups.length >= 10 }
                >
                    <AddIcon  />
                </ButtonUI>

                <ButtonUI
                    onClick={() => deleteGroup( group.id!, index )}
                >
                    <DeleteIcon />
                </ButtonUI>
            </div>

            <ValueEditor
                options         = { group.options }
                onOptionsChange = {( newOptions: ShapeOption[] ) => updateGroupOptions( group.id!, newOptions )}
                bind:isSelectionValid = { isGroupValid }
                { countSend }
            />
        </div>
    {/each}
</div>
