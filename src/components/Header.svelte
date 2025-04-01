<script lang="ts">
	import { Avatar, DropdownMenu } from "bits-ui";

    import { Switch, ToggleTheme, MicrosoftAuth } 	from "$components";
	import { dynamicMode, toggleTheme, theme  } 	from "$stores";
    import { authClient }                           from "$lib";

    let isMenuOpen      = $state( false );
    let loadingStatus   = $state<Avatar.RootProps["loadingStatus"]>("loading");

    const toggleMenu    = () => isMenuOpen = !isMenuOpen;
    const session       = authClient.useSession();
</script>

<header class="bg-black shadow-sm dark:shadow-zinc-800/50 sticky top-0 z-10">
    <div class="container mx-auto py-4 flex justify-between items-center">
        <div class="flex items-center space-x-2">
            <h1 class="text-xl sm:text-lg md:text-2xl bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent font-bold">
                Formulario Dinámico
            </h1>

            <h2 class="text-sm sm:text-base bg-gradient-to-r from-gray-100 to-gray-400/90 bg-clip-text text-transparent font-bold">
                | UAI
            </h2>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8 items-center">
            <a href="/" class="text-zinc-300 hover:no-underline dark:text-zinc-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-blue-500 after:transition-all hover:after:w-full">Inicio</a>
            <a href="/docs" class="text-zinc-300 hover:no-underline dark:text-zinc-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-blue-500 after:transition-all hover:after:w-full">Documentación</a>
            {#if $session.data}
                <a href="/form" class="text-zinc-300 hover:no-underline dark:text-zinc-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-blue-500 after:transition-all hover:after:w-full">Formulario</a>
            {/if}

            <DropdownMenu.Root>
                <DropdownMenu.Trigger
                    class= "flex items-center gap-4 w-full transition-colors"
                >
                    <Avatar.Root
                        bind:loadingStatus
                        class="h-12 w-12 rounded-full border-2 hover:brightness-110 hover:border-amber-500/80 cursor-pointer border-amber-500 {loadingStatus === 'loaded'
                            ? 'border-foreground'
                            : 'border-transparent'} bg-muted text-[17px] font-medium uppercase text-muted-foreground"
                    >
                        <div class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-transparent">
                            <Avatar.Image 
                                src={$session?.data?.user?.image || '/user.svg'} 
                                alt="User avatar" 
                            />
                            <Avatar.Fallback class="border border-muted">UA</Avatar.Fallback>
                        </div>
                    </Avatar.Root>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content
                    class="w-72 z-50 transition-colors rounded-xl border border-muted dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 shadow-lg"
                    sideOffset={15}
                    align="end"
                >

                    {#if $session.data}
                        <DropdownMenu.Item class="flex h-10 select-none items-center rounded-lg py-3 text-sm font-medium data-[highlighted]:bg-muted">
                            <span class="text-lg dark:text-zinc-100 mx-auto">
                                {$session.data.user?.name}
                            </span>
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator class="my-2 h-px bg-zinc-200 dark:bg-zinc-700" />
                    {/if}

                    <DropdownMenu.Item class="flex h-12 select-none items-center rounded-lg py-3 text-sm font-medium data-[highlighted]:bg-muted">
                        <div 
                            class		= "flex items-center justify-between w-full rounded-lg px-2 py-1 "
                            onclick	= {(event) => {
                                const target = event.target as HTMLElement;

                                if ( !target.closest( '.switch-component' )) {
                                    $dynamicMode = !$dynamicMode;
                                }
                            }}
                            onkeydown	= {( event ) => event.key === 'Enter' && ( $dynamicMode = !$dynamicMode )}
                            role		= "button"
                            tabindex	= "0"
                        >
                            <span class="text-zinc-900 dark:text-zinc-200">Modo Dinámico</span>
                            <div class="switch-component">
                                <Switch bind:checked={$dynamicMode} />
                            </div>
                        </div>
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator class="my-2 h-px bg-zinc-200 dark:bg-zinc-700" />

                    <DropdownMenu.Item class="flex h-12 select-none items-center rounded-lg py-3 text-sm font-medium data-[highlighted]:bg-muted">
                        <div 
                            class		= "flex items-center justify-between w-full rounded-lg px-2 py-1 transition-colors"
                            onclick	= {toggleTheme}
                            onkeydown	= {(e) => e.key === 'Enter' && toggleTheme()}
                            role		= "button"
                            tabindex	= "0"
                        >
                            <span class="text-zinc-900 dark:text-zinc-200">Tema:
                                <span class="text-amber-500">
                                    {$theme ===  'dark' ? 'Oscuro' : 'Claro' }
                                </span>
                            </span>
                                <ToggleTheme />
                            </div>
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator class="my-2 h-px bg-zinc-200 dark:bg-zinc-700" />

                    <DropdownMenu.Item class="flex h-12 select-none items-center rounded-lg py-3 text-sm font-medium data-[highlighted]:bg-muted">
                        <MicrosoftAuth scale={false} />
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </nav>

        <!-- Mobile Menu Button -->
        <button class="md:hidden text-gray-700 dark:text-zinc-300" onclick={toggleMenu} aria-label="Menú">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
        </button>
    </div>

    <!-- Mobile Navigation -->
    {#if isMenuOpen}
        <div class="md:hidden bg-white dark:bg-zinc-800 py-2 px-4 shadow-md dark:shadow-zinc-800/50">
            <nav class="flex flex-col space-y-3">
                <a href="/" class="py-2 text-zinc-300 hover:text-blue-900 dark:hover:text-blue-400" onclick={toggleMenu}>Inicio</a>
                <a href="/docs" class="py-2 text-zinc-300 hover:text-blue-900 dark:hover:text-blue-400" onclick={toggleMenu}>Documentación</a>
                <a href="/form" class="py-2 text-zinc-300 hover:text-blue-900 dark:hover:text-blue-400" onclick={toggleMenu}>Formulario</a>
            </nav>
        </div>
    {/if}
</header>