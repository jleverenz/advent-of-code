import { expect } from 'chai';
import { readFile, testSetup } from '../util';

const pairs: Record<string, string> = {
  '{': '}',
  '[': ']',
  '(': ')',
  '<': '>',
};

const scores: Record<string, number> = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

function calcSortedScores(lines: string[]): number[] {
  const sortedScores: number[] = [];
  lines.forEach((line) => {
    const s = [];
    let corrupted = false;
    for (const c of Array.from(line)) {
      if (Array.from('{[<(').indexOf(c) != -1) {
        s.push(c);
      } else {
        const open = s.pop() as string;
        if (pairs[open] != c) {
          corrupted = true;
          break;
        }
      }
    }
    if (!corrupted && s.length != 0) {
      let total = 0;
      while (s.length != 0) {
        const c = s.pop() as string;
        total = total * 5 + scores[pairs[c]];
      }
      sortedScores.push(total);
    }
  });
  return sortedScores.sort((a, b) => a - b);
}

describe('day-10, part-2', () => {
  testSetup('day-10');

  it('sample', () => {
    const lines = readFile('./sample');
    const sortedScores = calcSortedScores(lines);
    expect(sortedScores[(sortedScores.length - 1) / 2]).to.equal(288957);
  });

  it('input', () => {
    const lines = readFile('./input');
    const sortedScores = calcSortedScores(lines);
    expect(sortedScores[(sortedScores.length - 1) / 2]).to.equal(2768166558);
  });
});
