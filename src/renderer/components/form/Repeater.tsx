import React, { ReactNode } from 'react';
import { FieldArray, useFormikContext, FormikContextType } from 'formik';
import { Button, Card } from '@/components';
import { IoAddCircleOutline } from 'react-icons/io5'; // Importing a plus icon from react-icons

interface RepeaterProps<T> {
  name: string;
  children: ReactNode | ((item: T, index: number, name: string) => ReactNode);
  maxNumber?: number;
  minNumber?: number;
  readonly?: boolean;
  initialValue?: T[];
  itemTemplate: T;
}

function Repeater<T extends { [key in keyof T]: any }>({
  name,
  children,
  maxNumber = 5,
  minNumber = 1,
  readonly = false,
  initialValue = [],
  itemTemplate,
}: RepeaterProps<T>) {
  const { values, setFieldValue }: FormikContextType<{ [key: string]: any[] }> = useFormikContext();

  React.useEffect(() => {
    if (initialValue && initialValue.length > 0 && (!values[name] || values[name].length === 0)) {
      setFieldValue(name, initialValue);
    }
  }, [initialValue, name, setFieldValue, values]);

  const groups = values[name] || initialValue;

  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <div className="flex flex-col gap-4 relative">
          {groups.map((_group: any, index: number) => (
            <Card key={index}>
              <div
                className={`mb-4 ${
                  readonly ? 'grid-cols-1' : 'sm:grid-cols-1 md:grid-cols-[1fr_auto]'
                } grid items-center gap-x-4 relative`}
              >
                {typeof children === 'function' ? children(_group, index, name) : children}

                {!readonly && (
                  <div className="relative flex items-center">
                    <Button
                      className="ml-4"
                      color="red"
                      onClick={() => arrayHelpers.remove(index)}
                      disabled={groups.length <= minNumber}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
          {/* Floating button in the bottom left corner */}
          {!readonly && groups.length < maxNumber && (
            <button
              type="button"
              onClick={() => arrayHelpers.push(itemTemplate)}
              className="fixed bottom-12 left-6 p-4 bg-blue-500 text-white rounded-full shadow-lg text-lg hover:bg-blue-600 transition duration-150 ease-in-out z-50"
              aria-label="Add new item"
            >
              <IoAddCircleOutline size="1.5em" />
            </button>
          )}
        </div>
      )}
    />
  );
}

export { Repeater };
