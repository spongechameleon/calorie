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

<h1 class="sectionTitle">Today's Totals</h1>
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
    font-size: inherit;
    border: 2px solid #ddd;
  }
  th {
    font-size: 1.2rem;
  }
  th,
  td {
    padding: 1vh 3vw;
    /* border: 2px solid #ddd; */
  }
  tr:nth-child(even) {
    background-color: rgba(238, 238, 238, 0.5);
  }
  tr th:first-child,
  tr td:first-child {
    border-right: 2px solid #ddd;
  }
  tr th:last-child,
  tr td:last-child {
    border-left: 2px solid #ddd;
  }
</style>
