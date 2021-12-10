import { expect } from 'chai';
import { makeRange, readFile, testSetup } from '../util';
import { abs, min, max } from 'mathjs';

function parsePositions(inputString: string): number[] {
  return inputString.split(`,`).map((i) => parseInt(i.trim()));
}

function calcCheapestPosition(positions: number[], costFunc: (p1: number, p2: number) => number) {
  return makeRange(min(positions), max(positions)).reduce(
    (a: (number | undefined)[], i) => {
      const cost = positions.reduce((tot, sub) => tot + costFunc(sub, i), 0);
      if (!a[1] || cost < a[1]) {
        return [i, cost];
      } else {
        return a;
      }
    },
    [undefined, undefined],
  );
}

function constantCost(p1: number, p2: number) {
  return abs(p2 - p1);
}

function increasingCost(p1: number, p2: number) {
  const distance = abs(p2 - p1);
  return (distance * (distance + 1)) / 2;
}

describe('day-07, part-1', () => {
  testSetup('day-07');

  it('sample', () => {
    const initialPositions = parsePositions(readFile('./sample')[0]);
    const answer = calcCheapestPosition(initialPositions, constantCost);
    expect(answer[0]).to.equal(2);
    expect(answer[1]).to.equal(37);
  });

  it('input', () => {
    const initialPositions = parsePositions(readFile('./input')[0]);
    const answer = calcCheapestPosition(initialPositions, constantCost);
    expect(answer[0]).to.equal(313);
    expect(answer[1]).to.equal(335271);
  });
});

describe('day-07, part-2', () => {
  testSetup('day-07');

  it('sample', () => {
    const initialPositions = parsePositions(readFile('./sample')[0]);
    const answer = calcCheapestPosition(initialPositions, increasingCost);
    expect(answer[0]).to.equal(5);
    expect(answer[1]).to.equal(168);
  });

  it('input', () => {
    const initialPositions = parsePositions(readFile('./input')[0]);
    const answer = calcCheapestPosition(initialPositions, increasingCost);
    expect(answer[0]).to.equal(461);
    expect(answer[1]).to.equal(95851339);
  });
});
