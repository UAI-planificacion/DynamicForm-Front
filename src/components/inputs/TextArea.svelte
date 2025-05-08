<script lang="ts">
    import type { ShapeInput } 	from "$models";
    import { theme }            from "$stores";

	import Info 				from "./Info.svelte";


    export let shapeInput	: ShapeInput;
	export let value 		: string | undefined = undefined;
    export let onInput		: ( value: string ) => void;
    export let setError     : VoidFunction = () => {};


    let isDarkMode = $theme === 'dark';


    $: if ( $theme === 'dark' ) {
        isDarkMode = true;
    } else {
        isDarkMode = false;
    }
</script>

<Info { shapeInput } { onInput } { value }>
	<textarea
		name        = { shapeInput.name }
		id          = { shapeInput.id }
		rows        = { shapeInput.rows || 3 }
		minlength   = { shapeInput.minLength }
		maxlength   = { shapeInput.maxLength }
		required 	= { shapeInput.required }
		readonly 	= { shapeInput.readonly }
		disabled 	= { shapeInput.disabled }
		placeholder	= { shapeInput.placeholder }
        bind:value= { value }
		on:input    = { ( event: Event ) => { onInput(( event.target as HTMLTextAreaElement ).value ); setError() }}
        class       = {`px-3 py-2 w-full h-auto 
            ${ shapeInput.inputStyle?.fontSize      ?? 'text-sm' }
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
    ></textarea>
</Info>
