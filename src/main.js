import path from 'path';
import fileParse from './parsers.js';
import { getObjectDiff, readFile } from './utils.js';
import outputFormatter from './formatters/index.js';

const gendiff = (firstFile, secondFile, formatName = 'stylish') => {
  const firstFileExtension = path.extname(firstFile).slice(1);
  const secondFileExtension = path.extname(secondFile).slice(1);

  const firstData = fileParse(readFile(firstFile, 'utf8'), firstFileExtension);
  const secondData = fileParse(
    readFile(secondFile, 'utf8'),
    secondFileExtension,
  );

  const diff = getObjectDiff(firstData, secondData);

  return outputFormatter(diff, formatName);
};

export default gendiff;
