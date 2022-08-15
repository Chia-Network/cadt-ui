import * as yup from 'yup';
import { labelSchema, issuanceSchema } from '.';

export const unitsSchema = yup.object().shape({
  projectLocationId: yup.string().optional(),
  unitOwner: yup.string().optional(),
  countryJurisdictionOfOwner: yup
    .string()
    .required('yup-validation-field-required'),
  inCountryJurisdictionOfOwner: yup.string().optional(),
  unitBlockEnd: yup.string().required('yup-validation-field-required'),
  unitBlockStart: yup.string().required('yup-validation-field-required'),
  unitCount: yup
    .number()
    .positive('yup-validation-positive-number')
    .integer('yup-validation-integer')
    .required('yup-validation-field-required')
    .typeError('yup-validation-valid-number'),
  vintageYear: yup
    .number()
    .typeError('yup-validation-year')
    .integer()
    .min(1900)
    .max(3000)
    .required('yup-validation-field-required'),
  unitType: yup.string().required('yup-validation-field-required'),
  marketplace: yup.string().optional(),
  marketplaceLink: yup.string().optional(),
  marketplaceIdentifier: yup.string().optional(),
  unitTags: yup.mixed().optional(),
  unitStatus: yup.string().required('yup-validation-field-required'),
  unitStatusReason: yup.string().optional(),
  unitRegistryLink: yup.string().required('yup-validation-field-required'),
  correspondingAdjustmentDeclaration: yup
    .string()
    .required('yup-validation-field-required'),
  correspondingAdjustmentStatus: yup
    .string()
    .required('yup-validation-field-required'),
  issuance: issuanceSchema,
  labels: yup.array().of(labelSchema).optional(),
});

export const splitUnitsValidationSchema = yup.object().shape({
  units: yup.array().of(
    yup.object().shape({
      unitCount: yup
        .number()
        .required('yup-validation-field-required')
        .positive('yup-validation-positive-number')
        .integer('yup-validation-integer')
        .typeError('yup-validation-valid-number'),
      unitOwner: yup
        .string()
        .optional()
        .typeError('yup-validation-valid-string'),
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
  ),
});
