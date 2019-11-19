import { CLIParams } from '../types';

export const VERSION = process.env.npm_package_version;

export const printHeader = ({ mode, startDate, endDate, projectKey }: CLIParams) => {
  console.info(`Starting Geniem Transit ${VERSION}
Mode: ${mode}
Project: ${projectKey}
`);
};
