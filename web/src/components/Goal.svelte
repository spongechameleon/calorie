<script lang="ts">
  import { updateGoal } from "../actions/goal";
  import { goalS } from "../stores";
  import type { Goal } from "../types";

  let goal: Goal;
  goalS.subscribe((v) => {
    goal = v;
  });

  let edit = false;
</script>

<h1>Daily Goal</h1>
{#if edit}
  <label for="goal-calories"
    >Calories
    <input
      type="number"
      name="goal.calories"
      bind:value={goal.calories}
      id="goal-calories"
    />
  </label>
  <label for="goal-protein"
    >Protein
    <input
      type="number"
      name="goal.protein"
      bind:value={goal.protein}
      id="goal-protein"
    />
  </label>
  <button
    on:click={() => {
      updateGoal(goal);
      edit = false;
    }}>Save</button
  >
  <button on:click={() => (edit = false)}>Cancel</button>
{:else}
  <div>
    <h2>Calories {goal.calories}</h2>
    <h2>Protein {goal.protein}</h2>
    <button on:click={() => (edit = true)}>Edit</button>
  </div>
{/if}

<style>
  h1 {
    color: blue;
  }
  h2 {
    font-weight: normal;
  }
</style>
