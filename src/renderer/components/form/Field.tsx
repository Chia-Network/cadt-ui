import React from 'react';
import { useFormikContext, FormikValues } from 'formik';
import { Label, HelperText } from 'flowbite-react';

interface FieldProps {
  name: string;
  label?: string;
  readonly?: boolean;
  children: React.ReactElement;
}

const Field: React.FC<FieldProps> = ({ name, label, readonly, children }) => {
  const { errors, touched, values, setFieldValue, setFieldTouched }: FormikValues = useFormikContext();

  const isError: boolean = !!errors[name] && !!touched[name];

  // Enforce a single child
  const child = React.Children.only(children);

  // Styles for the read-only value container
  const readOnlyValueStyles = "py-2 px-4 bg-gray-100 text-gray-800 rounded border border-gray-300";

  if (readonly) {
    return (
      <div className="mb-4">
        {label && <Label htmlFor={name}>{label}</Label>}
        <div id={name} className={readOnlyValueStyles}>
          {values[name] || 'N/A'} {/* Display 'N/A' if the value is falsy */}
        </div>
        {isError && <HelperText>{errors[name]}</HelperText>}
      </div>
    );
  }

  // Enhance the single child component with additional Formik-related props
  const enhancedChild = React.cloneElement(child, {
    id: name,
    name,
    onChange: (e: React.ChangeEvent<any>) => {
      child.props.onChange?.(e);
      setFieldValue(name, e.target.value);
    },
    onBlur: (e: React.FocusEvent<any>) => {
      child.props.onBlur?.(e);
      setFieldTouched(name, true);
    },
    color: isError ? 'failure' : 'gray',
  });

  return (
    <div className="mb-4">
      {label && <Label htmlFor={name}>{label}</Label>}
      {enhancedChild}
      {isError && <HelperText>{errors[name]}</HelperText>}
    </div>
  );
};

export default Field;
