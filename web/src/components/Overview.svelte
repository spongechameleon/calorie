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

<h1>Today's Totals</h1>
<table>
  <tr class="headers">
    <th>Goal</th>
    <th>Consumed</th>
    <th>Remaining</th>
  </tr>
  <tr>
    <td>{goal.calories} calories</td>
    <td>{consumed.calories} calories</td>
    <td>{goal.calories - consumed.calories} calories</td>
  </tr>
  <tr>
    <td>{goal.protein} protein</td>
    <td>{consumed.protein} protein</td>
    <td>{goal.protein - consumed.protein} protein</td>
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
