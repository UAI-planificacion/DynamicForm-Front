<script lang="ts">
    import { onMount } from "svelte";

    import { CalendarDate, type DateValue } from "@internationalized/date";
    import { DatePicker }                   from "bits-ui";

    import type { InputStyle, ShapeInput }  from "$models";
    import { CalendarBlankIcon }            from "$icons";
    import Description                      from "./Description.svelte";
    import { numberWithZero, styles }       from "$lib";
    import { inputUAITheme }                from "$lib/styles/themes/uai-theme";
    import BoxStyle                         from "./BoxStyle.svelte";
    import DateNavigator                    from "./DateNavigator.svelte";
    import { theme }                        from "$stores";


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


    let showPopup = true;
    let inputContainer: HTMLElement;


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

        <div bind:this={inputContainer} class="relative">
            <BoxStyle
                shapeInput={shapeInput}
                handleOpen={togglePopup}
            >
                {#if selectedDate}
                    <span>{numberWithZero(selectedDate.day)} / {numberWithZero(selectedDate.month)} / {selectedDate.year}</span>
                {:else}
                    <span class="text-muted-foreground">dd / mm / aaaa</span>
                {/if}

                <div class="text-foreground/60 rounded-lg active:bg-dark-10 ml-auto inline-flex size-8 items-center justify-center transition-all">
                    <CalendarBlankIcon />
                </div>
            </BoxStyle>

            {#if showPopup}
                <DateNavigator
                    bind:shapeInput={shapeInput}
                    bind:currentDate={currentDate}
                    togglePopup={togglePopup}
                >
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
                </DateNavigator>
            {/if}
        </div>

        <Description {shapeInput} date={value} />
    </div>
</DatePicker.Root>