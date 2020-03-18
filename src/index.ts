#!/usr/bin/env node
const isCLI = !module.parent;
if (isCLI) {
  require('./cli');
}

export { install } from './cli';
export { promptOverwrite } from './ci';
