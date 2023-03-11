<script lang="ts">
  import { height, renderable, width } from "./game";
  import { createBoidSimulation } from "./lib/boid-engine/main";
  import { addBoid } from "./boidSimControls";
  import { onMount } from "svelte";
  import { MakeBoidDrawer } from "./lib/boid-engine/boid-drawers";

  const boidSim = createBoidSimulation({
    numBoids: 0,
    startPos: { x: $width / 2, y: $height / 2 },
    boardSize: { w: $width, h: $height },
  });

  const drawBoid = MakeBoidDrawer(10);

  const getRand = (max) => Math.random() * max * (Math.random() < 0.5 ? 1 : -1);

  // Put simulation controls into store on mount
  onMount(() => {
    addBoid.set(() => {
      boidSim.addBoid(
        { x: $width / 2, y: $height / 2 },
        { x: getRand(10), y: getRand(10) }
      );
    });
  });

  renderable((props, dt) => {
    const { context: ctx, width, height } = props;
    for (const boid of boidSim.update()) {
      drawBoid(boid.vec.pos, boid.vec.vel, ctx);
    }
  });
</script>
