import React from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import { CircularProgress } from '@mui/material';
import { ButtonText } from '../typography';

const Button = withTheme(styled('button')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  max-width: 100%;
  background-color: ${props => (props.danger ? '#FF4D4F' : '#1890FF')};
  border: none;
  border-radius: 2px;
  padding: 10px;
  height: 32px;
  margin: 5px;
  cursor: pointer;

  ${props => props.size === 'large' && `height: 40px !important;`};
  ${props => props.size === 'small' && `height: 28px !important;`};

  ${props => props.size === 'large' && `padding: 15px !important;`};
  ${props => props.size === 'small' && `padding: 3px !important;`};

  &:hover {
    background-color: ${props => (props.danger ? '#FF7875' : '#40A9FF')};
  }

  &:focus {
    background-color: ${props => (props.danger ? '#FF7875' : '#40A9FF')};
  }

  &:active {
    background-color: ${props => (props.danger ? '#F5222D' : '#096DD9')};
  }

  ${props =>
    props.loading &&
    `
      background-color: ${props => (props.danger ? '#FF7875' : '#40A9FF')};
    opacity: 0.65;
  `}

  &:disabled {
    background-color: #f5f5f5;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
    cursor: default;
  }
`);

const PrimaryButton = withTheme(
  ({ label, loading = false, icon, size, danger = false, disabled }) => {
    const appStore = useSelector(state => state.app);
    return (
      <Button
        loading={loading}
        disabled={disabled}
        size={size}
        danger={danger}
        selectedTheme={appStore.theme}>
        {loading && (
          <>
            <CircularProgress size={15} thickness={5} />
            <span style={{ width: size === 'small' ? 2 : 5 }}></span>
          </>
        )}
        {icon && (
          <>
            {icon}
            <span style={{ width: size === 'small' ? 2 : 5 }}></span>
          </>
        )}
        <ButtonText color={disabled ? '#BFBFBF' : 'white'}>{label}</ButtonText>
      </Button>
    );
  },
);

export { PrimaryButton };
