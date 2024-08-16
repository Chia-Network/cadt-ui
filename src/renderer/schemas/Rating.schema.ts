export interface Rating {
  id?: string;
  orgUid?: string;
  warehouseProjectId?: string;
  ratingType: string | null;
  ratingRangeLowest: string | null;
  ratingRangeHighest: string | null;
  rating: string | null;
  ratingLink: string | null;
}
