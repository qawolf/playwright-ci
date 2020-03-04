#!/usr/bin/env node
const isCLI = !module.parent;
if (isCLI) {
  require('./cli');
}

export { addCiCommands } from './commands';
