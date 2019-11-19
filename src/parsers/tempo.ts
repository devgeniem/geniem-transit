import { WorklogPostData, Worklog } from '../types';

/**
 * Parse raw Tempo worklogs into format that can be sent to Tempo Add Worklog endpoint.
 * @param data worklog array to parse
 */
export const parseWorklogs = (data: Worklog[]): WorklogPostData[] => {
  return data.map(row => {
    const tempRow: WorklogPostData = {
      issueKey: row.issue.key,
      timeSpentSeconds: row.timeSpentSeconds,
      billableSeconds: row.billableSeconds,
      startDate: row.startDate,
      startTime: row.startTime,
      authorAccountId: row.author.accountId,
      description: row.description,
    };
    return tempRow;
  });
};
