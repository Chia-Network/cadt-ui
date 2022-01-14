import * as yup from 'yup';

export const unitsSchema = yup.object().shape({
  countryJurisdictionOfOwner: yup.string().required(),
  inCountryJurisdictionOfOwner: yup.string().optional(),
  serialNumberBlock: yup
    .string()
    .required()
    .matches(/[.*\D]+[0-9]+[-][.*\D]+[0-9]+$/, 'Invalid Serial Number'),
  unitIdentifier: yup.string().required(),
  intendedBuyerOrgUid: yup.string().optional(),
  marketplace: yup.string().optional(),
  vintage: yup.array().optional(),
  qualifications: yup.array().optional(),
  unitType: yup.string().required(),
  unitStatus: yup.string().required(),
  tags: yup.string().optional(),
  unitTransactionType: yup.string().optional(),
  unitStatusReason: yup.string().optional(),
  tokenIssuanceHash: yup.string().optional(),
  marketplaceIdentifier: yup.string().optional(),
  unitsIssuanceLocation: yup.string().required(),
  unitRegistryLink: yup.string().required(),
  unitMarketplaceLink: yup.string().optional(),
  correspondingAdjustmentDeclaration: yup.string().required(),
  correspondingAdjustmentStatus: yup.string().required(),
});
