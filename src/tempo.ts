import fetch from 'node-fetch';
import * as querystring from 'querystring';
import { tempoProjectWorklogsUrl } from './urls';
import { TempoResult } from './types';

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
