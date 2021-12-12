import { expect } from 'chai';
import { readFile, testSetup } from '../util';
import { isEqual } from 'lodash';
import { min } from 'mathjs';

function parseHeightMap(lines: string[]) {
  return lines.map((i) => Array.from(i).map((i) => parseInt(i)));
}

function findLowPoints(heightMap: number[][]): number[][] {
  const height = heightMap.length;
  const width = heightMap[0].length;
  const lowPoints = [];
  for (let h = 0; h < height; ++h) {
    for (let w = 0; w < width; ++w) {
      const above = h == 0 ? 10 : heightMap[h - 1][w];
      const below = h == height - 1 ? 10 : heightMap[h + 1][w];
      const left = w == 0 ? 10 : heightMap[h][w - 1];
      const right = w == width - 1 ? 10 : heightMap[h][w + 1];
      const val = heightMap[h][w];
      if (min(above, below, left, right) > val) {
        lowPoints.push([h, w]);
      }
    }
  }
  return lowPoints;
}

function assignBasins(heightMap: number[][]): number {
  const lowPoints = findLowPoints(heightMap);

  const basins = lowPoints.reduce((a, i) => {
    a[`${i[0]},${i[1]}`] = 0;
    return a;
  }, {} as Record<string, number>);

  const incBasin = (pos: number[]) => {
    basins[`${pos[0]},${pos[1]}`] += 1;
  };

  const isLowPoint = (pos: number[]) => {
    return lowPoints.filter((i) => isEqual(pos, i)).length != 0;
  };

  const height = heightMap.length;
  const width = heightMap[0].length;
  for (let h = 0; h < height; ++h) {
    for (let w = 0; w < width; ++w) {
      if (isLowPoint([h, w])) {
        incBasin([h, w]);
      } else if (heightMap[h][w] != 9) {
        let pos = [h, w];
        for (;;) {
          const [h, w] = pos;
          pos = [
            [h - 1, w],
            [h + 1, w],
            [h, w - 1],
            [h, w + 1],
          ]
            .filter((i) => {
              return i[0] >= 0 && i[0] < height && i[1] >= 0 && i[1] < width;
            })
            .find((i) => {
              return heightMap[i[0]][i[1]] < heightMap[h][w];
            }) as number[];
          if (isLowPoint(pos)) {
            incBasin(pos);
            break;
          }
        }
      }
    }
  }
  return Object.values(basins)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, i) => a * i);
}

describe('day-09, part-2', () => {
  testSetup('day-09');

  it('sample', () => {
    const answer = assignBasins(parseHeightMap(readFile('./sample')));
    expect(answer).to.equal(1134);
  });

  it('input', () => {
    const answer = assignBasins(parseHeightMap(readFile('./input')));
    expect(answer).to.equal(1417248);
  });
});
