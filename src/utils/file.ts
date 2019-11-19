import * as fs from 'fs-extra';

/**
 * Helper to read a JSON file from disk.
 * @param path file read path
 */
export const readFile = async <T>(path: string) => {
  try {
    const file = await fs.readJson(path);
    return file as T;
  } catch (e) {}
};

/**
 * Helper to write a JSON file to disk.
 * @param path where to write
 * @param data json data to write
 */
export const writeFile = async (path: string, data: any) => {
  try {
    await fs.outputJson(path, data);
  } catch (e) {
    console.error(e);
  }
};
