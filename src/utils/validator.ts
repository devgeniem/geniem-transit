import { CLIParams } from '../types';

/**
 *
 */
export const validateParameters = ({ mode, startDate, endDate, file, projectKey }: CLIParams): void => {
  switch (mode) {
    case 'export':
      validateExportParams({ startDate, endDate, projectKey });
      break;
    case 'import':
      validateImportParams({ file });
      break;
    default:
      throw new Error(`Mode ${mode} is not a valid mode.`);
  }
};

const validateExportParams = ({
  startDate,
  endDate,
  projectKey,
}: {
  startDate: string;
  endDate: string;
  projectKey: string;
}): void => {
  if (validateDate(startDate) && validateDate(endDate) && projectKey !== '') {
  } else {
    throw new Error(`Parameters missing from export mode.`);
  }
};

const validateImportParams = ({ file }: { file: string }): void => {
  if (!file) {
    throw new Error(`File parameter is missing from import mode.`);
  }
};

const validateDate = (date: string): boolean => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  return !!date.match(regEx);
};
