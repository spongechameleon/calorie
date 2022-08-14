<script lang="ts">
  import { mkDateString, type Meal, type MealDto } from "../types";
  import { mkMealDto } from "../types";

  export let title: string;
  export let addMeal: Function;
  export let autofillMeals: Meal[] | null;

  let newMealDto: MealDto = mkMealDto();

  let handleSubmit = async () => {
    const r = await addMeal(newMealDto);
    if (r.ok) {
      // reset newMeal
      newMealDto = mkMealDto();
    }
  };

  let handleAutofillChange = (e) => {
    const v = JSON.parse(e.target.value);
    if (v === null) {
      newMealDto = {
        name: "",
        calories: 0,
        protein: 0,
        date: mkDateString(),
      };
    } else {
      const { name, calories, protein } = v;
      newMealDto = { name, calories, protein, date: mkDateString() };
    }
  };
</script>

<h1>{title}</h1>
{#if autofillMeals && autofillMeals.length > 0}
  <select name="" id="" on:change={handleAutofillChange}>
    <option value={null}>-</option>
    {#each autofillMeals as savedMeal}
      <option value={JSON.stringify(savedMeal)}>{savedMeal.name}</option>
    {/each}
  </select>
{/if}
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
