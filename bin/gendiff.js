#!/usr/bin/env node
import { Command } from 'commander';
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
  .action((firstFile, secondFile) => {
    const output = genDiff(firstFile, secondFile);

    console.log(output);
  })
  .parse();
