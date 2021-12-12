import { expect } from 'chai';
import { readFile, testSetup } from '../util';
import { Reading, parseReadings } from './common';

function intersection<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  let _intersection = new Set<T>()
  setB.forEach(elem => {
    if (setA.has(elem)) {
      _intersection.add(elem)
    }
  });
  return _intersection;
}

function difference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  let _difference = new Set(setA)
  setB.forEach(elem => {
    _difference.delete(elem)
  });
  return _difference;
}

function eqSet<T>(as: Set<T>, bs: Set<T>) {
  if (as.size !== bs.size) return false;
  as.forEach(a => {
    if (!bs.has(a)) return false;
  });
  return true;
}

// 1 = length of 2
// 7 = length of 3
// 4 = length of 4
// 8 = length of 7
// 3 = length of 5 + intersect union of with 7
// 9 = intersect of 3,4
// 0 = length of 6 + intersect with 1
// 5 = length of 5 + intersect with 4-1
// 2 = length of 5
// 6 = last one left

function solveReading(reading: Reading): number {
  const decoded = new Map<string, number>();
  const codes = new Set(reading.inputSignals);

  const one = Array.from(codes).filter(i => i.length == 2)[0];
  codes.delete(one);
  decoded.set(one, 1);

  const seven = Array.from(codes).filter(i => i.length == 3)[0];
  codes.delete(seven);
  decoded.set(seven, 7);

  const four = Array.from(codes).filter(i => i.length == 4)[0];
  codes.delete(four);
  decoded.set(four, 4);

  const eight = Array.from(codes).filter(i => i.length == 7)[0];
  codes.delete(eight);
  decoded.set(eight, 8);

  // 3 = length of 5 + intersect union of with 7 = 7
  const three = Array.from(codes)
    .filter(i => i.length == 5)
    .filter(i => {
      return eqSet(intersection(new Set(Array.from(seven)), new Set(Array.from(i))), new Set(Array.from(seven)));
    })[0];
  codes.delete(three);
  decoded.set(three, 3);

  // 9 = intersect of 3,4
  const nine = Array.from(codes)
    .filter(i => i.length == 6)
    .filter(i => {
      const combo = intersection(new Set(Array.from(three)), new Set(Array.from(four)));
      return eqSet(intersection(combo, new Set(Array.from(i))), combo);
    })[0];
  codes.delete(nine);
  decoded.set(nine, 9);

  // 0 = length of 6 + intersect with 1
  const zero = Array.from(codes)
    .filter(i => i.length == 6)
    .filter(i => {
      const combo = new Set(Array.from(one));
      return eqSet(intersection(combo, new Set(Array.from(i))), combo);
    })[0];
  codes.delete(zero);
  decoded.set(zero, 0);

  // 5 = length of 5 + intersect with 4-1
  const five = Array.from(codes)
    .filter(i => i.length == 5)
    .filter(i => {
      const combo = difference(new Set(Array.from(four)), new Set(Array.from(one)));
      return eqSet(intersection(combo, new Set(Array.from(i))), combo);
    })[0];
  codes.delete(five);
  decoded.set(five, 5);

  // 2 = length of 5
  const two = Array.from(codes).filter(i => i.length == 5)[0];
  codes.delete(two);
  decoded.set(two, 2);

  // 6 = last one left
  const six = Array.from(codes)[0];
  codes.delete(six);
  decoded.set(six, 6);

  const decodedNums = reading.outputSignals.map((i) => decoded.get(i) as number);
  return parseInt(decodedNums.join(''));
}

describe('day-08, part-2', () => {
  testSetup('day-08');

  it('sample', () => {
    const readings = parseReadings(readFile('./sample'));
    const answer = readings.reduce((a, r) => a + solveReading(r), 0);
    expect(answer).to.equal(61229);
  });

  it('input', () => {
    const readings = parseReadings(readFile('./input'));
    const answer = readings.reduce((a, r) => a + solveReading(r), 0);
    expect(answer).to.equal(1055164);
  });

});
