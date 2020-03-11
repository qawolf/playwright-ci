import * as program from 'commander';

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

export const COMMANDS: { command: CiProvider; label: string }[] = [
  { command: 'azure', label: 'an Azure Pipeline' },
  { command: 'bitbucket', label: 'a Bitbucket Pipeline' },
  { command: 'circleci', label: 'CircleCI' },
  { command: 'github', label: 'a GitHub Action' },
  { command: 'gitlab', label: 'Gitlab CI/CD' },
  { command: 'jenkins', label: 'Jenkins' },
];

export const addCiCommands = ({ program, qawolf }: AddCiCommandsArgs): void => {
  COMMANDS.forEach(({ command, label }) => {
    program
      .command(command)
      .description(`set up ${label}`)
      .action(async () => {
        await saveCiTemplate({ provider: command, qawolf });
      });
  });
};
