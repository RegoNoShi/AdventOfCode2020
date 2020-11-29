import { readFileSync } from 'fs';

export const readInputFile = (day: string | number) => {
  return readFileSync(`./inputFiles/Day${day}.txt`, 'utf-8').trim();
};

export const measuringExecutionTime = (block: () => void) => {
  const start = new Date();
  block();
  console.log(`Time elapsed: ${(new Date().getTime() - start.getTime()) / 1000.0} seconds`);
};
