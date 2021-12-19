import { expect } from 'chai';
import { readFile, testSetup } from '../util';


function parseField(lines: string[]): number[][] {
  return lines.reduce((a: number[][], i) => {
    a.push(i.split('').map(i => parseInt(i)));
    return a;
  }, []);
}

function step(field: number[][]): number {
  const width = field[0].length;
  const height = field.length;
  let flashes = 0;
  const checks = [...(new Array(height))].map((i,idx) => idx)
    .reduce((a,i) => {
      const pairs = [...(new Array(width))].map((i,idx) => idx).map(j => `${i},${j}`);
      pairs.forEach(p => a.add(p));
      return a;
    }, new Set<string>());

  field.forEach((h,hi) => {
    h.forEach((w,wi) => {
      field[hi][wi] += 1;
    });
  });

  while(checks.size != 0) {
    checks.forEach(v => {
      const [h,w] = v.split(',').map(i => parseInt(i));
      if(field[h][w] >= 10) {
        [
          [h,w-1],
          [h,w+1],
          [h+1,w-1],
          [h+1,w],
          [h+1,w+1],
          [h-1,w-1],
          [h-1,w],
          [h-1,w+1]
        ].forEach(c => {
          const [h,w] = c;
          if (h < height && h >= 0 && w < width && w >=0) {
            checks.add(`${h},${w}`);
            if(field[h][w] != 0) {
              field[h][w] += 1;
            }
          }
        })
        field[h][w] = 0;
        flashes += 1;
      }
      checks.delete(v);
    });
  }

  return flashes;
}

describe('day-11, part-2', () => {
  testSetup('day-11');

  it('sample', () => {
    const field = parseField(readFile('./sample'));
    const syncCount = field[0].length * field.length;
    let i = 1;
    for(; true; i++) {
      const flashes = step(field);
      if (flashes === syncCount) {
        break;
      }
    }
    expect(i).to.equal(195);
  });

  it('sample', () => {
    const field = parseField(readFile('./input'));
    const syncCount = field[0].length * field.length;
    let i = 1;
    for(; true; i++) {
      const flashes = step(field);
      if (flashes === syncCount) {
        break;
      }
    }
    expect(i).to.equal(268);
  });
});
