import { expect } from 'chai';
import { isWhiteSpaceSingleLine } from 'typescript';
import { readFile, testSetup } from '../util';

type Line = { start: number[], end: number[] };

// returns vertical / horizontal only
function parseLineInput(input: string[]): Line[] {
  const lines = input.map(line => {
    const [start, end] = line.split('->').map(coord => {
      return coord.trim().split(',').map(i => parseInt(i));
    });
    return { start: [start[0], start[1]], end: [end[0], end[1]] };
  });
  return lines.filter(i => i.start[0] == i.end[0] || i.start[1] == i.end[1]);
}

function sortCoordinates(line: Line): Line {
  const incLine = [line.start, line.end];
  incLine.sort((a,b) => {
    const xDiff = a[0] - b[0];
    return xDiff == 0 ? a[1] - b[1] : xDiff;
  })
  return { start: incLine[0], end: incLine[1] };
}

function addPoints(p1: number[], p2: number[]): number[] {
  return [p1[0] + p2[0], p1[1] + p2[1]];
}

function calculateCoordHeights(lineSegments: Line[]): Map<string,number> {
  let heights: Map<string, number> = new Map();

  lineSegments.map(sortCoordinates).forEach(line => {
    const xRange = line.end[0] - line.start[0];
    const yRange = line.end[1] - line.start[1];

    const coordRange = (xRange == 0) ?
      Array.from(Array(yRange + 1).keys()).map(i => [0, i]) :
      Array.from(Array(xRange + 1).keys()).map(i => [i, 0]);

    coordRange.map(addCoord => addPoints(line.start, addCoord))
      .forEach(coord => {
        const key = `${coord[0]},${coord[1]}`;
        heights.set(key, (heights.get(key) || 0) + 1);
      });
  });
  return heights;
}

describe('day-05, part-1', () => {
  testSetup('day-05');

  it('sample', () => {
    const lineSegments = parseLineInput(readFile('./sample'));
    const coordHeights = calculateCoordHeights(lineSegments);
    const answer = Array.from(coordHeights).filter(i => i[1] > 1).length;
    expect(answer).to.equal(5);
  });

  it('input', () => {
    const lineSegments = parseLineInput(readFile('./input'));
    const coordHeights = calculateCoordHeights(lineSegments);
    const answer = Array.from(coordHeights).filter(i => i[1] > 1).length;
    expect(answer).to.equal(4655);
  });
});
