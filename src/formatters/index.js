import stylish from './stylish.js';
import plain from './plain.js';

const outputFormatter = (data, formatter) => {
  if (formatter === 'stylish') {
    return stylish(data);
  }

  if (formatter === 'plain') {
    return plain(data);
  }

  if (formatter === 'json') {
    return `${JSON.stringify(data, null, 2)}\n`;
  }

  throw new Error(`Wrong formatter: ${formatter}`);
};

export default outputFormatter;
