export interface Rating {
  // Required properties
  orgUid: string; // Derived upon creation
  warehouseProjectId: string; // Derived upon creation
  ratingType: string; // Uses custom validation, represented as string in TypeScript
  ratingRangeLowest: string;
  ratingRangeHighest: string;
  rating: string;
  ratingLink: string;

  // Optional properties
  id?: string;
  timeStaged?: Date | null; // Can be null
  updatedAt?: Date;
  createdAt?: Date;
}
