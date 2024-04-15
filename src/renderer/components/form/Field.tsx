import React from 'react';
import { useFormikContext, FormikValues } from 'formik';
import { Label, TextInput, Textarea, Select, Checkbox, Datepicker } from 'flowbite-react';
import { TagInput } from './TagInput';
import dayjs from 'dayjs';

type Option = {
  label: string;
  value: string | number;
};

interface FieldProps {
  name: string;
  label?: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'tag' | 'date' | 'link' | 'number';
  options?: Option[];
  readonly?: boolean;
  initialValue?: any;
}

const Field: React.FC<FieldProps> = ({ name, label, type, options, readonly, initialValue }) => {
  const { errors, touched, setFieldValue }: FormikValues = useFormikContext();

  const isError: boolean = !!errors[name] && touched[name];

  if (readonly) {
    const renderReadOnlyField = () => {
      if (initialValue === undefined || initialValue === null) {
        return '--';
      }
      
      switch (type) {
        case 'select':
          return <div className="break-words">{options?.find((option) => option.value === initialValue)?.label}</div>;
        case 'link':
          return (
            <a className="break-words" href={initialValue} target="_blank" rel="noreferrer" className="text-blue-500">
              {initialValue}
            </a>
          );
        case 'date':
          return dayjs(new Date(initialValue)).format('MMMM D, YYYY');
        case 'tag':
          return <TagInput defaultValue={initialValue} onChange={(tags) => setFieldValue(name, tags)} readonly={readonly} />;
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
        {isError && <p className="text-red-500 text-xs italic">{errors[name]}</p>}
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
      case 'select':
        return (
          <Select
            id={name}
            name={name}
            defaultValue={initialValue}
            onChange={(e) => setFieldValue(name, e.target.value)}
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        );
      case 'date':
        return <Datepicker defaultDate={initialValue ? new Date(initialValue) : undefined} />;
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
      {isError && <p className="text-red-500 text-xs italic">{errors[name]}</p>}
    </div>
  );
};

export { Field };
