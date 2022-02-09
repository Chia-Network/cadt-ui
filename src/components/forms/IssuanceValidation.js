import * as yup from 'yup';

export const issuanceSchema = yup.object().shape({
  id: yup.string().optional(),
  startDate: yup.date().required('Required Field'),
  endDate: yup.date().required('Required Field'),
  verificationApproach: yup.string().required('Required Field'),
  verificationBody: yup.string().required('Required Field'),
  verificationReportDate: yup.date().required('Required Field'),
});
