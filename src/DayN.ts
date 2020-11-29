import { measuringExecutionTime, readInputFile } from './utilts';

const day = 'N';

console.log(`\n🎄🎄🎄🎄🎄 Day ${day} 🎁🎁🎁🎁🎁\n`);

const challengeInput = readInputFile(day)
  .split(',')
  .map((n) => +n);

/*
Description part 1
*/

console.log(`🤶🤶🤶 Part 1 🎅🎅🎅`);

const solvePart1 = (input: number[]): number => {
  return input.length;
};

type TestCasePart1 = {
  input: number[];
  expectedOutput: number;
};

const testCasesPart1: TestCasePart1[] = [{ input: [42], expectedOutput: 1 }];

const runAndVerifyPart1 = ({ input, expectedOutput }: TestCasePart1) => {
  const output = solvePart1(input);
  if (output == expectedOutput) {
    console.log(`✅ Input: ${input} -> Output: ${output}`);
  } else {
    console.log(`❌ Input: ${input} -> Expected output: ${expectedOutput}, got ${output}`);
  }
};

console.log('Test cases:');
testCasesPart1.forEach(runAndVerifyPart1);

measuringExecutionTime(() => {
  console.log('Challenge:');
  runAndVerifyPart1({ input: challengeInput, expectedOutput: 2 });
});

/*
Description part 2
*/

console.log(`\n🧝‍♂️🧝‍♂️🧝‍♂️ Part 2 🧝‍♀️🧝‍♀️🧝‍♀️`);

const solvePart2 = (input: number[]): number => {
  return input.reduce((result, num) => result + num, 0);
};

type TestCasePart2 = {
  input: number[];
  expectedOutput: number;
};

const testCasesPart2: TestCasePart2[] = [{ input: [42, 42, 42], expectedOutput: 126 }];

const runAndVerifyPart2 = ({ input, expectedOutput }: TestCasePart2) => {
  const output = solvePart2(input);
  if (output == expectedOutput) {
    console.log(`✅ Input: ${input} -> Output: ${output}`);
  } else {
    console.log(`❌ Input: ${input} -> Expected output: ${expectedOutput}, got ${output}`);
  }
};

console.log('Test cases:');
testCasesPart2.forEach(runAndVerifyPart2);

measuringExecutionTime(() => {
  console.log('Challenge:');
  runAndVerifyPart2({ input: challengeInput, expectedOutput: 84 });
});
