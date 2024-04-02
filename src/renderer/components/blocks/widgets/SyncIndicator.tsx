import React from 'react';
import { useGetOrganizationsMapQuery, useGetOrganizationsListQuery } from '@/api/cadt/v1/organizations';

interface SyncIndicatorProps {
  detailed: boolean;
  orgUid?: string;
}

/**
 * Component to display sync status indicator.
 * It shows a green circle if the organization is synced, and a pulsing yellow circle if syncing.
 * When 'detailed' is true, it also shows a label next to the indicator.
 * The sync status is determined based on 'orgUid' from the organizations data.
 */
const SyncIndicator: React.FC<SyncIndicatorProps> = ({ detailed, orgUid }) => {
  const { data: organizationsMap } = useGetOrganizationsMapQuery(null, {
    skip: !orgUid,
  });

  const { data: organizationList } = useGetOrganizationsListQuery(null, {
    skip: Boolean(orgUid),
  });

  let isSynced = false;

  if (!orgUid) {
    isSynced = !organizationList?.some((org) => !org.synced);
  } else {
    isSynced = organizationsMap?.[orgUid]?.synced;
  }

  return (
    <div className={`flex items-center space-x-2 ${detailed ? 'p-2 rounded-lg shadow bg-white dark:bg-gray-800' : ''}`}>
      <div className={`${isSynced ? 'bg-green-500' : 'animate-pulse bg-yellow-500'} h-4 w-4 rounded-full`}></div>
      {detailed && (
        <span className={`text-sm ${isSynced ? 'text-green-700' : 'text-yellow-600'}`}>
          {isSynced ? 'Synced' : 'Syncing...'}
        </span>
      )}
    </div>
  );
};

export { SyncIndicator };
