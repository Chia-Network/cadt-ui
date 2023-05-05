import * as yup from 'yup';
import { coBenefitSchema } from './co-benefits.validation';
import { estimationSchema } from './estimations.validation';
import { issuanceSchema } from './Issuances.validations';
import { labelSchema } from './labels.validation';
import { locationSchema } from './locations.validations';
import { ratingSchema } from './ratings.validation';
import { relatedProjectSchema } from './relatedProjects.validation';

export const projectSchema = yup.object().shape({
  currentRegistry: yup.string().required('yup-validation-field-required'),
  registryOfOrigin: yup.string().required('yup-validation-field-required'),
  originProjectId: yup.string().required('yup-validation-field-required'),
  program: yup.string().optional(),
  projectId: yup.string().required('yup-validation-field-required'),
  projectName: yup.string().required('yup-validation-field-required'),
  description: yup.string().optional(),
  projectLink: yup.string().required('yup-validation-field-required'),
  projectDeveloper: yup.string().required('yup-validation-field-required'),
  sector: yup.string().required('yup-validation-field-required'),
  projectType: yup.string().required('yup-validation-field-required'),
  coveredByNDC: yup.string().required('yup-validation-field-required'),
  ndcInformation: yup.string().optional(),
  projectStatus: yup.string().required('yup-validation-field-required'),
  unitMetric: yup.string().required('yup-validation-field-required'),
  methodology: yup.string().required('yup-validation-field-required'),
  projectTags: yup.mixed().optional(),
  validationBody: yup.string().optional(),
  projectStatusDate: yup.date().typeError('yup-validation-date'),
  validationDate: yup.lazy(value => {
    if (value === null) {
      return yup.object().nullable();
    } else if (typeof value === 'object' && !isNaN(value.getTime())) {
      return yup
        .date()
        .required('yup-validation-field-required')
        .typeError('yup-validation-date');
    } else {
      return yup.string().optional();
    }
  }),

  labels: yup.array().of(labelSchema).optional(),
  issuances: yup.array().of(issuanceSchema).optional(),
  coBenefits: yup.array().of(coBenefitSchema).optional(),
  projectLocations: yup.array().of(locationSchema).optional(),
  relatedProjects: yup.array().of(relatedProjectSchema).optional(),
  estimations: yup.array().of(estimationSchema).optional(),
  projectRatings: yup.array().of(ratingSchema).optional(),
});
