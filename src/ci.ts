import { promises as fs, readFileSync } from 'fs';
import { compile } from 'handlebars';
import confirm from '@inquirer/confirm';
import { join, resolve } from 'path';
import { CiProvider } from './commands';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../package');

interface SaveCiTemplateArgs {
  provider: CiProvider;
  qawolf: boolean;
}

const paths = {
  azure: 'azure-pipelines.yml',
  bitbucket: 'bitbucket-pipelines.yml',
  circleci: '.circleci/config.yml',
  github: '.github/workflows/playwright.yml',
  gitlab: '.gitlab-ci.yml',
  jenkins: 'Jenkinsfile',
};

const qawolfPaths = {
  ...paths,
  github: '.github/workflows/qawolf.yml',
};

// https://stackoverflow.com/a/57708635
export const pathExists = async (path: string): Promise<boolean> =>
  !!(await fs.stat(path).catch(() => false));

export const buildCiTemplate = ({
  provider,
  qawolf,
}: SaveCiTemplateArgs): string => {
  const templateFn = compile(
    readFileSync(resolve(__dirname, `../static/${provider}.hbs`), 'utf8'),
  );

  return templateFn({ qawolf, version });
};

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

export const saveCiTemplate = async ({
  provider,
  qawolf,
}: SaveCiTemplateArgs): Promise<void> => {
  const providerPath = qawolf ? qawolfPaths[provider] : paths[provider];

  const outputPath = join(process.cwd(), providerPath);

  const shouldOverwrite = await promptOverwrite(outputPath);
  if (!shouldOverwrite) return;

  const template = buildCiTemplate({ provider, qawolf });
  await fs.writeFile(outputPath, template, 'utf8');

  console.log(`Saved ${provider} template to ${outputPath}`);
};
