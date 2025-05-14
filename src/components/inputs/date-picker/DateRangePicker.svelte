<script lang="ts">
    import { onMount } from "svelte";

    import { DateRangePicker, type DateRange }  from "bits-ui";
    import { CalendarDate, type DateValue }     from "@internationalized/date";

    import {
        handleClickOutside,
        togglePopup
    }                                   from "./dateHandler";
    import type {
        ShapeInput,
        ThemeShape,
    }                                       from "$models";
    import { CalendarBlankIcon }            from "$icons";
    import { numberWithZero, UAITheme }     from "$lib";
    import { BoxStyle, Description, Label } from "$components";
    import DateNavigator                    from "./DateNavigator.svelte";


    export let shapeInput       : ShapeInput;
    export let value            : DateRange | any | undefined = undefined;
    export let onValueChange    : ( value: DateRange | undefined ) => void;
    export let setError         : VoidFunction = () => {};
    export let themeShape       : ThemeShape = UAITheme();


    const createEmptyDateRange = () => ({
        start: undefined,
        end: undefined
    });


    const dateRangeValue = (date: any): DateRange => {
        if (!date || !date.start || !date.end) return createEmptyDateRange();

        try {
            return {
                start: new CalendarDate(date.start.year, date.start.month + 1, date.start.day),
                end: new CalendarDate(date.end.year, date.end.month + 1, date.end.day)
            };
        } catch {
            return createEmptyDateRange();
        }
    };


    let showPopup       = false;
    let inputContainer  : HTMLElement;
    let startDate       : DateValue | undefined;
    let endDate         : DateValue | undefined;
    let selectedRange   : DateRange | undefined = dateRangeValue( value );
    let currentDate     : DateValue = getDefaultDate();
    let hoverDate       : DateValue | null = null;


    if ( !currentDate || !currentDate.year ) {
        currentDate = getDefaultDate();
    }


    let selectedMonth = currentDate.month.toString();
    let selectedYear = currentDate.year.toString();


    function getDefaultDate(): DateValue {
        return new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
    }


    const handleDateChange = () => {
        if ( !startDate && !endDate ) {
            onValueChange( undefined );
            setError();
        }
    };


    const handleValueChange = ( newValue: DateRange | undefined ) => {
        selectedRange = newValue || createEmptyDateRange();
        const value = ( newValue?.start && newValue?.end ) && newValue;
        onValueChange( value );
        setError();
    };


    const _togglePopup= () => 
        togglePopup(
            showPopup,
            shapeInput,
            () => currentDate,
            (val) => showPopup = val,
            (val) => currentDate = val
        );


    const _handleClickOutside = ( event: MouseEvent ) =>
        handleClickOutside(
            event,
            inputContainer,
            showPopup,
            'custom-datepicker-popup',
            (val) => showPopup = val
        );


    onMount(() => {
        document.addEventListener("click", _handleClickOutside);
        return () => document.removeEventListener("click", _handleClickOutside);
    });

    // Update selectedMonth and selectedYear when currentDate changes
    $: if ( currentDate ) {
        selectedMonth = currentDate.month.toString();
        selectedYear = currentDate.year.toString();
    }
</script>

<DateRangePicker.Root
    locale="es-ES"
    weekdayFormat="short"
    fixedWeeks={true}
    minValue={shapeInput.minValue}
    maxValue={shapeInput.maxValue}
    disabled={shapeInput.disabled}
    required={shapeInput.required}
    calendarLabel={shapeInput.label}
    readonly={shapeInput.readonly}
    disableDaysOutsideMonth={true}
    numberOfMonths={shapeInput.numberOfMonths}
    value={selectedRange}
    class="w-full"
    onStartValueChange={(e) => {
        startDate = e;
        handleDateChange();
    }}
    onEndValueChange={(e) => {
        endDate = e;
        handleDateChange();
    }}
    onValueChange={handleValueChange}
    isDateDisabled={(value: DateValue) => {
        if (
            !shapeInput.invalidDates ||
            shapeInput.invalidDates.length === 0
        ) return false;

        return shapeInput.invalidDates.includes(value.toString());
    }}
>
    <div class="flex w-full flex-col gap-1.5">
        {#if shapeInput.label}
            <Label { shapeInput } { themeShape } />
        {/if}

        <div bind:this={inputContainer} class="relative">
            <BoxStyle
                { themeShape }
                shapeInput={shapeInput}
                handleOpen={_togglePopup}
            >
                <div class="flex items-center">
                    <span class={!selectedRange?.start ? "text-muted-foreground" : ""}>
                        {selectedRange?.start ? `${numberWithZero(selectedRange.start.day)} / ${numberWithZero(selectedRange.start.month)} / ${selectedRange.start.year}` : "dd / mm / aaaa"}
                    </span>

                    <div aria-hidden="true" class="text-muted-foreground px-1">–⁠⁠⁠⁠⁠</div>

                    <span class={!selectedRange?.end ? "text-muted-foreground" : ""}>
                        {selectedRange?.end ? `${numberWithZero(selectedRange.end.day)} / ${numberWithZero(selectedRange.end.month)} / ${selectedRange.end.year}` : "dd / mm / aaaa"}
                    </span>
                </div>

                <div
                    class="text-foreground/60 active:bg-dark-10 ml-auto inline-flex size-8 items-center justify-center rounded-[5px] transition-all"
                >
                    <CalendarBlankIcon />
                </div>
            </BoxStyle>

            {#if showPopup}
                <DateNavigator
                    { themeShape }
                    bind:shapeInput={shapeInput}
                    bind:currentDate={currentDate}
                    {selectedRange}
                    isRange={true}
                    {hoverDate}
                    onClickDay={(date) => {
                        const newDate = new CalendarDate(date.year, date.month, date.day);

                        const isSameDate = (d1: DateValue | undefined, d2: DateValue | undefined): boolean =>
                            d1?.year === d2?.year && d1?.month === d2?.month && d1?.day === d2?.day;

                        const isStart = isSameDate(selectedRange?.start, newDate);
                        const isEnd   = isSameDate(selectedRange?.end, newDate);

                        // Si se hace clic en el inicio y no hay fin, limpiar selección
                        if (isStart && !selectedRange?.end) {
                            handleValueChange(undefined);
                            setError();
                            currentDate = new CalendarDate(date.year, date.month, 1);
                            return;
                        }

                        // Si se hace clic en el inicio y hay fin, mantener solo el final
                        if (isStart && selectedRange?.end) {
                            handleValueChange({
                                start: selectedRange.end,
                                end  : undefined
                            });
                            setError();
                            return;
                        }

                        // Si se hace clic en el final, mantener solo el inicio
                        if (isEnd) {
                            handleValueChange({
                                start: selectedRange?.start,
                                end  : undefined
                            });
                            setError();
                            return;
                        }

                        // Si no hay selección previa o ya hay un rango completo, comenzar una nueva selección
                        if (!selectedRange?.start || (selectedRange.start && selectedRange.end)) {
                            handleValueChange({
                                start: newDate,
                                end  : undefined
                            });
                        } else {
                            // Si hay solo inicio, completar el rango
                            if (newDate.compare(selectedRange.start) < 0) {
                                handleValueChange({
                                    start: newDate,
                                    end  : selectedRange.start
                                });
                            } else {
                                handleValueChange({
                                    start: selectedRange.start,
                                    end  : newDate
                                });
                            }

                            showPopup = false;
                        }

                        setError();
                    }}
                    onHoverDateChange={(hover) => hoverDate = hover}
                >
                </DateNavigator>
            {/if}
        </div>

        <Description {shapeInput} date={value} />
    </div>
</DateRangePicker.Root>
