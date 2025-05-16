<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte';
    import Popover from './Popover.svelte';
    import ColorCanvas from './ColorCanvas.svelte';
    import Slider from './Slider.svelte';
    import { rgbaToString, stringToRgba, hsvToRgb, rgbToHsv } from './colorUtils';


    export let color: string;
    export let disabled = false;
    export let id: string;


    let rgba = { r: 255, g: 0, b: 0, a: 1 };
    let hsv = { h: 0, s: 1, v: 1 };
    let hue = 0;
    let saturation = 1;
    let value = 1;
    let alpha = 1;
    let inputValue = '';
    let showPopover = false;
    let colorPickerEl: HTMLElement;


    const dispatch = createEventDispatcher();


    $: if (color && color !== inputValue) {
        updateInternalState(color);
    }


    onMount(() => {
        if (color) {
            updateInternalState(color);
        }
    });


    function updateInternalState(newColor: string): void {
        if (!newColor) return;

        try {
            rgba = stringToRgba(newColor);
            hsv = rgbToHsv(rgba.r, rgba.g, rgba.b);
            hue = hsv.h;
            saturation = hsv.s;
            value = hsv.v;
            alpha = rgba.a;

            inputValue = newColor;
        } catch (error) {
            console.error('Invalid color format:', error);
        }
    }


    export function changeColor(newColor: string): void {
        updateInternalState(newColor);
        notifyColorChange();
    }


    function handleColorSelection(event: CustomEvent): void {
        saturation = event.detail.s;
        value = event.detail.v;
        updateColor();
    }


    function handleHueChange(event: CustomEvent): void {
        hue = event.detail.value;
        updateColor();
    }


    function handleAlphaChange(event: CustomEvent): void {
        alpha = event.detail.value;
        updateColor();
    }


    function notifyColorChange(): void {
        const colorString = rgbaToString(rgba);
        dispatch('change', { color: colorString });
    }


    function updateColor(): void {
        const rgb = hsvToRgb(hue, saturation, value);
        rgba = { ...rgb, a: alpha };
        const colorString = rgbaToString(rgba);
        inputValue = colorString;

        dispatch('change', { color: colorString });
    }
        
    function handleInputChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        const newValue = input.value;
        inputValue = newValue;
        
        try {
            updateInternalState(newValue);
            notifyColorChange();
        } catch (error) {
            console.error('Invalid color format:', error);
        }
    }


    function togglePopover(): void {
        if (!disabled) {
            showPopover = !showPopover;
        }
    }


    function closePopover(): void {
        showPopover = false;
    }
</script>

<div class="relative inline-block w-full" bind:this={colorPickerEl}>
    <div 
        class="w-full color-picker-group justify-between flex items-center pr-1 rounded-md ring-1 ring-zinc-300 dark:ring-zinc-700 focus-within:ring-2 focus-within:ring-zinc-400 dark:focus-within:ring-zinc-500 {disabled ? 'opacity-50' : ''}"
    >
        <input
            type="text"
            class="text-sm ring-0 focus:ring-0 h-9 dark:text-zinc-300 bg-transparent border-none focus:outline-none {disabled ? 'cursor-not-allowed' : ''}"
            value={inputValue}
            on:change={handleInputChange}
            disabled={disabled}
        />

        <button
            {id}
            type="button"
            class="size-7 rounded-md cursor-pointer focus:outline-none {disabled ? 'cursor-not-allowed' : ''}"
            on:click={togglePopover}
            disabled={disabled}
            aria-label="Select color"
        >
            <div 
                class="w-full h-full rounded-md" 
                style="background-color: {color}; background-image: linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%); background-size: 8px 8px; background-position: 0 0, 0 4px, 4px -4px, -4px 0px;"
            >
                <div class="w-full h-full rounded-md" style="background-color: {color};"></div>
            </div>
        </button>
    </div>

    {#if showPopover}
        <Popover on:close={closePopover}>
            <div>
                <ColorCanvas 
                    {hue} 
                    selectedSaturation={saturation} 
                    selectedValue={value} 
                    on:select={handleColorSelection} 
                />

                <div class="space-y-3 mt-1">
                    <Slider 
                        label="Hue" 
                        min={0} 
                        max={360} 
                        value={hue} 
                        gradient="linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)" 
                        on:change={handleHueChange} 
                    />

                    <Slider 
                        label="Opacity" 
                        min={0} 
                        max={1} 
                        step={0.01} 
                        value={alpha} 
                        checkerboard={true}
                        gradientColor={rgbaToString({ ...rgba, a: 1 })}
                        on:change={handleAlphaChange} 
                    />
                </div>
            </div>
        </Popover>
    {/if}
</div>