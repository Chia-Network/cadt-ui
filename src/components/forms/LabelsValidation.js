import * as yup from 'yup';

export const labelSchema = yup.object().shape({
  label: yup.string().required('Required Field'),
  labelType: yup.string().required('Required Field'),
  creditingPeriodStartDate: yup
    .date()
    .typeError('Invalid Date')
    .required('Required Field'),
  creditingPeriodEndDate: yup
    .date()
    .min(
      yup.ref('creditingPeriodStartDate'),
      "End date can't be before start date",
    )
    .typeError('Invalid Date')
    .required('Required Field'),
  validityPeriodStartDate: yup.string().required('Required Field'),
  validityPeriodEndDate: yup
    .date()
    .min(
      yup.ref('validityPeriodStartDate'),
      "End date can't be before start date",
    )
    .typeError('Invalid Date')
    .required('Required Field'),
  unitQuantity: yup
    .number('Invalid Number')
    .integer()
    .required('Required Field'),
  labelLink: yup.string().required('Required Field'),
});
