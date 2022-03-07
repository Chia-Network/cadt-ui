import * as yup from 'yup';

export const locationSchema = yup.object({
  id: yup.string().optional(),
  country: yup.string().required('Required Field'),
  inCountryRegion: yup.string().optional(),
  geographicIdentifier: yup.string().required('Required Field'),
  updatedAt: yup.date().typeError('Invalid Date').optional(),
  createdAt: yup.date().typeError('Invalid Date').optional(),
});

export const locationsSchema = yup.array().of(locationSchema);
