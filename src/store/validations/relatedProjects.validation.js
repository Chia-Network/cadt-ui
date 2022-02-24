import * as yup from 'yup';

export const relatedProjectSchema = yup.object({
  id: yup.string().optional(),
  relatedProjectId: yup.string().required('Required Field'),
  relationshipType: yup.string().optional().nullable(),
  registry: yup.string().optional().nullable(),
  updatedAt: yup.date().typeError('Invalid Date').optional(),
  createdAt: yup.date().typeError('Invalid Date').optional(),
});

export const relatedProjectsSchema = yup.array().of(relatedProjectSchema);
