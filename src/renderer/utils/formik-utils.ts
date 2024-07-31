import { isArray, isFunction, isObject, transform } from 'lodash';

export const validateAndSubmitFieldArrayForm = async (formikRef, formName) => {
  if (formikRef.current) {
    const formik = formikRef.current;
    if (formik) {
      const errors = await formik.validateForm(formik.values);

      if (errors && errors.issuances) {
        // @ts-ignore
        const touchedIssuances = flatten(
          errors.issuances.map((issuanceError, index) => {
            return Object.keys(issuanceError).reduce((acc, key) => {
              acc[`${formName}[${index}].${key}`] = true;
              return acc;
            }, {});
          }),
        );

        // @ts-ignore
        const touched = touchedIssuances.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        // @ts-ignore
        formik.setTouched(touched);
      } else if (errors && errors.labels) {
        // @ts-ignore
        const touchedLabels = flatten(
          errors.labels.map((labelError, index) => {
            return Object.keys(labelError).reduce((acc, key) => {
              acc[`${formName}[${index}].${key}`] = true;
              return acc;
            }, {});
          }),
        );

        // @ts-ignore
        const touched = touchedLabels.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        // @ts-ignore
        formik.setTouched(touched);
      }

      if (formik.values[formName].length) {
        return [errors, formik.values];
      } else {
        return [errors, null];
      }
    }
  }

  return Promise.resolve([null, null]);
};

/**
 * Recursively omits the 'orgUId' property from an object or every object within an array.
 * @param input The object or array from which to omit the 'orgUId' property.
 * @returns The new object or array with the 'orgUId' property omitted from every level.
 */
export const deepOmit = (input: any, omitKeys: string[]): any => {
  // Check if the input is an array
  if (isArray(input)) {
    // Map each item in the array, applying deepOmitOrgUId recursively
    return input.map((item) => deepOmit(item, omitKeys));
  } else if (isObject(input) && !isFunction(input)) {
    // If the input is an object (excluding functions), omit 'orgUId' and apply recursively to all properties
    return transform(input, (result: any, value: any, key: string) => {
      // Omit 'orgUId' from the current level and recurse into objects and arrays
      if (!omitKeys.includes(key)) {
        result[key] = deepOmit(value, omitKeys);
      }
    });
  }
  // Return the value unchanged if it's neither an object nor an array
  return input;
};
