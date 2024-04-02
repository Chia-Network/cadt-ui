import React from 'react';
import { useGetOrganizationsMapQuery, useGetOrganizationsListQuery } from '@/api/cadt/v1/organizations';

interface SyncIndicatorProps {
  detailed: boolean;
  orgUid?: string;
}

const SyncIndicator: React.FC<SyncIndicatorProps> = ({ detailed, orgUid }) => {
  const { data: organizationsMap } = useGetOrganizationsMapQuery(null, {
    skip: !orgUid,
    pollingInterval: 10000,
  });

  const { data: organizationList } = useGetOrganizationsListQuery(null, {
    skip: Boolean(orgUid),
    pollingInterval: 10000,
  });

  let isSynced = false;
  let syncRemaining = 0;

  if (!orgUid) {
    isSynced = !organizationList?.some((org) => !org.synced);
    if (!isSynced) {
      syncRemaining = organizationList?.reduce((acc, org) => acc + org.sync_remaining, 0) ?? 0;
    }
  } else {
    const orgData = organizationsMap?.[orgUid];
    isSynced = orgData?.synced;
    if (!isSynced) {
      syncRemaining = orgData?.sync_remaining ?? 0;
    }
  }

  return (
    <div className={`flex items-center space-x-2 ${detailed ? 'p-2 rounded-lg shadow bg-white dark:bg-gray-800' : ''}`}>
      <div className={`${isSynced ? 'bg-green-500' : 'animate-pulse bg-yellow-500'} h-4 w-4 rounded-full`}></div>
      {detailed && (
        <>
          <span className={`text-sm ${isSynced ? 'text-green-700' : 'text-yellow-600'}`}>
            {isSynced ? 'Synced' : 'Syncing...'}
          </span>
          {!isSynced && (
            // Made "sync remaining" more subtle with lighter color and smaller font
            <span className="text-xs text-yellow-400">
              ({syncRemaining} remaining)
            </span>
          )}
        </>
      )}
    </div>
  );
};

export { SyncIndicator };
