<script lang="ts">
  import { addNewMeal } from "../actions/meal";
  import { mealsS } from "../stores";

  import type { Meal } from "../types";
  import { mkMeal } from "../types";

  let newMeal: Meal = mkMeal();

  let error: string;

  let handleSubmit = async () => {
    const r = await addNewMeal(newMeal);
    if (r.ok) {
      // push r.value to meal history
      mealsS.update((meals) => {
        meals.push(r.value);
        return meals;
      });
      // reset newMeal
      newMeal = mkMeal();
    }
    // display r.err
    error = r.err;
  };
</script>

<h1>New Meal</h1>
<form on:submit|preventDefault={handleSubmit} method="post">
  <label for="new-meal-name"
    >Name
    <input
      type="text"
      name="newMeal.name"
      bind:value={newMeal.name}
      id="new-meal-name"
    />
  </label>
  <label for="new-meal-calories"
    >Calories
    <input
      type="number"
      name="newMeal.calories"
      bind:value={newMeal.calories}
      id="new-meal-calories"
    />
  </label>
  <label for="new-meal-protein"
    >Protein
    <input
      type="number"
      name="newMeal.protein"
      bind:value={newMeal.protein}
      id="new-meal-protein"
    />
  </label>
  <input type="submit" value="Add Meal" />
</form>
{#if error}
  <p>{error}</p>
{/if}

<style>
</style>
