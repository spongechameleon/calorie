<script lang="ts">
	import { SvelteToast } from "@zerodevx/svelte-toast";

	import Main from "./screens/Main.svelte";
	import Config from "./screens/Config.svelte";
	import { pageS } from "./stores";
	import { PAGES } from "./actions/page";
	import { initData } from "./actions/init";

	let toastOptions = {};

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
		max-width: 240px;
		margin: 0 10vw;
		background-color: white;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
