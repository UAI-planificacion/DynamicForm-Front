<script lang="ts">
	import {
		dndzone,
		type DndEvent
	} 					from "svelte-dnd-action";
	import { flip }		from 'svelte/animate';

	import { v4 as uuid }	from 'uuid';
	import { Separator }	from "bits-ui";

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
	import { templateJson } 	from "$lib";
	import type { ShapeInput }	from '$models';
	import { dynamicMode } 		from "$stores";

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

<main class="px-4 py-5 mx-auto 2xl:mx-36 space-y-5 overflow-hidden">
	<div class="mx-1">
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
	</div>

	{#if $dynamicMode}
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
	{:else}
		<Separator.Root orientation="horizontal" class="w-full h-[1px] rounded-lg bg-zinc-300 dark:bg-zinc-600" />

		<div class="mt-5">
			<Preview { template } { inputActive } dynamicMode={ $dynamicMode } />
		</div>
	{/if}
</main>
