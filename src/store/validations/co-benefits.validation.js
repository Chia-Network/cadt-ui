import * as yup from 'yup';

export const coBenefitSchema = yup.object({
  id: yup.string().optional(),
  cobenefit: yup.string().required('Required Field'),
  updatedAt: yup.date().typeError('Invalid Date').optional(),
  createdAt: yup.date().typeError('Invalid Date').optional(),
});

export const coBenefitsSchema = yup.array().of(coBenefitSchema);
