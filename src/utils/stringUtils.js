export const convertPascalCaseToSentenceCase = str => {
  const result = str.replace(/([A-Z])/g, ' $1');
  return (result.charAt(0).toUpperCase() + result.slice(1)).replace(
    /([A-Z])\s(?=[A-Z])/g,
    '$1',
  );
};
