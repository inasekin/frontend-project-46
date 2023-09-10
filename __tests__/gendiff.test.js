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

const resultFile = readFile('result1.txt');
const resultFilePlain = readFile('resultPlain.txt');

describe('genDiff', () => {
  it('genDiff json file', () => {
    const path1 = getFixturePath('file1.json');
    const path2 = getFixturePath('file2.json');

    expect(genDiff(path1, path2)).toEqual(resultFile);
  });

  it('genDiff yaml file', () => {
    const path1 = getFixturePath('file1.yml');
    const path2 = getFixturePath('file2.yaml');

    expect(genDiff(path1, path2)).toEqual(resultFile);
  });

  it('genDiff file with plain format', () => {
    const path1 = getFixturePath('file1.yml');
    const path2 = getFixturePath('file2.yaml');

    expect(genDiff(path1, path2, 'plain')).toEqual(resultFilePlain);
  });
});
