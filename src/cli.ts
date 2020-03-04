import * as program from 'commander';
const pkg = require('../package');
import { addCiCommands } from './commands';

program.usage('<command> [options]').version(pkg.version);

addCiCommands({ program, qawolf: false });
