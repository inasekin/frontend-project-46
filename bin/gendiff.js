#!/usr/bin/env node
import { Command } from 'commander';
import * as fs from 'fs';
import genDiff from '../src/main.js';

const program = new Command();

program
  .name('gendiff')
  .arguments('<filepath1>')
  .arguments('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .action((firstArgument, secondArgument) => {
    genDiff(firstArgument, secondArgument);
  })
  .parse();
