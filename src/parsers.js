import yaml from 'js-yaml';

const fileParse = (data, format) => {
  if (format === 'json') {
    return JSON.parse(data);
  }
  if (format === 'yml' || format === 'yaml') {
    return yaml.load(data);
  }
  throw new Error(`Wrong format: ${format}`);
};

export default fileParse;
