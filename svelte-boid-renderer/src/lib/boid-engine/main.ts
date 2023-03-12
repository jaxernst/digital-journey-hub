import { canvasArrow, drawPoint } from "./canvas-drawers";
import {
  add,
  distance,
  dot,
  mul,
  norm,
  subtract,
  magnitude,
  div,
} from "./vectorMath";

type Vec2D = [number, number];
type BoidVec = { pos: Vec2D; vel: Vec2D; accel: Vec2D };
export type Boid = {
  vec: BoidVec;
  mass: number;
  maxV: number;
  sightRadius: number;
  sightPeripheralDeg: number;
};

const boidVec: BoidVec = {
  pos: [0, 0],
  vel: [0, 0],
  accel: [0, 0],
};

const defaultAttrs = {
  mass: 5,
  maxV: 10,
  sightRadius: 100,
  sightPeripheralDeg: 180,
};

const defaultBoid = {
  vec: boidVec,
  ...defaultAttrs,
};

function align(boid: Boid, others: Boid[]) {
  let vSum = [0, 0];
  for (let other of others) {
    vSum[0] += other.vec.vel[0];
    vSum[1] += other.vec.vel[1];
  }

  const vAvg = [vSum[0] / others.length, vSum[1] / others.length] as Vec2D;
  return subtract(vAvg, boid.vec.vel);
}

function gravitate(boid: Boid, others: Boid[], ctx) {
  const pSum = [0, 0];
  for (let other of others) {
    pSum[0] += other.vec.pos[0];
    pSum[1] += other.vec.pos[1];
  }
  const pAvg = [pSum[0] / others.length, pSum[1] / others.length] as Vec2D;

  // Draw cg
  drawPoint(...pAvg, ctx);

  // Draw force vector
  const f = mul(norm(subtract(pAvg, boid.vec.pos)), 25);

  return subtract(pAvg, boid.vec.pos);
}

function separate(
  boid: Boid,
  others: Boid[],
  refDist: number,
  ctx: CanvasRenderingContext2D
) {
  const pSum = [0, 0];
  for (let other of others) {
    pSum[0] += other.vec.pos[0];
    pSum[1] += other.vec.pos[1];
  }
  const pAvg = [pSum[0] / others.length, pSum[1] / others.length] as Vec2D;
  const dist = distance(boid.vec.pos, pAvg);
  const vAway = norm(subtract(boid.vec.pos, pAvg));
  /*const awayPlot = mul(norm(subtract(boid.vec.pos, pAvg)), 20);
  canvasArrow(
    ctx,
    boid.vec.pos[0],
    boid.vec.pos[1],
    boid.vec.pos[0] + awayPlot[0],
    boid.vec.pos[1] + awayPlot[1],
    4,
    "blue"
  ); */

  return mul(vAway, refDist / (dist + 0.1));
}

function detract(
  boid: Boid,
  point: [number, number],
  strength,
  minDistance: number
) {
  if (!(distance(boid.vec.pos, point) <= minDistance)) return;

  const diff = subtract(boid.vec.pos, point);
  return mul(diff, strength / Math.sqrt(magnitude(diff)));
}

function findBoidsInSight(boid: Boid, others: Boid[]) {
  const bVec = boid.vec;
  const directionNorm = norm(boid.vec.vel);

  let output = others
    .filter((other) => {
      return distance(bVec.pos, other.vec.pos) < boid.sightRadius;
    })
    .filter((other: Boid) => {
      const toOtherNorm = norm(subtract(other.vec.pos, bVec.pos));
      const angleRad = Math.acos(dot(directionNorm, toOtherNorm));
      return angleRad < ((boid.sightPeripheralDeg / 2) * Math.PI) / 180;
    });

  return output;
}

function limitSpeed(boid: Boid) {
  const minSpeed = 0.5;
  const speed = magnitude(boid.vec.vel);
  if (speed > boid.maxV) {
    return mul(div(boid.vec.vel, speed), boid.maxV);
  }
  if (speed < minSpeed) {
    return mul(div(boid.vec.vel, speed), minSpeed);
  }
  return boid.vec.vel;
}

function update(
  boids: Boid[],
  board: { h: number; w: number },
  cursor: Vec2D | undefined,
  ctx
) {
  let i = 0;
  for (let boid of boids) {
    let vec = boid.vec;
    let others = [...boids];
    others.splice(i, 1); // Remove current boid index
    others = findBoidsInSight(boid, others);

    let force = [0, 0] as Vec2D;
    if (others.length > 0) {
      force = add(force, mul(gravitate(boid, others, ctx), 1));
      force = add(force, mul(align(boid, others), 1));
      force = add(force, mul(separate(boid, others, board.w, ctx), 1));
    }

    force = norm(force);

    vec.accel[0] = force[0] / (boid.mass + 0.01);
    vec.accel[1] = force[1] / (boid.mass + 0.01);

    vec.vel[0] += vec.accel[0];
    vec.vel[1] += vec.accel[1];

    vec.vel[0] *= 0.98;
    vec.vel[1] *= 0.98;

    vec.vel = limitSpeed(boid);

    vec.pos[0] += vec.vel[0];
    vec.pos[1] += vec.vel[1];

    // Enforce boundaries
    if (vec.pos[0] > board.w) vec.pos[0] = 0;
    if (vec.pos[0] < 0) vec.pos[0] = board.w;
    if (vec.pos[1] > board.h) vec.pos[1] = 0;
    if (vec.pos[1] < 0) vec.pos[1] = board.h;

    boid.vec = vec;
    i++;
  }

  return boids;
}

export function createBoidSimulation({
  numBoids,
  startPos,
  startVel,
  boardSize,
}: {
  numBoids: number;
  startPos: [() => number, () => number];
  startVel: [() => number, () => number];
  boardSize: {
    h: number;
    w: number;
  };
}) {
  let boids = [...Array(numBoids)].map(() => ({
    ...defaultBoid,
    vec: {
      ...boidVec,
      pos: [startPos[0](), startPos[1]()],
      vel: [startVel[0](), startVel[1]()],
    },
  })) as Boid[];

  let addBoidQueue: (() => Boid)[] = [];
  let board = boardSize;

  return {
    update: (cursor: Vec2D, ctx, board: { w: number; h: number }) => {
      for (let addBoid of addBoidQueue) {
        boids = [...boids, addBoid()];
      }

      addBoidQueue = [];
      boids = update(boids, board, cursor, ctx);
      return boids;
    },
    onResize: (newBoard: { h: number; w: number }) => {
      board = newBoard;
    },
    addBoid: (
      startPos: { x: number; y: number },
      startVel: { x: number; y: number }
    ) => {
      const i = boids.length;

      addBoidQueue.push(() => ({
        ...defaultAttrs,
        vec: {
          ...boidVec,
          pos: [startPos.x, startPos.y],
          vel: [startVel.x, startVel.y],
        },
      }));
      return i;
    },
  };
}
function average(arg0: [number, number][]) {
  throw new Error("Function not implemented.");
}
