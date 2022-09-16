<script lang="ts">
  import { displayPrec } from "../../util";

  import {
    mkIngredientDto,
    ServingUnit,
    type Ingredient,
    type IngredientDto,
  } from "../../types";
  import { addSavedIngedient } from "../../actions/ingredient";

  export let title: string;
  export let autofillIngredients: Ingredient[] | null;

  let newIngredientDto: IngredientDto = mkIngredientDto();

  let handleSubmit = async () => {
    const r = await addSavedIngedient(newIngredientDto);
    if (r.ok) {
      // reset newMeal
      newIngredientDto = mkIngredientDto();
    }
  };

  let handleAutofillChange = (e: any) => {
    const v = JSON.parse(e.target.value);
    if (v === null) {
      newIngredientDto = mkIngredientDto();
    } else {
      const {
        name,
        servingSize,
        servingSizeUnit,
        servingCalories,
        servingProtein,
      } = v;
      newIngredientDto = {
        name,
        servingSize,
        servingSizeUnit,
        servingCalories,
        servingProtein,
      };
    }
  };
</script>

<h1 class="sectionTitle">{title}</h1>
{#if autofillIngredients && autofillIngredients.length > 0}
  <label for="saved">Saved Ingredients</label>
  <select name="saved" id="saved" on:change={handleAutofillChange}>
    <option value={null}>-</option>
    {#each autofillIngredients as savedIgr}
      <option value={JSON.stringify(savedIgr)}>{savedIgr.name}</option>
    {/each}
  </select>
{/if}
<form on:submit|preventDefault={handleSubmit} method="post">
  <label for="new-igr-name"
    >Name
    <input
      type="text"
      name="newIgr.name"
      bind:value={newIngredientDto.name}
      id="new-igr-name"
    />
  </label>
  <label for="new-igr-serving-size"
    >Serving Size
    <input
      type="number"
      name="newIgr.servingSize"
      bind:value={newIngredientDto.servingSize}
      id="new-igr-serving-size"
    />
  </label>
  <label for="new-igr-serving-unit">
    <select name="newIgr.servingSizeUnit" id="new-igr-serving-unit">
      {#each Object.entries(ServingUnit) as [e, s]}
        <option value={e}>{s}</option>
      {/each}
    </select>
  </label>
  <label for="new-igr-serving-calories"
    >Serving Calories
    <input
      type="number"
      name="newIgr.servingCalories"
      bind:value={newIngredientDto.servingCalories}
      id="new-igr-serving-calories"
    />
  </label>
  <label for="new-igr-serving-protein"
    >Serving Protein
    <input
      type="number"
      name="newIgr.servingProtein"
      bind:value={newIngredientDto.servingProtein}
      id="new-igr-serving-protein"
    />
  </label>
  <label for="new-igr-ratio" class="ratio"
    >c/p
    <input
      class="ratio"
      type="text"
      value={displayPrec(
        newIngredientDto.servingCalories / newIngredientDto.servingProtein
      )}
      id="new-igr-ratio"
      disabled
    />
  </label>
  <input type="submit" value="Add Ingredient" />
</form>

<style>
</style>
