export interface Organization {
  // Required fields
  id: number; // Auto-incremented primary key
  orgUid: string; // Unique string
  name: string;
  icon: string;
  registryId: string;
  registryHash: string;
  fileStoreId: string;
  prefix: string; // Default value '0', cannot be null

  // Optional fields
  orgHash?: string;
  fileStoreSubscribed?: boolean; // Default value false
  subscribed?: boolean; // Default value false
  isHome?: boolean; // Default value false
  metadata?: string; // Default value '{}', can be null
  synced?: boolean; // Default value false
  sync_remaining?: number; // Default value 0
  createdAt?: Date;
  updatedAt?: Date;
}