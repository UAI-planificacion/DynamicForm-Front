<script lang="ts">
    import { v4 as uuid }   from 'uuid';
    import { read, utils }  from 'xlsx';
    import { Accordion }    from 'bits-ui';

    import {
        LoaderIcon,
        AddIcon,
        DeleteIcon,
        JsonIcon,
        CaretDownIcon
    }                           from "$icons";
    import type { ShapeOption } from "$models";
    import { Input, ButtonUI }  from "$components";


    export let options          : ShapeOption[] = [];
    export let onOptionsChange  : ( newOptions: ShapeOption[] ) => void;


    let isLoading = false;
    let isAddingOption = false;


    function addNewOption(): void {
        isAddingOption = true;

        try {
            const newOptions = [
                ...options,
                {
                    id      : uuid(),
                    label   : '',
                    value   : ''
                }
            ];

            onOptionsChange( newOptions );
        } finally {
            isAddingOption = false;
        }
    }


    function deleteOption( item: ShapeOption ): void {
        const newOptions = options.filter( option => option.id !== item.id );
        onOptionsChange( newOptions );
    }


    const processJsonData = ( data: any[] ): ShapeOption[] =>
        data.map(item => ({
            id      : uuid(),
            label   : item.label || item.name || '',
            value   : item.value || item.id || ''
        }));


    const processExcelData = ( data: any[] ): ShapeOption[] =>
        data.map(row => ({
            id      : uuid(),
            value   : row['value'] || '',
            label   : row['label'] || ''
        }));


    async function handleFileChange( event: Event ): Promise<void> {
        const target    = event.target as HTMLInputElement;
        const file      = target.files?.[0] || null;

        if ( !file ) return;

        const fileExt = file.name.split('.').pop()?.toLowerCase();

        if (!['json', 'xlsx', 'xls'].includes( fileExt || '' )) {
            alert( 'Solo se permiten archivos JSON o Excel (.xlsx, .xls)' );
            return;
        }

        isLoading = true;

        try {
            let newOptions: ShapeOption[];

            if ( fileExt === 'json' ) {
                const text = await file.text();
                const data = JSON.parse( text );

                newOptions = processJsonData( Array.isArray( data ) ? data : [ data ]);
            } else {
                const buffer        = await file.arrayBuffer();
                const workbook      = read( buffer );
                const firstSheet    = workbook.Sheets[workbook.SheetNames[0]];
                const data          = utils.sheet_to_json( firstSheet );

                newOptions = processExcelData( data );
            }

            onOptionsChange( newOptions );
        } catch ( error ) {
            console.error( 'Error al procesar el archivo:', error );
            alert( 'Error al procesar el archivo. Asegúrate de que el formato sea correcto.' );
        } finally {
            isLoading = false;
            if ( target ) target.value = '';
        }
    }


    function triggerFileInput(): void {
        const fileInput = document.getElementById( 'fileInput' ) as HTMLInputElement;
        if (fileInput) fileInput.click();
    }


    function keyAddOption( event: KeyboardEvent ): void {
        if ( event.key === 'Enter' ) addNewOption();
    }
</script>


<Accordion.Root class="w-full" type="single">
    <Accordion.Item
        value="values"
        class="border-b border-b-zinc-400 dark:border-b-zinc-600 transition-colors"
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

                        <input
                            id          = "fileInput"
                            type        = "file"
                            class       = "hidden"
                            accept      = ".json,.xlsx,.xls"
                            on:change   = { handleFileChange }
                        />

                        <ButtonUI
                            onClick     = { addNewOption }
                            disabled    = { isLoading || isAddingOption }
                        >
                            {#if isAddingOption}
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
                {#each options as item}
                    <Input
                        shapeInput={{
                            id: uuid(),
                            name: uuid(),
                            value: item.value,
                            placeholder: 'Ingrese el valor',
                            type: 'search'
                        }}
                        onInput={(event: Event) => {
                            item.value = (event.target as HTMLInputElement).value;
                            onOptionsChange(options);
                        }}
                    />

                    <div class="flex gap-2 items-start">
                        <Input
                            shapeInput={{
                                id          : uuid(),
                                name        : uuid(),
                                value       : item.label,
                                placeholder : 'Ingrese la etiqueta para mostrar',
                                type        : 'search'
                            }}
                            onInput={( event: Event ) => {
                                item.label = (event.target as HTMLInputElement).value;
                                onOptionsChange(options);
                            }}
                            onKeyup={ keyAddOption }
                        />

                        <ButtonUI
                            onClick     = {() => deleteOption( item )}
                            disabled    = { options.length === 1 }
                            styles      = "mt-1.5"
                        >
                            <DeleteIcon />
                        </ButtonUI>
                    </div>
                {:else}
                    <span class="text-sm text-zinc-900 dark:text-zinc-500">No hay opciones</span>
                {/each}
            </div>
        </Accordion.Content>
    </Accordion.Item>
</Accordion.Root>
