<script lang="ts">
    import {
        CalendarDate,
        type DateValue
    }                           from "@internationalized/date";
    import type { DateRange }   from "bits-ui";

    import type {
        ShapeInput,
        ShapeOption,
        ThemeShape,
    }                               from "$models";
    import {
        CaretLeftIcon,
        CaretRightIcon,
    }                               from "$icons";
    import { Input, VirtualSelect } from "$components";
    import ContentStyle             from "../ContentStyle.svelte";
    import { UAITheme }             from "$lib";


    export let shapeInput           : ShapeInput;
    export let currentDate          : DateValue;
    export let selectedMonth        : string = currentDate.month.toString();
    export let selectedYear         : string = currentDate.year.toString();
    export let selectedDate         : DateValue | undefined = undefined;
    export let selectedRange        : DateRange | undefined = undefined;
    export let hoverDate            : DateValue | null = null;
    export let onClickDay           : ( date: DateValue, isSelected: boolean ) => void = () => {};
    export let onHoverDateChange    : ( hover: DateValue | null ) => void = () => {};
    export let isRange              : boolean = false;
    export let themeShape           : ThemeShape = UAITheme();


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
</script>

<ContentStyle { themeShape }>
    <div class="flex space-x-1 py-1">
        <button 
            type="button"
            class="rounded-9px bg-background-alt hover:bg-muted inline-flex size-10 items-center justify-center transition-all active:scale-[0.98]"
            on:click={() => {
                const prevMonth = new Date(currentDate?.year || new Date().getFullYear(), (currentDate?.month || new Date().getMonth() + 1) - 2, 1);
                currentDate     = new CalendarDate(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1);
                selectedMonth   = ( prevMonth.getMonth() + 1 ).toString();
                selectedYear    = prevMonth.getFullYear().toString();
            }}
        >
            <CaretLeftIcon />
        </button>

        <div class="flex items-center gap-1">
            <div class="w-36 month-select-container">
                <VirtualSelect
                    shapeInput={{
                        id: "month-select-range",
                        name: "month-select-range",
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
                        id: "year-input-range",
                        name: "year-input-range",
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
            class="rounded-9px bg-background-alt hover:bg-muted inline-flex size-10 items-center justify-center transition-all active:scale-[0.98]"
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
                <div class="text-muted-foreground text-xs text-center font-medium">{day}</div>
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
                {@const dayIndex         = i - startOffset + 1}
                {@const isCurrentMonth  = dayIndex > 0 && dayIndex <= daysInMonth}
                {@const prevMonthLast   = new Date(year, month - 1, 0).getDate()}
                {@const day             = isCurrentMonth ? dayIndex : (dayIndex <= 0 ? prevMonthLast + dayIndex : dayIndex - daysInMonth)}
                {@const dateValue       = isCurrentMonth ? new CalendarDate(year, month, day) : null}

                {@const isOutOfRange    = isCurrentMonth && dateValue && (
                    (shapeInput.minValue && dateValue < shapeInput.minValue) || 
                    (shapeInput.maxValue && dateValue > shapeInput.maxValue)
                )}
                {@const isInvalidDate   = isCurrentMonth && dateValue && shapeInput.invalidDates?.includes(dateValue.toString())}
                {@const isInvalid       = isOutOfRange || isInvalidDate}
                {@const isToday         = isCurrentMonth && todayDate.year === year && todayDate.month === month && todayDate.day === day}

                <!-- Sin rango -->
                {@const isSelected = isCurrentMonth && selectedDate && day === selectedDate.day && month === selectedDate.month && year === selectedDate.year && !isInvalid}
                <!-- Con rango -->
                {@const isStart     = isCurrentMonth && selectedRange?.start && day === selectedRange.start.day && month === selectedRange.start.month && year === selectedRange.start.year && !isInvalid}
                {@const isEnd       = isCurrentMonth && selectedRange?.end && day === selectedRange.end.day && month === selectedRange.end.month && year === selectedRange.end.year && !isInvalid}
                {@const isInRange   = isCurrentMonth && !isInvalid && selectedRange?.start && selectedRange?.end && dateValue &&
                    (dateValue.compare(selectedRange.start) >= 0 && dateValue.compare(selectedRange.end) <= 0)}
                {@const isInHoverRange = isCurrentMonth && !isInvalid && selectedRange?.start && !selectedRange?.end && dateValue && hoverDate &&
                    ((dateValue.compare(selectedRange.start) >= 0 && dateValue.compare(hoverDate) <= 0) || 
                    (dateValue.compare(hoverDate) >= 0 && dateValue.compare(selectedRange.start) <= 0))}

                <button
                    type="button"
                    class={isRange 
                        ? "size-8 flex items-center justify-center rounded-md text-sm relative transition-colors duration-200 [&:not(.current-month)]:text-zinc-300 [&:not(.current-month)]:cursor-not-allowed [&:not(.current-month)]:opacity-50 [&.out-of-range]:text-zinc-300 [&.out-of-range]:dark:text-zinc-500 [&.out-of-range]:cursor-not-allowed [&.out-of-range]:opacity-60 [&.invalid-date]:text-zinc-300 [&.invalid-date]:dark:text-zinc-500 [&.invalid-date]:cursor-not-allowed [&.current-month:not(.out-of-range):not(.invalid-date)]:hover:bg-blue-100 [&.current-month:not(.out-of-range):not(.invalid-date)]:dark:hover:bg-blue-900/30 [&.start-date]:bg-blue-500 [&.start-date]:text-white [&.start-date]:font-bold [&.start-date]:rounded-l-md [&.end-date]:bg-blue-500 [&.end-date]:text-white [&.end-date]:font-bold [&.end-date]:rounded-r-md [&.in-range:not(.start-date):not(.end-date)]:bg-blue-100 [&.in-range:not(.start-date):not(.end-date)]:dark:bg-blue-900/30 [&.in-range:not(.start-date):not(.end-date)]:text-foreground [&.in-range:not(.start-date):not(.end-date)]:hover:bg-blue-200 [&.in-range:not(.start-date):not(.end-date)]:dark:hover:bg-blue-800/30 [&.in-hover-range:not(.start-date):not(.end-date):not(.in-range)]:bg-blue-50 [&.in-hover-range:not(.start-date):not(.end-date):not(.in-range)]:dark:bg-blue-900/20 [&.in-hover-range:not(.start-date):not(.end-date):not(.in-range)]:text-foreground [&.today:not(.start-date):not(.end-date):not(.in-range):not(.in-hover-range)]:font-bold [&.today:not(.start-date):not(.end-date):not(.in-range):not(.in-hover-range)]:text-blue-500"
                        : "size-8 flex items-center justify-center rounded-md text-sm relative transition-colors duration-200 [&.current-month:not(.out-of-range):not(.invalid-date)]:hover:bg-zinc-200 [&.current-month:not(.out-of-range):not(.invalid-date)]:hover:text-foreground [&.current-month:not(.out-of-range):not(.invalid-date)]:dark:hover:bg-zinc-700 [&.current-month:not(.out-of-range):not(.invalid-date)]:dark:hover:text-white [&:not(.current-month)]:text-zinc-300 [&:not(.current-month)]:cursor-not-allowed [&:not(.current-month)]:opacity-50 [&.out-of-range]:text-zinc-300 [&.out-of-range]:dark:text-zinc-500 [&.out-of-range]:cursor-not-allowed [&.out-of-range]:opacity-60 [&.invalid-date]:text-zinc-300 [&.invalid-date]:dark:text-zinc-500 [&.invalid-date]:cursor-not-allowed [&.selected]:bg-blue-500 [&.selected]:text-white [&.selected]:font-bold [&.selected]:hover:bg-blue-600 [&.today:not(.selected):not(.invalid)]:font-bold [&.today:not(.selected):not(.invalid)]:text-primary"}
                    class:current-month={isCurrentMonth}
                    class:out-of-range={isOutOfRange}
                    class:invalid-date={isInvalidDate}
                    class:invalid={isInvalid}
                    class:today={isToday}
                    class:selected={!isRange && isSelected}
                    class:start-date={isRange && isStart}
                    class:end-date={isRange && isEnd}
                    class:in-range={isRange && isInRange}
                    class:in-hover-range={isRange && isInHoverRange}
                    disabled={!isCurrentMonth || isInvalid}
                    on:click={() => {
                        if (isCurrentMonth && !isInvalid && dateValue) {
                            const isSel = (isRange ? isStart || isEnd : isSelected) ?? false;
                            onClickDay(dateValue, isSel);
                        }
                    }}
                    on:mouseenter={() => {
                        if (isRange && isCurrentMonth && !isInvalid && dateValue) {
                            onHoverDateChange(dateValue);
                        }
                    }}
                    on:mouseleave={() => {
                        if (isRange && hoverDate?.day === day && hoverDate?.month === month && hoverDate?.year === year) {
                            onHoverDateChange(null);
                        }
                    }}
                >
                    {#if isToday && (!isRange && !isSelected)}
                        <div class="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"></div>
                    {/if}
                    {day}
                </button>
            {/each}
            {/if}
        </div>
    </div>
</ContentStyle>
