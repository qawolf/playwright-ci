import * as program from 'commander';
import { yellow } from 'kleur';
import { saveCiTemplate } from './ci';
const pkg = require('../package');

program.usage('<command> [options]').version(pkg.version);

program
  .command('azure')
  .description('set up an Azure Pipeline')
  .action(async () => {
    await saveCiTemplate('azure');
  });

program
  .command('bitbucket')
  .description('set up an Bitbucket Pipeline')
  .action(async () => {
    await saveCiTemplate('bitbucket');
  });

program
  .command('circleci')
  .description('set up CircleCI')
  .action(async () => {
    await saveCiTemplate('circleci');
  });

program
  .command('github')
  .description('set up a GitHub Action')
  .action(async () => {
    await saveCiTemplate('github');
  });

program
  .command('gitlab')
  .description('set up GitLab CI/CD')
  .action(async () => {
    await saveCiTemplate('gitlab');
  });

program
  .command('jenkins')
  .description('set up Jenkins')
  .action(async () => {
    await saveCiTemplate('jenkins');
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
