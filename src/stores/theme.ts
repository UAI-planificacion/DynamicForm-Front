import { writable } from 'svelte/store';

const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

export const theme = writable(prefersDark ? 'dark' : 'light');

export const toggleTheme = () => {
    theme.update((current) => {
        const newTheme = current === 'dark' ? 'light' : 'dark';

        if (typeof window !== 'undefined') {
            document.documentElement.classList.toggle('dark', newTheme === 'dark');
            localStorage.setItem('theme', newTheme);
        }
        return newTheme;
    });
};
