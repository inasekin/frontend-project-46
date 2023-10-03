#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/main.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((firstFile, secondFile) => {
    const output = gendiff(firstFile, secondFile, program.opts().format);

    console.log(output);
  });

program.parse();
