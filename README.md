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

- **Day 1:** the input is not huge, so even a brute force solution (3 nested for loops for part 2) will complete in less than a second. Loop over all the possible groups of 2/3 entries where the sum is 2020. Time complexity: O(n<sup>2</sup>) for part 1, O(n<sup>3</sup>) for part 2, where n is the number of entries in the puzzle.
- **Day 2:** for part 1 I used a global regex to count the occurrences of the specified character. For part 2, I checked the characters at the specified position and did a XOR of the 2 checks. Time complexity (n is the entries in the puzzle): Θ(n), where n is the number of passwords in the puzzle.
- **Day 3:** I used the modulo to check the content of every position when moving right outside the size of the input. Time complexity: Θ(n), where n is the height of the map in the puzzle.
- **Day 4:** I used sets to keep track of the missing fields on the passport. I delete from the set every field I find in the input. For part 2, I used a map from field name to the corresponding validation function. Time complexity: Θ(n), where n is the number of passports in the puzzle.
- **Day 5:** each boarding pass can be considered a binary number where F/L are 0s and B/R are 1s. So, it's possible to rewrite FBFBBFFRLR as 0101100 for the row and 101 for the column. Then it's enough to convert those numbers from binary to decimal (44 and 5 in this example). For part 2 it's enough to store the seat IDs in an array, sort the array with all the seat IDs, loop over the array and find the missing seat ID. Time complexity: Θ(n) for part 1, O(n\*log(n)) for part 2 (due to the sort), where n is the number of boarding pass in the puzzle.
- **Day 6:** find the groups by splitting the input by \n\n. For part 1: remove the extra \n in the group and create a set from the remaining letters. The size of the set is the answer. For part 2, create a set of all the possible letters. Then, for each person, create a new set from the letters in the row which are in the set. The size of the final set is the answer for part 2. Time complexity: Θ(n), where n is the number of people in the puzzle.
- **Day 7:** I use regexp to extract the colors and the quantities from the input. For part 1, I build a map from a bag color to the bag that contains in. After reading the full input, I start from the 'shiny gold' entry and loop over the possible enclosing bags, adding them in a set. The size of the set is the solution for part 1. For part 2, I built a map from the external bag to an array of the enclosed bags (with quantity). Starting from 'shiny gold', I loop over the map keeping track of the relative quantity of each bag (enclosing bag quantity \* enclosed bag quantity). Time complexity: O(n), where n is the number of rules in the puzzle.
- **Day 8:** I use regexp to extract the operation and the parameter. For part 1, I execute all the operations keeping a set of the position of the executed operations. When a position is already in the set, I found the cycle. For part 2, I extract all the positions of the modifiable operations (nop, jmp). I loop over the array of modifiable positions changing it and checking if I hit the final position. Time complexity: O(n) for part 1, O(n<sup>2</sup>) for part 2, where n is the number of operations in the puzzle.
- **Day 9:** I keep an array of the possible addends. For part 1, for each number after the preamble, I check all the possible sums without repetitions whitin the addends. If the sum matches, I add the current number to the addends and I remove the first one (sliding window). For part 2, I check all the possible group sizes starting from 2. I keep the sum of the number in the group and I slide the position of the group, summing up the next number and removing the first one. Time complexity: O(n\*m<sup>2</sup>) for part 1, O(n<sup>2</sup>) for part 2, where n is the size of the puzzle and m is the preamble length.
- **Day 10:** as a preparation, I sorted the input and added a 0 and the final adapter (max value + 3). For part 1 I loop over the array counting how many times the difference is 1 or 3 (there are no 2 jolts differences). Part 2 is more complicated. I counted the sizes of the group of numbers where the difference is 1 jolt. For every group (the maximum size is 4), I count the possible ways I can remove 0, 1, or 2 numbers. Then I multiply together the number of possibilities for each group. Time complexity: Θ(n\*log(n)) due to the initial sort, where n is the size of the puzzle.
- **Day 11:** as usual, I used a set to keep track of the seats and the occupied seats. Part 1 is easy: loop over all the seats, count the occupied neighbors in the 8 possible offsets, and add the occupied seats to a new set if occupied. Keep track of when there is a change and stop when evolution made no changes. Part 2 is very similar but I pre-computed, for each seat, the offsets of all the visible seats from each seat. Then I applied the same algorithm of part 1. Time complexity: Θ(g*l + w*h) for part 1, Θ(l*(g + w*h)) for part 2, where w and h are the width and height of the puzzle, l is the number of seats, and g the number of generations it takes to reach equilibrium.
- **Day 12:** Part 1. To move the ship in the 4 directions (N, S, W, and E) I keep a map from the direction to the corresponding (x, y) offsets. To handle the rotations, I used an ordered array of the 4 directions (E, S, W, N) and I keep track of the current bearing of the ship (initially 0). To apply a rotation I add (or subtract) an amount equal to the degrees divided by 90 to the current bearing and then applying the modulo 4 to the index (adding also a 4 offset to avoid negative numbers). Part 2. The N, S, W, and E commands move the waypoint instead of the ship. To handle the rotations I switch the x and y coordinates of the waypoint. Then I multiply by -1 the y coordinate for right turns and the x coordinate for left turns. Time complexity: Θ(n) where n is the number of moves in the puzzle.
