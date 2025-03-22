<script lang="ts">
    import {
        CalendarDate,
        type DateValue
    }                       from "@internationalized/date";
    import { DatePicker }   from "bits-ui";

    import {
        CalendarBlankIcon,
        CaretLeftIcon,
        CaretRightIcon,
    }                       from "$icons";
    import type {
		InputStyle,
		ShapeInput
	}						from "$models";
    import Description		from "./Description.svelte";
	import { styles } 		from "$lib";


    export let shapeInput       : ShapeInput;
    export let value            : DateValue | undefined = undefined;
    export let onValueChange    : ( value: any ) => void;
    export let setError         : VoidFunction = () => {};


    let currentDate: DateValue | undefined = shapeInput.currentDate
        ? new CalendarDate( new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate() )
        : shapeInput.date
            ? new CalendarDate( shapeInput.date.year, shapeInput.date.month, shapeInput.date.day )
            : value;
</script>
<!-- numberOfMonths = {1} -->

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
        currentDate = value;
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
            <DatePicker.Label class={(styles.datepicker as InputStyle).label}>
                {shapeInput.label}
            </DatePicker.Label>
        {/if}

        <DatePicker.Input
            class= { shapeInput.boxStyle ?? `${( styles.datepicker as InputStyle ).box }` }
        >
            {#snippet children({ segments })}
                {#each segments as { part, value }}
                    <div class="inline-block select-none">
                        {#if part === "literal"}
                            <DatePicker.Segment {part} class="text-muted-foreground p-1">
                                {value}
                            </DatePicker.Segment>
                        {:else}
                            <DatePicker.Segment
                                {part}
                                class="rounded-5px hover:bg-muted focus:bg-muted focus:text-foreground aria-[valuetext=Empty]:text-muted-foreground focus-visible:ring-0! focus-visible:ring-offset-0! px-1 py-1"
                            >
                                {value}
                            </DatePicker.Segment>
                        {/if}
                    </div>
                {/each}
                <DatePicker.Trigger
                    class="text-foreground/60 hover:bg-muted active:bg-dark-10 ml-auto inline-flex size-8 items-center justify-center rounded-[5px] transition-all"
                >
                    <CalendarBlankIcon />
                </DatePicker.Trigger>
            {/snippet}
        </DatePicker.Input>

        <DatePicker.Content
            sideOffset  = { 6 }
            class       = "z-50"
            align       = "end"
            alignOffset = { 0 }
        >
            <DatePicker.Calendar
                class= { shapeInput.contentStyle ?? `${( styles.datepicker as InputStyle ).content }` }
            >
                {#snippet children({ months, weekdays })}
                    <DatePicker.Header class="flex items-center justify-between">
                        <DatePicker.PrevButton
                            class="rounded-9px bg-background-alt hover:bg-muted inline-flex size-10 items-center justify-center transition-all active:scale-[0.98]"
                        >
                            <CaretLeftIcon />
                        </DatePicker.PrevButton>
                        <DatePicker.Heading class="text-[15px] font-medium capitalize" />
                        <DatePicker.NextButton
                            class="rounded-9px bg-background-alt hover:bg-muted inline-flex size-10 items-center justify-center transition-all active:scale-[0.98]"
                        >
                            <CaretRightIcon />
                        </DatePicker.NextButton>
                    </DatePicker.Header>
                    <div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                        {#each months as month}
                            <DatePicker.Grid class="w-full border-collapse select-none space-y-1">
                                <DatePicker.GridHead>
                                    <DatePicker.GridRow class="mb-1 flex w-full justify-between">
                                        {#each weekdays as day}
                                            <DatePicker.HeadCell class="text-muted-foreground font-normal! w-10 rounded-md text-xs">
                                                <div>{day.slice(0, 2)}</div>
                                            </DatePicker.HeadCell>
                                        {/each}
                                    </DatePicker.GridRow>
                                </DatePicker.GridHead>
                                <DatePicker.GridBody>
                                    {#each month.weeks as weekDates}
                                        <DatePicker.GridRow class="flex w-full">
                                            {#each weekDates as date}
                                                <DatePicker.Cell
                                                    {date}
                                                    month={month.value}
                                                    class="p-0! relative size-10 text-center text-sm"
                                                >
                                                    <DatePicker.Day
                                                        class={ shapeInput.itemStyle ?? `${( styles.datepicker as InputStyle ).item }` }
                                                    >
                                                        <div class="bg-blue-500 group-data-[selected]:bg-white group-data-[today]:block absolute top-[5px] hidden size-1 rounded-full transition-all"></div>
                                                        {date.day}
                                                    </DatePicker.Day>
                                                </DatePicker.Cell>
                                            {/each}
                                        </DatePicker.GridRow>
                                    {/each}
                                </DatePicker.GridBody>
                            </DatePicker.Grid>
                        {/each}
                    </div>
                {/snippet}
            </DatePicker.Calendar>
        </DatePicker.Content>

        <Description {shapeInput} date={value} />
    </div>
</DatePicker.Root>
