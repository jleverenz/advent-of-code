import { expect } from 'chai';
import { readFile, testSetup } from '../util';
import * as common from './common';

describe('day-05, part-1', () => {
  testSetup('day-05');

  it('sample', () => {
    const lineSegments = common.filterNonDiagonal(common.parseLineInput(readFile('./sample')));
    const coordHeights = common.calculateCoordHeights(lineSegments);
    const answer = Array.from(coordHeights).filter((i) => i[1] > 1).length;
    expect(answer).to.equal(5);
  });

  it('input', () => {
    const lineSegments = common.filterNonDiagonal(common.parseLineInput(readFile('./input')));
    const coordHeights = common.calculateCoordHeights(lineSegments);
    const answer = Array.from(coordHeights).filter((i) => i[1] > 1).length;
    expect(answer).to.equal(4655);
  });
});
