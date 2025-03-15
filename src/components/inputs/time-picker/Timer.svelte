<script lang="ts">
    import { fade, slide } from 'svelte/transition';

    import Input                from '../Input.svelte';
    import type { ShapeInput }  from '$models';

    export let value    : string = '';
    export let id       : string = 'time-picker';
    export let disabled : boolean = false;


    let open            = false;
    let hours           = 12;
    let minutes         = 0;
    let selectedHour    = hours;
    let selectedMinute  = minutes;
    let searchHour      = '';
    let searchMinute    = '';

    // Limpiar búsqueda cuando se cierra el panel
    $: if (!open) {
        searchHour = '';
        searchMinute = '';
    }

    ((): void => {
        if ( !value )  return;

        const [h, m] = value.split( ':' ).map( Number );

        if ( !isNaN( h ) && !isNaN( m )) {
            hours           = h;
            minutes         = m;
            selectedHour    = hours;
            selectedMinute  = minutes;
        }
    })();


    const hoursArray = Array.from({ length: 24 }, (_, i) => i);
    const minutesArray = Array.from({ length: 60 }, (_, i) => i);
    
    function togglePicker() {
        if (!disabled) {
            open = !open;
        }
    }

    // Close the picker when clicking outside
    function handleClickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const picker = document.getElementById(id);

        applySelection();
        
        if ( picker && !picker.contains( target )) {
            open = false;
        }
    }

    function applySelection() {
        hours = selectedHour;
        minutes = selectedMinute;
    }

    // Filtrado de horas y minutos
    $: filteredHours = searchHour 
        ? hoursArray.filter(hour => 
            hour.toString().padStart(2, '0').includes(searchHour)
        )
        : hoursArray;

    $: filteredMinutes = searchMinute 
        ? minutesArray.filter(minute => 
            minute.toString().padStart(2, '0').includes(searchMinute)
        )
        : minutesArray;

    const hourSearchInput: ShapeInput = {
        id: `${id}-hour-search`,
        name: 'hour-search',
        placeholder: 'Buscar hora...',
        type: 'search',
        shape: 'input',
    };

    const minuteSearchInput: ShapeInput = {
        id: `${id}-minute-search`,
        name: 'minute-search',
        placeholder: 'Buscar minuto...',
        type: 'search',
        shape: 'input',
    };
</script>

<svelte:window on:click={handleClickOutside} />

<div class="relative w-full" {id}>
    <button
        {disabled}
        type            = "button"
        id              = {`${id}-input`}
        class          = "w-full px-3 py-2 text-left bg-white dark:bg-zinc-700 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
        aria-haspopup   = "true"
        aria-expanded   = {open}
        on:click       = {togglePicker}
    >
        {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`}
    </button>

    {#if open}
        <div 
            class="absolute float-right right-0 z-40 mt-1 w-1/4 bg-white dark:bg-zinc-700 rounded-md shadow-lg"
            transition:fade={{ duration: 150 }}
        >
            <div class="flex space-x-4 p-3">
                <!-- Hours -->
                <div class="w-1/2">
                    <Input 
                        shapeInput={hourSearchInput}
                        value={searchHour}
                        onInput={(e) => searchHour = (e.target as HTMLInputElement).value}
                    />
                    <div 
                        class="mt-1 h-48 overflow-y-auto pr-2 custom-scrollbar"
                        transition:slide={{ duration: 200 }}
                    >
                        {#each filteredHours as hour}
                            <button
                                type        = "button"
                                class       = "w-full text-left px-3 py-2 rounded-md my-1 
                                    {selectedHour === hour 
                                        ? 'bg-zinc-300 dark:bg-zinc-600 font-medium' 
                                        : 'hover:bg-zinc-100 dark:hover:bg-zinc-600'}"
                                on:click    = {() => selectedHour = hour}
                            >
                                {hour.toString().padStart(2, '0')}
                            </button>
                        {/each}
                    </div>
                </div>

                <!-- Minutes -->
                <div class="w-1/2">
                    <Input 
                        shapeInput={minuteSearchInput}
                        value={searchMinute}
                        onInput={(e) => searchMinute = (e.target as HTMLInputElement).value}
                    />
                    <div 
                        class="mt-1 h-48 overflow-y-auto pr-2 custom-scrollbar"
                        transition:slide={{ duration: 200 }}
                    >
                        {#each filteredMinutes as minute}
                            <button
                                type        = "button"
                                class       = "w-full text-left px-3 py-2 rounded-md my-1 
                                    {selectedMinute === minute 
                                        ? 'bg-zinc-300 dark:bg-zinc-600 font-medium' 
                                        : 'hover:bg-zinc-100 dark:hover:bg-zinc-600'}"
                                on:click    = {() => {selectedMinute = minute; open = false;}}
                            >
                                {minute.toString().padStart(2, '0')}
                            </button>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    /* Custom scrollbar styling */
    .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
    }

    .custom-scrollbar::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    /* Tailwind doesn't have these by default, so we define them */
    :global(.bg-primary-100) {
        background-color: #e0f2fe;
    }

    :global(.text-primary-700) {
        color: #0369a1;
    }

    :global(.bg-primary-600) {
        background-color: #0284c7;
    }

    :global(.hover\:bg-primary-700:hover) {
        background-color: #0369a1;
    }

    :global(.focus\:ring-primary-500:focus) {
        --tw-ring-color: #0ea5e9;
    }

    :global(.focus\:border-primary-500:focus) {
        border-color: #0ea5e9;
    }
</style>
