<script lang="ts">
    import { v4 as uuid } from 'uuid';
    import { AddIcon, DeleteIcon } from "$icons";
    import ValueEditor from './ValueEditor.svelte';
    import type { GroupOption, ShapeOption } from "$models";
    import { Input } from "$components";

    export let groups: GroupOption[] = [];
    export let onGroupsChange: (newGroups: GroupOption[]) => void;

    const addNewGroup = () => {
        const newGroups = [
            ...groups,
            {
                id: uuid(),
                group: '',
                values: []
            }
        ];
        onGroupsChange(newGroups);
    };

    const deleteGroup = (groupId: string) => {
        const newGroups = groups.filter(group => group.id !== groupId);
        onGroupsChange(newGroups);
    };

    const updateGroupOptions = (groupId: string, newOptions: ShapeOption[]) => {
        const newGroups = groups.map(group => 
            group.id === groupId 
                ? { ...group, values: newOptions }
                : group
        );
        onGroupsChange(newGroups);
    };

    const updateGroupName = (groupId: string, event: Event) => {
        const target = event.target as HTMLInputElement;
        if (!target) return;
        
        const newGroups = groups.map(group => 
            group.id === groupId 
                ? { ...group, group: target.value }
                : group
        );
        onGroupsChange(newGroups);
    };
</script>

<div class="space-y-6">
    

    <div class="space-y-6">
        {#each groups as group}
            <div class="rounded-lg border border-zinc-200 dark:border-zinc-800 p-2">
                <div class="flex items-center gap-2">
                    <Input
                        shapeInput={{
                            id: uuid(),
                            name: "group",
                            value: group.group,
                            placeholder: 'Nombre del grupo',
                            type: 'search'
                        }}
                        onInput={(e) => updateGroupName(group.id!, e)}
                    />

                    <button
                        type="button"
                        class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                        on:click={addNewGroup}
                    >
                        <AddIcon  />
                    </button>
                    <button
                        type="button"
                        class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9"
                        on:click={() => deleteGroup(group.id!)}
                    >
                        <DeleteIcon />
                    </button>
                </div>

                <ValueEditor
                    options={group.values}
                    onOptionsChange={(newOptions) => updateGroupOptions(group.id!, newOptions)}
                />
            </div>
        {/each}
    </div>
</div>
