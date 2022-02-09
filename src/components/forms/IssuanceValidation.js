import * as yup from 'yup';

export const issuanceSchema = yup.object().shape({
  id: yup.string().optional(),
  startDate: yup.date().required(),
  endDate: yup.date().required(),
  verificationApproach: yup.string().required(),
  verificationBody: yup.string().required(),
  verificationReportDate: yup.date().required(),
});
