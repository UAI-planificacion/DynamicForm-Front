<script lang="ts">
	import { Separator, DropdownMenu } from "bits-ui";

	import {
		BoldMarkIcon,
		CodeMarkIcon,
		ItalicMarkIcon,
		TableMarkIcon,
		StrikethroughMarkIcon,
		LinkMarkIcon,
		ImageMarkIcon,
		NoteMarkIcon,
		NumberListMarkIcon,
		ListMarkIcon,
		CheckListMarkIcon,
		FormulaMarkIcon,
		Heading1MarkIcon,
		Heading2MarkIcon,
		Heading3MarkIcon,
		Heading4MarkIcon,
		HeadingMarkIcon
	} 								        from "$icons/markdown";
	import { DynamicTable, Info } 		    from "$components";
	import type { InputStyle, ShapeInput } 	from "$models";
	import marked 						    from './marked.config';
    import { styles } from "$lib";

	export let shapeInput	: ShapeInput;
	export let value 		: string | undefined = '';
    export let onInput		: ( value: string ) => void;
    export let setError     : VoidFunction = () => {};
    export let dynamicMode  : boolean = false;

	// Textarea
	let textarea: HTMLTextAreaElement;
	let selectionStart 		= 0;
	let selectionEnd 		= 0;
	// Menus
	let mobileMenuOpen 		= false;
	let desktopTableOpen 	= false;


	function adjustTextareaHeight() {
		if ( !textarea ) return;

		textarea.style.height = 'auto';
		textarea.style.height = textarea.scrollHeight + 'px';
	}

	$: if ( value !== undefined ) {
		setTimeout( adjustTextareaHeight, 0 );
	}


	function updateSelection(): void {
		if ( !textarea ) return;
		selectionStart 	= textarea.selectionStart;
		selectionEnd 	= textarea.selectionEnd;
	}


	function insertText( before: string, after: string = '', selectedText: string | null = null ): void {
		if ( textarea && value !== undefined ) {
			const newStart 		= selectionStart + before.length;
			const textToInsert 	= selectedText !== null ? selectedText : value?.substring( selectionStart, selectionEnd );

			value = value?.substring( 0, selectionStart ) + before + textToInsert + after + value?.substring( selectionEnd );

			setTimeout(() => {
				textarea?.focus();

				if ( textarea ) {
					textarea.setSelectionRange( newStart, newStart + textToInsert.length );
				}
			}, 0 );
		}
	}


	function handleKeydown( event: KeyboardEvent ): void {
		if ( event.key !== 'Enter' ) return;

		const currentLine 	= getCurrentLine();
		const checkboxMatch = currentLine.match(/^(\s*)(- \[(x| )\]\s+)(.*)/);
		const listMatch 	= currentLine.match(/^(\s*)((\d+\.|-)\s+)(.*)/);

		if ( checkboxMatch ) {
			event.preventDefault();
			const [, indent, marker, , content] = checkboxMatch;

			if ( !content.trim() ) {
                if ( !value ) return;
				const lineStart = value!.lastIndexOf( '\n', selectionStart - 1 ) + 1;
				value = value?.substring( 0, lineStart ) + value?.substring( selectionStart );

				return;
			}

			insertText( '\n' + indent + marker );
			return;
		}

		if ( listMatch ) {
			event.preventDefault();
			const [, indent, marker, , content] = listMatch;

			if ( !content.trim() ) {
                if ( !value ) return;
				const lineStart = value!.lastIndexOf( '\n', selectionStart - 1 ) + 1;
				value = value?.substring( 0, lineStart ) + value?.substring( selectionStart );
				return;
			}

			const isNumbered = marker.includes('.');
			let nextMarker = marker;

			if ( isNumbered ) {
				const num = parseInt( marker );
				nextMarker = `${num + 1}. `;
			}

			insertText( '\n' + indent + nextMarker );
			return;
		}
	}


	function getCurrentLine(): string {
		if ( !value ) return '';
		const lineStart = value.lastIndexOf( '\n', selectionStart - 1 ) + 1;
		const lineEnd 	= value.indexOf( '\n', selectionStart );
		return value.substring( lineStart, lineEnd === -1 ? value.length : lineEnd );
	}


	const headingTools = [
		{
			icon: Heading1MarkIcon,
			title: 'Título 1',
			action: () => insertText('# ', '', 'Título 1'),
		},
		{
			icon: Heading2MarkIcon,
			title: 'Título 2',
			action: () => insertText('## ', '', 'Título 2')
		},
		{
			icon: Heading3MarkIcon,
			title: 'Título 3',
			action: () => insertText('### ', '', 'Título 3')
		},
		{
			icon: Heading4MarkIcon,
			title: 'Título 4',
			action: () => insertText('#### ', '', 'Título 4')
		},
	];

	const tools = [
		{
			icon: BoldMarkIcon,
			title: 'Negrita',
			action: () => insertText('**', '**', 'Negrita')
		},
		{
			icon: ItalicMarkIcon,
			title: 'Cursiva',
			action: () => insertText('*', '*', 'Cursiva')
		},
		{
			icon: StrikethroughMarkIcon,
			title: 'Subrayado',
			action: () => insertText('~~', '~~', 'Subrayado')
		},
		{
			icon: LinkMarkIcon,
			title: 'Enlace',
			action: () => insertText('[', '](url)', 'Enlace')
		},
		{
			icon: ImageMarkIcon,
			title: 'Imagen',
			action: () => insertText('![alt text](', ')', 'Imagen')
		},
		{
			icon: NoteMarkIcon,
			title: 'Nota',
			action: () => insertText('> ','', 'Nota')
		},
		{
			icon: NumberListMarkIcon,
			title: 'Lista numerada',
			action: () => insertText('1. ', '\n')
		},
		{
			icon: ListMarkIcon,
			title: 'Lista con viñetas',
			action: () => insertText('- ', '\n')
		},
		{
			icon: CheckListMarkIcon,
			title: 'Lista con checkbox',
			action: () => insertText('- [x] ', '\n')
		},
		{
			icon	: CodeMarkIcon,
			title	: 'Código',
			action	: () => insertText('```\n', '\n```')
		},
        {
            icon: FormulaMarkIcon,
            title: 'Fórmula',
			action: () => insertText('$', '$')
        }
	];


	const updateGridClass = () =>
		shapeInput.preview
			? dynamicMode
				? '@xl:grid-cols-2'
				: 'sm:grid-cols-2'
			: 'grid-cols-1';


	const updateGridButtonsDesktop = () =>
		shapeInput.preview
			? dynamicMode
				? 'hidden @6xl:px-0 @6xl:flex @6xl:gap-0 @7xl:px-2 @7xl:gap-1'
				: 'hidden xl:flex md:gap-1 2xl:gap-1.5 p-2'
			: dynamicMode
				? 'hidden @xl:flex @xl:gap-0.5 @xl:ml-0.5 @2xl:ml-2 @2xl:gap-1'
				: 'hidden xl:hidden ml-2';


	const updateGridButtonsMobile = () =>
		shapeInput.preview
			? dynamicMode
				? 'flex @6xl:hidden ml-2'
				: 'flex xl:hidden ml-2'
			: dynamicMode
				? 'flex @xl:hidden ml-2'
				: 'flex xl:hidden ml-2';
</script>


<Info { shapeInput } { onInput } { value }>
<div class="grid {updateGridClass()} bg-white dark:bg-zinc-700 rounded-lg shadow-lg overflow-hidden">
    <div class="relative">
        <div class={ shapeInput.boxMarkdownClass ?? (styles.markdown as InputStyle).box }>

            <!-- Desktop view -->
            <div class="hidden flex-wrap {updateGridButtonsDesktop()}">
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger
                        class="hover:bg-zinc-700 rounded-lg h-10 w-10 flex justify-center items-center dark:active:bg-zinc-700 active:scale-95 dark:hover:bg-zinc-600"
                    >
                        <HeadingMarkIcon />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content
                        class="w-12 rounded-lg bg-black dark:bg-zinc-600 px-1 py-1.5 shadow-popover"
                        sideOffset={8}
                        trapFocus={true}
                        onCloseAutoFocus={(e) => {
                            e.preventDefault();
                            setTimeout(() => {
                                if (textarea) textarea.focus();
                            }, 50);
                        }}
                    >
                        {#each headingTools as tool}
                            <DropdownMenu.Item
                                class="flex h-10 hover:rounded-lg select-none items-center rounded-button py-3 pl-3 pr-1.5 text-sm font-medium text-gray-200 !ring-0 !ring-transparent data-[highlighted]:bg-zinc-700"
                                onSelect={() => {
                                    tool.action();
                                    setTimeout(() => {
                                        textarea?.focus();
                                    }, 50);
                                }}
                            >
                                <div class="flex items-center gap-2">
                                    <tool.icon />
                                </div>
                            </DropdownMenu.Item>
                        {/each}
                    </DropdownMenu.Content>
                </DropdownMenu.Root>

                {#each tools as tool}
                    <button
                        on:click={tool.action}
                        class="p-2 hover:bg-zinc-700 rounded-lg transition-colors duration-200 text-gray-200 hover:text-gray-200 flex items-center justify-center min-w-[2.5rem] dark:hover:bg-zinc-600 dark:active:bg-zinc-700 active:scale-95"
                        title={tool.title}
                    >
                        <span class="text-sm font-medium dark:text-white">
                            <tool.icon />
                        </span>
                    </button>
                {/each}

                <DropdownMenu.Root 
                    bind:open           = { desktopTableOpen }
                >
                    <DropdownMenu.Trigger
                        class="hover:bg-zinc-700 rounded-lg h-10 w-10 flex justify-center items-center dark:active:bg-zinc-700 active:scale-95 dark:hover:bg-zinc-700 dark:text-zinc-200"
                    >
                        <TableMarkIcon />
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Content
                        class       = "rounded-lg bg-black dark:bg-zinc-600 p-2 shadow-lg"
                        sideOffset  = { 8 }
                        trapFocus   = { true }
                        onCloseAutoFocus={(e) => {
                            e.preventDefault();
                            setTimeout(() => {
                                if (textarea) textarea.focus();
                            }, 50);
                        }}
                    >
                        <DynamicTable
                            onTableGenerated={( table ) => {
                                insertText( table );
                                desktopTableOpen = false;
                                setTimeout(() => {
                                    if (textarea) textarea.focus();
                                }, 50);
                            }}
                        />
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </div>

            <!-- Mobile menu -->
            <DropdownMenu.Root 
                bind:open={mobileMenuOpen}
            >
                <DropdownMenu.Trigger
                    class="{updateGridButtonsMobile()} hover:bg-zinc-700 rounded-lg h-10 w-10 flex justify-center items-center dark:active:bg-zinc-700 active:scale-95 dark:hover:bg-zinc-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content
                    class="w-full max-w-[229px] rounded-lg bg-black dark:bg-zinc-600 px-1 py-1.5 shadow-popover"
                    sideOffset={8}
                    trapFocus   = { true }
                    onCloseAutoFocus={(e) => {
                        e.preventDefault();
                        setTimeout(() => {
                            if (textarea) textarea.focus();
                        }, 50);
                    }}
                >
                    <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger
                            class="flex h-10 select-none items-center rounded-lg py-3 pl-3 pr-1.5 text-sm font-medium text-gray-200 !ring-0 !ring-transparent data-[highlighted]:bg-zinc-700 data-[state=open]:bg-zinc-700"
                        >
                            <div class="flex items-center gap-2">
                                <HeadingMarkIcon />
                                <span>Títulos</span>
                            </div>
                            <div class="ml-auto flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </DropdownMenu.SubTrigger>

                        <DropdownMenu.SubContent
                            class=" rounded-lg w-28 bg-black dark:bg-zinc-600 px-1 py-1.5 shadow-lg"
                            sideOffset={10}
                        >
                            {#each headingTools as tool}
                                <DropdownMenu.Item
                                    class="flex h-10 select-none items-center rounded-lg py-3 pl-3 pr-1.5 text-sm font-medium text-gray-200 !ring-0 !ring-transparent data-[highlighted]:bg-zinc-700"
                                    onclick={tool.action}
                                >
                                    <div class="flex items-center gap-2">
                                        <tool.icon />
                                        <span>{tool.title}</span>
                                    </div>
                                </DropdownMenu.Item>
                            {/each}
                        </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>

                    {#each tools as tool}
                        <DropdownMenu.Item
                            class="flex h-10 select-none items-center rounded-lg py-3 pl-3 pr-1.5 text-sm font-medium text-gray-200 !ring-0 !ring-transparent data-[highlighted]:bg-zinc-700"
                            onclick={tool.action}
                        >
                            <div class="flex items-center gap-2">
                                <tool.icon />
                                <span>{tool.title}</span>
                            </div>
                        </DropdownMenu.Item>
                    {/each}

                    <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger
                            class="flex h-10 select-none items-center rounded-lg py-3 pl-3 pr-1.5 text-sm font-medium text-gray-200 !ring-0 !ring-transparent data-[highlighted]:bg-zinc-700 data-[state=open]:bg-zinc-700"
                        >
                            <div class="flex items-center gap-2">
                                <TableMarkIcon />
                                <span>Insertar Tabla</span>
                            </div>
                            <div class="ml-auto flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </DropdownMenu.SubTrigger>
                        <DropdownMenu.SubContent
                            class="rounded-lg bg-black dark:bg-zinc-600 p-2 shadow-lg"
                            sideOffset={10}
                        >
                            <DynamicTable
                                onTableGenerated={( table ) => {
                                    insertText( table );
                                    mobileMenuOpen = false;
                                }}
                            />
                        </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                </DropdownMenu.Content>
            </DropdownMenu.Root>

            <h3 class="text-zinc-200 font-medium {updateGridButtonsMobile()}">Editor</h3>
        </div>

        <textarea
            name        = { shapeInput.name }
            id          = { shapeInput.id }
            bind:value={ value }
            bind:this={ textarea }
            required 	= { shapeInput.required }
            minlength   = { shapeInput.minLength }
            maxlength   = { shapeInput.maxLength }
            rows        = { value?.split('\n').length || 3 }
            on:select	= { updateSelection }
            on:keyup	= { updateSelection }
            on:click	= { updateSelection }
            on:keydown	= { handleKeydown }
            on:input    = { ( value: Event ) => {onInput( ( value.target as HTMLTextAreaElement ).value ); setError() }}
            readonly 	= { shapeInput.readonly }
            disabled 	= { shapeInput.disabled }
            class		= { shapeInput.inputMarkdownClass ?? ( styles.markdown as InputStyle ).input }
            placeholder = { shapeInput.placeholder }
        ></textarea>

        {#if shapeInput.preview }
            <div class="absolute right-0 top-14 h-[calc(100%-3.5rem)] sm:block hidden">
                <Separator.Root
                    orientation="vertical"
                    class="h-full w-[1px] bg-gray-200 dark:bg-zinc-600"
                />
            </div>
        {/if}
    </div>

    {#if shapeInput.preview}
        <div>
            <div class="h-14 font-semibold bg-black text-gray-200 dark:text-zinc-200 border-b dark:border-b-zinc-700 px-4 items-center flex dark:bg-zinc-800">
                Previsualización
            </div>
            <div class="p-4">
                {@html marked( value ?? '' )}
            </div>
        </div>
    {/if}
</div>
</Info>

<style>
	:global(.prose) {
		max-width: none;
	}
	:global(.prose img) {
		max-width: 100%;
		height: auto;
	}
</style>
