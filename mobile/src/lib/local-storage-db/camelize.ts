const isUpperCase = (char: string) => char === char.toUpperCase();

export const classToTableName = (string: string) => {
  return string.split('').reduce<string>((tableName, char, index) => {
    if (isUpperCase(char) && index !== 0) return `${tableName}/${char}`;

    return `${tableName}${char}`;
  }, '');
};
