import * as program from 'commander';
import { yellow } from 'kleur';
import { saveCiTemplate } from './ci';
const pkg = require('../package');

const QAWOLF_FLAG = '-q, --qawolf';
const QAWOLF_DESCRIPTION = 'Create template for QA Wolf';

program.usage('<command> [options]').version(pkg.version);

program
  .command('azure')
  .description('set up an Azure Pipeline')
  .option(QAWOLF_FLAG, QAWOLF_DESCRIPTION)
  .action(async ({ qawolf }) => {
    await saveCiTemplate({ provider: 'azure', qawolf });
  });

program
  .command('bitbucket')
  .description('set up an Bitbucket Pipeline')
  .option(QAWOLF_FLAG, QAWOLF_DESCRIPTION)
  .action(async ({ qawolf }) => {
    await saveCiTemplate({ provider: 'bitbucket', qawolf });
  });

program
  .command('circleci')
  .description('set up CircleCI')
  .option(QAWOLF_FLAG, QAWOLF_DESCRIPTION)
  .action(async ({ qawolf }) => {
    await saveCiTemplate({ provider: 'circleci', qawolf });
  });

program
  .command('github')
  .description('set up a GitHub Action')
  .option(QAWOLF_FLAG, QAWOLF_DESCRIPTION)
  .action(async ({ qawolf }) => {
    await saveCiTemplate({ provider: 'github', qawolf });
  });

program
  .command('gitlab')
  .description('set up GitLab CI/CD')
  .option(QAWOLF_FLAG, QAWOLF_DESCRIPTION)
  .action(async ({ qawolf }) => {
    await saveCiTemplate({ provider: 'gitlab', qawolf });
  });

program
  .command('jenkins')
  .description('set up Jenkins')
  .option(QAWOLF_FLAG, QAWOLF_DESCRIPTION)
  .action(async ({ qawolf }) => {
    await saveCiTemplate({ provider: 'jenkins', qawolf });
  });

program.arguments('<command>').action(cmd => {
  console.log(yellow(`Invalid command "${cmd}"\n`));
  program.help();
});

program.allowUnknownOption(false);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  console.log('\n');
  program.outputHelp();
}
