<script lang="ts">
    import { X } from 'lucide-svelte';
    import { onMount } from 'svelte';
    
    // Tipos para la documentación
    type DocSection = {
    id: string;
    title: string;
    icon: string;
    items: DocItem[];
    };
    
    type DocItem = {
    id: string;
    title: string;
    content: string;
    };
    
    // Datos de ejemplo para la documentación
    const docSections: DocSection[] = [
    {
        id: 'getting-started',
        title: 'Primeros pasos',
        icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
        items: [
        {
            id: 'introduction',
            title: 'Introducción',
            content: `
            <h1 class="text-2xl font-bold mb-4">Bienvenido a Formulario Dinámico</h1>
            <p class="mb-4">Formulario Dinámico es una aplicación desarrollada por la Universidad Adolfo Ibáñez para facilitar la creación, gestión y análisis de formularios en el entorno académico.</p>
            <p class="mb-4">Esta documentación te guiará a través de todas las funcionalidades de la plataforma, desde la creación de tu primer formulario hasta el análisis avanzado de datos.</p>
            <h2 class="text-xl font-semibold mt-6 mb-3">¿Qué puedes hacer con Formulario Dinámico?</h2>
            <ul class="list-disc pl-6 mb-4 space-y-2">
                <li>Crear formularios personalizados para diferentes propósitos académicos</li>
                <li>Compartir formularios con estudiantes, profesores y personal administrativo</li>
                <li>Recopilar y analizar datos de manera eficiente</li>
                <li>Generar reportes y visualizaciones de los datos recopilados</li>
                <li>Integrar con otros sistemas de la universidad</li>
            </ul>
            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
                <p class="font-medium">Consejo:</p>
                <p>Si eres nuevo en la plataforma, te recomendamos comenzar con la sección "Crear tu primer formulario".</p>
            </div>
            `
        },
        {
            id: 'installation',
            title: 'Instalación',
            content: `
            <h1 class="text-2xl font-bold mb-4">Instalación y configuración</h1>
            <p class="mb-4">Formulario Dinámico es una aplicación web, por lo que no requiere instalación en tu dispositivo. Sin embargo, hay algunos pasos que debes seguir para comenzar a utilizarla.</p>
            
            <h2 class="text-xl font-semibold mt-6 mb-3">Requisitos del sistema</h2>
            <p class="mb-4">Para utilizar Formulario Dinámico, necesitas:</p>
            <ul class="list-disc pl-6 mb-4 space-y-2">
                <li>Un navegador web moderno (Chrome, Firefox, Safari o Edge en sus versiones más recientes)</li>
                <li>Conexión a internet</li>
                <li>Cuenta institucional de la Universidad Adolfo Ibáñez</li>
            </ul>
            
            <h2 class="text-xl font-semibold mt-6 mb-3">Acceso a la plataforma</h2>
            <ol class="list-decimal pl-6 mb-4 space-y-2">
                <li>Visita <a href="#" class="text-blue-600 hover:underline">formulariodinamico.uai.cl</a></li>
                <li>Haz clic en "Iniciar sesión"</li>
                <li>Ingresa tus credenciales institucionales</li>
                <li>¡Listo! Ya puedes comenzar a utilizar Formulario Dinámico</li>
            </ol>
            
            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6">
                <p class="font-medium">Nota importante:</p>
                <p>Si tienes problemas para acceder con tus credenciales, contacta al departamento de TI de la universidad.</p>
            </div>
            `
        },
        {
            id: 'first-form',
            title: 'Tu primer formulario',
            content: `
            <h1 class="text-2xl font-bold mb-4">Creando tu primer formulario</h1>
            <p class="mb-4">En esta guía, aprenderás a crear un formulario básico en la plataforma Formulario Dinámico.</p>
            
            <h2 class="text-xl font-semibold mt-6 mb-3">Pasos para crear un formulario</h2>
            <ol class="list-decimal pl-6 mb-4 space-y-2">
                <li>Desde el dashboard, haz clic en el botón "Nuevo formulario"</li>
                <li>Ingresa un título y una descripción para tu formulario</li>
                <li>Selecciona la categoría que mejor se adapte al propósito de tu formulario</li>
                <li>Comienza a añadir preguntas utilizando el panel de elementos</li>
                <li>Configura las opciones de cada pregunta según tus necesidades</li>
                <li>Guarda tu formulario haciendo clic en "Guardar"</li>
            </ol>
            
            <h2 class="text-xl font-semibold mt-6 mb-3">Tipos de preguntas disponibles</h2>
            <ul class="list-disc pl-6 mb-4 space-y-2">
                <li>Texto corto</li>
                <li>Texto largo</li>
                <li>Selección única</li>
                <li>Selección múltiple</li>
                <li>Escala</li>
                <li>Fecha</li>
                <li>Hora</li>
                <li>Archivo</li>
            </ul>
            
            <div class="bg-green-50 border-l-4 border-green-500 p-4 mt-6">
                <p class="font-medium">Consejo:</p>
                <p>Puedes previsualizar tu formulario en cualquier momento haciendo clic en el botón "Vista previa".</p>
            </div>
            `
        }
        ]
    },
    {
        id: 'features',
        title: 'Características',
        icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
        items: [
        {
            id: 'form-builder',
            title: 'Constructor de formularios',
            content: `
            <h1 class="text-2xl font-bold mb-4">Constructor de formularios</h1>
            <p class="mb-4">El constructor de formularios es la herramienta principal de Formulario Dinámico. Te permite crear formularios personalizados con diferentes tipos de preguntas y configuraciones.</p>
            
            <h2 class="text-xl font-semibold mt-6 mb-3">Interfaz del constructor</h2>
            <p class="mb-4">La interfaz del constructor se divide en tres secciones principales:</p>
            <ul class="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Panel de elementos:</strong> Aquí encontrarás todos los tipos de preguntas que puedes añadir a tu formulario.</li>
                <li><strong>Área de edición:</strong> En esta área puedes organizar y configurar las preguntas de tu formulario.</li>
                <li><strong>Panel de propiedades:</strong> Aquí puedes configurar las propiedades específicas de cada pregunta seleccionada.</li>
            </ul>
            
            <h2 class="text-xl font-semibold mt-6 mb-3">Funcionalidades avanzadas</h2>
            <ul class="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Lógica condicional:</strong> Muestra u oculta preguntas según las respuestas anteriores.</li>
                <li><strong>Validación de respuestas:</strong> Configura reglas de validación para asegurar la calidad de los datos.</li>
                <li><strong>Secciones:</strong> Organiza tu formulario en secciones para una mejor estructura.</li>
                <li><strong>Temas personalizados:</strong> Aplica temas visuales a tus formularios para adaptarlos a tus necesidades.</li>
            </ul>
            
            <div class="bg-purple-50 border-l-4 border-purple-500 p-4 mt-6">
                <p class="font-medium">Consejo avanzado:</p>
                <p>Utiliza la función de duplicación para crear rápidamente preguntas similares en tu formulario.</p>
            </div>
            `
        },
        {
            id: 'data-analysis',
            title: 'Análisis de datos',
            content: `
            <h1 class="text-2xl font-bold mb-4">Análisis de datos</h1>
            <p class="mb-4">Formulario Dinámico ofrece potentes herramientas para analizar los datos recopilados a través de tus formularios.</p>
            
            <h2 class="text-xl font-semibold mt-6 mb-3">Visualización de respuestas</h2>
            <p class="mb-4">Puedes visualizar las respuestas de tus formularios de diferentes maneras:</p>
            <ul class="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Resumen:</strong> Una vista general de todas las respuestas.</li>
                <li><strong>Individual:</strong> Visualiza las respuestas de cada participante.</li>
                <li><strong>Pregunta:</strong> Analiza las respuestas a una pregunta específica.</li>
            </ul>
            
            <h2 class="text-xl font-semibold mt-6 mb-3">Gráficos y estadísticas</h2>
            <p class="mb-4">La plataforma genera automáticamente gráficos y estadísticas basados en las respuestas recibidas:</p>
            <ul class="list-disc pl-6 mb-4 space-y-2">
                <li>Gráficos de barras para preguntas de selección</li>
                <li>Gráficos circulares para distribuciones porcentuales</li>
                <li>Nubes de palabras para respuestas de texto</li>
                <li>Estadísticas descriptivas para datos numéricos</li>
            </ul>
            
            <h2 class="text-xl font-semibold mt-6 mb-3">Exportación de datos</h2>
            <p class="mb-4">Puedes exportar los datos recopilados en diferentes formatos:</p>
            <ul class="list-disc pl-6 mb-4 space-y-2">
                <li>Excel (.xlsx)</li>
                <li>CSV</li>
                <li>PDF (para informes)</li>
            </ul>
            
            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
                <p class="font-medium">Consejo:</p>
                <p>Utiliza los filtros para analizar subconjuntos específicos de tus datos.</p>
            </div>
            `
        }
        ]
    },
    {
        id: 'advanced',
        title: 'Uso avanzado',
        icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
        items: [
        {
            id: 'api-integration',
            title: 'Integración API',
            content: `
            <h1 class="text-2xl font-bold mb-4">Integración con API</h1>
            <p class="mb-4">Formulario Dinámico ofrece una API RESTful que permite integrar la plataforma con otros sistemas y aplicaciones.</p>
            
            <h2 class="text-xl font-semibold mt-6 mb-3">Autenticación</h2>
            <p class="mb-4">Para utilizar la API, necesitas obtener un token de acceso:</p>
            <pre class="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
POST /api/auth/token
Content-Type: application/json

{
    "username": "tu_usuario",
    "password": "tu_contraseña",
    "client_id": "tu_client_id"
}
            </pre>
            
            <h2 class="text-xl font-semibold mt-6 mb-3">Endpoints principales</h2>
            <ul class="list-disc pl-6 mb-4 space-y-2">
                <li><code>/api/forms</code> - Gestión de formularios</li>
                <li><code>/api/responses</code> - Acceso a respuestas</li>
                <li><code>/api/users</code> - Gestión de usuarios</li>
                <li><code>/api/reports</code> - Generación de informes</li>
            </ul>
            
            <h2 class="text-xl font-semibold mt-6 mb-3">Ejemplo de uso</h2>
            <p class="mb-4">Obtener todos los formularios del usuario actual:</p>
            <pre class="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
GET /api/forms
Authorization: Bearer tu_token_de_acceso
            </pre>
            
            <div class="bg-red-50 border-l-4 border-red-500 p-4 mt-6">
                <p class="font-medium">Importante:</p>
                <p>Nunca compartas tu token de acceso. Si sospechas que ha sido comprometido, regenera un nuevo token inmediatamente.</p>
            </div>
            `
        },
        {
            id: 'workflows',
            title: 'Flujos de trabajo',
            content: `
            <h1 class="text-2xl font-bold mb-4">Flujos de trabajo</h1>
            <p class="mb-4">Los flujos de trabajo te permiten automatizar procesos basados en las respuestas de tus formularios.</p>
            
            <h2 class="text-xl font-semibold mt-6 mb-3">Creación de un flujo de trabajo</h2>
            <ol class="list-decimal pl-6 mb-4 space-y-2">
                <li>Ve a la sección "Flujos de trabajo" en el panel de administración</li>
                <li>Haz clic en "Nuevo flujo de trabajo"</li>
                <li>Selecciona el formulario al que quieres asociar el flujo</li>
                <li>Define los desencadenantes (triggers) que activarán el flujo</li>
                <li>Configura las acciones que se ejecutarán</li>
                <li>Guarda el flujo de trabajo</li>
            </ol>
            
            <h2 class="text-xl font-semibold mt-6 mb-3">Tipos de desencadenantes</h2>
            <ul class="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Nueva respuesta:</strong> Se activa cuando se recibe una nueva respuesta</li>
                <li><strong>Respuesta específica:</strong> Se activa cuando se recibe una respuesta con valores específicos</li>
                <li><strong>Programado:</strong> Se activa en momentos específicos (diario, semanal, etc.)</li>
                <li><strong>Manual:</strong> Se activa manualmente por un administrador</li>
            </ul>
            
            <h2 class="text-xl font-semibold mt-6 mb-3">Tipos de acciones</h2>
            <ul class="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Enviar email:</strong> Envía un correo electrónico a destinatarios específicos</li>
                <li><strong>Notificación:</strong> Envía una notificación en la plataforma</li>
                <li><strong>Actualizar datos:</strong> Actualiza información en la base de datos</li>
                <li><strong>Integración externa:</strong> Envía datos a sistemas externos mediante webhooks</li>
            </ul>
            
            <div class="bg-green-50 border-l-4 border-green-500 p-4 mt-6">
                <p class="font-medium">Ejemplo de uso:</p>
                <p>Configura un flujo de trabajo para enviar automáticamente un correo de agradecimiento a cada persona que complete tu formulario.</p>
            </div>
            `
        }
        ]
    }
    ];
    
    // Estado de la aplicación
    let activeSection = docSections[0].id;
    let activeItem = docSections[0].items[0].id;
    let searchQuery = '';
    let isDarkMode = false;
    let isSidebarOpen = false;
    let isSearchOpen = false;
    
    // Función para cambiar el tema
    function toggleDarkMode() {
        isDarkMode = !isDarkMode;

        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
    
    // Función para obtener el contenido activo
    function getActiveContent() {
        const section = docSections.find(s => s.id === activeSection);

        if (!section) return '';

        const item = section.items.find(i => i.id === activeItem);

        return item ? item.content : '';
    }

    // Función para filtrar elementos por búsqueda
    function getFilteredSections() {
        if (!searchQuery.trim()) return docSections;

        return docSections.map(section => {
            const filteredItems = section.items.filter(item => 
                item.title.toLowerCase().includes( searchQuery.toLowerCase() )
            );

            return {
                ...section,
                items: filteredItems
            };
        }).filter( section => section.items.length > 0 );
    }
    
    // Animaciones al montar el componente
    onMount(() => {
        // Inicializar animaciones o configuraciones adicionales aquí
        const observer = new IntersectionObserver(( entries ) => {
            entries.forEach( entry => {
                if ( entry.isIntersecting ) {
                    entry.target.classList.add( 'show' );
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll( '.animate-on-scroll' ).forEach(el => {
            observer.observe( el );
        });
    });
</script>

<div class="{isDarkMode ? 'dark' : ''} min-h-screen">
    <div class="flex flex-col min-h-screen bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 transition-colors duration-300">
        {#if isSearchOpen}
        <div class="border-t border-gray-200 dark:border-gray-700 py-3 px-4 transition-all duration-300 animate-in slide-in-from-top">
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
    
        <div class="flex flex-1 overflow-hidden">
        <!-- Sidebar -->
        <aside 
        class="w-64 border-r border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 transition-all duration-300 overflow-y-auto
                {isSidebarOpen ? 'fixed inset-y-0 left-0 z-20 shadow-lg md:shadow-none md:static md:block' : 'hidden md:block'}"
        >
        <!-- Search bar (desktop) -->
        <div class="p-4 border-b border-gray-200 dark:border-zinc-700">
            <div class="relative">
            <input 
                type="text" 
                bind:value={searchQuery} 
                placeholder="Buscar..." 
                class="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors duration-300"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-2.5 text-gray-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            </div>
        </div>
        
        <!-- Navigation -->
        <nav class="p-4">
            {#each getFilteredSections() as section}
            <div class="mb-6">
                <h3 
                class="flex items-center text-sm font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider mb-3"
                >
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
                                ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-900 dark:text-amber-400 font-medium' 
                                : 'text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700'}"
                        on:click={() => {
                        activeSection = section.id;
                        activeItem = item.id;
                        if (window.innerWidth < 768) {
                            isSidebarOpen = false;
                        }
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
        <main class="flex-1 overflow-y-auto bg-white dark:bg-zinc-950 p-4 md:p-8 transition-all duration-300 animate-on-scroll">
            <div class="max-w-3xl mx-auto">
                <div class="prose dark:prose-invert prose-amber max-w-none">
                    {@html getActiveContent()}
                </div>
            </div>
            
            <!-- Navegación entre páginas -->
            <div class="mt-12 border-t border-gray-200 dark:border-zinc-800 pt-6 flex justify-between">
                <button 
                class="flex items-center text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors duration-200"
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
                class="flex items-center text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors duration-200"
                on:click={() => {
                    const currentSection = docSections.find(s => s.id === activeSection);
                    if (!currentSection) return;
                    
                    const currentItemIndex = currentSection.items.findIndex(i => i.id === activeItem);
                    if (currentItemIndex < currentSection.items.length - 1) {
                    activeItem = currentSection.items[currentItemIndex + 1].id;
                    } else {
                    const sectionIndex = docSections.findIndex(s => s.id === activeSection);
                    if (sectionIndex < docSections.length - 1) {
                        activeSection = docSections[sectionIndex + 1].id;
                        activeItem = docSections[sectionIndex + 1].items[0].id;
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
        </main>
    </div>
    </div>
</div>

<style>
    /* Animaciones adicionales */
    .animate-in {
    animation-duration: 300ms;
    animation-fill-mode: both;
    }
    
    .slide-in-from-top {
    animation-name: slideInFromTop;
    }
    
    @keyframes slideInFromTop {
    from {
        transform: translateY(-10px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
    }
    
    .animate-on-scroll {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s, transform 0.6s;
    }
    
    
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