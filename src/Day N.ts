import { readFileSync } from 'fs';

const day = 'N';

const inputFile = readFileSync(`./inputFiles/Day ${day}.txt`, 'utf-8').trim();

console.log(`Day ${day}\n`);

const challengeInput = inputFile.split(',').map((n) => +n);

/*
Description part 1
*/

console.log(`Part 1`);

const solvePart1 = (input: number[]): number => {
  return input.length;
};

type TestCasePart1 = {
  input: number[];
  expectedOutput: number;
};

const testCasesPart1: TestCasePart1[] = [{ input: [42], expectedOutput: 1 }];

testCasesPart1.forEach(({ input, expectedOutput }) => {
  const output = solvePart1(input);
  if (output == expectedOutput) {
    console.log(`✅ Test case ${input} -> ${expectedOutput}`);
  } else {
    console.log(`❌ Test case ${input} -> Expected: ${expectedOutput}, got ${output}`);
  }
});

const measuringExecutionTime = (block: () => void) => {
  const start = new Date();
  block();
  console.log(`Time elapsed: ${(new Date().getTime() - start.getTime()) / 1000.0} seconds`);
};

measuringExecutionTime(() => {
  const output = solvePart1(challengeInput);
  const expectedOutput = 2;
  console.log(`${output == expectedOutput ? '✅' : '❌'} Solution: ${output}`);
});

/*
Description part 1
*/

console.log(`\nPart 2`);

const solvePart2 = (input: number[]): number => {
  return input.reduce((result, num) => result + num, 0);
};

type TestCasePart2 = {
  input: number[];
  expectedOutput: number;
};

const testCasesPart2: TestCasePart1[] = [{ input: [42, 42, 42], expectedOutput: 126 }];

testCasesPart2.forEach(({ input, expectedOutput }) => {
  const output = solvePart2(input);
  if (output == expectedOutput) {
    console.log(`✅ Test case ${input} -> ${expectedOutput}`);
  } else {
    console.log(`❌ Test case ${input} -> Expected: ${expectedOutput}, got ${output}`);
  }
});

measuringExecutionTime(() => {
  const output = solvePart2(challengeInput);
  const expectedOutput = 84;
  console.log(`${output == expectedOutput ? '✅' : '❌'} Solution: ${output}`);
});
