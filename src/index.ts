#!/usr/bin/env node
import { install } from './ci';
const isCLI = !module.parent;

if (isCLI) {
  install();
}

export { promptOverwrite } from './prompt';
export { install } from './ci';
