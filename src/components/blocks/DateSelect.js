import React, { useRef } from 'react';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import DatePicker from '@mui/lab/DatePicker';
import styled, { css } from 'styled-components';

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
    box-shadow: 0px 0px 4px rgba(24, 144, 255, 0.5);
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
      background-color: rgba(239, 239, 239, 0.3);
    `};
`;

const Input = styled('input')`
  height: 22px;
  width: 96px;
  border: none;
  :focus-visible {
    outline: none;
  }
`;

const DateSelect = ({
  size = 'default',
  disabled,
  dateValue,
  setDateValue,
  onBlur,
  name,
}) => {
  const divElement = useRef(null);

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DatePicker
        label="Select time"
        value={dateValue}
        onChange={newValue => {
          setDateValue(`${newValue.$M + 1}/${newValue.$D}/${newValue.$y}`);
        }}
        renderInput={({ inputRef, inputProps, InputProps }) => {
          return (
            <InputContainer
              size={size}
              ref={divElement}
              disabled={disabled}
              tabIndex={0}>
              <Input
                name={name}
                onBlur={onBlur}
                ref={inputRef}
                {...inputProps}
                placeholder="Select Date"
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
