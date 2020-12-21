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
- **Day 13:** part 1 is very easy, it's just enough to find, for each bus, the first multiple bigger than the earliest arrival time and find the bus with the minimum difference. Part 2 can be solved using the [Chinese remainder theorem](https://en.wikipedia.org/wiki/Chinese_remainder_theorem) and the [Extended Euclidean algorithm](https://en.wikipedia.org/wiki/Extended_Euclidean_algorithm). Another approach, being the bus IDs coprime, is the following. Starting at t0=0, I increment the time by i1, where i1 is the first bus ID until I find a time t1 where (t1 + o2) is divisible by i2 (being i2 and o2 respectively the ID and the offset of the second bus). Then, I know that this conditions repeats every (i1 \* i2). Now, I increment time by (i1 \* i2) until I find a time t2 where (t2 + o3) is divisible by i3 (being i3 and o3 respectively the ID and the offset of the third bus). Then, I know that this conditions repeats every (i1 \* i2 \* i3). And so on till the last bus. I had some trouble implementing this solution in TS due to the not big enough precision of number (only 15 digits of precisions, bigint are required). Time complexity: Θ(n) for part 1 where n is the number of busses in the puzzle. For part 2, it's not possible (or at least I'm not able) to estimate the complexity, due to the algorithm relying on properties of coprime numbers.
- **Day 14:** part 1 is straight forward. I keep track of the current mask and, for each assignment, I convert the decimal number to binary, I apply the mask and then I convert back to decimal. I use a map to simulate the memory. For part 2 I used a similar approach. First, I convert the memory address to binay, I apply the mask saving the indexes of the 'X'. Then, for each 'X', I create 2 copies of the address replacing the X with a '0' or a '1'. Then I convert all the addresses back to decimal and I perform the assignments. Time complexity: Θ(n) for part 1 where n is the number of memory assignment in the puzzle. For part 2 the complexity is exponential on the number of 'X' in the masks, so it depends a lot on the type of input.
- **Day 15:** this time the code is unique for parts 1 and 2. I use a map to keep track of every spoken number with the last 2 turns when it was spoken. When a number is spoken for the first time, I add it to the map, and the two turns are the same number (the current turn). This way, the difference will be 0 in the next turn. Otherwise, if a number was already spoken, I shift the last turn it was spoken on the second last turn and I set the last turn to the current turn. Time complexity: Θ(n) where n is the number of turns of the game.
- **Day 16:** I store all the rules in an array with the 2 valid ranges for each field. Part 1. The field name and my ticket are ignored for part 1. I loop over all the nearby tickets and for each field, I check if it's valid for at least one range of one rule. If not I add it to the solution accumulator. Part 2. The solution I used for part 2 is very similar to what I used for day 4. For each position in the tickets, I keep a set of the possible fields that can be there. I loop over all the positions of all nearby tickets and I remove from the corresponding set the field names where the rule does not match. I end up with an array of sets with the possible fields for each position. There is at least 1 set containing only 1 element. I remove that element from all the other sets. Then, there is at least another 1 set with only 1 element. I continue removing elements from the sets till when all the sets contain only 1 element, the field for that position. Then it's just enough to multiply the values of the fields at the positions corresponding to the 'departure' fields. Time complexity: O(n\*f\*r), where n is the number of nearby tickets, f is the number of fields for each ticket, and r is the number of rules. Part 2 is more complex but it's faster because, for each nearby ticket, I can stop checking the fields as soon as I find an invalid field (for part 1 it's not specified if every nearby ticket has only 1 possible invalid field).
- **Day 17:** as for other puzzles, I used a set to keep track of the active cubes. Initially, I generate all the possible offsets in the 3/4 dimensions. Then I go over the cycles calculating the active cubes for the next generation. The generated 3/4 dimensinal grid of active cubes is simmetric along the z and w axes. To optimize the solution, I consider only the positive part of the z and w axes (a reduction of the cubes to consider of 2x for part 1 and 4x for part 2). At the end I multiply the number of active cubes by 2 for part 1 and 4 for part 2 and I remove the number of active cubes considered twice, the ones with z = 0 and the ones with w = 0 (only for part 2). Time complexity: Θ(c<sup>2</sup>\*w\*h) for part 1 and (c<sup>3</sup>\*w\*h) for part 2, where c is the number of cycles and w and h are respectively the width and the height of the input puzzle.
- **Day 18:** I build a graph for each expression. Every node can be a number or an operation that contains the operator (+, \*) and has two pointers to the left and right operators. I build the graph starting from the end of the string so the deeper nodes, that are executed first, are the operations at the beginning of the expression. I then use an in-order view to visit the tree and perform the operations in the right order. For part 2, I perform an additional step of pre-processing on the expression. I add an extra set of parenthesis around the + operations to guarantee that are executed first. To achieve that, I search all the + in the expression, and from that position, I go up and down to include the left and right operators. Time complexity: O(n\*m), where n and m are the number of expressions the length of the longest expression in the puzzle.
- **Day 19:** to solve the puzzle I built a regexp from the rules specified and then verified all the input messages with the regexp. To build the regexp, I used a recursive approach to navigate the rules graph and return the partial results. For part 2, I modified the recursive regexp builder to return a special regexp for rules 8 and 11. For rule 8, I add a + operator to the regexp for rule 42. For rule 11 I calculate the partial regexp for rules 42 and 31. From the puzzle description, the number of matches for rule 42 must be the same as the matches for rule 31. I then used the {n} operator, with n from 1 to 4, to build the final rule regex. The regexp builder algorithm can be improved by saving the partial results for each rule (not necessary for the size of the puzzle). Time complexity: the built regexp is fairly complicated and their verification for all the input messages takes quite some time. The complexity depends mostly on the type of input rather than its size.
- **Day 20:** wow, this day was tough. I started thinking of a general solution but it was too complicated. Then I checked the input and every border of every tile match at most with another border of another tile. I then used a Tile type to group all the data for each tile: the ID, the content, the borders (4 arrays of integers with the positions of the #, left to right, top to bottom), and a map to save the match for each border. Part 1: after calculating all the matches comparing the borders of the tiles, I multiply the IDs of the corner tiles (the 4 tiles with matches on 3 borders). Part 2: I start from a corner tile and I rotate it so it is my top-left corner. Then, I iterate on the right, concatenating to the final image the correct tile (rotated and flipped if necessary). When the row is complete, I go back to the beginning of the row, and I iterate down one step. It is a bit complicated to rotate and flip without messing up the borders. When the final image is complete, I start searching for the sea monsters. Instead of rotating and flipping the image, I rotate and flip the sea monster image. I determine the offsets of the # in the sea monster and I search these offsets starting from a point in the image, left to right and top to bottom. Time complexity: O(n<sup>2</sup>) where n is the number of tiles in the puzzle.
- **Day 21:** for each food in the input, I add an entry in 2 maps: the first one keeps track of how many times an ingredient is mentioned. The second one keeps the set of ingredients that can contain an allergen. For each allergen in every food, if it's not in the map I add an entry from the allergen to a set of the ingredients on that line. If it's already on the map I intersect the set in the map with the set of the ingredients in the current line. Then, I remove all the ingredients from the entries of the map allergen => set\<ingretient\> from the map ingredient => #food. Summing the remaining quantities gives the answer for part 1. For part 2, I search in the map allergen => set\<ingretient\> for entries with a single ingredient in the set. I remove that element from all other entries and I iterate this way till when all the sets contain only 1 ingredient. Then I sort by allergen name and concatenate the ingredients. Time complexity: Θ(n) for part 1, O(n<sup>2</sup>) for part 2, where n is the number of foods in the puzzle.
