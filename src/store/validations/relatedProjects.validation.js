import * as yup from 'yup';

export const relatedProjectSchema = yup.object({
  id: yup.string().optional(),
  relatedProjectId: yup.string().optional(),
  relationshipType: yup.string().optional(),
  registry: yup.string().optional(),
  updatedAt: yup.date().optional(),
  createdAt: yup.date().optional(),
});

export const relatedProjectsSchema = yup.array().of(relatedProjectSchema);
