export const convertPascalCaseToSentenceCase = str => {
  const result = str.replace(/([A-Z])/g, ' $1');
  return (result.charAt(0).toUpperCase() + result.slice(1)).replace(
    /([A-Z])\s(?=[A-Z])/g,
    '$1',
  );
};

// formats yup validation error to readable error
// from '[1].unitCount must be a positive number' to 'Unit Count must be a positive number'
// or 'valueX.valueY.unitCount must be a positive number' to 'Unit Count must be a positive number'
export const formatValidationError = error => {
  let errorStringArray = error.split(' ');

  // if error firs word looks like x.y.z, remove first part and format only the prop like string
  if (errorStringArray[0].includes('.')) {
    const firstPartArray = errorStringArray[0].split('.');
    const camelCaseWord = firstPartArray[firstPartArray.length - 1];
    errorStringArray[0] = convertPascalCaseToSentenceCase(camelCaseWord);
  } else {
    errorStringArray[0] = convertPascalCaseToSentenceCase(errorStringArray[0]);
  }

  return errorStringArray.join(' ');
};
