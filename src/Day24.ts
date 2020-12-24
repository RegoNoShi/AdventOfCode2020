import { measuringExecutionTime, readInputFile } from './utilts';

const day = '24';

console.log(`\n🎄🎄🎄🎄🎄 Day ${day} 🎁🎁🎁🎁🎁\n`);

const challengeInput = readInputFile(day).split('\n');

/*
--- Day 24: Lobby Layout ---
Your raft makes it to the tropical island; it turns out that the small crab was an excellent navigator. You make your way to the resort.

As you enter the lobby, you discover a small problem: the floor is being renovated. You can't even reach the check-in desk until they've finished installing the new tile floor.

The tiles are all hexagonal; they need to be arranged in a hex grid with a very specific color pattern. Not in the mood to wait, you offer to help figure out the pattern.

The tiles are all white on one side and black on the other. They start with the white side facing up. The lobby is large enough to fit whatever pattern might need to appear there.

A member of the renovation crew gives you a list of the tiles that need to be flipped over (your puzzle input). Each line in the list identifies a single tile that needs to be flipped by giving a series of steps starting from a reference tile in the very center of the room. (Every line starts from the same reference tile.)

Because the tiles are hexagonal, every tile has six neighbors: east, southeast, southwest, west, northwest, and northeast. These directions are given in your list, respectively, as e, se, sw, w, nw, and ne. A tile is identified by a series of these directions with no delimiters; for example, esenee identifies the tile you land on if you start at the reference tile and then move one tile east, one tile southeast, one tile northeast, and one tile east.

Each time a tile is identified, it flips from white to black or from black to white. Tiles might be flipped more than once. For example, a line like esew flips a tile immediately adjacent to the reference tile, and a line like nwwswee flips the reference tile itself.

Here is a larger example:

sesenwnenenewseeswwswswwnenewsewsw
neeenesenwnwwswnenewnwwsewnenwseswesw
seswneswswsenwwnwse
nwnwneseeswswnenewneswwnewseswneseene
swweswneswnenwsewnwneneseenw
eesenwseswswnenwswnwnwsewwnwsene
sewnenenenesenwsewnenwwwse
wenwwweseeeweswwwnwwe
wsweesenenewnwwnwsenewsenwwsesesenwne
neeswseenwwswnwswswnw
nenwswwsewswnenenewsenwsenwnesesenew
enewnwewneswsewnwswenweswnenwsenwsw
sweneswneswneneenwnewenewwneswswnese
swwesenesewenwneswnwwneseswwne
enesenwswwswneneswsenwnewswseenwsese
wnwnesenesenenwwnenwsewesewsesesew
nenewswnwewswnenesenwnesewesw
eneswnwswnwsenenwnwnwwseeswneewsenese
neswnwewnwnwseenwseesewsenwsweewe
wseweeenwnesenwwwswnew
In the above example, 10 tiles are flipped once (to black), and 5 more are flipped twice (to black, then back to white). After all of these instructions have been followed, a total of 10 tiles are black.

Go through the renovation crew's list and determine which tiles they need to flip. After all of the instructions have been followed, how many tiles are left with the black side up?
*/

console.log(`🤶🤶🤶 Part 1 🎅🎅🎅`);

const parseInput = (input: string[]): Set<string> => {
  const blackTiles = new Set<string>();
  for (const tile of input) {
    let x = 0,
      y = 0,
      c = 0;
    while (c < tile.length) {
      let direction: string;
      if (['n', 's'].includes(tile[c])) {
        direction = tile.substr(c, 2);
        c += 2;
      } else {
        direction = tile[c];
        c += 1;
      }

      switch (direction) {
        case 'e':
          x += 2;
          break;
        case 'w':
          x -= 2;
          break;
        case 'ne':
          y += 1;
          x += 1;
          break;
        case 'nw':
          y += 1;
          x -= 1;
          break;
        case 'se':
          y -= 1;
          x += 1;
          break;
        case 'sw':
          y -= 1;
          x -= 1;
          break;
      }
    }

    const finalTile = `${x},${y}`;
    if (blackTiles.has(finalTile)) {
      blackTiles.delete(finalTile);
    } else {
      blackTiles.add(finalTile);
    }
  }
  return blackTiles;
};

const solvePart1 = (input: string[]): number => {
  return parseInput(input).size;
};

type TestCasePart1 = {
  input: string[];
  expectedOutput: number;
};

const testCasesPart1: TestCasePart1[] = [
  { input: ['esew', 'nwwswee'], expectedOutput: 2 },
  {
    input: [
      'sesenwnenenewseeswwswswwnenewsewsw',
      'neeenesenwnwwswnenewnwwsewnenwseswesw',
      'seswneswswsenwwnwse',
      'nwnwneseeswswnenewneswwnewseswneseene',
      'swweswneswnenwsewnwneneseenw',
      'eesenwseswswnenwswnwnwsewwnwsene',
      'sewnenenenesenwsewnenwwwse',
      'wenwwweseeeweswwwnwwe',
      'wsweesenenewnwwnwsenewsenwwsesesenwne',
      'neeswseenwwswnwswswnw',
      'nenwswwsewswnenenewsenwsenwnesesenew',
      'enewnwewneswsewnwswenweswnenwsenwsw',
      'sweneswneswneneenwnewenewwneswswnese',
      'swwesenesewenwneswnwwneseswwne',
      'enesenwswwswneneswsenwnewswseenwsese',
      'wnwnesenesenenwwnenwsewesewsesesew',
      'nenewswnwewswnenesenwnesewesw',
      'eneswnwswnwsenenwnwnwwseeswneewsenese',
      'neswnwewnwnwseenwseesewsenwsweewe',
      'wseweeenwnesenwwwswnew',
    ],
    expectedOutput: 10,
  },
];

const runAndVerifyPart1 = ({ input, expectedOutput }: TestCasePart1) => {
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
  const expectedOutput = 287;
  const output = solvePart1(challengeInput);
  if (output == expectedOutput) {
    console.log(`✅ Challenge: ${output}`);
  } else {
    console.log(`❌ Challenge: Expected output ${expectedOutput}, got ${output}`);
  }
});

/*
--- Part Two ---
The tile floor in the lobby is meant to be a living art exhibit. Every day, the tiles are all flipped according to the following rules:

Any black tile with zero or more than 2 black tiles immediately adjacent to it is flipped to white.
Any white tile with exactly 2 black tiles immediately adjacent to it is flipped to black.
Here, tiles immediately adjacent means the six tiles directly touching the tile in question.

The rules are applied simultaneously to every tile; put another way, it is first determined which tiles need to be flipped, then they are all flipped at the same time.

In the above example, the number of black tiles that are facing up after the given number of days has passed is as follows:

Day 1: 15
Day 2: 12
Day 3: 25
Day 4: 14
Day 5: 23
Day 6: 28
Day 7: 41
Day 8: 37
Day 9: 49
Day 10: 37

Day 20: 132
Day 30: 259
Day 40: 406
Day 50: 566
Day 60: 788
Day 70: 1106
Day 80: 1373
Day 90: 1844
Day 100: 2208
After executing this process a total of 100 times, there would be 2208 black tiles facing up.

How many tiles will be black after 100 days?
*/

console.log(`\n🧝‍♂️🧝‍♂️🧝‍♂️ Part 2 🧝‍♀️🧝‍♀️🧝‍♀️`);

const offsets = [
  { xD: -2, yD: 0 },
  { xD: 2, yD: 0 },
  { xD: -1, yD: -1 },
  { xD: -1, yD: 1 },
  { xD: 1, yD: -1 },
  { xD: 1, yD: 1 },
];

const solvePart2 = (input: string[], days: number): number => {
  let blackTiles = parseInput(input);
  for (let day = 0; day < days; day += 1) {
    const nextBlackTiles = new Set<string>();
    const whiteTiles: { [index: string]: number } = {};
    for (const blackTile of blackTiles) {
      const x = +blackTile.split(',')[0];
      const y = +blackTile.split(',')[1];
      let neighbors = 0;
      for (const { xD, yD } of offsets) {
        const tile = `${x + xD},${y + yD}`;
        if (blackTiles.has(tile)) {
          neighbors += 1;
        } else {
          if (whiteTiles.hasOwnProperty(tile)) {
            whiteTiles[tile] += 1;
          } else {
            whiteTiles[tile] = 1;
          }
        }
      }

      if (neighbors === 1 || neighbors === 2) {
        nextBlackTiles.add(blackTile);
      }
    }

    for (const whiteTile of Object.keys(whiteTiles)) {
      if (whiteTiles[whiteTile] === 2) {
        nextBlackTiles.add(whiteTile);
      }
    }

    blackTiles = nextBlackTiles;
  }

  return blackTiles.size;
};

type TestCasePart2 = {
  input: string[];
  days: number;
  expectedOutput: number;
};

const testCasesPart2: TestCasePart2[] = [
  {
    input: [
      'sesenwnenenewseeswwswswwnenewsewsw',
      'neeenesenwnwwswnenewnwwsewnenwseswesw',
      'seswneswswsenwwnwse',
      'nwnwneseeswswnenewneswwnewseswneseene',
      'swweswneswnenwsewnwneneseenw',
      'eesenwseswswnenwswnwnwsewwnwsene',
      'sewnenenenesenwsewnenwwwse',
      'wenwwweseeeweswwwnwwe',
      'wsweesenenewnwwnwsenewsenwwsesesenwne',
      'neeswseenwwswnwswswnw',
      'nenwswwsewswnenenewsenwsenwnesesenew',
      'enewnwewneswsewnwswenweswnenwsenwsw',
      'sweneswneswneneenwnewenewwneswswnese',
      'swwesenesewenwneswnwwneseswwne',
      'enesenwswwswneneswsenwnewswseenwsese',
      'wnwnesenesenenwwnenwsewesewsesesew',
      'nenewswnwewswnenesenwnesewesw',
      'eneswnwswnwsenenwnwnwwseeswneewsenese',
      'neswnwewnwnwseenwseesewsenwsweewe',
      'wseweeenwnesenwwwswnew',
    ],
    days: 100,
    expectedOutput: 2208,
  },
];

const runAndVerifyPart2 = ({ input, days, expectedOutput }: TestCasePart2) => {
  const output = solvePart2(input, days);
  if (output == expectedOutput) {
    console.log(`✅ Input: ${input} -> Output: ${output}`);
  } else {
    console.log(`❌ Input: ${input} -> Expected output ${expectedOutput}, got ${output}`);
  }
};

console.log('Test cases:');
testCasesPart2.forEach(runAndVerifyPart2);

measuringExecutionTime(() => {
  const expectedOutput = 3636;
  const output = solvePart2(challengeInput, 100);
  if (output == expectedOutput) {
    console.log(`✅ Challenge: ${output}`);
  } else {
    console.log(`❌ Challenge: Expected output ${expectedOutput}, got ${output}`);
  }
});
