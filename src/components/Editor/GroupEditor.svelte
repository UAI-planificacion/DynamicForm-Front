<script lang="ts">
    import { v4 as uuid } from 'uuid';

    import { AddIcon, DeleteIcon }              from "$icons";
    import type { GroupOption, ShapeOption }    from "$models";
    import { ButtonUI, Input, ValueEditor }     from "$components";


    export let groups           : GroupOption[] = [];
    export let onGroupsChange   : ( newGroups: GroupOption[] ) => void;


    const addNewGroup = () => {
        const newGroups = [
            ...groups,
            {
                id      : uuid(),
                group   : '',
                values  : []
            }
        ];

        onGroupsChange( newGroups );
    };


    function deleteGroup( groupId: string ): void {
        const newGroups = groups.filter( group => group.id !== groupId );
        onGroupsChange( newGroups );
    };


    function updateGroupOptions(
        groupId   : string,
        newOptions: ShapeOption[]
    ): void {
        const newGroups = groups.map(group => 
            group.id === groupId 
                ? { ...group, values: newOptions }
                : group
        );

        onGroupsChange( newGroups );
    };


    function updateGroupName(
        groupId : string,
        event   : Event
    ): void {
        const target = event.target as HTMLInputElement;

        if ( !target ) return;

        const newGroups = groups.map(group => 
            group.id === groupId 
                ? { ...group, group: target.value }
                : group
        );

        onGroupsChange( newGroups );
    };
</script>


<div class="space-y-2">
    {#each groups as group}
        <div class="rounded-lg border border-zinc-200 dark:border-zinc-800 p-2 space-y-2">
            <div class="flex items-center gap-2">
                <Input
                    onInput     = {( e ) => updateGroupName( group.id!, e )}
                    shapeInput  = {{
                        id          : uuid(),
                        name        : "group",
                        value       : group.group,
                        placeholder : 'Nombre del grupo',
                        type        : 'search'
                    }}
                />

                <ButtonUI
                    onClick={() => addNewGroup()}
                >
                    <AddIcon  />
                </ButtonUI>

                <ButtonUI
                    onClick={() => deleteGroup( group.id! )}
                >
                    <DeleteIcon />
                </ButtonUI>
            </div>

            <ValueEditor
                options         = { group.values }
                onOptionsChange = {( newOptions: ShapeOption[] ) => updateGroupOptions( group.id!, newOptions )}
            />
        </div>
    {/each}
</div>
