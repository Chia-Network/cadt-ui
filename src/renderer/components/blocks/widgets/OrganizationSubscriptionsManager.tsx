import React from 'react';
import { ComponentCenteredSpinner, IndeterminateProgressOverlay, SkeletonTable } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useGetDefaultOrgListQuery } from '@/api/cadt/v1/governance';
import { OrganizationSubscriptionsTable } from '@/components/blocks/tables/OrganizationSubscriptionsTable';

const OrganizationSubscriptionsManager: React.FC = () => {
  const {
    data: orgList,
    isLoading: orgListLoading,
    isFetching: orgListFetching,
    error: orgListError,
  } = useGetDefaultOrgListQuery();

  if (orgListLoading) {
    return <SkeletonTable />;
  }

  if (orgListError) {
    return <FormattedMessage id={'unable-to-load-contents'} />;
  }

  if (!orgList) {
    return <FormattedMessage id={'no-records-found'} />;
  }

  return (
    <div className="m-2">
      {orgListFetching && <IndeterminateProgressOverlay />}
      {orgListLoading ? (
        <ComponentCenteredSpinner />
      ) : (
        <OrganizationSubscriptionsTable data={orgList} isLoading={orgListLoading} />
      )}
    </div>
  );
};

export { OrganizationSubscriptionsManager };
