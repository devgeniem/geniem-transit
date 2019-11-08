import fetch from 'node-fetch';
import * as querystring from 'querystring';
import { tempoProjectWorklogsUrl, tempoWorklogsUrl } from '../urls';
import { TempoResult, WorklogPostData } from '../types';

/**
 *
 * @param projectId Project key
 * @param from Start of date range (YYYY-MM-DD)
 * @param to End of date range (YYYY-MM-DD)
 */
export async function fetchTempoWorklogs({
  projectId,
  from,
  to,
  token,
}: {
  projectId: string;
  from: string;
  to: string;
  token: string;
}) {
  const url = tempoProjectWorklogsUrl(projectId);
  const parameters = {
    from,
    to,
    limit: 1000,
  };

  const response = await fetch(`${url}?${querystring.stringify(parameters)}`, { headers: getTempoHeaders(token) });
  const result = (await response.json()) as TempoResult;

  return result;
}

const getTempoHeaders = (token: string) => {
  return { Authorization: `Bearer ${token}` };
};

export async function postTempoWorklogs(logs: WorklogPostData[], token: string) {
  const headers = getTempoHeaders(token);
  const url = tempoWorklogsUrl();
  console.info('Rows ', logs.length);

  for (const log of logs) {
    console.info(log);
    await fetch(url, { headers, body: JSON.stringify(log), method: 'POST' });
  }
}
