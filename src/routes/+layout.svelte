<script lang="ts">
	import '../app.css';

	import { Footer, Header } from '$components';


	let { children } = $props();
</script>


<main class="flex flex-col min-h-screen bg-white dark:bg-zinc-900">
	<Header />

	<main class="flex-grow">
		{@render children()}
	</main>

	<Footer />
</main>

<style>
	:global(*) {
		user-select: none;
	}

    :global(*::-webkit-scrollbar) {
        width: 8px;
        height: 8px;
    }

    :global(*::-webkit-scrollbar-track) {
        background: transparent;
        border-radius: 0.5rem;
    }

    :global(*::-webkit-scrollbar-thumb) {
        background-color: #94a3b8;
        border-radius: 0.5rem;
    }

    :global(.dark *::-webkit-scrollbar-thumb) {
        background-color: #475569;
    }

    :global(*::-webkit-scrollbar-thumb:hover) {
        background-color: #64748b;
    }

    :global(.dark *::-webkit-scrollbar-thumb:hover) {
        background-color: #334155;
    }
</style>
