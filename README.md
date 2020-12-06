# AdventOfCode2020

Solutions for the [Advent of Code 2020](https://adventofcode.com/2020) in TypeScript (4.1.2)

## To run the solution of the day X from the terminal:

```zsh
$ npx ts-node src/DayX.ts
```

## To run all the solutions:

```zsh
$ yarn run:all
```

## To run the template with auto-reload:

```zsh
$ yarn run:dev
```

## Details about my solutions:

- **Day 1:** the input is not huge, so even a brute force solution (3 nested for loops for part 2) will complete in less than a second. Loop over all the possible groups of 2/3 entries where the sum is 2020. Complexity: O(n<sup>2</sup>) for part 1, O(n<sup>3</sup>) for part 2, where n is the number of entries in the puzzle.
- **Day 2:** for part 1 I used a global regex to count the occurrences of the specified character. For part 2, I checked the characters at the specified position and did a XOR of the 2 checks. Complexity (n is the entries in the puzzle): Θ(n), where n is the number of passwords in the puzzle.
- **Day 3:** I used the modulo to check the content of every position when moving right outside the size of the input. Complexity: Θ(n), where n is the height of the map in the puzzle.
- **Day 4:** I used sets to keep track of the missing fields on the passport. I delete from the set every field I find in the input. For part 2, I used a map from field name to the corresponding validation function. Complexity: Θ(n), where n is the number of passports in the puzzle.
- **Day 5:** each boarding pass can be considered a binary number where F/L are 0s and B/R are 1s. So, it's possible to rewrite FBFBBFFRLR as 0101100 for the row and 101 for the column. Then it's enough to convert those numbers from binary to decimal (44 and 5 in this example). For part 2 it's enough to store the seat IDs in an array, sort the array with all the seat IDs, loop over the array and find the missing seat ID. Complexity: Θ(n) for part 1, O(n\*log(n)) for part 2 (due to the sort), where n is the number of boarding pass in the puzzle.
- **Day 6:** find the groups by splitting the input by \n\n. For part 1: remove the extra \n in the group and create a set from the remaining letters. The size of the set is the answer. For part 2, create a set of all the possible letters. Then, for each person, create a new set from the letters in the row which are in the set. The size of the final set is the answer for part 2. Complexity: Θ(n), where n is the number of people in the puzzle.
