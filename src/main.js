import _ from 'lodash';
import path from 'path';
import fileParse from './parsers.js';
import { readFile } from './utils.js';
import outputFormatter from './formatters/index.js';

const getObjectDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.union(keys1, keys2);

  const diff = allKeys.map((key) => {
    const val1 = obj1[key];
    const val2 = obj2[key];
    const hasOwn1 = Object.prototype.hasOwnProperty.call(obj1, key);
    const hasOwn2 = Object.prototype.hasOwnProperty.call(obj2, key);

    if (!hasOwn1) {
      return { name: key, status: 'added', value: val2 };
    }

    if (!hasOwn2) {
      return { name: key, status: 'deleted', value: val1 };
    }

    if (_.isPlainObject(val1) && _.isPlainObject(val2)) {
      return { name: key, status: 'nested', children: getObjectDiff(val1, val2) };
    }

    if (!_.isEqual(val1, val2)) {
      return {
        name: key, status: 'changed', value1: val1, value2: val2,
      };
    }

    return { name: key, status: 'unchanged', value: val1 };
  });

  return diff;
};

const genDiff = (firstFile, secondFile, formatName = 'stylish') => {
  const firstData = fileParse(readFile(firstFile, 'utf8'), path.extname(firstFile));
  const secondData = fileParse(readFile(secondFile, 'utf8'), path.extname(secondFile));

  const diff = getObjectDiff(firstData, secondData);

  return outputFormatter(diff, formatName);
};

export default genDiff;
