<script lang="ts">
    import { goto } from "$app/navigation";
</script>

<div class="mt-[15%] flex flex-col bg-gray-50 dark:bg-zinc-900">
    <div class="flex-1 flex items-start justify-center p-4">
        <div class="w-full max-w-3xl bg-white dark:bg-zinc-800 rounded-xl shadow-lg overflow-hidden">
            <div class="md:flex">
                <div class="md:w-1/2 bg-gradient-to-br from-zinc-900 to-zinc-600 text-white p-8 flex flex-col justify-center">
                    <h1 class="text-2xl font-semibold mb-6">¡Ups! Algo salió mal</h1>
                    <div class="flex flex-col sm:flex-row gap-4">
                        <a href="/" class="bg-white text-zinc-900 hover:bg-zinc-50 font-semibold py-2 px-4 rounded-md transition-colors duration-300 text-center">
                            Volver al inicio
                        </a>
                        <button 
                            class="bg-transparent hover:bg-zinc-800 text-white border border-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
                            on:click={() => goto('/')}
                        >
                            Regresar
                        </button>
                    </div>
                </div>
                
                <div class="md:w-1/2 p-8 flex items-center justify-center">
                    <div class="text-center">
                        <svg class="w-32 h-32 mx-auto text-gray-400 dark:text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h2 class="text-xl font-semibold text-gray-700 dark:text-zinc-300 mt-4">Página no encontrada</h2>
                        <p class="text-gray-500 dark:text-zinc-400 mt-2">La página que buscas no existe o ha sido movida a otra ubicación.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>