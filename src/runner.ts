import { CLIParams, CLIModes } from './types';
import { runExport } from './exporter';

export const runGRIT = async ({ mode, startDate, endDate, projectKey, file }: CLIParams): Promise<string> => {
  let report: string;
  if (mode === CLIModes.export) {
    report = await runExport({ startDate, endDate, projectKey });
  }
  if (mode === CLIModes.import) {
    console.info('importer');
    report = 'dsadad';
  }

  return report;
};
