<script lang="ts">
    import { onMount } from 'svelte';

    import { ChevronDown, Check, X }    from 'lucide-svelte';

    import type {
        GroupOption,
        ShapeInput,
        ShapeOption,
        SelectInput,
        SelectGroup
    }           from '$models';
    import Info from './Info.svelte';
    import { Input } from '$components';


    export let shapeInput       : ShapeInput;
    export let value            : string | string[] | undefined = undefined;
    export let onSelectedChange : ( value: SelectInput ) => void;
    export let setError         : VoidFunction = () => {};

    let searchTerm = '';
    let isOpen = false;
    let selectedItems: ShapeOption[] = [];
    let filteredData: ShapeOption[] | GroupOption[] | undefined = [];
    let comboboxElement: HTMLDivElement;
    let dropdownElement: HTMLDivElement;
    let listContainer: HTMLDivElement;
    let scrollTop = 0;
    let visibleItems: ShapeOption[] | GroupOption[] = [];
    let totalHeight = 0;
    let itemPositions: { index: number; offset: number }[] = [];
    let hoveredIndex: string | null = null;

    const isGroupOption = (
        item: ShapeOption | GroupOption
    ): item is GroupOption => 'group' in item && 'values' in item;


    function calculateItemPositions(): void {
        let currentOffset = 0;
        itemPositions = filteredData?.map((item, index) => {
            const position = { index, offset: currentOffset };

            if (isGroupOption(item)) {
                currentOffset += 40 + (item.values.length * 36);
            } else {
                currentOffset += 36;
            }

            return position;
        }) ?? [];

        totalHeight = currentOffset;
    }


    function findVisibleRange(scrollTop: number): { startIndex: number; endIndex: number } {
        const containerHeight = calculateDropdownHeight();
        const buffer = containerHeight;
        
        const visibleStart = Math.max(0, scrollTop - buffer);
        const visibleEnd = scrollTop + containerHeight + buffer;

        let startIndex = itemPositions.findIndex(pos => pos.offset >= visibleStart);
        if (startIndex === -1) startIndex = itemPositions.length;

        let endIndex = itemPositions.findIndex(pos => pos.offset > visibleEnd);
        if (endIndex === -1) endIndex = itemPositions.length;

        return { startIndex, endIndex };
    }


    function updateVisibleItems(): void {
        if ( !filteredData?.length ) return;

        const { startIndex, endIndex } = findVisibleRange( scrollTop );

        visibleItems = filteredData.slice( startIndex, endIndex );

        const topOffset = startIndex > 0 ? itemPositions[startIndex].offset : 0;

        if ( listContainer ) {
            const itemsContainer = listContainer.querySelector( '.virtual-items' ) as HTMLElement;

            if ( itemsContainer ) {
                itemsContainer.style.transform = `translateY(${topOffset}px)`;
            }
        }
    }


    function handleScroll( event: Event ): void {
        const target = event.target as HTMLDivElement;

        scrollTop = target.scrollTop;

        hoveredIndex = null; // Reset hover state on scroll

        updateVisibleItems();
    }


    function clearSelection( event: MouseEvent | KeyboardEvent ): void {
        event?.stopPropagation();
        searchTerm = '';
        isOpen = false;
        selectedItems = [];
        onSelectedChange(undefined);
        setError();
    }


    $: {
        if ( shapeInput.search && searchTerm ) {
            filteredData = shapeInput.options?.some(isGroupOption)
                ? ( shapeInput.options
                    ?.map( item => isGroupOption( item )
                        ? { ...item, values: item.values.filter( opt => opt.label.toLowerCase().includes( searchTerm.toLowerCase() ))}
                        : ( item as ShapeOption )
                    )
                    .filter(( item ): item is GroupOption => isGroupOption( item ))
                ) 
                : ( shapeInput.options?.filter(( item ): item is ShapeOption => 
                    !isGroupOption( item ) && item.label.toLowerCase().includes( searchTerm.toLowerCase() )) ?? [] );
        } else {
            filteredData = shapeInput.options || [];
        }

        calculateItemPositions();
        updateVisibleItems();
    }


    const isGroupFullySelected = ( group: GroupOption ): boolean =>
        group.values
            .every(option => selectedItems
                .some( selected => selected.value === option.value )
        );


    const isGroupPartiallySelected = ( group: GroupOption ): boolean => 
        group.values
            .some(option => selectedItems
                .some( selected => selected.value === option.value )
            ) && !isGroupFullySelected( group );


    function transformSelectedValue(items: ShapeOption[]): SelectInput {
        if (!items.length) return undefined;

        if (!shapeInput.multiple) {
            return items[0].value;
        }

        // Agrupar items por grupo si existen
        const groupedItems = items.reduce((acc, item) => {
            const groupItem = filteredData?.find(g => 
                isGroupOption(g) && g.values.some(v => v.value === item.value)
            ) as GroupOption | undefined;

            if (groupItem) {
                const existingGroup = acc.groups.find(g => g.group === groupItem.group);
                if (existingGroup) {
                    existingGroup.values.push(item.value);
                } else {
                    acc.groups.push({ group: groupItem.group, values: [item.value] });
                }
            } else {
                acc.singles.push(item.value);
            }
            return acc;
        }, { groups: [] as SelectGroup[], singles: [] as string[] });

        // Si hay grupos, retornar SelectGroup[], sino string[]
        return groupedItems.groups.length > 0 ? groupedItems.groups : groupedItems.singles;
    }

    function toggleGroup( group: GroupOption ): void {
        if ( ! shapeInput.multiple ) return;

        const isFullySelected = group.values.every(option => 
            selectedItems.some(selected => selected.value === option.value)
        );

        if ( isFullySelected ) {
            selectedItems = selectedItems.filter( item => 
                !group.values.some( option => option.value === item.value )
            );
        } else {
            const newItems = group.values.filter( option => 
                !selectedItems.some( selected => selected.value === option.value )
            );
            selectedItems = [...selectedItems, ...newItems];
        }

        onSelectedChange(transformSelectedValue(selectedItems));
        setError();
    }

    function toggleItem( item: ShapeOption ): void {
        if ( shapeInput.multiple ) {
            const index = selectedItems.findIndex( i => i.value === item.value );

            selectedItems = index === - 1
                ? [...selectedItems, item]
                : selectedItems.filter( i => i.value !== item.value );
        } else {
            selectedItems   = [item];
            isOpen          = false;
        }

        onSelectedChange(transformSelectedValue(selectedItems));
        setError();
    }


    $: displayText = shapeInput.multiple
        ? selectedItems.length > 0
            ? `Se han seleccionado ${selectedItems.length} elementos`
            : shapeInput.placeholder || ''
        : selectedItems[0]?.label || shapeInput.placeholder;


    async function handleOpen() {
        isOpen = !isOpen;
        if ( isOpen ) {
            adjustDropdownPosition();
        }
    }

    function adjustDropdownPosition() {
        if (!dropdownElement || !comboboxElement) return;

        const rect = comboboxElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;
        const dropdownHeight = dropdownElement.offsetHeight;

        dropdownElement.style.left = `${rect.left}px`;

        if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
            // Position above if there's more space above
            dropdownElement.style.bottom = `${viewportHeight - rect.top}px`;
            dropdownElement.style.top = 'auto';
            dropdownElement.style.marginBottom = '0.25rem';
            dropdownElement.style.marginTop = '0';
        } else {
            // Position below
            dropdownElement.style.top = `${rect.bottom}px`;
            dropdownElement.style.bottom = 'auto';
            dropdownElement.style.marginTop = '0.25rem';
            dropdownElement.style.marginBottom = '0';
        }
    }

    function calculateDropdownHeight() {
        const searchHeight = shapeInput.search ? 32 : 0;
        const contentHeight = !filteredData?.length ? 36 
            : filteredData.length === 1 ? 40
            : filteredData.reduce((h, item) => isGroupOption(item) 
                ? h + 40 * (1 + item.values.length) : h + 40, 0);
            
        const maxHeight = 36 * (shapeInput.heightPanel ?? 5);
        return searchHeight + Math.min(contentHeight, maxHeight - searchHeight);
    }

    function handleClickOutside( event: MouseEvent ): void {
        if ( comboboxElement && !comboboxElement.contains( event.target as Node )) {
            isOpen = false;
        }
    }


    function handleMouseLeave(): void {
        hoveredIndex = null;
    }

    function handleMouseEnter(index: string): void {
        hoveredIndex = index;
    }


    onMount(() => {
        window.addEventListener('resize', adjustDropdownPosition);
        document.addEventListener('click', handleClickOutside);
        calculateItemPositions();
        updateVisibleItems();

        return () => {
            window.removeEventListener('resize', adjustDropdownPosition);
            document.removeEventListener('click', handleClickOutside);
        }
    });
</script>


<Info { shapeInput } { onSelectedChange } { value }>
<div class="relative w-full" bind:this={comboboxElement}>
    <button
        type="button"
        class="flex w-full items-center justify-between rounded-lg border-[1.5px] border-zinc-200 bg-white px-3 py-2 text-sm transition-all hover:bg-zinc-100 focus-visible:outline-none focus-visible:border-[2px] focus-visible:border-zinc-400 dark:focus-visible:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
        on:click={handleOpen}
        disabled={shapeInput.disabled}
    >
        <span class="truncate text-zinc-500 dark:text-zinc-300">{displayText}</span>

        <div class="flex items-center gap-2">
            {#if shapeInput.multiple && selectedItems.length > 0}
                <div
                    class="p-1 hover:bg-zinc-300 dark:hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
                    on:click|stopPropagation={clearSelection}
                    title="Limpiar selección"
                    role="button"
                    on:keydown={(event) => { if (event.key === 'Enter' || event.key === ' ') clearSelection(event); }}
                    tabindex="0" 
                >
                    <X class="h-3 w-3 text-gray-400"/>
                </div>
            {/if}

            <ChevronDown class={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
    </button>

    {#if isOpen}
        <div 
            bind:this={dropdownElement}
            class="fixed z-40 overflow-hidden rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-lg dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
            style="
                min-width: {comboboxElement?.offsetWidth}px;
                max-width: {comboboxElement?.offsetWidth}px;
                {dropdownElement?.style.top || ''};
                {dropdownElement?.style.left || ''};
                {dropdownElement?.style.bottom || ''};
                margin-top: {dropdownElement?.style.marginTop || '0.25rem'};
                margin-bottom: {dropdownElement?.style.marginBottom || '0'};
            "
        >
            {#if shapeInput.search}
                <div class="p-1 sticky top-0 bg-white dark:bg-zinc-800">
                    <Input
                        shapeInput = {{
                            id		    : 'search-items',
                            name	    : 'label',
                            placeholder : shapeInput.searchPlaceholder || 'Busca un elemento...'
                        }}
                    onInput = {( event: Event ) => searchTerm = ( event.target as HTMLInputElement ).value }
                    />

                </div>
            {/if}

            {#if !shapeInput.options?.length}
                <div class="py-1 text-center text-sm text-zinc-500 dark:text-zinc-400">
                    No hay elementos disponibles
                </div>
            {:else if !filteredData?.length}
                <div class="py-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
                    No se encontraron elementos
                </div>
            {:else}
                <div
                    bind:this={listContainer}
                    class="px-1 mt-1"
                    class:overflow-auto={filteredData.length > 1 && calculateDropdownHeight() < totalHeight}
                    style="height: {calculateDropdownHeight()}px;"
                    role="listbox"
                    aria-label="Lista de opciones"
                    on:scroll={filteredData.length > 1 ? handleScroll : null}
                >
                    <div 
                        style="height: {totalHeight}px; position: relative;" 
                        on:mouseleave={handleMouseLeave}
                        role="presentation"
                    >
                        <div 
                            class="virtual-items" 
                            style="position: absolute; left: 0; right: 0;"
                            role="presentation"
                        >
                            {#each visibleItems as item, i (item.id ?? i)}
                                {#if isGroupOption(item)}
                                    <div class="group">
                                        <button
                                            type="button"
                                            class="dark:text-zinc-400 flex w-full items-center justify-between px-3 py-2 text-sm font-bold bg-transparent dark:bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-700/50 focus:bg-zinc-100 rounded-lg dark:focus:bg-zinc-700 focus:outline-none transition-colors"
                                            on:click={() => toggleGroup(item)}
                                        >
                                            <span>{item.group}</span>

                                            {#if shapeInput.multiple}
                                                <Check class={`h-4 w-4 ${
                                                    isGroupFullySelected(item)
                                                    ? 'text-green-600'
                                                    : isGroupPartiallySelected(item)
                                                        ? 'text-gray-400'
                                                        : 'text-transparent'
                                                }`} />
                                            {/if}
                                        </button>

                                        {#each item.values as option, optionIndex}
                                            {@const itemKey = `${i}-${optionIndex}`}
                                            <button
                                                type="button"
                                                class="flex w-full items-center justify-between px-6 py-2 text-sm transition-colors rounded-lg focus-visible:outline-none focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-700 {hoveredIndex === itemKey ? 'bg-zinc-100 dark:bg-zinc-700' : ''} {selectedItems.some(selected => selected.value === option.value) ? 'bg-zinc-200 dark:bg-zinc-600' : ''} hover:bg-zinc-100 dark:hover:bg-zinc-700/50"
                                                on:click={() => toggleItem(option)}
                                                on:mouseenter={() => {
                                                    hoveredIndex = itemKey;
                                                }}
                                                on:mouseleave={handleMouseLeave}
                                                role="option"
                                                aria-selected={selectedItems.some(selected => selected.value === option.value)}
                                            >
                                                <span>{option.label}</span>

                                                {#if selectedItems.some(selected => selected.value === option.value)}
                                                    <Check class="h-4 w-4 text-green-600" />
                                                {/if}
                                            </button>
                                        {/each}
                                    </div>
                                {:else}
                                    <button
                                        type="button"
                                        class="flex w-full items-center justify-between px-3 py-2 text-sm transition-colors rounded-lg focus-visible:outline-none focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-700 {hoveredIndex === `item-${i}` ? 'bg-zinc-100 dark:bg-zinc-700' : ''} {selectedItems.some(selected => selected.value === item.value) ? 'bg-zinc-200 dark:bg-zinc-600' : ''} hover:bg-zinc-100 dark:hover:bg-zinc-700/50"
                                        on:click={() => toggleItem(item)}
                                        on:mouseenter={() => {
                                            hoveredIndex = `item-${i}`;
                                        }}
                                        on:mouseleave={handleMouseLeave}
                                        role="option"
                                        aria-selected={selectedItems.some(selected => selected.value === item.value)}
                                    >
                                        <span>{item.label}</span>

                                        {#if selectedItems.some(selected => selected.value === item.value)}
                                            <Check class="h-4 w-4 text-green-600" />
                                        {/if}
                                    </button>
                                {/if}
                            {/each}
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    {/if}
</div>
</Info>

<style>
    /* Custom scrollbar styles */
    :global(.virtual-items::-webkit-scrollbar) {
        width: 8px;
    }

    :global(.virtual-items::-webkit-scrollbar-track) {
        background: transparent;
    }

    :global(.virtual-items::-webkit-scrollbar-thumb) {
        background-color: rgb(161 161 170); /* zinc-400 */
        border-radius: 4px;
    }

    :global(.dark .virtual-items::-webkit-scrollbar-thumb) {
        background-color: rgb(63 63 70); /* zinc-700 */
    }

    :global(.virtual-items::-webkit-scrollbar-thumb:hover) {
        background-color: rgb(113 113 122); /* zinc-500 */
    }

    :global(.dark .virtual-items::-webkit-scrollbar-thumb:hover) {
        background-color: rgb(82 82 91); /* zinc-600 */
    }
</style>
