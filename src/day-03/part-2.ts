import { expect } from 'chai';
import * as fs from 'fs';
import { testSetup } from '../util';

function readFile(filename: string): string[] {
  return fs.readFileSync(filename).toString().trim().split("\n");
}

function countBit(textCommands: string[], position: number) : number {
  let bitCount: number = 0;
  textCommands.forEach((binString: string) => {
    const bit = [...binString][position];
    bitCount += bit == '1' ? 1 : -1;
  });
  return bitCount;
}

function oxygenFilter(bitFields: string[], position: number): string[] {
  const bitCount = countBit(bitFields, position);
  const criteria = bitCount < 0 ? '0' : '1';
  return bitFields.filter((i) => [...i][position] == criteria);
}

function co2Filter(bitFields: string[], position: number): string[] {
  const bitCount = countBit(bitFields, position);
  const criteria = bitCount < 0 ? '1' : '0';
  return bitFields.filter((i) => [...i][position] == criteria);
}

function calculateRating(bitFields: string[], filter: (a: string[], b: number) => string[]): number {
  let pos = 0;
  while(bitFields.length > 1) {
    bitFields = filter(bitFields, pos);
    pos++;
  }
  return parseInt(bitFields[0],2);
}

describe('day-03, part-2', () => {
  testSetup('day-03');

  it('sample', () => {
    const bitFields = readFile('./sample');
    const oxygenRating = calculateRating(bitFields, oxygenFilter);
    const co2Rating = calculateRating(bitFields, co2Filter);

    expect(oxygenRating).to.equal(23);
    expect(co2Rating).to.equal(10);
    expect(oxygenRating * co2Rating).to.equal(230);
  });

  it('input', () => {
    const bitFields = readFile('./input');
    const oxygenRating = calculateRating(bitFields, oxygenFilter);
    const co2Rating = calculateRating(bitFields, co2Filter);

    expect(oxygenRating).to.equal(3775);
    expect(co2Rating).to.equal(1159);
    expect(oxygenRating * co2Rating).to.equal(4375225);
  });
});
