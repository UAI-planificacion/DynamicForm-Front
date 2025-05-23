<script lang="ts">
	import { Separator } from "bits-ui";

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
		HeadingMarkIcon,
	} 								        from "$icons/markdown";
    import {
        DynamicTable,
        Info,
        DropdownMenu,
        ButtonNavigator
    }                                       from "$components";
	import type { ShapeInput, ThemeShape }  from "$models";
	import marked 						    from './marked.config';
    import { UAITheme }                     from "$lib";
    import { COLOR }                        from "$lib/styles/themes/default/color";
    import { theme }                        from "$stores";
    import { BACKGROUND }                   from "$lib/styles/themes/default/background";
    import { BACKGROUND_RING }              from "$lib/styles/themes/default/background-ring";
    import { secondaryColor }               from "$lib/styles/themes/default/secondary-color";

	export let shapeInput	: ShapeInput;
	export let value 		: string | undefined = '';
    export let onInput		: ( value: string ) => void;
    export let setError     : VoidFunction = () => {};
    export let dynamicMode  : boolean = false;
    export let themeShape   : ThemeShape = UAITheme();


    let isDarkMode = $theme === 'dark';


    $: if ( $theme === 'dark' ) {
        isDarkMode = true;
    } else {
        isDarkMode = false;
    }

	// Textarea
	let textarea: HTMLTextAreaElement;
	let selectionStart 		= 0;
	let selectionEnd 		= 0;
	// Menus
	let mobileMenuOpen 		= false;
	let desktopTableOpen 	= false;
	let desktopHeadingOpen  = false;
	let mobileHeadingOpen   = false;
	let mobileTableOpen     = false;

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
				: 'hidden xl:flex ml-2';

	const updateGridButtonsMobile = () =>
		shapeInput.preview
			? dynamicMode
				? 'flex @6xl:hidden ml-2'
				: 'flex xl:hidden ml-2'
			: dynamicMode
				? 'flex @xl:hidden ml-2'
				: 'flex xl:hidden ml-2';

    function focusTextarea() {
        setTimeout(() => {
            if (textarea) textarea.focus();
        }, 50);
    }
</script>

<Info { shapeInput } { onInput } { value } { themeShape }>
<div
    class   = "grid { updateGridClass() } rounded-md shadow-xl overflow-hidden"
    style   = {`
        ${BACKGROUND( isDarkMode, themeShape )}
        ${COLOR( isDarkMode, themeShape )}
    `}
>
    <div class="relative">
        <div
            class   = "flex items-center h-14"
            style = { secondaryColor(isDarkMode, themeShape )}
        >
            <!-- Desktop view -->
            <div class="hidden flex-wrap { updateGridButtonsDesktop() }">
                <!-- Menú de títulos personalizado -->
                <DropdownMenu 
                    bind:open       = { desktopHeadingOpen }
                    position        = "bottom"
                    offset          = { 8 }
                    contentClass    = "w-12 px-1 py-1.5"
                    on:close        = { focusTextarea }
                    {themeShape}
                    {isDarkMode}
                >
                    <svelte:fragment slot="trigger">
                        <ButtonNavigator
                            { themeShape }
                            className = "justify-center size-10 active:scale-[0.97]"
                            onClick={() => {}}
                        >
                            <HeadingMarkIcon />
                        </ButtonNavigator>
                    </svelte:fragment>

                    <svelte:fragment slot="content">
                        {#each headingTools as tool}
                            <ButtonNavigator
                                { themeShape }
                                className = "justify-center size-10 active:scale-[0.97]"
                                onClick={() => {
                                    tool.action();
                                    desktopHeadingOpen = false;
                                    focusTextarea();
                                }}
                            >
                                <div class="flex items-center">
                                    <tool.icon />
                                </div>
                            </ButtonNavigator>
                        {/each}
                    </svelte:fragment>
                </DropdownMenu>

                {#each tools as tool}
                    <ButtonNavigator
                        { themeShape }
                        className = "p-2 justify-center size-10 active:scale-[0.97]"
                        onClick={ tool.action }
                    >
                        <span class=" font-medium">
                            <tool.icon />
                        </span>
                    </ButtonNavigator>
                {/each}
                <!-- Menú de tabla personalizado -->
                <DropdownMenu 
                    bind:open       = { desktopTableOpen }
                    position        = "bottom"
                    offset          = { 8 }
                    contentClass    = "rounded-lg bg-black dark:bg-zinc-600 p-2 shadow-lg"
                    on:close        = { focusTextarea }
                    {themeShape}
                    {isDarkMode}
                >
                    <svelte:fragment slot="trigger">
                        <ButtonNavigator
                            { themeShape }
                            className = " justify-center size-10 active:scale-[0.97]"
                            onClick={ () => {} }
                        >
                            <TableMarkIcon />
                        </ButtonNavigator>
                    </svelte:fragment>

                    <svelte:fragment slot="content">
                        <DynamicTable
                            { themeShape }
                            { isDarkMode }
                            onTableGenerated={( table ) => {
                                insertText( table );
                                desktopTableOpen = false;
                                focusTextarea();
                            }}
                        />
                    </svelte:fragment>
                </DropdownMenu>
            </div>
            <!-- Mobile menu personalizado -->
            <DropdownMenu 
                bind:open       = { mobileMenuOpen }
                position        = "bottom"
                offset          = { 8 }
                contentClass    = "w-full max-w-[229px] rounded-lg bg-black dark:bg-zinc-600 px-1 py-1.5 shadow-popover"
                on:close        = { focusTextarea }
                {themeShape}
                {isDarkMode}
            >
                <svelte:fragment slot="trigger">
                    <ButtonNavigator
                        { themeShape }
                        className = {`${updateGridButtonsMobile()} justify-center size-10 active:scale-[0.97]`}
                        onClick={ () => {} }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </ButtonNavigator>
                </svelte:fragment>

                <svelte:fragment slot="content">
                    <!-- Submenú de títulos -->
                    <DropdownMenu 
                        bind:open       = { mobileHeadingOpen }
                        position        = "right"
                        offset          = { 10 }
                        contentClass    = "w-32 px-1 py-1.5"
                        on:close        = { () => {} }
                        {themeShape}
                        {isDarkMode}
                    >
                        <svelte:fragment slot="trigger">
                            <ButtonNavigator
                                { themeShape }
                                className = "justify-center w-full h-10 active:scale-[0.97] py-3 pl-3 pr-1.5 font-medium "
                                onClick={ () => {} }
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
                            </ButtonNavigator>
                        </svelte:fragment>

                        <svelte:fragment slot="content">
                            {#each headingTools as tool}
                                <ButtonNavigator
                                    { themeShape }
                                    className = "justify-center w-full h-10 active:scale-[0.97] py-3 pl-3 pr-1.5 font-medium "
                                    onClick={ () => {
                                        tool.action();
                                        mobileHeadingOpen   = false;
                                        mobileMenuOpen      = false;
                                        focusTextarea();
                                    }}
                                >
                                    <div class="flex items-center gap-2">
                                        <tool.icon />
                                        <span>{tool.title}</span>
                                    </div>
                                </ButtonNavigator>
                            {/each}
                        </svelte:fragment>
                    </DropdownMenu>

                    <!-- Herramientas normales -->
                    {#each tools as tool}
                        <ButtonNavigator
                            { themeShape }
                            className = "w-full h-10 active:scale-[0.97] py-3 pl-3 pr-1.5 font-medium "
                            onClick={ () => {
                                tool.action();
                                mobileMenuOpen = false;
                                focusTextarea();
                            }}
                        >
                            <div class="flex items-center gap-2">
                                <tool.icon />
                                <span>{tool.title}</span>
                            </div>
                        </ButtonNavigator>
                    {/each}
                    <!-- Submenú de tabla -->
                    <DropdownMenu 
                        bind:open       = { mobileTableOpen }
                        position        = "right"
                        offset          = { 10 }
                        contentClass    = "rounded-lg bg-black dark:bg-zinc-600 p-2 shadow-lg"
                        on:close        = { () => {} }
                        { themeShape }
                        { isDarkMode }
                    >
                        <svelte:fragment slot="trigger">
                            <ButtonNavigator
                                { themeShape }
                                className = "w-full h-10 active:scale-[0.97] py-3 pl-3 pr-1.5 font-medium "
                                onClick={ () => {}}
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
                            </ButtonNavigator>
                        </svelte:fragment>

                        <svelte:fragment slot="content">
                            <DynamicTable
                                { themeShape }
                                { isDarkMode }
                                onTableGenerated={( table ) => {
                                    insertText( table );
                                    mobileTableOpen = false;
                                    mobileMenuOpen = false;
                                    focusTextarea();
                                }}
                            />
                        </svelte:fragment>
                    </DropdownMenu>
                </svelte:fragment>
            </DropdownMenu>

            <h3
                class="font-medium {updateGridButtonsMobile()}"
                style={ secondaryColor(isDarkMode, themeShape )}
            >
                Editor
            </h3>
        </div>

        <textarea bind:value={ value }
            name        = { shapeInput.name }
            id          = { shapeInput.id }
            bind:this   = { textarea }
            required 	= { shapeInput.required }
            minlength   = { shapeInput.minLength }
            maxlength   = { shapeInput.maxLength }
            rows        = { value?.split('\n').length || 3 }
            on:select	= { updateSelection }
            on:keyup	= { updateSelection }
            on:click	= { updateSelection }
            on:keydown	= { handleKeydown }
            on:input    = {( value: Event ) => {onInput( ( value.target as HTMLTextAreaElement ).value ); setError() }}
            readonly 	= { shapeInput.readonly }
            disabled 	= { shapeInput.disabled }
            placeholder = { shapeInput.placeholder }
            style       = { COLOR(isDarkMode, themeShape )}
            class		= {`
                w-full
                min-h-64
                border-none
                focus:ring-0
                bg-transparent
                ring-0
                px-4
                py-2
                resize-none
                overflow-hidden
                ${ themeShape.fontSize }
            `}
        ></textarea>

        {#if shapeInput.preview }
            <div class="absolute right-0 top-14 h-[calc(100%-3.5rem)] sm:block hidden">
                <Separator.Root
                    orientation = "vertical"
                    class       = "h-full w-[1px]"
                    style       = { BACKGROUND_RING(isDarkMode, themeShape )}
                />
            </div>
        {/if}
    </div>

    {#if shapeInput.preview}
        <div>
            <div
                class = "h-14 font-semibold px-4 items-center flex "
                style = { secondaryColor(isDarkMode, themeShape )}
            >
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
