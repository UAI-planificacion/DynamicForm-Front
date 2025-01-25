<script lang="ts">
    import {
        CalendarDate,
        type DateValue
    }                       from "@internationalized/date";
    import { DatePicker }   from "bits-ui";

    import {
        CalendarBlankIcon,
        CaretLeftIcon,
        CaretRightIcon
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


    const date  = new Date();
    const year  = date.getFullYear();
    const month = date.getMonth() - 1;
    const day   = date.getDate();


    let currentDate: DateValue | undefined = shapeInput.currentDate
        ? new CalendarDate( year, month, day )
        : shapeInput.date
            ? new CalendarDate( shapeInput.date.year, shapeInput.date.month, shapeInput.date.day )
            : undefined;
</script>

<!-- multiple        = { shapeInput.multiple } -->
<DatePicker.Root
    onValueChange   = {( value ) => { onValueChange( value ); setError(); currentDate = value }}
    locale          = "es"
    weekdayFormat   = "short"
    fixedWeeks      = { true }
    disabled        = { shapeInput.disabled }
    readonly        = { shapeInput.readonly }
    value           = { currentDate }
    minValue        = { shapeInput.minValue }
    maxValue        = { shapeInput.maxValue }
>
    <div class="flex w-full flex-col gap-1.5">
        {#if shapeInput.label}
            <DatePicker.Label class={( styles.datepicker as InputStyle ).label }>
                { shapeInput.label }
            </DatePicker.Label>
        {/if}

        <DatePicker.Input
            let:segments
            class={( styles.datepicker as InputStyle ).box }
        >
            {#each segments as { part, value }}
                <div class="inline-block select-none">
                    {#if part === "literal"}
                        <DatePicker.Segment {part} class="p-1 text-muted-foreground">
                            {value}
                        </DatePicker.Segment>
                    {:else}
                        <DatePicker.Segment
                            {part}
                            class="rounded-5px px-1 py-1 hover:bg-muted focus:bg-muted focus:text-foreground focus-visible:!ring-0 focus-visible:!ring-offset-0 aria-[valuetext=Empty]:text-muted-foreground"
                        >
                            {value}
                        </DatePicker.Segment>
                    {/if}
                </div>
            {/each}

            <DatePicker.Trigger
                class="ml-auto inline-flex size-8 items-center justify-center rounded-[5px] text-foreground/60 transition-all hover:bg-muted active:bg-dark-10"
            >
                <CalendarBlankIcon />
            </DatePicker.Trigger>
        </DatePicker.Input>

        <DatePicker.Content
            sideOffset          = {8}
            alignOffset         = {0}
            transitionConfig    = {{ duration: 150, y: -8 }}
            class               = "z-50"
        >
            <DatePicker.Calendar
                class = {( styles.datepicker as InputStyle ).content }
                let:months
                let:weekdays
            >
                <DatePicker.Header class="flex items-center justify-between">
                    <DatePicker.PrevButton
                        class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:bg-muted active:scale-98"
                    >
                        <CaretLeftIcon />
                    </DatePicker.PrevButton>

                    <DatePicker.Heading class="text-[15px] font-medium capitalize" />

                    <DatePicker.NextButton
                        class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:bg-muted active:scale-98"
                    >
                        <CaretRightIcon />
                    </DatePicker.NextButton>
                </DatePicker.Header>

                <div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    {#each months as month}
                        <DatePicker.Grid class="w-full border-collapse select-none space-y-1">
                            <DatePicker.GridHead>
                                <DatePicker.GridRow class="mb-1 flex w-full justify-between bg-zinc-200 dark:bg-zinc-600 rounded-lg">
                                    {#each weekdays as day}
                                    <!-- Semanas -->
                                        <DatePicker.HeadCell class="w-10 rounded-md text-xs !font-normal text-muted-foreground capitalize p-1">
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
                                                class="relative size-10 !p-0 text-center text-sm"
                                            >
                                                <DatePicker.Day
                                                    {date}
                                                    month={month.value}
                                                    class={( styles.datepicker as InputStyle ).input }
                                                >
                                                <!-- svelte-ignore element_invalid_self_closing_tag -->
                                                    <div class=" absolute top-[5px] hidden size-1 rounded-full bg-foreground transition-all group-data-[today]:block group-data-[selected]:bg-background bg-blue-500" />
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
            </DatePicker.Calendar>
        </DatePicker.Content>

        <Description { shapeInput } date={ value } />
    </div>
</DatePicker.Root>
