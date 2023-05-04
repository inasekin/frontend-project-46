import _ from 'lodash';
import fs from "fs";

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

const genDiff = (firstArgument, secondArgument) => {
  const jsonFirst = JSON.parse(fs.readFileSync(firstArgument, 'utf8'));
  const jsonSecond = JSON.parse(fs.readFileSync(secondArgument, 'utf8'));
  const objWithChanges = { ...jsonSecond };
  const result = {};
  const changedKeys = getObjectDiff(jsonFirst, jsonSecond);

  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(jsonFirst)) {
    if (changedKeys.includes(key) && !Object.keys(jsonSecond).includes(key)) {
      objWithChanges[key] = jsonFirst[key];
    }
  }

  Object.keys(objWithChanges)
    .sort()
    .forEach((key) => {
      result[key] = objWithChanges[key];
    });

  console.log(convertJsonToString(Object.entries(result), jsonFirst, jsonSecond));
};

export default genDiff;
