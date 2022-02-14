import * as yup from 'yup';

export const coBenefitSchema = yup.object({
  id: yup.string().optional(),
  cobenefit: yup.string().required('Required Field'),
  updatedAt: yup.date().optional(),
  createdAt: yup.date().optional(),
});

export const coBenefitsSchema = yup.array().of(coBenefitSchema);
