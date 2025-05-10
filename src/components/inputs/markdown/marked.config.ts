import { marked, type Tokens }  from 'marked';
import katex                    from "katex";
import Prism                    from 'prismjs';

import "katex/dist/katex.min.css";
import 'prismjs/themes/prism.css';


marked.setOptions({
    breaks	: true,
    gfm		: true
});


const sizeHeading = ( size: number ): string => ({
    1: 'text-4xl mb-7',
    2: 'text-2xl mb-5',
    3: 'text-xl mb-4',
    4: 'text-md mb-2',
}[size] || 'text-normal' );


const renderMath = (text: string): string => {
    // $$ Renderiza Fórmulas de múltiples líneas $$
    text = text.replace(/\$\$(.+?)\$\$/gs, (_, formula) =>
        `<div class="dark:text-zinc-200">${katex.renderToString(formula, { displayMode: true })}</div>`
    );

    // $ Renderiza Fórmulas de una línea $
    text = text.replace(/\$(.+?)\$/g, (_, formula) =>
        `<span>${katex.renderToString(formula, { displayMode: false })}</span>`
    );

    // ** Renderiza negritas **
    text = text.replace(/\*\*([^*]+)\*\*/g, (_, boldText) =>
        `<strong class="font-bold text-zinc-900 dark:text-zinc-300">${boldText}</strong>`
    );

    // * Renderiza itálicas *
    text = text.replace(/\*([^*]+)\*/g, (_, italicText) =>
        `<em class="italic text-zinc-700 dark:text-zinc-400">${italicText}</em>`
    );

    // ~~ Renderiza tachado ~~
    text = text.replace(/~~([^~]+)~~/g, (_, strikethroughText) =>
        `<del class="line-through text-zinc-500 dark:text-zinc-400">${strikethroughText}</del>`
    );

    // ![Renderiza imágener](url)
    text = text.replace(/!\[([^\]]*)\]\((https?:\/\/[^\s]+)\)/g, (_, altText, imageUrl) =>
        `<img src="${imageUrl}" alt="${altText}" class="max-w-full h-auto" />`
    );

    // [Renderiza links](url)
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, linkText, linkUrl) =>
        `<a href="${linkUrl}" class="text-blue-500 underline hover:no-underline" target="_blank">${linkText}</a>`
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
            return `<h${token.depth} class="${sizeHeading( token.depth )} font-bold text-sky-500">${renderMath(token.text)}</h${token.depth}>`;
        },

        code: ( token ) => {
            const highlightedCode = Prism.highlight(token.text, Prism.languages.javascript, 'javascript');
            return `<pre class="overflow-x-auto bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg shadow-md"><code class="text-sm text-zinc-800 dark:text-sky-300">${highlightedCode}</code></pre>
            <style>
            .token.operator {
                background-color: transparent !important;
                color: #b45309;
            }
            </style>`;
        },

        hr: () => {
            return `<hr class="my-5 border-zinc-400 dark:border-zinc-600" />`;
        },

        table: ( token: Tokens.Table ): string => {
            const headerHtml = token.header
                .map(
                    (headerCell) =>
                        `<th class="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-sky-500">${renderMath( headerCell.text )}</th>`
                )
                .join("");

            const bodyHtml = token.rows
                .map(
                    (row) =>
                        `<tr>${row
                            .map(
                                (cell) =>
                                    `<td class="px-4 py-2 border-t border-zinc-300 dark:border-zinc-600 dark:text-zinc-300">${renderMath(cell.text)}</td>`
                            )
                            .join("")}</tr>`
                )
                .join("");

            return `
                <div class="overflow-x-auto">
                    <table class="table-auto border-collapse border border-zinc-300 dark:border-zinc-600 w-full text-left mb-6">
                        <thead>
                            <tr>${headerHtml}</tr>
                        </thead>
                        <tbody>
                            ${bodyHtml}
                        </tbody>
                    </table>
                </div>
            `;
        },

        list: (token: Tokens.List): string => {
            const isOrdered = token.ordered;
            const itemsHtml = token.items
                .map(( item ) => {
                    const cleanRaw      = item.raw.replace(/\n$/, '').trim();
                    const checkboxMatch = cleanRaw.match(/^-\s*\[(\s*x?\s*)\]\s*(.*)$/i);

                    if ( checkboxMatch ) {
                        const isChecked = checkboxMatch[1].toLowerCase().includes('x');
                        const text      = checkboxMatch[2];
                        const checkbox  = `<input type="checkbox" ${isChecked ? 'checked' : ''} class="form-checkbox h-4 w-4 text-sky-500 rounded border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 mr-2" />`;

                        return `<li class="mb-2 -ml-2.5 flex items-center list-none">${checkbox}${renderMath(text)}</li>`;
                    }

                    return `<li class="mb-2 ml-3">${renderMath( item.text )}</li>`;
                })
                .join("");

            const listTag = isOrdered ? "ol" : "ul";
            const listClass = isOrdered
                ? "list-decimal pl-5 mb-4 text-zinc-800 dark:text-zinc-300 marker:text-zinc-400 marker:font-bold dark:marker:text-zinc-500"
                : "list-disc pl-5 mb-4 text-zinc-800 dark:text-zinc-300 marker:text-zinc-400 dark:marker:text-zinc-500";

            return `<${listTag} class="${listClass}">${itemsHtml}</${listTag}>`;
        },

        blockquote: (token) => {
            return `<blockquote class="pl-4 mb-3 border-l-4 border-sky-500 text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-600 italic">${renderMath(token.text)}</blockquote>`;
        }
    }
});

export default marked;