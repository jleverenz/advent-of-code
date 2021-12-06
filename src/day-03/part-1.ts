import { expect } from 'chai';
import { readFile, testSetup } from '../util';

function countBits(textCommands: string[]) : number[] {
  const bitLength = textCommands[0].length;
  let bitCounts: number[] = Array(bitLength).fill(0);
  textCommands.forEach((binString: string) => {
    [...binString].forEach((bit: string, index: number) => {
      bitCounts[index] += bit == '1' ? 1 : -1;
    });
  });
  return bitCounts;
}

function calculateGamma(bitCounts: number[]) {
  const gammaBin = bitCounts.reduce((a: string, i: number) => a.concat(i < 0 ? '0' : '1'), '');
  return parseInt(gammaBin, 2);
}

function calculateEpsilon(bitCounts: number[]) {
  const epsilonBin = bitCounts.reduce((a: string, i: number) => a.concat(i < 0 ? '1' : '0'), '');
  return parseInt(epsilonBin, 2);
}

describe('day-03, part-1', () => {
  testSetup('day-03');

  it('sample', () => {
    const bitCounts = countBits(readFile('./sample'));
    const gammaRate = calculateGamma(bitCounts);
    const epsilonRate = calculateEpsilon(bitCounts);

    expect(gammaRate).to.equal(22);
    expect(epsilonRate).to.equal(9);
    expect(gammaRate * epsilonRate).to.equal(198);
  });

  it('input', () => {
    const bitCounts = countBits(readFile('./input'));
    const gammaRate = calculateGamma(bitCounts);
    const epsilonRate = calculateEpsilon(bitCounts);

    expect(gammaRate).to.equal(2601);
    expect(epsilonRate).to.equal(1494);
    expect(gammaRate * epsilonRate).to.equal(3885894);
  });
});
