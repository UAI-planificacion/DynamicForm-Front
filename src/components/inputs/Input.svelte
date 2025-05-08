<script lang="ts">
    import { stylesS }          from "$lib/styles/themes/styl";
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
            ${ shapeInput.inputStyle?.borderRadius  ?? 'rounded-full' }
            ${ shapeInput.inputStyle?.borderSize    ?? 'border-0' }
            ${ shapeInput.inputStyle?.boxShadow     ?? 'shadow-sm' }`
        }
        style={ stylesS( isDarkMode, shapeInput )}
        on:focus={(e) => {
            e.currentTarget.style.boxShadow = `0 0 0 ${shapeInput.inputStyle?.[isDarkMode ? 'dark' : 'light']?.event?.focus?.ringSize! }
            ${ isDarkMode
                ? shapeInput.inputStyle?.dark?.event?.focus?.ring!
                : shapeInput.inputStyle?.light?.event?.focus?.ring!
            }`;
        }}
        on:blur={(e) => {
            e.currentTarget.style.boxShadow = `0 0 0 ${ shapeInput.inputStyle?.ringSize! }
            ${ isDarkMode
                ? shapeInput.inputStyle?.dark?.ring!
                : shapeInput.inputStyle?.light?.ring!
            }`;
        }}
    />
</Info>
