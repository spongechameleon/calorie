<script lang="ts">
  import type { Meal } from "../types";

  export let meals: Meal[];
</script>

<h1>Today's Meals</h1>
{#each meals as meal}
  <div>
    <h3>{meal.name}</h3>
    <p>Calories {meal.calories}</p>
    <p>Protein {meal.protein}</p>
  </div>
{/each}

<style>
</style>
