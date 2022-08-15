<script lang="ts">
</script>

<section>
  <div class="topLeft">
    <slot name="TopLeft" />
  </div>
  <div class="bottomLeft">
    <slot name="BottomLeft" />
  </div>
  <div class="right">
    <slot name="Right" />
    <div class="actions">
      <slot name="Actions" />
    </div>
  </div>
</section>

<style>
  section {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-areas: "topLeft right" "bottomLeft right";
    row-gap: 5vh;
    justify-items: center;
    align-items: center;
    margin-bottom: 5vh;
  }
  .topLeft {
    grid-area: topLeft;
  }
  .bottomLeft {
    grid-area: bottomLeft;
  }
  .right {
    grid-area: right;
  }
  .actions {
    margin-top: 5vh;
  }
</style>
