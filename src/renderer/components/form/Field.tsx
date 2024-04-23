import { get } from 'lodash';
import React from 'react';
import { useFormikContext, FormikValues } from 'formik';
import { Label, TextInput, Textarea, Checkbox, Datepicker } from 'flowbite-react';
import { TagInput } from './TagInput';
import dayjs from 'dayjs';
import { Select, SelectOption } from '@/components';

interface FieldProps {
  name: string;
  label?: string;
  type: 'text' | 'textarea' | 'picklist' | 'checkbox' | 'radio' | 'tag' | 'date' | 'link' | 'number';
  options?: SelectOption[];
  readonly?: boolean;
  initialValue?: any;
  disabled?: boolean;
}

const renderOption = (options, initialValue) => {
  // Find the option that matches the initialValue
  const foundOption = options?.find((option) => {
    if (typeof option === 'object') {
      return option.value === initialValue;
    } else {
      return option === initialValue;
    }
  });

  // Determine the label to display
  if (foundOption) {
    if (typeof foundOption === 'object') {
      return foundOption.label; // Use label from the object
    } else {
      return foundOption; // Use the value directly as it is a string or number
    }
  } else {
    return 'No Option Selected';
  }
};

const Field: React.FC<FieldProps> = ({ name, label, type, options, readonly, initialValue, disabled = false }) => {
  const { errors, setFieldValue }: FormikValues = useFormikContext();

  const isError: boolean = !!get(errors, name);

  if (readonly) {
    const renderReadOnlyField = () => {
      if (initialValue === undefined || initialValue === null) {
        return '--';
      }

      switch (type) {
        case 'picklist':
          return <div className="break-words">{renderOption(options, initialValue)}</div>;
        case 'link':
          return (
            <a href={initialValue} target="_blank" rel="noreferrer" className="text-blue-500 break-words">
              {initialValue}
            </a>
          );
        case 'date':
          return dayjs(new Date(initialValue)).format('MMMM D, YYYY');
        case 'tag':
          return (
            <TagInput defaultValue={initialValue} onChange={(tags) => setFieldValue(name, tags)} readonly={readonly} />
          );
        default:
          return <div className="break-words">{initialValue}</div>;
      }
    };
    return (
      <div className="mb-4">
        {label && <Label htmlFor={name}>{label}</Label>}
        <div id={name} className="py-2 text-gray-800 rounded">
          {renderReadOnlyField()}
        </div>
        {isError && <p className="text-red-500 text-xs italic">{get(errors, name)}</p>}
      </div>
    );
  }

  const renderField = () => {
    switch (type) {
      case 'text':
      case 'link':
      case 'number':
        return (
          <TextInput
            id={name}
            name={name}
            type={type === 'number' ? 'number' : 'text'}
            defaultValue={initialValue}
            onChange={(e) => setFieldValue(name, e.target.value)}
          />
        );
      case 'textarea':
        return (
          <Textarea
            id={name}
            name={name}
            defaultValue={initialValue}
            onChange={(e) => setFieldValue(name, e.target.value)}
          />
        );
      case 'picklist':
        return (
          <Select
            id={name}
            name={name}
            disabled={disabled}
            initialValue={initialValue}
            onChange={(e) => setFieldValue(name, e.target.value)}
            options={options}
          />
        );
      case 'date':
        return (
          <Datepicker
            defaultDate={initialValue ? new Date(initialValue) : undefined}
            onSelectedDateChanged={(date) => setFieldValue(name, date)}
            placeholder="Select date"
          />
        );
      case 'checkbox':
        return <Checkbox id={name} name={name} onChange={(e) => setFieldValue(name, e.target.checked)} />;
      // Add cases for other field types as needed
      case 'tag':
        return <TagInput defaultValue={initialValue} onChange={(tags) => setFieldValue(name, tags)} />;
      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      {label && <Label htmlFor={name}>{label}</Label>}
      {renderField()}
      <p className="text-red-500 text-xs italic">{get(errors, name)}</p>
    </div>
  );
};

export { Field };
