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
    <button on:click={goToMain}>Main -></button>
    {#if window.location.hostname === "localhost"}
      <button on:click={lsManualReset}>Reset data</button>
    {/if}
  </svelte:fragment>
</Split>

<style>
</style>
