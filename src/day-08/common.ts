export interface Reading {
  inputSignals: string[];
  outputSignals: string[];
}

export function parseReadings(inputString: string[]): Reading[] {
  return inputString.map((i) => {
    const [inputSignals, outputSignals] = i.split(`|`).map((series) =>
      series
        .trim()
        .split(` `)
        .map((i) => i.trim().split('').sort().join(''))
    );
    return { inputSignals, outputSignals };
  });
}
