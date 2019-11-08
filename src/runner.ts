import { CLIParams, CLIModes } from './types';
import { runExport } from './services/exporter';
import { runImport } from './services/importer';

export const runGRIT = async ({ mode, startDate, endDate, projectKey, file }: CLIParams): Promise<string> => {
  let report: string;
  if (mode === CLIModes.export) {
    report = await runExport({ startDate, endDate, projectKey });
  }
  if (mode === CLIModes.import) {
    report = await runImport({ file });
  }

  return report;
};
