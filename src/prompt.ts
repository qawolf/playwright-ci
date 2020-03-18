import inquirer from 'inquirer';
import { pathExists } from 'fs-extra';
import { CI_PROVIDERS } from './providers';

export const promptConfirmOverwrite = async (
  path: string,
): Promise<boolean> => {
  const answers = await inquirer.prompt([
    {
      default: false,
      message: `"${path}" already exists, overwrite it?`,
      name: 'overwrite',
      type: 'confirm',
    },
  ]);

  return answers.overwrite;
};

export const promptOverwrite = async (path: string): Promise<boolean> => {
  const exists = await pathExists(path);
  if (!exists) return true;

  return promptConfirmOverwrite(path);
};

export const promptCiProvider = async (): Promise<string | null> => {
  const answers = await inquirer.prompt([
    {
      choices: CI_PROVIDERS.map(provider => {
        return { name: provider.label, value: provider.name };
      }),
      default: 'github',
      message: 'Choose CI Provider',
      name: 'provider',
      type: 'list',
    },
  ]);

  return answers.provider;
};
