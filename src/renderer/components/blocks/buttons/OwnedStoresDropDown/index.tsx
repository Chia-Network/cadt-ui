import { noop } from 'lodash';
import React from 'react';
import { Dropdown, DropdownItem, Spinner } from 'flowbite-react';
import {useGetOwnedStoresQuery} from "@/api/ipc/datalayer";
import { useSelector } from 'react-redux';

interface OwnedStoresDropDownProps {
  onSelected: (
    event: React.KeyboardEvent<HTMLInputElement>,
    url?: string,
  ) => void;
}

const OwnedStoresDropDown: React.FC<OwnedStoresDropDownProps> = ({
  onSelected = noop,
}) => {
  const userOptionsStore = useSelector((state: any) => state.userOptions);
  const { data: ownedStores, isLoading } = useGetOwnedStoresQuery({});

  const handleOptionClick = (option: string): void => {
    onSelected(null, `chia://${option}`);
  };

  if (isLoading || !ownedStores) {
    return (
      <div
        style={{
          height: 60,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Dropdown label={<Spinner size="sm" />} disabled>
          <DropdownItem disabled>Loading...</DropdownItem>
        </Dropdown>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          height: 60,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Dropdown
          label="LOCAL"
          disabled={
            Boolean(ownedStores?.store_ids?.length) === false || isLoading
          }
        >
          {ownedStores.store_ids?.length || 0 > 0 ? (
            ownedStores.store_ids?.map((option, index) => (
              <DropdownItem
                key={index}
                onClick={() => handleOptionClick(option)}
                style={{ padding: '0.25rem', fontSize: '0.875rem' }}
              >
                {userOptionsStore.storeLabels?.[option] || option}
              </DropdownItem>
            ))
          ) : (
            <DropdownItem disabled>No options found</DropdownItem>
          )}
        </Dropdown>
      </div>
    </>
  );
};

export { OwnedStoresDropDown };
