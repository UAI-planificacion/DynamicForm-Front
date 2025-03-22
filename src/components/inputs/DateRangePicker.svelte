<script lang="ts">
    import { onMount } from 'svelte';

    import { DateRangePicker, type DateRange }  from "bits-ui";
    import { CalendarDate, type DateValue }     from "@internationalized/date";

    import {
        CalendarBlankIcon,
        CaretLeftIcon,
        CaretRightIcon
    }                                       from "$icons";
    import type { InputStyle, ShapeInput }  from "$models";
    import { styles }                       from "$lib";
    import Description                      from "./Description.svelte";


    export let shapeInput       : ShapeInput;
    export let value            : DateRange | any | undefined = undefined;
    export let onValueChange    : ( value: DateRange | undefined ) => void;
    export let setError         : VoidFunction = () => {};

    let internalValue   : DateRange | undefined;
    let startDate       : DateValue | undefined;
    let endDate         : DateValue | undefined;

    const createEmptyDateRange = () => ({
        start: undefined,
        end: undefined
    });

    const dateRangeValue = (date : any) : DateRange => {
        if (!date || !date.start || !date.end) {
            return createEmptyDateRange();
        }

        try {
            return {
                start: new CalendarDate(date.start.year, date.start.month + 1, date.start.day),
                end: new CalendarDate(date.end.year, date.end.month + 1, date.end.day)
            };
        } catch {
            return createEmptyDateRange();
        }
    };

    onMount(() => {
        internalValue = dateRangeValue(value);
    });

    const handleDateChange = () => {
        if (!startDate && !endDate && shapeInput.required) {
            onValueChange(undefined);
            setError();
        }
    };

    const handleValueChange = (newValue: DateRange | undefined) => {
        internalValue = newValue || createEmptyDateRange();
        if (newValue?.start && newValue?.end) {
            onValueChange(newValue);
        } else {
            onValueChange(undefined);
        }
        setError();
    };
</script>

<DateRangePicker.Root
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
    value                   = { internalValue }
    class                   = "w-full"
    onStartValueChange      = {( e ) => {
        startDate = e;
        handleDateChange();
    }}
    onEndValueChange        = {( e ) => {
        endDate = e;
        handleDateChange();
    }}
    onValueChange           = { handleValueChange }
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
            <DateRangePicker.Label class={(styles.datepicker as InputStyle).label}>
                {shapeInput.label}
            </DateRangePicker.Label>
        {/if}

        <div
            class= { shapeInput.boxStyle ?? `${( styles.datepicker as InputStyle ).box }` }
        >
            {#each ["start", "end"] as const as type}
                <DateRangePicker.Input {type} >
                    {#snippet children({ segments })}
                        {#each segments as { part, value }}
                            <div class="inline-block select-none">
                                {#if part === "literal"}
                                    <DateRangePicker.Segment
                                        {part}
                                        class="text-muted-foreground p-1"
                                    >
                                        {value}
                                    </DateRangePicker.Segment>
                                {:else}
                                    <DateRangePicker.Segment
                                        {part}
                                        class="rounded-5px hover:bg-blue-500 focus:bg-blue-500 focus:text-foreground aria-[valuetext=Empty]:text-muted-foreground focus-visible:ring-0! focus-visible:ring-offset-0! px-1 py-1"
                                    >
                                        {value}
                                    </DateRangePicker.Segment>
                                {/if}
                            </div>
                        {/each}
                    {/snippet}
                </DateRangePicker.Input>

                {#if type === "start"}
                    <div aria-hidden="true" class="text-muted-foreground px-1">–⁠⁠⁠⁠⁠</div>
                {/if}
            {/each}

            <DateRangePicker.Trigger
                class="text-foreground/60 hover:bg-muted active:bg-dark-10 ml-auto inline-flex size-8 items-center justify-center rounded-[5px] transition-all"
            >
                <CalendarBlankIcon />
            </DateRangePicker.Trigger>
        </div>

        <DateRangePicker.Content
            sideOffset  = { 6 }
            class       ="z-50"
            align       = "end"
            alignOffset = { 0 }
        >
            <DateRangePicker.Calendar
                class= { shapeInput.contentStyle ?? `${( styles.datepicker as InputStyle ).content }` }
            >
                {#snippet children({ months, weekdays })}
                    <DateRangePicker.Header class="flex items-center justify-between">
                        <DateRangePicker.PrevButton
                            class="rounded-9px bg-background-alt hover:bg-muted inline-flex size-10 items-center justify-center transition-all active:scale-[0.98]"
                        >
                            <CaretLeftIcon />
                        </DateRangePicker.PrevButton>

                        <DateRangePicker.Heading class="text-[15px] font-medium" />

                        <DateRangePicker.NextButton
                            class="rounded-9px bg-background-alt hover:bg-muted inline-flex size-10 items-center justify-center transition-all active:scale-[0.98]"
                        >
                            <CaretRightIcon />
                        </DateRangePicker.NextButton>
                    </DateRangePicker.Header>

                    <div
                        class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0"
                    >
                        {#each months as month}
                            <DateRangePicker.Grid class="w-full border-collapse select-none space-y-1">
                                <DateRangePicker.GridHead>
                                    <DateRangePicker.GridRow class="mb-1 flex w-full justify-between">
                                        {#each weekdays as day}
                                            <DateRangePicker.HeadCell class="text-muted-foreground font-normal! w-10 rounded-md text-xs">
                                                <div>{day.slice(0, 2)}</div>
                                            </DateRangePicker.HeadCell>
                                        {/each}
                                    </DateRangePicker.GridRow>
                                </DateRangePicker.GridHead>

                                <DateRangePicker.GridBody>
                                    {#each month.weeks as weekDates}
                                        <DateRangePicker.GridRow class="flex w-full">
                                            {#each weekDates as date}
                                                <DateRangePicker.Cell
                                                    {date}
                                                    month={month.value}
                                                    class="p-0! relative m-0 size-10 overflow-visible text-center text-sm focus-within:relative focus-within:z-20"
                                                >
                                                    <DateRangePicker.Day
                                                        class={ shapeInput.itemRangeStyle ?? `${( styles.datepicker as InputStyle ).rangeItem }` }
                                                    >
                                                        <div class="bg-blue-500 group-data-[selected]:bg-white group-data-[today]:block absolute top-[5px] hidden size-1 rounded-full transition-all"></div>

                                                        {date.day}
                                                    </DateRangePicker.Day>
                                                </DateRangePicker.Cell>
                                            {/each}
                                        </DateRangePicker.GridRow>
                                    {/each}
                                </DateRangePicker.GridBody>
                            </DateRangePicker.Grid>
                        {/each}
                    </div>
                {/snippet}
            </DateRangePicker.Calendar>
        </DateRangePicker.Content>

        <Description {shapeInput} date={value} />
    </div>
</DateRangePicker.Root>
