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
    let dropdownContainer: HTMLElement;
    let menuStyles: {top?: string; left?: string; maxHeight?: string} = {};

    function positionMenu() {
        if (!triggerElement || !contentElement) return;
        
        // Obtener las dimensiones del trigger y la ventana
        const rect = triggerElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        
        // Calcular posición basada en la opción seleccionada
        switch(position) {
            case 'bottom':
                menuStyles = {
                    top: `${rect.height + offset}px`,
                    left: '0px',
                    maxHeight: `${windowHeight - rect.bottom - offset - 20}px`
                };
                break;
            case 'top':
                menuStyles = {
                    top: `${-contentElement.offsetHeight - offset}px`,
                    left: '0px'
                };
                break;
            case 'right':
                menuStyles = {
                    top: '0px',
                    left: `${rect.width + offset}px`
                };
                break;
            case 'left':
                menuStyles = {
                    top: '0px',
                    left: `${-contentElement.offsetWidth - offset}px`
                };
                break;
        }
        
        // Asegurar que el dropdown esté visible en la ventana
        setTimeout(() => {
            if (!contentElement) return;
            
            const contentRect = contentElement.getBoundingClientRect();
            
            // Verificar si el dropdown está fuera de la pantalla y ajustar si es necesario
            if (contentRect.right > windowWidth) {
                const overflow = contentRect.right - windowWidth;
                menuStyles.left = `${parseInt(menuStyles.left || '0') - overflow - 20}px`;
                updateStyles();
            }
            
            if (contentRect.bottom > windowHeight) {
                // Si no cabe abajo, intentar colocarlo arriba
                if (position === 'bottom') {
                    menuStyles = {
                        top: `${-contentElement.offsetHeight - offset}px`,
                        left: menuStyles.left || '0px'
                    };
                    updateStyles();
                }
            }
        }, 0);
    }
    
    function updateStyles() {
        if (contentElement) {
            Object.entries(menuStyles).forEach(([key, value]) => {
                // Usar tipado seguro para acceder a style
                if (key === 'top') contentElement.style.top = value;
                else if (key === 'left') contentElement.style.left = value;
                else if (key === 'maxHeight') contentElement.style.maxHeight = value;
            });
        }
    }

    function toggleMenu() {
        open = !open;
        if (open) {
            // Usar requestAnimationFrame para asegurar que el DOM está actualizado
            requestAnimationFrame(() => {
                setTimeout(positionMenu, 10); // Pequeño retraso para asegurar que el contenido esté renderizado
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
            setTimeout(positionMenu, 10);
        });
    }

    // Reposicionar cuando cambia el tamaño de la ventana
    function handleResize() {
        if (open) {
            positionMenu();
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
            class="dropdown-menu-content mt-2 z-[1000] {contentClass}"
            style="position: absolute; {width ? `width: ${width};` : 'width: max-content;'}"
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
    
    /* Estilos para asegurar que el dropdown se muestre correctamente en todos los navegadores */
    .dropdown-menu-content {
        position: absolute;
        display: block;
        overflow: visible;
        /* Eliminar min-width para mantener el ancho original */
        width: auto;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        transform-origin: top left;
        animation: dropdown-appear 0.1s ease-out;
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
