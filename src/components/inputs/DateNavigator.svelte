<script lang="ts">
    import { Input, VirtualSelect } from "$components";
    import {
        CaretLeftIcon,
        CaretRightIcon,
    }                                   from "$icons";
    import type { ShapeInput, ShapeOption } from "$models";

    import { theme }            from "$stores";
    import { CalendarDate, type DateValue } from "@internationalized/date";

    let isDarkMode = $theme === 'dark';

    $: if ( $theme === 'dark' ) {
        isDarkMode = true;
    } else {
        isDarkMode = false;
    }

    export let shapeInput       : ShapeInput;
    export let currentDate: DateValue;
    export let selectedMonth = currentDate.month.toString();
    export let selectedYear = currentDate.year.toString();

    export let togglePopup: VoidFunction;


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

<div 
    class={`custom-daterangepicker-popup absolute top-full right-0 mt-1 z-[9999] p-3 shadow-xl w-[20rem] 
        ${ shapeInput.inputStyle?.borderRadius ?? 'rounded-md' }
    `}
    on:click|stopPropagation
    on:keydown|stopPropagation={e => e.key === 'Enter' && togglePopup()}
    tabindex="0"
    role="button"
    style = {`
        background-color: ${
            isDarkMode
                ?  shapeInput.inputStyle?.dark?.background  ?? 'transparent'
                : shapeInput.inputStyle?.light?.background  ?? 'transparent'
        }; color: ${
            isDarkMode
                ? shapeInput.inputStyle?.dark?.color    ?? '#d1d5db'
                : shapeInput.inputStyle?.light?.color   ?? 'black'
        }; box-shadow: 0 0 0 ${shapeInput.inputStyle?.ringSize ?? '1px'} ${
            isDarkMode
                ? shapeInput.inputStyle?.dark?.ring ?? '#3f3f46'  // zinc-700
                : shapeInput.inputStyle?.light?.ring ?? '#d4d4d8' // zinc-300
    };`}
>
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

            <slot />

            <!-- {#if true}
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
            <slot />

            {/each}
            {/if} -->
        </div>
    </div>
</div>