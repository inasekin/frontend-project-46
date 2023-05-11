import fs from 'fs';
import path from 'path';

export const getFilePath = (fileName) => path.resolve(process.cwd(), fileName);
export const readFile = (fileName) => fs.readFileSync(getFilePath(fileName), 'utf8');

export const dataParse = (data, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    default:
      throw new Error(`${format} is not supported`);
  }
};
