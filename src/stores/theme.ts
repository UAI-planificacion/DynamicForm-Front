import { writable } from 'svelte/store';

const getInitialTheme = () => {
    if ( typeof window === 'undefined' ) return 'light';

    const savedTheme = localStorage.getItem( 'theme' );

    if ( savedTheme ) return savedTheme;

    return window.matchMedia( '(prefers-color-scheme: dark)' ).matches ? 'dark' : 'light';
};


export const theme = writable( getInitialTheme() );


export const toggleTheme = () => {
    theme.update( current => {
        const newTheme = current === 'dark' ? 'light' : 'dark';

        if ( typeof window !== 'undefined' ) {
            document.documentElement.classList.toggle( 'dark', newTheme === 'dark' );
            localStorage.setItem( 'theme', newTheme );
        }

        return newTheme;
    });
};
