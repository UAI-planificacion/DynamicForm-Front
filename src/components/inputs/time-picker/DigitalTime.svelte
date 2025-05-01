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
    import { theme }            from "$stores";
    import { inputUAITheme } from '$lib/styles/themes/uai-theme';



    export let shapeInput   : ShapeInput;
    export let value        : Time | undefined = undefined;
    export let onTimerInput : ( value: string ) => void;
    export let setError     : VoidFunction = () => {};

    shapeInput.inputStyle ??= inputUAITheme;

    let isDarkMode = $theme === 'dark';


    $: if ( $theme === 'dark' ) {
        isDarkMode = true;
    } else {
        isDarkMode = false;
    }

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
    <!-- class           = { `${( styles.digital as InputStyle ).box }` } -->
    <button
        disabled        = { shapeInput.disabled }
        type            = "button"
        id              = { shapeInput.id }
        aria-haspopup   = "true"
        aria-expanded   = { open }
        on:click        = { togglePicker }
        class       = {`px-3 py-2 transition-all duration-150 ease-in-out w-full flex items-center justify-between 
            ${ shapeInput.inputStyle?.fontSize      ?? 'text-sm' }
            ${ shapeInput.inputStyle?.height        ?? '' }
            ${ shapeInput.inputStyle?.borderRadius  ?? 'rounded-md' }
            ${ shapeInput.inputStyle?.borderSize    ?? 'border-0' }
            ${ shapeInput.inputStyle?.boxShadow     ?? 'shadow-sm' }`
        }
        style={ `background-color: ${
            isDarkMode
                ? shapeInput.disabled || shapeInput.readonly
                    ? shapeInput.inputStyle?.dark?.event?.disabled?.background ?? 'transparent'
                    : shapeInput.inputStyle?.dark?.background   ?? 'transparent'
                : shapeInput.disabled || shapeInput.readonly
                    ? shapeInput.inputStyle?.light?.event?.disabled?.background ?? 'transparent'
                    : shapeInput.inputStyle?.light?.background  ?? 'transparent'
            }; color: ${
                isDarkMode
                    ? shapeInput.disabled || shapeInput.readonly
                        ? shapeInput.inputStyle?.dark?.event?.disabled?.color ?? '#71717a'
                        :shapeInput.inputStyle?.dark?.color    ?? '#d1d5db'
                    : shapeInput.disabled || shapeInput.readonly
                        ? shapeInput.inputStyle?.light?.event?.disabled?.color ?? '#71717a'
                        :shapeInput.inputStyle?.light?.color   ?? 'black'
            }; box-shadow: 0 0 0 ${shapeInput.inputStyle?.ringSize ?? '1px'} ${
                isDarkMode
                    ? shapeInput.inputStyle?.dark?.ring ?? '#3f3f46'  // zinc-700
                    : shapeInput.inputStyle?.light?.ring ?? '#d4d4d8' // zinc-300
            };`
        }
        on:focus={(e) => {
            e.currentTarget.style.boxShadow = `0 0 0 ${shapeInput.inputStyle?.[isDarkMode ? 'dark' : 'light']?.event?.focus?.ringSize ?? '2px'} ${
                isDarkMode
                    ? shapeInput.inputStyle?.dark?.event?.focus?.ring ?? '#71717a' // zinc-500
                    : shapeInput.inputStyle?.light?.event?.focus?.ring ?? '#a1a1aa' // zinc-400
            }`;
        }}
        on:blur={(e) => {
            e.currentTarget.style.boxShadow = `0 0 0 ${shapeInput.inputStyle?.ringSize ?? '1px'} ${
                isDarkMode
                    ? shapeInput.inputStyle?.dark?.ring ?? '#3f3f46' // zinc-500
                    : shapeInput.inputStyle?.light?.ring ?? '#d4d4d8' // zinc-400
            }`;
        }}
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
                            onInput     = {( value ) => searchHour = value }
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
                            onInput={( value ) => searchMinute = value }
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
