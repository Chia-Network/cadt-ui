import {Label} from './Label.schema';
import {Issuance} from "@/schemas/Issuance.schema";

export interface Unit {
  // Required properties
  countryJurisdictionOfOwner: string;
  unitCount: number;
  vintageYear: number;
  unitType: string;
  unitStatus: string;
  unitRegistryLink: string;
  correspondingAdjustmentDeclaration: string;
  correspondingAdjustmentStatus: string;
  issuance: Issuance;
  labels: Label[];
  unitBlockStart: string;
  unitBlockEnd: string;
  serialNumberBlock: string;

  // Optional properties
  projectLocationId?: string | null;
  unitOwner?: string | null;
  inCountryJurisdictionOfOwner?: string | null;
  marketplace?: string | null;
  marketplaceLink?: string | null;
  marketplaceIdentifier?: string | null;
  unitTags?: string | null;
  unitStatusReason?: string | null;
}