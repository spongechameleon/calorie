<script lang="ts">
  import { prec } from "../util";

  import type { Meal, UpdateMeal, DeleteMeal } from "../types";

  export let title: string;
  export let meals: Meal[];
  export let updateMeal: UpdateMeal;
  export let deleteMeal: DeleteMeal;

  let editId: number | undefined;
</script>

<h1>{title}</h1>
<div class="grid">
  {#each meals as meal}
    <div>
      {#if editId !== meal.id}
        <!-- Regular display -->
        <h3>{meal.name}</h3>
        <p>Calories {meal.calories}</p>
        <p>Protein {meal.protein}</p>
        <p class="ratio">c/p {prec(meal.calories / meal.protein)}</p>
        <button on:click={() => (editId = meal.id)}>Edit</button>
        <button on:click={() => deleteMeal(meal.id)}>Delete</button>
      {:else}
        <!-- Editing display -->
        <input type="text" name="meal.name" id="" bind:value={meal.name} />
        <label for="meal-calories"
          >Calories
          <input
            type="number"
            name="meal.calories"
            bind:value={meal.calories}
            id="meal-calories"
          />
        </label>
        <label for="meal-protein"
          >Protein
          <input
            type="number"
            name="meal.protein"
            bind:value={meal.protein}
            id="meal-protein"
          />
        </label>
        <button
          on:click={() => {
            updateMeal(meal);
            editId = undefined;
          }}>Save</button
        >
        <button on:click={() => (editId = undefined)}>Cancel</button>
      {/if}
    </div>
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 2vw;
    row-gap: 2vh;
  }
  @media (max-width: 1200px) {
    .grid {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
