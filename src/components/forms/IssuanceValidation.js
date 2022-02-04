import * as yup from 'yup';

export const issuanceSchema = yup.object().shape({
  id: yup.string().optional(),
  startDate: yup.date().required(),
  endDate: yup.date().min(yup.ref('startDate')).required(),
  verificationApproach: yup.string().required(),
  verificationBody: yup.string().required(),
  verificationReportDate: yup.date().required(),
});
