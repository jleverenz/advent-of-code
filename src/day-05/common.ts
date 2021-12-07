import { expect } from 'chai';

type Line = { start: number[]; end: number[] };

export function parseLineInput(input: string[]): Line[] {
  return input.map((line) => {
    const [start, end] = line.split('->').map((coord) => {
      return coord
        .trim()
        .split(',')
        .map((i) => parseInt(i));
    });
    return { start: [start[0], start[1]], end: [end[0], end[1]] };
  });
}

export const filterNonDiagonal = (lines: Line[]) =>
  lines.filter((i) => i.start[0] == i.end[0] || i.start[1] == i.end[1]);

export function calculateCoordHeights(lineSegments: Line[]): Map<string, number> {
  let heights: Map<string, number> = new Map();

  lineSegments.map(sortCoordinates).forEach((line) => {
    const xRange = makeRange(line.start[0], line.end[0]);
    const yRange = makeRange(line.start[1], line.end[1]);

    let coordRange: number[][];
    if (xRange.length == 1) {
      coordRange = yRange.map((i) => [line.start[0], i]);
    } else if (yRange.length == 1) {
      coordRange = xRange.map((i) => [i, line.start[1]]);
    } else {
      coordRange = xRange.map((i, idx) => [i, yRange[idx]]);
    }

    coordRange.forEach((coord) => {
      const key = `${coord[0]},${coord[1]}`;
      heights.set(key, (heights.get(key) || 0) + 1);
    });
  });
  return heights;
}

function sortCoordinates(line: Line): Line {
  const incLine = [line.start, line.end];
  incLine.sort((a, b) => {
    const xDiff = a[0] - b[0];
    return xDiff == 0 ? a[1] - b[1] : xDiff;
  });
  return { start: incLine[0], end: incLine[1] };
}

function makeRange(p1: number, p2?: number) {
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

describe('common', () => {
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
