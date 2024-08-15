export interface ProjectLocation {
  id?: string;
  orgUid?: string;
  warehouseProjectId?: string;
  country: string | null;
  geographicIdentifier: string | number | null;
  inCountryRegion?: string | null;
  timeStaged?: Date | null;
  fileId?: string | null;
}
