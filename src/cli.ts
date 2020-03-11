import * as program from 'commander';
import { yellow } from 'kleur';
import { addCiCommands } from './commands';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../package');

program.usage('<command> [options]').version(pkg.version);

addCiCommands({ program, qawolf: false });

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
