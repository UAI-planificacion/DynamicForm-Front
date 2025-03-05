<script lang="ts">
    import { goto } from "$app/navigation";
</script>

<div class="min-h-screen bg-gray-50 flex flex-col">
    <div class="flex-grow flex items-center justify-center p-4">
    <div class="max-w-3xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="md:flex">
        <div class="md:w-1/2 bg-gradient-to-br from-blue-900 to-blue-600 text-white p-8 flex flex-col justify-center">
            <h1 class="text-2xl font-semibold mb-6">¡Ups! Algo salió mal</h1>
            <div class="flex flex-col sm:flex-row gap-4">
            <a href="/" class="bg-white text-blue-900 hover:bg-blue-50 font-semibold py-2 px-4 rounded-md transition-colors duration-300 text-center">
                Volver al inicio
            </a>
            <button onclick={()=>goto('/')} class="bg-transparent hover:bg-blue-800 text-white border border-white font-semibold py-2 px-4 rounded-md transition-colors duration-300">
                Regresar
            </button>
            </div>
        </div>
        
        <div class="md:w-1/2 p-8 flex items-center justify-center">
            <!-- Ilustración para error 404 -->
            <div class="text-center">
                <svg class="w-48 h-48 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h2 class="text-xl font-semibold text-gray-700 mt-4">Página no encontrada</h2>
                <p class="text-gray-500 mt-2">La página que buscas no existe o ha sido movida a otra ubicación.</p>
            </div>
            <!-- Ilustración para otros errores -->
            
        </div>
        </div>
        
        <div class="bg-gray-50 px-8 py-4 border-t border-gray-100">
        <div class="flex flex-col sm:flex-row justify-between items-center">
            <div class="flex items-center mb-4 sm:mb-0">
            <span class="font-bold text-blue-900">Universidad Adolfo Ibáñez</span>
            <span class="mx-2 text-gray-300">|</span>
            <span class="text-sm text-gray-500">Formulario Dinámico</span>
            </div>
            <div class="text-sm text-gray-500">
            ¿Necesitas ayuda? <a href="/contacto" class="text-blue-600 hover:underline">Contacta con soporte</a>
            </div>
        </div>
        </div>
    </div>
    </div>
    
    <footer class="bg-white py-4 border-t">
    <div class="container mx-auto px-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Universidad Adolfo Ibáñez. Todos los derechos reservados.
    </div>
    </footer>
</div>