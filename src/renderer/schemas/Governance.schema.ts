export interface Governance {
  // Required fields
  id: number;
  metaKey: string;
  metaValue: string;

  // Optional fields
  confirmed?: boolean;
}
