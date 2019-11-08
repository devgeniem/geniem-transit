import { fetchTempoWorklogs } from './tempo';
import { writeFile } from '../utils/file';
import { TempoResult } from '../types';

interface Params {
  startDate: string;
  endDate: string;
  projectKey: string;
  response?: TempoResult;
  filePath?: string;
}

export const runExport = async ({ startDate, endDate, projectKey }: Params) => {
  try {
    const worklogResult = await fetchTempoWorklogs({
      from: startDate,
      to: endDate,
      projectId: projectKey,
      token: process.env.EXPORT_TEMPO_TOKEN,
    });
    const filePath = getWritePath({ startDate, endDate, projectKey });
    await writeFile(filePath, JSON.stringify(worklogResult.results));

    return getReport({ startDate, endDate, projectKey, response: worklogResult, filePath });
  } catch (e) {}
};

const getWritePath = ({ startDate, endDate, projectKey }: Params): string => {
  return `${process.env.outDir}${projectKey}_${startDate}_${endDate}.json`;
};

const getReport = ({ startDate, endDate, projectKey, response, filePath }: Params): string => {
  return `Project ${projectKey} Export Done.
Report generated to ${filePath}
Worklog count ${response.metadata.count}
`;
};
