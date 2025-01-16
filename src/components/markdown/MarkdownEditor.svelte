<script lang="ts">
	export let value: string;

	let placeholder		: string = 'Escribe tu contenido aquí...';
	let textarea		: HTMLTextAreaElement | null = null;
	let selectionStart	: number = 0;
	let selectionEnd	: number = 0;


	function updateSelection(): void {
		if ( textarea ) {
			selectionStart 	= textarea.selectionStart;
			selectionEnd 	= textarea.selectionEnd;
		}
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
		if ( event.key === 'Enter' ) {
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
			icon: '📹',
			title: 'Video',
			action: () => insertText('[![Video](thumbnail_url)](', ')')
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
			icon: '</>',
			title: 'Código',
			action: () => insertText('```\n', '\n```')
		},
		{
			icon: '📅',
			title: 'Tabla',
			action: () => insertText('| Columna 1 | Columna 2 |\n|-----------|------------|\n| Celda 1   | Celda 2    |\n')
		},
        {
            icon: '_',
            title: 'Línea',
			action: () => insertText('___\n')
        }
	];
</script>

<div class="grid grid-cols-2 gap-2 bg-white rounded-lg shadow-lg overflow-hidden">
    <div>
        <div class="border-b border-gray-200 bg-gray-50 p-2 flex flex-wrap gap-1">
            {#each tools as tool}
                <button
                    on:click={tool.action}
                    class="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200 text-gray-700 hover:text-gray-900 flex items-center justify-center min-w-[2.5rem]"
                    title={tool.title}
                >
                    <span class="text-sm font-medium">{tool.icon}</span>
                </button>
            {/each}
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
                class="w-full h-auto p-4 border-none focus:ring-0 resize-y"
            ></textarea>
        </div>
    </div>

	<div class="bg-gray-50 p-4">
		<div class="text-sm text-gray-500">
			Previsualización:
		</div>
		<div class="prose max-w-none mt-2 p-4 bg-white rounded border">
			{@html marked(value)}
		</div>
	</div>
</div>

<script context="module">
	import { marked } from 'marked';
	marked.setOptions({
		breaks: true,
		gfm: true
	});
</script>

<style>
	:global(.prose) {
		max-width: none;
	}
	:global(.prose img) {
		max-width: 100%;
		height: auto;
	}
</style>
