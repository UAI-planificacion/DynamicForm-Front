<script lang="ts">
    import { Separator } from "bits-ui";

    import {
        DeleteIcon,
        EditIcon,
        FlagIcon,
        AsterikIcon,
        CalendarBlankIcon
    }                           from "$icons";
    import type { ShapeInput }  from "$models";


    export let shapeInput       : ShapeInput;
    export let onDelete         : VoidFunction;
    export let onEdit           : VoidFunction;
    export let inputActive      : VoidFunction;


    const inputES = ( name: string | undefined ) => ({
        'input'         : 'Entrada',
        'combobox'      : 'Buscador',
        'select'        : 'Seleccionable',
        'check'         : 'Verificable',
        'textarea'      : 'Caja de texto',
        'datepicker'    : 'Fecha',
        'button'        : 'Botón',
    }[name || ''] || 'Sin valor');
</script>


<header class="flex justify-between items-center">
    <div class="flex items-center gap-2">
        <div class="bg-amber-300 rounded-xl py-1 px-3 w-auto flex items-center gap-2">
            {#if shapeInput.shape === 'button'}
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" stroke="#1C274C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="--darkreader-inline-stroke: #acc4e0;" data-darkreader-inline-stroke=""></path> </g></svg>
            {:else if shapeInput.shape === 'check'}
                <svg width="21px" height="21px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="#1C274C" stroke-width="1.5" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: #acc4e0;"></path> <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: #acc4e0;"></path> </g></svg>
            {:else if shapeInput.shape === 'textarea'}
                <svg fill="#000000" width="22px" height="22px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #000000;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7,7 L7,12 L8.5,12 C8.77614237,12 9,12.2238576 9,12.5 C9,12.7761424 8.77614237,13 8.5,13 L4.5,13 C4.22385763,13 4,12.7761424 4,12.5 C4,12.2238576 4.22385763,12 4.5,12 L6,12 L6,7 L4,7 L4,7.5 C4,7.77614237 3.77614237,8 3.5,8 C3.22385763,8 3,7.77614237 3,7.5 L3,6.5 C3,6.22385763 3.22385763,6 3.5,6 L9.5,6 C9.77614237,6 10,6.22385763 10,6.5 L10,7.5 C10,7.77614237 9.77614237,8 9.5,8 C9.22385763,8 9,7.77614237 9,7.5 L9,7 L7,7 Z M12.5,7 C12.2238576,7 12,6.77614237 12,6.5 C12,6.22385763 12.2238576,6 12.5,6 L18.5,6 C19.8807119,6 21,7.11928813 21,8.5 L21,16.5 C21,17.8807119 19.8807119,19 18.5,19 L6.5,19 C5.11928813,19 4,17.8807119 4,16.5 L4,15.5 C4,15.2238576 4.22385763,15 4.5,15 C4.77614237,15 5,15.2238576 5,15.5 L5,16.5 C5,17.3284271 5.67157288,18 6.5,18 L18.5,18 C19.3284271,18 20,17.3284271 20,16.5 L20,8.5 C20,7.67157288 19.3284271,7 18.5,7 L12.5,7 Z"></path> </g></svg>
            {:else if shapeInput.shape === 'combobox'}
                <svg width="20px" height="20px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #000000;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#1C274C" d="M15 4h-14c-0.6 0-1 0.4-1 1v6c0 0.6 0.4 1 1 1h14c0.6 0 1-0.4 1-1v-6c0-0.6-0.4-1-1-1zM10 11h-9v-6h9v6zM13 8.4l-2-1.4h4l-2 1.4z" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #161f3d;"></path> <path fill="#1C274C" d="M2 6h1v4h-1v-4z" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #161f3d;"></path> </g></svg>
            {:else if shapeInput.shape === 'select'}
                <svg width="20px" height="20px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #000000;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#1C274C" d="M15 4h-14c-0.6 0-1 0.4-1 1v6c0 0.6 0.4 1 1 1h14c0.6 0 1-0.4 1-1v-6c0-0.6-0.4-1-1-1zM12 9l-2-2h4l-2 2z" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #161f3d;"></path> </g></svg>
            {:else if shapeInput.shape === 'datepicker'}
                <CalendarBlankIcon />
            {:else}
                <svg width="22px" height="22px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" fill="#ffffff" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #181a1b; --darkreader-inline-stroke: #e8e6e3;" stroke="#ffffff" data-darkreader-inline-stroke=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:none;stroke:#ffffff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} </style><style class="darkreader darkreader--sync" media="screen"></style> <rect x="3" y="12" class="st0" width="26" height="10"></rect> <line class="st0" x1="6" y1="15" x2="10" y2="15"></line> <line class="st0" x1="8" y1="19" x2="8" y2="15"></line> <line class="st0" x1="11" y1="8" x2="15" y2="8"></line> <line class="st0" x1="11" y1="26" x2="15" y2="26"></line> <line class="st0" x1="13" y1="26" x2="13" y2="8"></line> </g></svg>
            {/if}

            { inputES( shapeInput.shape )}
        </div>

        <div class="bg-green-300 rounded-xl py-1 px-3 w-auto flex items-center gap-2">
            <svg fill="#1C274C" height="16px" width="16px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 319 319" xml:space="preserve" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #161f3d;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M309,30.5H122c-5.514,0-10,4.486-10,10v41c0,5.514,4.486,10,10,10h187c5.514,0,10-4.486,10-10v-41 C319,34.986,314.514,30.5,309,30.5z"></path> <path d="M65,30.5H10c-5.514,0-10,4.486-10,10v41c0,5.514,4.486,10,10,10h55c5.514,0,10-4.486,10-10v-41 C75,34.986,70.514,30.5,65,30.5z"></path> <path d="M65,129.5H10c-5.514,0-10,4.486-10,10v41c0,5.514,4.486,10,10,10h55c5.514,0,10-4.486,10-10v-41 C75,133.986,70.514,129.5,65,129.5z"></path> <path d="M309,129.5H122c-5.514,0-10,4.486-10,10v41c0,5.514,4.486,10,10,10h187c5.514,0,10-4.486,10-10v-41 C319,133.986,314.514,129.5,309,129.5z"></path> <path d="M65,227.5H10c-5.514,0-10,4.486-10,10v41c0,5.514,4.486,10,10,10h55c5.514,0,10-4.486,10-10v-41 C75,231.986,70.514,227.5,65,227.5z"></path> <path d="M309,227.5H122c-5.514,0-10,4.486-10,10v41c0,5.514,4.486,10,10,10h187c5.514,0,10-4.486,10-10v-41 C319,231.986,314.514,227.5,309,227.5z"></path> </g> </g></svg>
            { shapeInput.name }
        </div>
    </div>

    <div class="flex gap-3 items-center">
        <button
            class       = "justify-center hover:brightness-105 shadow-md active:scale-95"
            on:click    = {() => { onEdit(); inputActive(); }}
        >
            <EditIcon />
        </button>

        <button
            class       = "justify-center hover:brightness-105 shadow-md active:scale-95"
            on:click    = { onDelete }
        >
            <DeleteIcon />
        </button>
    </div>
</header>

<Separator.Root
    class="my-2 shrink-0 bg-zinc-300 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]"
/>

<div class="flex items-center gap-2 text-sm">
    {#if shapeInput.label }
        <div class="bg-sky-300 rounded-xl py-1 px-3 w-auto flex items-center gap-1">
            <FlagIcon />
            { shapeInput.label }
        </div>
    {/if }

    {#if shapeInput.placeholder}
        <div class="bg-cyan-300 rounded-xl py-1 px-3 w-auto flex items-center gap-1">
            <svg width="22px" height="22px" viewBox="-1.6 -1.6 19.20 19.20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#fff" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #fff; --darkreader-inline-stroke: #fff;" stroke="#fff" stroke-width="0.00016" data-darkreader-inline-stroke="" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#fff" stroke-width="0.192" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: #fff;"></g><g id="SVGRepo_iconCarrier"> <path fill="#fff" d="M16 5c0-0.6-0.4-1-1-1h-14c-0.6 0-1 0.4-1 1v6c0 0.6 0.4 1 1 1h14c0.6 0 1-0.4 1-1v-6zM15 11h-14v-6h14v6z" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #fff;"></path> <path fill="#fff" d="M2 6h1v4h-1v-4z" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #fff;"></path> </g></svg>
            { shapeInput.placeholder }
        </div>
    {/if}

    {#if shapeInput.shape === 'input' }
        <div class="bg-indigo-300 rounded-xl py-1 px-3 w-auto flex items-center gap-1">
            {#if shapeInput.type === 'number'}
                <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #000000;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> <title>ic_fluent_number_row_24_regular</title> <desc>Created with Sketch.</desc> <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: none;"> <g id="ic_fluent_number_row_24_regular" fill="#cce9ff" fill-rule="nonzero" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #262a2b;"> <path d="M8.75,4 C10.2687831,4 11.5,5.23121694 11.5,6.75 L11.5,17.25 C11.5,18.7687831 10.2687831,20 8.75,20 L4.75,20 C3.23121694,20 2,18.7687831 2,17.25 L2,6.75 C2,5.23121694 3.23121694,4 4.75,4 L8.75,4 Z M8.75,5.5 L4.75,5.5 C4.05964406,5.5 3.5,6.05964406 3.5,6.75 L3.5,17.25 C3.5,17.9403559 4.05964406,18.5 4.75,18.5 L8.75,18.5 C9.44035594,18.5 10,17.9403559 10,17.25 L10,6.75 C10,6.05964406 9.44035594,5.5 8.75,5.5 Z M19.25,4 C20.7687831,4 22,5.23121694 22,6.75 L22,17.25 C22,18.7687831 20.7687831,20 19.25,20 L15.25,20 C13.7312169,20 12.5,18.7687831 12.5,17.25 L12.5,6.75 C12.5,5.23121694 13.7312169,4 15.25,4 L19.25,4 Z M19.25,5.5 L15.25,5.5 C14.5596441,5.5 14,6.05964406 14,6.75 L14,17.25 C14,17.9403559 14.5596441,18.5 15.25,18.5 L19.25,18.5 C19.9403559,18.5 20.5,17.9403559 20.5,17.25 L20.5,6.75 C20.5,6.05964406 19.9403559,5.5 19.25,5.5 Z M6,9 L6,15 C6,15.4142136 6.33578644,15.75 6.75,15.75 C7.16421356,15.75 7.5,15.4142136 7.5,15 L7.5,9 C7.5,8.58578644 7.16421356,8.25 6.75,8.25 C6.33578644,8.25 6,8.58578644 6,9 Z M17.5,9.75 L17.5,11.25 L16.25,11.25 C15.8357864,11.25 15.5,11.5857864 15.5,12 L15.5,15 C15.5,15.4142136 15.8357864,15.75 16.25,15.75 L18.25,15.75 C18.6642136,15.75 19,15.4142136 19,15 C19,14.5857864 18.6642136,14.25 18.25,14.25 L17,14.25 L17,12.75 L18.25,12.75 C18.6642136,12.75 19,12.4142136 19,12 L19,9 C19,8.58578644 18.6642136,8.25 18.25,8.25 L16.25,8.25 C15.8357864,8.25 15.5,8.58578644 15.5,9 C15.5,9.41421356 15.8357864,9.75 16.25,9.75 L17.5,9.75 Z" id="🎨-Color"> </path> </g> </g> </g></svg>
                Númerico
            {:else if shapeInput.type === 'password'}
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 10V14M10.2676 11L13.7317 13M13.7314 11L10.2673 13" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: #acc4e0;"></path> <path d="M6.73241 10V14M4.99999 11L8.46409 13M8.46386 11L4.99976 13" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: #acc4e0;"></path> <path d="M17.2681 10V14M15.5356 11L18.9997 13M18.9995 11L15.5354 13" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: #acc4e0;"></path> <path d="M22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C21.4816 5.82475 21.7706 6.69989 21.8985 8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: #acc4e0;"></path> </g></svg>
                Contraseña
            {:else if shapeInput.type === 'email'}
                <svg fill="#ffffff" height="16px" width="16px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 321.705 321.705" xml:space="preserve" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #181a1b; --darkreader-inline-stroke: #e8e6e3;" stroke="#ffffff" data-darkreader-inline-stroke=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_440_" d="M160.851,0C72.158,0,0.001,72.158,0.001,160.853s72.157,160.853,160.85,160.853 c22.61,0,44.48-4.602,65.003-13.677c5.556-2.457,8.068-8.953,5.611-14.51c-2.458-5.557-8.956-8.066-14.51-5.611 c-17.701,7.828-36.578,11.798-56.104,11.798c-76.562,0-138.85-62.289-138.85-138.853S84.289,22,160.851,22 c76.564,0,138.854,62.289,138.854,138.853c0,14.509-2.227,28.803-6.616,42.484c-9.456,29.458-24.992,38.548-32.553,37.372 c-7.251-1.136-7.814-11.979-7.814-15.275V94.789c0-6.075-4.925-11-11-11s-11,4.925-11,11v6.473 c-16.863-19.746-41.929-32.281-69.87-32.281c-50.658,0-91.872,41.214-91.872,91.872s41.214,91.872,91.872,91.872 c27.941,0,53.007-12.535,69.87-32.281v4.99c0,19.971,10.367,34.498,26.412,37.011c18.988,2.966,43.962-12.067,56.902-52.385 c5.089-15.857,7.669-32.413,7.669-49.207C321.704,72.158,249.546,0,160.851,0z M160.851,230.725 c-38.527,0-69.872-31.345-69.872-69.872s31.345-69.872,69.872-69.872c38.526,0,69.87,31.345,69.87,69.872 S199.377,230.725,160.851,230.725z"></path> </g></svg>
                Correo
            {:else if shapeInput.type === 'url'}
                <svg width="20px" height="20px" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" style="--darkreader-inline-fill: #181a1b; --darkreader-inline-stroke: #e8e6e3;" xml:space="preserve" fill="#ffffff" data-darkreader-inline-fill="" stroke="#ffffff" data-darkreader-inline-stroke=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M84 128.6H54.6C36.6 128.6 22 114 22 96c0-9 3.7-17.2 9.6-23.1 5.9-5.9 14.1-9.6 23.1-9.6H84m24 65.3h29.4c9 0 17.2-3.7 23.1-9.6 5.9-5.9 9.6-14.1 9.6-23.1 0-18-14.6-32.6-32.6-32.6H108M67.9 96h56.2" style="fill: none; stroke: rgb(0, 0, 0); stroke-width: 12; stroke-linecap: round; stroke-linejoin: round; stroke-miterlimit: 10; --darkreader-inline-fill: none; --darkreader-inline-stroke: #e8e6e3;" data-darkreader-inline-fill="" data-darkreader-inline-stroke=""></path></g></svg>
                Url
            {:else if shapeInput.type === 'tel'}
                <svg width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #181a1b; --darkreader-inline-stroke: #e8e6e3;" stroke="#ffffff" data-darkreader-inline-stroke=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#ffffff" stroke-width="16.384" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: #e8e6e3;"><path fill="#ffffff" d="M256 128a64 64 0 0 0-64 64v640a64 64 0 0 0 64 64h512a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H256zm0-64h512a128 128 0 0 1 128 128v640a128 128 0 0 1-128 128H256a128 128 0 0 1-128-128V192A128 128 0 0 1 256 64zm128 128h256a32 32 0 1 1 0 64H384a32 32 0 0 1 0-64zm128 640a64 64 0 1 1 0-128 64 64 0 0 1 0 128z" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #181a1b;"></path></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M256 128a64 64 0 0 0-64 64v640a64 64 0 0 0 64 64h512a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H256zm0-64h512a128 128 0 0 1 128 128v640a128 128 0 0 1-128 128H256a128 128 0 0 1-128-128V192A128 128 0 0 1 256 64zm128 128h256a32 32 0 1 1 0 64H384a32 32 0 0 1 0-64zm128 640a64 64 0 1 1 0-128 64 64 0 0 1 0 128z" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #181a1b;"></path></g></svg>
                Teléfono
            {:else if shapeInput.type === 'search'}
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)" stroke="#ffffff" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: #e8e6e3;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: #e8e6e3;"></path> </g></svg>
                Buscador
            {:else}
                <svg width="20px" height="20px" fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 502.102 502.102" xml:space="preserve" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #181a1b; --darkreader-inline-stroke: #e8e6e3;" stroke="#ffffff" data-darkreader-inline-stroke=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M39.62,288.938v-7.14v-22.78h30.118v-0.201h22.777h7.146h22.978v22.976v7.14v29.927h37.259v-29.921v-7.14v-22.976v-7.146 v-22.78v-7.342v-22.774v-7.149v-30.124H129.78v-30.311H99.656v-29.731H62.583v30.125H32.468v30.118H2.548v29.923v7.149v22.969 v7.146v22.78v7.341v22.78v7.14v29.927H39.62V288.938z M39.62,198.782v-7.149V168.85h29.926v-30.124h22.969v29.731h30.13v23.176 v7.149v22.774h-30.13v0.195H69.738h-7.149H39.62V198.782z M209.445,318.865h22.969h7.149h22.769h7.151h30.134v-29.927h30.109 v-30.121v-7.14V221.55h-30.109v-22.777h30.109v-29.929v-7.341v-29.921h-30.109v-30.121h-30.134h-7.151h-22.769h-7.149h-22.969 h-7.155h-29.917v30.121v7.339v22.78v7.143v22.783v7.341v22.777v7.146v22.969v7.146v22.786v7.14v29.927h29.917h7.155V318.865z M209.445,168.85v-7.14v-22.783v-0.201h22.969h7.149h22.769h7.151h22.97v22.783v7.341v22.783h-22.97h-7.151h-22.769h-7.149h-22.969 V168.85z M209.445,259.019v-7.152v-22.969h22.969h7.149h22.769h7.151h22.97v22.78v7.14v22.976h-22.97h-7.151h-22.769h-7.149 h-22.969V259.019z M372.118,288.938h-29.914v-30.121v-7.14v-22.78v-7.146v-22.969v-7.149V168.85v-7.14v-30.118h29.926v-30.125 h30.115h7.158h22.769h7.14h30.134v30.125h30.115v37.258h-37.268v-30.124h-22.981h-7.14h-22.769h-7.158h-22.975v22.984v7.14v22.783 v7.149v22.969v7.146v22.78h0.201v30.121h22.773h7.158h22.769h7.347h22.774v-30.121h37.268v37.261h-30.115v29.927h-29.927h-7.347 h-22.769h-7.158H372.13v-29.927H372.118z M33.479,333.695v33.467H0v-33.467H33.479z M33.479,367.162h33.47v33.479h-33.47V367.162z M100.418,333.695v33.467h-33.47v-33.467H100.418z M100.418,367.162h33.479v33.479h-33.479V367.162z M167.366,333.695v33.467 h-33.476v-33.467H167.366z M167.366,367.162h33.473v33.479h-33.473V367.162z M234.309,333.695v33.467h-33.47v-33.467H234.309z M234.309,367.162h33.479v33.479h-33.479V367.162z M301.26,333.695v33.467h-33.473v-33.467H301.26z M301.26,367.162h33.479v33.479 H301.26V367.162z M368.205,333.695v33.467h-33.467v-33.467H368.205z M368.205,367.162h33.479v33.479h-33.479V367.162z M435.15,333.695v33.467h-33.467v-33.467H435.15z M502.102,333.695v33.467h-33.473v-33.467H502.102z M435.15,367.162h33.473v33.479 H435.15V367.162z"></path> </g> </g></svg>
                Texto
            {/if}
        </div>
    {/if}

    {#if shapeInput.disabled === true }
        <div class="bg-gray-300 rounded-xl py-1 px-3 w-auto flex items-center gap-1">
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.5303 1.46967C17.2374 1.17678 16.7626 1.17678 16.4697 1.46967C16.1768 1.76256 16.1768 2.23744 16.4697 2.53033L18.4394 4.50001L16.4697 6.46967C16.1768 6.76256 16.1768 7.23744 16.4697 7.53033C16.7626 7.82322 17.2375 7.82322 17.5304 7.53033L19.5 5.56067L21.4696 7.53031C21.7625 7.8232 22.2374 7.8232 22.5303 7.53031C22.8232 7.23742 22.8232 6.76254 22.5303 6.46965L20.5607 4.50001L22.5303 2.53035C22.8232 2.23746 22.8232 1.76258 22.5303 1.46969C22.2374 1.1768 21.7626 1.1768 21.4697 1.46969L19.5 3.43935L17.5303 1.46967Z" fill="#1C274C"></path> <path d="M11.9426 1.25002C9.63423 1.25001 7.82519 1.25 6.41371 1.43977C4.96897 1.63401 3.82895 2.03935 2.93414 2.93416C2.03933 3.82897 1.63399 4.96899 1.43975 6.41373C1.24998 7.82521 1.24999 9.63425 1.25 11.9426V12.0574C1.24999 14.3658 1.24998 16.1748 1.43975 17.5863C1.63399 19.0311 2.03933 20.1711 2.93414 21.0659C3.82895 21.9607 4.96897 22.366 6.41371 22.5603C7.82519 22.75 9.63423 22.75 11.9426 22.75H12.0574C14.3658 22.75 16.1748 22.75 17.5863 22.5603C19.031 22.366 20.1711 21.9607 21.0659 21.0659C21.9607 20.1711 22.366 19.0311 22.5603 17.5863C22.75 16.1748 22.75 14.3658 22.75 12.0574V10.5C22.75 10.0858 22.4142 9.75002 22 9.75002C21.5858 9.75002 21.25 10.0858 21.25 10.5V12C21.25 14.3782 21.2484 16.0865 21.0736 17.3864C20.9018 18.6648 20.5749 19.4356 20.0052 20.0052C19.4355 20.5749 18.6648 20.9018 17.3864 21.0737C16.0864 21.2484 14.3782 21.25 12 21.25C9.62178 21.25 7.91356 21.2484 6.61358 21.0737C5.33517 20.9018 4.56445 20.5749 3.9948 20.0052C3.42514 19.4356 3.09825 18.6648 2.92637 17.3864C2.75159 16.0865 2.75 14.3782 2.75 12C2.75 9.6218 2.75159 7.91358 2.92637 6.6136C3.09825 5.33519 3.42514 4.56447 3.9948 3.99482C4.56445 3.42516 5.33517 3.09827 6.61358 2.92639C7.91356 2.75161 9.62178 2.75002 12 2.75002H13.5C13.9142 2.75002 14.25 2.41423 14.25 2.00002C14.25 1.58581 13.9142 1.25002 13.5 1.25002L11.9426 1.25002Z" fill="#1C274C"></path> </g></svg>
        </div>
    {/if}

    {#if shapeInput.required === true}
        <div class="bg-rose-100 rounded-xl py-1 px-3 w-auto flex items-center gap-1">
            <AsterikIcon />
        </div>
    {/if}
</div>

{#if shapeInput.description}
    <Separator.Root
        class="my-2 shrink-0 bg-zinc-300 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]"
    />

    <footer class="text-gray-500 ">
        {shapeInput.description}
    </footer>
{/if}