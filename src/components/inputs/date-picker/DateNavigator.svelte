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
    }                       from "$models";
    import {
        CaretLeftIcon,
        CaretRightIcon,
    }                       from "$icons";
    import { 
        Input,
        VirtualSelect,
        ButtonNavigator,
        ContentStyle
    }                       from "$components";
    import { UAITheme }     from "$lib";
    import { theme }        from "$stores";
    import { tailwindToRGBA } from "$lib/styles";


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
    
    let isDarkMode = $theme === 'dark';
    
    $: if ($theme === 'dark') {
        isDarkMode = true;
    } else {
        isDarkMode = false;
    }
    
    // Definimos los colores para diferentes estados
    type Colors = {
        tonalityDark  : number,
        tonalityLight : number,
        opacity       : number
    }
    
    // Configuración de colores para diferentes estados
    const rangeColors: Colors = { tonalityDark: 200, tonalityLight: 200, opacity: 80 };
    const hoverRangeColors: Colors = { tonalityDark: 100, tonalityLight: 200, opacity: 80 };
    const dayHoverColors: Colors = { tonalityDark: 300, tonalityLight: 200, opacity: 60 };
    
    // Funciones para calcular tonalidades basadas en el enfoque de ButtonNavigator
    function setTonalityDark(theme: ThemeShape, tonalityRange: number, opacity: number): string {
        let tonalityNumber = Number(theme.dark.backgroundTonality);
        if (tonalityNumber === 950) tonalityNumber = 900;
        let tonality = tonalityNumber - tonalityRange;
        return `bg-${theme.dark.backgroundColor}-${tonality}/${opacity}`;
    }
    
    function setTonalityLight(theme: ThemeShape, tonalityRange: number, opacity: number): string {
        let tonalityNumber = Number(theme.light.backgroundTonality);
        if (tonalityNumber === 50) tonalityNumber = 100;
        let tonality = tonalityNumber + tonalityRange;
        return `bg-${theme.light.backgroundColor}-${tonality}/${opacity}`;
    }
    
    function setTonality(theme: ThemeShape, colors: Colors): string {
        const color = isDarkMode
            ? setTonalityDark(theme, colors.tonalityDark, colors.opacity)
            : setTonalityLight(theme, colors.tonalityLight, colors.opacity);
        return tailwindToRGBA(color);
    }
    
    // Función para obtener el color primario del tema para elementos seleccionados
    function getPrimaryColor(): string {
        return isDarkMode 
            ? (themeShape.dark.secondaryBackground as string)
            : (themeShape.light.secondaryBackground as string);
    }
    
    function getCurrentDay(): string {
        return isDarkMode 
            ? (themeShape.dark.color as string)
            : (themeShape.light.color as string);
    }
    
    // Función para obtener el color de texto para elementos seleccionados
    function getTextColor(): string {
        return isDarkMode 
            ? (themeShape.dark.secondaryColor as string)
            : (themeShape.light.secondaryColor as string);
    }
    
    // Función para obtener el color de fondo para elementos en rango
    function getRangeBackgroundColor(): string {
        return setTonality(themeShape, rangeColors);
    }
    
    // Función para obtener el color de hover para elementos en rango
    function getRangeHoverColor(): string {
        return setTonality(themeShape, hoverRangeColors);
    }
    
    // Función para obtener el color de hover para días
    function getDayHoverColor(): string {
        return setTonality(themeShape, dayHoverColors);
    }
    
    // Función para aplicar el estilo directamente al elemento
    function getSelectedStyle(isSelected: boolean | undefined, isStart: boolean | undefined, isEnd: boolean | undefined): string {
        if (isRange) {
            if (isStart || isEnd) {
                return `background-color: ${getPrimaryColor()} !important; color: ${getTextColor()} !important;`;
            }
        } else if (isSelected) {
            return `background-color: ${getPrimaryColor()} !important; color: ${getTextColor()} !important;`;
        }
        return '';
    }

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
    <div class="flex justify-center py-1 items-center gap-2">
        <ButtonNavigator
            { themeShape }
            className = "justify-center size-10 active:scale-[0.97] mb-1"
            onClick={() => {
                const prevMonth = new Date(currentDate?.year || new Date().getFullYear(), (currentDate?.month || new Date().getMonth() + 1) - 2, 1);
                currentDate     = new CalendarDate(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1);
                selectedMonth   = ( prevMonth.getMonth() + 1 ).toString();
                selectedYear    = prevMonth.getFullYear().toString();
            }}
        >
            <CaretLeftIcon />
        </ButtonNavigator>

        <div class="flex items-center gap-2">
            <div class="w-36">
                <VirtualSelect
                    { themeShape }
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
            <div class="w-20">
                <Input
                    { themeShape }
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

        <ButtonNavigator
            { themeShape }
            className = "justify-center size-10 active:scale-[0.97] mb-1"
            onClick={() => {
                const nextMonth = new Date(currentDate?.year || new Date().getFullYear(), (currentDate?.month || new Date().getMonth() + 1), 1);
                currentDate     = new CalendarDate(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 1);
                selectedMonth   = (nextMonth.getMonth() + 1).toString();
                selectedYear    = nextMonth.getFullYear().toString();
            }}
        >
            <CaretRightIcon />
        </ButtonNavigator>
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
                        ? "size-8 flex items-center justify-center rounded-md text-sm relative transition-colors duration-200 [&:not(.current-month)]:text-zinc-300 [&:not(.current-month)]:cursor-not-allowed [&:not(.current-month)]:opacity-50 [&.out-of-range]:text-zinc-300 [&.out-of-range]:dark:text-zinc-500 [&.out-of-range]:cursor-not-allowed [&.out-of-range]:opacity-60 [&.invalid-date]:text-zinc-300 [&.invalid-date]:dark:text-zinc-500 [&.invalid-date]:cursor-not-allowed [&.start-date]:font-bold [&.start-date]:rounded-l-md [&.end-date]:font-bold [&.end-date]:rounded-r-md [&.today:not(.start-date):not(.end-date):not(.in-range):not(.in-hover-range)]:font-bold"
                        : "size-8 flex items-center justify-center rounded-md text-sm relative transition-colors duration-200 [&:not(.current-month)]:text-zinc-300 [&:not(.current-month)]:cursor-not-allowed [&:not(.current-month)]:opacity-50 [&.out-of-range]:text-zinc-300 [&.out-of-range]:dark:text-zinc-500 [&.out-of-range]:cursor-not-allowed [&.out-of-range]:opacity-60 [&.invalid-date]:text-zinc-300 [&.invalid-date]:dark:text-zinc-500 [&.invalid-date]:cursor-not-allowed [&.selected]:font-bold [&.today:not(.selected):not(.invalid)]:font-bold"}
                    style={`
                        ${getSelectedStyle(isSelected, isStart, isEnd)}
                        ${(isRange && isInRange && !isStart && !isEnd) ? `background-color: ${getRangeBackgroundColor()} !important; color: inherit;` : ''}
                        ${(isRange && isInHoverRange && !isStart && !isEnd && !isInRange) ? `background-color: ${getRangeHoverColor()} !important; color: inherit;` : ''}
                        ${(isToday && ((!isRange && !isSelected) || (isRange && !isStart && !isEnd && !isInRange && !isInHoverRange))) ? `color: ${getPrimaryColor()};` : ''}
                    `}
                    on:mouseenter={({ currentTarget }) => {
                        if (isCurrentMonth && !isInvalid && !isSelected && !isStart && !isEnd && !isInRange && !isInHoverRange) {
                            currentTarget.style.backgroundColor = getDayHoverColor();
                        }
                        if (isRange && isCurrentMonth && !isInvalid && dateValue) {
                            onHoverDateChange(dateValue);
                        }
                    }}
                    on:mouseleave={({ currentTarget }) => {
                        if (isCurrentMonth && !isInvalid && !isSelected && !isStart && !isEnd && !isInRange && !isInHoverRange) {
                            currentTarget.style.backgroundColor = '';
                        }
                    }}
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
                    on:mouseleave={() => {
                        if (isRange && hoverDate?.day === day && hoverDate?.month === month && hoverDate?.year === year) {
                            onHoverDateChange(null);
                        }
                    }}
                >
                    {#if isToday && (!isRange && !isSelected)}
                        <div class="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={`background-color: ${getCurrentDay()};`}></div>
                    {/if}
                    {day}
                </button>
            {/each}
            {/if}
        </div>
    </div>
</ContentStyle>
