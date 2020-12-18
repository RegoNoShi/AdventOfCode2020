import { measuringExecutionTime, readInputFile } from './utilts';

const day = '17';

console.log(`\n🎄🎄🎄🎄🎄 Day ${day} 🎁🎁🎁🎁🎁\n`);

const challengeInput = readInputFile(day).split('\n');

/*
--- Day 17: Conway Cubes ---
As your flight slowly drifts through the sky, the Elves at the Mythical Information Bureau at the North Pole contact you. They'd like some help debugging a malfunctioning experimental energy source aboard one of their super-secret imaging satellites.

The experimental energy source is based on cutting-edge technology: a set of Conway Cubes contained in a pocket dimension! When you hear it's having problems, you can't help but agree to take a look.

The pocket dimension contains an infinite 3-dimensional grid. At every integer 3-dimensional coordinate (x,y,z), there exists a single cube which is either active or inactive.

In the initial state of the pocket dimension, almost all cubes start inactive. The only exception to this is a small flat region of cubes (your puzzle input); the cubes in this region start in the specified active (#) or inactive (.) state.

The energy source then proceeds to boot up by executing six cycles.

Each cube only ever considers its neighbors: any of the 26 other cubes where any of their coordinates differ by at most 1. For example, given the cube at x=1,y=2,z=3, its neighbors include the cube at x=2,y=2,z=2, the cube at x=0,y=2,z=3, and so on.

During a cycle, all cubes simultaneously change their state according to the following rules:

If a cube is active and exactly 2 or 3 of its neighbors are also active, the cube remains active. Otherwise, the cube becomes inactive.
If a cube is inactive but exactly 3 of its neighbors are active, the cube becomes active. Otherwise, the cube remains inactive.
The engineers responsible for this experimental energy source would like you to simulate the pocket dimension and determine what the configuration of cubes should be at the end of the six-cycle boot process.

For example, consider the following initial state:

.#.
..#
###
Even though the pocket dimension is 3-dimensional, this initial state represents a small 2-dimensional slice of it. (In particular, this initial state defines a 3x3x1 region of the 3-dimensional space.)

Simulating a few cycles from this initial state produces the following configurations, where the result of each cycle is shown layer-by-layer at each given z coordinate (and the frame of view follows the active cells in each cycle):

Before any cycles:

z=0
.#.
..#
###


After 1 cycle:

z=-1
#..
..#
.#.

z=0
#.#
.##
.#.

z=1
#..
..#
.#.


After 2 cycles:

z=-2
.....
.....
..#..
.....
.....

z=-1
..#..
.#..#
....#
.#...
.....

z=0
##...
##...
#....
....#
.###.

z=1
..#..
.#..#
....#
.#...
.....

z=2
.....
.....
..#..
.....
.....


After 3 cycles:

z=-2
.......
.......
..##...
..###..
.......
.......
.......

z=-1
..#....
...#...
#......
.....##
.#...#.
..#.#..
...#...

z=0
...#...
.......
#......
.......
.....##
.##.#..
...#...

z=1
..#....
...#...
#......
.....##
.#...#.
..#.#..
...#...

z=2
.......
.......
..##...
..###..
.......
.......
.......
After the full six-cycle boot process completes, 112 cubes are left in the active state.

Starting with your given initial configuration, simulate six cycles. How many cubes are left in the active state after the sixth cycle?
*/

console.log(`🤶🤶🤶 Part 1 🎅🎅🎅`);

type Pos3D = {
  x: number;
  y: number;
  z: number;
};

const pos3DToString = (pos: Pos3D) => `${pos.x},${pos.y},${pos.z}`;

const offsets3D: Pos3D[] = [];
for (let x = -1; x <= 1; x++) {
  for (let y = -1; y <= 1; y++) {
    for (let z = -1; z <= 1; z++) {
      if (x !== 0 || y !== 0 || z !== 0) {
        offsets3D.push({ x, y, z });
      }
    }
  }
}

const countActiveNeighbors3D = (pos: Pos3D, activeCubes: Set<string>) => {
  let activeNeighbors = 0;
  for (const offset of offsets3D) {
    const z = Math.abs(pos.z + offset.z);
    if (activeCubes.has(pos3DToString({ x: pos.x + offset.x, y: pos.y + offset.y, z }))) {
      activeNeighbors += 1;
    }
  }
  return activeNeighbors;
};

const solvePart1 = (input: string[]): number => {
  let activeCubes = new Set<string>();
  let minX = Number.MAX_VALUE,
    maxX = Number.MIN_VALUE;
  let minY = Number.MAX_VALUE,
    maxY = Number.MIN_VALUE;
  let maxZ = 0;

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (input[y][x] === '#') {
        activeCubes.add(pos3DToString({ x, y, z: 0 }));
      }
      if (x < minX) {
        minX = x;
      }
      if (x > maxX) {
        maxX = x;
      }
    }
    if (y < minY) {
      minY = y;
    }
    if (y > maxY) {
      maxY = y;
    }
  }

  for (let cycle = 1; cycle <= 6; cycle += 1) {
    let newActiveCubes = new Set<string>();
    let newMinX = minX,
      newMaxX = maxX;
    let newMinY = minY,
      newMaxY = maxY;
    let newMaxZ = maxZ;
    for (let y = minY - 1; y <= maxY + 1; y++) {
      for (let x = minX - 1; x <= maxX + 1; x++) {
        for (let z = 0; z <= maxZ + 1; z++) {
          const pos = { x, y, z };
          const posKey = pos3DToString(pos);
          const activeNeighbors = countActiveNeighbors3D(pos, activeCubes);

          if (
            (activeCubes.has(posKey) && activeNeighbors >= 2 && activeNeighbors <= 3) ||
            (!activeCubes.has(posKey) && activeNeighbors === 3)
          ) {
            newActiveCubes.add(posKey);
            if (x < newMinX) {
              newMinX = x;
            }
            if (x > newMaxX) {
              newMaxX = x;
            }
            if (y < newMinY) {
              newMinY = y;
            }
            if (y > newMaxY) {
              newMaxY = y;
            }
            if (z > newMaxZ) {
              newMaxZ = z;
            }
          }
        }
      }
    }

    activeCubes = newActiveCubes;
    minX = newMinX;
    minY = newMinY;
    maxX = newMaxX;
    maxY = newMaxY;
    maxZ = newMaxZ;
  }

  let z0LayerActive = 0;
  for (let y = minY; y <= maxY + 1; y++) {
    for (let x = minX - 1; x <= maxX + 1; x++) {
      const pos = { x, y, z: 0 };
      const posKey = pos3DToString(pos);
      if (activeCubes.has(posKey)) {
        z0LayerActive += 1;
      }
    }
  }

  return activeCubes.size * 2 - z0LayerActive;
};

type TestCase = {
  input: string[];
  expectedOutput: number;
};

const testCasesPart1: TestCase[] = [{ input: ['.#.', '..#', '###'], expectedOutput: 112 }];

const runAndVerifyPart1 = ({ input, expectedOutput }: TestCase) => {
  const output = solvePart1(input);
  if (output == expectedOutput) {
    console.log(`✅ Input: ${input} -> Output: ${output}`);
  } else {
    console.log(`❌ Input: ${input} -> Expected output ${expectedOutput}, got ${output}`);
  }
};

console.log('Test cases:');
testCasesPart1.forEach(runAndVerifyPart1);

measuringExecutionTime(() => {
  const expectedOutput = 386;
  const output = solvePart1(challengeInput);
  if (output == expectedOutput) {
    console.log(`✅ Challenge: ${output}`);
  } else {
    console.log(`❌ Challenge: Expected output ${expectedOutput}, got ${output}`);
  }
});

/*
--- Part Two ---
For some reason, your simulated results don't match what the experimental energy source engineers expected. Apparently, the pocket dimension actually has four spatial dimensions, not three.

The pocket dimension contains an infinite 4-dimensional grid. At every integer 4-dimensional coordinate (x,y,z,w), there exists a single cube (really, a hypercube) which is still either active or inactive.

Each cube only ever considers its neighbors: any of the 80 other cubes where any of their coordinates differ by at most 1. For example, given the cube at x=1,y=2,z=3,w=4, its neighbors include the cube at x=2,y=2,z=3,w=3, the cube at x=0,y=2,z=3,w=4, and so on.

The initial state of the pocket dimension still consists of a small flat region of cubes. Furthermore, the same rules for cycle updating still apply: during each cycle, consider the number of active neighbors of each cube.

For example, consider the same initial state as in the example above. Even though the pocket dimension is 4-dimensional, this initial state represents a small 2-dimensional slice of it. (In particular, this initial state defines a 3x3x1x1 region of the 4-dimensional space.)

Simulating a few cycles from this initial state produces the following configurations, where the result of each cycle is shown layer-by-layer at each given z and w coordinate:

Before any cycles:

z=0, w=0
.#.
..#
###


After 1 cycle:

z=-1, w=-1
#..
..#
.#.

z=0, w=-1
#..
..#
.#.

z=1, w=-1
#..
..#
.#.

z=-1, w=0
#..
..#
.#.

z=0, w=0
#.#
.##
.#.

z=1, w=0
#..
..#
.#.

z=-1, w=1
#..
..#
.#.

z=0, w=1
#..
..#
.#.

z=1, w=1
#..
..#
.#.


After 2 cycles:

z=-2, w=-2
.....
.....
..#..
.....
.....

z=-1, w=-2
.....
.....
.....
.....
.....

z=0, w=-2
###..
##.##
#...#
.#..#
.###.

z=1, w=-2
.....
.....
.....
.....
.....

z=2, w=-2
.....
.....
..#..
.....
.....

z=-2, w=-1
.....
.....
.....
.....
.....

z=-1, w=-1
.....
.....
.....
.....
.....

z=0, w=-1
.....
.....
.....
.....
.....

z=1, w=-1
.....
.....
.....
.....
.....

z=2, w=-1
.....
.....
.....
.....
.....

z=-2, w=0
###..
##.##
#...#
.#..#
.###.

z=-1, w=0
.....
.....
.....
.....
.....

z=0, w=0
.....
.....
.....
.....
.....

z=1, w=0
.....
.....
.....
.....
.....

z=2, w=0
###..
##.##
#...#
.#..#
.###.

z=-2, w=1
.....
.....
.....
.....
.....

z=-1, w=1
.....
.....
.....
.....
.....

z=0, w=1
.....
.....
.....
.....
.....

z=1, w=1
.....
.....
.....
.....
.....

z=2, w=1
.....
.....
.....
.....
.....

z=-2, w=2
.....
.....
..#..
.....
.....

z=-1, w=2
.....
.....
.....
.....
.....

z=0, w=2
###..
##.##
#...#
.#..#
.###.

z=1, w=2
.....
.....
.....
.....
.....

z=2, w=2
.....
.....
..#..
.....
.....
After the full six-cycle boot process completes, 848 cubes are left in the active state.

Starting with your given initial configuration, simulate six cycles in a 4-dimensional space. How many cubes are left in the active state after the sixth cycle?
*/

console.log(`\n🧝‍♂️🧝‍♂️🧝‍♂️ Part 2 🧝‍♀️🧝‍♀️🧝‍♀️`);

type Pos4D = {
  x: number;
  y: number;
  z: number;
  w: number;
};

const pos4DToString = (pos: Pos4D) => `${pos.x},${pos.y},${pos.z},${pos.w}`;

const offsets4D: Pos4D[] = [];
for (let x = -1; x <= 1; x++) {
  for (let y = -1; y <= 1; y++) {
    for (let z = -1; z <= 1; z++) {
      for (let w = -1; w <= 1; w++) {
        if (x !== 0 || y !== 0 || z !== 0 || w !== 0) {
          offsets4D.push({ x, y, z, w });
        }
      }
    }
  }
}

const countActiveNeighbors4D = (pos: Pos4D, activeCubes: Set<string>) => {
  let activeNeighbors = 0;
  for (const offset of offsets4D) {
    const z = Math.abs(pos.z + offset.z);
    const w = Math.abs(pos.w + offset.w);
    if (activeCubes.has(pos4DToString({ x: pos.x + offset.x, y: pos.y + offset.y, z, w }))) {
      activeNeighbors += 1;
    }
  }
  return activeNeighbors;
};

const solvePart2 = (input: string[]): number => {
  let activeCubes = new Set<string>();
  let minX = Number.MAX_VALUE,
    maxX = Number.MIN_VALUE;
  let minY = Number.MAX_VALUE,
    maxY = Number.MIN_VALUE;
  let maxZ = 0;
  let maxW = 0;

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (input[y][x] === '#') {
        activeCubes.add(pos4DToString({ x, y, z: 0, w: 0 }));
      }
      if (x < minX) {
        minX = x;
      }
      if (x > maxX) {
        maxX = x;
      }
    }
    if (y < minY) {
      minY = y;
    }
    if (y > maxY) {
      maxY = y;
    }
  }

  for (let cycle = 1; cycle <= 6; cycle += 1) {
    let newActiveCubes = new Set<string>();
    let newMinX = minX,
      newMaxX = maxX;
    let newMinY = minY,
      newMaxY = maxY;
    let newMaxZ = maxZ;
    let newMaxW = maxW;
    for (let y = minY - 1; y <= maxY + 1; y++) {
      for (let x = minX - 1; x <= maxX + 1; x++) {
        for (let z = 0; z <= maxZ + 1; z++) {
          for (let w = 0; w <= maxW + 1; w++) {
            const pos = { x, y, z, w };
            const posKey = pos4DToString(pos);
            const activeNeighbors = countActiveNeighbors4D(pos, activeCubes);

            if (
              (activeCubes.has(posKey) && activeNeighbors >= 2 && activeNeighbors <= 3) ||
              (!activeCubes.has(posKey) && activeNeighbors === 3)
            ) {
              newActiveCubes.add(posKey);
              if (x < newMinX) {
                newMinX = x;
              }
              if (x > newMaxX) {
                newMaxX = x;
              }
              if (y < newMinY) {
                newMinY = y;
              }
              if (y > newMaxY) {
                newMaxY = y;
              }
              if (z > newMaxZ) {
                newMaxZ = z;
              }
              if (w > newMaxW) {
                newMaxW = w;
              }
            }
          }
        }
      }
    }

    activeCubes = newActiveCubes;
    minX = newMinX;
    minY = newMinY;
    maxX = newMaxX;
    maxY = newMaxY;
    maxZ = newMaxZ;
    maxW = newMaxW;
  }

  let z0LayerActive = 0;
  let w0LayerActive = 0;
  for (let y = minY; y <= maxY + 1; y++) {
    for (let x = minX; x <= maxX + 1; x++) {
      for (let w = 0; w <= maxW + 1; w++) {
        const pos = { x, y, z: 0, w };
        const posKey = pos4DToString(pos);
        if (activeCubes.has(posKey)) {
          z0LayerActive += 1;
        }
      }
      for (let z = 0; z <= maxZ + 1; z++) {
        const pos = { x, y, z, w: 0 };
        const posKey = pos4DToString(pos);
        if (activeCubes.has(posKey)) {
          w0LayerActive += 1;
        }
      }
    }
  }

  return activeCubes.size * 4 - z0LayerActive * 2 - w0LayerActive * 2;
};

const testCasesPart2: TestCase[] = [{ input: ['.#.', '..#', '###'], expectedOutput: 848 }];

const runAndVerifyPart2 = ({ input, expectedOutput }: TestCase) => {
  const output = solvePart2(input);
  if (output == expectedOutput) {
    console.log(`✅ Input: ${input} -> Output: ${output}`);
  } else {
    console.log(`❌ Input: ${input} -> Expected output ${expectedOutput}, got ${output}`);
  }
};

console.log('Test cases:');
testCasesPart2.forEach(runAndVerifyPart2);

measuringExecutionTime(() => {
  const expectedOutput = 2276;
  const output = solvePart2(challengeInput);
  if (output == expectedOutput) {
    console.log(`✅ Challenge: ${output}`);
  } else {
    console.log(`❌ Challenge: Expected output ${expectedOutput}, got ${output}`);
  }
});
