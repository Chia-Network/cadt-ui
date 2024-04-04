import React from 'react';
import { TextInput } from 'flowbite-react';
import Field from './Field'; // Make sure the import path is correct

interface AddressGroupProps {
  name: string; // Base name for the group, used to construct field names
}

const AddressGroup: React.FC<AddressGroupProps> = ({ name }) => {
  return (
    <div className="space-y-2">
      <Field name={`${name}.street`} label="Street">
        <TextInput placeholder="123 Main St" />
      </Field>
      <Field name={`${name}.city`} label="City">
        <TextInput placeholder="Anytown" />
      </Field>
      <Field name={`${name}.zipCode`} label="Zip Code">
        <TextInput placeholder="12345" />
      </Field>
    </div>
  );
};

export default AddressGroup;