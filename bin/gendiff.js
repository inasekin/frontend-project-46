#!/usr/bin/env node
import { Command } from 'commander';
import * as fs from 'fs';
import _ from 'lodash';

const program = new Command();

// eslint-disable-next-line max-len
const getObjectDiff = (obj1, obj2, compareRef = false) => Object.keys(obj1).reduce((result, key) => {
  // eslint-disable-next-line no-prototype-builtins
  if (!obj2.hasOwnProperty(key)) {
    result.push(key);
  } else if (_.isEqual(obj1[key], obj2[key])) {
    const resultKeyIndex = result.indexOf(key);

    if (compareRef && obj1[key] !== obj2[key]) {
      // eslint-disable-next-line no-param-reassign
      result[resultKeyIndex] = `${key} (ref)`;
    } else {
      result.splice(resultKeyIndex, 1);
    }
  }
  return result;
}, Object.keys(obj2));

// eslint-disable-next-line consistent-return
const renderString = (key, value, data1, data2) => {
  if (
    !Object.keys(data2).includes(key)
    && Object.keys(data1).includes(key)
  ) {
    return `  - ${key}: ${value}\n`;
  }

  if (Object.keys(data1).includes(key)
    && Object.keys(data2).includes(key)
    && data1[key] === data2[key]) {
    return `    ${key}: ${value}\n`;
  }

  if (Object.keys(data1).includes(key)
    && Object.keys(data2).includes(key)
    && data1[key] !== data2[key]) {
    return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}\n`;
  }

  if (
    Object.keys(data2).includes(key)
    && !Object.keys(data1).includes(key)
  ) {
    return `  + ${key}: ${value}\n`;
  }
};

const convertJsonToString = (arr, firstObj, secondObj) => {
  const startString = '{\n';
  const endString = '}';
  let resultString = '';

  resultString += startString;

  // eslint-disable-next-line no-restricted-syntax
  for (const item of arr) {
    resultString += renderString(item[0], item[1], firstObj, secondObj);
  }

  resultString += endString;

  return resultString;
};

const genDiff = (firstObj, secondObj) => {
  const objWithChanges = { ...secondObj };
  const result = {};
  const changedKeys = getObjectDiff(firstObj, secondObj);

  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(firstObj)) {
    if (changedKeys.includes(key) && !Object.keys(secondObj).includes(key)) {
      objWithChanges[key] = firstObj[key];
    }
  }

  Object.keys(objWithChanges)
    .sort()
    .forEach((key) => {
      result[key] = objWithChanges[key];
    });

  console.log(convertJsonToString(Object.entries(result), firstObj, secondObj));
};

program
  .name('gendiff')
  .arguments('<filepath1>')
  .arguments('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .action((firstArgument, secondArgument) => {
    const jsonFirst = JSON.parse(fs.readFileSync(firstArgument, 'utf8'));
    const jsonSecond = JSON.parse(fs.readFileSync(secondArgument, 'utf8'));

    return genDiff(jsonFirst, jsonSecond);
  })
  .parse();
