<script lang="ts">
	import { onMount } from "svelte";
	import { SvelteToast } from "@zerodevx/svelte-toast";
	import { getGoal } from "./actions/goal";
	import { getMeals } from "./actions/meal";
	import { getSavedMeals } from "./actions/savedMeal";

	import Main from "./screens/Main.svelte";
	import Config from "./screens/Config.svelte";

	let toastOptions = {};
	let goToConfig = false;

	onMount(() => {
		getGoal();
		getMeals();
		getSavedMeals();

		if (window.location.pathname === "/config") {
			goToConfig = true;
		}
	});
</script>

<main>
	{#if goToConfig}
		<Config />
	{:else}
		<Main />
	{/if}
</main>

<SvelteToast options={toastOptions} />

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
