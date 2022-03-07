import * as yup from 'yup';
import { coBenefitSchema } from './co-benefits.validation';
import { estimationSchema } from './estimations.validation';
import { issuanceSchema } from './Issuances.validations';
import { labelSchema } from './labels.validation';
import { locationSchema } from './locations.validations';
import { ratingSchema } from './ratings.validation';
import { relatedProjectSchema } from './relatedProjects.validation';

export const projectSchema = yup.object().shape({
  currentRegistry: yup.string().required('Required Field'),
  registryOfOrigin: yup.string().required('Required Field'),
  originProjectId: yup.string().required('Required Field'),
  program: yup.string().optional(),
  projectId: yup.string().required('Required Field'),
  projectName: yup.string().required('Required Field'),
  projectLink: yup.string().required('Required Field'),
  projectDeveloper: yup.string().required('Required Field'),
  sector: yup.string().required('Required Field'),
  projectType: yup.string().required('Required Field'),
  coveredByNDC: yup.string().required('Required Field'),
  ndcInformation: yup.string().when('coveredByNDC', {
    is: 'Inside NDC',
    then: yup.string().required('NDC Information is required'),
    otherwise: yup.string().optional(),
  }),
  projectStatus: yup.string().required('Required Field'),
  unitMetric: yup.string().required('Required Field'),
  methodology: yup.string().required('Required Field'),
  projectTags: yup.string().optional(),
  validationBody: yup.string().optional(),
  projectStatusDate: yup.date().typeError('Invalid Date'),
  validationDate: yup.lazy(value => {
    if (value === null) {
      return yup.object().nullable();
    } else if (typeof value === 'object' && !isNaN(value.getTime())) {
      return yup
        .date()
        .required('Required field')
        .typeError('Enter valid date');
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
