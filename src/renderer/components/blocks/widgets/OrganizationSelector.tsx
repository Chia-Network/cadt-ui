import React, { useState, useEffect } from 'react';
import { useGetOrganizationsListQuery } from '@/api/cadt/v1/organizations';
import { Dropdown, SyncIndicator, Spinner, Select } from '@/components';
import { Organization } from '@/schemas/Organization.schema';

interface OrganizationSelectorProps {
  onSelect: (organization: any | undefined) => void;
  defaultOrgUid: string | undefined;
  noSelectionLabel?: string;
}

const OrganizationSelector: React.FC<OrganizationSelectorProps> = ({
  onSelect,
  defaultOrgUid,
  noSelectionLabel = 'Select Organization',
}) => {
  const { data: organizations, error, isLoading } = useGetOrganizationsListQuery();
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | undefined>(undefined);

  useEffect(() => {
    if (defaultOrgUid === null) {
      const allOrganizationsPlaceholder: Organization = {
        name: 'All Organizations',
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
          <span className="mr-2.5">{organization.name}</span>
          <SyncIndicator orgUid={organization.orgUid} detailed={false} useRefeshBadge={false}/>
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export { OrganizationSelector };
