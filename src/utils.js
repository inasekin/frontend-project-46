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

  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return sortPlain(left).concat(pivot, sortPlain(right));
};

export const sortStylish = (arr, compareFunction) => {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i += 1) {
    if (compareFunction(arr[i], pivot) < 0) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return sortStylish(left, compareFunction).concat(pivot, sortStylish(right, compareFunction));
};
