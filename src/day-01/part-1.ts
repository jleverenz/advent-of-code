import { expect } from 'chai';
import * as fs from 'fs';

function readFile(filename: string): number[] {
  var array = fs.readFileSync(filename).toString().trim().split("\n");
  return array.map((i: string) => parseInt(i));
}

function calculateDescents(depthArray: number[]): number {
  let count = 0;
  let last = depthArray[0];
  depthArray.slice(1).forEach((i: any) => {
    count += i > last ? 1 : 0;
    last = i;
  })
  return count;
}

describe('day-01, part-1', () => {
  it('sample', () => {
    const answer = calculateDescents(readFile('src/day-01/sample'));
    expect(answer).to.equal(7);
  });

  it('input', () => {
    const answer = calculateDescents(readFile('src/day-01/input'));
    expect(answer).to.equal(1477);
  });
});
