<script lang="ts">
	import {
		dndzone,
		type DndEvent
	} 					from "svelte-dnd-action";
	import { flip }		from 'svelte/animate';

	import { v4 as uuid } from 'uuid';

	import {
		Preview,
		EditorView,
		Enumeration,
		SubTitle,
		Input,
		Combobox
	}							from '$components';
	import { AddIcon }			from "$icons";
	import { templateJson } 	from "$lib";
	import type { ShapeInput }	from '$models';


	const flipDurationMs = 100;

	let template  	= templateJson as ShapeInput[];
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
</script>


<main class="space-y-2">
	<Combobox
		shapeInput={{
			id			: uuid(),
			name		: 'search',
			options 	: [ { label: 'template', value: 'Template original' } ],
			label		: 'Plantillas de formularios',
			placeholder	: 'Seleccione una plantilla'
		}}
		onSelectedChange={() => {}}
	/>

	<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
		<container class="space-y-3 max-h-full h-full overflow-auto">
			<SubTitle title="Editor" />

			<div
				class		= "space-y-3"
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
				class="w-full flex justify-center hover:brightness-105 dark:hover:brightness-110 shadow-md rounded-lg p-5 border-1 border-zinc-300 dark:border-zinc-700 border bg-white dark:bg-zinc-900 active:scale-[0.99] active:brightness-90"
				on:click={addItem}
			>
				<AddIcon />
			</button>
		</container>

		<Preview {template} { inputActive }/>
	</div>

	{#if template.length > 0}
		<Input 
			shapeInput={{
				id			: uuid(),
				name		: 'template-name',
				label		: 'Nombre de la nueva plantilla',
				placeholder	: 'Escribe aquí para crear el nombre de la plantilla'
			}}
			onInput= {() => {}}
		/>
	{/if}
</main>
