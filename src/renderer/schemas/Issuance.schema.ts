export interface Issuance {
  // Required properties
  orgUid: string;
  startDate: Date;
  endDate: Date;
  verificationApproach: string;
  verificationBody: string;
  verificationReportDate: Date;

  // Optional properties
  id?: string | null;
  warehouseProjectId?: string | null;
  timeStaged?: Date | null;
  updatedAt?: Date | null;
  createdAt?: Date | null;
}
