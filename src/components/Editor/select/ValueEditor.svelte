<script lang="ts">
    import { v4 as uuid }   from 'uuid';
    import { read, utils }  from 'xlsx';
    import { Accordion }    from 'bits-ui';
    import toast            from 'svelte-french-toast';

    import {
        LoaderIcon,
        AddIcon,
        DeleteIcon,
        JsonIcon,
        CaretDownIcon
    }                                               from "$icons";
    import type { ShapeInput, ShapeOption }         from "$models";
    import { Input, ButtonUI }                      from "$components";
    import { successToast, errorToast, errorInput } from "$lib";


    export let options          : ShapeOption[] = [];
    export let onOptionsChange  : ( newOptions: ShapeOption[] ) => void;
    export let isSelectionValid : boolean = false;
    export let countSend        : number;


    $: if ( countSend ) validShapeList();


    function validShapeList( ) {
        for ( let i = 0; i < labelShapeList.length; i++ ) {
            labelShapeList[i].valid = errorInput( labelShapeList[i], labelShapeList[i].value );
            valueShapeList[i].valid = errorInput( valueShapeList[i], valueShapeList[i].value );
        }

        isSelectionValid = labelShapeList.every( label => label.valid ) && valueShapeList.every( value => value.valid );
    }


    let isLoading   = false;
    let open        = "values";
    let fileInputId = `fileInput-${uuid()}`; 


    const valueShape = {
        id          : uuid(),
        name        : uuid(),
        placeholder : 'Ingrese el valor',
        shape       : 'input',
        type        : 'search',
        valid       : true,
        required    : true,
        msgRequired : 'El campo es requerido.',
        minLength   : 1,
        maxLength   : 100,
        msgMinLength: 'Mínimo 1 caracter permitido.',
        msgMaxLength: 'Máximo 100 caracteres permitidos.'
    } as ShapeInput;


    const labelShape = {
        id          : uuid(),
        name        : uuid(),
        placeholder : 'Ingrese la etiqueta para mostrar',
        type        : 'search',
        shape       : 'input',
        valid       : true,
        required    : true,
        msgRequired : 'El campo es requerido.',
        minLength   : 1,
        maxLength   : 100,
        msgMinLength: 'Mínimo 1 caracter permitido.',
        msgMaxLength: 'Máximo 100 caracteres permitidos.'
    } as ShapeInput;


    let valueShapeList: ShapeInput[] = [];
    let labelShapeList: ShapeInput[] = [];


    $: {
        if ( options && options.length > 0 ) {
            valueShapeList = options.map(option => ({ ...valueShape, value: option.value || '' }));
            labelShapeList = options.map(option => ({ ...labelShape, value: option.label || '' }));
        } else {
            valueShapeList = [ valueShape ];
            labelShapeList = [ labelShape ];
        }
    }


    function addNewOption(): void {
        validShapeList();

        if ( !isSelectionValid ) return;

        labelShapeList.push( { ...labelShape, value: '' } );
        valueShapeList.push( { ...valueShape, value: '' } );

        const newOptions = [
            ...options,
            {
                id      : uuid(),
                label   : '',
                value   : ''
            }
        ];

        if ( open === '' ) open = 'values';
        onOptionsChange( newOptions );
    }


    function deleteOption( item: ShapeOption, index: number ): void {
        const newOptions = options.filter( option => option.id !== item.id );
        if ( newOptions.length === 0 ) isSelectionValid = false;

        labelShapeList.splice( index, 1 );
        valueShapeList.splice( index, 1 );
        onOptionsChange( newOptions );
    }


    const processExcelData = (data: any[]): ShapeOption[] =>
        data.map((row, index) => {
            if (typeof row !== 'object' || !row.label?.trim().toLowerCase() || !row.value?.trim().toLowerCase() ) {
                throw new Error(`Error en la fila ${index + 1}: Los objetos deben tener 'label' y 'value'.`);
            }

            return {
                id      : uuid(),
                value   : row['value'] || '',
                label   : row['label'] || '',
            };
        });


    async function handleFileChange( event: Event ): Promise<void> {
        const target    = event.target as HTMLInputElement;
        const file      = target.files?.[0] || null;

        if ( !file ) return;

        const fileExt = file.name.split('.').pop()?.toLowerCase();

        if (!['json', 'xlsx', 'xls'].includes( fileExt || '' )) {
            toast.error( 'Solo se permiten archivos JSON o Excel (.xlsx, .xls)', errorToast() );
            return;
        }

        isLoading = true;

        try {
            let newOptions: ShapeOption[];

            if ( fileExt === 'json' ) {
                const text = await file.text();
                const data = JSON.parse( text );

                newOptions = processExcelData( Array.isArray( data ) ? data : [ data ]);
            } else {
                const buffer        = await file.arrayBuffer();
                const workbook      = read( buffer );
                const firstSheet    = workbook.Sheets[workbook.SheetNames[0]];
                const data          = utils.sheet_to_json( firstSheet );

                newOptions = processExcelData( data );
            }

            if ( newOptions.length === 0 ) throw new Error( 'El archivo no contiene datos.' );

            onOptionsChange( newOptions );

            valueShapeList = [];
            labelShapeList = [];

            for ( const option of newOptions ) {
                valueShapeList.push( { ...valueShape, value: option.value } );
                labelShapeList.push( { ...labelShape, value: option.label } );
            }

            if ( open === '' ) open = 'values';
            toast.success( 'Datos cargados correctamente', successToast() );
        } catch ( error ) {
            toast.error( ( error as Error ).message || 'Error al cargar los datos', errorToast() );
        } finally {
            isLoading = false;
            if ( target ) target.value = '';
        }
    }


    function triggerFileInput(): void {
        const fileInput = document.getElementById( fileInputId ) as HTMLInputElement;
        if ( fileInput ) fileInput.click();
    }


    function keyAddOption( event: KeyboardEvent ): void {
        if ( event.key === 'Enter' ) addNewOption( );
    }
</script>


<Accordion.Root class="w-full" type="single" value={open}>
    <Accordion.Item
        value   = "values"
        class   = "border-b border-b-zinc-400 dark:border-b-zinc-600 transition-colors"
    >
        <Accordion.Header>
            <Accordion.Trigger
                class="group flex w-full flex-1 select-none items-center justify-between py-2 text-[15px] font-medium transition-all hover:rounded-lg hover:bg-zinc-300/70 dark:hover:bg-zinc-800/70"
            >
                <span class="ml-3 text-sm text-zinc-900 dark:text-zinc-200">Valor</span>

                <span class="@xl:ml-24 ml-0 text-sm text-zinc-900 dark:text-zinc-200">Label</span>

                <div class="flex justify-between items-center gap-2 mr-2">
                    <div class="flex items-center gap-2">
                        <ButtonUI
                            onClick     = { triggerFileInput }
                            disabled    = { isLoading }
                        >
                            {#if isLoading}
                                <LoaderIcon />
                            {:else}
                                <JsonIcon />
                            {/if}
                        </ButtonUI>

                        <ButtonUI
                            onClick     = { () => addNewOption( ) }
                            disabled    = { isLoading }
                        >
                            {#if isLoading}
                                <LoaderIcon />
                            {:else}
                                <AddIcon />
                            {/if}
                        </ButtonUI>
                    </div>

                    <span class="transition-transform duration-200 group-data-[state=open]:rotate-180">
                        <CaretDownIcon />
                    </span>
                </div>
            </Accordion.Trigger>
        </Accordion.Header>

        <Accordion.Content
            class="data-[state=closed]:animate-accordion-up my-2 data-[state=open]:animate-accordion-down max-h-72 overflow-auto tracking-[-0.01em]"
        >
            <div class={`h-auto p-1 w-full overflow-auto gap-2 grid grid-cols-1 @lg:grid-cols-2 pr-2`}>
                <input
                    type    = "file"
                    accept  = ".json,.xlsx,.xls"
                    class   = "hidden"
                    id      = { fileInputId }
                    on:change={ handleFileChange }
                />

                {#each options as item, index}
                    <Input
                        shapeInput  = {{ ...valueShapeList[index], value : item.value }}
                        value       = { item.value }
                        onKeyup     = { keyAddOption }
                        setError    = {() => valueShapeList[index].valid = errorInput( valueShapeList[index], item.value )}
                        onInput     = {( event: Event ) => {
                            item.value = ( event.target as HTMLInputElement ).value;
                            valueShapeList[index].value = item.value;
                        }}
                    />

                    <div class="flex gap-2 items-start">
                        <Input
                            shapeInput  = {{ ...labelShapeList[index], value : item.label }}
                            onKeyup     = { keyAddOption }
                            setError    = {() => labelShapeList[index].valid = errorInput( labelShapeList[index], item.label )}
                            value       = { item.label }
                            onInput     = {( event: Event ) => {
                                item.label = ( event.target as HTMLInputElement ).value;
                                labelShapeList[index].value = item.label;
                                onOptionsChange( options );
                            }}
                        />

                        <ButtonUI
                            onClick = {() => deleteOption( item, index )}
                            styles  = "mt-1.5"
                        >
                            <DeleteIcon />
                        </ButtonUI>
                    </div>
                {:else}
                    <span class="text-sm text-zinc-900 dark:text-zinc-400">No hay opciones</span>
                {/each}
            </div>
        </Accordion.Content>
    </Accordion.Item>
</Accordion.Root>
