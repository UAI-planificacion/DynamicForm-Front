<script lang="ts">
    import { fade, slide }  from 'svelte/transition';
    import { TimerIcon }    from 'lucide-svelte';

    import type {
        InputStyle,
        ShapeInput,
        Time
    }                   from '$models';
    import { Input }    from '$components';
    import { styles }   from '$lib';
    import Info         from '../Info.svelte';


    export let shapeInput   : ShapeInput;
    export let value        : Time | undefined = undefined;
    export let onTimerInput : ( value: string ) => void;
    export let setError     : VoidFunction = () => {};


    let open            = false;
    let selectedHour    : number | undefined = value?.hour ?? shapeInput.time?.hour;
    let selectedMinute  : number | undefined = value?.minute ?? shapeInput.time?.minute;
    let searchHour      = '';
    let searchMinute    = '';

    $: if (selectedHour === undefined || selectedMinute === undefined) {
        setError();
    }

    function clearSearch() {
        searchHour      = '';
        searchMinute    = '';
    }

    ((): void => {
        if (!value) return;

        const h = value.hour;
        const m = value.minute;

        if (h !== undefined && m !== undefined && !Number.isNaN(h) && !Number.isNaN(m)) {
            selectedHour = h;
            selectedMinute = m;
            if (shapeInput.time) {
                shapeInput.time.hour = h;
                shapeInput.time.minute = m;
            }
        }
    })();

    function handleClickOutside({ target }: MouseEvent): void {
        const picker = document.getElementById(shapeInput.id);

        applySelection();

        if (picker && !picker.contains(target as Node)) {
            open = false;
        }
    }

    function togglePicker() {
        if (!shapeInput.disabled) {
            open = !open;
            clearSearch();
        }
    }

    function applySelection() {
        if (shapeInput.time) {
            shapeInput.time.hour = selectedHour;
            shapeInput.time.minute = selectedMinute;
        }
    }


    const padStart = ( value: number | undefined ) : string => value?.toString().padStart(2, '0') ?? '';


    function onTimerInputHandler(
        isMinute: boolean = false
    ): string {
        if ( selectedHour === undefined )   return `:${padStart( selectedMinute )}`;
        if ( selectedMinute === undefined ) return `${padStart( selectedHour )}:`;
        if ( isMinute ) open = false;

        return `${padStart( selectedHour )}:${padStart( selectedMinute )}`;
    }


    function toggleSelection(
        type: 'hour' | 'minute', 
        value: number
    ): void {
        if (type === 'hour') {
            selectedHour = selectedHour === value ? undefined : value;
            onTimerInput( onTimerInputHandler() );
            setError();
            return;
        }

        selectedMinute = selectedMinute === value ? undefined : value;
        onTimerInput( onTimerInputHandler( true ));
        setError();
    }


    const hoursArray   : number[] = Array.from({ length: 24 }, (_, i) => i);
    const minutesArray : number[] = Array.from({ length: 60 }, (_, i) => i);

    $: filteredHours = searchHour 
        ? (shapeInput.time?.hourList || hoursArray)?.filter(hour => 
            hour.toString().padStart(2, '0').includes(searchHour)
        )
        : (shapeInput.time?.hourList || hoursArray);

    $: filteredMinutes = searchMinute 
        ? (shapeInput.time?.minuteList || minutesArray)?.filter(minute => 
            minute.toString().padStart(2, '0').includes(searchMinute)
        )
        : (shapeInput.time?.minuteList || minutesArray);

    const hourSearchInput: ShapeInput = {
        id          : `${shapeInput.id}-hour-search`,
        name        : 'hour-search',
        placeholder : 'Buscar hora...',
        type        : 'search',
        shape       : 'input',
    };

    const minuteSearchInput: ShapeInput = {
        id          : `${shapeInput.id}-minute-search`,
        name        : 'minute-search',
        placeholder : 'Buscar minuto...',
        type        : 'search',
        shape       : 'input',
    };
</script>

<svelte:window on:click={handleClickOutside} />

<Info { shapeInput } { value } { onTimerInput }>

<div class="relative w-full" id={ shapeInput.id }>
    <button
        disabled        = { shapeInput.disabled }
        type            = "button"
        id              = { `${ shapeInput.id }-input` }
        class           = { `${( styles.datepicker as InputStyle ).box } flex justify-between items-center` }
        aria-haspopup   = "true"
        aria-expanded   = { open }
        on:click        = { togglePicker }
    >
        {
            selectedHour === undefined ? 'hh' : selectedHour.toString().padStart(2, '0')
        } : {
            selectedMinute === undefined ? 'mm' : selectedMinute.toString().padStart(2, '0')
        }

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
                                    on:click={() => toggleSelection('hour', hour)}
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
                                    on:click={() => toggleSelection('minute', minute)}
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
