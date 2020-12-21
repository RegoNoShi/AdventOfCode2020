import { measuringExecutionTime, readInputFile } from './utilts';

const day = '21';

console.log(`\n🎄🎄🎄🎄🎄 Day ${day} 🎁🎁🎁🎁🎁\n`);

const challengeInput = readInputFile(day).split('\n');

/*
Description part 1
*/

console.log(`🤶🤶🤶 Part 1 🎅🎅🎅`);

const elaborateInput = (input: string[]) => {
  const allergenToIngredients = new Map<string, Set<string>>();
  const ingredientToQuantity = new Map<string, number>();
  for (const line of input) {
    const match = line.match(/^([\w\s]+)\s\(contains\s([\w\s,]+)\)$/)!;
    const ingredients = match[1].split(' ');
    ingredients.forEach((i) => {
      if (ingredientToQuantity.has(i)) {
        ingredientToQuantity.set(i, ingredientToQuantity.get(i)! + 1);
      } else {
        ingredientToQuantity.set(i, 1);
      }
    });
    const allergens = match[2].split(', ');
    for (const allergen of allergens) {
      if (allergenToIngredients.has(allergen)) {
        const allergenIngredients = allergenToIngredients.get(allergen)!;
        const newIngredients = new Set(ingredients.filter((i) => allergenIngredients.has(i)));
        allergenToIngredients.set(allergen, newIngredients);
      } else {
        allergenToIngredients.set(allergen, new Set(ingredients));
      }
    }
  }

  return { allergenToIngredients, ingredientToQuantity };
};

const solvePart1 = (input: string[]): number => {
  const { allergenToIngredients, ingredientToQuantity } = elaborateInput(input);

  allergenToIngredients.forEach((ingredients) => {
    ingredients.forEach((ingredient) => {
      ingredientToQuantity.delete(ingredient);
    });
  });

  return [...ingredientToQuantity.values()].reduce((q1, q2) => q1 + q2);
};

type TestCasePart1 = {
  input: string[];
  expectedOutput: number;
};

const testCasesPart1: TestCasePart1[] = [
  {
    input: [
      'mxmxvkd kfcds sqjhc nhms (contains dairy, fish)',
      'trh fvjkl sbzzf mxmxvkd (contains dairy)',
      'sqjhc fvjkl (contains soy)',
      'sqjhc mxmxvkd sbzzf (contains fish)',
    ],
    expectedOutput: 5,
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
  const expectedOutput = 1913;
  const output = solvePart1(challengeInput);
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

const solvePart2 = (input: string[]): string => {
  const { allergenToIngredients } = elaborateInput(input);

  let deleted = true;
  while (deleted) {
    deleted = false;
    allergenToIngredients.forEach((ingredients, allergen) => {
      if (ingredients.size === 1) {
        const ingredient = [...ingredients.values()][0];
        allergenToIngredients.forEach((i, a) => {
          if (a === allergen) {
            return;
          }
          if (i.has(ingredient)) {
            i.delete(ingredient);
            deleted = true;
          }
        });
      }
    });
  }

  return [...allergenToIngredients.entries()]
    .sort((aToI1, aToI2) => (aToI1[0] < aToI2[0] ? -1 : aToI1[0] > aToI2[0] ? 1 : 0))
    .map((aToI) => [...aToI[1].values()][0])
    .join(',');
};

type TestCasePart2 = {
  input: string[];
  expectedOutput: string;
};

const testCasesPart2: TestCasePart2[] = [
  {
    input: [
      'mxmxvkd kfcds sqjhc nhms (contains dairy, fish)',
      'trh fvjkl sbzzf mxmxvkd (contains dairy)',
      'sqjhc fvjkl (contains soy)',
      'sqjhc mxmxvkd sbzzf (contains fish)',
    ],
    expectedOutput: 'mxmxvkd,sqjhc,fvjkl',
  },
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
  const expectedOutput = 'gpgrb,tjlz,gtjmd,spbxz,pfdkkzp,xcfpc,txzv,znqbr';
  const output = solvePart2(challengeInput);
  if (output == expectedOutput) {
    console.log(`✅ Challenge: ${output}`);
  } else {
    console.log(`❌ Challenge: Expected output ${expectedOutput}, got ${output}`);
  }
});
