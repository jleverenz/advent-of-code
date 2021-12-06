export function testSetup(dayString: string) {
  before(() => {
    process.chdir(`src/${dayString}`);
  });
  after(() => {
    process.chdir('../..');
  });
}
