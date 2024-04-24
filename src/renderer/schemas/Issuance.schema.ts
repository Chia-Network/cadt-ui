export interface Issuance {
  // Required properties
  orgUid?: string | null;
  startDate: Date | null;
  endDate: Date | null;
  verificationApproach: string | null;
  verificationBody: string | null;
  verificationReportDate: Date | null;

  // Optional properties
  id?: string | null;
  warehouseProjectId?: string | null;
  timeStaged?: Date | null;
  updatedAt?: Date | null;
  createdAt?: Date | null;
}
