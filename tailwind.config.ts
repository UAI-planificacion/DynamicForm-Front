import containerQueries from '@tailwindcss/container-queries';
import forms 			from '@tailwindcss/forms';
import typography 		from '@tailwindcss/typography';
import type { Config } 	from 'tailwindcss';

export default {
	darkMode	: 'class',
	content		: [
		'./src/**/*.{html,js,svelte,ts}',
		'./src/**/*.svelte',
		// Asegurarse de incluir cualquier archivo que pueda contener clases de Tailwind
		'./src/components/**/*.{js,ts,jsx,tsx,svelte}',
		'./src/lib/**/*.{js,ts,jsx,tsx,svelte}'
	],
	plugins		: [typography, forms, containerQueries],
	theme		: {
		extend: {}
	},
	// Habilitar explícitamente el modo JIT
	mode: 'jit',
	// Configurar el safelist para clases dinámicas
	safelist: [
		'bg-white',
		'dark:bg-zinc-900',
		'bg-zinc-900',
		'dark:bg-zinc-800',
		// Agregar aquí otras clases que se generan dinámicamente
	]
} satisfies Config;
