import { expect } from 'chai';
import { readFile, testSetup } from '../util';

function calculateDescents(depthArray: number[]): number {
  let count = 0;
  let last = depthArray[0];
  depthArray.slice(1).forEach((i: any) => {
    count += i > last ? 1 : 0;
    last = i;
  });
  return count;
}

describe('day-01, part-1', () => {
  testSetup('day-01');

  it('sample', () => {
    const depthArray = readFile('./sample').map((i: string) => parseInt(i));
    const answer = calculateDescents(depthArray);
    expect(answer).to.equal(7);
  });

  it('input', () => {
    const depthArray = readFile('./input').map((i: string) => parseInt(i));
    const answer = calculateDescents(depthArray);
    expect(answer).to.equal(1477);
  });
});
