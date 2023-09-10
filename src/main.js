import _ from 'lodash';
import path from 'path';
import fileParse from './parsers.js';
import { readFile } from './utils.js';
import outputFormatter from './formatters/index.js';

const getObjectDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.union(keys1, keys2);

  return allKeys.map((key) => {
    const val1 = obj1[key];
    const val2 = obj2[key];
    if (!Object.hasOwn(obj1, key)) {
      return {
        name: key,
        status: 'added',
        value: val2,
      };
    }
    if (!Object.hasOwn(obj2, key)) {
      return {
        name: key,
        status: 'deleted',
        value: val1,
      };
    }
    if (_.isPlainObject(val1) && _.isPlainObject(val2)) {
      return {
        name: key,
        status: 'nested',
        children: getObjectDiff(obj1[key], obj2[key]),
      };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        name: key,
        status: 'changed',
        value1: val1,
        value2: val2,
      };
    }
    return {
      name: key,
      status: 'unchanged',
      value: val1,
    };
  }, {});
};

const genDiff = (firstFile, secondFile, format = 'stylish') => {
  const firstData = fileParse(readFile(firstFile, 'utf8'), path.extname(firstFile));
  const secondData = fileParse(readFile(secondFile, 'utf8'), path.extname(secondFile));

  const diff = getObjectDiff(firstData, secondData);

  return outputFormatter(diff, format);
};

export default genDiff;
