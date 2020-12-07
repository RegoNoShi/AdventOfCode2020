import { measuringExecutionTime, readInputFile } from './utilts';

const day = '7';

console.log(`\n🎄🎄🎄🎄🎄 Day ${day} 🎁🎁🎁🎁🎁\n`);

const challengeInput = readInputFile(day).split('\n');

/*
--- Day 7: Handy Haversacks ---
You land at the regional airport in time for your next flight. In fact, it looks like you'll even have time to grab some food: all flights are currently delayed due to issues in luggage processing.

Due to recent aviation regulations, many rules (your puzzle input) are being enforced about bags and their contents; bags must be color-coded and must contain specific quantities of other color-coded bags. Apparently, nobody responsible for these regulations considered how long they would take to enforce!

For example, consider the following rules:

light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.
These rules specify the required contents for 9 bag types. In this example, every faded blue bag is empty, every vibrant plum bag contains 11 bags (5 faded blue and 6 dotted black), and so on.

You have a shiny gold bag. If you wanted to carry it in at least one other bag, how many different bag colors would be valid for the outermost bag? (In other words: how many colors can, eventually, contain at least one shiny gold bag?)

In the above rules, the following options would be available to you:

A bright white bag, which can hold your shiny gold bag directly.
A muted yellow bag, which can hold your shiny gold bag directly, plus some other bags.
A dark orange bag, which can hold bright white and muted yellow bags, either of which could then hold your shiny gold bag.
A light red bag, which can hold bright white and muted yellow bags, either of which could then hold your shiny gold bag.
So, in this example, the number of bag colors that can eventually contain at least one shiny gold bag is 4.

How many bag colors can eventually contain at least one shiny gold bag? (The list of rules is quite long; make sure you get all of it.)
*/

console.log(`🤶🤶🤶 Part 1 🎅🎅🎅`);

const solvePart1 = (input: string[]): number => {
  const bagContainedIn: { [key: string]: string[] } = {};
  for (const rule of input) {
    const extractEnclosingBag = rule.match(/([\w\s]+?)\sbags\scontain\s(.*)/);
    if (extractEnclosingBag && extractEnclosingBag[2] !== 'no other bags.') {
      const externalBag = extractEnclosingBag[1];
      let bagsToExtract = extractEnclosingBag[2];
      while (bagsToExtract != undefined && bagsToExtract !== '') {
        const extractEnclosedBag = bagsToExtract.match(/(\d+)\s([\w\s]+?)\sbags?[,\.]\s?(.*)/);
        if (extractEnclosedBag) {
          if (extractEnclosedBag[2] in bagContainedIn) {
            bagContainedIn[extractEnclosedBag[2]].push(externalBag);
          } else {
            bagContainedIn[extractEnclosedBag[2]] = [externalBag];
          }
          bagsToExtract = extractEnclosedBag[3];
        }
      }
    }
  }

  const bagsToCheck = ['shiny gold'];
  const possibleExternalBags = new Set<string>();
  while (bagsToCheck.length > 0) {
    const bag = bagsToCheck.pop();
    if (bag && bag in bagContainedIn) {
      for (const externalBag of bagContainedIn[bag]) {
        possibleExternalBags.add(externalBag);
        bagsToCheck.push(externalBag);
      }
    }
  }
  return possibleExternalBags.size;
};

type TestCase = {
  input: string[];
  expectedOutput: number;
};

const testCasesPart1: TestCase[] = [
  {
    input: [
      'light red bags contain 1 bright white bag, 2 muted yellow bags.',
      'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
      'bright white bags contain 1 shiny gold bag.',
      'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.',
      'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
      'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
      'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
      'faded blue bags contain no other bags.',
      'dotted black bags contain no other bags.',
    ],
    expectedOutput: 4,
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
  const expectedOutput = 185;
  const output = solvePart1(challengeInput);
  if (output == expectedOutput) {
    console.log(`✅ Challenge: ${output}`);
  } else {
    console.log(`❌ Challenge: Expected output ${expectedOutput}, got ${output}`);
  }
});

/*
--- Part Two ---
It's getting pretty expensive to fly these days - not because of ticket prices, but because of the ridiculous number of bags you need to buy!

Consider again your shiny gold bag and the rules from the above example:

faded blue bags contain 0 other bags.
dotted black bags contain 0 other bags.
vibrant plum bags contain 11 other bags: 5 faded blue bags and 6 dotted black bags.
dark olive bags contain 7 other bags: 3 faded blue bags and 4 dotted black bags.
So, a single shiny gold bag must contain 1 dark olive bag (and the 7 bags within it) plus 2 vibrant plum bags (and the 11 bags within each of those): 1 + 1*7 + 2 + 2*11 = 32 bags!

Of course, the actual rules have a small chance of going several levels deeper than this example; be sure to count all of the bags, even if the nesting becomes topologically impractical!

Here's another example:

shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.
In this example, a single shiny gold bag must contain 126 other bags.

How many individual bags are required inside your single shiny gold bag?
*/

console.log(`\n🧝‍♂️🧝‍♂️🧝‍♂️ Part 2 🧝‍♀️🧝‍♀️🧝‍♀️`);

type ContainedBag = {
  color: string;
  quantity: number;
};

const solvePart2 = (input: string[]): number => {
  const bagContains: { [key: string]: ContainedBag[] } = {};
  for (const rule of input) {
    const extractEnclosingBag = rule.match(/([\w\s]+?)\sbags\scontain\s(.*)/);
    if (extractEnclosingBag && extractEnclosingBag[2] !== 'no other bags.') {
      const externalBag = extractEnclosingBag[1];
      let bagsToExtract = extractEnclosingBag[2];
      while (bagsToExtract != undefined && bagsToExtract !== '') {
        const extractEnclosedBag = bagsToExtract.match(/(\d+)\s([\w\s]+?)\sbags?[,\.]\s?(.*)/);
        if (extractEnclosedBag) {
          if (externalBag in bagContains) {
            bagContains[externalBag].push({
              color: extractEnclosedBag[2],
              quantity: +extractEnclosedBag[1],
            });
          } else {
            bagContains[externalBag] = [
              {
                color: extractEnclosedBag[2],
                quantity: +extractEnclosedBag[1],
              },
            ];
          }
          bagsToExtract = extractEnclosedBag[3];
        }
      }
    }
  }

  const bagsToCheck: ContainedBag[] = [{ color: 'shiny gold', quantity: 1 }];
  let count = 0;
  while (bagsToCheck.length > 0) {
    const { color, quantity } = bagsToCheck.pop()!;
    if (color in bagContains) {
      for (const enclosedBag of bagContains[color]) {
        bagsToCheck.push({ color: enclosedBag.color, quantity: quantity * enclosedBag.quantity });
        count += quantity * enclosedBag.quantity;
      }
    }
  }
  return count;
};

const testCasesPart2: TestCase[] = [
  {
    input: [
      'light red bags contain 1 bright white bag, 2 muted yellow bags.',
      'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
      'bright white bags contain 1 shiny gold bag.',
      'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.',
      'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
      'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
      'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
      'faded blue bags contain no other bags.',
      'dotted black bags contain no other bags.',
    ],
    expectedOutput: 32,
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
  const expectedOutput = 89084;
  const output = solvePart2(challengeInput);
  if (output == expectedOutput) {
    console.log(`✅ Challenge: ${output}`);
  } else {
    console.log(`❌ Challenge: Expected output ${expectedOutput}, got ${output}`);
  }
});
