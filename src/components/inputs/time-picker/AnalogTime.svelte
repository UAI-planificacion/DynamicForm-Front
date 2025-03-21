<script lang="ts">
    import { fade, scale }  from 'svelte/transition';
    import { ClockIcon }    from 'lucide-svelte';

    import type {
        InputStyle,
        ShapeInput,
        Time
    }                   from '$models';
    import { styles }   from '$lib';
    import Info         from '../Info.svelte';


    export let shapeInput   : ShapeInput;
    export let value        : Time | undefined = undefined;
    export let onTimerInput : ( value: string ) => void;
    export let setError     : VoidFunction = () => {};

    let isOpen              = false;
    let [hours, minutes]    = value 
        ? [value.hour, value.minute]
        : shapeInput.timeValue
            ? [
                parseInt(shapeInput.timeValue.split(':')[0]),
                parseInt(shapeInput.timeValue.split(':')[1])
            ]
            : [undefined, undefined];
    let isSelectingHours    = true;
    let isPM                = hours !== undefined && hours >= 12;
    let formattedTime       = 'hh : mm';

    $: allowedHours = shapeInput.time?.hourList || [];
    $: allowedMinutes = shapeInput.time?.minuteList || [];
    $: isHourDisabled = (hour: number) => allowedHours.length > 0 && !allowedHours.includes(hour);
    $: isMinuteDisabled = (minute: number) => allowedMinutes.length > 0 && !allowedMinutes.includes(minute);

    $: hourHandAngle    = hours === undefined ? -90 : ((hours % 12) * 30) - 90;
    $: minuteHandAngle  = minutes === undefined ? -90 : (minutes * 6) - 90;

    ((): void => {
        if (!value) return;

        const h = value.hour;
        const m = value.minute;

        if (h !== undefined && h !== null && m !== undefined && m !== null && !Number.isNaN(h) && !Number.isNaN(m)) {
            hours = h;
            minutes = m;
        }
    })();

    const hoursArray    = Array.from({ length: 12 }, (_, i) => i === 0 ? 12 : i);
    const hoursArrayPM  = Array.from({ length: 12 }, (_, i) => i === 0 ? 12 : i + 12);
    const minutesArray  = Array.from({ length: 12 }, (_, i) => i * 5);


    function formatTime(): void {
        const notHours      = hours     === undefined || hours      === null;
        const notMinutes    = minutes   === undefined || minutes    === null;

        if ( notHours && minutes ) {
            formattedTime = `hh : ${minutes?.toString().padStart(2, '0')}`;
        } else if ( hours && notMinutes ) {
            formattedTime = `${hours?.toString().padStart(2, '0')} : mm`;
        } else if ( !notHours && !notMinutes )
            formattedTime = `${hours?.toString().padStart(2, '0')} : ${minutes?.toString().padStart(2, '0')}`;
        else 
            formattedTime = 'hh : mm';
    }


    function selectHour( hour: number ): void {
        if (isHourDisabled(hour)) return;

        const newHour = isPM && hour < 12 ? hour + 12 : (hour === 12 && !isPM ? 0 : hour);

        hours = hours === newHour ? undefined : newHour;

        formatTime();
        onTimerInput( formattedTime );
        setError();

        isSelectingHours = false;
    }


    function selectMinute( minute: number ): void {
        if (isMinuteDisabled(minute)) return;

        minutes = minutes === minute ? undefined : minute;

        formatTime();
        onTimerInput( formattedTime );
        setError();

        isOpen = false;
    }


    function getPosition(
        index   : number,
        total   : number,
        radius  : number
    ): { x: number, y: number } {
        const angle = (( index / total ) * 2 * Math.PI) - ( Math.PI / 2 );
        const x = radius * Math.cos( angle );
        const y = radius * Math.sin( angle );
        return { x, y };
    }


    function toggleAMPM(): void {
        if ( hours === undefined || hours === null ) return;

        isPM = !isPM;

        if ( hours < 12 && isPM )           hours += 12;
        else if ( hours >= 12 && !isPM )    hours -= 12;

        formatTime();
        onTimerInput( formattedTime );
        setError();
    }


    function togglePicker(): void {
        if ( shapeInput.disabled ) return;

        isOpen = !isOpen;
        isSelectingHours = true;
    }


    function handleClickOutside( event: MouseEvent ): void {
        const target = event.target as HTMLElement;
        const picker = document.getElementById( shapeInput.id );

        if (picker && !picker.contains( target )) isOpen = false;
    }
</script>

<svelte:window on:click={ handleClickOutside } />

<Info { shapeInput } { value } { onTimerInput }>
    <div class="relative w-full" id={ shapeInput.id }>
        <button
            type            = "button"
            id              = { `${ shapeInput.id }-input` }
            class           = { `${ shapeInput.boxStyle ?? ( styles.analogic as InputStyle ).box }` }
            on:click        = { togglePicker }
            aria-haspopup   = "true"
            aria-expanded   = { isOpen }
            disabled        = { shapeInput.disabled }
        >
            { formattedTime }
            <ClockIcon class="w-5 h-5" />
        </button>

        {#if isOpen}
            <div 
                class="absolute right-4 z-40 mt-1 bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-4"
                transition:fade={{ duration: 150 }}
            >
                <div class="flex flex-col items-center">
                    <div class="flex space-x-4 mb-4">
                        <button
                            type="button"
                            data-selected={isSelectingHours}
                            class="px-3 py-1 rounded-md data-[selected=true]:bg-blue-500 data-[selected=true]:text-white data-[selected=false]:text-gray-600"
                            on:click={() => isSelectingHours = true}
                        >
                            Horas
                        </button>

                        <button
                            type="button"
                            data-selected={!isSelectingHours}
                            class="px-3 py-1 rounded-md data-[selected=true]:bg-blue-500 data-[selected=true]:text-white data-[selected=false]:text-gray-600"
                            on:click={() => isSelectingHours = false}
                        >
                            Minutos
                        </button>
                    </div>

                    <!-- Reloj analógico -->
                    <div class="relative w-64 h-64 rounded-full border-4 border-gray-200 mb-4 p-1">
                        <!-- Botón AM/PM central -->
                        <button
                            type="button"
                            data-selected={isPM}
                            class="hover:scale-105 duration-200 absolute top-1/2 left-1/2 w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-white transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center text-sm font-medium transition-colors data-[selected=true]:bg-blue-500 data-[selected=true]:text-white"
                            on:click={toggleAMPM}
                        >
                            {isPM ? 'PM' : 'AM'}
                        </button>

                        {#if isSelectingHours}
                        <!-- Selector de horas -->
                            <div 
                                transition:scale={{ duration: 200, start: 0.8 }}
                                class="absolute inset-0"
                            >
                                <!-- Aguja de la hora -->
                                {#if hours !== undefined}
                                <div 
                                    class="absolute top-1/2 left-1/2 h-1 bg-blue-500 rounded-full origin-left z-10"
                                    style="width: 30%; transform: translateY(-50%) rotate({hourHandAngle}deg);"
                                ></div>
                                {/if}

                                <!-- Números de las horas -->
                                {#each isPM ? hoursArrayPM : hoursArray as hour, i}
                                    {@const pos = getPosition(i, 12, 100)}
                                    {@const isSelected = isPM ? hours === hour : (hours === hour) || (hours === 0 && hour === 12)}
                                    <button 
                                        type="button"
                                        data-selected={isSelected}
                                        data-disabled={isHourDisabled(hour)}
                                        class = { `${ shapeInput.itemStyle ?? ( styles.analogic as InputStyle ).item }` }
                                        style="left: calc(50% + {pos.x}px - 20px); top: calc(50% + {pos.y}px - 20px);"
                                        on:click={() => selectHour(hour)}
                                        disabled={isHourDisabled(hour)}
                                    >
                                        {`${hour < 10 ? '0' : ''}${hour}`}
                                    </button>
                                {/each}
                            </div>
                        {:else}
                            <!-- Selector de minutos -->
                            <div 
                                transition:scale={{ duration: 200, start: 0.8 }}
                                class="absolute inset-0"
                            >
                                <!-- Aguja de los minutos -->
                                {#if minutes !== undefined}
                                <div 
                                    class="absolute top-1/2 left-1/2 h-1 bg-blue-500 rounded-full origin-left "
                                    style="width: 40%; transform: translateY(-50%) rotate({minuteHandAngle}deg);"
                                ></div>
                                {/if}

                                <!-- Números de los minutos -->
                                {#each minutesArray as minute, i}
                                    {@const pos = getPosition(i, 12, 100)}
                                    {@const isSelected = minutes === minute}
                                    <button 
                                        type="button"
                                        data-selected={isSelected}
                                        data-disabled={isMinuteDisabled(minute)}
                                        class = { `${ shapeInput.itemStyle ?? ( styles.analogic as InputStyle ).item }` }
                                        style="left: calc(50% + {pos.x}px - 20px); top: calc(50% + {pos.y}px - 20px);"
                                        on:click={() => selectMinute(minute)}
                                        disabled={isMinuteDisabled(minute)}
                                    >
                                        {`${minute < 10 ? '0' : ''}${minute}`}
                                    </button>
                                {/each}
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        {/if}
    </div>
</Info>