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


    export let shapeInput       : ShapeInput;
    export let value            : string | string[] | undefined = undefined;
    export let onSelectedChange : ( value: SelectInput ) => void;
    export let setError         : VoidFunction = () => {};

    let searchTerm = '';
    let isOpen = false;
    let selectedItems: ShapeOption[] = [];
    let filteredData: ShapeOption[] | GroupOption[] | undefined = [];
    let comboboxElement: HTMLDivElement;
    let listContainer: HTMLDivElement;
    let scrollTop = 0;
    let visibleItems: ShapeOption[] | GroupOption[] = [];
    let totalHeight = 0;
    let itemPositions: { index: number; offset: number }[] = [];
    let hoveredIndex: number | null = null;

    const ITEM_HEIGHT = 40; // Height of each item in pixels
    const GROUP_HEADER_HEIGHT = 40; // Height of group headers
    const CONTAINER_HEIGHT = 36 * ( shapeInput.heightPanel ?? 5 ); // Max height of the dropdown
    const BUFFER_ITEMS = 1; // Number of items to render above/below visible area


    const isGroupOption = (
        item: ShapeOption | GroupOption
    ): item is GroupOption => 'group' in item && 'values' in item;


    function calculateItemPositions( items: ShapeOption[] | GroupOption[] ): void {
        let currentOffset = 0;

        itemPositions = items.map(( item, index ) => {
            const position = { index, offset: currentOffset };

            if ( isGroupOption( item )) {
                currentOffset += GROUP_HEADER_HEIGHT + ( item.values.length * ITEM_HEIGHT );
            } else {
                currentOffset += ITEM_HEIGHT;
            }

            return position;
        });

        totalHeight = currentOffset;
    }


    function findVisibleRange( scrollTop: number ): { startIndex: number; endIndex: number } {
        const visibleStart  = Math.max( 0, scrollTop - ( ITEM_HEIGHT * BUFFER_ITEMS ));
        const visibleEnd    = scrollTop + CONTAINER_HEIGHT + ( ITEM_HEIGHT * BUFFER_ITEMS );

        let startIndex = itemPositions.findIndex( pos => pos.offset >= visibleStart );

        if ( startIndex === -1 ) startIndex = 0;

        let endIndex = itemPositions.findIndex( pos => pos.offset > visibleEnd );

        if (endIndex === -1) endIndex = itemPositions.length;
    
        return {
            startIndex  : Math.max( 0, startIndex - 1 ),
            endIndex    : Math.min( itemPositions.length, endIndex + 1 )
        };
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

        calculateItemPositions( filteredData! );
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
        : selectedItems[0]?.label || 'Seleccionar elemento';


    function handleClickOutside( event: MouseEvent ): void {
        if ( comboboxElement && !comboboxElement.contains( event.target as Node )) {
            isOpen = false;
        }
    }


    function handleMouseLeave(): void {
        hoveredIndex = null;
    }

    function handleMouseEnter(index: number): void {
        hoveredIndex = index;
    }


    onMount(() => {
        document.addEventListener( 'click', handleClickOutside );
        calculateItemPositions( filteredData ?? [] );
        updateVisibleItems();

        return () => {
            document.removeEventListener( 'click', handleClickOutside );
        }
    });
</script>


<Info { shapeInput } { onSelectedChange } { value }>
<div class="relative w-full" bind:this={comboboxElement}>
    <button
        type        = "button"
        class       = "flex w-full items-center justify-between rounded-lg border-[1.5px] border-zinc-200 bg-white px-3 py-2 text-sm transition-all hover:bg-zinc-100 focus-visible:outline-none focus-visible:border-[2px] focus-visible:border-zinc-400 dark:focus-visible:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
        on:click    = {() => (isOpen = !isOpen)}
    >
        <span class="truncate text-zinc-500 dark:text-zinc-300">{displayText}</span>

        <div class="flex items-center gap-2">
            {#if shapeInput.multiple && selectedItems.length > 0}
                <div
                    class       = "p-1 hover:bg-zinc-300 dark:hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
                    on:click    = { clearSelection }
                    title       = "Limpiar selección"
                    role        = "button"
                    on:keydown  = {( event ) => { if ( event.key === 'Enter' || event.key === ' ' ) clearSelection( event ); }}
                    tabindex    = "0" 
                >
                    <X class="h-3 w-3 text-gray-400"/>
                </div>
            {/if}

            <ChevronDown class={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
    </button>

    {#if isOpen}
        <div class="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-md animate-slideDown dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50">
            {#if shapeInput.search}
                <div class="sticky top-0 p-2 bg-white border-b border-zinc-200 z-10 dark:bg-zinc-800 dark:border-zinc-700">
                    <input
                        bind:value={searchTerm}
                        type        = "search"
                        class       = "flex h-9 w-full rounded-lg border-[1.5px] border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm transition-all placeholder:text-zinc-500 focus-visible:outline-none focus-visible:border-[2px] focus-visible:border-zinc-400 dark:focus-visible:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-400"
                        placeholder = { shapeInput.searchPlaceholder }
                    />
                </div>
            {/if}

            {#if !filteredData?.length}
                <div class="p-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
                    No se encontraron elementos
                </div>
            {:else}
                <div
                    bind:this={listContainer}
                    class       ="overflow-auto z-50"
                    style       ="height: {CONTAINER_HEIGHT}px;"
                    on:scroll   ={ handleScroll }
                    role="listbox"
                    aria-label="Lista de opciones"
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
                            {#each visibleItems as item, index}
                                {#if isGroupOption(item)}
                                    <div class="group">
                                        <button
                                            type="button"
                                            class="flex w-full items-center justify-between px-3 py-2 text-sm font-semibold bg-gray-50 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
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

                                        {#each item.values as option}
                                            <button
                                                type="button"
                                                class="flex w-full items-center justify-between px-6 py-2 text-sm transition-colors rounded-lg focus-visible:outline-none focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-700 {hoveredIndex === index ? 'bg-zinc-100 dark:bg-zinc-700' : ''} {selectedItems.some(i => i.value === option.value) ? 'bg-zinc-200 dark:bg-zinc-600' : ''}"
                                                on:click={() => toggleItem(option)}
                                                on:mouseenter={() => handleMouseEnter(index)}
                                                on:mouseleave={handleMouseLeave}
                                                role="option"
                                                aria-selected={selectedItems.some(i => i.value === option.value)}
                                            >
                                                <span>{option.label}</span>

                                                {#if selectedItems.some(i => i.value === option.value)}
                                                    <Check class="h-4 w-4 text-green-600" />
                                                {/if}
                                            </button>
                                        {/each}
                                    </div>
                                {:else}
                                    <button
                                        type="button"
                                        class="flex w-full items-center justify-between px-3 py-2 text-sm transition-colors rounded-lg focus-visible:outline-none focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-700 {hoveredIndex === index ? 'bg-zinc-100 dark:bg-zinc-700' : ''} {selectedItems.some(selected => selected.value === item.value) ? 'bg-zinc-200 dark:bg-zinc-600' : ''}"
                                        on:click={() => toggleItem(item)}
                                        on:mouseenter={() => handleMouseEnter(index)}
                                        on:mouseleave={handleMouseLeave}
                                        role="option"
                                        aria-selected={selectedItems.some(selected => selected.value === item.value)}
                                    >
                                        <span>{item.label}</span>

                                        {#if selectedItems.some(i => i.value === item.value)}
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
