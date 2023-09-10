import stylish from './stylish.js';
import plain from './plain.js';

const outputFormatter = (data, formatter) => {
  if (formatter === 'stylish') {
    return stylish(data);
  }

  if (formatter === 'plain') {
    return plain(data);
  }

  throw new Error(`Wrong formatter: ${formatter}`);
};

export default outputFormatter;
