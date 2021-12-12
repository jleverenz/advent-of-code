import { expect } from 'chai';
import { readFile, testSetup } from '../util';
import { min } from 'mathjs';

function parseHeightMap(lines: string[]) {
  return lines.map((i) => Array.from(i).map((i) => parseInt(i)));
}

function calcTotalRiskLevel(heightMap: number[][]) {
  const height = heightMap.length;
  const width = heightMap[0].length;
  let tot = 0;
  for (let h = 0; h < height; ++h) {
    for (let w = 0; w < width; ++w) {
      const above = h == 0 ? 10 : heightMap[h - 1][w];
      const below = h == height - 1 ? 10 : heightMap[h + 1][w];
      const left = w == 0 ? 10 : heightMap[h][w - 1];
      const right = w == width - 1 ? 10 : heightMap[h][w + 1];
      const val = heightMap[h][w];
      if (min(above, below, left, right) > val) {
        tot += val + 1;
      }
    }
  }
  return tot;
}

describe('day-09, part-1', () => {
  testSetup('day-09');

  it('sample', () => {
    const heightMap = parseHeightMap(readFile('./sample'));
    const answer = calcTotalRiskLevel(heightMap);
    expect(answer).to.equal(15);
  });

  it('input', () => {
    const heightMap = parseHeightMap(readFile('./input'));
    const answer = calcTotalRiskLevel(heightMap);
    expect(answer).to.equal(448);
  });
});
