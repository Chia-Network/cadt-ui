import * as yup from 'yup';

export const coBenefitSchema = yup.object({
  id: yup.string().optional(),
  cobenefit: yup.string().required('yup-validation-field-required'),
  updatedAt: yup.date().typeError('yup-validation-date').optional(),
  createdAt: yup.date().typeError('yup-validation-date').optional(),
});

export const coBenefitsSchema = yup.array().of(coBenefitSchema);
