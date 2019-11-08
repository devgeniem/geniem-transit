import { readFile } from '../utils/file';
import { Worklog } from '../types';
import { parseWorklogs } from '../parsers/tempo';
import { postTempoWorklogs } from '../services/tempo';

export const runImport = async ({ file }: { file: string }) => {
  try {
    const fileContent = (await readFile(getFilePath(file))) as string;
    const parsedContent = JSON.parse(fileContent) as Worklog[];

    const rowsToPost = parseWorklogs(parsedContent);
    await postTempoWorklogs(rowsToPost, process.env.IMPORT_TEMPO_TOKEN);
  } catch (e) {
    console.error(e);
  }
  return 'Import done.';
};

const getFilePath = (file: string): string => {
  return `${process.env.outDir}${file}`;
};
