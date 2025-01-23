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
        background: white; /* white for light mode */
        border-radius: 0.5rem;
    }

    :global(*::-webkit-scrollbar-thumb) {
        background-color: rgb(228 228 231); /* bg-zinc-200 for light mode */
        border-radius: 0.5rem;
    }

    :global(.dark *::-webkit-scrollbar-track) {
        background: rgb(24 24 27); /* bg-zinc-900 */
    }

    :global(.dark *::-webkit-scrollbar-thumb) {
        background-color: rgb(39 39 42); /* bg-zinc-800 */
    }

    :global(*::-webkit-scrollbar-thumb:hover) {
        background-color: rgb(212 212 216); /* bg-zinc-300 for light mode */
    }

    :global(.dark *::-webkit-scrollbar-thumb:hover) {
        background-color: rgb(63 63 70); /* bg-zinc-700 for dark mode */
    }
</style>
