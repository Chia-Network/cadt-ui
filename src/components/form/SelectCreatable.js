import React, { useCallback, useMemo } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import styled, { css, withTheme } from 'styled-components';

import { Body } from '../typography';

const SelectCreatableVariantEnum = {
  disabled: 'disabled',
  error: 'error',
  default: 'default',
};

const SelectCreatableSizeEnum = {
  large: 'large',
  default: 'default',
  small: 'small',
};

const StyledCreatableSelect = styled(CreatableSelect)`
  ${props => {
    if (props.variant === SelectCreatableVariantEnum.error) {
      // error variant style
      return css`
        div[class*='control'] {
          border-radius: 0.125rem;
          border: 1px solid ${props.theme.colors.default.status.error.primary};
        }

        div[class*='control']:focus-within {
          border: 1px solid #f5222d;
          box-shadow: 0px 0px 4px rgba(245, 34, 45, 0.5);
        }
      `;
    } else {
      // default  variant style
      return css`
        div[class*='control'] {
          border-radius: 0.125rem;
          border: 0.0625rem solid #d9d9d9;
        }

        div[class*='control']:hover {
          border: 1px solid #40a9ff;
        }

        div[class*='control']:focus-within {
          border: 1px solid #1890ff;
          box-shadow: 0px 0px 4px rgba(24, 144, 255, 0.5);
        }
      `;
    }
  }}
`;

const StyledSelect = styled(Select)`
  ${props => {
    if (props.variant === SelectCreatableVariantEnum.error) {
      // error variant style
      return css`
        div[class*='control'] {
          border-radius: 0.125rem;
          border: 1px solid ${props.theme.colors.default.status.error.primary};
        }

        div[class*='control']:focus-within {
          border: 1px solid #f5222d;
          box-shadow: 0px 0px 4px rgba(245, 34, 45, 0.5);
        }
      `;
    } else {
      // default  variant style
      return css`
        div[class*='control'] {
          border-radius: 0.125rem;
          border: 0.0625rem solid #d9d9d9;
        }

        div[class*='control']:hover {
          border: 1px solid #40a9ff;
        }

        div[class*='control']:focus-within {
          border: 1px solid #1890ff;
          box-shadow: 0px 0px 4px rgba(24, 144, 255, 0.5);
        }
      `;
    }
  }}
`;

/* implementation example
  <SelectCreatable
    variant={
      errors.sector &&
      touched.sector &&
      SelectCreatableVariantEnum.error
    }
    isCreatable={true}
    size={SelectCreatableSizeEnum.large}
    onChange={val => setFieldValue('sector', val)}
    options={pickLists.projectSector}
    selected={values.sector}
    onBlur={handleBlur}
  />
*/

const SelectCreatable = withTheme(
  ({
    variant,
    options,
    onChange,
    onBlur,
    isMulti = false,
    isCreatable = true,
    isClearable = true,
    selected,
    size,
  }) => {
    const optionsList = useMemo(
      () =>
        options?.map(optionItem => ({
          value: optionItem,
          label: optionItem,
        })) ?? [],
      [options],
    );

    const value = useMemo(() => {
      if (isMulti) {
        return selected?.map(item => ({ value: item, label: item })) ?? [];
      } else {
        return selected ? { value: selected, label: selected } : '';
      }
    }, [selected]);

    const handleChange = useCallback(
      newValue => {
        if (isMulti) {
          onChange(newValue?.map(selectedItem => selectedItem.value) ?? []);
        } else {
          onChange(newValue?.value ?? '');
        }
      },
      [onChange],
    );

    return (
      <Body>
        {isCreatable && (
          <StyledCreatableSelect
            onChange={handleChange}
            options={optionsList}
            value={value}
            variant={variant}
            isDisabled={variant === SelectCreatableVariantEnum.disabled}
            onBlur={onBlur}
            size={size}
            isMulti={isMulti}
            isClearable={isClearable}
          />
        )}
        {!isCreatable && (
          <StyledSelect
            options={optionsList}
            onChange={handleChange}
            value={value}
            isDisabled={variant === SelectCreatableVariantEnum.disabled}
            isClearable={isClearable}
            isSearchable={true}
            isMulti={isMulti}
            size={size}
            onBlur={onBlur}
            variant={variant}
          />
        )}
      </Body>
    );
  },
);

export { SelectCreatable, SelectCreatableVariantEnum, SelectCreatableSizeEnum };
