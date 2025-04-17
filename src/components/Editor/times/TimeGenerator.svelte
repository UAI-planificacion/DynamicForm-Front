<script lang="ts">
    import { onMount } from 'svelte';

    import { v4 as uuid } from 'uuid';

    import type { SelectInput }                 from '$models';
    import { ButtonUI, Input, VirtualSelect }   from '$components';

    export let onHourListChange     : ( hours: number[] )   => void;
    export let onMinuteListChange   : ( minutes: number[] ) => void;


    let min = 0;
    let max = 59;
    let step = 5;


    const generateRange = ( min: number, max: number, step: number ): number[] => 
        Array.from( { length: (max - min) / step + 1 }, (_, i) => i * step + min );


    function generateHours() {
        const validMin  = Math.max( 0, Math.min( 23, min ));
        const validMax  = Math.max( 0, Math.min( 23, max ));
        const validStep = Math.max( 1, Math.min( 12, step ));
        const hours     = generateRange( validMin, validMax, validStep );

        selectedHours = hours.map( h => h.toString() );
        onHourListChange( hours );
    }


    function generateMinutes() {
        const validMin  = Math.max( 0, Math.min( 59, min ));
        const validMax  = Math.max( 0, Math.min( 59, max ));
        const validStep = Math.max( 1, Math.min( 30, step ));
        const minutes   = generateRange( validMin, validMax, validStep );

        selectedMinutes = minutes.map( m => m.toString() );
        onMinuteListChange( minutes );
    }


    $: hourOptions = generateRange(0, 23, 1).map(hour => ({
        label: hour.toString().padStart(2, '0'),
        value: hour.toString()
    }));


    $: minuteOptions = generateRange(0, 59, 1).map(minute => ({
        label: minute.toString().padStart(2, '0'),
        value: minute.toString()
    }));


    let selectedHours   : string[] = [];
    let selectedMinutes : string[] = [];


    onMount(() => {
        selectedHours   = hourOptions.map( h => h.value );
        selectedMinutes = minuteOptions.map( m => m.value );
        onHourListChange( selectedHours.map( h => parseInt( h )));
        onMinuteListChange( selectedMinutes.map( m => parseInt( m )));
    });
</script>

<div class="space-y-4">
    <div class="grid grid-cols-1 @xl:grid-cols-4 gap-4 items-end">
        <Input
            shapeInput={{
                id          : uuid(),
                name        : 'min',
                label       : 'Mínimo',
                type        : 'number',
                shape       : 'input',
                placeholder : 'Mínimo',
                min         : 0,
                max         : 59
            }}
            onInput={( val) => {
                const value = parseInt( val );
                min = isNaN( value ) ? 0 : value;
            }}
            value={min.toString()}
        />

        <Input
            shapeInput={{
                id          : uuid(),
                name        : 'max',
                label       : 'Máximo',
                type        : 'number',
                shape       : 'input',
                placeholder : 'Máximo',
                min         : 0,
                max         : 59
            }}
            onInput={( val) => {
                const value = parseInt( val );
                max = isNaN( value ) ? 59 : value;
            }}
            value={max.toString()}
        />

        <Input
            shapeInput={{
                id          : uuid(),
                name        : 'step',
                label       : 'Salto',
                type        : 'number',
                shape       : 'input',
                placeholder : 'Salto',
                min         : 1,
                max         : 30
            }}
            onInput={( val) => {
                const value = parseInt( val );
                step = isNaN( value ) ? 5 : value;
            }}
            value = {step.toString()}
        />

        <div class="flex gap-2 items-start justify-start w-full">
            <ButtonUI
                onClick={generateHours}
                styles={'flex items-center hover:bl-black/70 mx-auto justify-center gap-1.5 w-full h-9 text-sm text-zinc-800 dark:text-zinc-300 px-2 py-1 bg-black dark:bg-black rounded-lg text-zinc-800 dark:text-zinc-300 px-2 py-1 bg-blue-500 dark:bg-blue-500 rounded-lg'}
            >
                <svg height="24px" width="24px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#ffffff" data-darkreader-inline-fill="" style="--darkreader-inline-fill: var(--darkreader-background-ffffff, #181a1b); --darkreader-inline-stroke: var(--darkreader-text-ffffff, #e8e6e3);" stroke="#ffffff" data-darkreader-inline-stroke=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#ffffff;} </style><style class="darkreader darkreader--sync" media="screen"></style> <g> <path class="st0" d="M512,175.233l-36.406,5.116C443.735,82.736,352.107,12.165,243.855,12.149 C109.161,12.165,0.008,121.311,0,255.996c0.008,134.693,109.161,243.847,243.855,243.855c7.171,0,14.309-0.308,21.374-0.926 l-4.913-56.562h-0.008c-5.4,0.463-10.882,0.699-16.453,0.699c-51.755-0.017-98.328-20.887-132.282-54.784 c-33.896-33.954-54.776-80.536-54.783-132.282c0.008-51.747,20.887-98.329,54.783-132.274 c33.954-33.897,80.527-54.767,132.282-54.784c51.746,0.017,98.328,20.887,132.273,54.784c18.24,18.264,32.532,40.28,42.01,64.7 l-31.104,4.376l80.244,117.251l17.93-54.053h2.485c0-2.193-0.26-4.321-0.324-6.506L512,175.233z"></path> <path class="st0" d="M398.964,360.577c-3.054,4.532-6.334,8.941-9.794,13.237l44.146,35.708 c4.466-5.522,8.713-11.231,12.718-17.168l-47.053-31.777H398.964z"></path> <path class="st0" d="M318.243,427.688c-9.079,3.939-18.54,7.171-28.294,9.648l13.936,55.06c12.758-3.232,25.11-7.471,36.966-12.62 l-22.608-52.08V427.688z"></path> <path class="st0" d="M344.652,413.59l30.665,47.809c10.995-7.041,21.374-14.951,31.054-23.616l-37.86-42.319 C361.064,402.115,353.098,408.19,344.652,413.59z"></path> <path class="st0" d="M215.854,252.35c8.998-10.248,14.447-20.895,14.447-34.49c0-23.022-16.518-40.58-43.699-40.58 c-27.408,0-43.309,17.144-44.771,36.804c-0.219,1.259,0.431,2.307,1.681,2.518l22.99,3.751c1.478,0.211,2.299-0.414,2.299-1.672 c1.25-10.875,7.13-16.73,16.737-16.73c9.834,0,15.478,6.912,15.478,16.315c0,7.31-2.931,13.375-8.356,19.669l-49.984,59.38 c-0.845,1.048-1.064,1.665-1.064,2.924v19.449c0,1.259,0.844,2.087,2.095,2.087h84.498c1.251,0,2.096-0.828,2.096-2.087V298.98 c0-1.242-0.845-2.079-2.096-2.079h-49.773v-0.422L215.854,252.35z"></path> <path class="st0" d="M354.99,301.075c1.235,0,2.072-0.836,2.072-2.096v-21.106c0-1.258-0.837-2.103-2.072-2.103h-9.412 l-1.259-1.259v-30.73c0-1.25-0.837-2.095-2.095-2.095h-24.249c-1.259,0-2.104,0.844-2.104,2.095v30.73l-1.251,1.259h-26.125v-0.626 l42.636-93.472c0.422-1.259,0-2.104-1.446-2.104h-26.58c-1.454,0-2.29,0.422-2.907,1.682l-42.668,93.894l-0.414,2.517v21.318 c0,1.259,0.836,2.096,2.096,2.096h55.408l1.251,1.258v17.354c0,1.259,0.845,2.087,2.104,2.087h24.249 c1.258,0,2.095-0.828,2.095-2.087v-17.354l1.259-1.258H354.99z"></path> </g> </g></svg>
                <span class="flex @xl:hidden @4xl:flex">
                    Horas
                </span>
            </ButtonUI>

            <ButtonUI
                onClick={generateMinutes}
                styles={'flex items-center justify-center gap-1.5 w-full h-9 text-sm text-zinc-800 dark:text-zinc-300 px-2 py-1 bg-black dark:bg-black rounded-lg text-zinc-800 dark:text-zinc-300 px-2 py-1 bg-blue-500 dark:bg-blue-500 rounded-lg'}
            >
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: var(--darkreader-text-ffffff, #e8e6e3);"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.9601 10.8301H12.9001L12.1401 13.1201H14.4301C15.2701 13.1201 15.9601 13.8001 15.9601 14.6501C15.9601 15.4901 15.2801 16.1801 14.4301 16.1801H12.1401" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: var(--darkreader-text-ffffff, #e8e6e3);"></path> <path d="M9.54004 16.17V10.8301L8.04004 12.5001" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: var(--darkreader-text-ffffff, #e8e6e3);"></path> <path d="M13.98 4.46997L12 2" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: var(--darkreader-text-ffffff, #e8e6e3);"></path> <path d="M19.0899 7.79999C20.1999 9.27999 20.8899 11.11 20.8899 13.11C20.8899 18.02 16.9099 22 11.9999 22C7.08988 22 3.10986 18.02 3.10986 13.11C3.10986 8.19999 7.08988 4.21997 11.9999 4.21997C12.6799 4.21997 13.3399 4.31002 13.9799 4.46002" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: var(--darkreader-text-ffffff, #e8e6e3);"></path> </g></svg>
                <span class="flex @xl:hidden @4xl:flex">
                    Minutos
                </span>
            </ButtonUI>
        </div>
    </div>

    <div class="grid grid-cols-1 @lg:grid-cols-2 gap-4">
        <VirtualSelect
            shapeInput={{
                id          : uuid(),
                name        : 'generated-hours',
                label       : 'Horas disponibles',
                placeholder : 'Seleccione las horas',
                multiple    : true,
                shape       : 'select',
                options     : hourOptions
            }}
            onSelectedChange={( value: SelectInput ) => {
                selectedHours = ( value as string[] ) || [];
                onHourListChange( selectedHours.map( h => parseInt( h )));
            }}
            value={selectedHours}
        />

        <VirtualSelect
            shapeInput={{
                id          : uuid(),
                name        : 'generated-minutes',
                label       : 'Minutos disponibles',
                placeholder : 'Seleccione los minutos',
                multiple    : true,
                shape       : 'select',
                options     : minuteOptions,
            }}
            onSelectedChange={( value: SelectInput ) => {
                selectedMinutes = ( value as string[] ) || [];
                onMinuteListChange( selectedMinutes.map( m => parseInt( m )));
            }}
            value = { selectedMinutes }
        />
    </div>
</div>