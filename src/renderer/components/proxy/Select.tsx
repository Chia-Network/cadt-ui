import React from 'react';
import { Select as FlowbiteSelect } from 'flowbite-react';

export type SelectOption = {
    label: string;
    value: string | number;
} | string | number;

interface SelectProps {
    options?: SelectOption[];
    initialValue?: string | number;
    id?: string;
    name: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
    disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({ options, initialValue, id, name, onChange, required = false, disabled = false }) => {
    // Helper function to determine the display text for each option
    const getOptionLabel = (option: SelectOption): string => {
        if (typeof option === 'object') {
            return option.label;
        } else {
            return option.toString();
        }
    };

    // Helper function to determine the value for each option
    const getOptionValue = (option: SelectOption): string | number => {
        if (typeof option === 'object') {
            return option.value;
        } else {
            return option;
        }
    };

    return (
        <div className="w-64">
            <FlowbiteSelect
                id={id}
                name={name}
                defaultValue={initialValue?.toString()}
                onChange={onChange}
                disabled={disabled}
            >
                <option value="" disabled={required} selected={!initialValue}>
                    No Selection
                </option>
                {options && options.length > 0 ? (
                    options.map((option, index) => (
                        <option key={index} value={getOptionValue(option)}>
                            {getOptionLabel(option)}
                        </option>
                    ))
                ) : (
                    <option disabled value="">
                        No Options Available
                    </option>
                )}
            </FlowbiteSelect>
        </div>
    );
};

export { Select };
