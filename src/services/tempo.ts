import fetch from 'node-fetch';
import * as querystring from 'querystring';
import { tempoProjectWorklogsUrl, tempoWorklogsUrl } from '../urls';
import { TempoResult, WorklogPostData } from '../types';

/**
 * Get project worklogs from Tempo for given date range. The API request has a limit of 1000
 * results so multiple requests are made if range has more than 1000 results.
 * @param projectId Project key
 * @param from Start of date range (YYYY-MM-DD)
 * @param to End of date range (YYYY-MM-DD)
 * @param token Tempo API token
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
}): Promise<TempoResult> {
  const url = tempoProjectWorklogsUrl(projectId);
  let page = 0;

  let hasNext = true;
  let result: TempoResult;

  while (hasNext) {
    const limit = 1000;
    const parameters = {
      from,
      to,
      limit,
      offset: page * limit,
    };
    const response = await fetch(`${url}?${querystring.stringify(parameters)}`, { headers: getTempoHeaders(token) });
    const tempResult = (await response.json()) as TempoResult;

    if (page === 0) {
      result = tempResult;
    } else {
      result.results = [...result.results, ...tempResult.results];
    }
    page += 1;
    if (!tempResult.metadata.next) {
      hasNext = false;
    }
  }

  return result;
}

const getTempoHeaders = (token: string) => {
  return { Authorization: `Bearer ${token}` };
};

/**
 * Send worklogs to Tempo API in a loop.
 * @param logs Parsed worklogs
 * @param token Tempo API token
 */
export async function postTempoWorklogs(logs: WorklogPostData[], token: string) {
  const headers = getTempoHeaders(token);
  const url = tempoWorklogsUrl();
  console.info('Rows ', logs.length);

  const erroredItems: WorklogPostData[] = [];
  let counter = 1;
  for (const log of logs) {
    console.info(log.issueKey, log.startDate, log.authorAccountId);
    console.info(`Importing row ${counter}/${logs.length}`);
    counter += 1;
    const response = await fetch(url, { headers, body: JSON.stringify(log), method: 'POST' });
    if (response.status !== 200) {
      console.log(response.status);
      console.log(await response.text());
      erroredItems.push(log);
    }
  }

  return erroredItems;
}
