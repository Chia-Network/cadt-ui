import * as yup from 'yup';

export const locationSchema = yup.object({
  id: yup.string().optional(),
  country: yup.string().required('Required Field'),
  inCountryRegion: yup.string().required('Required Field'),
  geographicIdentifier: yup.string().required('Required Field'),
  updatedAt: yup.date().optional(),
  createdAt: yup.date().optional(),
});

export const locationsSchema = yup.array().of(locationSchema);
