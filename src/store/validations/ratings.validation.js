import * as yup from 'yup';

export const ratingSchema = yup.object({
  id: yup.string().optional(),
  ratingType: yup.string().required('yup-validation-field-required'),
  ratingRangeLowest: yup.string().required('yup-validation-field-required'),
  ratingRangeHighest: yup.string().required('yup-validation-field-required'),
  rating: yup.string().required('yup-validation-field-required'),
  ratingLink: yup.string().required('yup-validation-field-required'),
  updatedAt: yup.date().typeError('yup-validation-date').optional(),
  createdAt: yup.date().typeError('yup-validation-date').optional(),
});

export const ratingsSchema = yup.array().of(ratingSchema);
