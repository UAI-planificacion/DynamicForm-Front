<script lang="ts">
    import { fade, slide } from 'svelte/transition';

    import type {
        InputStyle,
        ShapeInput
    }                   from '$models';
    import Input        from '../Input.svelte';
    import { styles }   from '$lib';
    import Info from '../Info.svelte';
  import { TimerIcon } from 'lucide-svelte';


    export let shapeInput   : ShapeInput;
    export let value        : string | undefined = undefined;
    export let onInput      : ( event: Event ) => void;
    export let setError     : VoidFunction = () => {};


    let open            = false;
    let hours           = 12;
    let minutes         = 0;
    let selectedHour    = hours;
    let selectedMinute  = minutes;
    let searchHour      = '';
    let searchMinute    = '';

    // Limpiar búsqueda cuando se cierra el panel
    $: if ( !open ) {
        searchHour      = '';
        searchMinute    = '';
    }

    ((): void => {
        if ( !shapeInput.value )  return;

        const [h, m] = shapeInput.value.split( ':' ).map( Number );

        if ( !isNaN( h ) && !isNaN( m )) {
            hours           = h;
            minutes         = m;
            selectedHour    = hours;
            selectedMinute  = minutes;
        }
    })();


    // const hoursArray = Array.from({ length: 24 }, (_, i) => i);
    // const minutesArray = Array.from({ length: 60 }, (_, i) => i);

    function togglePicker() {
        if (!shapeInput.disabled) {
            open = !open;
        }
    }

    // Close the picker when clicking outside
    function handleClickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const picker = document.getElementById(shapeInput.id);

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
        ? shapeInput.time?.hourList.filter(hour => 
            hour.toString().padStart(2, '0').includes(searchHour)
        )
        : shapeInput.time?.hourList;

    $: filteredMinutes = searchMinute 
        ? shapeInput.time?.minuteList.filter(minute => 
            minute.toString().padStart(2, '0').includes(searchMinute)
        )
        : shapeInput.time?.minuteList;

    const hourSearchInput: ShapeInput = {
        id: `${shapeInput.id}-hour-search`,
        name: 'hour-search',
        placeholder: 'Buscar hora...',
        type: 'search',
        shape: 'input',
    };

    const minuteSearchInput: ShapeInput = {
        id: `${shapeInput.id}-minute-search`,
        name: 'minute-search',
        placeholder: 'Buscar minuto...',
        type: 'search',
        shape: 'input',
    };
</script>

<svelte:window on:click={handleClickOutside} />

<Info { shapeInput } { value } { onInput }>

<div class="relative w-full" id={ shapeInput.id }>
    <button
        disabled        = { shapeInput.disabled }
        type            = "button"
        id              = { `${shapeInput.id}-input` }
        class           = {`${( styles.datepicker as InputStyle ).box} flex justify-between items-center` }
        aria-haspopup   = "true"
        aria-expanded   = {open}
        on:click       = {togglePicker}
    >
        {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`}

        <TimerIcon class="w-5 h-5" />
    </button>

    {#if open}
        <div 
            class="absolute float-right right-0 z-40 mt-1 max-w-96 bg-white dark:bg-zinc-800 rounded-md shadow-lg"
            transition:fade={{ duration: 150 }}
        >
            <div class="flex p-3">
                <div class="flex items-center gap-2">
                    <div class="w-full flex flex-col gap-3">
                        <Input 
                            shapeInput  = { hourSearchInput }
                            onInput     = {( e ) => searchHour = ( e.target as HTMLInputElement ).value }
                        />

                        <div 
                            class="h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent"
                            transition:slide={{ duration: 200 }}
                        >
                            {#each filteredHours ?? [] as hour}
                                <button
                                    type="button"
                                    class="w-full text-center px-2 py-1 text-sm text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md transition-colors duration-200"
                                    class:bg-zinc-200={selectedHour === hour}
                                    class:dark:bg-zinc-900={selectedHour === hour}
                                    on:click={() => selectedHour = hour}
                                >
                                    {hour.toString().padStart(2, '0')}
                                </button>
                            {/each}
                        </div>
                    </div>

                    <span class="text-2xl mt-8 text-zinc-800 dark:text-zinc-200">:</span>

                    <div class="w-full flex flex-col gap-2">
                        <Input 
                            shapeInput={minuteSearchInput}
                            onInput={(e) => searchMinute = (e.target as HTMLInputElement).value}
                        />
                        <div 
                            class="mt-1 h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent"
                            transition:slide={{ duration: 200 }}
                        >
                            {#each filteredMinutes ?? [] as minute}
                                <button
                                    type="button"
                                    class="w-full text-center px-2 py-1 text-sm text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md transition-colors duration-200"
                                    class:bg-zinc-200={selectedMinute === minute}
                                    class:dark:bg-zinc-900={selectedMinute === minute}
                                    on:click={() => {
                                        selectedMinute = minute; open = false;
                                    }}
                                >
                                    {minute.toString().padStart(2, '0')}
                                </button>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>
</Info>

<style>
    .popover {
        width: max-content;
        max-width: var(--radix-popover-content-available-width);
        max-height: var(--radix-popover-content-available-height);
    }
</style>
