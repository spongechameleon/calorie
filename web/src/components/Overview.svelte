<script lang="ts">
  import type { Meal } from "../types";

  export let goal;
  export let meals: Meal[];
</script>

<h1>Today's Goals</h1>
<h2>Calories {goal.calories}</h2>
<h2>Protein {goal.protein}</h2>

<h1>Today's Budget</h1>
<h2>
  Calories {goal.calories - meals.reduce((acc, meal) => acc + meal.calories, 0)}
</h2>
<h2>
  Protein {goal.protein - meals.reduce((acc, meal) => acc + meal.protein, 0)}
</h2>

<style>
  h1 {
    color: blue;
  }
  h2 {
    font-weight: normal;
  }
</style>
