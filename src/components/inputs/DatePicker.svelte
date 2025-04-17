<script lang="ts">
    import { onMount } from "svelte";

    import { CalendarDate, type DateValue } from "@internationalized/date";
    import { DatePicker }                   from "bits-ui";

    import {
        CalendarBlankIcon,
        CaretLeftIcon,
        CaretRightIcon,
    }                                       from "$icons";
    import type { InputStyle, ShapeInput }  from "$models";
    import Description                      from "./Description.svelte";
    import { numberWithZero, styles }       from "$lib";


    export let shapeInput       : ShapeInput;
    export let value            : DateValue | undefined = undefined;
    export let onValueChange    : ( value: any ) => void;
    export let setError         : VoidFunction = () => {};


    let showPopup = false;
    let inputContainer: HTMLElement;
    let popupStyles = {};


    function createCalendarDate(): DateValue | undefined {
        if (!value) return undefined;

        const date = new Date(value.year, value.month - 1, value.day);

        return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    }


    function getDefaultDate(): DateValue {
        return new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
    }


    let selectedDate: DateValue | undefined = createCalendarDate();
    let currentDate: DateValue = createCalendarDate() || getDefaultDate();


    if ( !currentDate || !currentDate.year ) {
        currentDate = getDefaultDate();
    }


    function togglePopup() {
        if (shapeInput.disabled || shapeInput.readonly) return;
        showPopup = !showPopup;

        if ( showPopup ) {
            if (!currentDate || !currentDate.year) {
                currentDate = getDefaultDate();
            }

            const rect = inputContainer.getBoundingClientRect();
            popupStyles = {
                top: `${rect.bottom + window.scrollY}px`,
                left: `${rect.left + window.scrollX}px`,
                width: `${rect.width}px`
            };
        }
    }


    function handleClickOutside(event: MouseEvent) {
        if (showPopup && inputContainer && !inputContainer.contains(event.target as Node)) {
            showPopup = false;
        }
    }


    onMount(() => {
        document.addEventListener('click', handleClickOutside);
        
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });
</script>

<DatePicker.Root
    locale                  = "es-ES"
    weekdayFormat           = "short"
    fixedWeeks              = { true }
    minValue                = { shapeInput.minValue }
    maxValue                = { shapeInput.maxValue }
    disabled                = { shapeInput.disabled }
    required                = { shapeInput.required }
    calendarLabel           = { shapeInput.label }
    readonly                = { shapeInput.readonly }
    disableDaysOutsideMonth = { true }
    numberOfMonths          = { shapeInput.numberOfMonths }
    value                   = { currentDate }
    onValueChange           = {( value ) => {
        onValueChange( value );
        setError();

        currentDate = value || getDefaultDate();
        showPopup   = false;
    }}
    isDateDisabled={( value: DateValue ) => {
        if (
            !shapeInput.invalidDates ||
            shapeInput.invalidDates.length === 0
        ) return false;

        return shapeInput.invalidDates.includes( value.toString() );
    }}
>
    <div class="flex w-full flex-col gap-1.5">
        {#if shapeInput.label}
            <DatePicker.Label class={shapeInput.labelDateClass ?? (styles.datepicker as InputStyle).label}>
                {shapeInput.label}
            </DatePicker.Label>
        {/if}

        <div bind:this={inputContainer} class="relative">
            <div
                class={shapeInput.boxDateClass ?? `${(styles.datepicker as InputStyle).box}`}
                on:click={togglePopup}
                role="button"
                tabindex="0"
                on:keydown={(e) => e.key === 'Enter' && togglePopup()}
            >
                <div class="flex items-center justify-between w-full">
                    <div class="flex-1">
                        {#if selectedDate}
                            <span>{numberWithZero(selectedDate.day)} / {numberWithZero(selectedDate.month)} / {selectedDate.year}</span>
                        {:else}
                            <span class="text-muted-foreground">dd / mm / aaaa</span>
                        {/if}
                    </div>
                    <button
                        type="button"
                        class="text-foreground/60 rounded-lg active:bg-dark-10 ml-auto inline-flex size-8 items-center justify-center transition-all"
                    >
                        <CalendarBlankIcon />
                    </button>
                </div>
            </div>

            {#if showPopup}
                <div 
                    class="custom-datepicker-popup absolute top-full right-0 mt-2 z-[9999] bg-background rounded-lg shadow-lg w-72"
                >
                    <div class={shapeInput.contentDateClass ?? `${(styles.datepicker as InputStyle).content}`}>
                        <div class="flex items-center justify-between p-0">
                            <button 
                                type="button"
                                class="rounded-lg bg-background-alt hover:bg-muted inline-flex size-10 items-center justify-center transition-all active:scale-[0.98]"
                                on:click={() => {
                                    const prevMonth = new Date(currentDate?.year || new Date().getFullYear(), (currentDate?.month || new Date().getMonth() + 1) - 2, 1);
                                    currentDate = new CalendarDate(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1);
                                }}
                            >
                                <CaretLeftIcon />
                            </button>

                            <div class="text-[15px] font-medium capitalize">
                                {new Date(currentDate?.year || new Date().getFullYear(), (currentDate?.month || new Date().getMonth() + 1) - 1, 1).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                            </div>

                            <button 
                                type="button"
                                class="rounded-lg bg-background-alt hover:bg-muted inline-flex size-10 items-center justify-center transition-all active:scale-[0.98]"
                                on:click={() => {
                                    const nextMonth = new Date(currentDate?.year || new Date().getFullYear(), (currentDate?.month || new Date().getMonth() + 1), 1);
                                    currentDate = new CalendarDate(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 1);
                                }}
                            >
                                <CaretRightIcon />
                            </button>
                        </div>

                        <div class="p-3">
                            <div class="grid grid-cols-7 gap-1">
                                {#each ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'] as day}
                                    <div class="text-foreground/60 text-xs text-center font-medium">{day}</div>
                                {/each}

                                {#if true}
                                {@const year = currentDate.year}
                                {@const month = currentDate.month}
                                {@const firstDay = new Date(year, month - 1, 1)}
                                {@const lastDay = new Date(year, month, 0)}
                                {@const daysInMonth = lastDay.getDate()}
                                {@const startOffset = (firstDay.getDay() + 6) % 7}
                                {@const today = new Date()}
                                {@const todayDate = new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate())}

                                {#each Array(6 * 7) as _, i}
                                    {@const dayIndex = i - startOffset + 1}
                                    {@const isCurrentMonth = dayIndex > 0 && dayIndex <= daysInMonth}
                                    {@const day = isCurrentMonth ? dayIndex : (dayIndex <= 0 ? dayIndex + new Date(year, month - 2, 0).getDate() : dayIndex - daysInMonth)}
                                    {@const dateValue = isCurrentMonth ? new CalendarDate(year, month, day) : null}
                                    {@const isOutOfRange = isCurrentMonth && dateValue && (
                                        (shapeInput.minValue && dateValue < shapeInput.minValue) || 
                                        (shapeInput.maxValue && dateValue > shapeInput.maxValue)
                                    )}
                                    {@const isInvalidDate = isCurrentMonth && dateValue && shapeInput.invalidDates && shapeInput.invalidDates.includes(dateValue.toString())}
                                    {@const isInvalid = isOutOfRange || isInvalidDate}
                                    {@const isSelected = isCurrentMonth && selectedDate && day === selectedDate.day && month === selectedDate.month && year === selectedDate.year && !isInvalid}
                                    {@const isToday = isCurrentMonth && todayDate.year === year && todayDate.month === month && todayDate.day === day}

                                    <button 
                                        type="button"
                                        class="size-8 flex items-center justify-center rounded-md text-sm relative
                                            {!isCurrentMonth ? 'text-zinc-300 cursor-not-allowed opacity-50' : 
                                                isOutOfRange ? 'text-zinc-300 dark:text-zinc-500 cursor-not-allowed opacity-60' : 
                                                isInvalidDate ? 'text-zinc-300 dark:text-zinc-500 cursor-not-allowed' : 
                                                'hover:bg-muted/80 hover:text-foreground'}
                                            {isSelected ? 'bg-blue-500 text-white font-bold' : ''}
                                            {isToday && !isSelected && !isInvalid ? 'font-bold text-primary' : ''}"
                                        disabled={!isCurrentMonth || isInvalid}
                                        on:click={() => {
                                            if (isCurrentMonth && !isInvalid) {
                                                const newDate = new CalendarDate(year, month, day);
                                                if ( isSelected ) {
                                                    onValueChange( undefined );
                                                    setError();
                                                    selectedDate = undefined;
                                                    currentDate = new CalendarDate(year, month, 1);
                                                } else {
                                                    onValueChange(newDate);
                                                    setError();
                                                    selectedDate = newDate;
                                                    currentDate = newDate;
                                                    showPopup = false;
                                                }
                                            }
                                        }}
                                    >
                                        {#if isToday && !isSelected}
                                            <div class="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"></div>
                                        {/if}

                                        {isCurrentMonth ? day : day}
                                    </button>
                                {/each}
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
        </div>

        <Description {shapeInput} date={value} />
    </div>
</DatePicker.Root>

<style>
    /* Estilos adicionales */
    :global(.custom-datepicker-popup) {
        max-height: fit-content !important;
        overflow: hidden !important;
    }
    
    /* Mejorar el hover para modo light y dark */
    button:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
    
    :global(.dark) button:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
    
    /* Día seleccionado más visible */
    button[class*="bg-primary"] {
        position: relative;
        z-index: 1;
        transform: scale(1.1);
        transition: transform 0.2s ease;
    }
</style>
