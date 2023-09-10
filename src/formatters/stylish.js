// stylish.js

import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount).slice(0, -2);

const stringify = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const arrValue = Object.entries(value);
  const lines = arrValue.map(([key, val]) => `${indent(depth)}  ${key}: ${stringify(val, depth + 1)}`);
  return ['{', ...lines, `${indent(depth - 1)}  }`].join('\n');
};

const stylish = (diff) => {
  const iter = (currentValue, depth) => {
    const lastBracketIndent = depth === 1 ? '' : `${indent(depth - 1)}  `;
    const arrValue = Object.values(currentValue);
    const lines = arrValue.map((val) => {
      switch (val.status) {
        case 'changed':
          return `${indent(depth)}- ${val.name}:${stringify(val.value1, depth + 1) ? ` ${stringify(val.value1, depth + 1)}` : ''}\n${indent(depth)}+ ${val.name}: ${stringify(val.value2, depth + 1)}`;
        case 'unchanged':
          return `${indent(depth)}  ${val.name}: ${stringify(val.value, depth + 1)}`;
        case 'deleted':
          return `${indent(depth)}- ${val.name}: ${stringify(val.value, depth + 1)}`;
        case 'nested':
          return `${indent(depth)}  ${val.name}: ${iter(val.children, depth + 1)}`;
        case 'added':
          return `${indent(depth)}+ ${val.name}: ${stringify(val.value, depth + 1)}`;
        default:
          throw new Error(`Unknown type ${val.status}`);
      }
    });
    return ['{', ...lines, `${lastBracketIndent}}`].join('\n');
  };
  return `${iter(diff, 1)}\n`;
};

export default stylish;
