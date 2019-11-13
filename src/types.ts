export interface CLIParams {
  mode: CLIModes;
  startDate?: string;
  endDate?: string;
  projectKey?: string;
  file?: string;
  parse?: boolean;
}

export enum CLIModes {
  export = 'export',
  import = 'import',
}

export interface TempoResult {
  self: string;
  metadata: Metadata;
  results: Worklog[];
}

interface Metadata {
  count: number;
  offset: number;
  limit: number;
  next: string;
}

export interface Worklog {
  self: string;
  tempoWorklogId: number;
  jiraWorklogId: number;
  issue: Issue;
  timeSpentSeconds: number;
  billableSeconds: number;
  startDate: string;
  startTime: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  attributes: Attributes;
}

interface Issue {
  self: string;
  key: string;
  id: number;
}

interface Author {
  self: string;
  accountId: string;
  displayName: string;
}

interface Attributes {
  self: string;
  values: any[];
}

export interface WorklogPostData {
  issueKey: string;
  timeSpentSeconds: number;
  billableSeconds: number;
  startDate: string;
  startTime: string;
  description?: string;
  authorAccountId: string;
  remainingEstimateSeconds?: number;
  attributes?: Attribute[];
}

interface Attribute {
  key: string;
  value: string;
}
