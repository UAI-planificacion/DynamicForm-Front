import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
    darkMode	: 'class',
    content		: ['./src/**/*.{html,js,svelte,ts}'],
    plugins		: [typography, forms, containerQueries],
    theme		: {
        extend: {}
    },
} satisfies Config;