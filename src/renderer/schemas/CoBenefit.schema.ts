export interface CoBenefit {
  // Required properties
  orgUid: string; // Derived upon creation
  warehouseProjectId: string; // Derived upon creation
  cobenefit: string;

  // Optional properties
  id?: string;
  timeStaged?: Date | null;
  updatedAt?: Date;
  createdAt?: Date;
}
