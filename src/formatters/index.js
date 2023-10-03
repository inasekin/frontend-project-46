import stylish from './stylish.js';
import plain from './plain.js';

const outputFormatter = (data, formatter) => {
  switch (formatter) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return JSON.stringify(data, null, 2);
    default:
      throw new Error(`Wrong formatter: ${formatter}`);
  }
};

export default outputFormatter;
