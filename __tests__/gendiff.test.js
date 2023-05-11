/* eslint-disable no-unexpected-multiline */
import { describe, expect, it } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import * as url from 'url';
import genDiff from '../src/main.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const resultFileFirst = readFile('result1.txt');
const resultFileSecond = readFile('result2.txt');

describe('genDiff', () => {
  it('test 1', () => {
    const path1 = getFixturePath('file1.json');
    const path2 = getFixturePath('file2.json');

    expect(genDiff(path1, path2)).toEqual(resultFileFirst);
  });

  it('test 2', () => {
    const path1 = getFixturePath('file3.json');
    const path2 = getFixturePath('file4.json');

    expect(genDiff(path1, path2)).toEqual(resultFileSecond);
  });
});
