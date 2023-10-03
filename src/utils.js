import path from 'path';
import fs from 'fs';
import _ from 'lodash';

export const getFilePath = (fileName) => path.resolve(process.cwd(), fileName);
export const readFile = (fileName) => fs.readFileSync(getFilePath(fileName), 'utf8');

export const getObjectDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.union(keys1, keys2);

  return allKeys.map((key) => {
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
      return {
        name: key,
        status: 'nested',
        children: getObjectDiff(val1, val2),
      };
    }

    if (!_.isEqual(val1, val2)) {
      return {
        name: key,
        status: 'changed',
        value1: val1,
        value2: val2,
      };
    }

    return { name: key, status: 'unchanged', value: val1 };
  });
};
