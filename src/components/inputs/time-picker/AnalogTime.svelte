<script lang="ts">
    import { scale } from 'svelte/transition';

    import { ClockIcon } from 'lucide-svelte';

    import {
        BoxStyle,
        ContentStyle,
        ButtonNavigator,
        Info
    }                   from '$components';
    import type {
        ShapeInput,
        ThemeShape,
        Time
    }                   from '$models';
    import { UAITheme } from '$lib';
    import { theme }    from "$stores";
    import { RING }     from '$lib/styles/themes/default/ring';


    export let shapeInput   : ShapeInput;
    export let value        : Time | undefined = undefined;
    export let onTimerInput : ( value: string ) => void;
    export let setError     : VoidFunction = () => {};
    export let themeShape   : ThemeShape = UAITheme();


    let isDarkMode = $theme === 'dark';


    $: if ( $theme === 'dark' ) {
        isDarkMode = true;
    } else {
        isDarkMode = false;
    }


    let isOpen              = false;
    let [hours, minutes]    = value 
        ? [value.hour, value.minute]
        : [undefined, undefined];

    let formattedTime = 'hh : mm';
    $: if (hours !== undefined && minutes !== undefined) {
        formattedTime = `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')}`;
    }
    let isSelectingHours    = true;
    let isPM                = hours !== undefined && hours >= 12;

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


    function formatTimeForDisplay(): string {
        const notHours      = hours     === undefined || hours      === null;
        const notMinutes    = minutes   === undefined || minutes    === null;

        if ( notHours && minutes ) {
            return `hh : ${minutes?.toString().padStart(2, '0')}`;
        } else if ( hours && notMinutes ) {
            return `${hours?.toString().padStart(2, '0')} : mm`;
        } else if ( !notHours && !notMinutes ) {
            return `${hours?.toString().padStart(2, '0')} : ${minutes?.toString().padStart(2, '0')}`;
        }
        return 'hh : mm';
    }

    function formatTime(): string {
        const notHours      = hours     === undefined || hours      === null;
        const notMinutes    = minutes   === undefined || minutes    === null;

        let result = 'hh:mm';

        if ( notHours && minutes ) {
            result = `hh:${minutes?.toString().padStart(2, '0')}`;
        } else if ( hours && notMinutes ) {
            result = `${hours?.toString().padStart(2, '0')}:mm`;
        } else if ( !notHours && !notMinutes ) {
            result = `${hours?.toString().padStart(2, '0')}:${minutes?.toString().padStart(2, '0')}`;
        }

        formattedTime = formatTimeForDisplay();
        return result;
    }


    function selectHour( hour: number ): void {
        if ( isHourDisabled( hour )) return;

        const newHour = isPM && hour < 12 ? hour + 12 : ( hour === 12 && !isPM ? 0 : hour );

        hours = hours === newHour ? undefined : newHour;

        const timeString = formatTime();
        onTimerInput( timeString );
        setError();

        isSelectingHours = false;
    }


    function selectMinute( minute: number ): void {
        if ( isMinuteDisabled( minute )) return;

        minutes = minutes === minute ? undefined : minute;

        const timeString = formatTime();
        onTimerInput( timeString );
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

        const timeString = formatTime();
        onTimerInput( timeString );
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

        if ( picker && !picker.contains( target )) isOpen = false;
    }
</script>

<svelte:window on:click={ handleClickOutside } />

<Info { shapeInput } { value } { onTimerInput } { themeShape }>
    <div class="relative w-full" id={ shapeInput.id }>
        <BoxStyle
            handleOpen={togglePicker}
            {shapeInput}
            {themeShape}
        >
            { formattedTime }
            <ClockIcon class="w-5 h-5" />
        </BoxStyle>

        {#if isOpen}
            <ContentStyle { themeShape }>
                <div class="flex flex-col items-center">
                    <div class="flex space-x-4 mb-4">
                        <ButtonNavigator
                            { themeShape }
                            selected    = { isSelectingHours}
                            className   = "px-3 py-1"
                            onClick     = {() => isSelectingHours = true }
                        >
                            Horas
                        </ButtonNavigator>

                        <ButtonNavigator
                            { themeShape }
                            selected    = { !isSelectingHours}
                            className   = "px-3 py-1"
                            onClick     = {() => isSelectingHours = false }
                        >
                            Minutos
                        </ButtonNavigator>
                    </div>

                    <!-- Reloj analógico -->
                    <div
                        class="relative size-64 rounded-full mb-4 p-1"
                        style={ RING( isDarkMode, themeShape )}
                    >
                        <ButtonNavigator
                            { themeShape }
                            selected    = { isPM}
                            className   = "absolute top-1/2 left-1/2 size-10 transform -translate-x-1/2 -translate-y-1/2 z-20 justify-center font-medium"
                            rounded     = "rounded-full"
                            defaultSelected = {true}
                            onClick     =  {toggleAMPM}
                        >
                            {isPM ? 'PM' : 'AM'}
                        </ButtonNavigator>

                        {#if isSelectingHours}
                        <!-- Selector de horas -->
                            <div 
                                transition:scale={{ duration: 200, start: 0.8 }}
                                class="absolute inset-0"
                            >
                                <!-- Aguja de la hora -->
                                {#if hours !== undefined}
                                    <div 
                                        class="absolute top-1/2 left-1/2 h-1 rounded-full origin-left z-10"
                                        style={`width: 31.5%; transform: translateY(-50%) rotate(${hourHandAngle}deg);
                                        background-color: ${
                                            isDarkMode
                                                ? themeShape.dark.ring
                                                : themeShape.light.ring
                                        };
                                    `}
                                    ></div>
                                {/if}

                                <!-- Números de las horas -->
                                {#each isPM ? hoursArrayPM : hoursArray as hour, i}
                                    {@const pos = getPosition(i, 12, 100)}
                                    {@const isSelected = isPM ? hours === hour : (hours === hour) || (hours === 0 && hour === 12)}
                                    <ButtonNavigator
                                        { themeShape }
                                        disabled                = { isHourDisabled( hour )}
                                        selected                = { isSelected }
                                        className               = "absolute size-10 shadow-md justify-center hover:scale-105"
                                        rounded                 = "rounded-full"
                                        defaultSelected         = { true }
                                        colorDefaultSelected    = {{ tonalityDark: 100, tonalityLight: 100, opacity: 100 }}
                                        colorHover              = {{ tonalityDark: 100, tonalityLight: 100, opacity: 60 }}
                                        colorSelected           = {{ tonalityDark: 300, tonalityLight: 200, opacity: 100 }}
                                        onClick                 =  {() => selectHour( hour )}
                                        style                   = "left: calc(50% + {pos.x}px - 20px); top: calc(50% + {pos.y}px - 20px);"
                                    >
                                        { `${hour < 10 ? '0' : ''}${hour}` }
                                    </ButtonNavigator>
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
                                        class="absolute top-1/2 left-1/2 h-1 rounded-full origin-left"
                                        style={`width: 31.5%; transform: translateY(-50%) rotate(${minuteHandAngle}deg);
                                        background-color: ${
                                                isDarkMode
                                                    ? themeShape.dark.ring
                                                    : themeShape.light.ring
                                            };
                                        `}
                                    ></div>
                                {/if}

                                <!-- Números de los minutos -->
                                {#each minutesArray as minute, i}
                                    {@const pos = getPosition(i, 12, 100)}
                                    {@const isSelected = minutes === minute}
                                    <ButtonNavigator
                                        { themeShape }
                                        disabled                = { isMinuteDisabled( minute )}
                                        selected                = { isSelected}
                                        className               = "absolute size-10 shadow-md justify-center  hover:scale-105 "
                                        rounded                 = "rounded-full"
                                        defaultSelected         = { true }
                                        colorDefaultSelected    = {{ tonalityDark: 100, tonalityLight: 100, opacity: 100 }}
                                        colorHover              = {{ tonalityDark: 100, tonalityLight: 100, opacity: 60 }}
                                        colorSelected           = {{ tonalityDark: 300, tonalityLight: 200, opacity: 100 }}
                                        onClick                 =  {() => selectMinute( minute )}
                                        style                   = "left: calc(50% + {pos.x}px - 20px); top: calc(50% + {pos.y}px - 20px);"
                                    >
                                        {`${minute < 10 ? '0' : ''}${minute}`}
                                    </ButtonNavigator>
                                {/each}
                            </div>
                        {/if}
                    </div>
                </div>
            </ContentStyle>
        {/if}
    </div>
</Info>
