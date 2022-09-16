<script lang="ts">
  export let leftText: string;
  export let rightText: string;
  export let toggleSwitch: () => void;
</script>

<div>
  <p class="inline">{leftText}</p>
  <label class="switch">
    <input type="checkbox" on:change={() => toggleSwitch()} />
    <span class="slider" />
  </label>
  <p class="inline">{rightText}</p>
</div>

<style>
  div {
    display: block;
    margin-bottom: 2vh;
  }
  .inline {
    display: inline;
  }
  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 26px;
  }
  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    /* -webkit-transition: 0.1s;
    transition: 0.1s; */
  }
  .slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    /* -webkit-transition: 0.4s;
    transition: 0.4s; */
  }
  /* input:checked + .slider {
    background-color: #2196f3;
  }
  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  } */
  input:checked + .slider:before {
    -webkit-transform: translateX(24px);
    -ms-transform: translateX(24px);
    transform: translateX(24px);
  }
</style>
