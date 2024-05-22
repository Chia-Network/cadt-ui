import React, { useState, useEffect, ChangeEventHandler } from 'react';
import { Select as FlowbiteSelect } from 'flowbite-react';
import { PiCaretDown } from 'react-icons/pi';

export type SelectOption =
  | {
      label: string;
      value: string | number;
    }
  | string
  | number;

interface SelectProps {
  options?: SelectOption[];
  initialValue?: string | number;
  id?: string;
  name: string;
  onChange?: (value: string | number) => void;
  required?: boolean;
  disabled?: boolean;
  freeform?: boolean; // Allows typing and filtering
}

const Select: React.FC<SelectProps> = ({
  options = [],
  initialValue,
  id,
  name,
  onChange,
  required = false,
  disabled = false,
  freeform = false,
}) => {
  const [inputValue, setInputValue] = useState<string | number | undefined>(initialValue);
  const [filteredOptions, setFilteredOptions] = useState<SelectOption[]>(options);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue, options])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | ChangeEventHandler<HTMLSelectElement>) => {
    // @ts-ignore
    const value = event.target.value;
    setInputValue(value);
    if (freeform) {
      const lowerValue = value.toLowerCase();
      setFilteredOptions(
        options.filter((option) => {
          const optionValue = typeof option === 'object' ? option.label.toLowerCase() : option.toString().toLowerCase();
          return optionValue.includes(lowerValue);
        }),
      );
    }
    if (onChange) {
      onChange(value);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const clearInput = () => {
    setInputValue('');
    setFilteredOptions(options);
    setDropdownVisible(false);
    if (onChange) {
      onChange('');
    }
  };

  if (freeform) {
    return (
      <div className="relative w-full">
        <div style={{ height: 40 }} className="flex items-center border border-gray-300 rounded-lg">
          <input
            type="text"
            id={id}
            name={name}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setDropdownVisible(true)}
            onBlur={() => setTimeout(() => setDropdownVisible(false), 200)}
            disabled={disabled}
            className="border-none form-input block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding rounded-l-lg transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
          {inputValue && (
            <button onClick={clearInput} className="p-2 hover:bg-gray-200 focus:outline-none">
              &#x2715; {/* This is a simple "X" icon */}
            </button>
          )}
          <button onClick={toggleDropdown} className="p-2 hover:bg-gray-200 focus:outline-none">
            <PiCaretDown />
          </button>
        </div>
        {dropdownVisible && (
          <ul className="absolute top-full left-0 w-full z-50 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  setInputValue(typeof option === 'object' ? option.value : option);
                  setFilteredOptions(options);
                  setDropdownVisible(false);
                  if (onChange) {
                    onChange(typeof option === 'object' ? option.value : option);
                  }
                }}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              >
                {typeof option === 'object' ? option.label : option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <FlowbiteSelect
        id={id}
        name={name}
        value={inputValue?.toString()}
        defaultValue={initialValue?.toString()}
        // @ts-ignore
        onChange={handleInputChange}
        disabled={disabled}
        required={required}
      >
        <option value="" disabled={required} hidden={!required}>
          {required ? 'Please select an option' : 'Select an option'}
        </option>
        {options.map((option, index) => (
          <option key={index} value={typeof option === 'object' ? option.value : option}>
            {typeof option === 'object' ? option.label : option}
          </option>
        ))}
      </FlowbiteSelect>
    </div>
  );
};

export { Select };
