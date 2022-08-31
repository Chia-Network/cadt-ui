import React from 'react';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import styled, { css, withTheme } from 'styled-components';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { getIsDateValid, formatDate, getISODate } from '../../utils/dateUtils';

const DateSelectVariantEnum = {
  error: 'error',
};

const StyledTextField = styled(TextField)`
  width: 100%;

  // set height depending on props
  .MuiOutlinedInput-root,
  .MuiInputBase-root {
    height: ${props => {
      if (props.size === 'large') return '40px';
      if (props.size === 'small') return '24px';
      return '32px';
    }};
    border-radius: 0.125rem;
    border: 0.0625rem solid ${props => props.theme.colors.default.onBorder};
  }

  ${props => {
    if (props.disabled) {
      // disabled background color
      return css`
        .MuiOutlinedInput-root,
        .MuiInputBase-root {
          background-color: ${props.theme.colors.default.onSelect};
        }
      `;
    } else if (props.dateselectvariant === DateSelectVariantEnum.error) {
      // error variant borders
      return css`
        .MuiOutlinedInput-root,
        .MuiInputBase-root {
          border: 1px solid ${props.theme.colors.default.status.error.primary};
        }

        .MuiOutlinedInput-root:focus-within,
        .MuiInputBase-root:focus-within {
          border: 1px solid ${props.theme.colors.default.status.error.primary};
          box-shadow: 0px 0px 4px rgba(245, 34, 45, 0.5);
        }
      `;
    } else {
      // default borders
      return css`
        .MuiOutlinedInput-root:hover,
        .MuiInputBase-root:hover {
          border: 1px solid ${props.theme.colors.default.onInput};
        }

        .MuiOutlinedInput-root:focus-within,
        .MuiInputBase-root:focus-within {
          border: 1px solid ${props.theme.colors.default.onDate};
          box-shadow: 0px 0px 4px rgba(24, 144, 255, 0.5);
        }
      `;
    }
  }}

  // remove inner mui border
  .MuiOutlinedInput-notchedOutline {
    border: 0;
  }
`;

const DateSelect = withTheme(
  ({
    size = 'default',
    disabled,
    dateValue,
    setDateValue,
    variant,
    onBlur,
    name,
  }) => (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DesktopDatePicker
        inputFormat="YYYY-MM-DD"
        mask="____-__-__"
        RegExp="/^d{4}-d{2}-d{2}$/"
        views={['year', 'month', 'day']}
        value={getIsDateValid(dateValue) ? getISODate(dateValue) : null}
        onChange={newValue =>
          getIsDateValid(newValue)
            ? setDateValue(formatDate(newValue))
            : setDateValue(newValue)
        }
        disabled={disabled}
        renderInput={params => (
          <StyledTextField
            {...params}
            disabled={disabled}
            size={size}
            dateselectvariant={variant}
            name={name}
            onBlur={onBlur}
          />
        )}
      />
    </LocalizationProvider>
  ),
);

export { DateSelect, DateSelectVariantEnum };
