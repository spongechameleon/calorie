<script lang="ts">
  import New from "../components/New.svelte";
  import History from "../components/History.svelte";
  import type { Meal } from "../types";
  import { savedMealsS } from "../stores";
  import {
    addSavedMeal,
    deleteSavedMeal,
    updateSavedMeal,
  } from "../actions/savedMeal";
  import Goal from "../components/Goal.svelte";
  import { goToMain } from "../actions/page";

  let savedMeals: Meal[];
  savedMealsS.subscribe((v) => {
    savedMeals = v;
  });
</script>

<section>
  <Goal />
</section>

<section>
  <History
    title="Saved Meals"
    meals={savedMeals}
    updateMeal={updateSavedMeal}
    deleteMeal={deleteSavedMeal}
  />
</section>

<section>
  <New title="New Meal" addMeal={addSavedMeal} autofillMeals={null} />
</section>

<button on:click={goToMain}>Main</button>

<style>
</style>
