<script lang="ts">
    import { CalendarDate, type DateValue } from "@internationalized/date";
    import type { DateRange }               from "bits-ui";
	import { v4 as uuid }                   from 'uuid';

    import {
        ButtonUI,
        DateRangePicker,
        DatePicker,
        Check,

        Tooltip

    }                           from "$components";
    import type { ShapeInput }  from "$models";
    import { DeleteIcon }       from "$icons";


    export let invalidDates: string[] = [];
    export let onInvalidDatesChange: (dates: string[]) => void;


    interface WeekDay {
        id      : string;
        name    : string;
        label   : string;
        checked : boolean;
    }


    const weekDays: WeekDay[] = [
        { id: 'monday',     name: 'monday',     label: 'Lu', checked: true },
        { id: 'tuesday',    name: 'tuesday',    label: 'Ma', checked: true },
        { id: 'wednesday',  name: 'wednesday',  label: 'Mi', checked: true },
        { id: 'thursday',   name: 'thursday',   label: 'Ju', checked: true },
        { id: 'friday',     name: 'friday',     label: 'Vi', checked: true },
        { id: 'saturday',   name: 'saturday',   label: 'Sa', checked: true },
        { id: 'sunday',     name: 'sunday',     label: 'Do', checked: true }
    ];


    let selectedDays = new Set( weekDays.map( day => day.name ));


    function handleDayToggle( dayName: string, checked: boolean ): void {
        selectedDays[ checked ? 'add' : 'delete']( dayName );

        selectedDays = selectedDays;
    }

    let dateRangeInput: ShapeInput = {
        id              : uuid(),
        name            : "dateRange",
        shape           : "datepicker",
        isRange         : true,
        label           : "Rango de fechas a invalidar",
        numberOfMonths  : 1,
        required        : true,
        invalidDates
    };

    let singleDateInput: ShapeInput = {
        id              : uuid(),
        name            : "singleDate",
        shape           : "datepicker",
        label           : "Fecha individual a invalidar",
        required        : true,
        invalidDates
    };

    let dateRange       : DateRange | undefined;
    let singleDate      : DateValue | undefined;
    let generatedDates  : string[] = [];


    const getDayName = ( date: Date ): string => [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday'
    ][date.getDay()];


    function generateDatesInRange( range: DateRange ) {
        const dates = new Set<string>();
        const { start, end } = range;

        if ( !start || !end ) return [];

        const startDate = new Date( start.year, start.month - 1, start.day );
        const endDate   = new Date( end.year, end.month - 1, end.day );

        for ( let date = new Date( startDate ); date <= endDate; date.setDate( date.getDate() + 1 )) {
            const dayName = getDayName( date );

            if (selectedDays.has( dayName )) {
                const calendarDate = new CalendarDate(
                    date.getFullYear(),
                    date.getMonth() + 1,
                    date.getDate()
                );

                dates.add( calendarDate.toString() );
            }
        }

        return Array.from( dates );
    }


    function handleGenerateDates() {
        if ( !dateRange?.start || !dateRange?.end ) return;

        const newDates      = generateDatesInRange( dateRange );
        const uniqueDates   = new Set( [ ...generatedDates, ...newDates ] );

        generatedDates = Array.from( uniqueDates );

        onInvalidDatesChange( generatedDates );
        dateRange = undefined;
    }


    function handleAddSingleDate() {
        if ( !singleDate ) return;

        const dateStr       = singleDate.toString();
        const uniqueDates   = new Set([ ...generatedDates, dateStr ]);

        generatedDates = Array.from( uniqueDates );

        onInvalidDatesChange( generatedDates );
        singleDate = undefined;
    }


    function handleRemoveDate( dateStr: string ): void {
        generatedDates = generatedDates.filter( d => d !== dateStr );
        onInvalidDatesChange( generatedDates );
    }

    function handleClearDates(): void {
        generatedDates = [];
        onInvalidDatesChange( generatedDates );
    }


    function formatDateToSpanish( dateStr: string ): string {
        const [year, month, day] = dateStr.split('-');
        return `${day} / ${month} / ${year}`;
    }


    $: generatedDates = invalidDates;
</script>

<div class="flex flex-col gap-2">
    <div class="grid @3xl:grid-cols-2 gap-2 items-center">
        <DateRangePicker
            shapeInput={{
                ...dateRangeInput,
                invalidDates
            }}
            onValueChange={(value) => {
                dateRange = value
                handleGenerateDates();
            }}
        />

        <DatePicker
            shapeInput={{
                ...singleDateInput,
                invalidDates
            }}
            onValueChange={(value) => {
                singleDate = value;
                handleAddSingleDate()
            }}
        />
    </div>

    <div class="flex items-center flex-wrap gap-3 mb-2">
        <Tooltip
            value       = { true }
            message     = "Días de la semana que se van a invalidar" 
            background  = "bg-amber-300"
            color       = "bg-zinc-200 text-zinc-800 dark:bg-zinc-500 dark:text-zinc-200"
        >
            <span class="text-zinc-800 font-semibold">
                ?
            </span>
        </Tooltip>

        {#each weekDays as day}
            <Check
                shapeInput={{
                    id      : day.id,
                    name    : day.name,
                    shape   : "check",
                    label   : day.label,
                    checked : selectedDays.has(day.name)
                }}
                checked={selectedDays.has(day.name)}
                onChange={(checked) => handleDayToggle(day.name, checked)}
            />
        {/each}

        <ButtonUI
            disabled={generatedDates.length === 0}
            onClick={handleClearDates}
        >
            <span class="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 text-sm">
                <DeleteIcon />
                Limpiar
            </span>
        </ButtonUI>
    </div>

    <span class=" font-semibold text-zinc-800 dark:text-zinc-200">Fechas inválidas</span>

    <div class="flex flex-wrap gap-2 mt-2 max-h-96 overflow-y-auto">
        {#each generatedDates as date}
            <div class="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800/60 shadow-md px-2 py-1 rounded-md">
                <span class="text-sm text-zinc-800 dark:text-zinc-200">{formatDateToSpanish(date)}</span>

                <ButtonUI
                    onClick={() => handleRemoveDate(date)}
                >
                    <DeleteIcon />
                </ButtonUI>
            </div>
        {:else}
            <span class="text-zinc-500">No hay fechas inválidas</span>
        {/each}
    </div>
</div>
