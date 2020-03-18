#!/usr/bin/env node
const isCLI = !module.parent;
if (isCLI) {
  require('./cli');
}

export { promptOverwrite } from './ci';
export { install } from './cli';
