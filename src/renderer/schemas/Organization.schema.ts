export interface Organization {
  // Required fields
  id: number;
  orgUid: string;
  name: string;
  icon: string;
  registryId: string;
  registryHash: string;
  fileStoreId: string;
  prefix: string;

  // Optional fields
  orgHash?: string;
  fileStoreSubscribed?: boolean;
  subscribed?: boolean;
  isHome?: boolean;
  metadata?: string;
  synced?: boolean;
  sync_remaining?: number;
  createdAt?: Date;
  updatedAt?: Date;
}