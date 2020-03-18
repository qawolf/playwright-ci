import select from '@inquirer/select';
import { CiProvider, saveCiTemplate } from './ci';

export const CI_PROVIDERS: Array<{ name: string; value: CiProvider | null }> = [
  { name: 'Azure DevOps', value: 'azure' },
  { name: 'Bitbucket Pipelines', value: 'bitbucket' },
  { name: 'CircleCI', value: 'circleci' },
  { name: 'GitHub Actions', value: 'github' },
  { name: 'GitLab CI/CD', value: 'gitlab' },
  { name: 'Jenkins', value: 'jenkins' },
  { name: 'Skip CI setup', value: null },
];

const getCiProvider = async (): Promise<CiProvider | null> => {
  return select({
    message: 'Select a CI provider',
    choices: CI_PROVIDERS,
  });
};

export const install = async (qawolf: boolean = false): Promise<void> => {
  const provider = await getCiProvider();
  if (!provider) return;

  await saveCiTemplate({ provider, qawolf });
};
