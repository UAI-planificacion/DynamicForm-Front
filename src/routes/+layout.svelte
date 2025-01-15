<script lang="ts">
	import '../app.css';

	import { Footer, Header } from '$components';


	let { children } = $props();
</script>


<main class="flex flex-col min-h-screen bg-white dark:bg-zinc-900">
	<Header />

	<main class="container mx-auto flex-grow mt-5">
		{@render children()}
	</main>

	<Footer />
</main>
