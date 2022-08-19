import * as yup from 'yup';

export const locationSchema = yup.object({
  id: yup.string().optional(),
  country: yup.string().required('yup-validation-field-required'),
  inCountryRegion: yup.string().optional().nullable(),
  geographicIdentifier: yup.string().required('yup-validation-field-required'),
  fileId: yup.string().nullable().optional(),
  updatedAt: yup.date().typeError('yup-validation-date').optional(),
  createdAt: yup.date().typeError('yup-validation-date').optional(),
});

export const locationsSchema = yup.array().of(locationSchema);
