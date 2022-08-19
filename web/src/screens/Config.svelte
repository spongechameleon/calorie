<script lang="ts">
  import Goal from "../components/Goal.svelte";
  import History from "../components/meal/History.svelte";
  import Toggle from "../components/Toggle.svelte";
  import NewMeal from "../components/meal/New.svelte";
  import type { Ingredient, Meal } from "../types";
  import { savedIngredientsS, savedMealsS } from "../stores";
  import {
    addSavedMeal,
    deleteSavedMeal,
    updateSavedMeal,
  } from "../actions/savedMeal";
  import { goToMain } from "../actions/page";
  import Split from "./Split.svelte";
  import { lsManualReset } from "../actions/persistence/localStorage";
  import NewIngredient from "../components/ingredient/New.svelte";

  let showMeal = true;
  function toggleSwitch() {
    showMeal = !showMeal;
  }

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
  <Goal slot="TopLeft" />

  <History
    slot="BottomLeft"
    title="Saved Meals"
    meals={savedMeals}
    updateMeal={updateSavedMeal}
    deleteMeal={deleteSavedMeal}
  />

  <div slot="Right">
    <Toggle {toggleSwitch} leftText="Meals" rightText="Ingredients" />
    {#if showMeal}
      <NewMeal title="Save Meal" addMeal={addSavedMeal} autofillMeals={null} />
    {:else}
      <NewIngredient title="Save Ingredient" autofillIngredients={null} />
    {/if}
  </div>

  <svelte:fragment slot="Actions">
    {#if window.location.hostname === "localhost"}
      <button on:click={lsManualReset} class="actionButton">Reset data</button>
    {/if}
    <button on:click={goToMain} class="actionButton"
      ><i class="home" /> Home</button
    >
  </svelte:fragment>
</Split>

<style>
  .home {
    background-image: url("/home.png");
  }
</style>
