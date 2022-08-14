<script lang="ts">
  import History from "../components/History.svelte";
  import New from "../components/New.svelte";
  import Overview from "../components/Overview.svelte";
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

<style>
  section {
    margin-bottom: 5vh;
  }
</style>
