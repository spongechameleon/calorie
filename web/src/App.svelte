<script lang="ts">
	import { onMount } from "svelte";
	import { SvelteToast } from "@zerodevx/svelte-toast";
	import { getGoal } from "./actions/goal";
	import { getMeals } from "./actions/meal";

	import Main from "./screens/Main.svelte";

	let toastOptions = {};

	// load goal, meal history
	onMount(() => {
		getGoal();
		getMeals();
	});
</script>

<main>
	<Main />
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
