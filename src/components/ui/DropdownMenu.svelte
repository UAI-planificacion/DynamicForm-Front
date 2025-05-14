<script lang="ts">
    import { onMount } from 'svelte';

    import { UAITheme }         from '$lib';
    import { secondaryColor }   from '$lib/styles/themes/default/secondary-color';
    import type { ThemeShape }  from '$models';


    export let trigger: any | undefined = undefined; // Componente o elemento que activa el dropdown
    export let content: any | undefined = undefined; // Contenido del dropdown
    export let open = false;
    export let position = 'bottom'; // bottom, right, left, top
    export let offset = 8; // Distancia desde el trigger
    export let width: string | undefined = undefined; // Ancho personalizado
    export let closeOnSelect = true;
    export let trapFocus = true;
    export let contentClass = ""; // Clases adicionales para el contenido
    export let themeShape   : ThemeShape = UAITheme();
    export let isDarkMode   : boolean = false;


    let triggerElement: HTMLElement;
    let contentElement: HTMLElement;
    let dropdownContainer: HTMLElement;

    function positionMenu() {
        if (!triggerElement || !contentElement) return;
        
        // Obtener las dimensiones del trigger y la ventana
        const rect = triggerElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        
        // Posición inicial del contenido basada en la posición del trigger
        let top: number = 0;
        let left: number = 0;
        
        // Calcular posición basada en la opción seleccionada
        switch(position) {
            case 'bottom':
                top = rect.bottom + offset;
                left = rect.left;
                break;
            case 'top':
                top = rect.top - contentElement.offsetHeight - offset;
                left = rect.left;
                break;
            case 'right':
                top = rect.top;
                left = rect.right + offset;
                break;
            case 'left':
                top = rect.top;
                left = rect.left - contentElement.offsetWidth - offset;
                break;
        }
        
        // Asegurar que el menú no se salga de la pantalla
        requestAnimationFrame(() => {
            if (!contentElement) return;            

            const contentRect = contentElement.getBoundingClientRect();
            const contentWidth = contentRect.width;
            const contentHeight = contentRect.height;
            // Ajustar posición horizontal si se sale de la pantalla
            if (left + contentWidth > windowWidth - 20) {
                left = windowWidth - contentWidth - 20;
            }

            if (left < 20) {
                left = 20;
            }
            // Ajustar posición vertical si se sale de la pantalla
            if (top + contentHeight > windowHeight - 20) {
                // Si no cabe abajo, intentar colocarlo arriba
                if (position === 'bottom' && rect.top > contentHeight + offset) {
                    top = rect.top - contentHeight - offset;
                } else {
                    // Si no cabe arriba, ajustar la altura máxima
                    top = Math.max(20, windowHeight - contentHeight - 20);
                }
            }

            if (top < 20) {
                top = 20;
            }
            // Aplicar estilos
            contentElement.style.top = `${top}px`;
            contentElement.style.left = `${left}px`;
            // Establecer altura máxima para evitar que se salga de la pantalla
            const maxHeight = windowHeight - top - 20;

            if (contentHeight > maxHeight) {
                contentElement.style.maxHeight = `${maxHeight}px`;
                contentElement.style.overflowY = 'auto';
            }
        });
    }

    // Esta función ya no es necesaria ya que aplicamos los estilos directamente
    function toggleMenu() {
        open = !open;
        if (open) {
            // Usar requestAnimationFrame para asegurar que el DOM está actualizado
            requestAnimationFrame(() => {
                // Usar un retraso mayor para asegurar que el contenido esté completamente renderizado
                setTimeout(positionMenu, 50);
            });
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

    // Reposicionar el menú cuando cambia el estado
    $: if (open) {
        requestAnimationFrame(() => {
            // Usar un retraso mayor para asegurar que el contenido esté completamente renderizado
            setTimeout(positionMenu, 50);
            // Añadir un segundo intento para casos donde el primer posicionamiento no fue suficiente
            setTimeout(positionMenu, 150);
        });
    }

    // Reposicionar cuando cambia el tamaño de la ventana
    function handleResize() {
        if (open) {
            // Reposicionar con un pequeño retraso para asegurar que los cálculos sean correctos
            setTimeout(positionMenu, 50);
        }
    }

    onMount(() => {
        document.addEventListener('click', handleClickOutside);
        window.addEventListener('resize', handleResize);
        
        return () => {
            document.removeEventListener('click', handleClickOutside);
            window.removeEventListener('resize', handleResize);
        };
    });
</script>

<div class="relative" bind:this={dropdownContainer}>
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
            class={`
                dropdown-menu-content mt-0.5 -ml-0.5 z-[9999]
                ${contentClass}
                ${themeShape.borderRadius}
                ${themeShape.boxShadow}
                ${themeShape.fontSize}
            `}
            style={`position: fixed; ${width ? `width: ${width};` : 'width: max-content;'}; ${secondaryColor(isDarkMode, themeShape )}`}
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
    /* Estilos para asegurar que el dropdown se muestre correctamente en todos los navegadores */
    .dropdown-menu-content {
        position: fixed;
        display: block;
        overflow: visible;
        /* Eliminar min-width para mantener el ancho original */
        width: auto;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        transform-origin: top left;
        animation: dropdown-appear 0.1s ease-out;
        max-height: 80vh; /* Limitar altura máxima */
        overflow-y: auto; /* Permitir scroll si el contenido es muy largo */
    }
    
    @keyframes dropdown-appear {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    /* Asegurar que el contenedor relativo funcione correctamente */
    .relative {
        position: relative;
    }
</style>
