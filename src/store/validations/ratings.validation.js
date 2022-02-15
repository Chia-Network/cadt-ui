import * as yup from 'yup';

export const ratingSchema = yup.object({
  id: yup.string().optional(),
  ratingType: yup.string().required('Required Field'),
  ratingRangeLowest: yup.string().required('Required Field'),
  ratingRangeHighest: yup.string().required('Required Field'),
  rating: yup.string().required('Required Field'),
  ratingLink: yup.string().required('Required Field'),
  updatedAt: yup.date().typeError('Invalid Date').optional(),
  createdAt: yup.date().typeError('Invalid Date').optional(),
});

export const ratingsSchema = yup.array().of(ratingSchema);
