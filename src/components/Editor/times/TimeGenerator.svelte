<script lang="ts">
    import { onMount } from 'svelte';

    import { v4 as uuid } from 'uuid';

    import type { SelectInput }                 from '$models';
    import { ButtonUI, Input, VirtualSelect }   from '$components';

    export let onHourListChange: (hours: number[]) => void;
    export let onMinuteListChange: (minutes: number[]) => void;

    let min = 0;
    let max = 59;
    let step = 5;

    function generateRange(min: number, max: number, step: number): number[] {
        const result: number[] = [];
        for (let i = min; i <= max; i += step) {
            result.push(i);
        }
        return result;
    }

    function generateHours() {
        const validMin = Math.max(0, Math.min(23, min));
        const validMax = Math.max(0, Math.min(23, max));
        const validStep = Math.max(1, Math.min(12, step));
        const hours = generateRange(validMin, validMax, validStep);
        selectedHours = hours.map(h => h.toString());
        onHourListChange(hours);
    }

    function generateMinutes() {
        const validMin = Math.max(0, Math.min(59, min));
        const validMax = Math.max(0, Math.min(59, max));
        const validStep = Math.max(1, Math.min(30, step));
        const minutes = generateRange(validMin, validMax, validStep);
        selectedMinutes = minutes.map(m => m.toString());
        onMinuteListChange(minutes);
    }

    // Generar todas las opciones posibles
    $: hourOptions = generateRange(0, 23, 1).map(hour => ({
        label: hour.toString().padStart(2, '0'),
        value: hour.toString()
    }));

    $: minuteOptions = generateRange(0, 59, 1).map(minute => ({
        label: minute.toString().padStart(2, '0'),
        value: minute.toString()
    }));

    // Variables para mantener la selección
    let selectedHours: string[] = [];
    let selectedMinutes: string[] = [];

    // Inicializar con todas las opciones seleccionadas
    onMount(() => {
        selectedHours = hourOptions.map(h => h.value);
        selectedMinutes = minuteOptions.map(m => m.value);
        onHourListChange(selectedHours.map(h => parseInt(h)));
        onMinuteListChange(selectedMinutes.map(m => parseInt(m)));
    });
</script>

<div class="space-y-4">
    <div class="grid grid-cols-1 @xl:grid-cols-4 gap-4 items-end">
        <Input
            shapeInput={{
                id: uuid(),
                name: 'min',
                label: 'Mínimo',
                type: 'number',
                shape: 'input',
                placeholder: 'Mínimo',
                value: min.toString(),
                min: 0,
                max: 59
            }}
            onInput={(e) => {
                const value = parseInt((e.target as HTMLInputElement).value);
                min = isNaN(value) ? 0 : value;
            }}
        />

        <Input
            shapeInput={{
                id: uuid(),
                name: 'max',
                label: 'Máximo',
                type: 'number',
                shape: 'input',
                placeholder: 'Máximo',
                value: max.toString(),
                min: 0,
                max: 59
            }}
            onInput={(e) => {
                const value = parseInt((e.target as HTMLInputElement).value);
                max = isNaN(value) ? 59 : value;
            }}
        />

        <Input
            shapeInput={{
                id: uuid(),
                name: 'step',
                label: 'Salto',
                type: 'number',
                shape: 'input',
                placeholder: 'Salto',
                value: step.toString(),
                min: 1,
                max: 30
            }}
            onInput={(e) => {
                const value = parseInt((e.target as HTMLInputElement).value);
                step = isNaN(value) ? 5 : value;
            }}
        />

        <div class="flex @xl:grid gap-2 items-start justify-start w-full">
            <ButtonUI
                onClick={generateHours}
                styles={'w-full h-8 text-sm text-zinc-800 dark:text-zinc-300 px-2 py-1 bg-blue-500 dark:bg-blue-500 rounded-lg text-zinc-800 dark:text-zinc-300 px-2 py-1 bg-blue-500 dark:bg-blue-500 rounded-lg'}
            >
                Generar HH
            </ButtonUI>

            <ButtonUI
                onClick={generateMinutes}
                styles={'w-full h-8 text-sm text-zinc-800 dark:text-zinc-300 px-2 py-1 bg-blue-500 dark:bg-blue-500 rounded-lg text-zinc-800 dark:text-zinc-300 px-2 py-1 bg-blue-500 dark:bg-blue-500 rounded-lg'}
            >
                Generar MM
            </ButtonUI>
        </div>
    </div>

    <div class="grid grid-cols-1 @lg:grid-cols-2 gap-4">
        <VirtualSelect
            shapeInput={{
                id: uuid(),
                name: 'generated-hours',
                label: 'Horas generadas',
                placeholder: 'Seleccione las horas',
                multiple: true,
                shape: 'select',
                options: hourOptions,
                selected: selectedHours
            }}
            onSelectedChange={(value: SelectInput) => {
                selectedHours = (value as string[]) || [];
                onHourListChange(selectedHours.map(h => parseInt(h)));
            }}
        />

        <VirtualSelect
            shapeInput={{
                id: uuid(),
                name: 'generated-minutes',
                label: 'Minutos generados',
                placeholder: 'Seleccione los minutos',
                multiple: true,
                shape: 'select',
                options: minuteOptions,
                selected: selectedMinutes
            }}
            onSelectedChange={(value: SelectInput) => {
                selectedMinutes = (value as string[]) || [];
                onMinuteListChange(selectedMinutes.map(m => parseInt(m)));
            }}
        />
    </div>
</div>