import {Label} from './Label.schema';
import {Issuance} from "@/schemas/Issuance.schema";

export interface Unit {
  // Required properties
  countryJurisdictionOfOwner: string; // Requires validation against a list of countries
  unitCount: number; // Must be an integer
  vintageYear: number; // Must be an integer between 1900 and 3000
  unitType: string; // Requires validation against a list of unit types
  unitStatus: string; // Requires validation against a list of unit statuses
  unitRegistryLink: string;
  correspondingAdjustmentDeclaration: string; // Requires validation against a list of declarations
  correspondingAdjustmentStatus: string; // Requires validation against a list of statuses
  issuance: Issuance; // Detailed structure needs to be defined
  labels: Label[]; // Detailed structure needs to be defined

  // Optional properties
  projectLocationId?: string | null;
  unitOwner?: string | null;
  inCountryJurisdictionOfOwner?: string | null;
  marketplace?: string | null;
  marketplaceLink?: string | null;
  marketplaceIdentifier?: string | null;
  unitTags?: string | null;
  unitStatusReason?: string | null;
  updatedAt?: Date | null;
  createdAt?: Date | null;
  timeStaged?: number | null; // Assuming the timestamp is represented as a number
}