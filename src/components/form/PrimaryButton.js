import React from 'react';
import styled, { css } from 'styled-components';
import { CircularProgress } from '@mui/material';
import { ButtonText } from '../typography';

const Button = styled('button')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  max-width: 100%;
  background-color: ${props =>
    props.danger ? '#FF4D4F' : props.theme.colors.default.secondary};
  border: none;
  border-radius: 2px;
  padding: 10px;
  height: 32px;
  cursor: pointer;

  ${props => props.size === 'large' && `height: 40px !important;`};
  ${props => props.size === 'small' && `height: 28px !important;`};

  ${props => props.size === 'large' && `padding: 15px !important;`};
  ${props => props.size === 'small' && `padding: 3px !important;`};

  &:hover {
    background-color: ${props =>
      props.danger ? '#FF7875' : props.theme.colors.default.secondaryDark};
  }

  &:active {
    background-color: ${props =>
      props.danger ? '#F5222D' : props.theme.colors.default.secondary};
  }

  ${props =>
    props.loading &&
    `
      background-color: ${props =>
        props.danger ? '#FF7875' : props.theme.colors.default.secondaryDark};
    opacity: 0.65;
  `}

  &:disabled {
    background-color: #f5f5f5;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
    cursor: default;
  }

  ${props => {
    if (props.type === 'default') {
      if (props.loading) {
        return `
          background-color: white;
          :hover, :active {
            background-color: white;
          };
          h4 { color: #BFBFBF };
          border: 1px solid #e5e5e5;
        `;
      }
      return css`
        background-color: white;
        :hover,
        :active {
          background-color: white;
        }

        border: 1px solid #e5e5e5;
        :active {
          border: 1px solid #096dd9;
        }

        h4 {
          color: ${props.theme.colors.default.secondary};
        }
        h4:hover {
          color: ${props.theme.colors.default.secondaryDark};
        }
        h4:active {
          color: ${props.theme.colors.default.secondary};
        }
      `;
    }
  }};
`;

const PrimaryButton = ({
  label,
  loading,
  icon,
  size,
  danger,
  disabled,
  onClick,
  type = 'primary',
}) => {
  return (
    <Button
      loading={loading}
      disabled={disabled}
      size={size}
      danger={danger}
      type={type}
      onClick={onClick}
    >
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
};

export { PrimaryButton };
