import * as yup from 'yup';

export const issuanceSchema = yup
  .object()
  .shape({
    id: yup.string().optional(),
    startDate: yup
      .date()
      .typeError('yup-validation-date')
      .required('yup-validation-field-required'),
    endDate: yup
      .date()
      .min(yup.ref('startDate'), 'yup-validation-end-date-greater')
      .typeError('yup-validation-date')
      .required('yup-validation-field-required'),
    verificationApproach: yup
      .string()
      .required('yup-validation-field-required'),
    verificationBody: yup.string().required('yup-validation-field-required'),
    verificationReportDate: yup
      .date()
      .typeError('yup-validation-date')
      .required('yup-validation-field-required'),
  })
  .optional()
  .nullable();

export const issuancesSchema = yup.array().of(issuanceSchema);
