import * as yup from 'yup';

export const labelSchema = yup.object().shape({
  label: yup.string().required('Required Field'),
  labelType: yup.string().required('Required Field'),
  creditingPeriodStartDate: yup.date().required('Required Field'),
  creditingPeriodEndDate: yup.date().required('Required Field'),
  validityPeriodStartDate: yup.string().required('Required Field'),
  validityPeriodEndDate: yup.date().required('Required Field'),
  unitQuantity: yup
    .number('Inavlid Number')
    .integer()
    .required('Required Field'),
  labelLink: yup.string().required('Required Field'),
});
