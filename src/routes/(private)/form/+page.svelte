<script lang="ts">
	import {
		dndzone,
		type DndEvent
	} 							from "svelte-dnd-action";
	import { flip }				from 'svelte/animate';
	import { fade, fly, scale } from 'svelte/transition';
    import { onMount }          from "svelte";

	import { v4 as uuid }   from 'uuid';
	import { Separator }    from "bits-ui";
    import toast            from "svelte-french-toast";

	import {
		Preview,
		EditorView,
		Enumeration,
		SubTitle,
		Input,
		Resizable,
        DeleteModel,
        VirtualSelect
	}							            from '$components';
	import type {
        ShapeInput,
        ShapeOption,
        DynamicForm,
        SelectInput
    }                                       from '$models';
	import {
        buttonTemplate,
        errorToast,
        ROUTER,
        successToast,
        startClean,
        authClient,
    }                                       from "$lib";
	import { AddIcon, LoadIcon, SaveIcon }  from "$icons";
	import { dynamicMode, dynamicForms, themeShapeStore } 	from "$stores";
	import CircleLoader                     from "$components/Placeholder/CircleLoader.svelte";


	const flipDurationMs    = 100;
    const defaultSelected   = 'Nuevo formulario';
    const session           = authClient.useSession();


    let options         : ShapeOption[] = [];
	let inputActive     = 0;
    let optionSelected  = 'new';
    let isLoading       = true;
    let initialLoading  = true;
    let dynamicForm     : DynamicForm = {
        _id         : '',
        name        : '',
        details     : [ buttonTemplate ] ,
        user_email  : ''
    };

    $: {
        if ( $session?.data?.user?.email ) {
            if ( dynamicForm.user_email !== $session.data.user.email ) {
                dynamicForm.user_email = $session.data.user.email;
            }
        }
    }

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


	const addItem = () => {
        isValidList.push( false );

        return dynamicForm.details = [
		{
			id		: uuid(),
			name 	: '',
			shape	: 'none',
		}, ...dynamicForm.details,
	];
}


	const deleteItem = ( id: string ) => {
		const indexToDelete = dynamicForm.details.findIndex(temp => temp.id === id);

		dynamicForm.details = [
			...dynamicForm.details.filter(temp => temp.id !== id) ?? []
		];

		if (indexToDelete !== -1) {
			isValidList.splice(indexToDelete, 1);
			isValidList = [...isValidList];
		}
	};


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
        .finally(() => { initialLoading = false; isLoading = false } );
    });


    function validateForm(): boolean {
        const allValid = isValidList.every( valid => valid === true );

        if ( !allValid ) {
            toast.error( "El formulario es inválido, por favor revise el editor", errorToast() );
            return false;
        }

        if ( !dynamicForm.name ) {
            toast.error( "El nombre del formulario es requerido.", errorToast() )
            formName.valid = false;
            return false;
        }

        if ( dynamicForm.details.length === 1 ) {
            toast.error( "Debe agregar al menos un elemento al formulario", errorToast() )
            return false;
        }

        try {
            dynamicForm = startClean( dynamicForm );
        } catch ( error ) {
            toast.error( 'Algunos datos son inválidos, por favor revise los campos', errorToast() );
            return false;
        }

        isLoading           = true;
        formName.disabled   = true;
        dynamicForm.name    = dynamicForm.name.trim();

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
                toast.error( 'Ocurrió un error al crear el formulario', errorToast() );
                return null;
            }

            const data = await res.json();
            const form: DynamicForm = data.response;

            dynamicForms.add( form );

            optionSelected = form.name;

            handleTemplateChange( form._id );

            toast.success( 'Formulario creado correctamente', successToast() );
        })
        .catch( err => {
            console.error( err );
            toast.error( '', errorToast() );
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
                toast.error( 'Ocurrió un error al eliminar el formulario', errorToast() );
                return null;
            };

            dynamicForms.remove( dynamicForm._id );

            handleTemplateChange( 'new' );

            formName.value = '';

            toast.success( "Formulario eliminado correctamente", successToast() );
        }).catch( err => {
            console.error( err );
            toast.error( 'Ocurrió un error al eliminar el formulario', errorToast() );
        })
        .finally( enableAll );
    }


    function handleTemplateChange(
        selected: SelectInput
    ): void {
        if ( !selected || selected instanceof Array ) return;

        optionSelected = selected;

        if ( selected === 'new' ) {
            dynamicForm = {
                ...dynamicForm,
                name    : '',
                details : [ buttonTemplate ],
            };

            return;
        }

        const selectedForm = $dynamicForms.find( form => form._id === selected );

        if ( !selectedForm ) {
            dynamicForm.details = [];
            return;
        }

        formName.value = selectedForm.name;
        dynamicForm = { ...selectedForm, name: selectedForm.name };
    }


    const formName: ShapeInput = {
		id			: uuid(),
		name		: 'template-name',
		label		: 'Nombre de la plantilla',
		placeholder	: 'Escribe aquí para crear el nombre de la plantilla',
        required	: true,
        shape		: 'input',
        msgRequired : 'El campo es requerido.',
        valid       : true,
    }

    let isValidList: boolean[] = [];

    $: if ( dynamicForm.details )
        isValidList = Array( dynamicForm.details.length ).fill( !( optionSelected === 'new' ));
</script>


<main class="px-4 py-5 mx-auto 2xl:mx-36 space-y-5">
    <div 
        class   = "mx-1 relative"
        in:fly  = {{ y: -20, duration: 300 }}
        out:fly = {{ y: 20, duration: 300 }}
    >
        <VirtualSelect
            shapeInput = {{
                id			        : uuid(),
                name		        : 'search',
                shape               : 'select',
                multiple            : false,
                search              : true,
                heightPanel         : 8,
                label		        : 'Plantillas de formularios',
                placeholder	        : 'Seleccione una plantilla',
                searchPlaceholder   : 'Buscar plantilla',
                disabled            : initialLoading,
                options,
            }}
            onSelectedChange = { handleTemplateChange }
            value = { optionSelected }
        />

        <Separator.Root
            orientation = "horizontal"
            class       = "w-full h-[1px] rounded-lg bg-primary dark:bg-primary/70 my-4"
        />
    </div>

    {#if dynamicForm.details.length > 0}
        <div
            class		= "mt-5 relative"
            in:scale	= {{ duration: 300, start: 0.95 }}
            out:scale	= {{ duration: 300, start: 1 }}
        >
            {#if $dynamicMode}
                <div
                    out:fade	= {{ duration: 300, delay: 300 }}
                    in:fade		= {{ duration: 300, delay: 300 }}
                    class		= "space-y-5"
                >

                    {#if initialLoading}
                        <CircleLoader />
                    {:else}
                        <Resizable>
                            <container slot="left" class="ml-1 h-full flex flex-col space-y-3">
                                <SubTitle title="Editor" />

                                <div
                                    class		= "flex-1 space-y-3"
                                    on:consider = { handleConsider }
                                    on:finalize = { handleFinalize }
                                    use:dndzone = {{
                                        flipDurationMs,
                                        items           : dynamicForm.details,
                                        dropTargetStyle : {},
                                        dragDisabled    : inputActive > 0
                                    }}
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
                                                    bind:isValid	= { isValidList[index] }
                                                />
                                            </div>
                                        </div>
                                    {/each}
                                </div>

                                <button
                                    class="hover:shadow-xl transition-colors delay-300 flex-shrink-0 w-full flex justify-center hover:brightness-105 dark:hover:brightness-110 shadow-md rounded-lg p-5 border-1 border-zinc-300 dark:border-zinc-700 border bg-white dark:bg-zinc-900 active:scale-[0.99] active:brightness-90"
                                    on:click={ addItem }
                                >
                                    <AddIcon />
                                </button>
                            </container>

                            <div slot="right" class="relative px-1">
                                <Preview
                                    { inputActive }
                                    template    = { dynamicForm.details }
                                    dynamicMode = { $dynamicMode }
                                    themeShape  = { dynamicForm.themeShape ?? $themeShapeStore }
                                />
                            </div>
                        </Resizable>

                        <Separator.Root
                            orientation = "horizontal"
                            class       = "w-full h-[1px] rounded-lg bg-primary dark:bg-zinc-700 my-4"
                        />

                        <div
                            class   = "flex flex-row items-start w-full gap-2"
                            in:fade = {{ duration: 1000, delay: 50 }}
                        >
                            <Input 
                                shapeInput  = { formName }
                                onInput     = {( value ) => dynamicForm.name = value }
                                value       = { dynamicForm.name }
                                setError    = { () => formName.valid = dynamicForm.name.length > 0 }
                            />

                            <div class="flex items-start gap-2 mt-[1.7rem]">
                                {#if optionSelected === 'new' }
                                    <button
                                        class       = "h-10 sm:h-9 w-20 sm:w-40 md:w-36 bg-primary transition-colors text-white py-2 px-4 rounded flex items-center gap-2 justify-center active:scale-[0.99] active:brightness-90 hover:brightness-105 dark:hover:brightness-110 shadow-md active:bg-blue-600 dark:active:bg-blue-800"
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
                                        class       = "h-10 sm:h-9 w-20 md:w-36 bg-primary transition-colors text-white py-2 px-4 rounded flex items-center gap-2 justify-center active:scale-[0.99] active:brightness-90 hover:brightness-105 dark:hover:brightness-110 shadow-md active:bg-blue-600 dark:active:bg-blue-800"
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
                    {/if}
                </div>
            {:else}
                <div 
                    class		= "mt-5 relative"
                    in:scale	= {{ duration: 300, start: 0.95 }}
                    out:scale	= {{ duration: 300, start: 1 }}
                >
                    <Preview
                        { inputActive }
                        template    = { dynamicForm.details }
                        dynamicMode = { $dynamicMode }
                        themeShape  = { dynamicForm.themeShape ?? $themeShapeStore }
                    />
                </div>
            {/if}
        </div>
    {:else}
        <div
            class		= "w-full h-full flex flex-col items-center justify-center relative"
            in:scale	= {{ duration: 300, start: 0.95 }}
            out:scale	= {{ duration: 300, start: 1 }}
        >
            <span class="text-md text-zinc-700 dark:text-zinc-400 transition-colors">
                Por favor, selecciona una plantilla
            </span>
        </div>
    {/if}
</main>
