import type { ToastOptions } from 'svelte-french-toast';
import { derived, get } from 'svelte/store';
import { theme } from '$stores';


const isDarkTheme = derived( theme, $theme => $theme === 'dark' );


const baseStyle = ($isDark: boolean) => `
	background-color: ${$isDark ? '#27272A' : '#FFFFFF'};
	padding: 16px;
	border: 1px solid ${$isDark ? '#3f3f46' : '#e4e4e7'};
`

const baseToastConfig: ToastOptions = {
    position: "bottom-right",
    duration: 3000,
	className: "shadow-lg",
	
};


export const loadingToast = (): ToastOptions => {
	const $isDark = get( isDarkTheme );

	return {
		...baseToastConfig,
		style: `
			${baseStyle( $isDark )}
			color: #0fa4ff;
		`,
	};
};


export const successToast = (): ToastOptions => {
    const $isDark = get( isDarkTheme );

	return {
        ...baseToastConfig,
        style: `
            ${baseStyle( $isDark )}
            color: ${$isDark ? '#4ADE80' : '#2EA43F'};
        `,
        iconTheme: {
            primary: $isDark ? '#4ADE80' : '#2EA43F',
            secondary: '#FFFFFF'
        },
    };
};


export const errorToast = (): ToastOptions => {
    const $isDark = get( isDarkTheme );

	return {
        ...baseToastConfig,
        style: `
            ${baseStyle($isDark)}
            color: ${$isDark ? '#F87171' : '#E5484D'};
        `,
        iconTheme: {
            primary: $isDark ? '#F87171' : '#E5484D',
            secondary: '#FFFFFF'
        }
    };
};