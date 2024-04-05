import { TextInput } from '@/components';
import { IoSearchSharp } from 'react-icons/io5';
import React from 'react';
import { IntlShape, useIntl } from 'react-intl';

interface SearchBoxProps {
  defaultValue: string;
  onChange: (event: any) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ defaultValue, onChange }) => {
  const intl: IntlShape = useIntl();

  return (
    <div className="w-full md:max-w-md">
      <TextInput
        type="text"
        icon={IoSearchSharp}
        defaultValue={defaultValue || ''}
        onChange={onChange}
        placeholder={intl.formatMessage({ id: 'search' })}
      />
    </div>
  );
};

export { SearchBox };
