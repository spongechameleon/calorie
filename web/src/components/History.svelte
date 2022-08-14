<script lang="ts">
  import { mealsS } from "../stores";

  import type { Meal } from "../types";

  let meals: Meal[];
  mealsS.subscribe((v) => {
    meals = v;
  });
</script>

<h1>Today's Meals</h1>
<div class="grid">
  {#each meals as meal}
    <div>
      <h3>{meal.name}</h3>
      <p>Calories {meal.calories}</p>
      <p>Protein {meal.protein}</p>
    </div>
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
</style>
