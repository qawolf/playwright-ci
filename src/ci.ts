import { promises as fsPromises, readFileSync } from 'fs';
import { compile } from 'handlebars';
import { prompt } from 'inquirer';
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
const fileExists = async (path: string): Promise<boolean> =>
  !!(await fsPromises.stat(path).catch(() => false));

export const buildCiTemplate = ({
  provider,
  qawolf,
}: SaveCiTemplateArgs): string => {
  const templateFn = compile(
    readFileSync(resolve(__dirname, `../static/${provider}.hbs`), 'utf8'),
  );

  return templateFn({ qawolf, version });
};

export const saveCiTemplate = async ({
  provider,
  qawolf,
}: SaveCiTemplateArgs): Promise<void> => {
  const providerPath = qawolf ? qawolfPaths[provider] : paths[provider];

  const outputPath = join(process.cwd(), providerPath);

  if (await fileExists(outputPath)) {
    const { overwrite } = await prompt<{ overwrite: boolean }>([
      {
        message: `"${outputPath}" already exists, overwrite it?`,
        name: 'overwrite',
        type: 'confirm',
      },
    ]);
    if (!overwrite) return;
  }

  const template = buildCiTemplate({ provider, qawolf });
  await fsPromises.writeFile(outputPath, template, 'utf8');

  console.log(`Saved ${provider} template to ${outputPath}`);
};
