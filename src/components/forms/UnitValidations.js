import * as yup from 'yup';
import { labelSchema } from './LabelsValidation';

export const unitsSchema = yup.object().shape({
  projectLocationId: yup.string().required('Required Field'),
  unitOwner: yup.string().required('Required Field'),
  countryJurisdictionOfOwner: yup.string().required('Required Field'),
  inCountryJurisdictionOfOwner: yup.string().required('Required Field'),
  serialNumberBlock: yup
    .string()
    .matches(/[.*\D]+[0-9]+[-][.*\D]+[0-9]+$/, 'Invalid Serial Number')
    .required('Required Field'),
  serialNumberPattern: yup.string().required('Required Field'),
  vintageYear: yup
    .number()
    .typeError('Invalid Year')
    .integer()
    .min(1900)
    .max(3000)
    .required('Required Field'),
  unitType: yup.string().required('Required Field'),
  marketplace: yup.string().required('Required Field'),
  marketplaceLink: yup.string().required('Required Field'),
  marketplaceIdentifier: yup.string().required('Required Field'),
  unitTags: yup.string().optional(),
  unitStatus: yup.string().required('Required Field'),
  unitStatusReason: yup.string().required('Required Field'),
  unitRegistryLink: yup.string().required('Required Field'),
  correspondingAdjustmentDeclaration: yup.string().required('Required Field'),
  correspondingAdjustmentStatus: yup.string().required('Required Field'),
  issuance: yup.object().optional(),
  labels: yup.array().of(labelSchema).optional(),
});
