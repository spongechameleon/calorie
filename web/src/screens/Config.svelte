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
  import Split from "./Split.svelte";
  import { lsManualReset } from "../actions/persistence/localStorage";

  let savedMeals: Meal[];
  savedMealsS.subscribe((v) => {
    savedMeals = v;
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
  <New
    slot="Right"
    title="Save Meal"
    addMeal={addSavedMeal}
    autofillMeals={null}
  />
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
