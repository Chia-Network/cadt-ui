import * as yup from 'yup';

export const relatedProjectSchema = yup.object({
  id: yup.string().optional(),
  relatedProjectId: yup.string().required('yup-validation-field-required'),
  relationshipType: yup.string().optional().nullable(),
  registry: yup.string().optional().nullable(),
  updatedAt: yup.date().typeError('yup-validation-date').optional(),
  createdAt: yup.date().typeError('yup-validation-date').optional(),
});

export const relatedProjectsSchema = yup.array().of(relatedProjectSchema);
