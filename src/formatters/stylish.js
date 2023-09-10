import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount).slice(0, -2);
const getIndentation = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount).slice(0, -2);

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
    const processNested = (val, dep) => `${getIndentation(dep)}  ${val.name}: ${iter(val.children, dep + 1)}`;
    const lastBracketIndent = depth === 1 ? '' : `${getIndentation(depth - 1)}  `;

    // Sort the entries by property name
    const sortedEntries = currentValue
      .slice() // Create a copy of the array to avoid modifying the original
      .sort((a, b) => a.name.localeCompare(b.name));

    const lines = sortedEntries.map((val) => {
      const value1Str = stringify(val.value1, depth + 1);
      const value2Str = stringify(val.value2, depth + 1);
      switch (val.status) {
        case 'changed':
          return `${getIndentation(depth)}- ${val.name}:${value1Str ? ` ${value1Str}` : ''}\n${getIndentation(depth)}+ ${val.name}: ${value2Str}`;
        case 'unchanged':
          return `${getIndentation(depth)}  ${val.name}: ${stringify(val.value, depth + 1)}`;
        case 'deleted':
          return `${getIndentation(depth)}- ${val.name}: ${stringify(val.value, depth + 1)}`;
        case 'nested':
          return processNested(val, depth);
        case 'added':
          return `${getIndentation(depth)}+ ${val.name}: ${stringify(val.value, depth + 1)}`;
        default:
          throw new Error(`Unknown type ${val.status}`);
      }
    });
    return ['{', ...lines, `${lastBracketIndent}}`].join('\n');
  };
  return `${iter(diff, 1)}\n`;
};

export default stylish;
