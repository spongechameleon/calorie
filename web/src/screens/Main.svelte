<script lang="ts">
  import Overview from "../components/Overview.svelte";
  import History from "../components/meal/History.svelte";
  import New from "../components/meal/New.svelte";
  import { lsManualReset } from "../actions/persistence/localStorage";
  import { addMeal, deleteMeal, updateMeal } from "../actions/meal";
  import type { Ingredient, Meal } from "../types";
  import { mealsS, savedIngredientsS, savedMealsS } from "../stores";
  import { goToConfig } from "../actions/page";
  import Split from "./Split.svelte";

  let meals: Meal[];
  mealsS.subscribe((v) => {
    meals = v;
  });

  let savedMeals: Meal[];
  savedMealsS.subscribe((v) => {
    savedMeals = v;
  });

  let savedIngredients: Ingredient[];
  savedIngredientsS.subscribe((v) => {
    savedIngredients = v;
  });
</script>

<Split>
  <Overview slot="TopLeft" />

  <History
    slot="BottomLeft"
    title="Today's Meals"
    {meals}
    {updateMeal}
    {deleteMeal}
  />

  <div slot="Right">
    <New
      title="Add Meal"
      {addMeal}
      autofillMeals={savedMeals}
      autofillIngredients={savedIngredients}
    />
  </div>

  <svelte:fragment slot="Actions">
    {#if window.location.hostname === "localhost"}
      <button on:click={lsManualReset} class="actionButton">Reset data</button>
    {/if}
    <button on:click={goToConfig} class="actionButton"
      ><i class="gear" /> Configuration</button
    >
  </svelte:fragment>
</Split>

<style>
  .gear {
    background-image: url("/gear.png");
  }
</style>
