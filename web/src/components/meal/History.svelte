<script lang="ts">
  import { displayPrec } from "../../util";

  import type { Meal, UpdateMeal, DeleteMeal } from "../../types";

  export let title: string;
  export let meals: Meal[];
  export let updateMeal: UpdateMeal;
  export let deleteMeal: DeleteMeal;

  let editId: number | undefined;
</script>

<h1 class="sectionTitle">{title}</h1>
<div class="historyGrid">
  {#each meals as meal}
    <div class="historyGridItem">
      {#if editId !== meal.id}
        <!-- Regular display -->
        <h3>{meal.name}</h3>
        <p>Calories {meal.calories}</p>
        <p>Protein {meal.protein}</p>
        <p class="ratio">c/p {displayPrec(meal.calories / meal.protein)}</p>
        <button on:click={() => (editId = meal.id)}>Edit</button>
        <button on:click={() => deleteMeal(meal.id)}>Delete</button>
      {:else}
        <!-- Editing display -->
        <label for="meal-name"
          >Name
          <input
            type="text"
            name="meal.name"
            bind:value={meal.name}
            id="meal-name"
          />
        </label>
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
</style>
