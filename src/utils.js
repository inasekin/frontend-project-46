import path from 'path';
import fs from 'fs';

export const getFilePath = (fileName) => path.resolve(process.cwd(), fileName);
export const readFile = (fileName) => fs.readFileSync(getFilePath(fileName), 'utf8');

export const sortPlain = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  let left = [];
  let right = [];

  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] < pivot) {
      left = left.concat(arr[i]);
    } else {
      right = right.concat(arr[i]);
    }
  }

  return sortPlain(left).concat(pivot, sortPlain(right));
};

export const sortStylish = (arr, compareFunction) => {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  let left = [];
  let right = [];

  arr.slice(1).forEach((element) => {
    if (compareFunction(element, pivot) < 0) {
      left = left.concat(element);
    } else {
      right = right.concat(element);
    }
  });

  return sortStylish(left, compareFunction).concat(pivot, sortStylish(right, compareFunction));
};
