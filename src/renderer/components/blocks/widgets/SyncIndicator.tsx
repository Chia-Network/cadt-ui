import React from 'react';
import _ from 'lodash'
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

  let isSynced: boolean;
  let syncRemaining: number = 0;

  if (!orgUid) {
    isSynced = !organizationList?.some((org) => !org.synced);
    if (!isSynced) {
      syncRemaining = organizationList?.reduce((acc, org) => {
        return _.isNil(org.sync_remaining) ? acc : acc + org.sync_remaining;
      }, 0) ?? 0;
    }
  } else {
    const orgData = organizationsMap?.[orgUid];
    isSynced = _.isNil(orgData?.synced) ? false : orgData.synced;
    if (!isSynced) {
      syncRemaining = orgData?.sync_remaining ?? 0;
    }
  }

  return (
    <div className={`grid grid-cols-[auto_1fr] items-center gap-x-2 ${detailed ? 'p-2 rounded-lg shadow bg-white dark:bg-gray-800' : ''}`}>
      <div className={`${isSynced ? 'bg-green-500' : 'animate-pulse bg-yellow-500'} h-4 w-4 rounded-full`}></div>
      {detailed && (
        <div className="flex flex-col text-left">
          <span className={`text-sm ${isSynced ? 'text-green-700' : 'text-yellow-600'}`}>
            {isSynced ? 'Synced' : 'Syncing...'}
          </span>
          {!isSynced && (
            <span className="text-xs text-yellow-400">
              {syncRemaining} remaining
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export { SyncIndicator };
