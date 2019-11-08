import { WorklogPostData, Worklog } from '../types';

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
