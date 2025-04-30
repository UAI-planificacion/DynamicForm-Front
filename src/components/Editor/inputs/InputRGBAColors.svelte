<script lang="ts">
    import { v4 as uuid } from 'uuid';

    import {
        COLORS,
        TRANSPARENCY_100,
        tailwindToRGBA,
        TONALITY,
        RING
    }                               from '$lib/styles/';
    import { Input, VirtualSelect } from "$components";


    export let name         : string;
    export let color        : string;
    export let tonality     : string;
    export let transparency : string;
    export let type         : string;
    export let size         : string | null = null;

    type = tailwindToRGBA(`${type}-${ color }-${ tonality }/${ transparency }`)
</script>

<div class={`grid grid-cols-1 @xl:grid-cols-[1.5fr,1fr,1fr,1fr${size !== null ? ',1fr' : ''}] gap-2 items-start`}>
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
            type = value === 'transparent' || value === 'currentColor' || value === 'black' || value === 'white' 
                ? value
                : tailwindToRGBA(`${type}-${ color }-${ tonality }/${ transparency }`);
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
            type = value === 'transparent' || value === 'currentColor' || value === 'black' || value === 'white' 
                ? value
                : tailwindToRGBA(`${type}-${ color }-${ tonality }/${ transparency }`);
        }}
    />

    <VirtualSelect
        value       = { transparency }
        shapeInput  = {{
            id          : uuid(),
            name        : `${type}-transparency`,
            label       : 'Transparencia',
            placeholder : 'Ingrese la transparencia',
            search      : true,
            searchPlaceholder : 'Ingrese la transparencia',
            options     : TRANSPARENCY_100
        }}
        onSelectedChange = {( value ) => {
            if ( value instanceof Array || value === undefined ) return;
            transparency = value;
            type = value === 'transparent' || value === 'currentColor' || value === 'black' || value === 'white' 
                ? value
                : tailwindToRGBA(`${type}-${ color }-${ tonality }/${ transparency }`);
        }}
    />

    {#if size}
        <VirtualSelect
            value       = { size}
            shapeInput  = {{
                id                  : uuid(),
                name                : 'ring',
                label               : 'Anillo',
                placeholder         : 'Ingrese el anillo',
                search              : true,
                searchPlaceholder   : 'Ingrese el anillo',
                options             : RING
            }}
            onSelectedChange = {( value ) => {
                if ( value instanceof Array || value === undefined ) return;
                size = value;
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
            onInput    = {( value: string ) => type = value }
        />

        <div class="w-8 h-8 rounded-full mb-2 px-4" style="background-color: {type}"></div>
    </div>
</div>
