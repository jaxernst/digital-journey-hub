import {
  add,
  distance,
  dot,
  mul,
  norm,
  subtract,
  averageVectors,
} from "./vectorMath";

type Vec2D = [number, number];

type BoidVec = { pos: Vec2D; vel: Vec2D; accel: Vec2D; force: Vec2D };
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
  force: [0, 0],
};

const defaultAttrs = {
  mass: 20,
  maxV: 5,
  sightRadius: 400,
  sightPeripheralDeg: 70,
};

const defaultBoid = {
  vec: boidVec,
  ...defaultAttrs,
};

function alignmentForce(boid: Boid, others: Boid[]) {
  let vSum = [0, 0];
  for (let other of others) {
    vSum[0] += other.vec.vel[0];
    vSum[1] += other.vec.vel[1];
  }

  const vAvg = [vSum[0] / others.length, vSum[1] / others.length] as Vec2D;
  return mul(subtract(vAvg, boid.vec.vel), 1000);
}

function gravitateForce(boid: Boid, others: Boid[]) {
  let pSum = [0, 0];
  for (let other of others) {
    pSum[0] += other.vec.pos[0];
    pSum[1] += other.vec.pos[1];
  }

  const pAvg = [pSum[0] / others.length, pSum[1] / others.length] as Vec2D;
  return mul(subtract(pAvg, boid.vec.pos), 0.001);
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

function update(boids: Boid[], board: { h: number; w: number }) {
  let i = 0;
  for (let boid of boids) {
    let vec = boid.vec;
    let others = [...boids];
    others.splice(i, 1); // Remove current boid index
    others = findBoidsInSight(boid, others);

    if (others.length > 0) {
      boid.vec.force = alignmentForce(boid, others);
      // boid.vec.force = add(boid.vec.force, gravitateForce(boid, others));
    }

    vec.pos[0] += vec.vel[0];
    vec.pos[1] += vec.vel[1];

    vec.vel[0] += vec.accel[0];
    vec.vel[1] += vec.accel[1];

    vec.accel[0] = vec.force[0] / (boid.mass + 1);
    vec.accel[1] = vec.force[1] / (boid.mass + 1);

    vec.vel[0] = Math.max(-boid.maxV, Math.min(boid.maxV, vec.vel[0]));
    vec.vel[1] = Math.max(-boid.maxV, Math.min(boid.maxV, vec.vel[1]));

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
  boardSize,
}: {
  numBoids: number;
  startPos: { x: number; y: number };
  boardSize: {
    h: number;
    w: number;
  };
}) {
  let boids = [...Array(numBoids)].map(() => ({
    ...defaultBoid,
    vec: { ...boidVec, pos: [startPos.x, startPos.y] },
  })) as Boid[];

  let addBoidQueue: (() => Boid)[] = [];
  let board = boardSize;

  return {
    boids,
    update: () => {
      boids = update(boids, board);

      for (let addBoid of addBoidQueue) {
        boids = [...boids, addBoid()];
      }
      addBoidQueue = [];
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
