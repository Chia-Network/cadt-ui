export interface Estimation {
  // Required properties
  orgUid: string; // Derived upon creation
  warehouseProjectId: string; // Derived upon creation
  creditingPeriodStart: Date;
  creditingPeriodEnd: Date;
  unitCount: number;

  // Optional properties
  id?: string;
  timeStaged?: Date | null;
  updatedAt?: Date;
  createdAt?: Date;
}