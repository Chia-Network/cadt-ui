import React from 'react';
import { FieldArray, FormikValues, useFormikContext } from 'formik';
import { Button } from '@/components';

interface RepeaterProps {
  name: string;
  component: React.ReactElement;
  maxNumber?: number;
  minNumber?: number;
}

const Repeater: React.FC<RepeaterProps> = ({ name, component, maxNumber = 5, minNumber = 1 }) => {
  const { values }: FormikValues = useFormikContext();
  const groups = values[name] || [];

  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <div>
          {groups.map((_group: any, index: number) => (
            <div key={index} className="mb-4 flex items-center">
              {/* Clone the component for each group and pass in the adjusted name prop */}
              {React.cloneElement(component, { name: `${name}[${index}]` })}

              {/* Remove button for each group */}
              <Button
                color="failure"
                onClick={() => arrayHelpers.remove(index)}
                disabled={groups.length <= minNumber} // Disable if minNumber reached
              >
                Remove
              </Button>
            </div>
          ))}

          {/* Add button - shown if maxNumber hasn't been reached */}
          {groups.length < maxNumber && <Button onClick={() => arrayHelpers.push({})}>Add</Button>}
        </div>
      )}
    />
  );
};

export default Repeater;
