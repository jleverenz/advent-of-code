import { expect } from 'chai';
import { readFile, testSetup } from '../util';

function advanceState(state: number[]): number[] {
  return state.reduce((a: number[], i: number) => a.concat(i == 0 ? [6, 8] : i - 1), []);
}

function advanceNStates(initialState: number[], n: number): number[] {
  let state = initialState;
  for (let i = 0; i < n; i++) {
    state = advanceState(state);
  }
  return state;
}

function calculatePopulationOnDayN(initialState: number[], n: number): number {
  // initial age set
  const ageSet = new Set(initialState);

  // each fish indepenently contributes to population according to initial age
  const spawnByAge = [...ageSet].reduce((a, i) => {
    a.set(i, advanceNStates([i], n).length);
    return a;
  }, new Map<number, number>());

  // count initial fish at each age
  const countsByAge = initialState.reduce((a, i) => {
    a.set(i, (a.get(i) || 0) + 1);
    return a;
  }, new Map<number, number>());

  // calculate population
  return [...countsByAge.keys()].reduce((a, i) => {
    a += (countsByAge.get(i) as number) * (spawnByAge.get(i) as number);
    return a;
  }, 0);
}

describe('day-06, part-1', () => {
  testSetup('day-06');

  it('sample', () => {
    const initialState = readFile('./sample')[0]
      .split(',')
      .map((i) => parseInt(i.trim()));

    expect(calculatePopulationOnDayN(initialState, 18)).to.equal(26);
    expect(calculatePopulationOnDayN(initialState, 80)).to.equal(5934);
  });

  it('input', () => {
    const initialState = readFile('./input')[0]
      .split(',')
      .map((i) => parseInt(i.trim()));

    const answer = calculatePopulationOnDayN(initialState, 80);
    expect(answer).to.equal(391888);
  });
});
