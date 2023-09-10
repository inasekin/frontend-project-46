import _ from 'lodash';
import path from 'path';
import fileParse from './parsers.js';
import { readFile } from './utils.js';

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
  const endString = '}\n';
  let resultString = '';

  resultString += startString;

  // eslint-disable-next-line no-restricted-syntax
  for (const item of arr) {
    resultString += renderString(item[0], item[1], firstObj, secondObj);
  }

  resultString += endString;

  return resultString;
};

const genDiff = (firstFile, secondFile) => {
  const firstData = fileParse(readFile(firstFile, 'utf8'), path.extname(firstFile));
  const secondData = fileParse(readFile(secondFile, 'utf8'), path.extname(secondFile));

  const objWithChanges = { ...secondData };
  const result = {};
  const changedKeys = getObjectDiff(firstData, secondData);

  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(firstData)) {
    if (changedKeys.includes(key) && !Object.keys(secondData).includes(key)) {
      objWithChanges[key] = firstData[key];
    }
  }

  Object.keys(objWithChanges)
    .sort()
    .forEach((key) => {
      result[key] = objWithChanges[key];
    });

  console.log(convertJsonToString(Object.entries(result), firstData, secondData));

  return convertJsonToString(Object.entries(result), firstData, secondData);
};

export default genDiff;
