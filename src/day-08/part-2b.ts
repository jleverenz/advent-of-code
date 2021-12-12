import { expect } from 'chai';
import { readFile, testSetup } from '../util';
import { Reading, parseReadings } from './common';
import { Permutation } from 'js-combinatorics';
import { isEqual } from 'lodash';

// The first version used an overlapping sets check to deduce decoding. Checked
// some other solutions and implemented a brute force versionthat explores every
// possible mapping until it finds a valid decoding.

function zip<T>(a: T[], b: T[]) {
  return a.map((k, i) => [k, b[i]]);
}

const mappings = Array.from(new Permutation('abcdefg')).map((i) =>
  zip(Array.from('abcdefg'), i).reduce((a: Record<string, string>, i) => {
    const [k, v] = i;
    a[k] = v;
    return a;
  }, {}),
);
const valid = [
  'abcefg',
  'cf',
  'acdeg',
  'acdfg',
  'bcdf',
  'abdfg',
  'abdefg',
  'acf',
  'abcdefg',
  'abcdfg',
];
const sortedValid = [...valid].sort();

function solveReading(reading: Reading): number {
  for (const m of mappings) {
    const mapped = reading.inputSignals
      .map((i) =>
        Array.from(i)
          .map((i) => m[i])
          .sort()
          .join(''),
      )
      .sort();
    if (isEqual(mapped, sortedValid)) {
      const decodedSignals = reading.outputSignals.map((i) =>
        Array.from(i)
          .map((i) => m[i])
          .sort()
          .join(''),
      );
      return parseInt(decodedSignals.map((i) => valid.indexOf(i)).join(''));
    }
  }
  return 0; // err
}

describe('day-08, part-2b', () => {
  testSetup('day-08');

  it('sample', () => {
    const readings = parseReadings(readFile('./sample'));
    const answer = readings.reduce((a, r) => a + solveReading(r), 0);
    expect(answer).to.equal(61229);
  });

  it('input', function () {
    const readings = parseReadings(readFile('./input'));
    const answer = readings.reduce((a, r) => a + solveReading(r), 0);
    expect(answer).to.equal(1055164);
  });
});
