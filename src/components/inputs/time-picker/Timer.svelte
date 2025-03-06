<script lang="ts">
    import { fade, slide } from 'svelte/transition';

    export let value    : string = "12:00";
    export let label    : string = "Select Time";
    export let id       : string = "time-picker";
    export let required : boolean = false;
    export let disabled : boolean = false;

    let open            = false;
    let hours           = 12;
    let minutes         = 0;
    let selectedHour    = hours;
    let selectedMinute  = minutes;
    
    const parseInitialValue = () => {
        if (value) {
            const [h, m] = value.split(':').map(Number);
            if (!isNaN(h) && !isNaN(m)) {
                hours = h;
                minutes = m;
                selectedHour = hours;
                selectedMinute = minutes;
            }
        }
    };

    parseInitialValue();

    const getFormattedTime = (): string => {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    // let formattedTime = getFormattedTime();

    // // Update formatted time manually whenever hours or minutes change
    // $: {
    //     formattedTime = getFormattedTime();
    // }

    // $: value = formattedTime;
    
    // Generate arrays for hours and minutes
    const hoursArray = Array.from({ length: 24 }, (_, i) => i);
    const minutesArray = Array.from({ length: 60 }, (_, i) => i);
    
    // Toggle the time picker dropdown
    function togglePicker() {
        if (!disabled) {
            open = !open;
        }
    }
    
    // Close the picker when clicking outside
    function handleClickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const picker = document.getElementById(id);
        
        if ( picker && !picker.contains( target )) {
            open = false;
        }
    }
    
    // Apply selection
    function applySelection() {
        hours = selectedHour;
        minutes = selectedMinute;
        open = false;
    }

    // Cancel selection
    function cancelSelection() {
        selectedHour = hours;
        selectedMinute = minutes;
        open = false;
    }

    let value2 = ''
</script>

<svelte:window on:click={handleClickOutside} />

<div class="relative w-full max-w-xs" {id}>
    <label for={`${id}-input`} class="block text-sm font-medium text-gray-700 mb-1">
        {label} {required ? '*' : ''}
    </label>

    <!-- <button
        {disabled}
        type            = "button"
        id              = {`${id}-input`}
        class           = "w-full px-4 py-2 text-left bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 {disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}"
        on:click        = {togglePicker}
        aria-haspopup   = "true"
        aria-expanded   = {open}
    >
        { formattedTime }
    </button> -->

    <!-- bind:value={ value2} -->
    <input
    value       = {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`}
        type        = "search"
        name        = "time"
        id          = "time"
        class       = "rounded-lg w-full"
        on:click    = {()  => open = !open }
        on:input = {() => {
            console.log('🚀 ~ file: Timer.svelte:106 ~ value:', value2)
        }}
    >

    {#if open}
        <div 
            class="absolute z-10 mt-1 w-full bg-white dark:bg-zinc-700 rounded-md shadow-lg"
            transition:fade={{ duration: 150 }}
        >
            <div class="p-3">
                <div class="flex justify-between mb-4">
                    <div class="text-sm font-medium text-gray-700 dark:text-white">Select Time</div>
                </div>

                <div class="flex space-x-4">
                    <!-- Hours -->
                    <div class="w-1/2">
                        <div class="text-xs text-gray-500 mb-1">Hora</div>
                        <div 
                            class="h-48 overflow-y-auto pr-2 custom-scrollbar"
                            transition:slide={{ duration: 200 }}
                        >
                            {#each hoursArray as hour}
                                <button
                                    type        = "button"
                                    class       = "w-full text-left px-3 py-2 rounded-md my-1 {selectedHour === hour ? 'bg-primary-100 text-primary-700 font-medium' : 'hover:bg-gray-100'}"
                                    on:click    = {() => selectedHour = hour}
                                >
                                    {hour.toString().padStart(2, '0')}
                                </button>
                            {/each}
                        </div>
                    </div>

                    <!-- Minutes -->
                    <div class="w-1/2">
                        <div class="text-xs text-gray-500 mb-1">Minutos</div>
                        <div 
                            class="h-48 overflow-y-auto pr-2 custom-scrollbar"
                            transition:slide={{ duration: 200 }}
                        >
                            {#each minutesArray as minute}
                                <button
                                    type        = "button"
                                    class       = "w-full text-left px-3 py-2 rounded-md my-1 {selectedMinute === minute ? 'bg-primary-100 text-primary-700 font-medium' : 'hover:bg-gray-100'}"
                                    on:click    = {() => selectedMinute = minute}
                                >
                                    {minute.toString().padStart(2, '0')}
                            </button>
                            {/each}
                        </div>
                    </div>
                </div>

                <div class="flex justify-end space-x-2 mt-4">
                    <button
                        type        = "button"
                        class       = "px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                        on:click    = { cancelSelection }
                    >
                        Cancelar
                    </button>                    

                    <button
                        type        = "button"
                        class       = "px-3 py-1 text-sm bg-primary-600 text-white hover:bg-primary-700 rounded-md"
                        on:click    = { applySelection }
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    /* Custom scrollbar styling */
    .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
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
