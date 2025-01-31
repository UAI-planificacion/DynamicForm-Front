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
		Resizable
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
	import { AddIcon, LoadIcon, SaveIcon }	        from "$icons";
	import { dynamicMode, dynamicForms } 	from "$stores";


	const flipDurationMs = 100;
    const defaultSelected = 'Nuevo formulario';

    let dynamicForm     : DynamicForm = { _id: '', name : '' , details: [] , user_id: 'kevincandia'};
    let options         : ShapeOptions[] = [];
	let inputActive     = 0;
    let optionSelected  = '';
    let isLoading       = false;
    


    // Esta función se ejecutará cada vez que dynamicForm.details cambie
    $: {
        if ( $dynamicForms ) {
            console.log('🚀 AQUI CAMBIA DynamicForm details changed:', $dynamicForms );

            options = $dynamicForms.map( form => ({
                label: form.name,
                value: form._id
            }));

            options = [ ...options, {
                label: defaultSelected,
                value: 'new'
            }];
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
        isLoading = true;

        await fetch( ROUTER.DYNAMIC_FORM.GET_ALL )
        .then( async res => {
            if ( !res.ok ) {
                toast.error( 'Failed to fetch dynamic forms', errorToast() );
                return null;
            }

            const data = await res.json();
            dynamicForms.init( data.response as DynamicForm[] );
        } )
        .catch( err => {
            console.error( err );
            toast.error( 'Failed to fetch dynamic forms', errorToast() );
        } )
        .finally(() => isLoading = false );
    });


    async function saveTemplate() {
        console.log( '🚀 ~ file: +page.svelte:121 ~ dynamicForm:', dynamicForm );

        if ( dynamicForm.name === '' || dynamicForm.name === defaultSelected ) {
            toast.error( "Hay un error en el formulario", errorToast() )
            return;
        }

        isLoading = true;

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

            // options = $dynamicForms.map( form => ({
            //     label: form.name,
            //     value: form._id
            // }));

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
        .finally(() => isLoading = false );
    }


    async function updatedTemplate() {
        if ( dynamicForm.name === '' ) {
            toast.error( "Hay un error en el formulario", errorToast() )
            return;
        }

        isLoading = true;

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
        .finally(() => isLoading = false );
    }


    async function deletedTemplate( id: string ) {
        isLoading = true;

        await fetch(
            ROUTER.DYNAMIC_FORM.DELETE( id ), {
                method: 'DELETE'
            }
        ).then( res =>  {
            console.log('🚀 ~ file: DELETED +page.svelte:180 ~ res:', res)
            if ( !res.ok ) {
                toast.error( 'Failed to delete dynamic form', errorToast() );
                return null;
            };

            dynamicForms.remove( id );
            handleTemplateChange({ 
                label: defaultSelected,
                value: 'new'
            });

            formName.value = '';
            formName.selected = '';

            toast.success( "Formulario eliminado correctamente", successToast() );

        }
        ).catch( err => {
            console.error( err );
            toast.error( 'Failed to delete dynamic form', errorToast() );
        })
        .finally(() => isLoading = false );
    }


    function handleTemplateChange(
        selected: Selected<string> | Selected<string>[] | undefined
    ): void {
        if ( !selected || selected instanceof Array ) return;

        formName.value = selected.label!;
        optionSelected = selected.value;

        if ( selected.value === 'new' ) {
            dynamicForm = {
                ...dynamicForm,
                name    : selected.label!,
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
        disabled    : isLoading
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

                    <!-- class   = "flex flex-row items-center w-full gap-2" -->
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

                        <div class="flex items-start gap-2 mt-[1.7rem] ">
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

                                <button
                                    class       = "h-10 sm:h-9 w-20 md:w-36 bg-red-500 dark:bg-red-700 transition-colors text-white py-2 px-4 rounded flex items-center gap-2 justify-center active:scale-[0.99] active:brightness-90 hover:brightness-105 dark:hover:brightness-110 shadow-md active:bg-amber-600 dark:active:bg-amber-800"
                                    on:click    = {() => deletedTemplate( dynamicForm._id )}
                                    disabled    = { isLoading }
                                >
                                    <SaveIcon />

                                    {#if isLoading }
                                        <LoadIcon />
                                    {:else }
                                        <span class="hidden md:block">
                                            Eliminar
                                        </span>
                                    {/if}
                                </button>
                            {/if}
                        </div>
                    </div>

                    <pre class="bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-100 p-5 rounded-lg break-words shadow-lg"
                    >{ JSON.stringify( dynamicForm, null, 2 )}</pre>
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
