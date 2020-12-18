import { measuringExecutionTime, readInputFile } from './utilts';

const day = '18';

console.log(`\n🎄🎄🎄🎄🎄 Day ${day} 🎁🎁🎁🎁🎁\n`);

const challengeInput = readInputFile(day)
  .split('\n')
  .map((s) => s.replace(/\s/g, ''));

/*
--- Day 18: Operation Order ---
As you look out the window and notice a heavily-forested continent slowly appear over the horizon, you are interrupted by the child sitting next to you. They're curious if you could help them with their math homework.

Unfortunately, it seems like this "math" follows different rules than you remember.

The homework (your puzzle input) consists of a series of expressions that consist of addition (+), multiplication (*), and parentheses ((...)). Just like normal math, parentheses indicate that the expression inside must be evaluated before it can be used by the surrounding expression. Addition still finds the sum of the numbers on both sides of the operator, and multiplication still finds the product.

However, the rules of operator precedence have changed. Rather than evaluating multiplication before addition, the operators have the same precedence, and are evaluated left-to-right regardless of the order in which they appear.

For example, the steps to evaluate the expression 1 + 2 * 3 + 4 * 5 + 6 are as follows:

1 + 2 * 3 + 4 * 5 + 6
  3   * 3 + 4 * 5 + 6
      9   + 4 * 5 + 6
         13   * 5 + 6
             65   + 6
                 71
Parentheses can override this order; for example, here is what happens if parentheses are added to form 1 + (2 * 3) + (4 * (5 + 6)):

1 + (2 * 3) + (4 * (5 + 6))
1 +    6    + (4 * (5 + 6))
     7      + (4 * (5 + 6))
     7      + (4 *   11   )
     7      +     44
            51
Here are a few more examples:

2 * 3 + (4 * 5) becomes 26.
5 + (8 * 3 + 9 + 3 * 4 * 3) becomes 437.
5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4)) becomes 12240.
((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2 becomes 13632.
Before you can help with the homework, you need to understand it yourself. Evaluate the expression on each line of the homework; what is the sum of the resulting values?
*/

console.log(`🤶🤶🤶 Part 1 🎅🎅🎅`);

type Operation = {
  operator: string;
  left: number | Operation;
  right: number | Operation;
};

const findSameLevelOperator = (pos: number, expression: string, stopSymbols: string[]): number => {
  const end = stopSymbols.includes('(') ? -1 : expression.length;
  const diff = stopSymbols.includes('(') ? -1 : 1;

  for (let depth = 0; pos !== end; pos += diff) {
    if (stopSymbols.includes(expression[pos]) && depth == 0) {
      break;
    } else if (expression[pos] === ')') {
      depth += 1;
    } else if (expression[pos] === '(') {
      depth -= 1;
    }
  }
  return pos;
};

const parse = (expression: string): Operation | number => {
  if (expression[expression.length - 1] === ')') {
    const blockStart = findSameLevelOperator(expression.length - 2, expression, ['(']);
    if (blockStart - 1 >= 0) {
      return {
        operator: expression[blockStart - 1],
        left: parse(expression.substr(0, blockStart - 1)),
        right: parse(expression.substr(blockStart + 1, expression.length - blockStart - 2)),
      };
    } else {
      return parse(expression.substr(1, expression.length - 2));
    }
  } else if (expression.match(/^\d+$/)) {
    return +expression;
  } else {
    const match = expression.match(/^(.*)([*+])(\d+)/)!;
    return { operator: match[2], left: parse(match[1]), right: +match[3] };
  }
};

const perform = (operation: Operation | number): number => {
  if (typeof operation === 'number') {
    return operation;
  }

  const op = operation as Operation;
  return op.operator === '+' ? perform(op.left) + perform(op.right) : perform(op.left) * perform(op.right);
};

const resolve = (expression: string): number => {
  return perform(parse(expression));
};

const solvePart1 = (input: string[]): number => {
  return input.reduce((sum, exp) => sum + resolve(exp), 0);
};

type TestCase = {
  input: string[];
  expectedOutput: number;
};

const testCasesPart1: TestCase[] = [
  { input: ['1 + 2 * 3 + 4 * 5 + 6'], expectedOutput: 71 },
  { input: ['1 + (2 * 3) + (4 * (5 + 6))'], expectedOutput: 51 },
  { input: ['2 * 3 + (4 * 5)'], expectedOutput: 26 },
  { input: ['2 * 3 + (4 * 5) * (1 + 2)'], expectedOutput: 78 },
  { input: ['5 + (8 * 3 + 9 + 3 * 4 * 3)'], expectedOutput: 437 },
  { input: ['5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))'], expectedOutput: 12240 },
  { input: ['((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2'], expectedOutput: 13632 },
];

const runAndVerifyPart1 = ({ input, expectedOutput }: TestCase) => {
  const output = solvePart1(input.map((s) => s.replace(/\s/g, '')));
  if (output == expectedOutput) {
    console.log(`✅ Input: ${input} -> Output: ${output}`);
  } else {
    console.log(`❌ Input: ${input} -> Expected output ${expectedOutput}, got ${output}`);
  }
};

console.log('Test cases:');
testCasesPart1.forEach(runAndVerifyPart1);

measuringExecutionTime(() => {
  const expectedOutput = 3348222486398;
  const output = solvePart1(challengeInput);
  if (output == expectedOutput) {
    console.log(`✅ Challenge: ${output}`);
  } else {
    console.log(`❌ Challenge: Expected output ${expectedOutput}, got ${output}`);
  }
});

/*
--- Part Two ---
You manage to answer the child's questions and they finish part 1 of their homework, but get stuck when they reach the next section: advanced math.

Now, addition and multiplication have different precedence levels, but they're not the ones you're familiar with. Instead, addition is evaluated before multiplication.

For example, the steps to evaluate the expression 1 + 2 * 3 + 4 * 5 + 6 are now as follows:

1 + 2 * 3 + 4 * 5 + 6
  3   * 3 + 4 * 5 + 6
  3   *   7   * 5 + 6
  3   *   7   *  11
     21       *  11
         231
Here are the other examples from above:

1 + (2 * 3) + (4 * (5 + 6)) still becomes 51.
2 * 3 + (4 * 5) becomes 46.
5 + (8 * 3 + 9 + 3 * 4 * 3) becomes 1445.
5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4)) becomes 669060.
((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2 becomes 23340.
What do you get if you add up the results of evaluating the homework problems using these new rules?
*/

console.log(`\n🧝‍♂️🧝‍♂️🧝‍♂️ Part 2 🧝‍♀️🧝‍♀️🧝‍♀️`);

const addPrecedenceParenthesis = (expression: string, start: number = 0): string => {
  const pos = expression.indexOf('+', start);
  if (pos < 0) {
    return expression;
  }

  const i = findSameLevelOperator(pos - 1, expression, ['+', '*', '(']);
  const j = findSameLevelOperator(pos + 1, expression, ['+', '*', ')']);

  expression = `${expression.substr(0, i + 1)}(${expression.substr(i + 1, j - i - 1)})${expression.substr(j)}`;

  return addPrecedenceParenthesis(expression, pos + 2);
};

const solvePart2 = (input: string[]): number => {
  return input.reduce((sum, exp) => sum + resolve(addPrecedenceParenthesis(exp)), 0);
};

const testCasesPart2: TestCase[] = [
  { input: ['1 + (2 * 3) + (4 * (5 + 6))'], expectedOutput: 51 },
  { input: ['2 * 3 + (4 * 5)'], expectedOutput: 46 },
  { input: ['5 + (8 * 3 + 9 + 3 * 4 * 3)'], expectedOutput: 1445 },
  { input: ['5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))'], expectedOutput: 669060 },
  { input: ['((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2'], expectedOutput: 23340 },
];

const runAndVerifyPart2 = ({ input, expectedOutput }: TestCase) => {
  const output = solvePart2(input.map((s) => s.replace(/\s/g, '')));
  if (output == expectedOutput) {
    console.log(`✅ Input: ${input} -> Output: ${output}`);
  } else {
    console.log(`❌ Input: ${input} -> Expected output ${expectedOutput}, got ${output}`);
  }
};

console.log('Test cases:');
testCasesPart2.forEach(runAndVerifyPart2);

measuringExecutionTime(() => {
  const expectedOutput = 43423343619505;
  const output = solvePart2(challengeInput);
  if (output == expectedOutput) {
    console.log(`✅ Challenge: ${output}`);
  } else {
    console.log(`❌ Challenge: Expected output ${expectedOutput}, got ${output}`);
  }
});
