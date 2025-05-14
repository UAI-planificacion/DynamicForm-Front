<script lang="ts">
    import { v4 as uuid } from 'uuid';
    import { onMount } from 'svelte';

    import {
        COLORS,
        OPACITY,
        tailwindToRGBA,
        TONALITY,
        RING
    } from '$lib/styles/';
    import { Input, VirtualSelect } from "$components";
    import { 
        themeShapeStore,
        updateBackgroundColor,
        updateBackgroundTonality,
        updateBackgroundOpacity,
        updateBackground,
        updateColorColor,
        updateColorTonality,
        updateColorOpacity,
        updateColor,
        updateRingColor,
        updateRingTonality,
        updateRingOpacity,
        updateRing,
        updateFocusEvent
    } from '$stores/theme-shape';

    // Propiedades del componente - solo necesitamos el nombre y el modo de color
    export let name: string;
    export let colorTheme: 'light' | 'dark' = 'light';
    
    // Obtener el tema actual del store
    $: currentTheme = $themeShapeStore;
    
    // Variables locales para los valores
    let color = '';
    let tonality = '';
    let opacity = '';
    let type = '';
    let size: string = '';
    
    // Definir evento personalizado
    const dispatchChangeEvent = () => {
        const event = new CustomEvent('change', {
            bubbles: true,
            cancelable: true,
            detail: { name, colorTheme, color, tonality, opacity, type, size }
        });
        
        // Disparar el evento desde el elemento actual
        if (typeof document !== 'undefined') {
            document.dispatchEvent(event);
        }
    };
    
    // Inicializar valores desde el store cuando cambia el tema o el modo de color
    $: if (currentTheme && currentTheme[colorTheme]) {
        updateLocalValues();
    }
    
    // Función para actualizar los valores locales desde el store
    function updateLocalValues() {
        if (!currentTheme || !currentTheme[colorTheme]) return;
        
        // Determinar qué valores obtener según el nombre del componente
        if (name.toLowerCase().includes('fondo')) {
            color = currentTheme[colorTheme].backgroundColor || '';
            tonality = currentTheme[colorTheme].backgroundTonality || '';
            opacity = currentTheme[colorTheme].backgroundOpacity || '';
            type = currentTheme[colorTheme].background || '';
        } else if (name.toLowerCase().includes('texto')) {
            color = currentTheme[colorTheme].colorColor || '';
            tonality = currentTheme[colorTheme].colorTonality || '';
            opacity = currentTheme[colorTheme].colorOpacity || '';
            type = currentTheme[colorTheme].color || '';
        } else if (name.toLowerCase().includes('borde')) {
            if (name.toLowerCase().includes('foco')) {
                // Es un evento de foco
                color = currentTheme[colorTheme]?.event?.focus?.ringColor || '';
                tonality = currentTheme[colorTheme]?.event?.focus?.ringTonality || '';
                opacity = currentTheme[colorTheme]?.event?.focus?.ringOpacity || '';
                type = currentTheme[colorTheme]?.event?.focus?.ring || '';
                size = currentTheme[colorTheme]?.event?.focus?.ringSize || '';
            } else {
                // Es un borde normal
                color = currentTheme[colorTheme].ringColor || '';
                tonality = currentTheme[colorTheme].ringTonality || '';
                opacity = currentTheme[colorTheme].ringOpacity || '';
                type = currentTheme[colorTheme].ring || '';
            }
        }
    }

    // Función para actualizar el tipo
    function updateType(value: string): void {
        type = value === 'transparent' || value === 'currentColor' || value === 'black' || value === 'white' 
            ? value
            : tailwindToRGBA(`${type}-${color}-${tonality}/${opacity}`);
    }

    // Función para actualizar el store según el tipo de componente
    function updateStore(): void {
        // Determinar qué actualizar según el nombre del componente
        if (name.toLowerCase().includes('fondo')) {
            updateBackgroundColor(colorTheme, color);
            updateBackgroundTonality(colorTheme, tonality);
            updateBackgroundOpacity(colorTheme, opacity);
            updateBackground(colorTheme, type);
        } else if (name.toLowerCase().includes('texto')) {
            updateColorColor(colorTheme, color);
            updateColorTonality(colorTheme, tonality);
            updateColorOpacity(colorTheme, opacity);
            updateColor(colorTheme, type);
        } else if (name.toLowerCase().includes('borde')) {
            if (name.toLowerCase().includes('foco')) {
                // Es un evento de foco
                updateFocusEvent(colorTheme, {
                    ringColor: color,
                    ringTonality: tonality,
                    ringOpacity: opacity,
                    ring: type,
                    ringSize: size || ''
                });
            } else {
                // Es un borde normal
                updateRingColor(colorTheme, color);
                updateRingTonality(colorTheme, tonality);
                updateRingOpacity(colorTheme, opacity);
                updateRing(colorTheme, type);
            }
        }
        
        // Disparar evento personalizado
        dispatchChangeEvent();
    }
    
    // Inicializar valores al montar el componente
    onMount(() => {
        updateLocalValues();
    });
</script>

<VirtualSelect
    value       = { color }
    shapeInput  = {{
        id          : uuid(),
        name        : name,
        label       : `Color del ${name}`,
        placeholder : `Ingrese el color del ${name}`,
        search      : true,
        searchPlaceholder : `Ingrese el color del ${name}`,
        options     : COLORS
    }}
    onSelectedChange = {( value ) => {
        if ( value instanceof Array || value === undefined ) return;
        color = value;
        updateType( value );
        updateStore();
    }}
/>

<VirtualSelect
    value       = { tonality }
    shapeInput  = {{
        id          : uuid(),
        name        : `${type}-tonality`,
        label       : 'Tonalidad',
        placeholder : 'Ingrese la tonalidad',
        search      : true,
        searchPlaceholder : 'Ingrese la tonalidad',
        options     : TONALITY
    }}
    onSelectedChange = {( value ) => {
        if ( value instanceof Array || value === undefined ) return;
        tonality = value;
        updateType( value );
        updateStore();
    }}
/>

<VirtualSelect
    value       = { opacity }
    shapeInput  = {{
        id          : uuid(),
        name        : `${type}-opacity`,
        label       : 'Opacidad',
        placeholder : 'Ingrese la opacidad',
        search      : true,
        searchPlaceholder : 'Ingrese la opacidad',
        options     : OPACITY
    }}
    onSelectedChange = {( value ) => {
        if ( value instanceof Array || value === undefined ) return;
        opacity = value;
        updateType( value );
        updateStore();
    }}
/>

{#if name.toLowerCase().includes('foco') || size}
    <VirtualSelect
        value       = { size }
        shapeInput  = {{
            id                  : uuid(),
            name                : 'ring',
            label               : 'Borde',
            placeholder         : 'Ingrese el borde',
            search              : true,
            searchPlaceholder   : 'Ingrese el borde',
            options             : RING
        }}
        onSelectedChange = {( value ) => {
            if ( value instanceof Array || value === undefined ) return;
            size = value;
            updateStore();
        }}
    />
{/if}

<div class="flex gap-2 items-end justify-center">
    <Input
        shapeInput = {{
            id          : uuid(),
            name        : `${type}-custom`,
            label       : 'Custom',
            placeholder : 'Ingrese el color customizado',
        }}
        value      = { type }
        onInput    = {( value: string ) => {type = value; updateStore(); }}
    />

    <!-- svelte-ignore element_invalid_self_closing_tag -->
    <div
        class="size-9 rounded-full mb-2 px-4 border-2 border-zinc-500"
        style="background-color: {type}"
    />
</div>
