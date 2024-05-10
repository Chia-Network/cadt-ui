import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import {
  useGetOrganizationsMapQuery,
  useGetOrganizationsListQuery,
  invalidateProjectApiTag,
  invalidateUnitsApiTag,
} from '@/api';
import { BiRefresh } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

interface SyncIndicatorProps {
  detailed: boolean;
  orgUid?: string;
  useRefeshBadge?: boolean;
}

/**
 * Displays synchronization indicator and allows a hard refresh when sync status changes.
 * @param {Object} props Component props.
 * @param {boolean} props.detailed Indicates if detailed view is enabled.
 * @param {string} [props.orgUid] Organization UID for specific org data.
 * @returns {JSX.Element} SyncIndicator component.
 */
const SyncIndicator: React.FC<SyncIndicatorProps> = ({ detailed, orgUid, useRefeshBadge = true }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { data: organizationsMap } = useGetOrganizationsMapQuery(null, {
    skip: !orgUid,
    pollingInterval: 10000,
  });

  const { data: organizationList } = useGetOrganizationsListQuery(null, {
    skip: Boolean(orgUid),
    pollingInterval: 10000,
  });

  const [isSynced, setIsSynced] = useState(true);
  const [syncRemaining, setSyncRemaining] = useState(0);
  const [prevSyncRemaining, setPrevSyncRemaining] = useState(0);
  const [showRefreshBadge, setShowRefreshBadge] = useState(false);

  useEffect(() => {
    let newIsSynced = true;
    let newSyncRemaining = 0;

    if (!orgUid) {
      newIsSynced = !organizationList?.some((org) => !org.synced);
      if (!newIsSynced) {
        newSyncRemaining =
          organizationList?.reduce((acc, org) => {
            return _.isNil(org.sync_remaining) ? acc : acc + org.sync_remaining;
          }, 0) ?? 0;
      }
    } else {
      const orgData = organizationsMap?.[orgUid];
      newIsSynced = Boolean(orgData?.synced);
      if (!newIsSynced) {
        newSyncRemaining = orgData?.sync_remaining ?? 0;
      }
    }

    setIsSynced(newIsSynced);
    setSyncRemaining(newSyncRemaining);

    if (prevSyncRemaining !== newSyncRemaining && prevSyncRemaining !== 0) {
      setShowRefreshBadge(true);

      if (location.pathname.includes('projects')) {
        dispatch(invalidateProjectApiTag(['projects', 'stagedProjects']));
      }

      if (location.pathname.includes('units')) {
        dispatch(invalidateUnitsApiTag(['units', 'stagedUnits']));
      }
    }

    setPrevSyncRemaining(newSyncRemaining);
  }, [orgUid, organizationsMap, organizationList, location.pathname, dispatch, prevSyncRemaining]);

  const handleRefreshClick = () => {
    // Trigger hard refresh of the app here
    window.location.reload();
  };

  return (
    <>
      <div
        className={`grid grid-cols-[auto_1fr] items-center gap-x-2 ${detailed ? 'p-2 rounded-lg shadow bg-white dark:bg-gray-800' : ''}`}
      >
        <div className={`${isSynced ? 'bg-green-500' : 'animate-pulse bg-yellow-500'} h-4 w-4 rounded-full`}></div>
        {detailed && (
          <div className="flex flex-col text-left">
            <span className={`text-sm ${isSynced ? 'text-green-700' : 'text-yellow-600'}`}>
              {isSynced ? 'Synced' : 'Syncing...'}
            </span>
            {!isSynced && <span className="text-xs text-yellow-400">{syncRemaining + 1} remaining</span>}
          </div>
        )}
      </div>
      {useRefeshBadge && showRefreshBadge && (
        <button
          onClick={handleRefreshClick}
          className="ml-2 py-2 px-4 bg-orange-200 text-orange-600 border border-orange-400 rounded-lg hover:bg-orange-300 transition duration-150 ease-in-out flex items-center justify-center space-x-2 dark:bg-orange-600 dark:text-orange-200 dark:border-orange-700 dark:hover:bg-orange-700"
        >
          <BiRefresh className="text-orange-600 dark:text-orange-300" />
          <span>Refresh</span>
        </button>
      )}
    </>
  );
};

export { SyncIndicator };
