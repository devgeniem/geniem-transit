import { readFile, writeFile } from '../utils/file';
import { Worklog, WorklogPostData } from '../types';
import { parseWorklogs } from '../parsers/tempo';
import { postTempoWorklogs } from '../services/tempo';

export const runImport = async ({ file, parse }: { file: string; parse: boolean }) => {
  try {
    let rowsToPost: WorklogPostData[] | Worklog[];

    if (parse) {
      const filecContent = await readFile<Worklog[]>(getFilePath(file));
      rowsToPost = parseWorklogs(filecContent);
    } else {
      rowsToPost = await readFile<WorklogPostData[]>(getFilePath(file));
    }

    const errorItems = await postTempoWorklogs(rowsToPost, process.env.IMPORT_TEMPO_TOKEN);
    let errorText = '';
    if (errorItems.length > 1) {
      const errorFile = errorsPath(new Date().getTime());
      await writeFile(errorFile, errorItems);
      errorText = `${errorItems.length} errors while importing. Check ${errorFile} for failed rows.`;
    }

    return `Import done. ${errorText}`;
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
