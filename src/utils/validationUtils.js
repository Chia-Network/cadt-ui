export const setValidationErrors = async (schema, data, setState) => {
  let validationErrorsObject = {};
  await schema
    .validate(data, { abortEarly: false })
    .catch(errors => {
      errors.inner.forEach(item => {
        validationErrorsObject[item.path] = item.errors[0];
      });
    })
    .finally(() => setState(validationErrorsObject));
};
