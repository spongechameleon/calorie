<script lang="ts">
  import { addNewMeal } from "../actions/meal";

  import type { MealDto } from "../types";
  import { mkMealDto } from "../types";

  let newMealDto: MealDto = mkMealDto();

  let handleSubmit = async () => {
    const r = await addNewMeal(newMealDto);
    if (r.ok) {
      // reset newMeal
      newMealDto = mkMealDto();
    }
  };
</script>

<h1>New Meal</h1>
<form on:submit|preventDefault={handleSubmit} method="post">
  <label for="new-meal-name"
    >Name
    <input
      type="text"
      name="newMeal.name"
      bind:value={newMealDto.name}
      id="new-meal-name"
    />
  </label>
  <label for="new-meal-calories"
    >Calories
    <input
      type="number"
      name="newMeal.calories"
      bind:value={newMealDto.calories}
      id="new-meal-calories"
    />
  </label>
  <label for="new-meal-protein"
    >Protein
    <input
      type="number"
      name="newMeal.protein"
      bind:value={newMealDto.protein}
      id="new-meal-protein"
    />
  </label>
  <input type="submit" value="Add Meal" />
</form>

<style>
</style>
