<script lang="ts">
	import {
		dndzone,
		type DndEvent
	} 							from "svelte-dnd-action";
	import { flip }				from 'svelte/animate';
	import { fade, fly, scale } from 'svelte/transition';
    import { onMount }          from "svelte";

	import { v4 as uuid }	            from 'uuid';
	import { Separator, type Selected }	from "bits-ui";
    import toast                        from "svelte-french-toast";


	import {
		Preview,
		EditorView,
		Enumeration,
		SubTitle,
		Input,
		Combobox,
		Resizable,
        DeleteModel
	}							            from '$components';
	import type {
        ShapeInput,
        ShapeOptions,
        DynamicForm
    }                                       from '$models';
	import {
        buttonTemplate,
        errorToast,
        ROUTER,
        successToast
    }                                       from "$lib";
	import { AddIcon, LoadIcon, SaveIcon }  from "$icons";
	import { dynamicMode, dynamicForms } 	from "$stores";


	const flipDurationMs = 100;
    const defaultSelected = 'Nuevo formulario';

    let dynamicForm     : DynamicForm = { _id: '', name : '' , details: [] , user_id: 'kevincandia'};
    let options         : ShapeOptions[] = [];
	let inputActive     = 0;
    let optionSelected  = '';
    let isLoading       = true;

    // Esta función se ejecutará cada vez que dynamicForm.details cambie
    $: {
        if ( $dynamicForms ) {
            options = [...$dynamicForms.map( form => ({
                label: form.name,
                value: form._id
            })), {
                label: defaultSelected,
                value: 'new'
            }]
        }
    }


	const handleConsider = ( env: CustomEvent<DndEvent<ShapeInput>> ) =>
		dynamicForm.details = [ ...env.detail.items ];


    const handleFinalize = ( env: CustomEvent<DndEvent<ShapeInput>> ) =>
		dynamicForm.details = [ ...env.detail.items ];


	const addItem = () => dynamicForm.details = [
		{
			id		: uuid(),
			name 	: '',
			shape	: 'none',
		}, ...dynamicForm.details,
	];


	const deleteItem = ( id: string ) => dynamicForm.details = [
		...dynamicForm.details.filter( temp => temp.id !== id ) ?? []
	];


	$: if ( !$dynamicMode ) inputActive = 0;


    onMount( async () => {
        await fetch( ROUTER.DYNAMIC_FORM.GET_ALL )
        .then( async res => {
            if ( !res.ok ) {
                console.error( res );
                toast.error( 'Falla al obtener los formularios dinámicos', errorToast() );
                return null;
            }

            const data = await res.json();

            if ( data.response.code === "NETWORK_ERROR" ) {
                console.error( data.response );
                toast.error( 'Ocurrio un error inesperado. El servidor no responde', errorToast() );
                return null;
            }

            dynamicForms.init( data.response as DynamicForm[] );
        } )
        .catch( err => {
            console.error( err );
            toast.error( 'Failed to fetch dynamic forms', errorToast() );
        } )
        .finally(() => isLoading = false );
    });

    function validateForm(): boolean {
        if ( dynamicForm.name === '' || dynamicForm.name === undefined || dynamicForm.name === null ) {
            toast.error( "El nombre del formulario es requerido.", errorToast() )
            formName.valid = false;
            return false;
        }

        if ( dynamicForm.details.length === 1 ) {
            toast.error( "Debe agregar al menos un elemento al formulario", errorToast() )
            return false;
        }

        isLoading           = true;
        formName.disabled   = true;
        return true;
    }

    function enableAll() {
        isLoading = false;
        formName.disabled = false;
    }


    async function saveTemplate() {
        if ( !validateForm() ) return;

        await fetch(
            ROUTER.DYNAMIC_FORM.CREATE, {
                body    : JSON.stringify( dynamicForm ),
                method  : 'POST'
            }
        ).then( async res => {
            if ( !res.ok ) {
                toast.error( 'Failed to create dynamic form', errorToast() );
                return null;
            }

            const data = await res.json();
            const form: DynamicForm = data.response;

            dynamicForms.add( form );

            optionSelected = form.name;

            handleTemplateChange({ 
                label: form.name,
                value: form._id
            });

            toast.success( 'Formulario creado correctamente', successToast() );
        })
        .catch( err => {
            console.error( err );
            toast.error( 'Failed to create dynamic form', errorToast() );
        })
        .finally( enableAll );
    }


    async function updatedTemplate() {
        if ( !validateForm() ) return;

        await fetch(
            ROUTER.DYNAMIC_FORM.UPDATE( dynamicForm._id ), {
                method  : 'PUT',
                body    : JSON.stringify( dynamicForm )
            }
        ).then( async res => {
            if ( !res.ok ) return;

            const data = await res.json();

            dynamicForms.update( dynamicForm._id, data.response );

            toast.success( "Formulario actualizado correctamente", successToast() );
        })
        .catch( _ => toast.error( "Ocurrió un error al actualizar el formulario", errorToast() ))
        .finally( enableAll );
    }


    async function deletedTemplate() {
        isLoading           = true;
        formName.disabled   = true;

        await fetch(
            ROUTER.DYNAMIC_FORM.DELETE( dynamicForm._id ), {
                method: 'DELETE'
            }
        ).then( res =>  {
            if ( !res.ok ) {
                toast.error( 'Failed to delete dynamic form', errorToast() );
                return null;
            };

            dynamicForms.remove( dynamicForm._id );
            handleTemplateChange({ 
                label: defaultSelected,
                value: 'new'
            });

            formName.value = '';

            toast.success( "Formulario eliminado correctamente", successToast() );
        }
        ).catch( err => {
            console.error( err );
            toast.error( 'Failed to delete dynamic form', errorToast() );
        })
        .finally( enableAll );
    }


    function handleTemplateChange(
        selected: Selected<string> | Selected<string>[] | undefined
    ): void {
        if ( !selected || selected instanceof Array ) return;

        optionSelected = selected.value;
        formName.value = optionSelected === 'new' ? '' : selected.label;

        if ( selected.value === 'new' ) {
            dynamicForm = {
                ...dynamicForm,
                name    : '',
                details : [ buttonTemplate ],
            };

            return;
        }

        const selectedForm = $dynamicForms
            .find( form => form._id === selected.value );

        if ( !selectedForm ) {
            dynamicForm.details = [];
            return;
        }

        dynamicForm = { ...selectedForm, name: selected.label! };
    }


    const formName: ShapeInput = {
		id			: uuid(),
		name		: 'template-name',
		label		: 'Nombre de la nueva plantilla',
		placeholder	: 'Escribe aquí para crear el nombre de la plantilla',
        required	: true,
        shape		: 'input',
        msgRequired : 'El campo es requerido.',
        valid       : true,
    }
</script>


<main class="px-4 py-5 mx-auto 2xl:mx-36 space-y-5 overflow-hidden">
	<div 
		class   = "mx-1"
		in:fly  = {{ y: -20, duration: 300 }}
		out:fly = {{ y: 20, duration: 300 }}
	>
		<Combobox
			shapeInput = {{
				id			: uuid(),
				name		: 'search',
                shape       : 'combobox',
				options,
				label		: 'Plantillas de formularios',
				placeholder	: 'Seleccione una plantilla',
                disabled    : isLoading,
                selected    : optionSelected
			}}
			onSelectedChange = { handleTemplateChange }
		/>
	</div>

    {#if dynamicForm.details.length > 0}
        <div
            class		= "mt-5"
            in:scale	= {{ duration: 300, start: 0.95 }}
            out:scale	= {{ duration: 300, start: 1 }}
        >
            {#if $dynamicMode}
                <div
                    out:fade	= {{ duration: 300, delay: 300 }}
                    in:fade		= {{ duration: 300, delay: 300 }}
                    class		= "space-y-5"
                >
                    <Resizable>
                        <container slot="left" class="ml-1 h-full flex flex-col space-y-3 overflow-y-auto">
                            <SubTitle title="Editor" />

                            <div
                                class		= "flex-1 space-y-3 overflow-y-auto"
                                use:dndzone = {{ items: dynamicForm.details, flipDurationMs, dropTargetStyle: {} }}
                                on:consider = { handleConsider }
                                on:finalize = { handleFinalize }
                            >
                                {#each dynamicForm.details ?? [] as item, index ( item.id )}
                                    <div animate:flip={{ duration: flipDurationMs }}>
                                        <div class="flex gap-1.5">
                                            <Enumeration
                                                number	= { index + 1 }
                                                active	= { inputActive === index + 1 }
                                            />

                                            <EditorView
                                                bind:shapeInput	= { dynamicForm.details[index] }
                                                onDelete		= { () => deleteItem( item.id )}
                                                inputActive 	= { () => inputActive = index + 1 }
                                                inputDesactive	= { () => inputActive = 0 }
                                            />
                                        </div>
                                    </div>
                                {/each}
                            </div>

                            <button
                                class="flex-shrink-0 w-full flex justify-center hover:brightness-105 dark:hover:brightness-110 shadow-md rounded-lg p-5 border-1 border-zinc-300 dark:border-zinc-700 border bg-white dark:bg-zinc-900 active:scale-[0.99] active:brightness-90"
                                on:click={ addItem }
                            >
                                <AddIcon />
                            </button>
                        </container>

                        <div slot="right" class="overflow-auto mr-1">
                            <Preview template={ dynamicForm.details } { inputActive } dynamicMode={ $dynamicMode } />
                        </div>
                    </Resizable>

                    <div
                        class   = "flex flex-row items-start w-full gap-2"
                        in:fade = {{ duration: 1000, delay: 50 }}
                    >
                        <Input 
                            shapeInput  = { formName }
                            onInput     = {( value : Event ) => dynamicForm.name = ( value.target as HTMLInputElement ).value}
                            value       = { dynamicForm.name }
                            setError    = { () => formName.valid = dynamicForm.name.length > 0 }
                        />

                        <div class="flex items-start gap-2 mt-[1.7rem]">
                            {#if optionSelected === 'new' }
                                <button
                                    class       = "h-10 sm:h-9 w-20 sm:w-40 md:w-36 bg-amber-500 dark:bg-amber-700 transition-colors text-white py-2 px-4 rounded flex items-center gap-2 justify-center active:scale-[0.99] active:brightness-90 hover:brightness-105 dark:hover:brightness-110 shadow-md active:bg-amber-600 dark:active:bg-amber-800"
                                    on:click    = { saveTemplate }
                                    disabled    = { isLoading }
                                >
                                    <SaveIcon />

                                    {#if isLoading }
                                        <LoadIcon />
                                    {:else }
                                        <span class="hidden sm:block">
                                            Crear
                                        </span>
                                    {/if}
                                </button>
                            {:else }
                                <button
                                    class       = "h-10 sm:h-9 w-20 md:w-36 bg-amber-500 dark:bg-amber-700 transition-colors text-white py-2 px-4 rounded flex items-center gap-2 justify-center active:scale-[0.99] active:brightness-90 hover:brightness-105 dark:hover:brightness-110 shadow-md active:bg-amber-600 dark:active:bg-amber-800"
                                    on:click    = { updatedTemplate }
                                    disabled    = { isLoading }
                                >
                                    <SaveIcon />

                                    {#if isLoading }
                                        <LoadIcon />
                                    {:else }
                                        <span class="hidden sm:block">
                                            Actualizar
                                        </span>
                                    {/if}
                                </button>

                                <DeleteModel
                                    onConfirm   = { deletedTemplate }
                                    formName    = { dynamicForm.name }
                                    { isLoading }
                                />
                            {/if}
                        </div>
                    </div>
                </div>
            {:else}
                <Separator.Root orientation="horizontal" class="w-full h-[1px] rounded-lg bg-zinc-300 dark:bg-zinc-600" />

                <div 
                    class		= "mt-5"
                    in:scale	= {{ duration: 300, start: 0.95 }}
                    out:scale	= {{ duration: 300, start: 1 }}
                >
                    <Preview template = { dynamicForm.details } { inputActive } dynamicMode = { $dynamicMode } />
                </div>
            {/if}
        </div>
    {:else}
        <div
            class		= "w-full h-full flex flex-col items-center justify-center"
            in:scale	= {{ duration: 300, start: 0.95 }}
            out:scale	= {{ duration: 300, start: 1 }}
        >
            <span class="text-lg text-zinc-700 dark:text-zinc-400 transition-colors">
                Por favor, selecciona una plantilla
            </span>
        </div>
    {/if}
</main>
