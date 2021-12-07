import { expect } from 'chai';
import { readFile, testSetup } from '../util';

function calculateDescents(depthArray: number[]): number {
  let count = 0;
  let last;
  for (let i = 0; i < depthArray.length - 2; i++) {
    const sum = depthArray.slice(i, i + 3).reduce((a, i) => a + i);
    count += last && sum > last ? 1 : 0;
    last = sum;
  }
  return count;
}

describe('day-01, part-2', () => {
  testSetup('day-01');

  it('sample', () => {
    const depthArray = readFile('./sample').map((i: string) => parseInt(i));
    const answer = calculateDescents(depthArray);
    expect(answer).to.equal(5);
  });

  it('input', () => {
    const depthArray = readFile('./input').map((i: string) => parseInt(i));
    const answer = calculateDescents(depthArray);
    expect(answer).to.equal(1523);
  });
});
