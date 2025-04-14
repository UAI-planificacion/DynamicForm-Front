<script lang="ts">
    import { onMount } from 'svelte';

    export let trigger: any | undefined = undefined; // Componente o elemento que activa el dropdown
    export let content: any | undefined = undefined; // Contenido del dropdown
    export let open = false;
    export let position = 'bottom'; // bottom, right, left, top
    export let offset = 8; // Distancia desde el trigger
    export let width: string | undefined = undefined; // Ancho personalizado
    export let closeOnSelect = true;
    export let trapFocus = true;
    export let contentClass = ""; // Clases adicionales para el contenido

    let triggerElement: HTMLElement;
    let contentElement: HTMLElement;
    let menuStyles: {top?: string; left?: string} = {};

    function positionMenu() {
        if (!triggerElement || !contentElement) return;
        
        const rect = triggerElement.getBoundingClientRect();
        
        // Calcular posición basada en la opción seleccionada
        switch(position) {
            case 'bottom':
                menuStyles = {
                    top: `${rect.bottom + window.scrollY + offset}px`,
                    left: `${rect.left + window.scrollX}px`
                };
                break;
            case 'top':
                menuStyles = {
                    top: `${rect.top + window.scrollY - offset}px`,
                    left: `${rect.left + window.scrollX}px`
                };
                break;
            case 'right':
                menuStyles = {
                    top: `${rect.top + window.scrollY}px`,
                    left: `${rect.right + window.scrollX + offset}px`
                };
                break;
            case 'left':
                menuStyles = {
                    top: `${rect.top + window.scrollY}px`,
                    left: `${rect.left + window.scrollX - contentElement.offsetWidth - offset}px`
                };
                break;
        }
    }

    function toggleMenu() {
        open = !open;
        if (open) {
            setTimeout(positionMenu, 0);
        }
        // Disparar evento personalizado
        const event = new CustomEvent('toggle', { detail: { open } });
        triggerElement?.dispatchEvent(event);
    }

    function handleClickOutside(event: MouseEvent) {
        if (open && triggerElement && contentElement && 
            !triggerElement.contains(event.target as Node) && 
            !contentElement.contains(event.target as Node)) {
            open = false;
            // Disparar evento personalizado
            const event = new CustomEvent('close');
            triggerElement?.dispatchEvent(event);
        }
    }

    function handleSelect() {
        if (closeOnSelect) {
            open = false;
            // Disparar evento personalizado
            const event = new CustomEvent('close');
            triggerElement?.dispatchEvent(event);
        }
    }

    $: if (open) {
        setTimeout(positionMenu, 0);
    }

    onMount(() => {
        document.addEventListener('click', handleClickOutside);
        
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });
</script>

<div class="relative">
    <!-- Trigger -->
    <div 
        bind:this={triggerElement} 
        on:click={toggleMenu}
        on:keydown={(e) => e.key === 'Enter' && toggleMenu()}
        role="button"
        tabindex="0"
        aria-haspopup="true"
        aria-expanded={open}
    >
        <slot name="trigger">
            {#if trigger}
                {trigger}
            {:else}
                <button type="button" class="dropdown-trigger">
                    <slot name="trigger-content">
                        Abrir menú
                    </slot>
                </button>
            {/if}
        </slot>
    </div>
    
    <!-- Content -->
    {#if open}
        <div 
            bind:this={contentElement}
            class="absolute z-50 {contentClass}"
            style="top: {menuStyles?.top || '0'}; left: {menuStyles?.left || '0'}; position: fixed; {width ? `width: ${width};` : ''}"
            role="menu"
            tabindex={trapFocus ? 0 : -1}
            aria-label="Menú desplegable"
        >
            <slot name="content">
                {#if content}
                    {content}
                {:else}
                    <div class="dropdown-content">
                        <slot>
                            <!-- Contenido por defecto -->
                            <div class="p-2">Contenido del menú</div>
                        </slot>
                    </div>
                {/if}
            </slot>
        </div>
    {/if}
</div>

<style>
    .dropdown-trigger {
        cursor: pointer;
    }
    
    .dropdown-content {
        background-color: #333;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        color: white;
    }
</style>
