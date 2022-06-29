import * as yup from 'yup';

export const labelSchema = yup.object().shape({
  label: yup.string().required('yup-validation-field-required'),
  labelType: yup.string().required('yup-validation-field-required'),
  creditingPeriodStartDate: yup
    .date()
    .typeError('yup-validation-date')
    .required('yup-validation-field-required'),
  creditingPeriodEndDate: yup
    .date()
    .min(yup.ref('creditingPeriodStartDate'), 'yup-validation-end-date-greater')
    .typeError('yup-validation-date')
    .required('yup-validation-field-required'),
  validityPeriodStartDate: yup
    .date()
    .typeError('yup-validation-date')
    .required('yup-validation-field-required'),
  validityPeriodEndDate: yup
    .date()
    .min(yup.ref('validityPeriodStartDate'), 'yup-validation-end-date-greater')
    .typeError('yup-validation-date')
    .required('yup-validation-field-required'),
  unitQuantity: yup
    .number()
    .integer()
    .typeError('yup-validation-positive-number')
    .test({
      message: 'yup-validation-positive-number',
      test: val => val >= 0,
    })
    .required('yup-validation-field-required'),
  labelLink: yup.string().required('yup-validation-field-required'),
});

export const labelsSchema = yup.array().of(labelSchema);
