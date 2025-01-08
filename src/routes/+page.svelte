<script lang="ts">
	import {
		dndzone,
		type DndEvent
	} 					from "svelte-dnd-action";
	import { flip }		from 'svelte/animate';

	import { Separator }	from "bits-ui";
	import { v4 as uuid }	from 'uuid';

	import {
		EditIcon,
		NameIcon,
		InputIcon,
		FlagIcon,
		DeleteIcon,
		AddIcon
	}									from "$icons";
	import { templateJson } 			from "$lib/template";
	import type { ShapeInput } 			from '$models';
	import { Preview, Dialog, Input, EditorView }	from '$components';


    const flipDurationMs = 100;
	let template  = templateJson as ShapeInput[];


	console.log("🚀 ~ template:", template);

	const handleConsider = ( env: CustomEvent<DndEvent<ShapeInput>> ) =>
		template = [...env.detail.items];

	const handleFinalize = ( env: CustomEvent<DndEvent<ShapeInput>> ) =>
		template = [...env.detail.items];


	// let form : ShapeInput = {
	// 	id		: uuid(),
	// 	name 	: '',
	// 	shape	: 'none',
	// };


	// const onSave = ( ev: ShapeInput ) => {
	// 	template = [...template, ev];
	// }
</script>


<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
	<container class="space-y-3 max-h-full h-full overflow-auto">
		<h2>Editor</h2>

		<div
			class		= "space-y-3"
			use:dndzone = {{ items: template, flipDurationMs, dropTargetStyle: {} }}
			on:consider = { handleConsider }
			on:finalize = { handleFinalize }
		>
			{#each template as item (item.id || item.uniqueIdentifier) }
				<div
					class="hover:brightness-105 shadow-md rounded-md p-5 border-1 border-zinc-300 border bg-white"
					animate:flip={{ duration: flipDurationMs }}
				>
					<EditorView
						shapeInput	= {item}
						onDelete	= {() => template = [...template.filter( temp => temp.id !== item.id )] }
					/>
				</div>
			{/each}
		</div>

		<!-- <Dialog {form} {onSave} /> -->
		<button
			class="w-full flex justify-center hover:brightness-105 shadow-md rounded-lg p-5 border-1 border-zinc-300 border bg-white active:scale-[0.99] active:brightness-90"
			on:click={() => template = [...template, {
				id		: uuid(),
				name 	: '',
				shape	: 'none',
			}]}
		>
			<AddIcon />
		</button>
	</container>

	<Preview {template} />
</div>
