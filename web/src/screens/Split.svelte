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
  </div>
</section>
<div class="actions">
  <slot name="Actions" />
</div>

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
    position: absolute;
    top: 2vh;
    right: 12vw;
  }
</style>
