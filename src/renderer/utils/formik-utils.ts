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
