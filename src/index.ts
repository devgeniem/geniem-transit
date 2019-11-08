require('dotenv').config();
import * as minimist from 'minimist';
import { printHeader } from './util';
import { validateParameters } from './validator';
import { CLIModes } from './types';
import { runGRIT } from './runner';

(async () => {
  const { mode, startDate, endDate, projectKey, file } = parseArguments();

  try {
    validateParameters({ mode, startDate, endDate, projectKey, file });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  printHeader({ mode, startDate, endDate, projectKey });
  const result = await runGRIT({ mode, startDate, endDate, projectKey, file });
  console.info(result);
  process.exit();
})();

function parseArguments() {
  const { start, end, project, mode, file } = minimist(process.argv.slice(2));
  return {
    startDate: start as string,
    endDate: end as string,
    projectKey: project ? (project as string) : (process.env.DEFAULT_PROJECT as string),
    mode: mode ? (mode as CLIModes) : CLIModes.export,
    file: file ? (file as string) : undefined,
  };
}