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

  const menuItemMaxWidth = 600; // px

  let menuItemWidths = [0.2, 0.5, 0.84, 0.74];
  $: menuItemPxWidths = menuItemWidths.map(
    (v) => (v * menuItemMaxWidth).toString() + "px"
  );

  let dir = 1;
  setInterval(() => {
    dir *= -1;
  }, 7000);

  setInterval(() => {
    menuItemWidths[0] += 0.005 * dir;
    menuItemWidths[1] += 0.002 * dir;
    menuItemWidths[3] += 0.001 * dir;
    menuItemWidths[3] += 0.0005 * dir;
  }, 100);
</script>

<main>
  <Canvas>
    <Background color="hsl(0, 0%, 10%)">
      <DotGrid divisions={30} color="hsla(0, 0%, 100%, 0.5)" />
    </Background>

    <BoidSimulation />

    <Character size={10} moveSpeed={0.7} maxVelocity={10} />
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
      <h1 class="left">Jackson Ernst, Digital Journey</h1>
      <div
        class="menu"
        style={menuItemPxWidths.map((w, i) => `--w${i + 1}: ${w}`).join(";")}
      >
        <div class="menu-item">Intro</div>
        <div class="menu-item">Projects</div>
        <div class="menu-item">Specialtist</div>
        <div class="menu-item">Contact</div>
      </div>
      <div class="right-bar">
        <button on:click={() => $addBoid && $addBoid()}>Spawn</button>
      </div>
    </div>
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  .left {
    text-align: left;
  }

  main {
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
    display: grid;
    grid-template-columns: 1fr 20vw;
  }

  .menu {
    grid-column: 1;
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 0.5em;
  }

  .menu-item {
    background-color: rgba(90, 90, 90, 0.467);
    display: flex;
    align-items: center;
    padding: 1em;
  }

  .menu-item:nth-child(1) {
    width: var(--w1);
  }

  .menu-item:nth-child(2) {
    width: var(--w2);
  }

  .menu-item:nth-child(3) {
    width: var(--w3);
  }

  .menu-item:nth-child(4) {
    width: var(--w4);
  }

  .right-bar {
    grid-column: 2;
    grid-row: 1/-1;
    padding-top: 1.5em;
  }
</style>
