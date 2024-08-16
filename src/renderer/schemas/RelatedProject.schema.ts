export interface RelatedProject {
  // Required properties
  orgUid?: string | null;
  warehouseProjectId?: string | null;
  relatedProjectId: string | null;

  // Optional properties
  id?: string;
  relationshipType?: string | null;
  registry?: string | null;
  timeStaged?: Date | null;
  updatedAt?: Date;
  createdAt?: Date;
}
