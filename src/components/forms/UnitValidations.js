import * as yup from 'yup';
import { issuanceSchema } from './IssuanceValidation';
import { labelSchema } from './LabelsValidation';


export const unitsSchema = yup.object().shape({
  projectLocationId: yup.string().required(),
  unitOwner: yup.string().required(),
  countryJurisdictionOfOwner: yup.string().required(),
  inCountryJurisdictionOfOwner: yup.string().required(),
  serialNumberBlock: yup
    .string()
    .matches(/[.*\D]+[0-9]+[-][.*\D]+[0-9]+$/, 'Invalid serialNumberBlock')
    .required(),
  serialNumberPattern: yup.string().required(),
  vintageYear: yup.number().integer().min(1900).max(3000),
  unitType: yup.string().required(),
  marketplace: yup.string().optional(),
  marketplaceLink: yup.string().optional(),
  marketplaceIdentifier: yup.string().optional(),
  unitTags: yup.string().optional(),
  unitStatus: yup.string().required(),
  unitStatusReason: yup.string().optional(),
  unitRegistryLink: yup.string().required(),
  correspondingAdjustmentDeclaration: yup.string().required(),
  correspondingAdjustmentStatus: yup.string().required(),
  issuance: yup.array().of(issuanceSchema).optional().nullable(),
  labels: yup.array().of(labelSchema).optional().nullable(),
});
