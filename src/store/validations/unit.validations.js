import * as yup from 'yup';
import { labelSchema, issuanceSchema } from '.';

export const unitsSchema = yup.object().shape({
  projectLocationId: yup.string().optional(),
  unitOwner: yup.string().optional(),
  countryJurisdictionOfOwner: yup.string().required('Required Field'),
  inCountryJurisdictionOfOwner: yup.string().optional(),
  unitBlockEnd: yup.string().required('Required Field'),
  unitBlockStart: yup.string().required('Required Field'),
  unitCount: yup
    .number()
    .min(1, 'Count must be greater than 0')
    .required('Required Field'),
  vintageYear: yup
    .number()
    .typeError('Invalid Year')
    .integer()
    .min(1900)
    .max(3000)
    .required('Required Field'),
  unitType: yup.string().required('Required Field'),
  marketplace: yup.string().optional(),
  marketplaceLink: yup.string().optional(),
  marketplaceIdentifier: yup.string().optional(),
  unitTags: yup.string().optional(),
  unitStatus: yup.string().required('Required Field'),
  unitStatusReason: yup.string().when('unitStatus', {
    is: val => ['cancelled', 'retired'].includes(val.toLowerCase()),
    then: yup.string().required('Required Field'),
    otherwise: yup.string().optional(),
  }),
  unitRegistryLink: yup.string().required('Required Field'),
  correspondingAdjustmentDeclaration: yup.string().required('Required Field'),
  correspondingAdjustmentStatus: yup.string().required('Required Field'),
  issuance: issuanceSchema,
  labels: yup.array().of(labelSchema).optional(),
});

export const splitUnitValidationSchema = yup.array().of(
  yup.object().shape({
    unitCount: yup
      .number()
      .required('yup-validation-field-required')
      .positive('yup-validation-positive-number')
      .integer('yup-validation-integer')
      .typeError('yup-validation-valid-number'),
    unitOwner: yup.string().optional().typeError('yup-validation-valid-string'),
    unitBlockStart: yup
      .string()
      .required('yup-validation-field-required')
      .typeError('yup-validation-valid-string'),
    unitBlockEnd: yup
      .string()
      .required('yup-validation-field-required')
      .typeError('yup-validation-valid-string'),
    countryJurisdictionOfOwner: yup
      .string()
      .optional()
      .typeError('yup-validation-valid-string'),
    inCountryJurisdictionOfOwner: yup
      .string()
      .optional()
      .typeError('yup-validation-valid-string'),
  }),
);
