<script lang="ts">
	import {
		dndzone,
		type DndEvent
	} 					from "svelte-dnd-action";
	import { flip }		from 'svelte/animate';

	import { v4 as uuid }	from 'uuid';

	import { AddIcon }				from "$icons";
	import { templateJson } 		from "$lib";
	import type { ShapeInput }		from '$models';
	import { Preview, EditorView }	from '$components';


	const flipDurationMs = 100;

	let template  = templateJson as ShapeInput[];

	const handleConsider = ( env: CustomEvent<DndEvent<ShapeInput>> ) =>
		template = [...env.detail.items];

	const handleFinalize = ( env: CustomEvent<DndEvent<ShapeInput>> ) =>
		template = [...env.detail.items];

	const addItem = () => template = [
		...template, {
			id		: uuid(),
			name 	: '',
			shape	: 'none',
		}];

	const deleteItem = ( id: string ) => template = [
		...template.filter( temp => temp.id !== id ) ?? []
	];
</script>


<main class="grid grid-cols-1 sm:grid-cols-2 gap-4">
	<container class="space-y-3 max-h-full h-full overflow-auto">
		<h2>Editor</h2>

		<div
			class		= "space-y-3"
			use:dndzone = {{ items: template, flipDurationMs, dropTargetStyle: {} }}
			on:consider = { handleConsider }
			on:finalize = { handleFinalize }
		>
			{#each template ?? [] as item, index ( item.id )}
				<div
					class="hover:brightness-105 shadow-md rounded-md p-5 border-1 border-zinc-300 border bg-white"
					animate:flip={{ duration: flipDurationMs }}
				>
					<EditorView
						bind:shapeInput	= { template[index] }
						onDelete		= { () => deleteItem( item.id )}
					/>
				</div>
			{/each}
		</div>

		<button
			class="w-full flex justify-center hover:brightness-105 shadow-md rounded-lg p-5 border-1 border-zinc-300 border bg-white active:scale-[0.99] active:brightness-90"
			on:click={addItem}
		>
			<AddIcon />
		</button>
	</container>

	<Preview {template} />
</main>
