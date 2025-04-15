<script lang="ts">
    import { onMount } from 'svelte';

    import { fly }  from 'svelte/transition';
    import { X }    from 'lucide-svelte';

    import { docSections } from '$lib';
	import { marked } from '$components';



    let activeSection   = docSections[0].id;
    let activeItem      = docSections[0].items[0].id;
    let isSidebarOpen   = false;
    let isSearchOpen    = false;
    let searchQuery     = '';


    function updateFromHash() {
        if ( typeof window !== 'undefined' ) {
            const hash = window.location.hash.substring( 1 );

            if ( !hash ) return;

            for ( const section of docSections ) {
                const item = section.items.find( item => item.id === hash );
                if ( item ) {
                    activeSection   = section.id;
                    activeItem      = item.id;
                    return;
                }
            }
        }
    }


    $: if ( typeof window !== 'undefined' && activeItem ) {
        window.location.hash = activeItem;
    }


    onMount(() => {
        updateFromHash();

        window.addEventListener( 'hashchange', updateFromHash );

        return () => {
            window.removeEventListener( 'hashchange', updateFromHash );
        };
    });


    function getActiveComponent() {
        const section = docSections.find( s => s.id === activeSection );
        if ( !section ) return null;

        const item = section.items.find( i => i.id === activeItem );
        return item ? item.component : null;
    }


    function getFilteredSections() {
        if ( !searchQuery.trim() ) return docSections;

        return docSections.map( section => {
            const filteredItems = section.items
                .filter( item => item.title.toLowerCase().includes( searchQuery.toLowerCase() )
            );

            return {
                ...section,
                items: filteredItems
            };
        }).filter( section => section.items.length > 0 );
    }
</script>

<div class="flex flex-col min-h-screen bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 transition-colors duration-300">
    {#if isSearchOpen}
        <div class="border-t border-gray-200 dark:border-gray-700 py-3 px-4 transition-all duration-300 ">
            <div class="relative">
                <input 
                    type="text" 
                    bind:value={searchQuery} 
                    placeholder="Buscar en la documentación..." 
                    class="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                />
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>
    {/if}

    <div class="flex flex-1 overflow-hidden h-full">
        <!-- Sidebar -->
        <aside 
            class="w-64 border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 transition-all ease-in-out duration-300 overflow-y-auto
            {isSidebarOpen
                ? 'fixed inset-y-0 left-0 z-20 shadow-lg md:shadow-none md:static md:block'
                : 'hidden md:block'}"
        >
            <!-- Search bar (desktop) -->
            <div class="p-4 border-b border-gray-200 dark:border-zinc-700">
                <div class="relative">
                    <input 
                        type="text" 
                        bind:value={searchQuery} 
                        placeholder="Buscar..." 
                        class="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-2.5 text-gray-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <!-- Navigation -->
            <nav class="p-4">
                {#each getFilteredSections() as section}
                <div class="mb-6"
                    in:fly  = {{ y: -20, duration: 300 }}
                    out:fly = {{ y: 20, duration: 300 }}
                >
                    <h3 class="flex items-center text-sm font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={section.icon} />
                        </svg>
                        {section.title}
                    </h3>

                    <ul class="space-y-1">
                        {#each section.items as item}
                            <li>
                                <button
                                    class="w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200
                                        {activeSection === section.id && activeItem === item.id 
                                            ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-900 dark:text-blue-400 font-medium' 
                                            : 'text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700'}"
                                    on:click={() => {
                                        activeSection = section.id;
                                        activeItem = item.id;
                                        if (window.innerWidth < 768) isSidebarOpen = false;
                                    }}
                                >
                                    {item.title}
                                </button>
                            </li>
                        {/each}
                    </ul>
                </div>
                {/each}
            </nav>
        </aside>

        {#if isSidebarOpen}
            <button
                class="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
                on:click={() => isSidebarOpen = false}
            >
                <X class="w-6 h-6" />
            </button>
        {/if}
        <!-- Main content -->
        <main
            class="flex-1 overflow-y-auto bg-white dark:bg-zinc-900 p-4 md:p-8 transition-all duration-300"
            in:fly  = {{ y: -20, duration: 300 }}
            out:fly = {{ y: 20, duration: 300 }}
        >
            <div class="max-w-[75rem] mx-auto">
                <div class="mb-8">
                    {#if getActiveComponent()}
                        <!-- <svelte:component this={getActiveComponent()} /> -->
                        {@html marked( getActiveComponent()! )}
                    {/if}
                </div>

                <!-- Navegación entre páginas -->
                <div class="mt-12 border-t border-gray-200 dark:border-zinc-800 pt-6 flex justify-between">
                    <button 
                        class="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
                        on:click={() => {
                            const currentSection = docSections.find(s => s.id === activeSection);

                            if (!currentSection) return;

                            const currentItemIndex = currentSection.items.findIndex(i => i.id === activeItem);
                            if (currentItemIndex > 0) {
                                activeItem = currentSection.items[currentItemIndex - 1].id;
                            } else {
                                const sectionIndex = docSections.findIndex(s => s.id === activeSection);
                                if (sectionIndex > 0) {
                                    activeSection = docSections[sectionIndex - 1].id;
                                    activeItem = docSections[sectionIndex - 1].items[docSections[sectionIndex - 1].items.length - 1].id;
                                }
                            }
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>

                        Anterior
                    </button>

                    <button 
                        class="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
                        on:click={() => {
                            const currentSection = docSections.find( s => s.id === activeSection );

                            if ( !currentSection ) return;

                            const currentItemIndex = currentSection.items.findIndex( i => i.id === activeItem );

                            if ( currentItemIndex < currentSection.items.length - 1 ) {
                                activeItem = currentSection.items[currentItemIndex + 1].id;
                            } else {
                                const sectionIndex = docSections.findIndex( s => s.id === activeSection );
                                if ( sectionIndex < docSections.length - 1 ) {
                                    activeSection   = docSections[sectionIndex + 1].id;
                                    activeItem      = docSections[sectionIndex + 1].items[0].id;
                                }
                            }
                        }}
                    >
                        Siguiente
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </main>
    </div>
</div>

<style>
    /* Estilos para el contenido HTML renderizado */
    :global(.dark) :global(pre) {
        background-color: #1e293b !important;
        color: #e2e8f0 !important;
    }
    
    :global(.dark) :global(code) {
        color: #93c5fd !important;
    }
    
    :global(pre) {
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
        line-height: 1.5;
    }
    
    :global(a) {
        color: #2563eb;
        text-decoration: none;
    }
    
    :global(.dark) :global(a) {
        color: #60a5fa;
    }
    
    :global(a:hover) {
        text-decoration: underline;
    }
</style>