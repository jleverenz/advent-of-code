import { expect } from 'chai';
import * as fs from 'fs';
import { testSetup } from './setup';

function readFile(filename: string): number[] {
  var array = fs.readFileSync(filename).toString().trim().split("\n");
  return array.map((i: string) => parseInt(i));
}

function calculateDescents(depthArray: number[]): number {
  let count = 0;
  let last;
  for(let i = 0; i < depthArray.length - 2; i++) {
    const sum = depthArray.slice(i, i+3).reduce((a,i) => a + i);
    count += (last && sum > last) ? 1 : 0;
    last = sum;
  }
  return count;
}

describe('day-01, part-2', () => {
  testSetup('day-01');

  it('sample', () => {
    const answer = calculateDescents(readFile('./sample'));
    expect(answer).to.equal(5);
  });

  it('input', () => {
    const answer = calculateDescents(readFile('./input'));
    expect(answer).to.equal(1523);
  });
});
