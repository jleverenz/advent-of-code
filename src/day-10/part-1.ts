import { expect } from 'chai';
import { readFile, testSetup } from '../util';

const pairs: Record<string, string> = {
  '{': '}',
  '[': ']',
  '(': ')',
  '<': '>',
};

const scores: Record<string, number> = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

function calcTotalScore(lines: string[]): number {
  let total = 0;
  lines.forEach((line) => {
    const s = [];
    for (const c of Array.from(line)) {
      if (Array.from('{[<(').indexOf(c) != -1) {
        s.push(c);
      } else {
        const open = s.pop() as string;
        if (pairs[open] != c) {
          total += scores[c];
          break;
        }
      }
    }
  });
  return total;
}

describe('day-10, part-1', () => {
  testSetup('day-10');

  it('sample', () => {
    const lines = readFile('./sample');
    const answer = calcTotalScore(lines);
    expect(answer).to.equal(26397);
  });

  it('input', () => {
    const lines = readFile('./input');
    const answer = calcTotalScore(lines);
    expect(answer).to.equal(290691);
  });
});
