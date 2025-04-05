import type { InputStyle, InputType } from "$models";

type InputFull = InputType | 'digital' | 'analogic';


export const styles: Partial<Record<InputFull, string | InputStyle>> = {
    input       : 'block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-400 focus:ring-0.5 focus:ring-gray-400 placeholder:text-gray-400 sm:text-sm disabled:bg-slate-100 disabled:text-zinc-500 dark:disabled:text-zinc-400 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700 dark:disabled:bg-zinc-700',
	textarea    : 'w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-400 focus:ring-0.5 focus:ring-gray-400 placeholder:text-gray-400 sm:text-sm disabled:border-gray-200 dark:disabled:text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700 dark:disabled:bg-zinc-700 dark:disabled:placeholder:text-zinc-400',	
	button      : 'w-full inline-flex h-12 text-white items-center justify-center rounded-input bg-black px-[21px] text-[15px] font-semibold text-background shadow-minitransition-all duration-200 hover:bg-dark/95 active:scale-[0.98] active:bg-zinc-700 rounded-xl disabled:scale-100 disabled:bg-zinc-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-400',
    check       : {
		label		: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-300',
		box			: 'read read-only:cursor-help peer inline-flex size-[25px] items-center justify-center rounded-md border border-zinc-400 dark:border-zinc-600 bg-foreground transition-all duration-150 ease-in-out active:scale-98 data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40',
	},
    select      : {
        box         : 'flex w-full items-center justify-between rounded-lg border-[1.5px] border-zinc-300 bg-white px-3 py-2 text-sm transition-all focus-visible:outline-none focus-visible:border-[2px] focus-visible:border-zinc-400 dark:focus-visible:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900',
        content     : 'fixed z-40 overflow-hidden rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-xl dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50',
        item        : 'flex w-full items-center justify-between px-3 py-2 text-sm transition-colors rounded-lg focus-visible:outline-none focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-700 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 data-[hovered=true]:bg-zinc-300/50 dark:data-[hovered=true]:bg-zinc-700 data-[selected=true]:bg-zinc-200/50 dark:data-[selected=true]:bg-zinc-700/50',
        group       : 'dark:text-zinc-400 flex w-full items-center justify-between px-3 py-2 text-sm font-bold bg-transparent dark:bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-700/50 focus:bg-zinc-100 rounded-lg dark:focus:bg-zinc-700 focus:outline-none transition-colors',
        input       : 'block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-400 focus:ring-0.5 focus:ring-gray-400 placeholder:text-gray-400 sm:text-sm disabled:bg-slate-100 disabled:text-zinc-500 dark:disabled:text-zinc-400 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700 dark:disabled:bg-zinc-700',
    },
    datepicker  : {
        box			: 'rounded-lg flex h-10 w-full select-none items-center rounded-input border border-border-input dark:border-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 px-2 py-3 text-sm tracking-[0.01em]-500 dark:data-[disabled]:bg-zinc-700 data-[disabled]:bg-zinc-100 focus-within:border-border-input-hover focus-within:shadow-date-field-focus hover:border-border-input-hover',
        content		: 'rounded-lg border border-dark-10 shadow-md text-zinc-800 dark:text-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-3 shadow-popover dark:text-zinc-300',
		label		: 'block select-none text-sm font-medium dark:text-zinc-200 dark:data-[disabled]:text-zinc-400 data-[disabled]:text-zinc-500',
        item        : 'rounded-lg text-zinc-900 hover:bg-zinc-100 data-[selected]:bg-blue-500 data-[selected]:text-white data-[disabled]:text-zinc-500 data-[unavailable]:text-zinc-500 data-[disabled]:pointer-events-none data-[outside-month]:text-zinc-500 data-[outside-month]:pointer-events-none data-[selected]:font-medium data-[unavailable]:line-through group relative inline-flex size-10 items-center justify-center whitespace-nowrap border border-transparent bg-transparent p-0 text-sm font-normal transition-all dark:text-zinc-100 dark:hover:bg-zinc-700 dark:data-[disabled]:text-zinc-600 dark:data-[outside-month]:text-zinc-600 dark:data-[unavailable]:text-zinc-600',
        rangeItem   : 'rounded-lg hover:bg-blue-500 focus-visible:ring-foreground! data-selection-end:rounded-lg data-selection-start:rounded-lg data-[highlighted]:bg-zinc-300/50 data-[selected]:bg-blue-400 data-selection-end:bg-blue-500 data-selection-start:bg-blue-500 data-disabled:text-foreground/30 data-selected:text-white data-selection-end:text-white data-selection-start:text-white data-unavailable:text-muted-foreground data-selected:[&:not([data-selection-start])]:[&:not([data-selection-end])]:focus-visible:border-foreground data-disabled:pointer-events-none data-outside-month:pointer-events-none data-[highlighted]:rounded-none data-selected:font-medium data-selection-end:font-medium data-selection-start:font-medium data-unavailable:line-through data-selection-start:focus-visible:ring-2 data-selection-start:focus-visible:ring-offset-2! data-selected:[&:not([data-selection-start])]:[&:not([data-selection-end])]:rounded-none data-selected:[&:not([data-selection-start])]:[&:not([data-selection-end])]:focus-visible:ring-0! data-selected:[&:not([data-selection-start])]:[&:not([data-selection-end])]:focus-visible:ring-offset-0! group relative inline-flex size-10 items-center justify-center overflow-visible whitespace-nowrap border border-transparent bg-transparent p-0 text-sm font-normal transition-all dark:text-zinc-100 dark:hover:bg-zinc-700 dark:data-[disabled]:text-zinc-600 dark:data-[outside-month]:text-zinc-600 dark:data-[unavailable]:text-zinc-600 dark:data-[selected]:bg-blue-700/20 data-[selected]:rounded-none dark:data-[highlighted]:bg-zinc-600/20'
    },
    digital : {
        box		: 'rounded-lg flex h-10 w-full select-none items-center rounded-input border border-border-input dark:border-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 px-2 py-3 text-sm tracking-[0.01em]-500 dark:data-[disabled]:bg-zinc-700 data-[disabled]:bg-zinc-100 focus-within:border-border-input-hover focus-within:shadow-date-field-focus hover:border-border-input-hover flex justify-between items-center px-3',
        content : 'absolute float-right right-0 z-40 mt-1 max-w-96 bg-white dark:bg-zinc-800 rounded-md shadow-lg',
        item    : 'w-full text-center px-2 py-1 text-sm text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md transition-colors duration-200 data-[selected=true]:bg-zinc-200 dark:data-[selected=true]:bg-zinc-900',
        input   : 'block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-400 focus:ring-0.5 focus:ring-gray-400 placeholder:text-gray-400 sm:text-sm disabled:bg-slate-100 disabled:text-zinc-500 dark:disabled:text-zinc-400 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700 dark:disabled:bg-zinc-700',
    },
    analogic : {
        box		: 'rounded-lg flex h-10 w-full select-none items-center rounded-input border border-border-input dark:border-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 px-2 py-3 text-sm tracking-[0.01em]-500 dark:data-[disabled]:bg-zinc-700 data-[disabled]:bg-zinc-100 focus-within:border-border-input-hover focus-within:shadow-date-field-focus hover:border-border-input-hover flex justify-between items-center px-3',
        content : 'absolute right-4 z-40 mt-1 bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-4',
        item    : 'transition-transform absolute w-10 h-10 flex items-center justify-center shadow-md bg-zinc-100 dark:bg-zinc-700 rounded-full text-zinc-700 dark:text-zinc-300 hover:scale-105 data-[selected=true]:bg-blue-500 dark:data-[selected=true]:bg-blue-500 data-[selected=true]:text-white data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed hover:data-[disabled=false]:bg-zinc-200 dark:hover:data-[disabled=false]:bg-zinc-600',
    },
    markdown: {
        box : 'border-b border-gray-200 dark:border-zinc-700 bg-black flex items-center h-14 dark:bg-zinc-800',
        input : 'm-2 w-full min-h-64 border-none focus:ring-0 resize-none bg-transparent dark:text-zinc-200 overflow-hidden'
    },
    none: ''
}
