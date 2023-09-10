import path from 'path';
import fs from 'fs';

export const getFilePath = (fileName) => path.resolve(process.cwd(), fileName);
export const readFile = (fileName) => fs.readFileSync(getFilePath(fileName), 'utf8');

export const sortPlain = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  const left = [];
  const right = [];

  arr.slice(1).forEach((element) => {
    if (element < pivot) {
      left.push(element);
    } else {
      right.push(element);
    }
  });

  return sortPlain(left).concat(pivot, sortPlain(right));
};

export const sortStylish = (arr, compareFunction) => {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  const left = [];
  const right = [];

  arr.slice(1).forEach((element) => {
    if (compareFunction(element, pivot) < 0) {
      left.push(element);
    } else {
      right.push(element);
    }
  });

  return sortStylish(left, compareFunction).concat(pivot, sortStylish(right, compareFunction));
};
