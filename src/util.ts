import * as fs from 'fs';

export function readFile(filename: string): string[] {
  return fs.readFileSync(filename).toString().trim().split("\n");
}

export function testSetup(dayString: string) {
  before(() => {
    process.chdir(`src/${dayString}`);
  });
  after(() => {
    process.chdir('../..');
  });
}
