export interface ProjectLocation {
  // Required properties
  orgUid: string; // Derived upon creation
  warehouseProjectId: string; // Derived upon creation
  country: string; // Uses custom validation, represented as string in TypeScript
  geographicIdentifier: string | number; // Can be either string or number

  // Optional properties
  id?: string;
  inCountryRegion?: string | null; // Can be null or empty string
  timeStaged?: Date | null; // Can be null
  fileId?: string | null; // Can be null or empty string
  updatedAt?: Date;
  createdAt?: Date;
}
