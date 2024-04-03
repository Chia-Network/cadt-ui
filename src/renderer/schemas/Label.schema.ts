import {LabelUnit} from "./LabelUnit.schema";

export interface Label {
  // Optional properties
  id?: string;
  updatedAt?: Date;
  createdAt?: Date;
  label_unit?: LabelUnit; // Assuming LabelUnit is another interface you'll define based on labelUnitSchema

  // Required properties
  warehouseProjectId: string;
  orgUid: string;
  label: string;
  labelType: string; // Assuming pickListValidation results in a string, adjust if necessary
  creditingPeriodStartDate: Date;
  creditingPeriodEndDate: Date;
  validityPeriodStartDate: string; // Noted as string, adjust if it should be a Date
  validityPeriodEndDate: Date;
  unitQuantity: number;
  timeStaged?: Date | null; // Allowing null as per your schema
  labelLink: string;
}
