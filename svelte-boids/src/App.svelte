<script lang="ts">
  import { width, height } from "./game.js";

  import Canvas from "./Canvas.svelte";
  import Background from "./Background.svelte";
  import DotGrid from "./DotGrid.svelte";
  import Character from "./Character.svelte";
  import Text from "./Text.svelte";
  import FPS from "./FPS.svelte";
  import BoidSimulation from "./BoidSimulation.svelte";
  import { addBoid } from "./boidSimControls.js";
</script>

<div class="main">
  <Canvas>
    <Background color="hsl(0, 0%, 10%)">
      <DotGrid divisions={30} color="hsla(0, 0%, 100%, 0.5)" />
    </Background>

    <BoidSimulation />

    <Character size={10} moveSpeed={0.7} maxVelocity={10} />
    <Text
      text="Jackson Ernst, Digital Journey"
      fontSize={12}
      align="left"
      baseline="bottom"
      x={20}
      y={$height - 20}
    />
    <Text
      text="Click and drag around the page to move the character."
      fontSize={12}
      align="right"
      baseline="bottom"
      x={$width - 20}
      y={$height - 20}
    />

    <FPS />
  </Canvas>

  <div class="overlay">
    <div class="content-container">
      <h1 class="left" style="margin-bottom:0">Svelte Boids</h1>
      <div class="right-bar">
        <button on:click={() => $addBoid && $addBoid()}>Spawn</button>
      </div>
    </div>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  .left {
    text-align: left;
  }

  .main {
    position: fixed;
    top: 0%;
    left: 0%;
  }

  .overlay {
    position: absolute;
    top: 0%;
    left: 0%;
    margin: 1em;
    width: 100%;
  }

  .content-container {
    display: flex;
    justify-content: space-between;
  }

  .right-bar {
    grid-column: 2;
    grid-row: 1/-1;
    padding-top: 1.5em;
    margin-right: 2em;
  }
</style>
