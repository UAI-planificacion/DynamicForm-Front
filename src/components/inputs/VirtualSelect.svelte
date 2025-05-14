<script lang="ts">
    import { onMount } from 'svelte';

    import { X } from 'lucide-svelte';

    import type {
        GroupOption,
        ShapeInput,
        ShapeOption,
        SelectInput,
        SelectGroup,
        Selected,
        ThemeShape
    }                   from '$models';
    import {
        Input,
        BoxStyle,
        ContentStyle,
        ButtonNavigator
    }                       from '$components';
    import {
        CheckIcon,
        GroupSelectIcon,
        ItemSelectIcon
    }                       from '$icons';
    import Info             from './Info.svelte';
    import { UAITheme }     from '$lib';


    export let shapeInput       : ShapeInput;
    export let value            : Selected = undefined;
    export let onSelectedChange : ( value: SelectInput ) => void;
    export let setError         : VoidFunction = () => {};
    export let themeShape       : ThemeShape = UAITheme();


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
    let itemPositions: { index: number; offset: number; height: number }[] = [];
    let hoveredIndex: string | null = null;

    const GROUP_HEADER_HEIGHT = 40;
    const OPTION_HEIGHT = 36;
    const SCROLL_BUFFER = 200;

    const isGroupOption = (
        item: ShapeOption | GroupOption
    ): item is GroupOption => 'name' in item && 'options' in item;


    function calculateItemPositions(): void {
        let currentOffset = 0;

        itemPositions = filteredData?.map((item, index) => {
            const height = isGroupOption(item) 
                ? GROUP_HEADER_HEIGHT + (item.options.length * OPTION_HEIGHT)
                : OPTION_HEIGHT;

            const position = { 
                index, 
                offset: currentOffset,
                height
            };

            currentOffset += height;
            return position;
        }) ?? [];

        totalHeight = currentOffset;
    }


    function findVisibleRange(
        scrollTop: number
    ): { startIndex: number; endIndex: number } {
        const containerHeight = calculateDropdownHeight();
        const visibleStart = Math.max(0, scrollTop - SCROLL_BUFFER);
        const visibleEnd = scrollTop + containerHeight + SCROLL_BUFFER;

        let startIndex = 0;
        let endIndex = itemPositions.length;

        // Encuentra el primer elemento visible
        for (let i = 0; i < itemPositions.length; i++) {
            const pos = itemPositions[i];
            if (pos.offset + pos.height >= visibleStart) {
                startIndex = Math.max(0, i - 1); // Mantener un elemento extra arriba
                break;
            }
        }

        // Encuentra el último elemento visible
        for (let i = startIndex; i < itemPositions.length; i++) {
            const pos = itemPositions[i];
            if (pos.offset > visibleEnd) {
                endIndex = Math.min(itemPositions.length, i + 1); // Mantener un elemento extra abajo
                break;
            }
        }

        return { startIndex, endIndex };
    }


    function updateVisibleItems(): void {
        if (!filteredData?.length) return;

        const { startIndex, endIndex } = findVisibleRange(scrollTop);
        visibleItems = filteredData.slice(startIndex, endIndex);

        if (listContainer) {
            const itemsContainer = listContainer.querySelector('.virtual-items') as HTMLElement;
            if (itemsContainer) {
                const topOffset = startIndex > 0 ? itemPositions[startIndex].offset : 0;
                itemsContainer.style.transform = `translateY(${topOffset}px)`;
            }
        }
    }


    function handleScroll(event: Event): void {
        const target = event.target as HTMLDivElement;
        scrollTop = target.scrollTop;
        hoveredIndex = null;
        requestAnimationFrame(() => {
            updateVisibleItems();
        });
    }


    function clearSelection( event: MouseEvent | KeyboardEvent ): void {
        event?.stopPropagation();
        event?.preventDefault();
        searchTerm = '';
        isOpen = false;
        selectedItems = [];
        onSelectedChange(undefined);
        setError();
    }


    // Actualizar selectedItems cuando cambia shapeInput.selected o value
    $: {
        selectedItems = [];
        filteredData = shapeInput.options || [];

        // Usar value como prioridad, luego shapeInput.selected como fallback
        const selectedValue = value;
        // const selectedValue = value  ?? shapeInput.selected;

        if (selectedValue && shapeInput.options) {
            const selectedValues = Array.isArray(selectedValue)
                ? selectedValue.map(s => typeof s === 'string' ? s : s.options).flat()
                : [selectedValue];

            // Buscar los items seleccionados
            shapeInput.options.forEach(item => {
                if (isGroupOption(item)) {
                    // Si es un grupo, buscar en sus valores
                    const groupSelected = item.options.filter(v => selectedValues.includes(v.value));
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
                        options: group.options.filter(item =>
                            item.label.toLowerCase().includes(searchTermLower) ||
                            item.value.toLowerCase().includes(searchTermLower)
                        )
                    }))
                    .filter(group => group.options.length > 0);
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
                .find(g => g.options.some(v => v.value === item.value));

                if ( parentGroup ) {
                    const selectedValues = selectedItems
                        .filter(selected => parentGroup.options.some(v => v.value === selected.value))
                        .map(selected => selected.value);

                    // Si no hay valores seleccionados en este grupo, no lo incluimos
                    const groupedValue = selectedValues.length > 0 
                        ? [{ name: parentGroup.name, options: selectedValues }]
                        : [];

                    // Mantener las selecciones de otros grupos
                    const otherGroups = (shapeInput.options as GroupOption[])
                        .filter(g => g !== parentGroup)
                        .map(g => ({
                            name: g.name,
                            options: selectedItems
                                .filter(selected => g.options.some(v => v.value === selected.value))
                                .map(selected => selected.value)
                        }))
                        .filter(g => g.options.length > 0);

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
        group.options
            .every(option => selectedItems
                .some( selected => selected.value === option.value )
        );


    const isGroupPartiallySelected = ( group: GroupOption ): boolean => 
        group.options
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
                .find(g => g.options.some(v => v.value === item.value));

            if (parentGroup) {
                const existingGroup = acc.find(g => g.name === parentGroup.name);
                if (existingGroup) {
                    existingGroup.options.push(item.value);
                } else {
                    acc.push({ name: parentGroup.name, options: [item.value] });
                }
            }
            return acc;
        }, [] as SelectGroup[]);

        // Siempre retornar SelectGroup[] cuando las opciones son grupos
        return groupedItems;
    }

    function toggleGroup( group: GroupOption ): void {
        if ( !shapeInput.multiple ) return;

        const isFullySelected = group.options.every(option => 
            selectedItems.some(selected => selected.value === option.value)
        );

        if ( isFullySelected ) {
            selectedItems = selectedItems.filter( item => 
                !group.options.some( option => option.value === item.value )
            );
        } else {
            const newItems = group.options.filter( option => 
                !selectedItems.some( selected => selected.value === option.value )
            );
            selectedItems = [...selectedItems, ...newItems];
        }

        onSelectedChange( transformSelectedValue( selectedItems ));
        setError();
    }

    function adjustDropdownPosition() {
        if ( !dropdownElement || !comboboxElement ) return;

        const rect              = comboboxElement.getBoundingClientRect();
        const viewportHeight    = window.innerHeight;
        const spaceBelow        = viewportHeight - rect.bottom;
        const spaceAbove        = rect.top;
        const dropdownHeight    = dropdownElement.offsetHeight;

        dropdownElement.style.left = `${rect.left}px`;

        if ( spaceBelow < dropdownHeight && spaceAbove > spaceBelow ) {
            // Position above if there's more space above
            dropdownElement.style.bottom        = `${viewportHeight - rect.top}px`;
            dropdownElement.style.top           = 'auto';
            dropdownElement.style.marginBottom  = '0.25rem';
            dropdownElement.style.marginTop     = '0';
        } else {
            // Position below
            dropdownElement.style.top           = `${rect.bottom}px`;
            dropdownElement.style.bottom        = 'auto';
            dropdownElement.style.marginTop     = '0.25rem';
            dropdownElement.style.marginBottom  = '0';
        }
    }

    function calculateDropdownHeight(): number {
        if (!filteredData?.length) return OPTION_HEIGHT;

        let requestedHeightPanel = shapeInput.heightPanel ?? 5;

        const maxAllowedHeightPanel = 15;
        const effectiveHeightPanel = Math.min(requestedHeightPanel, maxAllowedHeightPanel);
        const hasGroups = filteredData.some(item => isGroupOption(item)); // Verificar si estamos trabajando con grupos

        // Calcular las opciones totales y visibles
        let totalOptions = 0;
        let visibleOptions = 0;

        if ( hasGroups ) {
            // Para GroupOption, calculamos correctamente el espacio
            filteredData.forEach(item => {
                if ( isGroupOption( item )) {
                    // Para cada grupo, contar el header + sus opciones
                    const groupHeaderHeight = GROUP_HEADER_HEIGHT / OPTION_HEIGHT; // Convertir a unidades de opciones
                    const groupOptionsCount = item.options.length;

                    totalOptions += groupHeaderHeight + groupOptionsCount; // Aumentar el total de opciones
                    visibleOptions = Math.min(totalOptions, effectiveHeightPanel); // Para las visibles, limitar al heightPanel efectivo
                } else {
                    // Opción normal
                    totalOptions += 1;
                    visibleOptions = Math.min(totalOptions, effectiveHeightPanel);
                }
            });

            // Asegurar que siempre mostramos al menos el mínimo predeterminado si hay opciones suficientes
            const minVisibleItems = Math.min(totalOptions, 5); // Mínimo predeterminado
            visibleOptions = Math.max(visibleOptions, minVisibleItems);
        } else {
            // Caso simple sin grupos, como antes
            totalOptions = filteredData.length;
            visibleOptions = Math.min(totalOptions, effectiveHeightPanel);
        }

        const itemHeight = OPTION_HEIGHT; // Altura por ítem
        const itemsHeight = visibleOptions * itemHeight; // Espacio para elementos visibles
        const paddingHeight = 16; // Padding del panel

        return itemsHeight + paddingHeight;
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


    const styleSelect = ( ): string => {
    if ( !comboboxElement || !dropdownElement ) return '';

    return `
        min-width    : ${comboboxElement.offsetWidth}px;
        max-width    : ${comboboxElement.offsetWidth}px;
        ${dropdownElement.style.top || ''};
        ${dropdownElement.style.left || ''};
        ${dropdownElement.style.bottom || ''};
        margin-top   : ${dropdownElement.style.marginTop || '0.25rem'};
        margin-bottom: ${dropdownElement.style.marginBottom || '0'};
    `;
};
</script>

<Info { shapeInput } { onSelectedChange } { value } { themeShape }>
<div class="relative w-full" bind:this={comboboxElement} >
    <BoxStyle
        { shapeInput }
        { handleOpen }
        { themeShape }
    >
        <span class="truncate">
            { displayText }
        </span>

        <div class="flex items-center gap-2">
            {#if shapeInput.multiple && selectedItems.length > 0}
                <ButtonNavigator
                    { themeShape }
                    className   = "p-1 rounded-full cursor-pointer"
                    onClick     = {( event ) => clearSelection(event)}
                >
                    <X class="h-3 w-3"/>
                </ButtonNavigator>
            {/if}

            <span class={`inline-flex size-8 items-center justify-center transition-all duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="10" stroke-dashoffset="10" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15l-5 -5M12 15l5 -5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="10;0"/></path></svg>
            </span>
        </div>
    </BoxStyle>

    {#if isOpen}
        <div bind:this={dropdownElement}>
            <ContentStyle
                { themeShape }
                styles={styleSelect()}
                padding="p-0"
            >
                {#if shapeInput.search}
                    <div class="px-1 pt-1 sticky top-0 z-10">
                        <Input
                            { themeShape }
                            shapeInput = {{
                                id		    : 'search-items',
                                name	    : 'label',
                                placeholder : shapeInput.searchPlaceholder,
                            }}
                            onInput = {( value: string ) => searchTerm = value }
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
                        class="virtual-select-container"
                        style="
                            height: {calculateDropdownHeight()}px;
                            overflow-y: auto;
                            position: relative;
                            padding: 0.25rem;
                        "
                        role="listbox"
                        aria-label="Lista de opciones"
                        on:scroll={handleScroll}
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
                                            <ButtonNavigator
                                                { themeShape }
                                                selected    = { isGroupFullySelected(item) }
                                                canHover    = { shapeInput.multiple }
                                                className   = "opacity-80 w-full justify-between px-3 py-2 font-bold"
                                                onClick     = { () => toggleGroup( item )}
                                            >
                                                <div class="flex items-center gap-2">
                                                    <GroupSelectIcon />
                                                    <span class="truncate text-zinc-900 dark:text-zinc-300">{item.name}</span>
                                                </div>

                                                {#if shapeInput.multiple}
                                                    {#if isGroupFullySelected(item)}
                                                        <CheckIcon />
                                                    {:else if isGroupPartiallySelected(item)}
                                                        <span class={`text-zinc-400`}>
                                                            <CheckIcon />
                                                        </span>
                                                    {/if}
                                                {/if}
                                            </ButtonNavigator>

                                            {#each item.options as option}
                                                <ButtonNavigator
                                                    { themeShape }
                                                    selected    = { selectedItems.some(selected => selected.value === option.value )}
                                                    className   = "justify-between w-full px-6 py-2"
                                                    onClick     = { () => toggleItem( option )}
                                                >
                                                    <div class="flex items-center gap-2">
                                                        <ItemSelectIcon />
                                                        <span>{ option.label }</span>
                                                    </div>

                                                    {#if selectedItems.some( selected => selected.value === option.value )}
                                                        <CheckIcon />
                                                    {/if}
                                                </ButtonNavigator>
                                            {/each}
                                        </div>
                                    {:else}
                                        <ButtonNavigator
                                            { themeShape }
                                            selected    = { selectedItems.some( selected => selected.value === item.value )}
                                            className   = "justify-between w-full px-3 py-2"
                                            onClick     = { () => toggleItem( item )}
                                        >
                                            <span>{ item.label }</span>

                                            {#if selectedItems.some( selected => selected.value === item.value )}
                                                <CheckIcon />
                                            {/if}
                                        </ButtonNavigator>
                                    {/if}
                                {/each}
                            </div>
                        </div>
                    </div>
                {/if}
            </ContentStyle>
        </div>
    {/if}
</div>
</Info>
