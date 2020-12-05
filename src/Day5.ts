import { measuringExecutionTime, readInputFile } from './utilts';

const day = '5';

console.log(`\n🎄🎄🎄🎄🎄 Day ${day} 🎁🎁🎁🎁🎁\n`);

const challengeInput = readInputFile(day).split('\n');

/*
--- Day 5: Binary Boarding ---
You board your plane only to discover a new problem: you dropped your boarding pass! You aren't sure which seat is yours, and all of the flight attendants are busy with the flood of people that suddenly made it through passport control.

You write a quick program to use your phone's camera to scan all of the nearby boarding passes (your puzzle input); perhaps you can find your seat through process of elimination.

Instead of zones or groups, this airline uses binary space partitioning to seat people. A seat might be specified like FBFBBFFRLR, where F means "front", B means "back", L means "left", and R means "right".

The first 7 characters will either be F or B; these specify exactly one of the 128 rows on the plane (numbered 0 through 127). Each letter tells you which half of a region the given seat is in. Start with the whole list of rows; the first letter indicates whether the seat is in the front (0 through 63) or the back (64 through 127). The next letter indicates which half of that region the seat is in, and so on until you're left with exactly one row.

For example, consider just the first seven characters of FBFBBFFRLR:

Start by considering the whole range, rows 0 through 127.
F means to take the lower half, keeping rows 0 through 63.
B means to take the upper half, keeping rows 32 through 63.
F means to take the lower half, keeping rows 32 through 47.
B means to take the upper half, keeping rows 40 through 47.
B keeps rows 44 through 47.
F keeps rows 44 through 45.
The final F keeps the lower of the two, row 44.
The last three characters will be either L or R; these specify exactly one of the 8 columns of seats on the plane (numbered 0 through 7). The same process as above proceeds again, this time with only three steps. L means to keep the lower half, while R means to keep the upper half.

For example, consider just the last 3 characters of FBFBBFFRLR:

Start by considering the whole range, columns 0 through 7.
R means to take the upper half, keeping columns 4 through 7.
L means to take the lower half, keeping columns 4 through 5.
The final R keeps the upper of the two, column 5.
So, decoding FBFBBFFRLR reveals that it is the seat at row 44, column 5.

Every seat also has a unique seat ID: multiply the row by 8, then add the column. In this example, the seat has ID 44 * 8 + 5 = 357.

Here are some other boarding passes:

BFFFBBFRRR: row 70, column 7, seat ID 567.
FFFBBBFRRR: row 14, column 7, seat ID 119.
BBFFBBFRLL: row 102, column 4, seat ID 820.
As a sanity check, look through your list of boarding passes. What is the highest seat ID on a boarding pass?
*/

console.log(`🤶🤶🤶 Part 1 🎅🎅🎅`);

const seatToInt = (seat: string) => {
  let row = 0;
  for (let i = 0; i < 7; i++) {
    if (seat[i] == 'B') {
      row += Math.pow(2, 6 - i);
    }
  }
  let col = 0;
  for (let i = 0; i < 3; i++) {
    if (seat[i + 7] == 'R') {
      col += Math.pow(2, 2 - i);
    }
  }
  return row * 8 + col;
};

const solvePart1 = (input: string[]): number => {
  return input.map(seatToInt).reduce((prev, curr) => (prev > curr ? prev : curr));
};

type TestCasePart1 = {
  input: string;
  expectedOutput: number;
};

const testCasesPart1: TestCasePart1[] = [
  {
    input: 'FBFBBFFRLR',
    expectedOutput: 357,
  },
  {
    input: 'BFFFBBFRRR',
    expectedOutput: 567,
  },
  {
    input: 'FFFBBBFRRR',
    expectedOutput: 119,
  },
  {
    input: 'BBFFBBFRLL',
    expectedOutput: 820,
  },
];

const runAndVerifyPart1 = ({ input, expectedOutput }: TestCasePart1) => {
  const output = seatToInt(input);
  if (output == expectedOutput) {
    console.log(`✅ Input: ${input} -> Output: ${output}`);
  } else {
    console.log(`❌ Input: ${input} -> Expected output ${expectedOutput}, got ${output}`);
  }
};

console.log('Test cases:');
testCasesPart1.forEach(runAndVerifyPart1);

measuringExecutionTime(() => {
  const expectedOutput = 861;
  const output = solvePart1(challengeInput);
  if (output == expectedOutput) {
    console.log(`✅ Challenge: ${output}`);
  } else {
    console.log(`❌ Challenge: Expected output ${expectedOutput}, got ${output}`);
  }
});

/*
--- Part Two ---
Ding! The "fasten seat belt" signs have turned on. Time to find your seat.

It's a completely full flight, so your seat should be the only missing boarding pass in your list. However, there's a catch: some of the seats at the very front and back of the plane don't exist on this aircraft, so they'll be missing from your list as well.

Your seat wasn't at the very front or back, though; the seats with IDs +1 and -1 from yours will be in your list.

What is the ID of your seat?
*/

console.log(`\n🧝‍♂️🧝‍♂️🧝‍♂️ Part 2 🧝‍♀️🧝‍♀️🧝‍♀️`);

const solvePart2 = (input: string[]): number | undefined => {
  let occupiedSeats: number[] = [];
  input.forEach((seat) => {
    occupiedSeats.push(seatToInt(seat));
  });

  occupiedSeats.sort();

  for (let i = 0, j = 1; j < occupiedSeats.length; i++, j++) {
    if (occupiedSeats[i] + 1 != occupiedSeats[j]) {
      return occupiedSeats[i] + 1;
    }
  }
  return undefined;
};

type TestCasePart2 = {
  input: string[];
  expectedOutput: number;
};

const testCasesPart2: TestCasePart2[] = [
  { input: ['BFFFBBFRRL', 'BFFFBBFRLR', 'BFFFBBFRLL', 'BFFFBBFRRR', 'BFFFBBFLRL'], expectedOutput: 563 },
];

const runAndVerifyPart2 = ({ input, expectedOutput }: TestCasePart2) => {
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
  const expectedOutput = 633;
  const output = solvePart2(challengeInput);
  if (output == expectedOutput) {
    console.log(`✅ Challenge: ${output}`);
  } else {
    console.log(`❌ Challenge: Expected output ${expectedOutput}, got ${output}`);
  }
});
