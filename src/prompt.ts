import confirm from '@inquirer/confirm';
import select from '@inquirer/select';
import { pathExists } from 'fs-extra';
import { CI_PROVIDERS } from './providers';

export const promptConfirmOverwrite = (path: string): Promise<boolean> =>
  confirm({
    message: `"${path}" already exists, overwrite it?`,
    default: false,
  });

export const promptOverwrite = async (path: string): Promise<boolean> => {
  const exists = await pathExists(path);
  if (!exists) return true;

  return promptConfirmOverwrite(path);
};

export const promptCiProvider = async (): Promise<string | null> => {
  return select({
    message: 'Select a CI provider',
    choices: CI_PROVIDERS.map(provider => {
      return { name: provider.label, value: provider.name };
    }),
  });
};
