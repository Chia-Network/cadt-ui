import * as yup from 'yup';

export const estimationSchema = yup.object({
  id: yup.string().optional(),
  creditingPeriodStart: yup
    .date()
    .typeError('Invalid Date')
    .required('Required Field'),
  creditingPeriodEnd: yup
    .date()
    .typeError('Invalid Date')
    .min(
      yup.ref('creditingPeriodStart'),
      'End date should be greater than start date',
    )
    .required('Required Field'),
  unitCount: yup
    .number()
    .integer()
    .typeError('Add a positive count number')
    .test({
      message: 'Add a positive count number',
      test: val => val >= 0,
    })
    .required('Required Field'),
  updatedAt: yup.date().typeError('Invalid Date').optional(),
  createdAt: yup.date().typeError('Invalid Date').optional(),
});

export const estimationsSchema = yup.array().of(estimationSchema);
