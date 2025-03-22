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
    let [selectedHour, selectedMinute] = value 
        ? [value.hour, value.minute]
        : shapeInput.timeValue
            ? [
                parseInt(shapeInput.timeValue.split(':')[0]),
                parseInt(shapeInput.timeValue.split(':')[1])
            ]
            : [undefined, undefined];
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
            if (shapeInput.timeValue) {
                shapeInput.timeValue = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
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
        if (shapeInput.timeValue && selectedHour !== undefined && selectedMinute !== undefined) {
            shapeInput.timeValue = `${selectedHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
        }
    }


    const padStart = ( value: number | undefined ) : string => value?.toString().padStart(2, '0') ?? '';


    function onTimerInputHandler(
        isMinute: boolean = false
    ): string {
        if ( selectedHour === undefined )   return `:${padStart( selectedMinute )}`;
        if ( selectedMinute === undefined ) return `${padStart( selectedHour )}:`;
        if ( isMinute ) open = false;

        const timeValue = `${padStart( selectedHour )}:${padStart( selectedMinute )}`;
        if (shapeInput.timeValue) {
            shapeInput.timeValue = timeValue;
        }
        return timeValue;
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


    $: hoursArray = shapeInput.time?.hourList ?? Array.from({ length: 24 }, (_, i) => i);
    $: minutesArray = shapeInput.time?.minuteList ?? Array.from({ length: 60 }, (_, i) => i);

    $: filteredHours = searchHour 
        ? hoursArray?.filter(hour => 
            hour.toString().padStart(2, '0').includes(searchHour)
        )
        : hoursArray;

    $: filteredMinutes = searchMinute 
        ? minutesArray?.filter(minute => 
            minute.toString().padStart(2, '0').includes(searchMinute)
        )
        : minutesArray;
</script>

<svelte:window on:click={handleClickOutside} />

<Info { shapeInput } { value } { onTimerInput }>

<div class="relative w-full" id={ shapeInput.id }>
    <button
        disabled        = { shapeInput.disabled }
        type            = "button"
        id              = { `${ shapeInput.id }-input` }
        class           = { `${( styles.digital as InputStyle ).box }` }
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
            class           = { shapeInput.boxStyle ?? `${( styles.digital as InputStyle ).content }` }
            transition:fade={{ duration: 150 }}
        >
            <div class="flex p-3">
                <div class="flex items-center gap-2">
                    <div class="w-full flex flex-col gap-3">
                        <Input 
                            shapeInput  = {{
                                id          : `${shapeInput.id}-hour-search`,
                                name        : 'hour-search',
                                placeholder : 'Buscar hora...',
                                type        : 'search',
                                shape       : 'input',
                                class_      : (styles.digital as InputStyle ).input
                            }}
                            onInput     = {( e ) => searchHour = ( e.target as HTMLInputElement ).value }
                        />

                        <div 
                            class="h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent"
                            transition:slide={{ duration: 200 }}
                        >
                            {#each filteredHours ?? [] as hour}
                                <button
                                    type            = "button"
                                    data-selected   = { selectedHour === hour }
                                    class           = {  shapeInput.itemStyle ?? `${( styles.digital as InputStyle ).item }` }
                                    on:click        = {() => toggleSelection('hour', hour) }
                                >
                                    {hour.toString().padStart(2, '0')}
                                </button>
                            {/each}
                        </div>
                    </div>

                    <span class="text-2xl mt-8 text-zinc-800 dark:text-zinc-200">:</span>

                    <div class="w-full flex flex-col gap-2">
                        <Input 
                            shapeInput={
                                {
                                    id          : `${shapeInput.id}-minute-search`,
                                    name        : 'minute-search',
                                    placeholder : 'Buscar minuto...',
                                    type        : 'search',
                                    shape       : 'input',
                                    class_      : (styles.digital as InputStyle ).input
                                }
                            }
                            onInput={(e) => searchMinute = (e.target as HTMLInputElement).value}
                        />
                        <div 
                            class="mt-1 h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent"
                            transition:slide={{ duration: 200 }}
                        >
                            {#each filteredMinutes ?? [] as minute}
                                <button
                                    type            = "button"
                                    data-selected   = { selectedMinute === minute }
                                    class           = { shapeInput.itemStyle ?? `${( styles.digital as InputStyle ).item }` }
                                    on:click        = {() => toggleSelection('minute', minute)}
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
