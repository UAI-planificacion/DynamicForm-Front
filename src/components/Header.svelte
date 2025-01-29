<script lang="ts">
	import { fly } from "svelte/transition";

	import { Avatar, DropdownMenu } from "bits-ui";

	import { Switch, ToggleTheme, MicrosoftAuth } 	from "$components";
	import { dynamicMode, toggleTheme, theme  } 	from "$stores";


	export let loadingStatus: Avatar.Props["loadingStatus"] = undefined;
</script>


<header class="h-20 flex bg-slate-50 dark:bg-zinc-800 w-full py-5 px-8 xl:px-40 justify-between items-center shadow-lg">
	<h1 class="text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent font-bold">
		Formulario Dinámico
	</h1>

	<MicrosoftAuth />

	<div class="flex items-center gap-3">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				class= "flex items-center gap-4 w-full transition-colors"
			>
				<span class=" font-semibold dark:text-zinc-100">
					Nombre del usuario
				</span>

				<Avatar.Root
					bind:loadingStatus
					class="h-12 w-12 rounded-full border-2 hover:brightness-110 hover:border-amber-500/80 cursor-pointer border-amber-500 {loadingStatus === 'loaded'
						? 'border-foreground'
						: 'border-transparent'} bg-muted text-[17px] font-medium uppercase text-muted-foreground"
				>
					<div class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-transparent">
						<Avatar.Image 
							src="https://media.solotodo.com/media/products/1250076_picture_1602918085.png" 
							alt="User avatar" 
						/>
						<Avatar.Fallback class="border border-muted">UA</Avatar.Fallback>
					</div>
				</Avatar.Root>
			</DropdownMenu.Trigger>

			<DropdownMenu.Content
				class="w-full max-w-[229px] transition-colors rounded-xl border border-muted dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 shadow-lg"
				transition={fly}
				sideOffset={8}
			>
				<DropdownMenu.Item class="flex h-12 select-none items-center rounded-lg py-3 text-sm font-medium data-[highlighted]:bg-muted">
					<div 
						class		= "flex items-center justify-between w-full rounded-lg px-2 py-1 "
						on:click	= {(event) => {
							const target = event.target as HTMLElement;

							if ( !target.closest( '.switch-component' )) {
								$dynamicMode = !$dynamicMode;
							}
						}}
						on:keydown	= {( event ) => event.key === 'Enter' && ( $dynamicMode = !$dynamicMode )}
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
						on:click	= {toggleTheme}
						on:keydown	= {(e) => e.key === 'Enter' && toggleTheme()}
						role		= "button"
						tabindex	= "0"
					>
						<span class="text-zinc-900 dark:text-zinc-200">Tema:
							<span class="text-sky-500">
								{$theme}
							</span>
						</span>
							<ToggleTheme />
						</div>
				</DropdownMenu.Item>

				<DropdownMenu.Separator class="my-2 h-px bg-zinc-200 dark:bg-zinc-700" />

				<DropdownMenu.Item class="flex h-12 select-none items-center rounded-lg py-3 text-sm font-medium data-[highlighted]:bg-muted">
					<button class="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#2F2F2F] hover:bg-[#272727] text-white rounded-lg transition-colors">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 23 23">
							<path fill="currentColor" d="M11.5 12.5v-6h11v6zm0 11v-6h11v6zm-11-11v-6h6v6zm0 11v-6h6v6z"/>
						</svg>
						<span>Iniciar con Microsoft</span>
					</button>
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</header>
