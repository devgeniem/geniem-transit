import { readFile, writeFile } from '../utils/file';
import { Worklog, WorklogPostData } from '../types';
import { parseWorklogs } from '../parsers/tempo';
import { postTempoWorklogs } from '../services/tempo';

export const runImport = async ({ file, parse }: { file: string; parse: boolean }) => {
  try {
    const fileContent = (await readFile(getFilePath(file))) as string;
    let rowsToPost;

    if (parse) {
      const parsedContent = JSON.parse(fileContent) as Worklog[];
      rowsToPost = parseWorklogs(parsedContent);
    } else {
      rowsToPost = JSON.parse(fileContent) as WorklogPostData[];
    }

    const errorItems = await postTempoWorklogs(rowsToPost, process.env.IMPORT_TEMPO_TOKEN);
    if (errorItems.length > 1) {
      await writeFile(errorsPath(new Date().getTime()), JSON.stringify(errorItems));
    }

    return `Import done. ${errorItems.length} while importing.`;
  } catch (e) {
    console.error(e);
  }
};

const getFilePath = (file: string): string => {
  return `${process.env.outDir}${file}`;
};

const errorsPath = (date: number) => {
  return `${process.env.outDir}errors_${date}.json`;
};
