import { expect } from 'chai';
import { readFile, testSetup } from '../util';

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

    // find a winning board
    const boardIsWinner = (board: Board) => board.sets.filter(i => i.size == 0).length > 0;
    const winningBoard = boards.filter(boardIsWinner)[0];
    if(winningBoard) {
      const unmarked = winningBoard.sets.reduce((a,i) => new Set([...a, ...i]));
      const sumUnmarked = [...unmarked].reduce((a,i) => a + i);
      return sumUnmarked * draw;
    }
  }
}

describe('day-04, part-1', () => {
  testSetup('day-04');

  it('sample', () => {
    const inputs = readFile('./sample');
    const boards = buildBoards(inputs.slice(1));
    const drawNumbers = buildDraws(inputs[0]);
    const answer = calculateFinalScore(boards, drawNumbers);
    expect(answer).to.equal(4512);
  });

  it('input', () => {
    const inputs = readFile('./input');
    const boards = buildBoards(inputs.slice(1));
    const drawNumbers = buildDraws(inputs[0]);
    const answer = calculateFinalScore(boards, drawNumbers);
    expect(answer).to.equal(74320);
  });
});
