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

- **Day 5:** each boarding pass can be considered a binary number where F/L are 0s and B/R are 1s. So, it's possible to rewrite FBFBBFFRLR as 0101100 for the row and 101 for the column. Then it's enough to convert those numbers from binary to decimal (44 and 5 in this example). For part 2 it's enough to store the seat IDs in an array, sort the array with all the seat IDs, loop over the array and find the missing seat ID.
