import { measuringExecutionTime, readInputFile } from './utilts';

const day = '20';

console.log(`\n🎄🎄🎄🎄🎄 Day ${day} 🎁🎁🎁🎁🎁\n`);

const challengeInput = readInputFile(day).split('\n');

/*
--- Day 20: Jurassic Jigsaw ---
The high-speed train leaves the forest and quickly carries you south. You can even see a desert in the distance! Since you have some spare time, you might as well see if there was anything interesting in the image the Mythical Information Bureau satellite captured.

After decoding the satellite messages, you discover that the data actually contains many small images created by the satellite's camera array. The camera array consists of many cameras; rather than produce a single square image, they produce many smaller square image tiles that need to be reassembled back into a single image.

Each camera in the camera array returns a single monochrome image tile with a random unique ID number. The tiles (your puzzle input) arrived in a random order.

Worse yet, the camera array appears to be malfunctioning: each image tile has been rotated and flipped to a random orientation. Your first task is to reassemble the original image by orienting the tiles so they fit together.

To show how the tiles should be reassembled, each tile's image data includes a border that should line up exactly with its adjacent tiles. All tiles have this border, and the border lines up exactly when the tiles are both oriented correctly. Tiles at the edge of the image also have this border, but the outermost edges won't line up with any other tiles.

For example, suppose you have the following nine tiles:

Tile 2311:
..##.#..#.
##..#.....
#...##..#.
####.#...#
##.##.###.
##...#.###
.#.#.#..##
..#....#..
###...#.#.
..###..###

Tile 1951:
#.##...##.
#.####...#
.....#..##
#...######
.##.#....#
.###.#####
###.##.##.
.###....#.
..#.#..#.#
#...##.#..

Tile 1171:
####...##.
#..##.#..#
##.#..#.#.
.###.####.
..###.####
.##....##.
.#...####.
#.##.####.
####..#...
.....##...

Tile 1427:
###.##.#..
.#..#.##..
.#.##.#..#
#.#.#.##.#
....#...##
...##..##.
...#.#####
.#.####.#.
..#..###.#
..##.#..#.

Tile 1489:
##.#.#....
..##...#..
.##..##...
..#...#...
#####...#.
#..#.#.#.#
...#.#.#..
##.#...##.
..##.##.##
###.##.#..

Tile 2473:
#....####.
#..#.##...
#.##..#...
######.#.#
.#...#.#.#
.#########
.###.#..#.
########.#
##...##.#.
..###.#.#.

Tile 2971:
..#.#....#
#...###...
#.#.###...
##.##..#..
.#####..##
.#..####.#
#..#.#..#.
..####.###
..#.#.###.
...#.#.#.#

Tile 2729:
...#.#.#.#
####.#....
..#.#.....
....#..#.#
.##..##.#.
.#.####...
####.#.#..
##.####...
##..#.##..
#.##...##.

Tile 3079:
#.#.#####.
.#..######
..#.......
######....
####.#..#.
.#...#.##.
#.#####.##
..#.###...
..#.......
..#.###...
By rotating, flipping, and rearranging them, you can find a square arrangement that causes all adjacent borders to line up:

#...##.#.. ..###..### #.#.#####.
..#.#..#.# ###...#.#. .#..######
.###....#. ..#....#.. ..#.......
###.##.##. .#.#.#..## ######....
.###.##### ##...#.### ####.#..#.
.##.#....# ##.##.###. .#...#.##.
#...###### ####.#...# #.#####.##
.....#..## #...##..#. ..#.###...
#.####...# ##..#..... ..#.......
#.##...##. ..##.#..#. ..#.###...

#.##...##. ..##.#..#. ..#.###...
##..#.##.. ..#..###.# ##.##....#
##.####... .#.####.#. ..#.###..#
####.#.#.. ...#.##### ###.#..###
.#.####... ...##..##. .######.##
.##..##.#. ....#...## #.#.#.#...
....#..#.# #.#.#.##.# #.###.###.
..#.#..... .#.##.#..# #.###.##..
####.#.... .#..#.##.. .######...
...#.#.#.# ###.##.#.. .##...####

...#.#.#.# ###.##.#.. .##...####
..#.#.###. ..##.##.## #..#.##..#
..####.### ##.#...##. .#.#..#.##
#..#.#..#. ...#.#.#.. .####.###.
.#..####.# #..#.#.#.# ####.###..
.#####..## #####...#. .##....##.
##.##..#.. ..#...#... .####...#.
#.#.###... .##..##... .####.##.#
#...###... ..##...#.. ...#..####
..#.#....# ##.#.#.... ...##.....
For reference, the IDs of the above tiles are:

1951    2311    3079
2729    1427    2473
2971    1489    1171
To check that you've assembled the image correctly, multiply the IDs of the four corner tiles together. If you do this with the assembled tiles from the example above, you get 1951 * 3079 * 2971 * 1171 = 20899048083289.

Assemble the tiles into an image. What do you get if you multiply together the IDs of the four corner tiles?
*/

console.log(`🤶🤶🤶 Part 1 🎅🎅🎅`);

type Match = {
  tile: Tile;
  border: number;
};

type Tile = {
  id: number;
  content: string[];
  borders: number[][];
  matches: Map<number, Match>;
};

const match = (array: number[], otherArray: number[]): boolean => {
  if (array.length != otherArray.length) {
    return false;
  }

  for (let i = 0; i < array.length; i++) {
    if (array[i] !== otherArray[i]) {
      return false;
    }
  }

  return true;
};

const reversed = (border: number[], borderSize: number): number[] => {
  return border.map((n) => borderSize - n - 1).reverse();
};

const calculateMatches = (tile: Tile, otherTile: Tile) => {
  for (let border = 0; border < 4; border += 1) {
    for (let otherBorder = 0; otherBorder < 4; otherBorder += 1) {
      if (
        match(tile.borders[border], otherTile.borders[otherBorder]) ||
        match(tile.borders[border], reversed(otherTile.borders[otherBorder], tile.content.length))
      ) {
        tile.matches.set(border, { border: otherBorder, tile: otherTile });
        otherTile.matches.set(otherBorder, { border, tile: tile });
      }
    }
  }
};

const parseTile = (id: number, tileData: string[]): Tile => {
  const tile: Tile = { id, borders: [], matches: new Map(), content: tileData };

  for (let i = 0; i < 4; i += 1) {
    tile.borders.push([]);
  }

  for (let i = 0; i < tileData[0].length; i += 1) {
    if (tileData[0][i] === '#') {
      tile.borders[0].push(i);
    }
    if (tileData[tileData.length - 1][i] === '#') {
      tile.borders[2].push(i);
    }
  }

  for (let i = 0; i < tileData.length; i += 1) {
    if (tileData[i][0] === '#') {
      tile.borders[3].push(i);
    }
    if (tileData[i][tileData[i].length - 1] === '#') {
      tile.borders[1].push(i);
    }
  }

  return tile;
};

const parseInput = (input: string[]): Tile[] => {
  let tileData: string[] = [];
  let tileNumber = -1;
  const tiles: Tile[] = [];
  for (const line of input) {
    if (line === '') {
      tiles.push(parseTile(tileNumber, tileData));
      tileNumber = -1;
      tileData = [];
    } else if (line.startsWith('Tile ')) {
      tileNumber = +line.substr(5, 4);
    } else {
      tileData.push(line);
    }
  }
  tiles.push(parseTile(tileNumber, tileData));

  return tiles;
};

const solvePart1 = (input: string[]): number => {
  const tiles = parseInput(input);

  for (let i = 0; i < tiles.length - 1; i += 1) {
    for (let j = i + 1; j < tiles.length; j += 1) {
      calculateMatches(tiles[i], tiles[j]);
    }
  }

  return tiles.filter((t) => t.matches.size === 2).reduce((r, t) => r * t.id, 1);
};

type TestCase = {
  input: string[];
  expectedOutput: number;
};

const testCasesPart1: TestCase[] = [
  {
    input: [
      'Tile 2311:',
      '..##.#..#.',
      '##..#.....',
      '#...##..#.',
      '####.#...#',
      '##.##.###.',
      '##...#.###',
      '.#.#.#..##',
      '..#....#..',
      '###...#.#.',
      '..###..###',
      '',
      'Tile 1951:',
      '#.##...##.',
      '#.####...#',
      '.....#..##',
      '#...######',
      '.##.#....#',
      '.###.#####',
      '###.##.##.',
      '.###....#.',
      '..#.#..#.#',
      '#...##.#..',
      '',
      'Tile 1171:',
      '####...##.',
      '#..##.#..#',
      '##.#..#.#.',
      '.###.####.',
      '..###.####',
      '.##....##.',
      '.#...####.',
      '#.##.####.',
      '####..#...',
      '.....##...',
      '',
      'Tile 1427:',
      '###.##.#..',
      '.#..#.##..',
      '.#.##.#..#',
      '#.#.#.##.#',
      '....#...##',
      '...##..##.',
      '...#.#####',
      '.#.####.#.',
      '..#..###.#',
      '..##.#..#.',
      '',
      'Tile 1489:',
      '##.#.#....',
      '..##...#..',
      '.##..##...',
      '..#...#...',
      '#####...#.',
      '#..#.#.#.#',
      '...#.#.#..',
      '##.#...##.',
      '..##.##.##',
      '###.##.#..',
      '',
      'Tile 2473:',
      '#....####.',
      '#..#.##...',
      '#.##..#...',
      '######.#.#',
      '.#...#.#.#',
      '.#########',
      '.###.#..#.',
      '########.#',
      '##...##.#.',
      '..###.#.#.',
      '',
      'Tile 2971:',
      '..#.#....#',
      '#...###...',
      '#.#.###...',
      '##.##..#..',
      '.#####..##',
      '.#..####.#',
      '#..#.#..#.',
      '..####.###',
      '..#.#.###.',
      '...#.#.#.#',
      '',
      'Tile 2729:',
      '...#.#.#.#',
      '####.#....',
      '..#.#.....',
      '....#..#.#',
      '.##..##.#.',
      '.#.####...',
      '####.#.#..',
      '##.####...',
      '##..#.##..',
      '#.##...##.',
      '',
      'Tile 3079:',
      '#.#.#####.',
      '.#..######',
      '..#.......',
      '######....',
      '####.#..#.',
      '.#...#.##.',
      '#.#####.##',
      '..#.###...',
      '..#.......',
      '..#.###...',
    ],
    expectedOutput: 20899048083289,
  },
];

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
  const expectedOutput = 13224049461431;
  const output = solvePart1(challengeInput);
  if (output == expectedOutput) {
    console.log(`✅ Challenge: ${output}`);
  } else {
    console.log(`❌ Challenge: Expected output ${expectedOutput}, got ${output}`);
  }
});

/*
--- Part Two ---
Now, you're ready to check the image for sea monsters.

The borders of each tile are not part of the actual image; start by removing them.

In the example above, the tiles become:

.#.#..#. ##...#.# #..#####
###....# .#....#. .#......
##.##.## #.#.#..# #####...
###.#### #...#.## ###.#..#
##.#.... #.##.### #...#.##
...##### ###.#... .#####.#
....#..# ...##..# .#.###..
.####... #..#.... .#......

#..#.##. .#..###. #.##....
#.####.. #.####.# .#.###..
###.#.#. ..#.#### ##.#..##
#.####.. ..##..## ######.#
##..##.# ...#...# .#.#.#..
...#..#. .#.#.##. .###.###
.#.#.... #.##.#.. .###.##.
###.#... #..#.##. ######..

.#.#.### .##.##.# ..#.##..
.####.## #.#...## #.#..#.#
..#.#..# ..#.#.#. ####.###
#..####. ..#.#.#. ###.###.
#####..# ####...# ##....##
#.##..#. .#...#.. ####...#
.#.###.. ##..##.. ####.##.
...###.. .##...#. ..#..###
Remove the gaps to form the actual image:

.#.#..#.##...#.##..#####
###....#.#....#..#......
##.##.###.#.#..######...
###.#####...#.#####.#..#
##.#....#.##.####...#.##
...########.#....#####.#
....#..#...##..#.#.###..
.####...#..#.....#......
#..#.##..#..###.#.##....
#.####..#.####.#.#.###..
###.#.#...#.######.#..##
#.####....##..########.#
##..##.#...#...#.#.#.#..
...#..#..#.#.##..###.###
.#.#....#.##.#...###.##.
###.#...#..#.##.######..
.#.#.###.##.##.#..#.##..
.####.###.#...###.#..#.#
..#.#..#..#.#.#.####.###
#..####...#.#.#.###.###.
#####..#####...###....##
#.##..#..#...#..####...#
.#.###..##..##..####.##.
...###...##...#...#..###
Now, you're ready to search for sea monsters! Because your image is monochrome, a sea monster will look like this:

                  # 
#    ##    ##    ###
 #  #  #  #  #  #   
When looking for this pattern in the image, the spaces can be anything; only the # need to match. Also, you might need to rotate or flip your image before it's oriented correctly to find sea monsters. In the above image, after flipping and rotating it to the appropriate orientation, there are two sea monsters (marked with O):

.####...#####..#...###..
#####..#..#.#.####..#.#.
.#.#...#.###...#.##.O#..
#.O.##.OO#.#.OO.##.OOO##
..#O.#O#.O##O..O.#O##.##
...#.#..##.##...#..#..##
#.##.#..#.#..#..##.#.#..
.###.##.....#...###.#...
#.####.#.#....##.#..#.#.
##...#..#....#..#...####
..#.##...###..#.#####..#
....#.##.#.#####....#...
..##.##.###.....#.##..#.
#...#...###..####....##.
.#.##...#.##.#.#.###...#
#.###.#..####...##..#...
#.###...#.##...#.##O###.
.O##.#OO.###OO##..OOO##.
..O#.O..O..O.#O##O##.###
#.#..##.########..#..##.
#.#####..#.#...##..#....
#....##..#.#########..##
#...#.....#..##...###.##
#..###....##.#...##.##.#
Determine how rough the waters are in the sea monsters' habitat by counting the number of # that are not part of a sea monster. In the above example, the habitat's water roughness is 273.

How many # are not part of a sea monster?
*/

console.log(`\n🧝‍♂️🧝‍♂️🧝‍♂️ Part 2 🧝‍♀️🧝‍♀️🧝‍♀️`);

const rotate90Clockwise = (tile: Tile) => {
  let rotated: string[] = Array(tile.content[0].length).fill('');
  for (let c = 0; c < tile.content[0].length; c += 1) {
    for (let r = tile.content.length - 1; r >= 0; r -= 1) {
      rotated[c] += tile.content[r][c];
    }
  }

  tile.content = rotated;
  tile.borders = [
    reversed(tile.borders[3], tile.content.length),
    tile.borders[0],
    reversed(tile.borders[1], tile.content.length),
    tile.borders[2],
  ];
  const newMatches = new Map<number, Match>();
  for (let b = 0; b < 4; b += 1) {
    if (tile.matches.has(b)) {
      newMatches.set((b + 1) % 4, tile.matches.get(b)!);
    }
  }
  tile.matches = newMatches;
};

const swapMatches = (matches: Map<number, Match>, first: number, second: number) => {
  if (matches.has(first)) {
    const tmp = matches.get(second);
    matches.set(second, matches.get(first)!);
    if (tmp) {
      matches.set(first, tmp);
    }
  } else if (matches.has(second)) {
    const tmp = matches.get(first);
    matches.set(first, matches.get(second)!);
    if (tmp) {
      matches.set(second, tmp);
    }
  }
};

const flip = (tile: Tile, direction: 'h' | 'v') => {
  if (direction === 'h') {
    for (let r = 0; r < tile.content.length; r += 1) {
      tile.content[r] = tile.content[r].split('').reverse().join('');
    }
    tile.borders = [
      reversed(tile.borders[0], tile.content.length),
      tile.borders[3],
      reversed(tile.borders[2], tile.content.length),
      tile.borders[1],
    ];
    swapMatches(tile.matches, 1, 3);
  } else {
    tile.content = tile.content.reverse();
    tile.borders = [
      tile.borders[2],
      reversed(tile.borders[1], tile.content.length),
      tile.borders[0],
      reversed(tile.borders[3], tile.content.length),
    ];
    swapMatches(tile.matches, 0, 2);
  }
};

const rotateToMatch = (border: number, tile: Tile, borderContent: number[]) => {
  if (match(tile.borders[border], borderContent)) {
    return;
  }

  let borderMatch = -1;
  for (let i = (border + 1) % 4; i != border; i = (i + 1) % 4) {
    if (match(tile.borders[i], borderContent) || match(tile.borders[i], reversed(borderContent, tile.content.length))) {
      borderMatch = i;
      break;
    }
  }

  while (borderMatch !== border) {
    rotate90Clockwise(tile);
    borderMatch = (borderMatch + 1) % 4;
  }

  if (!match(tile.borders[border], borderContent)) {
    flip(tile, [0, 2].includes(border) ? 'h' : 'v');
  }
};

const removeBorders = (tile: string[]): string[] => {
  const result: string[] = [];
  for (let r = 1; r < tile.length - 1; r += 1) {
    result.push(tile[r].substring(1, tile[r].length - 1));
  }
  return result;
};

const imageToOffsets = (image: string[]): number[][] => {
  const offsets: number[][] = [];
  for (let r = 0; r < image.length; r += 1) {
    for (let c = 0; c < image[r].length; c += 1) {
      if (image[r][c] === '#') {
        offsets.push([r, c]);
      }
    }
  }
  return offsets;
};

const searchSeaMonsters = (
  image: Set<string>,
  imageSize: number[],
  seaMonster: number[][],
  seaMonsterSize: number[]
): number => {
  let seaMonstersCount = 0;
  for (let r = 0; r <= imageSize[0] - seaMonsterSize[0]; r += 1) {
    for (let c = 0; c <= imageSize[1] - seaMonsterSize[1]; c += 1) {
      let foundSeaMonster = true;
      for (const offset of seaMonster) {
        if (!image.has(`${r + offset[0]},${c + offset[1]}`)) {
          foundSeaMonster = false;
          break;
        }
      }
      seaMonstersCount += foundSeaMonster ? 1 : 0;
    }
  }
  return seaMonstersCount;
};

const solvePart2 = (input: string[]): number => {
  const tiles = parseInput(input);

  for (let i = 0; i < tiles.length - 1; i += 1) {
    for (let j = i + 1; j < tiles.length; j += 1) {
      calculateMatches(tiles[i], tiles[j]);
    }
  }

  let initialTile = tiles.find((t) => t.matches.size === 2)!;
  while (!(initialTile.matches.has(1) && initialTile.matches.has(2))) {
    rotate90Clockwise(initialTile);
  }

  let image = removeBorders(initialTile.content);
  let row = 0;
  while (true) {
    let tile = initialTile;
    while (tile.matches.has(1)) {
      rotateToMatch(3, tile.matches.get(1)!.tile, tile.borders[1]);
      tile = tile.matches.get(1)!.tile;
      const contentWithoutBorders = removeBorders(tile.content);
      for (let r = 0; r < contentWithoutBorders.length; r += 1) {
        image[row + r] += contentWithoutBorders[r];
      }
    }

    if (initialTile.matches.has(2)) {
      rotateToMatch(0, initialTile.matches.get(2)!.tile, initialTile.borders[2]);
      initialTile = initialTile.matches.get(2)!.tile;

      const contentWithoutBorders = removeBorders(initialTile.content);

      for (let r = 0; r < contentWithoutBorders.length; r += 1) {
        image.push(contentWithoutBorders[r]);
      }
      row += contentWithoutBorders.length;
    } else {
      break;
    }
  }

  const imageOffsets = new Set<string>();
  for (let r = 0; r < image.length; r += 1) {
    for (let c = 0; c < image[r].length; c += 1) {
      if (image[r][c] === '#') {
        imageOffsets.add(`${r},${c}`);
      }
    }
  }

  const seaMonster: Tile = {
    id: 0,
    content: ['                  # ', '#    ##    ##    ###', ' #  #  #  #  #  #   '],
    matches: new Map(),
    borders: [[], [], [], []],
  };

  for (const flipDirection of ['', 'h', 'v', 'h']) {
    if (flipDirection === 'h' || flipDirection === 'v') {
      flip(seaMonster, flipDirection);
    }
    for (let i = 0; i < 4; i += 1) {
      const seaMonsterOffsets = imageToOffsets(seaMonster.content);
      const seaMonsterSize = [seaMonster.content.length, seaMonster.content[0].length];
      const seaMonsters = searchSeaMonsters(
        imageOffsets,
        [image.length, image[0].length],
        seaMonsterOffsets,
        seaMonsterSize
      );

      if (seaMonsters !== 0) {
        return imageOffsets.size - seaMonsters * seaMonsterOffsets.length;
      } else {
        rotate90Clockwise(seaMonster);
      }
    }
  }

  return -1;
};

const testCasesPart2: TestCase[] = [
  {
    input: [
      'Tile 2311:',
      '..##.#..#.',
      '##..#.....',
      '#...##..#.',
      '####.#...#',
      '##.##.###.',
      '##...#.###',
      '.#.#.#..##',
      '..#....#..',
      '###...#.#.',
      '..###..###',
      '',
      'Tile 1951:',
      '#.##...##.',
      '#.####...#',
      '.....#..##',
      '#...######',
      '.##.#....#',
      '.###.#####',
      '###.##.##.',
      '.###....#.',
      '..#.#..#.#',
      '#...##.#..',
      '',
      'Tile 1171:',
      '####...##.',
      '#..##.#..#',
      '##.#..#.#.',
      '.###.####.',
      '..###.####',
      '.##....##.',
      '.#...####.',
      '#.##.####.',
      '####..#...',
      '.....##...',
      '',
      'Tile 1427:',
      '###.##.#..',
      '.#..#.##..',
      '.#.##.#..#',
      '#.#.#.##.#',
      '....#...##',
      '...##..##.',
      '...#.#####',
      '.#.####.#.',
      '..#..###.#',
      '..##.#..#.',
      '',
      'Tile 1489:',
      '##.#.#....',
      '..##...#..',
      '.##..##...',
      '..#...#...',
      '#####...#.',
      '#..#.#.#.#',
      '...#.#.#..',
      '##.#...##.',
      '..##.##.##',
      '###.##.#..',
      '',
      'Tile 2473:',
      '#....####.',
      '#..#.##...',
      '#.##..#...',
      '######.#.#',
      '.#...#.#.#',
      '.#########',
      '.###.#..#.',
      '########.#',
      '##...##.#.',
      '..###.#.#.',
      '',
      'Tile 2971:',
      '..#.#....#',
      '#...###...',
      '#.#.###...',
      '##.##..#..',
      '.#####..##',
      '.#..####.#',
      '#..#.#..#.',
      '..####.###',
      '..#.#.###.',
      '...#.#.#.#',
      '',
      'Tile 2729:',
      '...#.#.#.#',
      '####.#....',
      '..#.#.....',
      '....#..#.#',
      '.##..##.#.',
      '.#.####...',
      '####.#.#..',
      '##.####...',
      '##..#.##..',
      '#.##...##.',
      '',
      'Tile 3079:',
      '#.#.#####.',
      '.#..######',
      '..#.......',
      '######....',
      '####.#..#.',
      '.#...#.##.',
      '#.#####.##',
      '..#.###...',
      '..#.......',
      '..#.###...',
    ],
    expectedOutput: 273,
  },
];

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
  const expectedOutput = 2231;
  const output = solvePart2(challengeInput);
  if (output == expectedOutput) {
    console.log(`✅ Challenge: ${output}`);
  } else {
    console.log(`❌ Challenge: Expected output ${expectedOutput}, got ${output}`);
  }
});
