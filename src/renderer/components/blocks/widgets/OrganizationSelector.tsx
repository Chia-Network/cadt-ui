import React from 'react';
import { useGetOrganizationsListQuery} from "@/api/cadt/v1/organizations";
import { Dropdown } from '@/components';

interface OrganizationSelectorProps{
  onSelect: (organization: any) => void;
}

const OrganizationSelector: React.FC<OrganizationSelectorProps> = ({onSelect}) => {
  const { data: organizations, error, isLoading } = useGetOrganizationsListQuery({});

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error || !organizations) {
    return <p>Error loading organizations</p>
  }

  return (
    <Dropdown label="Select Organization" inline={true}>
      {organizations.map((organization) => (
        <Dropdown.Item
          key={organization.orgUid}
          onClick={() => onSelect(organization)}
        >
          {organization.name}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
}

export {OrganizationSelector};

