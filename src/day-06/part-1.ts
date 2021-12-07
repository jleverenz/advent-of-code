import { expect } from 'chai';
import { readFile, testSetup } from '../util';

type FishState = Map<number, number>;

function advanceState(state: FishState): FishState {
  const newState = new Map<number, number>();
  [...state.keys()]
    .sort()
    .reverse()
    .forEach((age) => {
      const count = state.get(age) || 0;
      if (age == 0) {
        newState.set(6, (newState.get(6) || 0) + count);
        newState.set(8, (newState.get(8) || 0) + count);
      } else {
        newState.set(age - 1, count);
      }
    });
  return newState;
}

function advanceNStates(initialState: FishState, n: number): FishState {
  let state = initialState;
  for (let i = 0; i < n; i++) {
    state = advanceState(state);
  }
  return state;
}

function calculatePopulationOnDayN(initialState: number[], n: number): number {
  const countsByAge = initialState.reduce((a, i) => {
    a.set(i, (a.get(i) || 0) + 1);
    return a;
  }, new Map<number, number>());

  const finalState = advanceNStates(countsByAge, n);
  return [...finalState.values()].reduce((a, i) => (a += i), 0);
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
