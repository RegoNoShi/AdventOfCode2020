import { measuringExecutionTime, readInputFile } from './utilts';
import { LinkedList } from './DoublyLinkedList';

const day = '23';

console.log(`\n🎄🎄🎄🎄🎄 Day ${day} 🎁🎁🎁🎁🎁\n`);

const challengeInput = readInputFile(day).split('\n')[0];

/*
Description part 1
*/

console.log(`🤶🤶🤶 Part 1 🎅🎅🎅`);

const solvePart1 = (input: string, moves: number): string => {
  let game = new LinkedList<number>();
  for (const n of input.split('').map((n) => +n)) {
    game.push(n);
  }
  const maxNumber = game.length;

  for (let move = 1; move <= moves; move += 1) {
    const first = game.removeFirst()!;
    const pickUp: number[] = [];
    pickUp.push(game.removeFirst()!);
    pickUp.push(game.removeFirst()!);
    pickUp.push(game.removeFirst()!);
    let insertAfter = ((first + maxNumber - 2) % maxNumber) + 1;
    while (pickUp.includes(insertAfter)) {
      insertAfter = ((insertAfter + maxNumber - 2) % maxNumber) + 1;
    }
    game.insertAfter(insertAfter, pickUp);
    game.push(first);
  }

  while (game.first() !== 1) {
    const tmp = game.removeFirst()!;
    game.push(tmp);
  }

  game.removeFirst();

  let result = '';
  while (game.length > 0) {
    result += `${game.removeFirst()!}`;
  }

  return result;
};

type TestCasePart1 = {
  input: string;
  moves: number;
  expectedOutput: string;
};

const testCasesPart1: TestCasePart1[] = [
  { input: '389125467', moves: 10, expectedOutput: '92658374' },
  { input: '389125467', moves: 100, expectedOutput: '67384529' },
];

const runAndVerifyPart1 = ({ input, moves, expectedOutput }: TestCasePart1) => {
  const output = solvePart1(input, moves);
  if (output == expectedOutput) {
    console.log(`✅ Input: ${input} -> Output: ${output}`);
  } else {
    console.log(`❌ Input: ${input} -> Expected output ${expectedOutput}, got ${output}`);
  }
};

console.log('Test cases:');
testCasesPart1.forEach(runAndVerifyPart1);

measuringExecutionTime(() => {
  const expectedOutput = '29385746';
  const output = solvePart1(challengeInput, 100);
  if (output == expectedOutput) {
    console.log(`✅ Challenge: ${output}`);
  } else {
    console.log(`❌ Challenge: Expected output ${expectedOutput}, got ${output}`);
  }
});

/*
Description part 2
*/

console.log(`\n🧝‍♂️🧝‍♂️🧝‍♂️ Part 2 🧝‍♀️🧝‍♀️🧝‍♀️`);

const solvePart2 = (input: string): number => {
  let game = new LinkedList<number>();
  for (const n of input.split('').map((n) => +n)) {
    game.push(n);
  }
  for (let n = game.length + 1; n <= 1000000; n += 1) {
    game.push(n);
  }
  let maxNumber = game.length;

  for (let move = 1; move <= 10000000; move += 1) {
    const first = game.removeFirst()!;
    const pickUp: number[] = [];
    pickUp.push(game.removeFirst()!);
    pickUp.push(game.removeFirst()!);
    pickUp.push(game.removeFirst()!);
    let insertAfter = ((first + maxNumber - 2) % maxNumber) + 1;
    while (pickUp.includes(insertAfter)) {
      insertAfter = ((insertAfter + maxNumber - 2) % maxNumber) + 1;
    }
    game.insertAfter(insertAfter, pickUp);
    game.push(first);
  }

  const n1 = game.nextAfter(1)!;
  const n2 = game.nextAfter(n1)!;

  return n1 * n2;
};

type TestCasePart2 = {
  input: string;
  expectedOutput: number;
};

const testCasesPart2: TestCasePart2[] = [{ input: '389125467', expectedOutput: 149245887792 }];

const runAndVerifyPart2 = ({ input, expectedOutput }: TestCasePart2) => {
  const output = solvePart2(input);
  if (output == expectedOutput) {
    console.log(`✅ Input: ${input} -> Output: ${output}`);
  } else {
    console.log(`❌ Input: ${input} -> Expected output ${expectedOutput}, got ${output}`);
  }
};

console.log('Test cases:');
measuringExecutionTime(() => {
  testCasesPart2.forEach(runAndVerifyPart2);
});

measuringExecutionTime(() => {
  const expectedOutput = 680435423892;
  const output = solvePart2(challengeInput);
  if (output == expectedOutput) {
    console.log(`✅ Challenge: ${output}`);
  } else {
    console.log(`❌ Challenge: Expected output ${expectedOutput}, got ${output}`);
  }
});
