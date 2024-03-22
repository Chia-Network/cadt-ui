export interface RelatedProject {
  // Required properties
  orgUid: string; // Derived upon creation
  warehouseProjectId: string; // Derived upon creation
  relatedProjectId: string;

  // Optional properties
  id?: string;
  relationshipType?: string;
  registry?: string;
  timeStaged?: Date | null;
  updatedAt?: Date;
  createdAt?: Date;
}
