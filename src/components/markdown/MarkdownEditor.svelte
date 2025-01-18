<script lang="ts">
	import { ToggleGroup } from "bits-ui";

	import marked from './marked.config';
	import { Select } from "$components";


	let valueGroup: string | undefined = "bold";

	import { Separator, Toolbar } from "bits-ui";
	let text: string[] | undefined = ["bold"];
	let align: string | undefined;


	export let value: string;

	let placeholder		: string = 'Escribe tu contenido aquí...';
	let textarea		: HTMLTextAreaElement | null = null;
	let selectionStart	: number = 0;
	let selectionEnd	: number = 0;


	function updateSelection(): void {
		if ( !textarea ) return;
		selectionStart 	= textarea.selectionStart;
		selectionEnd 	= textarea.selectionEnd;
	}


	function insertText(before: string, after: string = ''): void {
		if ( textarea && value !== undefined ) {
			const newStart 		= selectionStart + before.length;
			const newEnd 		= selectionEnd + before.length;
			const selectedText 	= value.substring( selectionStart, selectionEnd );

			value = value.substring( 0, selectionStart ) + before + selectedText + after + value.substring( selectionEnd );

			setTimeout(() => {
				textarea?.focus();

				if ( textarea ) {
					textarea.setSelectionRange( newStart, newEnd );
				}
			}, 0 );
		}
	}


	function handleKeydown( event: KeyboardEvent ): void {
		if ( event.key !== 'Enter' ) return;

		const currentLine 	= getCurrentLine();
		const match 		= currentLine.match( /^(\s*)((\d+\.|-)\s+)(.*)/ );

		if ( !match ) return;

		event.preventDefault();
		const [, indent, marker, , content] = match;

		if ( !content.trim() ) {
			const lineStart = value.lastIndexOf( '\n', selectionStart - 1 ) + 1;
			value = value.substring(0, lineStart) + value.substring( selectionStart );
			return;
		}

		const isNumbered = marker.includes('.');
		let nextMarker = marker;

		if ( isNumbered ) {
			const num = parseInt(marker);
			nextMarker = `${num + 1}. `;
		}

		insertText( '\n' + indent + nextMarker );
		return;
	}


	function getCurrentLine(): string {
		const lineStart = value.lastIndexOf( '\n', selectionStart - 1 ) + 1;
		const lineEnd 	= value.indexOf( '\n', selectionStart );
		return value.substring( lineStart, lineEnd === -1 ? value.length : lineEnd );
	}


	const tools = [
		{
			icon: 'H1',
			title: 'Título 1',
			action: () => insertText('# ', '\n')
		},
		{
			icon: 'H2',
			title: 'Título 2',
			action: () => insertText('## ', '\n')
		},
		{
			icon: 'H3',
			title: 'Título 2',
			action: () => insertText('### ', '\n')
		},
		{
			icon: 'H4',
			title: 'Título 2',
			action: () => insertText('#### ', '\n')
		},
		{
			icon: 'B',
			title: 'Negrita',
			action: () => insertText('**', '**')
		},
		{
			icon: 'I',
			title: 'Cursiva',
			action: () => insertText('*', '*')
		},
		{
			icon: '≋',
			title: 'Subrayado',
			action: () => insertText('~~', '~~')
		},
		{
			icon: '🔗',
			title: 'Enlace',
			action: () => insertText('[', '](url)')
		},
		{
			icon: '📷',
			title: 'Imagen',
			action: () => insertText('![alt text](', ')')
		},
		{
			icon: '>',
			title: 'Nota',
			action: () => insertText('> ')
		},
		{
			icon: '🔢',
			title: 'Lista numerada',
			action: () => insertText('1. ', '\n')
		},
		{
			icon: '⚫',
			title: 'Lista con viñetas',
			action: () => insertText('- ', '\n')
		},
		{
			icon: '[]',
			title: 'Lista con viñetas',
			action: () => insertText('- [] ', '\n')
		},
		{
			icon: '</>',
			title: 'Código',
			action: () => insertText('```\n', '\n```')
		},
		// {
		// 	icon: '📅',
		// 	title: 'Tabla',
		// 	action: () => insertText('| Columna 1 | Columna 2 |\n|-----------|------------|\n| Celda 1   | Celda 2    |\n')
		// },
        {
            icon: '_',
            title: 'Línea',
			action: () => insertText('___\n')
        },
        {
            icon: '∑',
            title: 'Fórmula',
			action: () => insertText('$', '$')
        }
	];

	let openPopoverTable = false


	import { Popover, Toggle } from "bits-ui";
	import DymamicTable from "./DynamicTable.svelte";
	import { onMount } from "svelte";


	let clickedCell: { row: number, col: number } | null = { row: 0, col: 0 };


	function generateMarkdownTable(clickedCell: { row: number, col: number }): string {
		const { row, col } = clickedCell;
	
		// Crear el encabezado de la tabla
		const header = Array(col).fill("Column").map((_, i) => `Col ${i + 1}`).join(" | ");
	
		// Crear la línea de separación del encabezado
		const separator = Array(col).fill("---").join(" | ");
	
		// Crear las filas de la tabla con texto de ejemplo
		const rows = Array(row).fill("").map((_, i) => 
			Array(col).fill("").map((_, j) => `Texto ${i * col + j + 1}`).join(" | ")
		).join("\n");
	
		// Construir la tabla completa
		return `| ${header} |\n| ${separator} |\n${rows}`;
	}

	let popoverRef: HTMLElement | null = null;

	onMount(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef && !popoverRef.contains(event.target as Node)) {
                openPopoverTable = false;
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 bg-white dark:bg-zinc-700 rounded-lg shadow-lg overflow-hidden">
    <div>
        <div class="border-b border-gray-200 dark:border-zinc-700 bg-black p-2 flex flex-wrap gap-1 h-14 dark:bg-zinc-800">
            {#each tools as tool}
                <button
                    on:click={tool.action}
                    class="p-2 hover:bg-zinc-700 rounded-lg transition-colors duration-200 text-gray-200 hover:text-gray-200 flex items-center justify-center min-w-[2.5rem] dark:hover:bg-zinc-600"
                    title={tool.title}
                >
                    <span class="text-sm font-medium dark:text-white">{tool.icon}</span>
                </button>
            {/each}

			<!-- <button
				class="bg-zinc-800 rounded-lg w-10 flex justify-center items-center dark:active:bg-zinc-700 active:scale-95 dark:hover:bg-neutral-700 dark:text-zinc-200"
				aria-label="bold"
				on:click={() => {}}
				title="Negrita"
			>
				<svg width="17px" height="17px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M2 1H8.625C11.0412 1 13 2.95875 13 5.375C13 6.08661 12.8301 6.75853 12.5287 7.35243C13.4313 8.15386 14 9.32301 14 10.625C14 13.0412 12.0412 15 9.625 15H2V1ZM5.5 9.75V11.5H9.625C10.1082 11.5 10.5 11.1082 10.5 10.625C10.5 10.1418 10.1082 9.75 9.625 9.75H5.5ZM5.5 6.25H8.625C9.10825 6.25 9.5 5.85825 9.5 5.375C9.5 4.89175 9.10825 4.5 8.625 4.5H5.5V6.25Z" fill="#ffffff" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #181a1b;"></path> </g></svg>
			</button> -->

			<button
				class="bg-zinc-800 rounded-lg w-10 flex justify-center items-center dark:active:bg-zinc-700 active:scale-95 dark:hover:bg-neutral-700 dark:text-zinc-200"
				on:click={(event) => {
					event.stopPropagation();
					openPopoverTable = !openPopoverTable;
				}}
				aria-label="Insert Table"
			>
				<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12L20 12M12 4L12 20M6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V7.2C21 6.0799 21 5.51984 20.782 5.09202C20.5903 4.71569 20.2843 4.40973 19.908 4.21799C19.4802 4 18.9201 4 17.8 4H6.2C5.0799 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.07989 3 7.2V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: #e8e6e3;"></path> </g></svg>
			</button>

			{#if openPopoverTable}
				<div
					bind:this={popoverRef}
					class="mt-11 -ml-5 bg-white shadow-lg dark:bg-zinc-600 fixed z-30 p-3 rounded-lg">
					<DymamicTable
						bind:clickedCell
						bind:open={openPopoverTable}
						createTable={() => insertText( generateMarkdownTable( clickedCell! ))}
					/>
				</div>
			{/if}

			<!-- <div class="flex gap-2">
				<div class="w-32 ">
					<Select
						shapeInput={{
							id		: 'sdfa',
							name	: 'heading',
							options : [
								{ label: 'Título 1', value: 'h1' },
								{ label: 'Título 2', value: 'h2' },
								{ label: 'Título 3', value: 'h3' },
								{ label: 'Título 4', value: 'h4' },
							],
						}} 
						onSelectedChange = {() => {}}
					/>
				</div>

				<ToggleGroup.Root
					bind:value={valueGroup}
					type={"single"}
					class="flex h-10 items-center bg-background-alt border dark:border-zinc-700 rounded-lg text-white"
				>
					<ToggleGroup.Item
						aria-label="toggle bold"
						value="h1"
						class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-500 dark:hover:rounded-lg active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-600 dark:active:rounded-lg data-[state=on]:bg-zinc-300 dark:data-[state=on]:bg-zinc-500 dark:data-[state=on]:rounded-lg data-[state=off]:text-foreground-alt data-[state=on]:text-foreground active:data-[state=off]:bg-zinc-200"
					>
						H1
					</ToggleGroup.Item>
					<ToggleGroup.Item
						aria-label="toggle italic"
						value="h2"
						class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-500 dark:hover:rounded-lg active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-600 dark:active:rounded-lg data-[state=on]:bg-zinc-300 dark:data-[state=on]:bg-zinc-500 dark:data-[state=on]:rounded-lg data-[state=off]:text-foreground-alt data-[state=on]:text-foreground active:data-[state=off]:bg-zinc-200"
					>
						H2
					</ToggleGroup.Item>
					<ToggleGroup.Item
						aria-label="toggle strikethrough"
						value="h3"
						class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-500 dark:hover:rounded-lg active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-600 dark:active:rounded-lg data-[state=on]:bg-zinc-300 dark:data-[state=on]:bg-zinc-500 dark:data-[state=on]:rounded-lg data-[state=off]:text-foreground-alt data-[state=on]:text-foreground active:data-[state=off]:bg-zinc-200"
					>
						H3
					</ToggleGroup.Item>
					<ToggleGroup.Item
						aria-label="toggle strikethrough"
						value="h4"
						class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-500 dark:hover:rounded-lg active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-600 dark:active:rounded-lg data-[state=on]:bg-zinc-300 dark:data-[state=on]:bg-zinc-500 dark:data-[state=on]:rounded-lg data-[state=off]:text-foreground-alt data-[state=on]:text-foreground active:data-[state=off]:bg-zinc-200"
					>
						H4
					</ToggleGroup.Item>
				</ToggleGroup.Root>

				<ToggleGroup.Root
					bind:value={valueGroup}
					type={"single"}
					class="flex h-10 items-center bg-background-alt border dark:border-zinc-700 rounded-lg text-white"
				>
					<ToggleGroup.Item
						aria-label="toggle bold"
						value="bold"
						class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-500 dark:hover:rounded-lg active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-600 dark:active:rounded-lg data-[state=on]:bg-zinc-300 dark:data-[state=on]:bg-zinc-500 dark:data-[state=on]:rounded-lg data-[state=off]:text-foreground-alt data-[state=on]:text-foreground active:data-[state=off]:bg-zinc-200"
					>
						B
					</ToggleGroup.Item>
					<ToggleGroup.Item
						aria-label="toggle italic"
						value="italic"
						class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-500 dark:hover:rounded-lg active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-600 dark:active:rounded-lg data-[state=on]:bg-zinc-300 dark:data-[state=on]:bg-zinc-500 dark:data-[state=on]:rounded-lg data-[state=off]:text-foreground-alt data-[state=on]:text-foreground active:data-[state=off]:bg-zinc-200"
					>
						I
					</ToggleGroup.Item>
					<ToggleGroup.Item
						aria-label="toggle strikethrough"
						value="strikethrough"
						class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-500 dark:hover:rounded-lg active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-600 dark:active:rounded-lg data-[state=on]:bg-zinc-300 dark:data-[state=on]:bg-zinc-500 dark:data-[state=on]:rounded-lg data-[state=off]:text-foreground-alt data-[state=on]:text-foreground active:data-[state=off]:bg-zinc-200"
					>
					T
					</ToggleGroup.Item>
				</ToggleGroup.Root>

				<ToggleGroup.Root
					bind:value={valueGroup}
					type={"single"}
					class="flex h-10 items-center bg-background-alt border dark:border-zinc-700 rounded-lg text-white"
				>
					<ToggleGroup.Item
						aria-label="toggle bold"
						value="img"
						class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-500 dark:hover:rounded-lg active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-600 dark:active:rounded-lg data-[state=on]:bg-zinc-300 dark:data-[state=on]:bg-zinc-500 dark:data-[state=on]:rounded-lg data-[state=off]:text-foreground-alt data-[state=on]:text-foreground active:data-[state=off]:bg-zinc-200"
					>
						📷
					</ToggleGroup.Item>
					<ToggleGroup.Item
						aria-label="toggle italic"
						value="img-url"
						class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-500 dark:hover:rounded-lg active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-600 dark:active:rounded-lg data-[state=on]:bg-zinc-300 dark:data-[state=on]:bg-zinc-500 dark:data-[state=on]:rounded-lg data-[state=off]:text-foreground-alt data-[state=on]:text-foreground active:data-[state=off]:bg-zinc-200"
					>
						📷
					</ToggleGroup.Item>

					<ToggleGroup.Item
						aria-label="toggle bold"
						value="video"
						class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-500 dark:hover:rounded-lg active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-600 dark:active:rounded-lg data-[state=on]:bg-zinc-300 dark:data-[state=on]:bg-zinc-500 dark:data-[state=on]:rounded-lg data-[state=off]:text-foreground-alt data-[state=on]:text-foreground active:data-[state=off]:bg-zinc-200"
					>
						📹
					</ToggleGroup.Item>
					<ToggleGroup.Item
						aria-label="toggle italic"
						value="video-url"
						class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-500 dark:hover:rounded-lg active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-600 dark:active:rounded-lg data-[state=on]:bg-zinc-300 dark:data-[state=on]:bg-zinc-500 dark:data-[state=on]:rounded-lg data-[state=off]:text-foreground-alt data-[state=on]:text-foreground active:data-[state=off]:bg-zinc-200"
					>
						📹
					</ToggleGroup.Item>
				</ToggleGroup.Root>

				<ToggleGroup.Root
					bind:value={valueGroup}
					type={"single"}
					class="flex h-10 items-center bg-background-alt border dark:border-zinc-700 rounded-lg text-white"
				>
					<ToggleGroup.Item
						aria-label="toggle bold"
						value="numeric"
						class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-500 dark:hover:rounded-lg active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-600 dark:active:rounded-lg data-[state=on]:bg-zinc-300 dark:data-[state=on]:bg-zinc-500 dark:data-[state=on]:rounded-lg data-[state=off]:text-foreground-alt data-[state=on]:text-foreground active:data-[state=off]:bg-zinc-200"
					>
						🔢
					</ToggleGroup.Item>
					<ToggleGroup.Item
						aria-label="toggle italic"
						value="vin"
						class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-500 dark:hover:rounded-lg active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-600 dark:active:rounded-lg data-[state=on]:bg-zinc-300 dark:data-[state=on]:bg-zinc-500 dark:data-[state=on]:rounded-lg data-[state=off]:text-foreground-alt data-[state=on]:text-foreground active:data-[state=off]:bg-zinc-200"
					>
						⚫
					</ToggleGroup.Item>
				</ToggleGroup.Root>


				<ToggleGroup.Root
					bind:value={valueGroup}
					type={"single"}
					class="flex h-10 items-center bg-background-alt border dark:border-zinc-700 rounded-lg text-white"
				>
					<ToggleGroup.Item
						aria-label="toggle bold"
						value="url"
						class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-500 dark:hover:rounded-lg active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-600 dark:active:rounded-lg data-[state=on]:bg-zinc-300 dark:data-[state=on]:bg-zinc-500 dark:data-[state=on]:rounded-lg data-[state=off]:text-foreground-alt data-[state=on]:text-foreground active:data-[state=off]:bg-zinc-200"
					>
						🔗
					</ToggleGroup.Item>
					<ToggleGroup.Item
						aria-label="toggle italic"
						value="code"
						class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-500 dark:hover:rounded-lg active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-600 dark:active:rounded-lg data-[state=on]:bg-zinc-300 dark:data-[state=on]:bg-zinc-500 dark:data-[state=on]:rounded-lg data-[state=off]:text-foreground-alt data-[state=on]:text-foreground active:data-[state=off]:bg-zinc-200"
					>
						👨🏻‍💻
					</ToggleGroup.Item>

					<ToggleGroup.Item
						aria-label="toggle bold"
						value="table"
						class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-500 dark:hover:rounded-lg active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-600 dark:active:rounded-lg data-[state=on]:bg-zinc-300 dark:data-[state=on]:bg-zinc-500 dark:data-[state=on]:rounded-lg data-[state=off]:text-foreground-alt data-[state=on]:text-foreground active:data-[state=off]:bg-zinc-200"
					>
						📅
					</ToggleGroup.Item>
					<ToggleGroup.Item
						aria-label="toggle italic"
						value="line"
						class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-500 dark:hover:rounded-lg active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-600 dark:active:rounded-lg data-[state=on]:bg-zinc-300 dark:data-[state=on]:bg-zinc-500 dark:data-[state=on]:rounded-lg data-[state=off]:text-foreground-alt data-[state=on]:text-foreground active:data-[state=off]:bg-zinc-200"
					>
						_
					</ToggleGroup.Item>
					<ToggleGroup.Item
						aria-label="toggle italic"
						value="formule"
						class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-500 dark:hover:rounded-lg active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-600 dark:active:rounded-lg data-[state=on]:bg-zinc-300 dark:data-[state=on]:bg-zinc-500 dark:data-[state=on]:rounded-lg data-[state=off]:text-foreground-alt data-[state=on]:text-foreground active:data-[state=off]:bg-zinc-200"
					>
						∑
					</ToggleGroup.Item>
				</ToggleGroup.Root>

				
				<Toolbar.Root
				class="flex h-10 min-w-max items-center justify-center rounded-10px border border-zinc-700 bg-background-alt px-[4px] py-1 rounded-lg"
				>
				<Toolbar.Group
				bind:value={text}
				type="multiple"
				class="flex items-center gap-x-0.5"
				>
				<Toolbar.GroupItem
					aria-label="toggle bold"
					value="bold"
					class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10"
				>
					B
				</Toolbar.GroupItem>
				<Toolbar.GroupItem
					aria-label="toggle italic"
					value="italic"
					class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10"
				>
					I
				</Toolbar.GroupItem>
				<Toolbar.GroupItem
					aria-label="toggle strikethrough"
					value="strikethrough"
					class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10"
				>
					S
				</Toolbar.GroupItem>
				</Toolbar.Group>

				<Separator.Root class="-my-1 mx-1 w-[1px] self-stretch bg-dark-10" />

				<Toolbar.Group
				bind:value={align}
				type="single"
				class="flex items-center gap-x-0.5"
				>
				<Toolbar.GroupItem
					aria-label="align left"
					value="left"
					class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10"
				>
					{"->"}
				</Toolbar.GroupItem>
				<Toolbar.GroupItem
					aria-label="align center"
					value="center"
					class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10"
				>
					-
				</Toolbar.GroupItem>
				<Toolbar.GroupItem
					aria-label="align right"
					value="right"
					class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10"
				>
					{"<-"}
				</Toolbar.GroupItem>
				</Toolbar.Group>

				<Separator.Root class="-my-1 mx-1 w-[1px] self-stretch bg-dark-10" />

				<div class="flex items-center">
				<Toolbar.Button
					class="bg-amber-700 inline-flex items-center justify-center rounded-9px px-3 py-2 text-sm font-medium text-foreground/80 transition-all hover:bg-muted active:scale-98 active:bg-dark-10"
				>
					<span> Ask AI </span>
				</Toolbar.Button>
				</div>
				</Toolbar.Root>
			</div> -->
        </div>

        <div class="p-4">
            <textarea
                bind:this={textarea}
                bind:value
                on:select={updateSelection}
                on:keyup={updateSelection}
                on:click={updateSelection}
                on:keydown={handleKeydown}
                {placeholder}
                rows=10
                class="w-full h-auto p-4 border-none focus:ring-0 resize-y bg-transparent dark:text-zinc-200"
            ></textarea>
        </div>
    </div>

	<div class="">
		<div class="h-14 font-semibold bg-black text-gray-200 dark:text-zinc-200 border-b dark:border-b-zinc-700 px-4 items-center flex dark:bg-zinc-800">
			Previsualización
		</div>
		<div class=" max-w-none p-4 break-word">
			{@html marked( value )}
		</div>
	</div>
</div>

<style>
	:global(.prose) {
		max-width: none;
	}
	:global(.prose img) {
		max-width: 100%;
		height: auto;
	}
</style>
