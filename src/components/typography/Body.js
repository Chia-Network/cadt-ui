import React from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme, css } from 'styled-components';

const Text = styled('div')`
  color: ${props => props.color || props.theme.colors.default.primary};
  font-size: 16px;
  font-family: ${props => props.theme.typography.primary.regular};
  font-weight: 400;
  width: 100%;
  line-height: 150%;
  ${props =>
    props.size === 'Big Bold' &&
    css`
      font-size: 18px;
      font-weight: 700;
    `}
  ${props =>
    props.size === 'Big' &&
    css`
      font-size: 18px;
    `}
  ${props =>
    props.size === 'Bold' &&
    css`
      font-weight: 700;
    `}
  ${props =>
    props.size === 'Small' &&
    css`
      font-size: 14px;
    `}
  ${props =>
    props.size === 'Small Bold' &&
    css`
      font-size: 14px;
      font-weight: 700;
    `}
  ${props =>
    props.size === 'X-Small' &&
    css`
      font-size: 12px;
    `}
  ${props =>
    props.size === 'X-Small Bold' &&
    css`
      font-weight: 700;
      font-size: 12px;
    `}
`;

const Body = withTheme(({ children, color, size, onClick }) => {
  const appStore = useSelector(state => state.app);
  return (
    <Text
      color={color}
      selectedTheme={appStore.theme}
      size={size}
      onClick={onClick}
    >
      {children}
    </Text>
  );
});

export { Body };
