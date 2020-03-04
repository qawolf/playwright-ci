import * as program from 'commander';
import { yellow } from 'kleur';
import { saveCiTemplate } from './ci';

export type CiProvider =
  | 'azure'
  | 'bitbucket'
  | 'circleci'
  | 'github'
  | 'gitlab'
  | 'jenkins';

interface AddCiCommandsArgs {
  program: program.CommanderStatic;
  qawolf: boolean;
}

const CI_PROVIDERS: { command: CiProvider; label: string }[] = [
  { command: 'azure', label: 'an Azure Pipeline' },
  { command: 'bitbucket', label: 'a Bitbucket Pipeline' },
  { command: 'circleci', label: 'CircleCI' },
  { command: 'github', label: 'a GitHub Action' },
  { command: 'gitlab', label: 'Gitlab CI/CD' },
  { command: 'jenkins', label: 'Jenkins' },
];

export const addCiCommands = ({ program, qawolf }: AddCiCommandsArgs): void => {
  CI_PROVIDERS.forEach(({ command, label }) => {
    program
      .command(command)
      .description(`set up ${label}`)
      .action(async () => {
        await saveCiTemplate({ provider: command, qawolf });
      });
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
};
