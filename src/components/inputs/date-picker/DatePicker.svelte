<script lang="ts">
    import { CalendarDate, type DateValue } from "@internationalized/date";
    import { DatePicker }                   from "bits-ui";

    import type { InputStyle, ShapeInput }  from "$models";
    import { CalendarBlankIcon }            from "$icons";
    import Description                      from "../Description.svelte";
    import { numberWithZero, styles }       from "$lib";
    import BoxStyle                         from "../BoxStyle.svelte";
    import DateNavigator                    from "./DateNavigator.svelte";

    export let shapeInput       : ShapeInput;
    export let value            : DateValue | undefined = undefined;
    export let onValueChange    : ( value: any ) => void;
    export let setError         : VoidFunction = () => {};


    function createCalendarDate(): DateValue | undefined {
        if (!value) return undefined;

        const date = new Date(value.year, value.month - 1, value.day);

        return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    }


    function getDefaultDate(): DateValue {
        return new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
    }

    let showPopup = false;
    let inputContainer: HTMLElement;
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
                    selectedDate={selectedDate}
                    onClickDay={( date, isSelected ) => {
                        if ( isSelected ) {
                            onValueChange( undefined );
                            selectedDate    = undefined;
                            currentDate     = new CalendarDate( date.year, date.month, 1 );
                        } else {
                            onValueChange( date );
                            selectedDate    = date;
                            currentDate     = date;
                            showPopup       = false;
                        }

                        setError();
                    }}
                />
            {/if}
        </div>

        <Description {shapeInput} date={value} />
    </div>
</DatePicker.Root>