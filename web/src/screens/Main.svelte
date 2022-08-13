<script lang="ts">
  import History from "../components/History.svelte";
  import New from "../components/New.svelte";
  import Overview from "../components/Overview.svelte";
  import { mealsS } from "../stores";
  import type { Meal } from "../types";

  let goal = {
    calories: 2500,
    protein: 200,
  };

  let meals: Meal[];
  mealsS.subscribe((v) => {
    meals = v;
  });
</script>

<section>
  <Overview {goal} {meals} />
</section>

<section>
  <New />
</section>

<section>
  <History {meals} />
</section>

<style>
  section {
    margin-bottom: 5vh;
  }
</style>
