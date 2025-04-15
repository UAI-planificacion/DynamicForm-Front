<script lang="ts">
	import { Avatar, DropdownMenu }         from "bits-ui";
    import { BookCopy, BookOpen, HomeIcon } from "lucide-svelte";

    import { Switch, ToggleTheme, MicrosoftAuth } 	from "$components";
	import { dynamicMode, toggleTheme, theme  } 	from "$stores";
    import { authClient }                           from "$lib";


    let loadingStatus = $state<Avatar.RootProps["loadingStatus"]>("loading");

    const session = authClient.useSession();
</script>

<header class="bg-black shadow-sm sticky top-0 z-10 px-4">
    <div class="container mx-auto py-4 flex justify-between items-center">
        <div class="flex items-center space-x-2">
            <h1 class="text-lg sm:text-lg md:text-2xl bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent font-bold">
                Formulario Dinámico
            </h1>

            <h2 class="hidden sm:block text-sm sm:text-base bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent font-bold mt-1">
                | UAI
            </h2>
        </div>

        <nav class="flex space-x-8 items-center">
            <a href="/" class="hidden md:block text-zinc-300 hover:no-underline dark:text-zinc-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-blue-500 after:transition-all hover:after:w-full">Inicio</a>
            <a href="/docs" class="hidden md:block text-zinc-300 hover:no-underline dark:text-zinc-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-blue-500 after:transition-all hover:after:w-full">Documentación</a>
            {#if $session.data}
                <a href="/form" class="hidden md:block text-zinc-300 hover:no-underline dark:text-zinc-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-blue-500 after:transition-all hover:after:w-full">Formulario</a>
            {/if}

            <DropdownMenu.Root>
                <DropdownMenu.Trigger
                    class= "flex items-center gap-4 w-full transition-colors"
                >
                    <Avatar.Root
                        bind:loadingStatus
                        class="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 hover:brightness-110 hover:border-blue-500/80 cursor-pointer border-blue-500 {loadingStatus === 'loaded'
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
                    sideOffset={18}
                    align="end"
                    alignOffset={20}
                    side="top"
                >

                    {#if $session.data}
                        <DropdownMenu.Item class="flex h-10 select-none items-center rounded-lg py-3 text-sm font-medium data-[highlighted]:bg-muted">
                            <span class="text-sm lg:text-lg dark:text-zinc-100 mx-auto">
                                {$session.data.user?.name}
                            </span>
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator class="my-2 h-px bg-zinc-200 dark:bg-zinc-700" />
                    {/if}

                    <DropdownMenu.Item class="flex md:hidden h-10 select-none items-center rounded-lg py-3 text-sm font-medium data-[highlighted]:bg-muted">
                        <a
                            href="/"
                            class= "flex items-center w-full rounded-lg gap-2 py-1"
                        >
                            <HomeIcon class="text-zinc-900 dark:text-zinc-200" />
                            <span class="text-zinc-900 dark:text-zinc-200">Inicio</span>
                        </a>
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator class="flex md:hidden my-2 h-px bg-zinc-200 dark:bg-zinc-700" />

                    <DropdownMenu.Item class="flex md:hidden h-10 select-none items-center rounded-lg py-3 text-sm font-medium data-[highlighted]:bg-muted">
                        <a
                            href="/docs"
                            class= "flex items-center w-full rounded-lg gap-2 py-1"
                        >
                            <BookOpen class="text-zinc-900 dark:text-zinc-200" />
                            <span class="text-zinc-900 dark:text-zinc-200">Documentación</span>
                        </a>
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator class="flex md:hidden my-2 h-px bg-zinc-200 dark:bg-zinc-700" />

                    {#if $session.data}
                        <DropdownMenu.Item class="flex md:hidden h-10 select-none items-center rounded-lg py-3 text-sm font-medium data-[highlighted]:bg-muted">
                            <a
                                href="/form"
                                class= "flex items-center w-full rounded-lg gap-2 py-1"
                            >
                                <BookCopy class="text-zinc-900 dark:text-zinc-200" />
                                <span class="text-zinc-900 dark:text-zinc-200">Formulario</span>
                            </a>
                        </DropdownMenu.Item>

                        <DropdownMenu.Separator class="flex md:hidden my-2 h-px bg-zinc-200 dark:bg-zinc-700" />
                    {/if}

                    {#if $session.data}
                        <DropdownMenu.Item class="flex h-10 md:h-12 select-none items-center rounded-lg py-3 text-sm font-medium data-[highlighted]:bg-muted">
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
                    {/if}

                    <DropdownMenu.Item class="flex h-10 md:h-12 select-none items-center rounded-lg py-3 text-sm font-medium data-[highlighted]:bg-muted">
                        <div 
                            class		= "flex items-center justify-between w-full rounded-lg px-2 py-1 transition-colors"
                            onclick	= {toggleTheme}
                            onkeydown	= {(e) => e.key === 'Enter' && toggleTheme()}
                            role		= "button"
                            tabindex	= "0"
                        >
                            <span class="text-zinc-900 dark:text-zinc-200">Tema:
                                <span class="text-blue-500">
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
    </div>
</header>