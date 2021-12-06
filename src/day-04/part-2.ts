import { expect } from 'chai';
import * as fs from 'fs';
import { testSetup } from '../util';

function readFile(filename: string): string[] {
  return fs.readFileSync(filename).toString().trim().split("\n");
}

interface Board {
  sets: Set<number>[];
}

function buildBoards(input: string[]): Board[] {
  const boardRows = input.filter(i => i != '');
  const boards = Array.from(Array(boardRows.length / 5).keys()).map(i => {
    const rangeOf5 = Array.from(Array(5).keys());
    const rows = rangeOf5.map(r => boardRows[i * 5 + r].trim().split(/ +/).map(n => parseInt(n)));
    const cols = rangeOf5.map(r => rows.map(row => row[r]));
    return { sets: [...rows, ...cols].map(i => new Set(i)) };
  });
  return boards;
}

function buildDraws(inputDraws: string): number[] {
  return inputDraws.trim().split(/,/).map(i => parseInt(i));
}

function calculateFinalScore(boards: Board[], draws: number[]) {
  for(let i = 0; i < draws.length; i++) {
    const draw = draws[i];

    // update boards
    boards.forEach(board => {
      board.sets.forEach(set => {
        set.delete(draw);
      });
    });

    // find the last winning board
    const boardIsWinner = (board: Board) => board.sets.filter(i => i.size == 0).length > 0;
    const nonWinningBoards = boards.filter(i => !boardIsWinner(i));
    if(nonWinningBoards.length == 0) {
      const winningBoard = boards[0];
      const unmarked = winningBoard.sets.reduce((a,i) => new Set([...a, ...i]));
      const sumUnmarked = [...unmarked].reduce((a,i) => a + i);
      return sumUnmarked * draw;
    }
    boards = nonWinningBoards;
  }
}

describe('day-04, part-2', () => {
  testSetup('day-04');

  it('sample', () => {
    const inputs = readFile('./sample');
    const boards = buildBoards(inputs.slice(1));
    const drawNumbers = buildDraws(inputs[0]);
    const answer = calculateFinalScore(boards, drawNumbers);
    expect(answer).to.equal(1924);
  });

  it('input', () => {
    const inputs = readFile('./input');
    const boards = buildBoards(inputs.slice(1));
    const drawNumbers = buildDraws(inputs[0]);
    const answer = calculateFinalScore(boards, drawNumbers);
    expect(answer).to.equal(17884);
  });
});
