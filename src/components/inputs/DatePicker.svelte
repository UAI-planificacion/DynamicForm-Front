<script lang="ts">
    import { onMount } from "svelte";

    import { theme }            from "$stores";

    import { CalendarDate, type DateValue } from "@internationalized/date";
    import { DatePicker }                   from "bits-ui";

    import type {
        InputStyle,
        ShapeInput,
        ShapeOption
    }                                   from "$models";
    import {
        CalendarBlankIcon,
        CaretLeftIcon,
        CaretRightIcon,
    }                                   from "$icons";
    import Description                  from "./Description.svelte";
    import { numberWithZero, styles }   from "$lib";
    import VirtualSelect                from "./VirtualSelect.svelte";
    import Input                        from "./Input.svelte";
    import { inputUAITheme } from "$lib/styles/themes/uai-theme";


    
    let isDarkMode = $theme === 'dark';


    $: if ( $theme === 'dark' ) {
        isDarkMode = true;
    } else {
        isDarkMode = false;
    }



    export let shapeInput       : ShapeInput;
    export let value            : DateValue | undefined = undefined;
    export let onValueChange    : ( value: any ) => void;
    export let setError         : VoidFunction = () => {};
    

    shapeInput.inputStyle ??= inputUAITheme;


    let showPopup = false;
    let inputContainer: HTMLElement;


    const monthOptions: ShapeOption[] = [
        { value: "1", label: "Enero" },
        { value: "2", label: "Febrero" },
        { value: "3", label: "Marzo" },
        { value: "4", label: "Abril" },
        { value: "5", label: "Mayo" },
        { value: "6", label: "Junio" },
        { value: "7", label: "Julio" },
        { value: "8", label: "Agosto" },
        { value: "9", label: "Septiembre" },
        { value: "10", label: "Octubre" },
        { value: "11", label: "Noviembre" },
        { value: "12", label: "Diciembre" }
    ];


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

    let selectedMonth = currentDate.month.toString();
    let selectedYear = currentDate.year.toString();


    function togglePopup() {
        if ( shapeInput.disabled || shapeInput.readonly ) return;
        showPopup = !showPopup;

        if ( showPopup ) {
            if ( !currentDate || !currentDate.year ) {
                currentDate = getDefaultDate();
            }
        }
    }


    function handleClickOutside(event: MouseEvent) {
        // Verificar si el clic fue dentro del calendario o sus controles
        const popupElement = document.querySelector('.custom-datepicker-popup');
        const monthSelectElement = document.querySelector('.month-select-container');
        const yearInputElement = document.querySelector('.year-input-container');
        
        // Comprobar si el clic fue en alguno de los elementos que queremos mantener abiertos
        const isClickInPopup = popupElement && popupElement.contains(event.target as Node);
        const isClickInInput = inputContainer && inputContainer.contains(event.target as Node);
        const isClickInMonthSelect = monthSelectElement && monthSelectElement.contains(event.target as Node);
        const isClickInYearInput = yearInputElement && yearInputElement.contains(event.target as Node);
        
        // No cerrar el popup si el clic fue en alguno de estos elementos
        if (showPopup && !isClickInPopup && !isClickInInput && !isClickInMonthSelect && !isClickInYearInput) {
            showPopup = false;
        }
    }


    onMount(() => {
        document.addEventListener('click', handleClickOutside);

        // Initialize selectedMonth and selectedYear with currentDate values
        if ( currentDate ) {
            selectedMonth = currentDate.month.toString();
            selectedYear = currentDate.year.toString();
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });

    // Update selectedMonth and selectedYear when currentDate changes
    $: if ( currentDate ) {
        selectedMonth = currentDate.month.toString();
        selectedYear = currentDate.year.toString();
    }
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

        <!-- class={shapeInput.boxDateClass ?? `${(styles.datepicker as InputStyle).box}`} -->
        <div bind:this={inputContainer} class="relative">
            <div
                on:click={togglePopup}
                role="button"
                tabindex="0"
                on:keydown={(e) => e.key === 'Enter' && togglePopup()}
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
                    class="custom-datepicker-popup absolute top-full right-0 mt-2 z-[9999] rounded-md shadow-lg w-[20rem]"
                    on:click|stopPropagation
                    on:keydown|stopPropagation={e => e.key === 'Enter' && togglePopup()}
                    tabindex="0"
                    role="button"
                >
                    <div class={shapeInput.contentDateClass ?? `${(styles.datepicker as InputStyle).content}`}>
                        <div class="flex items-center justify-between p-0">
                            <button 
                                type="button"
                                class="rounded-lg bg-background-alt hover:bg-muted inline-flex size-10 items-center justify-center transition-all active:scale-[0.98]"
                                on:click={() => {
                                    const prevMonth = new Date(currentDate?.year || new Date().getFullYear(), (currentDate?.month || new Date().getMonth() + 1) - 2, 1);
                                    currentDate = new CalendarDate(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1);
                                    selectedMonth = (prevMonth.getMonth() + 1).toString();
                                    selectedYear = prevMonth.getFullYear().toString();
                                }}
                            >
                                <CaretLeftIcon />
                            </button>

                            <div class="flex items-center gap-1">
                                <div class="w-36 month-select-container">
                                    <VirtualSelect
                                        shapeInput={{
                                            id: "month-select",
                                            name: "month-select",
                                            options: monthOptions,
                                            selected: selectedMonth,
                                        }}
                                        value={selectedMonth}
                                        onSelectedChange={(value) => {
                                            if (value && typeof value === 'string') {
                                                selectedMonth = value;
                                                const newMonth = parseInt(value);
                                                currentDate = new CalendarDate(parseInt(selectedYear), newMonth, 1);
                                            }
                                        }}
                                    />
                                </div>
                                <div class="w-20 year-input-container">
                                    <Input
                                        shapeInput={{
                                            id: "year-input",
                                            name: "year-input",
                                            type: "number",
                                        }}
                                        value={selectedYear}
                                        onInput={(value) => {
                                            selectedYear = value;
                                            if (value && parseInt(value) > 0) {
                                                currentDate = new CalendarDate(parseInt(value), parseInt(selectedMonth), 1);
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <button 
                                type="button"
                                class="rounded-lg bg-background-alt hover:bg-muted inline-flex size-10 items-center justify-center transition-all active:scale-[0.98]"
                                on:click={() => {
                                    const nextMonth = new Date(currentDate?.year || new Date().getFullYear(), (currentDate?.month || new Date().getMonth() + 1), 1);
                                    currentDate = new CalendarDate(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 1);
                                    selectedMonth = (nextMonth.getMonth() + 1).toString();
                                    selectedYear = nextMonth.getFullYear().toString();
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
                                {@const startOffset = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1}
                                {@const today = new Date()}
                                {@const todayDate = new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate())}

                                {#each Array(6 * 7) as _, i}
                                    {@const dayIndex = i - startOffset + 1}
                                    {@const isCurrentMonth = dayIndex > 0 && dayIndex <= daysInMonth}
                                    {@const prevMonthLastDay = new Date(year, month - 1, 0).getDate()}
                                    {@const day = isCurrentMonth ? dayIndex : (dayIndex <= 0 ? prevMonthLastDay + dayIndex : dayIndex - daysInMonth)}
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
                                        class={shapeInput.itemDateClass ?? (styles.datepicker as InputStyle).item}
                                        class:current-month={isCurrentMonth}
                                        class:out-of-range={isOutOfRange}
                                        class:invalid-date={isInvalidDate}
                                        class:selected={isSelected}
                                        class:today={isToday}
                                        class:invalid={isInvalid}
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