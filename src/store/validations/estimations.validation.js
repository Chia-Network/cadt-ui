import * as yup from 'yup';

export const estimationSchema = yup.object({
  id: yup.string().optional(),
  creditingPeriodStart: yup
    .date()
    .typeError('yup-validation-date')
    .required('yup-validation-field-required'),
  creditingPeriodEnd: yup
    .date()
    .typeError('yup-validation-date')
    .min(yup.ref('creditingPeriodStart'), 'yup-validation-end-date-greater')
    .required('yup-validation-field-required'),
  unitCount: yup
    .number()
    .integer()
    .typeError('yup-validation-positive-number')
    .test({
      message: 'yup-validation-positive-number',
      test: val => val >= 0,
    })
    .required('yup-validation-field-required'),
  updatedAt: yup.date().typeError('yup-validation-date').optional(),
  createdAt: yup.date().typeError('yup-validation-date').optional(),
});

export const estimationsSchema = yup.array().of(estimationSchema);
