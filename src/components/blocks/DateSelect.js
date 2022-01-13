import React, { useState, useRef } from 'react';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import DatePicker from '@mui/lab/DatePicker';
import styled, { css } from 'styled-components';

const InputContainer = styled('div')`
  display: flex;
  margin: 10px;
  align-items: center;
  border: 1px solid #d9d9d9;
  width: 160px;
  border-radius: 2px;
  background-color: white;
  border-right: none;
  :hover {
    border: 1px solid #40a9ff;
    ${props =>
      props.disabled &&
      css`
        border: 1px solid #d9d9d9;
      `}
  }
  :focus-visible {
    outline: none;
    box-shadow: 0px 0px 4px rgba(24, 144, 255, 0.5);
    border: 1px solid #40a9ff;
  }

  ${props =>
    props.size === 'large' &&
    css`
      height: 40px;
    `}
  ${props =>
    props.size === 'default' &&
    css`
      height: 32px;
    `}
    ${props =>
    props.size === 'small' &&
    css`
      height: 24px;
    `};

  ${props =>
    props.disabled &&
    css`
      background-color: rgba(239, 239, 239, 0.3);
    `}
`;

const Input = styled('input')`
  height: 22px;
  width: 116px;
  border: none;
  :focus-visible {
    outline: none;
  }
`;

const DateSelect = ({ size = 'default', disabled }) => {
  const [value, setValue] = useState(null);
  const divElement = useRef(null);

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DatePicker
        label="Select time"
        value={value}
        onChange={newValue => {
          setValue(newValue);
        }}
        renderInput={({ inputRef, inputProps, InputProps }) => {
          return (
            <InputContainer
              size={size}
              ref={divElement}
              contentEditable={true}
              disabled={disabled}
              tabIndex={0}>
              <Input
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
