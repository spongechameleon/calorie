<script lang="ts">
  import type { Ingredient } from "../../types";
  import { ServingUnit } from "../../types";

  export let title: string;
  export let ingredients: Ingredient[];
  export let updateIngredient: Function;
  export let deleteIngredient: Function;

  let editId: number | undefined;
</script>

<h1 class="sectionTitle">{title}</h1>
<div class="historyGrid">
  {#each ingredients as igr}
    <div class="historyGridItem">
      <!-- Regular display -->
      {#if editId !== igr.id}
        <h3>{igr.name}</h3>
        <p>
          Serving Size {igr.servingSize}{igr.servingSizeUnit}
        </p>
        <p>Calories {igr.servingCalories}</p>
        <p>Protein {igr.servingProtein}</p>
        <button on:click={() => (editId = igr.id)}>Edit</button>
        <button on:click={() => deleteIngredient(igr.id)}>Delete</button>
      {:else}
        <!-- Editing display -->
        <label for="igr-name"
          >Name
          <input
            type="text"
            name="igr.name"
            bind:value={igr.name}
            id="igr-name"
          />
        </label>
        <label for="igr-servingSize"
          >Serving Size
          <input
            type="number"
            name="igr.servingSize"
            bind:value={igr.servingSize}
            id="igr-servingSize"
          />
          <select
            name="igr.servingSizeUnit"
            id="igr-servingSizeUnit"
            bind:value={igr.servingSizeUnit}
          >
            {#each Object.entries(ServingUnit) as [e, s]}
              <option value={e}>{s}</option>
            {/each}
          </select>
        </label>
        <label for="igr-servingCalories"
          >Serving Calories
          <input
            type="number"
            name="igr.servingCalories"
            bind:value={igr.servingCalories}
            id="igr-servingCalories"
          />
        </label>
        <label for="igr-servingProtein"
          >Serving Protein
          <input
            type="number"
            name="igr.servingProtein"
            bind:value={igr.servingProtein}
            id="igr-servingProtein"
          />
        </label>
        <button
          on:click={() => {
            updateIngredient(igr);
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
