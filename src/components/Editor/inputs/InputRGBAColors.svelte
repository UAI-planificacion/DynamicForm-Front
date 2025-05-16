<script lang="ts">
    import { onMount } from 'svelte';

    import { v4 as uuid } from 'uuid';

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
        updateSecondaryBackgroundColor,
        updateSecondaryBackgroundTonality,
        updateSecondaryBackgroundOpacity,
        updateSecondaryBackground,
        updateSecondaryColorColor,
        updateSecondaryColorTonality,
        updateSecondaryColorOpacity,
        updateSecondaryColor,
        updateRingColor,
        updateRingTonality,
        updateRingOpacity,
        updateRing,
        updateFocusEvent,

        updateThemeName

    }                           from '$stores/theme-shape';
    import {
        COLORS,
        OPACITY,
        tailwindToRGBA,
        TONALITY,
        RING
    }                           from '$lib/styles/';
    import { VirtualSelect }    from "$components";
    import ColorPicker          from './colorpicker/ColorPicker.svelte';


    export let name: string;
    export let colorTheme: 'light' | 'dark' = 'light';


    $: currentTheme = $themeShapeStore;


    let color = '';
    let tonality = '';
    let opacity = '';
    let type = '';
    let size: string = '';


    const dispatchChangeEvent = () => {
        const event = new CustomEvent('change', {
            bubbles: true,
            cancelable: true,
            detail: { name, colorTheme, color, tonality, opacity, type, size }
        });

        if (typeof document !== 'undefined') {
            document.dispatchEvent(event);
        }
    };


    $: if (currentTheme && currentTheme[colorTheme]) {
        updateLocalValues();
    }


    function updateLocalValues() {
        if (!currentTheme || !currentTheme[colorTheme]) return;

        if (name.toLowerCase().includes('fondo')) {
            if (name.toLowerCase().includes('secundario')) {
                color = currentTheme[colorTheme].secondaryBackgroundColor || '';
                tonality = currentTheme[colorTheme].secondaryBackgroundTonality || '';
                opacity = currentTheme[colorTheme].secondaryBackgroundOpacity || '';
                type = currentTheme[colorTheme].secondaryBackground || '';
            } else {
                color = currentTheme[colorTheme].backgroundColor || '';
                tonality = currentTheme[colorTheme].backgroundTonality || '';
                opacity = currentTheme[colorTheme].backgroundOpacity || '';
                type = currentTheme[colorTheme].background || '';
            }
        } else if (name.toLowerCase().includes('texto')) {
            if (name.toLowerCase().includes('secundario')) {
                color = currentTheme[colorTheme].secondaryColorColor || '';
                tonality = currentTheme[colorTheme].secondaryColorTonality || '';
                opacity = currentTheme[colorTheme].secondaryColorOpacity || '';
                type = currentTheme[colorTheme].secondaryColor || '';
            } else {
                color = currentTheme[colorTheme].colorColor || '';
                tonality = currentTheme[colorTheme].colorTonality || '';
                opacity = currentTheme[colorTheme].colorOpacity || '';
                type = currentTheme[colorTheme].color || '';
            }
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


    function updateType(value: string): void {
        type = value === 'transparent' || value === 'currentColor' || value === 'black' || value === 'white' 
            ? value
            : tailwindToRGBA(`${type}-${color}-${tonality}/${opacity}`);
    }


    function updateStore(): void {
        if (name.toLowerCase().includes('fondo')) {
            if (name.toLowerCase().includes('secundario')) {
                updateSecondaryBackgroundColor(colorTheme, color);
                updateSecondaryBackgroundTonality(colorTheme, tonality);
                updateSecondaryBackgroundOpacity(colorTheme, opacity);
                updateSecondaryBackground(colorTheme, type);
            } else {
                updateBackgroundColor(colorTheme, color);
                updateBackgroundTonality(colorTheme, tonality);
                updateBackgroundOpacity(colorTheme, opacity);
                updateBackground(colorTheme, type);
            }
        } else if (name.toLowerCase().includes('texto')) {
            if (name.toLowerCase().includes('secundario')) {
                updateSecondaryColorColor(colorTheme, color);
                updateSecondaryColorTonality(colorTheme, tonality);
                updateSecondaryColorOpacity(colorTheme, opacity);
                updateSecondaryColor(colorTheme, type);
            } else {
                updateColorColor(colorTheme, color);
                updateColorTonality(colorTheme, tonality);
                updateColorOpacity(colorTheme, opacity);
                updateColor(colorTheme, type);
            }
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

        dispatchChangeEvent();
        updateThemeName('custom' );
    }


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

<div class="w-full space-y-1.5">
    {#if  true}
    {@const id = uuid()}
    <label for={id} class="text-sm font-medium dark:text-zinc-300">Color</label>

    <ColorPicker id={id} color={type} on:change={( colorEvent )=> {
        type = colorEvent.detail.color;
        updateStore();
    }} />
    {/if}
</div>