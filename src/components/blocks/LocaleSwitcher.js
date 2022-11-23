import React from 'react';
import styled, { withTheme } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Select, MenuItem } from '@mui/material';
import { LANGUAGE_CODES } from '../../translations';
import { setLocale } from '../../store/actions/app';
import { SelectSizeEnum, SelectTypeEnum } from '..';

const Container = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .MuiSelect-root,
  .MuiSvgIcon-root,
  .MuiInputBase-inputSizeSmall {
    color: ${props => props.theme.colors[props.selectedTheme].secondary};
  }

  .MuiSelect-root:hover,
  .MuiSvgIcon-root:hover,
  .MuiInputBase-inputSizeSmall:hover {
    color: ${props => props.theme.colors[props.selectedTheme].secondaryDark};
  }

  .MuiOutlinedInput-notchedOutline {
    border: 0;
  }
`;

const LocaleSwitcher = withTheme(() => {
  const dispatch = useDispatch();
  const appStore = useSelector(state => state.app);

  const handleLocaleChange = event => {
    dispatch(setLocale(event.target.value));
  };

  return (
    <Container selectedTheme={appStore.theme}>
      <Select
        size={SelectSizeEnum.small}
        type={SelectTypeEnum.basic}
        value={appStore.locale}
        onChange={handleLocaleChange}
      >
        {Object.keys(LANGUAGE_CODES).map(key => (
          <MenuItem key={LANGUAGE_CODES[key]} value={LANGUAGE_CODES[key]}>
            {key}
          </MenuItem>
        ))}
      </Select>
    </Container>
  );
});

export { LocaleSwitcher };
