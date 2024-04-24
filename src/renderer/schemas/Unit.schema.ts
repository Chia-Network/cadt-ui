import {Label} from './Label.schema';
import {Issuance} from "@/schemas/Issuance.schema";

export interface Unit {
  orgUid?: string | null;
  warehouseProjectId?: string | null;
  warehouseUnitId?: string | null;
  countryJurisdictionOfOwner: string | null;
  unitCount: number | null;
  vintageYear: number | null;
  unitType: string | null;
  unitStatus: string | null;
  unitRegistryLink: string | null;
  correspondingAdjustmentDeclaration: string | null;
  correspondingAdjustmentStatus: string | null;
  issuance: Issuance | null;
  labels?: Label[];
  unitBlockStart: string | null;
  unitBlockEnd: string | null;
  serialNumberBlock: string | null;
  projectLocationId?: string | null;
  unitOwner?: string | null;
  inCountryJurisdictionOfOwner?: string | null;
  marketplace?: string | null;
  marketplaceLink?: string | null;
  marketplaceIdentifier?: string | null;
  unitTags?: string | null;
  unitStatusReason?: string | null;
}