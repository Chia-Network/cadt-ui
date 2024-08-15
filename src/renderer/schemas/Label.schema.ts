export interface Label {
  id?: string | undefined;

  // Required properties
  warehouseProjectId?: string | undefined;
  orgUid?: string | undefined;
  label: string | null;
  labelType: string | null;
  creditingPeriodStartDate: Date | null;
  creditingPeriodEndDate: Date | null;
  validityPeriodStartDate: string | null;
  validityPeriodEndDate: Date | null;
  unitQuantity: number | null;
  timeStaged?: Date | null;
  labelLink: string | null;
}
