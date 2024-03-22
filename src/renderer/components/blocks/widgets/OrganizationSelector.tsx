import React, { useState, useEffect } from 'react';
import { useGetOrganizationsListQuery } from "@/api/cadt/v1/organizations";
import { Dropdown } from '@/components';

interface OrganizationSelectorProps {
  onSelect: (organization: any | undefined) => void;
  defaultOrgUid: string | undefined;
}

const OrganizationSelector: React.FC<OrganizationSelectorProps> = ({ onSelect, defaultOrgUid }) => {
  const { data: organizations, error, isLoading } = useGetOrganizationsListQuery({});
  const [selectedOrganization, setSelectedOrganization] = useState<any | undefined>(undefined);

  useEffect(() => {
    if (defaultOrgUid === null) {
      setSelectedOrganization({ name: "All Organizations" });
    } else if (defaultOrgUid !== undefined && organizations) {
      const defaultOrganization = organizations.find(org => org.orgUid === defaultOrgUid);
      if (defaultOrganization) {
        setSelectedOrganization(defaultOrganization);
      }
    }
  }, [defaultOrgUid, organizations]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !organizations) {
    return <p>Error loading organizations</p>;
  }

  const handleSelect = (organization: any | undefined) => {
    if (!organization) {
      setSelectedOrganization({ name: "All Organizations" });
    } else {
      setSelectedOrganization(organization);
    }
    onSelect(organization);
  };

  return (
    <Dropdown label={selectedOrganization ? selectedOrganization.name : "Select Organization"} inline={true}>
      <Dropdown.Item onClick={() => handleSelect(undefined)}>All Organizations</Dropdown.Item>
      {organizations.map((organization) => (
        <Dropdown.Item
          key={organization.orgUid}
          onClick={() => handleSelect(organization)}
        >
          {organization.name}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
}

export { OrganizationSelector };
