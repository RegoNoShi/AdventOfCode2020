import { measuringExecutionTime, readInputFile } from './utilts';
import { Set } from 'typescript-collections';

const day = '11';

console.log(`\n🎄🎄🎄🎄🎄 Day ${day} 🎁🎁🎁🎁🎁\n`);

const challengeInput = readInputFile(day).split('\n');

/*
--- Day 11: Seating System ---
Your plane lands with plenty of time to spare. The final leg of your journey is a ferry that goes directly to the tropical island where you can finally start your vacation. As you reach the waiting area to board the ferry, you realize you're so early, nobody else has even arrived yet!

By modeling the process people use to choose (or abandon) their seat in the waiting area, you're pretty sure you can predict the best place to sit. You make a quick map of the seat layout (your puzzle input).

The seat layout fits neatly on a grid. Each position is either floor (.), an empty seat (L), or an occupied seat (#). For example, the initial seat layout might look like this:

L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
Now, you just need to model the people who will be arriving shortly. Fortunately, people are entirely predictable and always follow a simple set of rules. All decisions are based on the number of occupied seats adjacent to a given seat (one of the eight positions immediately up, down, left, right, or diagonal from the seat). The following rules are applied to every seat simultaneously:

If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
Otherwise, the seat's state does not change.
Floor (.) never changes; seats don't move, and nobody sits on the floor.

After one round of these rules, every seat in the example layout becomes occupied:

#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##
After a second round, the seats with four or more occupied adjacent seats become empty again:

#.LL.L#.##
#LLLLLL.L#
L.L.L..L..
#LLL.LL.L#
#.LL.LL.LL
#.LLLL#.##
..L.L.....
#LLLLLLLL#
#.LLLLLL.L
#.#LLLL.##
This process continues for three more rounds:

#.##.L#.##
#L###LL.L#
L.#.#..#..
#L##.##.L#
#.##.LL.LL
#.###L#.##
..#.#.....
#L######L#
#.LL###L.L
#.#L###.##
#.#L.L#.##
#LLL#LL.L#
L.L.L..#..
#LLL.##.L#
#.LL.LL.LL
#.LL#L#.##
..L.L.....
#L#LLLL#L#
#.LLLLLL.L
#.#L#L#.##
#.#L.L#.##
#LLL#LL.L#
L.#.L..#..
#L##.##.L#
#.#L.LL.LL
#.#L#L#.##
..L.L.....
#L#L##L#L#
#.LLLLLL.L
#.#L#L#.##
At this point, something interesting happens: the chaos stabilizes and further applications of these rules cause no seats to change state! Once people stop moving around, you count 37 occupied seats.

Simulate your seating area by applying the seating rules repeatedly until no seats change state. How many seats end up occupied?
*/

console.log(`🤶🤶🤶 Part 1 🎅🎅🎅`);

type Offset = {
  xD: number;
  yD: number;
};

const directions: Offset[] = [
  { xD: 1, yD: 0 },
  { xD: 1, yD: -1 },
  { xD: 1, yD: 1 },
  { xD: -1, yD: 0 },
  { xD: -1, yD: 1 },
  { xD: -1, yD: -1 },
  { xD: 0, yD: 1 },
  { xD: 0, yD: -1 },
];

class Seat {
  constructor(public x: number, public y: number) {}

  public toString(): string {
    return this.x + ',' + this.y;
  }
}

const countVisibleOccupiedSeats = (seat: Seat, occupiedSeats: Set<Seat>, offsets: Offset[]) => {
  let count = 0;
  for (const { xD, yD } of offsets) {
    if (occupiedSeats.contains(new Seat(seat.x + xD, seat.y + yD))) {
      count += 1;
    }
  }
  return count;
};

const solvePart1 = (input: string[]): number => {
  const seats = new Set<Seat>();
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === 'L') {
        seats.add(new Seat(x, y));
      }
    }
  }

  let occupiedSeats = new Set<Seat>();
  let changed = true;
  while (changed) {
    changed = false;

    const nextOccupiedSeats = new Set<Seat>();
    for (const { x, y } of seats.toArray()) {
      let count = countVisibleOccupiedSeats(new Seat(x, y), occupiedSeats, directions);

      if (!occupiedSeats.contains(new Seat(x, y)) && count === 0) {
        nextOccupiedSeats.add(new Seat(x, y));
        changed = true;
      } else if (occupiedSeats.contains(new Seat(x, y))) {
        if (count >= 4) {
          changed = true;
        } else {
          nextOccupiedSeats.add(new Seat(x, y));
        }
      }
    }
    occupiedSeats = nextOccupiedSeats;
  }

  return occupiedSeats.size();
};

type TestCase = {
  input: string[];
  expectedOutput: number;
};

const testCasesPart1: TestCase[] = [
  {
    input: [
      'L.LL.LL.LL',
      'LLLLLLL.LL',
      'L.L.L..L..',
      'LLLL.LL.LL',
      'L.LL.LL.LL',
      'L.LLLLL.LL',
      '..L.L.....',
      'LLLLLLLLLL',
      'L.LLLLLL.L',
      'L.LLLLL.LL',
    ],
    expectedOutput: 37,
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
  const expectedOutput = 2483;
  const output = solvePart1(challengeInput);
  if (output == expectedOutput) {
    console.log(`✅ Challenge: ${output}`);
  } else {
    console.log(`❌ Challenge: Expected output ${expectedOutput}, got ${output}`);
  }
});

/*
--- Part Two ---
As soon as people start to arrive, you realize your mistake. People don't just care about adjacent seats - they care about the first seat they can see in each of those eight directions!

Now, instead of considering just the eight immediately adjacent seats, consider the first seat in each of those eight directions. For example, the empty seat below would see eight occupied seats:

.......#.
...#.....
.#.......
.........
..#L....#
....#....
.........
#........
...#.....
The leftmost empty seat below would only see one empty seat, but cannot see any of the occupied ones:

.............
.L.L.#.#.#.#.
.............
The empty seat below would see no occupied seats:

.##.##.
#.#.#.#
##...##
...L...
##...##
#.#.#.#
.##.##.
Also, people seem to be more tolerant than you expected: it now takes five or more visible occupied seats for an occupied seat to become empty (rather than four or more from the previous rules). The other rules still apply: empty seats that see no occupied seats become occupied, seats matching no rule don't change, and floor never changes.

Given the same starting layout as above, these new rules cause the seating area to shift around as follows:

L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL

#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##
#.LL.LL.L#
#LLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLLL.L
#.LLLLL.L#
#.L#.##.L#
#L#####.LL
L.#.#..#..
##L#.##.##
#.##.#L.##
#.#####.#L
..#.#.....
LLL####LL#
#.L#####.L
#.L####.L#
#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##LL.LL.L#
L.LL.LL.L#
#.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLL#.L
#.L#LL#.L#
#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.#L.L#
#.L####.LL
..#.#.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#
#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.LL.L#
#.LLLL#.LL
..#.L.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#
Again, at this point, people stop shifting around and the seating area reaches equilibrium. Once this occurs, you count 26 occupied seats.

Given the new visibility method and the rule change for occupied seats becoming empty, once equilibrium is reached, how many seats end up occupied?
*/

console.log(`\n🧝‍♂️🧝‍♂️🧝‍♂️ Part 2 🧝‍♀️🧝‍♀️🧝‍♀️`);

const visibleSeatsOffsets = (seat: Seat, seats: Set<Seat>, size: { w: number; h: number }) => {
  let visibleOffsets = [];
  for (const { xD, yD } of directions) {
    let distance = 1;
    while (true) {
      const x = seat.x + xD * distance;
      const y = seat.y + yD * distance;
      if (x < 0 || x >= size.w || y < 0 || y >= size.h) {
        break;
      } else if (seats.contains(new Seat(x, y))) {
        visibleOffsets.push({ xD: xD * distance, yD: yD * distance });
        break;
      } else {
        distance += 1;
      }
    }
  }
  return visibleOffsets;
};

const solvePart2 = (input: string[]): number => {
  const seats = new Set<Seat>();
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === 'L') {
        seats.add(new Seat(x, y));
      }
    }
  }

  const visibleSeats: { [key: string]: Offset[] } = {};
  for (const seat of seats.toArray()) {
    visibleSeats[seat.toString()] = visibleSeatsOffsets(seat, seats, { w: input[0].length, h: input.length });
  }

  let occupiedSeats = new Set<Seat>();
  let changed = true;
  while (changed) {
    changed = false;

    const nextOccupiedSeats = new Set<Seat>();
    for (const { x, y } of seats.toArray()) {
      let count = countVisibleOccupiedSeats(new Seat(x, y), occupiedSeats, visibleSeats[x + ',' + y]);

      if (!occupiedSeats.contains(new Seat(x, y)) && count === 0) {
        nextOccupiedSeats.add(new Seat(x, y));
        changed = true;
      } else if (occupiedSeats.contains(new Seat(x, y))) {
        if (count >= 5) {
          changed = true;
        } else {
          nextOccupiedSeats.add(new Seat(x, y));
        }
      }
    }
    occupiedSeats = nextOccupiedSeats;
  }

  return occupiedSeats.size();
};

const testCasesPart2: TestCase[] = [
  {
    input: [
      'L.LL.LL.LL',
      'LLLLLLL.LL',
      'L.L.L..L..',
      'LLLL.LL.LL',
      'L.LL.LL.LL',
      'L.LLLLL.LL',
      '..L.L.....',
      'LLLLLLLLLL',
      'L.LLLLLL.L',
      'L.LLLLL.LL',
    ],
    expectedOutput: 26,
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
  const expectedOutput = 2285;
  const output = solvePart2(challengeInput);
  if (output == expectedOutput) {
    console.log(`✅ Challenge: ${output}`);
  } else {
    console.log(`❌ Challenge: Expected output ${expectedOutput}, got ${output}`);
  }
});
