export const validateAndSubmitFieldArrayForm = async (formikRef, formName) => {
    if (formikRef.current) {
      const formik = formikRef.current;
      if (formik) {
        const errors = await formik.validateForm(formik.values);
        console.log('errors', errors);

        if (errors && errors.issuances) {
          // @ts-ignore
          const touchedIssuances = flatten(errors.issuances.map((issuanceError, index) => {
            return Object.keys(issuanceError).reduce((acc, key) => {
              acc[`${formName}[${index}].${key}`] = true;
              return acc;
            }, {});
          }));

  
          // @ts-ignore
          const touched = touchedIssuances.reduce((acc, curr) => ({ ...acc, ...curr }), {});
          console.log(touched);
          // @ts-ignore
          formik.setTouched(touched);
        }

        return [errors, {[formName]: formik.values}];
      }
    }

    return Promise.resolve([null, null]);
  }