import * as yup from 'yup';

export const relatedProjectSchema = yup.object({
  id: yup.string().optional(),
  relatedProjectId: yup.string().required('Required Field'),
  relationshipType: yup.string().required('Required Field'),
  registry: yup.string().required('Required Field'),
  updatedAt: yup.date().optional(),
  createdAt: yup.date().optional(),
});

export const relatedProjectsSchema = yup.array().of(relatedProjectSchema);
