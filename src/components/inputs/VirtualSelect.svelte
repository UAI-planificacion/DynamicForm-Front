<script lang="ts">
    import { onMount } from 'svelte';

    import { ChevronDown, Check, X } from 'lucide-svelte';

    import type {
        GroupOption,
        ShapeInput,
        ShapeOption,
        SelectInput,
        SelectGroup,
        Selected,
        InputStyle
    }                   from '$models';
    import { Input }    from '$components';
    import { styles }   from '$lib';
    import Info         from './Info.svelte';


    export let shapeInput       : ShapeInput;
    export let value            : Selected = undefined;
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

            if ( isGroupOption( item )) {
                currentOffset += 40 + ( item.values.length * 36 );
            } else {
                currentOffset += 36;
            }

            return position;
        }) ?? [];

        totalHeight = currentOffset;
    }


    function findVisibleRange(
        scrollTop: number
    ): { startIndex: number; endIndex: number } {
        const containerHeight   = calculateDropdownHeight();
        const buffer            = containerHeight;
        const visibleStart      = Math.max(0, scrollTop - buffer);
        const visibleEnd        = scrollTop + containerHeight + buffer;

        let startIndex = itemPositions.findIndex( pos => pos.offset >= visibleStart );

        if ( startIndex === -1 ) startIndex = itemPositions.length;

        let endIndex = itemPositions.findIndex( pos => pos.offset > visibleEnd );

        if ( endIndex === -1 ) endIndex = itemPositions.length;

        return { startIndex, endIndex };
    }


    function updateVisibleItems(): void {
        if ( !filteredData?.length ) return;

        const { startIndex, endIndex } = findVisibleRange( scrollTop );

        visibleItems = filteredData.slice( startIndex, endIndex );

        const topOffset = startIndex > 0 ? ( itemPositions[startIndex]?.offset ?? 0 ) : 0;

        if ( listContainer ) {
            const itemsContainer = listContainer.querySelector( '.virtual-items' ) as HTMLElement;

            if ( itemsContainer ) {
                itemsContainer.style.transform = `translateY(${topOffset}px)`;
            }
        }
    }


    function handleScroll( event: Event ): void {
        const target = event.target as HTMLDivElement;

        scrollTop       = target.scrollTop;
        hoveredIndex    = null;

        updateVisibleItems();
    }


    function clearSelection( event: MouseEvent | KeyboardEvent ): void {
        event?.stopPropagation();
        searchTerm      = '';
        isOpen          = false;
        selectedItems   = [];
        onSelectedChange( undefined );
        setError();
    }


    // Actualizar selectedItems cuando cambia shapeInput.selected o value
    $: {
        selectedItems = [];
        filteredData = shapeInput.options || [];

        // Usar value como prioridad, luego shapeInput.selected como fallback
        const selectedValue = value ?? shapeInput.selected;

        if (selectedValue && shapeInput.options) {
            const selectedValues = Array.isArray(selectedValue)
                ? selectedValue.map(s => typeof s === 'string' ? s : s.values).flat()
                : [selectedValue];

            // Buscar los items seleccionados
            shapeInput.options.forEach(item => {
                if (isGroupOption(item)) {
                    // Si es un grupo, buscar en sus valores
                    const groupSelected = item.values.filter(v => selectedValues.includes(v.value));
                    if (groupSelected.length > 0) {
                        selectedItems = [...selectedItems, ...groupSelected];
                    }
                } else {
                    // Si es una opción individual
                    if (selectedValues.includes((item as ShapeOption).value)) {
                        selectedItems = [...selectedItems, item as ShapeOption];
                    }
                }
            });
        }
    }

    // Calcular el texto a mostrar
    $: displayText = shapeInput.multiple
        ? selectedItems.length > 0
            ? `Se han seleccionado ${selectedItems.length} elementos`
            : shapeInput.placeholder || ''
        : selectedItems[0]?.label || shapeInput.placeholder || '';

    // Actualizar filteredData cuando cambia el término de búsqueda o las opciones
    $: {
        // Siempre actualizar filteredData cuando cambian las opciones
        if (!shapeInput.search || !searchTerm?.trim()) {
            filteredData = shapeInput.options || [];
        } else {
            const searchTermLower = searchTerm.toLowerCase().trim();
            
            if (shapeInput.options?.some(isGroupOption)) {
                filteredData = (shapeInput.options as GroupOption[])
                    .map(group => ({
                        ...group,
                        values: group.values.filter(item =>
                            item.label.toLowerCase().includes(searchTermLower) ||
                            item.value.toLowerCase().includes(searchTermLower)
                        )
                    }))
                    .filter(group => group.values.length > 0);
            } else {
                filteredData = (shapeInput.options as ShapeOption[] || [])
                    .filter(item => 
                        item.label.toLowerCase().includes(searchTermLower) ||
                        item.value.toLowerCase().includes(searchTermLower)
                    );
            }
        }

        // Siempre actualizar las posiciones cuando cambia filteredData
        if (filteredData?.length > 0) {
            calculateItemPositions();
            updateVisibleItems();
        }
    }

    // Limpiar búsqueda y cerrar dropdown cuando se pierde el foco
    function handleBlur(event: CustomEvent): void {
        const target = (event.detail?.event?.relatedTarget ?? event.target) as HTMLElement;
        const container = target?.closest('.virtual-select-container');
        
        if (!container) {
            isOpen = false;
            searchTerm = '';
        }
    }

    // Limpiar búsqueda cuando se cierra el dropdown
    $: if (!isOpen) {
        searchTerm = '';
        hoveredIndex = null;
    }

    // Manejar la selección de un item
    function toggleItem(item: ShapeOption): void {
        const index = selectedItems.findIndex(i => i.value === item.value);
        
        if (shapeInput.multiple) {
            selectedItems = index === -1
                ? [...selectedItems, item]
                : selectedItems.filter(i => i.value !== item.value);

            // Si las opciones son grupos, transformar la selección
            if (shapeInput.options?.some(isGroupOption)) {
                // Buscar el grupo al que pertenece el item
                const parentGroup = (shapeInput.options as GroupOption[])
                .find(g => g.values.some(v => v.value === item.value));

                if ( parentGroup ) {
                    const selectedValues = selectedItems
                        .filter(selected => parentGroup.values.some(v => v.value === selected.value))
                        .map(selected => selected.value);

                    // Si no hay valores seleccionados en este grupo, no lo incluimos
                    const groupedValue = selectedValues.length > 0 
                        ? [{ group: parentGroup.group, values: selectedValues }]
                        : [];

                    // Mantener las selecciones de otros grupos
                    const otherGroups = (shapeInput.options as GroupOption[])
                        .filter(g => g !== parentGroup)
                        .map(g => ({
                            group: g.group,
                            values: selectedItems
                                .filter(selected => g.values.some(v => v.value === selected.value))
                                .map(selected => selected.value)
                        }))
                        .filter(g => g.values.length > 0);

                    onSelectedChange([...groupedValue, ...otherGroups]);
                    setError();
                    return;
                }
            }
        } else {
            selectedItems = [item];
            isOpen = false;
            searchTerm = '';
        }

        // Para casos no agrupados o single select
        const values = selectedItems.map(i => i.value);
        onSelectedChange(shapeInput.multiple ? values : values[0]);
        setError();
    }

    // Manejar la apertura del dropdown
    function handleOpen(): void {
        isOpen = !isOpen;

        if ( isOpen ) adjustDropdownPosition();
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


    function transformSelectedValue( items: ShapeOption[] ): SelectInput {
        if ( !items.length || items.length === 0 ) return [];

        if (!shapeInput.multiple) {
            return items[0].value;
        }

        // Si las opciones no son grupos, retornar string[]
        if (!shapeInput.options?.some(isGroupOption)) {
            return items.map(item => item.value);
        }

        // Agrupar items por grupo
        const groupedItems = items.reduce((acc, item) => {
            // Buscar el grupo al que pertenece el item
            const parentGroup = (shapeInput.options as GroupOption[])
                .find(g => g.values.some(v => v.value === item.value));

            if (parentGroup) {
                const existingGroup = acc.find(g => g.group === parentGroup.group);
                if (existingGroup) {
                    existingGroup.values.push(item.value);
                } else {
                    acc.push({ group: parentGroup.group, values: [item.value] });
                }
            }
            return acc;
        }, [] as SelectGroup[]);

        // Siempre retornar SelectGroup[] cuando las opciones son grupos
        return groupedItems;
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

        onSelectedChange( transformSelectedValue( selectedItems ));
        setError();
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
        const searchHeight = shapeInput.search ? 48 : 0;  // Aumentado para dar más espacio al buscador
        const padding = 16; // Padding total del contenedor (8px arriba y abajo)
        
        let contentHeight = 0;
        
        if (!filteredData?.length) {
            contentHeight = 36; // Altura mínima para "No hay resultados"
        } else {
            contentHeight = filteredData.reduce((height, item) => {
                if (isGroupOption(item)) {
                    // 40px para el header del grupo + 36px por cada elemento en el grupo
                    // Asegurar que siempre haya espacio para al menos un elemento en el grupo
                    return height + 36 + (Math.max(1, item.values.length) * 36);
                }
                return height + 36; // 36px por cada elemento individual
            }, 0);
        }

        // Usar el heightPanel como multiplicador de elementos, cada elemento es 36px
        const maxHeight = (shapeInput.heightPanel ?? 5) * 36;
        
        // Asegurar que siempre haya espacio para al menos el grupo y un elemento
        const minHeight = filteredData?.length && isGroupOption(filteredData[0]) ? 76 : 36;
        
        return Math.max(
            minHeight,
            Math.min(contentHeight + searchHeight + padding, maxHeight)
        );
    }

    function handleClickOutside( event: MouseEvent ): void {
        if ( comboboxElement && !comboboxElement.contains( event.target as Node )) {
            isOpen = false;
        }
    }


    function handleMouseLeave(): void {
        hoveredIndex = null;
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
<div class="relative w-full" bind:this={comboboxElement} >
    <button
        type="button"
        class= { shapeInput.boxStyle ?? `${( styles.select as InputStyle ).box }` }
        on:click={handleOpen}
        id={shapeInput.id}
        disabled={shapeInput.disabled}
    >
        <span class="truncate text-zinc-900 dark:text-zinc-300">{displayText}</span>

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

            <ChevronDown class={`h-4 w-4 transition-transform duration-200 dark:text-zinc-500 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
    </button>

    {#if isOpen}
        <div 
            bind:this={dropdownElement}
            class= { shapeInput.contentStyle ?? `${( styles.select as InputStyle ).content }` }
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
                            placeholder : shapeInput.searchPlaceholder,
                            class_      : shapeInput.class_ ?? (styles.select as InputStyle ).input
                        }}
                        onInput = {( event: Event ) => searchTerm = ( event.target as HTMLInputElement ).value }
                        on:blur = { handleBlur }
                    />
                </div>
            {/if}

            {#if !shapeInput.options?.length}
                <div class="py-3 text-center text-sm text-zinc-500 dark:text-zinc-400">
                    No hay elementos disponibles
                </div>
            {:else if !filteredData?.length}
                <div class="py-3 text-center text-sm text-zinc-500 dark:text-zinc-400">
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
                                            type        = "button"
                                            class       = { shapeInput.groudStyle ?? `${( styles.select as InputStyle ).group }` }
                                            on:click    = { () => toggleGroup( item )}
                                        >
                                            <span class="truncate text-zinc-900 dark:text-zinc-300">{item.group}</span>

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
                                                type            = "button"
                                                class           = { `${shapeInput.itemStyle ?? ( styles.select as InputStyle ).item } px-6` }
                                                data-selected   = {selectedItems.some(selected => selected.value === option.value)}
                                                on:click        = { () => toggleItem( option )}
                                                on:mouseenter   = { () => hoveredIndex = itemKey }
                                                on:mouseleave   = { handleMouseLeave }
                                                role            = "option"
                                                aria-selected   = {selectedItems.some( selected => selected.value === option.value )}
                                            >
                                                <span>{option.label}</span>

                                                {#if selectedItems.some( selected => selected.value === option.value )}
                                                    <Check class="h-4 w-4 text-blue-500" />
                                                {/if}
                                            </button>
                                        {/each}
                                    </div>
                                {:else}
                                    <button
                                        type            = "button"
                                        class           = { shapeInput.itemStyle ?? `${( styles.select as InputStyle ).item }` }
                                        data-hovered    = {hoveredIndex === `item-${i}`}
                                        data-selected   = {selectedItems.some(selected => selected.value === item.value)}
                                        on:click        = { () => toggleItem( item )}
                                        on:mouseenter   = { () => hoveredIndex = `item-${i}` }
                                        on:mouseleave   = { handleMouseLeave }
                                        role            = "option"
                                        aria-selected   = { selectedItems.some( selected => selected.value === item.value )}
                                    >
                                        <span>{item.label}</span>

                                        {#if selectedItems.some( selected => selected.value === item.value )}
                                            <Check class="h-4 w-4 text-blue-500" />
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

    /* [data-hovered="true"] {
        @apply bg-zinc-100 dark:bg-zinc-700;
    }
    
    [data-selected="true"] {
        @apply bg-zinc-300/50 dark:bg-zinc-600;
    } */
</style>
