<script lang="ts">
    import { TimerIcon }    from 'lucide-svelte';

    import type {
        ShapeInput,
        ThemeShape,
        Time
    }                   from '$models';
    import { Input }    from '$components';
    import Info         from '../Info.svelte';
    import BoxStyle     from '../BoxStyle.svelte';
    import ContentStyle from '../ContentStyle.svelte';
    import { UAITheme } from '$lib';


    export let shapeInput   : ShapeInput;
    export let value        : Time | undefined = undefined;
    export let onTimerInput : ( value: string ) => void;
    export let setError     : VoidFunction = () => {};
    export let themeShape   : ThemeShape = UAITheme();


    let firstRender = true;
    let open = false;
    let [selectedHour, selectedMinute] = value 
        ? [value.hour, value.minute]
        : [undefined, undefined]
    let searchHour      = '';
    let searchMinute    = '';

    $: if (selectedHour === undefined || selectedMinute === undefined) {
        if ( !firstRender ) setError();
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
            if ( shapeInput.timeValue || shapeInput.defaultValueTime ) {
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
        if (selectedHour !== undefined && selectedMinute !== undefined) {
            const formattedTime = `${selectedHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
            onTimerInput(formattedTime);
        }
    }


    const padStart = ( value: number | undefined ) : string => value?.toString().padStart(2, '0') ?? '';


    function onTimerInputHandler(closeAfterSelection = false) {
        if (closeAfterSelection) open = false;
        const timeValue = `${padStart( selectedHour )}:${padStart( selectedMinute )}`;
        return timeValue;
    }


    function toggleSelection(
        type: 'hour' | 'minute', 
        value: number
    ): void {
        firstRender = false;

        if (type === 'hour') {
            selectedHour = selectedHour === value ? undefined : value;
            onTimerInput( onTimerInputHandler(false) );
            setError();
            return;
        }

        selectedMinute = selectedMinute === value ? undefined : value;
        onTimerInput( onTimerInputHandler(true) );
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
    <BoxStyle
        handleOpen={togglePicker}
        { shapeInput }
        { themeShape }
    >
        {
            selectedHour === undefined ? 'hh' : selectedHour.toString().padStart(2, '0')
        } : {
            selectedMinute === undefined ? 'mm' : selectedMinute.toString().padStart(2, '0')
        }

        <TimerIcon class="w-5 h-5" />
    </BoxStyle>

    {#if open}
        <ContentStyle { themeShape }>
            <div class="flex items-center gap-2">
                <div class="w-full flex flex-col gap-3">
                    <Input 
                        shapeInput  = {{
                            id          : `${shapeInput.id}-hour-search`,
                            name        : 'hour-search',
                            placeholder : 'Buscar hora...',
                            type        : 'search',
                            shape       : 'input',
                        }}
                        onInput     = {( value ) => searchHour = value }
                    />

                    <div 
                        class="h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent"
                    >
                        {#each filteredHours ?? [] as hour}
                            <button
                                type            = "button"
                                data-selected   = { selectedHour === hour }
                                class           = "w-full text-center px-2 py-1 text-sm text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md transition-colors duration-200 data-[selected=true]:bg-zinc-200 dark:data-[selected=true]:bg-zinc-900"
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
                        shapeInput={{
                            id          : `${shapeInput.id}-minute-search`,
                            name        : 'minute-search',
                            placeholder : 'Buscar minuto...',
                            type        : 'search',
                            shape       : 'input',
                        }}
                        onInput={( value ) => searchMinute = value }
                    />
                    <div 
                        class="mt-1 h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent"
                    >
                        {#each filteredMinutes as minute}
                            <button
                                type            = "button"
                                data-selected   = { selectedMinute === minute }
                                class           = "w-full text-center px-2 py-1 text-sm text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md transition-colors duration-200 data-[selected=true]:bg-zinc-200 dark:data-[selected=true]:bg-zinc-900"
                                on:click        = {() => toggleSelection('minute', minute)}
                            >
                                {minute.toString().padStart(2, '0')}
                            </button>
                        {/each}
                    </div>
                </div>
            </div>
        </ContentStyle>
    {/if}
</div>
</Info>
