import React from 'react';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import DatePicker from '@mui/lab/DatePicker';
import styled, { css } from 'styled-components';

const DateVariantEnum = {
  error: 'error',
};

const InputContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d9d9d9;
  width: 160px;
  border-radius: 2px;
  background-color: white;
  :hover {
    border: 1px solid #40a9ff;
    ${props =>
      props.disabled &&
      css`
        border: 1px solid #d9d9d9;
      `};
  }
  :focus-within,
  ::selection {
    outline: none;
    box-shadow: ${props =>
      props.disabled ? 'none' : '0px 0px 4px rgba(24, 144, 255, 0.5)'};
    border: 1px solid #40a9ff;
  }

  ${props =>
    (props.size === 'large' &&
      css`
        height: 40px;
      `) ||
    (props.size === 'default' &&
      css`
        height: 32px;
      `) ||
    (props.size === 'small' &&
      css`
        height: 24px;
      `)};

  ${props =>
    props.disabled &&
    css`
      background-color: #f5f5f5;
    `};
  ${props => {
    if (props.variant === DateVariantEnum.error) {
      return css`
        border: 1px solid #f5222d;
        :focus-within {
          border: 1px solid #f5222d;
          box-shadow: 0px 0px 4px rgba(245, 34, 45, 0.5);
        }
        :hover {
          border: 1px solid #f5222d;
        }
      `;
    }
  }}
`;

const Input = styled('input')`
  height: 22px;
  width: 96px;
  border: none;
  :focus-visible {
    outline: none;
  }
  ${props =>
    props.disabled &&
    css`
      background-color: #f5f5f5;
      color: ${props.theme.colors.default.onSurface}
      cursor: default;
    `};
`;

const YearSelect = ({ size, yearValue, onChange, disabled, variant }) => {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DatePicker
        views={['year']}
        label="Year"
        value={yearValue ? `${yearValue}` : yearValue}
        onChange={onChange}
        disabled={disabled}
        renderInput={({ inputRef, inputProps, InputProps }) => {
          return (
            <InputContainer size={size} disabled={disabled} variant={variant}>
              <Input
                ref={inputRef}
                {...inputProps}
                helperText={null}
                disabled={disabled}
              />
              {InputProps?.endAdornment}
            </InputContainer>
          );
        }}
      />
    </LocalizationProvider>
  );
};

export { YearSelect, DateVariantEnum };
