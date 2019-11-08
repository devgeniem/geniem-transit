export const tempoUrl = 'https://api.tempo.io/core/3';

export const tempoProjectWorklogsUrl = (projectId: string) => {
  return `${tempoUrl}/worklogs/project/${projectId}`;
};
