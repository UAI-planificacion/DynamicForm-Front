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
		SubTitle
	}							from '$components';
	import { AddIcon }			from "$icons";
	import { templateJson } 	from "$lib";
	import type { ShapeInput }	from '$models';


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

	let inputActive = 0;
</script>


<main class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
			class="w-full flex justify-center hover:brightness-105 shadow-md rounded-lg p-5 border-1 border-zinc-300 border bg-white active:scale-[0.99] active:brightness-90"
			on:click={addItem}
		>
			<AddIcon />
		</button>
	</container>

	<Preview {template} { inputActive }/>
</main>
