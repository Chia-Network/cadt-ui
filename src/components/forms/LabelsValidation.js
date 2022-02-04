import * as yup from 'yup';

export const labelSchema = yup.object().shape({
  label: yup.string().required('Label is required'),
  labelType: yup.string().required('labelType is required'),
  creditingPeriodStartDate: yup
    .date()
    .required('creditingPeriodStartDate is required'),
  creditingPeriodEndDate: yup
    .date()
    .min(yup.ref('creditingPeriodStartDate'))
    .required('creditingPeriodEndDate is required'),
  validityPeriodStartDate: yup
    .string()
    .required('validityPeriodStartDate is required'),
  validityPeriodEndDate: yup
    .date()
    .min(yup.ref('validityPeriodStartDate'))
    .required('validityPeriodEndDate is required'),
  unitQuantity: yup.number().integer().required('unitQuantity is required'),
  labelLink: yup.string().required('labelLink is required'),
});
