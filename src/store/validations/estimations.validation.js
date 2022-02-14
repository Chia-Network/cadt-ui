import * as yup from 'yup';

export const estimationSchema = yup.object({
  id: yup.string().optional(),
  creditingPeriodStart: yup.date().required('Required Field'),
  creditingPeriodEnd: yup
    .date()
    .min(yup.ref('creditingPeriodStart'))
    .required('Required Field'),
  unitCount: yup.number().integer().required('Required Field'),
  updatedAt: yup.date().optional(),
  createdAt: yup.date().optional(),
});

export const estimationsSchema = yup.array().of(estimationSchema);
