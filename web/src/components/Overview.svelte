<script lang="ts">
  import { prec } from "../util";

  import { goalS, mealsS } from "../stores";

  import type { Goal, Meal } from "../types";

  let goal: Goal;
  goalS.subscribe((v) => {
    goal = v;
  });

  let consumed: Goal;
  let remaining: Goal;
  let meals: Meal[];
  mealsS.subscribe((v) => {
    meals = v;
    consumed = {
      calories: meals.reduce((acc, meal) => acc + meal.calories, 0),
      protein: meals.reduce((acc, meal) => acc + meal.protein, 0),
    };
    remaining = {
      calories: goal.calories - consumed.calories,
      protein: goal.protein - consumed.protein,
    };
  });
</script>

<h1>Today's Totals</h1>
<table>
  <tr class="headers">
    <th>Goal</th>
    <th>Consumed</th>
    <th>Remaining</th>
  </tr>
  <tr>
    <td>Calories {goal.calories}</td>
    <td>Calories {consumed.calories}</td>
    <td>Calories {remaining.calories}</td>
  </tr>
  <tr>
    <td>Protein {goal.protein}</td>
    <td>Protein {consumed.protein}</td>
    <td>Protein {remaining.protein}</td>
  </tr>
  <tr>
    <td class="ratio">c/p {prec(goal.calories / goal.protein)}</td>
    <td class="ratio">c/p {prec(consumed.calories / consumed.protein)}</td>
    <td class="ratio">c/p {prec(remaining.calories / remaining.protein)}</td>
  </tr>
</table>

<style>
  table {
    margin: 0 auto;
    background-color: rgba(228, 237, 255, 1);
    background-color: #eee;
    font-size: inherit;
  }
  th {
    font-size: 1.2rem;
  }
  th,
  td {
    padding: 1vh 3vw;
  }
  tr:nth-child(even) {
    background-color: white;
  }
</style>
