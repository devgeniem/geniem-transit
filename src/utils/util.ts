import { CLIParams } from '../types';

export const VERSION = process.env.npm_package_version;

export const printHeader = ({ mode, startDate, endDate, projectKey }: CLIParams) => {
  console.info(`Starting GRIT (Geniem expoRt Import Tool ${VERSION})
Mode: ${mode}
Project: ${projectKey}
`);
};
