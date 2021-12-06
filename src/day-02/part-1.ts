import { expect } from 'chai';
import * as fs from 'fs';
import { testSetup } from './setup';

enum Direction {
  forward,
  up,
  down
}

interface Command {
  direction: Direction;
  value: number;
}

interface Position {
  distance: number;
  depth: number;
};

function readFile(filename: string): string[] {
  return fs.readFileSync(filename).toString().trim().split("\n");
}

function parseLine(line: string): Command {
  const [dir, val]: string[] = line.split(' ');
  return { direction: Direction[dir as keyof typeof Direction], value: parseInt(val) };
}

function calculatePosition(textCommands: string[]) {
  return textCommands.reduce((a: Position, i: string) => {
    const command = parseLine(i);
    let newPosition = a;
    if(command.direction == Direction.up) {
      newPosition.depth -= command.value;
    } else if(command.direction == Direction.down) {
      newPosition.depth += command.value;
    } else {
      newPosition.distance += command.value;
    };

    return newPosition;
  }, { distance: 0, depth: 0 });
}

describe('day-02, part-1', () => {
  testSetup('day-02');

  it('sample', () => {
    const answer = calculatePosition(readFile('./sample'));
    expect(answer).to.deep.equal({ distance: 15, depth: 10 });
    expect(answer.distance * answer.depth).to.equal(150);
  });

  it('input', () => {
    const answer = calculatePosition(readFile('./input'));
    expect(answer).to.deep.equal({ distance: 1923, depth: 1001 });
    expect(answer.distance * answer.depth).to.equal(1924923);
  });
});
