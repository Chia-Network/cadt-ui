import React, { useRef } from 'react';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import DatePicker from '@mui/lab/DatePicker';
import styled, { css } from 'styled-components';
import { formatDate, getISODate } from '../../utils/formatData';
import { DateVariantEnum } from '.';

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
    border: ${props =>
      props.disabled ? '1px solid #d9d9d9;' : '1px solid #40a9ff'};
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
      color: #000000;
      cursor: default;
    `};
`;

const DateSelect = ({
  size = 'default',
  disabled,
  dateValue,
  setDateValue,
  variant,
}) => {
  const divElement = useRef(null);

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DatePicker
        inputFormat="YYYY-MM-DD"
        disableOpenPicker={disabled}
        label="Select time"
        value={getISODate(dateValue)}
        onChange={newValue => {
          if (newValue) {
            setDateValue(formatDate(newValue));
          } else {
            setDateValue(null);
          }
        }}
        views={['year', 'month', 'day']}
        disabled={disabled}
        renderInput={({ inputRef, inputProps, InputProps }) => {
          return (
            <InputContainer
              size={size}
              ref={divElement}
              disabled={disabled}
              tabIndex={0}
              variant={variant}
            >
              <Input
                ref={inputRef}
                {...inputProps}
                placeholder="YYYY-MM-DD"
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

export { DateSelect };
