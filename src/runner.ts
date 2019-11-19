import { CLIParams, CLIModes } from './types';
import { runExport } from './services/exporter';
import { runImport } from './services/importer';

export const runTransit = async ({
  mode,
  startDate,
  endDate,
  projectKey,
  file,
  parse,
  filterUsers,
  onlyUsers,
}: CLIParams): Promise<string> => {
  let report: string;
  if (mode === CLIModes.export) {
    report = await runExport({ startDate, endDate, projectKey, filterUsers, onlyUsers });
  }
  if (mode === CLIModes.import) {
    report = await runImport({ file, parse });
  }

  return report;
};
