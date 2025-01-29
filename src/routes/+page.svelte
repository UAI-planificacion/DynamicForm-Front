<script lang="ts">
	import {
		dndzone,
		type DndEvent
	} 							from "svelte-dnd-action";
	import { flip }				from 'svelte/animate';
	import { fade, fly, scale } from 'svelte/transition';
    import { onMount }          from "svelte";


	import { v4 as uuid }	from 'uuid';
	import { Separator, type Selected }	from "bits-ui";

	import {
		Preview,
		EditorView,
		Enumeration,
		SubTitle,
		Input,
		Combobox,
		Resizable
	}							from '$components';
	import { AddIcon }			from "$icons";
	import { ROUTER, templateJson } 	from "$lib";
	import type { ShapeInput, ShapeOptions }	from '$models';
	import { dynamicMode } 		from "$stores";


    import type { DynamicForm } from '$models';
    import {  dynamicForms } from "$stores";

	const flipDurationMs = 100;

	let template  	: ShapeInput[] = [];
	// let template  	= templateJson as ShapeInput[];
	let inputActive = 0;

	const handleConsider = ( env: CustomEvent<DndEvent<ShapeInput>> ) =>
		template = [ ...env.detail.items ];


	const handleFinalize = ( env: CustomEvent<DndEvent<ShapeInput>> ) => {
		template 	= [ ...env.detail.items ];
		inputActive = 0;
	}


	const addItem = () => template = [
		...template, {
			id		: uuid(),
			name 	: '',
			shape	: 'none',
		}
	];


	const deleteItem = ( id: string ) => template = [
		...template.filter( temp => temp.id !== id ) ?? []
	];


	$: if ( !$dynamicMode ) inputActive = 0;


    let options: ShapeOptions[] = [];


    onMount( async () => {
        const values = await fetch( ROUTER.DYNAMIC_FORM.GET_ALL )
            .then( res => res.json() );

        const forms : DynamicForm[] = values.response;

        dynamicForms.init( forms );

        options = forms.map( form => ({
            label: form.name,
            value: form._id
        }));

        options = [ ...options, {
            label: 'Nuevo formulario',
            value: 'new'
        }];
    });


    function handleTemplateChange(
        selected: Selected<string> | Selected<string>[] | undefined
    ): void {
        if ( !selected || selected instanceof Array ) return;

        const selectedForm = $dynamicForms
            .find( form => form._id === selected.value );

        if ( selected.value === 'new' ) {
            template = [];
            return;
        }

        if ( selectedForm ) {
            template = selectedForm.details;
        }
    }
</script>


<main class="px-4 py-5 mx-auto 2xl:mx-36 space-y-5 overflow-hidden">
	<div 
		class   = "mx-1"
		in:fly  = {{ y: -20, duration: 300 }}
		out:fly = {{ y: 20, duration: 300 }}
	>
		<Combobox
			shapeInput={{
				id			: uuid(),
				name		: 'search',
				options,
				label		: 'Plantillas de formularios',
				placeholder	: 'Seleccione una plantilla'
			}}
			onSelectedChange = { handleTemplateChange }
		/>
	</div>

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
						use:dndzone = {{ items: template, flipDurationMs, dropTargetStyle: {} }}
						on:consider = { handleConsider }
						on:finalize = { handleFinalize }
					>
						{#each template ?? [] as item, index ( item.id )}
							<div animate:flip={{ duration: flipDurationMs }}>
								<div class="flex gap-1.5">
									<Enumeration
										number	= { index + 1 }
										active	= { inputActive === index + 1 }
									/>

									<EditorView
										bind:shapeInput	= { template[index] }
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
					<Preview { template } { inputActive } dynamicMode={ $dynamicMode } />
				</div>
			</Resizable>

			{#if template.length > 0}
				<div in:fade={{ duration: 200, delay: 300 }}>
					<Input 
						shapeInput={{
							id			: uuid(),
							name		: 'template-name',
							label		: 'Nombre de la nueva plantilla',
							placeholder	: 'Escribe aquí para crear el nombre de la plantilla'
						}}
						onInput= {() => {}}
					/>
				</div>
			{/if}
		</div>
	{:else}
		<Separator.Root orientation="horizontal" class="w-full h-[1px] rounded-lg bg-zinc-300 dark:bg-zinc-600" />

		<div 
			class		= "mt-5"
			in:scale	= {{ duration: 300, start: 0.95 }}
			out:scale	= {{ duration: 300, start: 1 }}
		>
			<Preview { template } { inputActive } dynamicMode = { $dynamicMode } />
		</div>
	{/if}
</main>
