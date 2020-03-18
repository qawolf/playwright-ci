import { promises as fs, readFileSync } from 'fs';
import { compile } from 'handlebars';
import { join, resolve } from 'path';
import { promptCiProvider } from './prompt';
import { promptOverwrite } from './prompt';
import { CI_PROVIDERS } from './providers';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../package');

interface SaveCiTemplateArgs {
  provider: string;
  qawolf: boolean;
}

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
  const fullProvider = CI_PROVIDERS.find(p => p.name === provider);
  if (!fullProvider) {
    throw new Error(`No template for CI provider ${provider}`);
  }

  const providerPath = qawolf
    ? fullProvider.qawolfPath || fullProvider.path
    : fullProvider.path;

  const outputPath = join(process.cwd(), providerPath);

  const shouldOverwrite = await promptOverwrite(outputPath);
  if (!shouldOverwrite) return;

  const template = buildCiTemplate({ provider, qawolf });
  await fs.writeFile(outputPath, template, 'utf8');

  console.log(`Saved ${provider} template to ${outputPath}`);
};

export const install = async (qawolf = false): Promise<void> => {
  const provider = await promptCiProvider();
  if (!provider) return;

  await saveCiTemplate({ provider, qawolf });
};
