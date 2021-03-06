require('dotenv').config();
import * as minimist from 'minimist';
import { printHeader } from './utils/util';
import { validateParameters } from './utils/validator';
import { CLIModes } from './types';
import { runTransit } from './runner';

(async () => {
  const { mode, startDate, endDate, projectKey, file, parse, filterUsers, onlyUsers } = parseArguments();

  try {
    validateParameters({ mode, startDate, endDate, projectKey, file, filterUsers });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  printHeader({ mode, startDate, endDate, projectKey });
  const result = await runTransit({ mode, startDate, endDate, projectKey, file, parse, filterUsers, onlyUsers });
  console.info(result);
  process.exit();
})();

function parseArguments() {
  const { start, end, project, mode, file, parse, excludeUsers, includeUsers } = minimist(process.argv.slice(2));
  return {
    startDate: start as string,
    endDate: end as string,
    projectKey: project ? (project as string) : (process.env.DEFAULT_PROJECT as string),
    filterUsers: excludeUsers ? excludeUsers.split(',') : [],
    onlyUsers: includeUsers ? includeUsers.split(',') : [],
    mode: mode ? (mode as CLIModes) : CLIModes.export,
    file: file ? (file as string) : undefined,
    parse: parse ? parse === 'true' : true,
  };
}
