export interface Estimation {
  id?: string;
  orgUid?: string;
  warehouseProjectId?: string;
  creditingPeriodStart: Date | null;
  creditingPeriodEnd: Date | null;
  unitCount: number | null;
}
