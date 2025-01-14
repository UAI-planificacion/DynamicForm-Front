import type { InputType } from "$models";


type InputStyle = {
    box     : string;
    content : string;
    item?   : string
}


export const styles: Partial<Record<InputType, string | InputStyle>> = {
    input       : 'block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-400 focus:ring-0.5 focus:ring-gray-400 placeholder:text-gray-400 sm:text-sm disabled:bg-slate-100 disabled:text-slate-500',
    check       : 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    textarea    : 'w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-400 focus:ring-0.5 focus:ring-gray-400 placeholder:text-gray-400 sm:text-sm disabled:border-gray-200',
    button      : 'w-full inline-flex h-12 text-white items-center justify-center rounded-input bg-black px-[21px] text-[15px] font-semibold text-background shadow-minitransition-all duration-200 hover:bg-dark/95 active:scale-[0.98] active:bg-zinc-900 rounded-xl',
    select      : {
        box         : '',
        content     : '',
        item        : ''
    },
    combobox    : {
        box         : '',
        content     : '',
        item        : ''
    },
    datepicker  : {
        box         : '',
        content     : ''
    },
    none        : ''
}
