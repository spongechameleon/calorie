<script lang="ts">
  import History from "../components/History.svelte";
  import New from "../components/New.svelte";
  import Overview from "../components/Overview.svelte";
  import { lsManualReset } from "../actions/persistence/localStorage";
</script>

<section>
  <Overview />
</section>

<section>
  <New />
</section>

<section>
  <History />
</section>

<button on:click={lsManualReset}>Reset data</button>

<style>
  section {
    margin-bottom: 5vh;
  }
</style>
