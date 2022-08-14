<script lang="ts">
  import History from "../components/History.svelte";
  import New from "../components/New.svelte";
  import Overview from "../components/Overview.svelte";
  import { lsManualReset } from "../actions/persistence/localStorage";
  import { addMeal, deleteMeal, updateMeal } from "../actions/meal";
  import type { Meal } from "../types";
  import { mealsS, savedMealsS } from "../stores";
  import { goToConfig } from "../actions/page";

  let meals: Meal[];
  mealsS.subscribe((v) => {
    meals = v;
  });

  let savedMeals: Meal[];
  savedMealsS.subscribe((v) => {
    savedMeals = v;
  });
</script>

<section>
  <Overview />
</section>

<section>
  <New title="New Meal" {addMeal} autofillMeals={savedMeals} />
</section>

<section>
  <History title="Today's Meals" {meals} {updateMeal} {deleteMeal} />
</section>

<button on:click={lsManualReset}>Reset data</button>
<button on:click={goToConfig}>Config</button>

<style>
  section {
    margin-bottom: 5vh;
  }
</style>
