<script lang="ts">
    import { onMount } from "svelte";

    import { DateRangePicker, type DateRange }  from "bits-ui";
    import { CalendarDate, type DateValue }     from "@internationalized/date";

    import {
        CalendarBlankIcon,
        CaretLeftIcon,
        CaretRightIcon
    }                                       from "$icons";
    import type { InputStyle, ShapeInput }  from "$models";
    import { numberWithZero, styles }       from "$lib";
    import Description                      from "./Description.svelte";

    export let shapeInput: ShapeInput;
    export let value: DateRange | any | undefined = undefined;
    export let onValueChange: (value: DateRange | undefined) => void;
    export let setError: VoidFunction = () => {};


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
    let popupStyles     = {};
    let startDate       : DateValue | undefined;
    let endDate         : DateValue | undefined;
    let selectedRange   : DateRange | undefined = dateRangeValue( value );
    let currentDate     : DateValue = getDefaultDate();
    let hoverDate       : DateValue | null = null;


    if ( !currentDate || !currentDate.year ) {
        currentDate = getDefaultDate();
    }


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


    function togglePopup() {
        if ( shapeInput.disabled || shapeInput.readonly ) return;

        showPopup = !showPopup;

        if ( showPopup ) {
            if ( !currentDate || !currentDate.year ) {
                currentDate = getDefaultDate();
            }

            const rect = inputContainer.getBoundingClientRect();

            popupStyles = {
                top     : `${rect.bottom + window.scrollY}px`,
                left    : `${rect.left + window.scrollX}px`,
                width   : `${rect.width}px`
            };
        }
    }


    function handleClickOutside( event: MouseEvent ) {
        if ( showPopup && inputContainer && !inputContainer.contains( event.target as Node )) {
            showPopup = false;
        }
    }


    onMount(() => {
        document.addEventListener( 'click', handleClickOutside );
        
        return () => {
            document.removeEventListener( 'click', handleClickOutside );
        };
    });
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
            <DateRangePicker.Label class={shapeInput.labelDateClass ?? (styles.datepicker as InputStyle).label}>
                {shapeInput.label}
            </DateRangePicker.Label>
        {/if}

        <div bind:this={inputContainer} class="relative">
            <!-- Input personalizado -->
            <div 
                class={shapeInput.boxDateClass ?? `${(styles.datepicker as InputStyle).box}`}
                on:click={togglePopup}
                role="button"
                tabindex="0"
                on:keydown={(e) => e.key === 'Enter' && togglePopup()}
            >
                <div class="flex items-center justify-between w-full">
                    <div class="flex-1 flex items-center">
                        <span class={!selectedRange?.start ? "text-muted-foreground" : ""}>
                            {selectedRange?.start ? `${numberWithZero(selectedRange.start.day)} / ${numberWithZero(selectedRange.start.month)} / ${selectedRange.start.year}` : "dd / mm / aaaa"}
                        </span>
                        <div aria-hidden="true" class="text-muted-foreground px-1">–⁠⁠⁠⁠⁠</div>
                        <span class={!selectedRange?.end ? "text-muted-foreground" : ""}>
                            {selectedRange?.end ? `${numberWithZero(selectedRange.end.day)} / ${numberWithZero(selectedRange.end.month)} / ${selectedRange.end.year}` : "dd / mm / aaaa"}
                        </span>
                    </div>
                    <button 
                        type="button" 
                        class="text-foreground/60 active:bg-dark-10 ml-auto inline-flex size-8 items-center justify-center rounded-[5px] transition-all"
                    >
                        <CalendarBlankIcon />
                    </button>
                </div>
            </div>

            <!-- Popup personalizado -->
            {#if showPopup}
                <div 
                    class="custom-daterangepicker-popup absolute top-full right-0 mt-2 z-[9999] bg-background rounded-lg shadow-lg w-auto"
                >
                    <div class={shapeInput.contentDateClass ?? `${(styles.datepicker as InputStyle).content}`}>
                        <div class="flex items-center justify-between p-0">
                            <button 
                                type="button"
                                class="rounded-9px bg-background-alt hover:bg-muted inline-flex size-10 items-center justify-center transition-all active:scale-[0.98]"
                                on:click={() => {
                                    // Solo cambiar el mes de visualización, sin afectar la selección
                                    const prevMonth = new Date(currentDate?.year || new Date().getFullYear(), (currentDate?.month || new Date().getMonth() + 1) - 2, 1);
                                    currentDate = new CalendarDate(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1);
                                }}
                            >
                                <CaretLeftIcon />
                            </button>
                            
                            <div class="text-[15px] font-medium capitalize">
                                {new Date(currentDate?.year || new Date().getFullYear(), (currentDate?.month || new Date().getMonth() + 1) - 1, 1).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                            </div>
                            
                            <button 
                                type="button"
                                class="rounded-9px bg-background-alt hover:bg-muted inline-flex size-10 items-center justify-center transition-all active:scale-[0.98]"
                                on:click={() => {
                                    // Solo cambiar el mes de visualización, sin afectar la selección
                                    const nextMonth = new Date(currentDate?.year || new Date().getFullYear(), (currentDate?.month || new Date().getMonth() + 1), 1);
                                    currentDate = new CalendarDate(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 1);
                                }}
                            >
                                <CaretRightIcon />
                            </button>
                        </div>
                        
                        <!-- Calendario simplificado -->
                        <div class="p-3">
                            <div class="grid grid-cols-7 gap-1">
                                {#each ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'] as day}
                                    <div class="text-muted-foreground text-xs text-center font-medium">{day}</div>
                                {/each}
                                
                                {#if true}
                                <!-- Siempre renderizar el calendario, currentDate ahora siempre tiene un valor -->
                                {@const year = currentDate.year}
                                {@const month = currentDate.month}
                                {@const firstDay = new Date(year, month - 1, 1)}
                                {@const lastDay = new Date(year, month, 0)}
                                {@const daysInMonth = lastDay.getDate()}
                                {@const startOffset = (firstDay.getDay() + 6) % 7} <!-- Ajuste para que la semana comience en lunes -->
                                {@const today = new Date()}
                                {@const todayDate = new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate())}
                                
                                {#each Array(6 * 7) as _, i}
                                        {@const dayIndex = i - startOffset + 1}
                                        {@const isCurrentMonth = dayIndex > 0 && dayIndex <= daysInMonth}
                                        {@const day = isCurrentMonth ? dayIndex : (dayIndex <= 0 ? dayIndex + new Date(year, month - 2, 0).getDate() : dayIndex - daysInMonth)}
                                        {@const dateValue = isCurrentMonth ? new CalendarDate(year, month, day) : null}
                                        {@const isOutOfRange = isCurrentMonth && dateValue && (
                                            (shapeInput.minValue && dateValue < shapeInput.minValue) || 
                                            (shapeInput.maxValue && dateValue > shapeInput.maxValue)
                                        )}
                                        {@const isInvalidDate = isCurrentMonth && dateValue && shapeInput.invalidDates && shapeInput.invalidDates.includes(dateValue.toString())}
                                        {@const isInvalid = isOutOfRange || isInvalidDate}
                                        
                                        <!-- Determinar si es parte del rango seleccionado -->
                                        {@const isStart = isCurrentMonth && selectedRange?.start && day === selectedRange.start.day && month === selectedRange.start.month && year === selectedRange.start.year && !isInvalid}
                                        {@const isEnd = isCurrentMonth && selectedRange?.end && day === selectedRange.end.day && month === selectedRange.end.month && year === selectedRange.end.year && !isInvalid}
                                        {@const isInRange = isCurrentMonth && !isInvalid && selectedRange?.start && selectedRange?.end && dateValue && 
                                            (dateValue.compare(selectedRange.start) >= 0 && dateValue.compare(selectedRange.end) <= 0)}
                                        
                                        <!-- Determinar si está en el rango de hover durante la selección -->
                                        {@const isHoverDate = isCurrentMonth && dateValue && hoverDate && 
                                            day === hoverDate.day && month === hoverDate.month && year === hoverDate.year && !isInvalid}
                                        {@const isInHoverRange = isCurrentMonth && !isInvalid && selectedRange?.start && !selectedRange?.end && dateValue && hoverDate && 
                                            ((dateValue.compare(selectedRange.start) >= 0 && dateValue.compare(hoverDate) <= 0) || 
                                            (dateValue.compare(hoverDate) >= 0 && dateValue.compare(selectedRange.start) <= 0))}
                                        
                                        {@const isToday = isCurrentMonth && todayDate.year === year && todayDate.month === month && todayDate.day === day}
                                        
                                        <button 
                                            type="button"
                                            class="size-8 flex items-center justify-center rounded-md text-sm relative
                                                {!isCurrentMonth ? 'text-zinc-300 cursor-not-allowed opacity-50' : 
                                                    isOutOfRange ? 'text-zinc-300 dark:text-zinc-500 cursor-not-allowed opacity-60' : 
                                                    isInvalidDate ? 'text-zinc-300 dark:text-zinc-500 cursor-not-allowed' : 
                                                    'hover:bg-blue-100 dark:hover:bg-blue-900/30'}
                                                {isStart ? 'bg-blue-500 text-white font-bold rounded-l-md' : ''}
                                                {isEnd ? 'bg-blue-500 text-white font-bold rounded-r-md' : ''}
                                                {isInRange && !isStart && !isEnd ? 'bg-blue-100 dark:bg-blue-900/30 text-foreground hover:bg-blue-200 dark:hover:bg-blue-800/30' : ''}
                                                {isInHoverRange && !isStart && !isEnd && !isInRange ? 'bg-blue-50 dark:bg-blue-900/20 text-foreground' : ''}
                                                {isToday && !isStart && !isEnd && !isInRange && !isInHoverRange ? 'font-bold text-blue-500' : ''}"
                                            disabled={!isCurrentMonth || isInvalid}
                                            on:mouseenter={() => {
                                                if (isCurrentMonth && !isInvalid) {
                                                    hoverDate = new CalendarDate(year, month, day);
                                                }
                                            }}
                                            on:mouseleave={() => {
                                                if (isCurrentMonth && !isInvalid && hoverDate?.day === day && hoverDate?.month === month && hoverDate?.year === year) {
                                                    hoverDate = null;
                                                }
                                            }}
                                            on:click={() => {
                                                if (isCurrentMonth && !isInvalid) {
                                                    const newDate = new CalendarDate(year, month, day);
                                                    
                                                    // Verificar si se está haciendo clic en una fecha ya seleccionada
                                                    if (isStart && selectedRange?.end === undefined) {
                                                        // Si se hace clic en la fecha de inicio y no hay fecha final, deseleccionar todo
                                                        handleValueChange(undefined);
                                                        setError();
                                                        // Mantener el mes actual visible
                                                        currentDate = new CalendarDate(year, month, 1);
                                                        return;
                                                    } else if (isStart && selectedRange?.end) {
                                                        // Si se hace clic en la fecha de inicio y hay fecha final, mantener solo la fecha final
                                                        handleValueChange({
                                                            start: selectedRange.end,
                                                            end: undefined
                                                        });
                                                        setError();
                                                        return;
                                                    } else if (isEnd) {
                                                        // Si se hace clic en la fecha final, mantener solo la fecha de inicio
                                                        handleValueChange({
                                                            start: selectedRange?.start,
                                                            end: undefined
                                                        });
                                                        setError();
                                                        return;
                                                    }
                                                    
                                                    // Lógica para seleccionar rango (original)
                                                    if (!selectedRange?.start || (selectedRange?.start && selectedRange?.end)) {
                                                        // Si no hay inicio o ya hay un rango completo, establecer nuevo inicio
                                                        handleValueChange({
                                                            start: newDate,
                                                            end: undefined
                                                        });
                                                    } else if (selectedRange?.start && !selectedRange?.end) {
                                                        // Si hay inicio pero no fin
                                                        if (newDate.compare(selectedRange.start) < 0) {
                                                            // Si la nueva fecha es anterior al inicio, intercambiar
                                                            handleValueChange({
                                                                start: newDate,
                                                                end: selectedRange.start
                                                            });
                                                        } else {
                                                            // Si la nueva fecha es posterior al inicio, establecer como fin
                                                            handleValueChange({
                                                                start: selectedRange.start,
                                                                end: newDate
                                                            });
                                                        }
                                                        
                                                        // Cerrar popup cuando se completa el rango
                                                        showPopup = false;
                                                    }
                                                }
                                            }}
                                        >
                                            {#if isToday && !isStart && !isEnd && !isInRange}
                                                <div class="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"></div>
                                            {/if}
                                            {day}
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
</DateRangePicker.Root>

<style>
    /* Estilos adicionales */
    :global(.custom-daterangepicker-popup) {
        max-height: fit-content !important;
        overflow: hidden !important;
    }
    
    /* Mejorar el hover para modo light y dark */
    button:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
    
    :global(.dark) button:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
    
    /* Día seleccionado más visible */
    button[class*="bg-primary"]:not([class*="bg-primary/20"]):not([class*="bg-primary/30"]) {
        position: relative;
        z-index: 1;
        transform: scale(1.1);
        transition: transform 0.2s ease;
    }
    
    /* Estilo para días dentro del rango */
    button[class*="bg-primary/20"] {
        position: relative;
        z-index: 0;
        transition: background-color 0.2s ease;
    }
</style>
