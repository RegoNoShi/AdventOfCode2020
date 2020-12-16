import { measuringExecutionTime, readInputFile } from './utilts';

const day = '16';

console.log(`\n🎄🎄🎄🎄🎄 Day ${day} 🎁🎁🎁🎁🎁\n`);

const challengeInput = readInputFile(day).split('\n');

/*
--- Day 16: Ticket Translation ---
As you're walking to yet another connecting flight, you realize that one of the legs of your re-routed trip coming up is on a high-speed train. However, the train ticket you were given is in a language you don't understand. You should probably figure out what it says before you get to the train station after the next flight.

Unfortunately, you can't actually read the words on the ticket. You can, however, read the numbers, and so you figure out the fields these tickets must have and the valid ranges for values in those fields.

You collect the rules for ticket fields, the numbers on your ticket, and the numbers on other nearby tickets for the same train service (via the airport security cameras) together into a single document you can reference (your puzzle input).

The rules for ticket fields specify a list of fields that exist somewhere on the ticket and the valid ranges of values for each field. For example, a rule like class: 1-3 or 5-7 means that one of the fields in every ticket is named class and can be any value in the ranges 1-3 or 5-7 (inclusive, such that 3 and 5 are both valid in this field, but 4 is not).

Each ticket is represented by a single line of comma-separated values. The values are the numbers on the ticket in the order they appear; every ticket has the same format. For example, consider this ticket:

.--------------------------------------------------------.
| ????: 101    ?????: 102   ??????????: 103     ???: 104 |
|                                                        |
| ??: 301  ??: 302             ???????: 303      ??????? |
| ??: 401  ??: 402           ???? ????: 403    ????????? |
'--------------------------------------------------------'
Here, ? represents text in a language you don't understand. This ticket might be represented as 101,102,103,104,301,302,303,401,402,403; of course, the actual train tickets you're looking at are much more complicated. In any case, you've extracted just the numbers in such a way that the first number is always the same specific field, the second number is always a different specific field, and so on - you just don't know what each position actually means!

Start by determining which tickets are completely invalid; these are tickets that contain values which aren't valid for any field. Ignore your ticket for now.

For example, suppose you have the following notes:

class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12
It doesn't matter which position corresponds to which field; you can identify invalid nearby tickets by considering only whether tickets contain values that are not valid for any field. In this example, the values on the first nearby ticket are all valid for at least one field. This is not true of the other three nearby tickets: the values 4, 55, and 12 are are not valid for any field. Adding together all of the invalid values produces your ticket scanning error rate: 4 + 55 + 12 = 71.

Consider the validity of the nearby tickets you scanned. What is your ticket scanning error rate?
*/

console.log(`🤶🤶🤶 Part 1 🎅🎅🎅`);

const solvePart1 = (input: string[]): number => {
  let ticketScanningErrorRate = 0;
  let validRanges: { start: number; end: number }[] = [];

  let row = 0;
  for (; input[row] !== ''; row += 1) {
    const rulesRegexp = /^([a-z\s]+):\s(\d+)-(\d+)(?:\sor\s(\d+)-(\d+))*$/;
    const ruleMatch = input[row].match(rulesRegexp)!;
    for (let matchGroup = 2; matchGroup < ruleMatch.length; matchGroup += 2) {
      validRanges.push({ start: +ruleMatch[matchGroup], end: +ruleMatch[matchGroup + 1] });
    }
  }

  for (row += 5; row < input.length; row += 1) {
    const ticketFields = input[row].split(',').map((n) => +n);
    for (const ticketField of ticketFields) {
      let valid = false;
      for (const range of validRanges) {
        valid = valid || (ticketField >= range.start && ticketField <= range.end);
        if (valid) {
          break;
        }
      }

      if (!valid) {
        ticketScanningErrorRate += ticketField;
      }
    }
  }

  return ticketScanningErrorRate;
};

type TestCasePart1 = {
  input: string[];
  expectedOutput: number;
};

const testCasesPart1: TestCasePart1[] = [
  {
    input: [
      'class: 1-3 or 5-7',
      'row: 6-11 or 33-44',
      'seat: 13-40 or 45-50',
      '',
      'your ticket:',
      '7,1,14',
      '',
      'nearby tickets:',
      '7,3,47',
      '40,4,50',
      '55,2,20',
      '38,6,12',
    ],
    expectedOutput: 71,
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
  const expectedOutput = 22977;
  const output = solvePart1(challengeInput);
  if (output == expectedOutput) {
    console.log(`✅ Challenge: ${output}`);
  } else {
    console.log(`❌ Challenge: Expected output ${expectedOutput}, got ${output}`);
  }
});

/*
--- Part Two ---
Now that you've identified which tickets contain invalid values, discard those tickets entirely. Use the remaining valid tickets to determine which field is which.

Using the valid ranges for each field, determine what order the fields appear on the tickets. The order is consistent between all tickets: if seat is the third field, it is the third field on every ticket, including your ticket.

For example, suppose you have the following notes:

class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9
Based on the nearby tickets in the above example, the first position must be row, the second position must be class, and the third position must be seat; you can conclude that in your ticket, class is 12, row is 11, and seat is 13.

Once you work out which field is which, look for the six fields on your ticket that start with the word departure. What do you get if you multiply those six values together?
*/

console.log(`\n🧝‍♂️🧝‍♂️🧝‍♂️ Part 2 🧝‍♀️🧝‍♀️🧝‍♀️`);

const solvePart2 = (input: string[], fieldName: string): number => {
  const allFields = new Set<string>();

  let validRanges: {
    field: string;
    firstStart: number;
    firstEnd: number;
    secondStart: number;
    secondEnd: number;
  }[] = [];

  let row = 0;
  for (; input[row] !== ''; row += 1) {
    const rulesRegexp = /^([a-z\s]+):\s(\d+)-(\d+)(?:\sor\s(\d+)-(\d+))*$/;
    const ruleMatch = input[row].match(rulesRegexp)!;
    allFields.add(ruleMatch[1]);
    validRanges.push({
      field: ruleMatch[1],
      firstStart: +ruleMatch[2],
      firstEnd: +ruleMatch[3],
      secondStart: +ruleMatch[4],
      secondEnd: +ruleMatch[5],
    });
  }

  const myTicketFields = input[row + 2].split(',').map((n) => +n);

  const possibleFieldsForPosition: Set<string>[] = [];
  let allPositions = new Set<number>();
  for (let f = 0; f < myTicketFields.length; f++) {
    allPositions.add(f);
    possibleFieldsForPosition.push(new Set(allFields));
  }

  for (row += 5; row < input.length; row += 1) {
    const ticketFields = input[row].split(',').map((n) => +n);

    let validTicket = true;
    for (let p = 0; p < ticketFields.length; p++) {
      const ticketField = ticketFields[p];

      let validField = false;
      for (const range of validRanges) {
        if (
          (ticketField >= range.firstStart && ticketField <= range.firstEnd) ||
          (ticketField >= range.secondStart && ticketField <= range.secondEnd)
        ) {
          validField = true;
          break;
        }
      }

      if (!validField) {
        validTicket = false;
        break;
      }
    }

    if (!validTicket) {
      continue;
    }

    for (let p = 0; p < ticketFields.length; p++) {
      const ticketField = ticketFields[p];

      for (const range of validRanges) {
        if (
          (ticketField < range.firstStart || ticketField > range.firstEnd) &&
          (ticketField < range.secondStart || ticketField > range.secondEnd) &&
          possibleFieldsForPosition[p].has(range.field)
        ) {
          possibleFieldsForPosition[p].delete(range.field);
        }
      }
    }
  }

  while (allPositions.size > 0) {
    let pos = -1;
    for (let p of allPositions) {
      if (possibleFieldsForPosition[p].size === 1) {
        pos = p;
        break;
      }
    }

    allPositions.delete(pos);
    const field: string = possibleFieldsForPosition[pos].values().next().value;

    for (let p = 0; p < myTicketFields.length; p++) {
      if (p !== pos && possibleFieldsForPosition[p].has(field)) {
        possibleFieldsForPosition[p].delete(field);
      }
    }
  }

  let result = 1;
  for (let p = 0; p < possibleFieldsForPosition.length; p++) {
    const field: string = possibleFieldsForPosition[p].values().next().value;
    if (field.indexOf(fieldName) >= 0) {
      result *= myTicketFields[p];
    }
  }

  return result;
};

type TestCasePart2 = {
  input: string[];
  field: string;
  expectedOutput: number;
};

const testCasesPart2: TestCasePart2[] = [
  {
    input: [
      'class: 0-1 or 4-19',
      'row: 0-5 or 8-19',
      'seat: 0-13 or 16-19',
      '',
      'your ticket:',
      '11,12,13',
      '',
      'nearby tickets:',
      '3,9,18',
      '15,1,5',
      '5,14,9',
    ],
    field: 'class',
    expectedOutput: 12,
  },
];

const runAndVerifyPart2 = ({ input, field, expectedOutput }: TestCasePart2) => {
  const output = solvePart2(input, field);
  if (output == expectedOutput) {
    console.log(`✅ Input: ${input} -> Output: ${output}`);
  } else {
    console.log(`❌ Input: ${input} -> Expected output ${expectedOutput}, got ${output}`);
  }
};

console.log('Test cases:');
testCasesPart2.forEach(runAndVerifyPart2);

measuringExecutionTime(() => {
  const expectedOutput = 998358379943;
  const output = solvePart2(challengeInput, 'departure');
  if (output == expectedOutput) {
    console.log(`✅ Challenge: ${output}`);
  } else {
    console.log(`❌ Challenge: Expected output ${expectedOutput}, got ${output}`);
  }
});
