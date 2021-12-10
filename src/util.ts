import { expect } from 'chai';
import * as fs from 'fs';

export function readFile(filename: string): string[] {
  return fs.readFileSync(filename).toString().trim().split('\n');
}

export function testSetup(dayString: string) {
  before(() => {
    process.chdir(`src/${dayString}`);
  });
  after(() => {
    process.chdir('../..');
  });
}

export function makeRange(p1: number, p2?: number) {
  if (p2 === undefined) {
    return Array.from(Array(p1).keys());
  } else {
    if (p2 >= p1) {
      return Array.from(Array(p2 - p1 + 1).keys()).map((i) => p1 + i);
    } else {
      return Array.from(Array(p1 - p2 + 1).keys()).map((i) => p1 - i);
    }
  }
}

describe('util', () => {
  it('makeRange with one param', () => {
    expect(makeRange(0)).to.deep.equal([]);
    expect(makeRange(1)).to.deep.equal([0]);
    expect(makeRange(5)).to.deep.equal([0, 1, 2, 3, 4]);
  });

  it('makeRange with two params', () => {
    expect(makeRange(0, 3)).to.deep.equal([0, 1, 2, 3]);
    expect(makeRange(3, 0)).to.deep.equal([3, 2, 1, 0]);
    expect(makeRange(1, 3)).to.deep.equal([1, 2, 3]);
    expect(makeRange(1, 1)).to.deep.equal([1]);
    expect(makeRange(2, -2)).to.deep.equal([2, 1, 0, -1, -2]);
  });
});
