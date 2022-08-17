<script lang="ts">
	import { SvelteToast } from "@zerodevx/svelte-toast";

	import Main from "./screens/Main.svelte";
	import Config from "./screens/Config.svelte";
	import { pageS } from "./stores";
	import { PAGES } from "./actions/page";
	import { initData } from "./actions/init";

	let toastOptions = {
		duration: 2000,
		reversed: true,
		pausable: true,
	};

	initData();

	let page = "main";
	pageS.subscribe((v) => {
		page = v;
	});
</script>

<main>
	{#if page === PAGES.main}
		<Main />
	{:else if page === PAGES.config}
		<Config />
	{/if}
</main>

<SvelteToast options={toastOptions} />

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 10vw;
		background-color: white;
	}

	@media (max-width: 1200px) {
		main {
			margin: 0 8vw;
		}
	}

	@media (max-width: 600px) {
		main {
			margin: 0;
			border: 4px solid #ccc;
		}
	}
</style>
