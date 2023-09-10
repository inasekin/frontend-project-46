const getType = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const getPropertyDescription = (path, value) => {
  if (path === '') {
    return value.name;
  }
  return `${path}.${value.name}`;
};

const plain = (data) => {
  const generatePropertyLines = (currentValue, path = '') => {
    const lines = Object.values(currentValue).flatMap((value) => {
      const currentPath = getPropertyDescription(path, value);

      switch (value.status) {
        case 'unchanged':
          return [];
        case 'deleted':
          return `Property '${currentPath}' was removed`;
        case 'nested':
          return generatePropertyLines(value.children, currentPath);
        case 'changed':
          return `Property '${currentPath}' was updated. From ${getType(value.value1)} to ${getType(value.value2)}`;
        case 'added':
          return `Property '${currentPath}' was added with value: ${getType(value.value)}`;
        default:
          throw new Error(`Unknown type ${value.status}`);
      }
    });

    const sortedLines = lines.sort(); // Сортируем строки по имени свойства

    return sortedLines.filter((line) => line !== undefined).join('\n');
  };

  return `${generatePropertyLines(data)}\n`;
};

export default plain;
