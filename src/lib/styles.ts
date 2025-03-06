import type { InputStyle, InputType } from "$models";


export const styles: Partial<Record<InputType, string | InputStyle>> = {
    input       : 'block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-400 focus:ring-0.5 focus:ring-gray-400 placeholder:text-gray-400 sm:text-sm disabled:bg-slate-100 disabled:text-zinc-500 dark:disabled:text-zinc-400 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700 dark:disabled:bg-zinc-700',
	textarea    : 'w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-400 focus:ring-0.5 focus:ring-gray-400 placeholder:text-gray-400 sm:text-sm disabled:border-gray-200 dark:disabled:text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700 dark:disabled:bg-zinc-700 dark:disabled:placeholder:text-zinc-400',	
	button      : 'w-full inline-flex h-12 text-white items-center justify-center rounded-input bg-black px-[21px] text-[15px] font-semibold text-background shadow-minitransition-all duration-200 hover:bg-dark/95 active:scale-[0.98] active:bg-zinc-700 rounded-xl disabled:scale-100 disabled:bg-zinc-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-400',
    check       : {
		label		: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-300',
		box			: 'read read-only:cursor-help peer inline-flex size-[25px] items-center justify-center rounded-md border border-zinc-400 dark:border-zinc-600 bg-foreground transition-all duration-150 ease-in-out active:scale-98 data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40',
	},
    select      : {
        box         : 'inline-flex h-input w-full bg-white dark:bg-zinc-900 disabled:bg-gray-100 dark:disabled:bg-zinc-700 items-center rounded-9px border border-border-input dark:border-zinc-700 bg-background px-[11px] text-sm transition-colors placeholder:text-foreground-alt/50 focus:outline-none focus:ring-1 rounded-lg h-10 justify-between disabled:bg-gray-100 dark:disabled:bg-zinc-800 dark:disabled:border-zinc-800 dark:text-zinc-300 focus:ring-zinc-600',
        content     : 'w-full rounded-xl border border-muted dark:border-zinc-700 bg-background px-1 py-2 shadow-popover outline-none bg-white dark:bg-zinc-800 z-10 dark:text-zinc-300',
        item        : 'flex h-10 w-full select-none items-center rounded-button py-3 pl-5 pr-1.5 text-sm outline-none transition-all duration-75 data-[highlighted]:bg-muted hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:rounded-lg'
    },
    combobox    : {
        box         : 'relative flex items-center w-full rounded-lg border border-border-input dark:border-zinc-700 bg-white dark:bg-zinc-900 px-2 text-sm transition-colors placeholder:text-foreground-alt/50 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background disabled:bg-zinc-100 dark:disabled:bg-zinc-600 focus:ring-zinc-600',
		input 		: 'w-full border-none text-sm bg-white outline-none transition-all duration-75 data-[highlighted]:bg-muted focus:ring-0 focus:outline-none active:outline-none disaabled:bg-gray-100 dark:bg-zinc-900 dark:text-zinc-300 dark:disabled:bg-zinc-600',
        content     : 'w-full rounded-xl border border-muted dark:border-zinc-700 px-1 py-2 shadow-popover outline-none bg-white dark:bg-zinc-800 dark:text-zinc-300',
        item        : 'flex h-10 w-full select-none items-center rounded-button py-3 pl-5 pr-1.5 text-sm capitalize outline-none transition-all duration-75 data-[highlighted]:bg-muted hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:rounded-lg focus:ring-0 focus:outline-none'
    },
    datepicker  : {
        box			: 'rounded-lg flex h-10 w-full select-none items-center rounded-input border border-border-input dark:border-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 px-2 py-3 text-sm tracking-[0.01em]-500 dark:data-[disabled]:bg-zinc-700 data-[disabled]:bg-zinc-100 focus-within:border-border-input-hover focus-within:shadow-date-field-focus hover:border-border-input-hover',
        content		: 'rounded-lg border border-dark-10 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-3 shadow-popover dark:text-zinc-300',
		label		: 'block select-none text-sm font-medium dark:text-zinc-200 dark:data-[disabled]:text-zinc-400 data-[disabled]:text-zinc-500',
		input		: 'group relative inline-flex size-10 items-center justify-center whitespace-nowrap rounded-9px border border-transparent bg-transparent p-0 text-sm font-normal text-foreground transition-all hover:border-foreground data-[disabled]:pointer-events-none data-[outside-month]:pointer-events-none data-[selected]:bg-foreground data-[selected]:bg-blue-500 data-[selected]:rounded-lg data-[disabled]:text-zinc-400 dark:data-[disabled]:text-zinc-500 data-[selected]:text-background data-[unavailable]:text-muted-foreground data-[unavailable]:line-through hover:bg-zinc-200 dark:hover:bg-zinc-600 hover:rounded-lg'
    },
    none: ''
}
