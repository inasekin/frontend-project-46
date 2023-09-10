import stylish from './stylish.js';

const outputFormatter = (data, formatter) => {
  if (formatter === 'stylish') {
    return stylish(data);
  }

  throw new Error(`Wrong formatter: ${formatter}`);
};

export default outputFormatter;
