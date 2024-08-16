import React, { useEffect, useState } from 'react';
import { useGetOrganizationsListQuery } from '@/api/cadt/v1/organizations';
import { Dropdown, Spinner, SyncIndicator } from '@/components';
import { Organization } from '@/schemas/Organization.schema';
import { useIntl } from 'react-intl';

interface OrganizationSelectorProps {
  onSelect: (organization: any | undefined) => void;
  defaultOrgUid: string | undefined;
  noSelectionLabel?: string;
}

const OrganizationSelector: React.FC<OrganizationSelectorProps> = ({ onSelect, defaultOrgUid, noSelectionLabel }) => {
  const intl = useIntl();
  const { data: organizations, error, isLoading } = useGetOrganizationsListQuery();
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | undefined>(undefined);

  if (!noSelectionLabel) {
    noSelectionLabel = intl.formatMessage({ id: 'select-organization' });
  }

  useEffect(() => {
    if (defaultOrgUid === null) {
      const allOrganizationsPlaceholder: Organization = {
        name: intl.formatMessage({ id: 'all-organizations' }),
        id: 0,
        orgUid: '',
        icon: '',
        registryId: '',
        registryHash: '',
        fileStoreId: '',
        prefix: '',
      };
      setSelectedOrganization(allOrganizationsPlaceholder);
    } else if (defaultOrgUid !== undefined && organizations) {
      const defaultOrganization = organizations.find((org) => org.orgUid === defaultOrgUid);
      if (defaultOrganization) {
        setSelectedOrganization(defaultOrganization);
      }
    }
  }, [defaultOrgUid, organizations]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (error || !organizations) {
    return <p>Error loading organizations</p>;
  }

  const handleSelect = (organization: any | undefined) => {
    setSelectedOrganization(organization || { name: 'All Organizations' });
    onSelect(organization);
  };

  return (
    <Dropdown label={selectedOrganization ? selectedOrganization.name : noSelectionLabel} inline={true}>
      <Dropdown.Item onClick={() => handleSelect(undefined)}>All Organizations</Dropdown.Item>
      {organizations.map((organization) => (
        <Dropdown.Item
          key={organization.orgUid}
          onClick={() => handleSelect(organization)}
          className="flex justify-between items-center"
        >
          {organization.name}
          <SyncIndicator orgUid={organization.orgUid} detailed={false} />
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export { OrganizationSelector };
