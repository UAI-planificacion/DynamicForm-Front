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
        },
        {
            icon: '∑',
            title: 'Fórmula',
			action: () => insertText('$', '$')
        }
	];
</script>


<div class="grid grid-cols-1 sm:grid-cols-2 bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
    <div>
        <div class="border-b border-gray-200 dark:border-zinc-700 bg-gray-50 p-2 flex flex-wrap gap-1 h-14 dark:bg-zinc-700 ">
            {#each tools as tool}
                <button
                    on:click={tool.action}
                    class="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200 text-gray-700 hover:text-gray-900 flex items-center justify-center min-w-[2.5rem] dark:hover:bg-zinc-600"
                    title={tool.title}
                >
                    <span class="text-sm font-medium dark:text-white">{tool.icon}</span>
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
                class="w-full h-auto p-4 border-none focus:ring-0 resize-y  dark:bg-zinc-800 dark:text-zinc-200"
            ></textarea>
        </div>
    </div>

	<div class="">
		<div class="h-14 font-semibold text-gray-700 dark:text-zinc-200 border-b dark:border-b-zinc-700 px-4 items-center flex dark:bg-zinc-700">
			Previsualización
		</div>
		<div class="prose mx-2 max-w-none mt-2 p-4 bg-white dark:bg-zinc-800 dark:text-white dark:[h]-text-zinc-800 break-words border dark:border-zinc-800 rounded-lg">
			{@html marked( value )}
		</div>
	</div>
</div>


<script context="module">
	import { marked, type Tokens } from 'marked';
	import katex from "katex";
	import "katex/dist/katex.min.css";

	import Prism from 'prismjs';
	import 'prismjs/themes/prism.css';

	marked.setOptions({
		breaks	: true,
		gfm		: true
	});


	function sizeHeading( size: number ): string {
		return {
			1: 'text-4xl',
			2: 'text-2xl',
			3: 'text-xl',
			4: 'text-md',
		}[size] || 'text-normal'
	}


	const renderMath = (text: string): string => {
		// Detecta y renderiza fórmulas matemáticas en formato de bloque: $$ ... $$
		text = text.replace(/\$\$(.+?)\$\$/gs, (_, formula) =>
			`<div">${katex.renderToString(formula, { displayMode: true })}</div>`
		);

		// Detecta y renderiza fórmulas matemáticas en formato en línea: $ ... $
		text = text.replace(/\$(.+?)\$/g, (_, formula) =>
			`<span>${katex.renderToString(formula, { displayMode: false })}</span>`
		);

		// Detecta y renderiza texto en negrita: **texto**
		text = text.replace(/\*\*([^\*]+)\*\*/g, (_, boldText) =>
			`<strong class="font-bold text-zinc-900 dark:text-zinc-300">${boldText}</strong>`
		);

		// Detecta y renderiza texto en cursiva: *texto*
		text = text.replace(/\*([^\*]+)\*/g, (_, italicText) =>
			`<em class="italic text-zinc-700 dark:text-zinc-400">${italicText}</em>`
		);

		// Detecta y renderiza texto tachado: ~~texto~~
		text = text.replace(/~~([^\~]+)~~/g, (_, strikethroughText) =>
			`<del class="line-through text-zinc-500 dark:text-zinc-400">${strikethroughText}</del>`
		);

		// Imágenes
		text = text.replace(/!\[([^\]]*)\]\((https?:\/\/[^\s]+)\)/g, (_, altText, imageUrl) =>
			`<img src="${imageUrl}" alt="${altText}" class="max-w-full h-auto" />`
		);

		// Detecta y renderiza vídeos (detecta YouTube, Vimeo, etc.)
		text = text.replace(/!\[([^\]]*)\]\((https?:\/\/(?:www\.)?(?:youtube|vimeo)\.com\/(?:[^ ]+))\)/g, (_, altText, videoUrl) =>
			`<div class="relative pb-9/16 mb-4">
				<iframe src="${videoUrl}" class="absolute inset-0 w-full h-full rounded-lg shadow-md" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			</div>`
		);

		// Detecta y renderiza enlaces [texto](url)
		text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, linkText, linkUrl) =>
			`<a href="${linkUrl}" class="text-blue-500 hover:underline" target="_blank">${linkText}</a>`
		);
		return text;
	};

	marked.use({
		renderer: {
			paragraph({ tokens }: Tokens.Paragraph): string {
				const text = tokens.map((token) => token.raw).join("");
				const renderedText = renderMath(text);
				return `<p class="mb-4 leading-relaxed text-zinc-800 dark:text-zinc-300">${renderedText}</p>`;
			},

			heading: (token) => {
				return `<h${token.depth} class="${sizeHeading( token.depth )} font-bold text-sky-500">${token.text}</h${token.depth}>`;
			},

			strong: ( token ) => {
				return `<strong class="dark:text-zinc-100">${token.text}</strong>`;
			},

			code: ( token ) => {
				const highlightedCode = Prism.highlight(token.text, Prism.languages.javascript, 'javascript');
				return `<pre class="overflow-x-auto bg-zinc-100 dark:bg-zinc-700 p-4 rounded-lg shadow-md"><code class="text-sm text-zinc-800 dark:text-sky-300">${highlightedCode}</code></pre>`;
			},

			hr: (token) => {
				return `<hr class="my-5 border-zinc-400 dark:border-zinc-600" />`;
			},

			table: ( token: Tokens.Table ): string => {
				const headerHtml = token.header
					.map(
						(headerCell) =>
							`<th class="px-4 py-2 dark:bg-zinc-700 text-sky-500">${headerCell.text}</th>`
					)
					.join("");

				const bodyHtml = token.rows
					.map(
						(row) =>
							`<tr>${row
								.map(
									(cell) =>
										`<td class="px-4 py-2 border-t border-zinc-300 dark:border-zinc-700">${cell.text}</td>`
								)
								.join("")}</tr>`
					)
					.join("");

				return `
					<table class="table-auto border-collapse border border-zinc-300 dark:border-zinc-700 w-full text-left">
						<thead class="bg-zinc-100">
							<tr>${headerHtml}</tr>
						</thead>
						<tbody>
							${bodyHtml}
						</tbody>
					</table>
				`;
			},
		}
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
