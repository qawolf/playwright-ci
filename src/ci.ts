import { outputFile, pathExists, readFileSync } from 'fs-extra';
import { compile } from 'handlebars';
import { prompt } from 'inquirer';
import { join, resolve } from 'path';
const { version } = require('../package');

type CiProvider =
  | 'azure'
  | 'bitbucket'
  | 'circleci'
  | 'github'
  | 'gitlab'
  | 'jenkins';

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

export const saveCiTemplate = async (
  provider: CiProvider,
  qawolf = false,
): Promise<void> => {
  const providerPath = qawolf ? qawolfPaths[provider] : paths[provider];

  const outputPath = join(process.cwd(), providerPath);

  if (await pathExists(outputPath)) {
    const { overwrite } = await prompt<{ overwrite: boolean }>([
      {
        message: `"${outputPath}" already exists, overwrite it?`,
        name: 'overwrite',
        type: 'confirm',
      },
    ]);
    if (!overwrite) return;
  }

  const ciTemplate = compile(
    readFileSync(resolve(__dirname, `../static/${provider}.hbs`), 'utf8'),
  );
  const ci = ciTemplate({ qawolf, version });

  await outputFile(outputPath, ci, 'utf8');

  console.log(`Saved ${provider} template to ${outputPath}`);
};
