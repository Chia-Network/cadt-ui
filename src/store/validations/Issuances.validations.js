import * as yup from 'yup';

export const issuanceSchema = yup
  .object()
  .shape({
    id: yup.string().optional(),
    startDate: yup.date().typeError('Invalid Date').required('Required Field'),
    endDate: yup
      .date()
      .min(yup.ref('startDate'), 'End date should be greater than start date')
      .typeError('Invalid Date')
      .required('Required Field'),
    verificationApproach: yup.string().required('Required Field'),
    verificationBody: yup.string().required('Required Field'),
    verificationReportDate: yup
      .date()
      .typeError('Invalid Date')
      .required('Required Field'),
  })
  .optional()
  .nullable();

export const issuancesSchema = yup.array().of(issuanceSchema);
