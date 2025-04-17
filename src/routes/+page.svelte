<script lang="ts">
    import { goto }     from '$app/navigation';
    import { onMount }  from 'svelte';

    import { authClient }       from "$lib";
    import { MicrosoftAuth }    from '$components';

    const session = authClient.useSession();

    type VisibleSection = {
        [key: string]  : boolean,
        hero        : boolean,
        features    : boolean,
        about       : boolean,
        cta         : boolean
    }

    let features = [
        {
            title: 'Formularios Personalizables',
            description: 'Crea y personaliza formularios según las necesidades específicas de cada departamento académico.',
            icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
        },
        {
            title: 'Análisis de Datos',
            description: 'Visualiza y analiza las respuestas recibidas con herramientas estadísticas integradas.',
            icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
        },
        {
            title: 'Integración Académica',
            description: 'Conecta con los sistemas existentes de la Universidad Adolfo Ibáñez.',
            icon: 'M13 10V3L4 14h7v7l9-11h-7z'
        },
        {
            title: 'Experiencia Responsive',
            description: 'Accede desde cualquier dispositivo con una experiencia de usuario optimizada.',
            icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
        }
    ];
    
    let isMenuOpen = false;
    
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    let visibleSections: VisibleSection = {
        hero: false,
        features: false,
        about: false,
        cta: false
    };
    
    onMount(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                if (sectionId && sectionId in visibleSections) {
                visibleSections[sectionId] = true;
                }
            }
            });
        }, { threshold: 0.1 });
        
        Object.keys(visibleSections).forEach(sectionId => {
            const element = document.getElementById(sectionId);
            if (element) observer.observe(element);
        });
    });
</script>

<div class="min-h-screen flex flex-col bg-gray-50 dark:bg-zinc-900">
    <main class="flex-grow">
    <!-- Hero Section -->
    <section id="hero" class="bg-gradient-to-r from-zinc-700 to-zinc-600 dark:from-zinc-950 dark:to-zinc-800 text-white py-20 px-4">
        <div class="container mx-auto text-center">
        <div class="transform transition-all duration-1000 {visibleSections.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">Bienvenido a Formulario Dinámico</h1>
            <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">La plataforma de la Universidad Adolfo Ibáñez para crear, gestionar y analizar formularios de manera eficiente.</p>
        </div>
        <div class="flex flex-col sm:flex-row justify-center gap-4 transform transition-all duration-1000 delay-300 {visibleSections.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
            {#if !$session.data}
                <div class="w-auto">
                    <MicrosoftAuth />
                </div>
            {:else}
                <button
                    class="bg-amber-600 dark:bg-amber-800 text-zinc-200 dark:text-zinc-300  font-semibold py-3 px-6 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg dark:hover:shadow-zinc-900/50"
                    on:click={() => goto('/form')}
                >
                    Comenzar ahora
                </button>
            {/if}

            <button
                class="bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-semibold py-1 px-6 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg dark:hover:shadow-zinc-900/50"
                on:click={() => goto('/docs')}
            >
                Conocer más
            </button>
        </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-16 px-4 bg-white dark:bg-zinc-800">
        <div class="container mx-auto">
        <h2
            class="text-3xl font-bold text-blue-500 text-center mb-12 transform transition-all duration-1000 {visibleSections.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}"
        >
            Características principales
        </h2>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {#each features as feature, i}
            <div class="bg-white dark:bg-zinc-700 rounded-lg p-6 shadow-md dark:shadow-zinc-800/50 hover:shadow-lg dark:hover:shadow-zinc-800/50 hover:-translate-y-1 transition-all duration-300 transform {visibleSections.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}" style="transition-delay: {i * 150}ms">
                <div class="w-12 h-12 bg-zinc-800 dark:bg-zinc-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500 dark:text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path class="stroke-gray-200" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={feature.icon} />
                </svg>
                </div>
                <h3 class="text-xl font-semibold mb-2 text-blue-500">{feature.title}</h3>
                <p class="text-gray-600 dark:text-zinc-300">{feature.description}</p>
            </div>
            {/each}
        </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-16 px-4 bg-gray-50 dark:bg-zinc-800">
        <div class="container mx-auto">
        <div class="flex flex-col md:flex-row items-center gap-12">
            <div class="md:w-1/2 transform transition-all duration-1000 {visibleSections.about ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}">
            <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-zinc-300">Acerca de Formulario Dinámico</h2>
            <p class="text-gray-700 dark:text-zinc-400 mb-4">
                Formulario Dinámico es una aplicación desarrollada específicamente para la Universidad Adolfo Ibáñez, 
                diseñada para simplificar la creación y gestión de formularios en el entorno académico.
            </p>
            <p class="text-gray-700 dark:text-zinc-400 mb-4">
                Nuestra plataforma permite a profesores, administrativos y estudiantes crear formularios personalizados
                para encuestas, evaluaciones, inscripciones y más, todo en un entorno seguro y fácil de usar.
            </p>
            <p class="text-gray-700 dark:text-zinc-400">
                Con herramientas de análisis integradas, podrás obtener insights valiosos de los datos recopilados
                para mejorar procesos y tomar decisiones informadas.
            </p>
            </div>
            <div class="md:w-1/2 transform transition-all duration-1000 delay-300 {visibleSections.about ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}">
            <div class="bg-white dark:bg-zinc-700 p-1 rounded-lg shadow-lg dark:shadow-zinc-800/50">
                <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Universidad Adolfo Ibáñez campus" 
                class="rounded-lg w-full h-auto"
                />
            </div>
            </div>
        </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section id="cta" class="py-16 px-4 bg-zinc-100 dark:bg-zinc-900">
        <div class="container mx-auto text-center transform transition-all duration-1000 {visibleSections.cta ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
            <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-zinc-300">¿Listo para comenzar?</h2>
            <p class="text-xl text-gray-700 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
                Únete a la comunidad de la Universidad Adolfo Ibáñez y comienza a crear formularios dinámicos hoy mismo.
            </p>

            {#if !$session.data}
                <div class="flex justify-center w-44 mx-auto">
                    <MicrosoftAuth />
                </div>
            {:else}
                <button
                    class="bg-zinc-900 dark:bg-zinc-800 hover:bg-blue-800 dark:hover:bg-zinc-700 text-white dark:text-zinc-300 font-semibold py-3 px-6 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg dark:hover:shadow-zinc-900/50"
                    on:click={() => goto('/form')}
                >
                    Crear mi primer formulario
                </button>
            {/if}
        </div>
    </section>
    </main>

    <!-- Footer -->
    <footer id="contact" class="bg-zinc-950 text-white py-12 px-4">
        <div class="container mx-auto">
            <div class="grid md:grid-cols-3 gap-8">
                <div>
                    <h3 class="text-xl font-semibold mb-4">Formulario Dinámico</h3>

                    <p class="text-gray-300 dark:text-zinc-400">
                        Una aplicación de la Universidad Adolfo Ibáñez para la gestión eficiente de formularios académicos.
                    </p>
                </div>

                <div>
                    <h3 class="text-xl font-semibold mb-4">Enlaces rápidos</h3>

                    <ul class="space-y-2 text-gray-300 dark:text-zinc-400">
                        <li><a href="#hero" class="hover:text-white dark:hover:text-zinc-300 transition-colors duration-200">Inicio</a></li>
                        <li><a href="#features" class="hover:text-white dark:hover:text-zinc-300 transition-colors duration-200">Características</a></li>
                        <li><a href="/docs" class="hover:text-white dark:hover:text-zinc-300 transition-colors duration-200">Documentación</a></li>
                        <li><a href="https://www.uai.cl" target="_blank" rel="noopener noreferrer" class="hover:text-white dark:hover:text-zinc-300 transition-colors duration-200">Sitio web UAI</a></li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-semibold mb-4">Contacto</h3>

                    <ul class="space-y-2 text-gray-300 dark:text-zinc-400">
                        <li>Email: formulario.dinamico@uai.cl</li>
                        <li>Teléfono: +56 2 2331 1000</li>
                        <li>Dirección: Diagonal las Torres 2640, Peñalolén, Santiago</li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</div>