<script lang="ts">
    import { inputUAITheme } from "$lib/styles/themes/uai-theme";
    import type { ShapeInput }  from "$models";
    import { theme }            from "$stores";
    import Info                 from "./Info.svelte";


    let isDarkMode = $theme === 'dark';


    $: if ( $theme === 'dark' ) {
        isDarkMode = true;
    } else {
        isDarkMode = false;
    }


    export let shapeInput   : ShapeInput;
    export let onInput      : ( value: string ) => void;
    export let value        : string | undefined = undefined;
    export let setError     : VoidFunction = () => {};
    export let onKeyup      : ( event: KeyboardEvent ) => void = () => {};


    shapeInput.inputStyle ??= inputUAITheme;
</script>

<Info { shapeInput } { onInput } { value }>
    <input
        type        = { shapeInput.type || "text" }
        id          = { shapeInput.id }
        name        = { shapeInput.name || "no name" }
        placeholder = { shapeInput.placeholder }
        required    = { shapeInput.required }
        disabled    = { shapeInput.disabled }
        readonly    = { shapeInput.readonly }
        value       = { value ?? '' }
        on:input    = {( event: Event ) => { onInput(( event.target as HTMLTextAreaElement ).value ); setError(); }}
        on:keyup    = { onKeyup }
        class       = {`px-3 py-2 w-full transition-all duration-150 ease-in-out 
            ${ shapeInput.inputStyle?.fontSize      ?? 'text-sm' }
            ${ shapeInput.inputStyle?.height        ?? '' }
            ${ shapeInput.inputStyle?.borderRadius  ?? 'rounded-md' }
            ${ shapeInput.inputStyle?.borderSize    ?? 'border-0' }
            ${ shapeInput.inputStyle?.boxShadow     ?? 'shadow-sm' }`
        }
        style={ `background-color: ${
            isDarkMode
                ? shapeInput.disabled || shapeInput.readonly
                    ? shapeInput.inputStyle?.dark?.event?.disabled?.background ?? 'transparent'
                    : shapeInput.inputStyle?.dark?.background   ?? 'transparent'
                : shapeInput.disabled || shapeInput.readonly
                    ? shapeInput.inputStyle?.light?.event?.disabled?.background ?? 'transparent'
                    : shapeInput.inputStyle?.light?.background  ?? 'transparent'
            }; color: ${
                isDarkMode
                    ? shapeInput.disabled || shapeInput.readonly
                        ? shapeInput.inputStyle?.dark?.event?.disabled?.color ?? '#71717a'
                        :shapeInput.inputStyle?.dark?.color    ?? '#d1d5db'
                    : shapeInput.disabled || shapeInput.readonly
                        ? shapeInput.inputStyle?.light?.event?.disabled?.color ?? '#71717a'
                        :shapeInput.inputStyle?.light?.color   ?? 'black'
            }; box-shadow: 0 0 0 ${shapeInput.inputStyle?.ringSize ?? '1px'} ${
                isDarkMode
                    ? shapeInput.inputStyle?.dark?.ring ?? '#3f3f46'  // zinc-700
                    : shapeInput.inputStyle?.light?.ring ?? '#d4d4d8' // zinc-300
            }; border-color: ${
                isDarkMode
                    ? shapeInput.inputStyle?.dark?.border ?? '#3f3f46' // zinc-700
                    : shapeInput.inputStyle?.light?.border ?? '#d4d4d8' // zinc-300
            };`
        }
        on:focus={(e) => {
            e.currentTarget.style.boxShadow = `0 0 0 ${shapeInput.inputStyle?.[isDarkMode ? 'dark' : 'light']?.event?.focus?.ringSize ?? '2px'} ${
                isDarkMode
                    ? shapeInput.inputStyle?.dark?.event?.focus?.ring ?? '#71717a' // zinc-500
                    : shapeInput.inputStyle?.light?.event?.focus?.ring ?? '#a1a1aa' // zinc-400
            }`;
        }}
        on:blur={(e) => {
            e.currentTarget.style.boxShadow = `0 0 0 ${shapeInput.inputStyle?.ringSize ?? '1px'} ${
                isDarkMode
                    ? shapeInput.inputStyle?.dark?.ring ?? '#3f3f46' // zinc-500
                    : shapeInput.inputStyle?.light?.ring ?? '#d4d4d8' // zinc-400
            }`;
        }}
        on:focus={(e) => {
            e.currentTarget.style.borderColor = `${
                isDarkMode
                    ? shapeInput.inputStyle?.dark?.event?.focus?.border ?? '#71717a' // zinc-500
                    : shapeInput.inputStyle?.light?.event?.focus?.border ?? '#a1a1aa' // zinc-400
        }`;
        }}
        on:blur={(e) => {
            e.currentTarget.style.borderColor = `${
                isDarkMode ?
            shapeInput.inputStyle?.dark?.border
            : shapeInput.inputStyle?.light?.border}`;
        }}
    />
</Info>
