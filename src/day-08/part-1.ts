import { expect } from 'chai';
import { readFile, testSetup } from '../util';

interface Reading {
  inputSignals: string[];
  outputSignals: string[];
}

function parseReadings(inputString: string[]): Reading[] {
  return inputString.map((i) => {
    const [inputSignals, outputSignals] = i.split(`|`).map((series) =>
      series
        .trim()
        .split(` `)
        .map((i) => i.trim()),
    );
    return { inputSignals, outputSignals };
  });
}

// 1,4,7,8
function countOutputMatches(reading: Reading) {
  return reading.outputSignals.filter((i) => i.length <= 4 || i.length == 7).length;
}

describe('day-08, part-1', () => {
  testSetup('day-08');

  it('sample', () => {
    const readings = parseReadings(readFile('./sample'));
    const answer = readings.reduce((a, r) => a + countOutputMatches(r), 0);
    expect(answer).to.equal(26);
  });

  it('input', () => {
    const readings = parseReadings(readFile('./input'));
    const answer = readings.reduce((a, r) => a + countOutputMatches(r), 0);
    expect(answer).to.equal(495);
  });
});
