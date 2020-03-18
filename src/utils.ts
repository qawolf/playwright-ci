import { promises as fs } from 'fs';

// https://stackoverflow.com/a/57708635
export const pathExists = async (path: string): Promise<boolean> =>
  !!(await fs.stat(path).catch(() => false));
