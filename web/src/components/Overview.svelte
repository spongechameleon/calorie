<script lang="ts">
  import { goalS, mealsS } from "../stores";

  import type { Goal, Meal } from "../types";

  let goal: Goal;
  goalS.subscribe((v) => {
    goal = v;
  });

  let consumed: Goal;
  let meals: Meal[];
  mealsS.subscribe((v) => {
    meals = v;
    consumed = {
      calories: meals.reduce((acc, meal) => acc + meal.calories, 0),
      protein: meals.reduce((acc, meal) => acc + meal.protein, 0),
    };
  });
</script>

<div class="grid">
  <div>
    <h1>Today's Goals</h1>
    <h2>Calories {goal.calories}</h2>
    <h2>Protein {goal.protein}</h2>
  </div>

  <div>
    <h1>Today's Consumption</h1>
    <h2>Calories {consumed.calories}</h2>
    <h2>Protein {consumed.protein}</h2>
  </div>

  <div>
    <h1>Today's Budget</h1>
    <h2>
      Calories {goal.calories - consumed.calories}
    </h2>
    <h2>
      Protein {goal.protein - consumed.protein}
    </h2>
  </div>
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  h1 {
    color: blue;
  }
  h2 {
    font-weight: normal;
  }
</style>
