import path from 'path';
import fs from 'fs';

export const getFilePath = (fileName) => path.resolve(process.cwd(), fileName);
export const readFile = (fileName) => fs.readFileSync(getFilePath(fileName), 'utf8');

export const sortPlain = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  const left = arr.slice(1).filter((element) => element < pivot);
  const right = arr.slice(1).filter((element) => element >= pivot);

  return [...sortPlain(left), pivot, ...sortPlain(right)];
};

export const sortStylish = (arr, compareFunction) => {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  const left = arr.slice(1).filter((element) => compareFunction(element, pivot) < 0);
  const right = arr.slice(1).filter((element) => compareFunction(element, pivot) >= 0);

  return [...sortStylish(left, compareFunction), pivot, ...sortStylish(right, compareFunction)];
};
