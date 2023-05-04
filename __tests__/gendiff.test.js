/* eslint-disable no-unexpected-multiline */
import { describe, expect, it } from '@jest/globals';
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/main.js';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

const getFixturePath = (filename) => path.join(dirName, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const path1 = getFixturePath('file1.json');
const path2 = getFixturePath('file2.json');

describe('genDiff', () => {
  it('test 1', () => {
    const actual = genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json');
    const expected = readFile('test-result.txt');
    expect(actual).toEqual(expected);
  });
});
