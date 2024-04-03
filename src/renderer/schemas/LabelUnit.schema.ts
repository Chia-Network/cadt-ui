export interface LabelUnit {
  // Optional properties
  id?: string;
  timeStaged?: Date | null;
  updatedAt?: Date;
  createdAt?: Date;

  // Required properties
  orgUid: string;
  warehouseUnitId: string;
  labelId: string;
}
