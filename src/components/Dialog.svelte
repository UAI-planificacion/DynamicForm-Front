<script lang="ts">
	import { fade } from "svelte/transition";

	import {
		Dialog,
		Separator,
		type Selected,
	}						from "bits-ui";
	import { v4 as uuid } 	from "uuid";

	import {
		AddIcon,
		DeleteIcon,
		CloseIcon
	}					from "$icons";
	import type {
		InputType,
		ShapeInput,
		ShapeOptions
	}					from '$models';
	import {
		Check,
		Input,
		Select
	} 					from "$components";


	let options: ShapeOptions[] = [
		{ label: 'Entrada', 		value: 'input' },
		{ label: 'Buscador', 		value: 'combobox' },
		{ label: 'Verificar', 		value: 'check' },
		{ label: 'Seleccionable',	value: 'select' },
		{ label: 'Aréa de texto', 	value: 'textarea' },
		{ label: 'Fecha', 			value: 'datepicker' },
		{ label: 'Botón', 			value: 'button' },
	];


	export let form: ShapeInput;
	export let onSave;
</script>


<Dialog.Root>
    <Dialog.Trigger
		class="w-full flex justify-center hover:brightness-105 shadow-md rounded-lg p-5 border-1 border-zinc-300 border bg-white"
    >
		<AddIcon />
    </Dialog.Trigger>

	<Dialog.Portal>
		<Dialog.Overlay
			transition			= {fade}
			transitionConfig	= {{ duration: 150 }}
			class				= "fixed inset-0 z-50 bg-black/60"
		/>

		<Dialog.Content
			class="rounded-lg bg-white fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] rounded-card-lg border bg-background p-5 shadow-popover outline-none sm:max-w-[490px] md:w-full"
		>
			<Dialog.Title class="flex w-full items-center justify-center text-lg font-semibold tracking-tight">
				Crea un nuevo input
			</Dialog.Title>

			<Separator.Root class="-mx-5 mb-3 mt-3 block h-px bg-zinc-300" />

			<Dialog.Description class="text-sm text-foreground-alt mb-3">
				Create un nuevo input para el formulario
			</Dialog.Description>

			<div class="flex flex-col items-start gap-1 space-y-2">
				<div class="grid grid-cols-2 w-full gap-2">
					<Input
						shapeInput = {{
							id		: uuid(),
							name	: 'name',
							shape	: 'none',
							label	: 'Nombre'
						}}
						onInput = {( event: Event ) => form.name = ( event.target as HTMLInputElement ).value }
					/>

					<Select
						shapeInput			= {{
							id			: uuid(),
							name 		: 'shape',
							placeholder	: 'Ingrese el tipo',
							shape 		: 'none',
							required 	: true,
							label		: 'Input',
							options,
						}}
						onSelectedChange	= {(selected: Selected<string> | undefined) => form.shape = selected?.value as InputType || 'none' }
					/>
				</div>

				<div class="grid grid-cols-2 w-full gap-2">
					<Input
						shapeInput = {{
							id			: uuid(),
							name		: 'label',
							shape		: 'none',
							label		: 'Etiqueta',
							placeholder	: "Label que se mostrará"
						}}
						onInput = {( event: Event ) => form.label = ( event.target as HTMLInputElement ).value }
					/>

					<Input
						shapeInput = {{
							id			: uuid(),
							name		: 'placleholder',
							shape		: 'none',
							label		: 'Placeholder',
							placeholder	: "Placeholder que se mostrará"
						}}
						onInput = {( event: Event ) => form.placeholder = ( event.target as HTMLInputElement ).value }
					/>
				</div>

				<Check
					id 			= { uuid() }
					label		= { "Requerido" }
					onChange	= {( e ) => form.required = e as boolean }
				/>

				<Check
					id 			= { uuid() }
					label		= { "Solo lectura" }
					onChange	= {( e ) => form.readonly = e as boolean }
				/>

				<Check
					id 			= { uuid() }
					label		= { "Desactivado" }
					onChange	= {( e ) => form.disabled = e as boolean }
				/>

				<div class="h-36 w-full overflow-auto gap-2 grid grid-cols-2 pr-2">
					<span>Valor</span>
					<span>Label</span>
					{#each [1,2,3,4,5] as item }
						<input
							id			= "input"
							class		= "block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-400 focus:ring-0.5 focus:ring-gray-400 placeholder:text-gray-400 sm:text-sm"
							placeholder	= "Tipo de input"
							type		= "text"
						/>

						<div class="flex items-center gap-2">
							<input
								id			= "input"
								class		= "block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-400 focus:ring-0.5 focus:ring-gray-400 placeholder:text-gray-400 sm:text-sm"
								placeholder	= "Tipo de input"
								type		= "text"
							/>

							<button
								class="hover:brightness-105 active:scale-95"
							>
								<DeleteIcon />
							</button>
						</div>
					{/each}
				</div>
			</div>

			<button
				on:click={() => console.log('***FORM*** ~', form )}
			>
				Ver
			</button>

			<div class="flex w-full justify-end mt-4">
				<Dialog.Close
					class		= "py-2 inline-flex h-input items-center justify-center rounded-input bg-blue-500 px-[50px] text-[15px] font-semibold text-background shadow-mini hover:bg-dark/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95 rounded-lg"
					on:click	= {() => onSave({ ...form })}
				>
					Guardar
				</Dialog.Close>
			</div>

			<Dialog.Close
				class="absolute right-5 top-5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"
			>
				<div>
					<CloseIcon />

					<span class="sr-only">Close</span>
				</div>
			</Dialog.Close>
		</Dialog.Content>
    </Dialog.Portal>
</Dialog.Root>
